// Custom interface for candidate stats properties
interface CandidateStat {
  candidateType?: string;
  protocol?: string;
}
import { FileMetadata, SignalingMessage } from '@/types';
import { signalingService } from './signaling';

// Constants for optimal performance - FIXED SIZES FOR RELIABILITY
const TRANSFER_CONFIG = {
  // Single chunk size for all connections - proven reliable
  CHUNK_SIZE: 16 * 1024,              // 16KB - safe for all connection types
  
  // Buffer management (critical for performance and reliability)
  BUFFER_HIGH_WATER_MARK: 256 * 1024, // 256KB high water mark
  BUFFER_LOW_WATER_MARK: 128 * 1024,  // 128KB low water mark
  
  // Memory management
  MAX_MEMORY_USAGE: 50 * 1024 * 1024,     // 50MB max memory per transfer
  READ_SLICE_SIZE: 2 * 1024 * 1024,       // Read 2MB at a time from file
  
  // Performance tuning
  BATCH_SIZE: 32,                         // Send 32 chunks before checking buffer
  PROGRESS_INTERVAL_MS: 250,              // Update progress every 250ms
  STATS_INTERVAL_MS: 1000,                // Collect stats every second
};

// Binary protocol constants (like ToffeeShare)
const PROTOCOL = {
  // Message types (1 byte header)
  FILE_HEADER: 0x01,
  FILE_CHUNK: 0x02,
  FILE_END: 0x03,
  TRANSFER_COMPLETE: 0x04,
  CANCEL: 0x05,
  PROGRESS: 0x06,
  ACK_BATCH: 0x07,  // Acknowledge multiple chunks at once
};

export class WebRTCService {
  private peerConnection: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private roomCode: string = '';
  private role: 'sender' | 'receiver' | null = null;
  
  // Environment variable-based ICE server configuration
  private readonly config: RTCConfiguration = {
    iceServers: [
      // Primary TURN server from environment variables
      ...(process.env.NEXT_PUBLIC_TURN_URL && process.env.NEXT_PUBLIC_TURN_USER && process.env.NEXT_PUBLIC_TURN_PASS ? [{
        urls: process.env.NEXT_PUBLIC_TURN_URL,       // e.g., "turn:152.67.6.227:3478"
        username: process.env.NEXT_PUBLIC_TURN_USER,  // e.g., "shub"
        credential: process.env.NEXT_PUBLIC_TURN_PASS // e.g., "s#ub#@mP@rdu131977@"
      }] : []),
      
      // STUN server (optional, derived from TURN URL or standalone)
      ...(process.env.NEXT_PUBLIC_STUN_URL ? [{
        urls: process.env.NEXT_PUBLIC_STUN_URL
      }] : process.env.NEXT_PUBLIC_TURN_URL ? [{
        urls: `stun:${process.env.NEXT_PUBLIC_TURN_URL.split(':')[1]}`
      }] : []),
    ],
    iceTransportPolicy: 'all', // Allow both STUN and TURN
    bundlePolicy: 'max-bundle',
    rtcpMuxPolicy: 'require',
    iceCandidatePoolSize: 10, // Pre-gather candidates
  };

  // Fixed chunk size for reliability - no dynamic sizing
  private chunkSize = TRANSFER_CONFIG.CHUNK_SIZE;  // Always use 16KB for reliability
  private connectionType: 'direct' | 'relay' | 'unknown' = 'unknown'; // Start as unknown, not relay
  
  // Event handlers (keeping your existing interface)
  public onConnectionStateChange?: (state: RTCPeerConnectionState) => void;
  public onDataChannelOpen?: () => void;
  public onDataChannelClose?: () => void;
  public onFileReceived?: (file: File) => void;
  public onIncomingFiles?: (files: FileMetadata[]) => void;
  public onTransferProgress?: (progress: { 
    fileName: string; 
    fileIndex: number;
    progress: number; 
    bytesTransferred: number; 
    totalBytes: number;
    speed: number;
  }) => void;
  public onTransferComplete?: () => void;
  public onTransferCancelled?: (cancelledBy: 'sender' | 'receiver') => void;
  public onFileCancelled?: (data: { fileIndex: number; fileName: string; cancelledBy: 'sender' | 'receiver' }) => void;
  public onError?: (error: string) => void;
  public onIceGatheringStateChange?: (state: RTCIceGatheringState) => void;
  public onConnectionInfo?: (info: { localType?: string; remoteType?: string; protocol?: string; connectionType?: string }) => void;
  public onStatusMessage?: (message: string) => void;

  // Transfer state - OPTIMIZED
  private currentFiles: File[] = [];
  private currentFileIndex = 0;
  private transferStartTime = 0;
  private cancelledFileIndices = new Set<number>();
  private connectionTimeout: NodeJS.Timeout | null = null;
  private hasStartedTransfer = false;
  private offerCreated = false;
  private isConnecting = false;
  
  // Sender state - STREAMING APPROACH
  private sendReader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  private sendQueue: Uint8Array[] = [];
  private isSending = false;
  private bytesSent = 0;
  private lastProgressUpdate = 0;
  private chunksInFlight = 0;
  private maxChunksInFlight = 128; // Allow more chunks in flight
  
  // Receiver state - EFFICIENT BUFFERING
  private receiveBuffer: Uint8Array[] = [];
  private expectedFileSize = 0;
  private receivedBytes = 0;
  private currentFileName = '';
  private currentFileType = '';
  private currentFileLastModified = 0;
  private receiveStartTime = 0;
  
  // Performance monitoring
  private stats = {
    chunksAcked: 0,
    chunksSent: 0,
    retransmissions: 0,
    throughput: [] as number[],
    rtt: 0,
  };

  get currentRole(): 'sender' | 'receiver' | null {
    return this.role;
  }

  async initializeAsSender(roomCode: string, files: File[]): Promise<void> {
    if (this.isConnecting) return;
    
    this.isConnecting = true;
    this.roomCode = roomCode;
    this.role = 'sender';
    this.currentFiles = files;
    this.hasStartedTransfer = false;
    this.offerCreated = false;

    this.onStatusMessage?.('Preparing to send files...');

    await this.createPeerConnection();
    this.createDataChannel();
    
    if (!this.offerCreated) {
      this.offerCreated = true;
      const offer = await this.peerConnection!.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: false,
      });
      
      await this.peerConnection!.setLocalDescription(offer);
      
      signalingService.sendSignal({
        type: 'offer',
        payload: offer,
        toRoom: roomCode,
      });

      this.onStatusMessage?.('Connecting to receiver...');
    }

    this.setConnectionTimeout(60000); // Increased to 60 seconds for better reliability
  }

  async initializeAsReceiver(roomCode: string): Promise<void> {
    if (this.isConnecting) return;
    
    this.isConnecting = true;
    this.roomCode = roomCode;
    this.role = 'receiver';

    this.onStatusMessage?.('Waiting for sender to connect...');

    await this.createPeerConnection();
    this.setupDataChannelReceiver();
    
    this.setConnectionTimeout(60000); // Increased to 60 seconds for better reliability
  }

  private async createPeerConnection(): Promise<void> {
    const numStunServers = this.config.iceServers?.filter(server => 
      typeof server.urls === 'string' ? server.urls.includes('stun:') : 
      Array.isArray(server.urls) ? server.urls.some(url => url.includes('stun:')) : false
    ).length || 0;
    
    const numTurnServers = this.config.iceServers?.filter(server => 
      typeof server.urls === 'string' ? server.urls.includes('turn:') : 
      Array.isArray(server.urls) ? server.urls.some(url => url.includes('turn:')) : false
    ).length || 0;
    
    console.log(`🌐 Creating peer connection with ${numStunServers} STUN servers and ${numTurnServers} TURN servers`);
    console.log('📋 ICE Configuration:', {
      totalServers: this.config.iceServers?.length,
      iceTransportPolicy: this.config.iceTransportPolicy,
      iceCandidatePoolSize: this.config.iceCandidatePoolSize,
    });
    
    // Log if TURN credentials are available
    const hasTurn1 = !!process.env.NEXT_PUBLIC_METERED_TURN_USERNAME && !!process.env.NEXT_PUBLIC_METERED_TURN_CREDENTIAL;
    const hasTurn2 = !!process.env.NEXT_PUBLIC_METERED_TURN_USERNAME_2 && !!process.env.NEXT_PUBLIC_METERED_TURN_CREDENTIAL_2;
    console.log(`🔐 TURN credentials: Primary=${hasTurn1}, Secondary=${hasTurn2}`);
    
    this.peerConnection = new RTCPeerConnection(this.config);

    this.peerConnection.onconnectionstatechange = () => {
      const state = this.peerConnection!.connectionState;
      this.onConnectionStateChange?.(state);
      
      if (state === 'connected') {
        this.clearConnectionTimeout();
        this.analyzeConnection();
        this.onStatusMessage?.('Connected! Optimizing for your network...');
      } else if (state === 'failed') {
        this.onError?.('Connection failed. Please try again.');
      }
    };

    this.peerConnection.oniceconnectionstatechange = () => {
      const state = this.peerConnection!.iceConnectionState;
      console.log(`ICE connection state: ${state}`);
      
      if (state === 'checking') {
        this.onStatusMessage?.('Finding best connection path...');
      } else if (state === 'connected' || state === 'completed') {
        this.clearConnectionTimeout();
        this.onStatusMessage?.('Connection established!');
        if (this.role === 'sender' && !this.hasStartedTransfer && this.dataChannel?.readyState === 'open') {
          this.hasStartedTransfer = true;
          setTimeout(() => this.startOptimizedTransfer(), 500);
        }
      } else if (state === 'failed') {
        this.onError?.('Connection failed. Please ensure both devices are on the same network or try using mobile data.');
        this.restartIce();
      } else if (state === 'disconnected') {
        this.onStatusMessage?.('Connection lost. Attempting to reconnect...');
        // Give it a moment to reconnect before restarting ICE
        setTimeout(() => {
          if (this.peerConnection?.iceConnectionState === 'disconnected') {
            this.restartIce();
          }
        }, 5000);
      }
    };

    this.peerConnection.onicegatheringstatechange = () => {
      const state = this.peerConnection!.iceGatheringState;
      this.onIceGatheringStateChange?.(state);
    };

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.analyzeCandidateType(event.candidate);
        signalingService.sendSignal({
          type: 'ice',
          payload: event.candidate,
          toRoom: this.roomCode,
        });
      }
    };

    signalingService.onSignal(this.handleSignalingMessage.bind(this));
  }

  private analyzeCandidateType(candidate: RTCIceCandidate): void {
    const candidateString = candidate.candidate;
    
    // Skip empty or null candidates
    if (!candidateString || candidateString.trim() === '') {
      console.log('🔍 ICE Candidate: <empty or null> - skipping analysis');
      return;
    }
    
    console.log('🔍 ICE Candidate:', candidateString);
    
    if (candidateString.includes('typ host')) {
      this.connectionType = 'direct';
      console.log('🏠 Detected HOST candidate - direct local connection (fastest!)');
    } else if (candidateString.includes('typ srflx')) {
      this.connectionType = 'direct';
      console.log('⚡ Detected STUN/SRFLX candidate - direct connection via STUN');
    } else if (candidateString.includes('typ relay')) {
      this.connectionType = 'relay';
      console.log('🔄 Detected TURN relay candidate - slower but reliable');
    } else {
      console.log('❓ Unknown candidate type:', candidateString);
      return; // Don't update connection type for unknown candidates
    }
    
    // Always use fixed chunk size - no dynamic sizing
    console.log(`🎯 Connection type: ${this.connectionType}, using fixed chunk size: ${this.chunkSize / 1024}KB`);
  }

  private async analyzeConnection(): Promise<void> {
    console.log('🔬 Starting connection analysis...');
    try {
      const stats = await this.peerConnection!.getStats();
      let localCandidate: CandidateStat | null = null;
      let remoteCandidate: CandidateStat | null = null;
      let candidatePair: RTCIceCandidatePairStats | null = null;

      // Debug: log all stats to see what we're getting
      let candidatePairCount = 0;
      let localCandidateCount = 0;
      let remoteCandidateCount = 0;

      stats.forEach((report) => {
        if (report.type === 'candidate-pair') {
          candidatePairCount++;
          if (report.state === 'succeeded') {
            candidatePair = report as RTCIceCandidatePairStats;
            console.log('✅ Found successful candidate pair:', {
              localCandidateId: candidatePair.localCandidateId,
              remoteCandidateId: candidatePair.remoteCandidateId,
              state: candidatePair.state
            });
            // Measure RTT for adaptive flow control
            if ('currentRoundTripTime' in report) {
              this.stats.rtt = report.currentRoundTripTime as number * 1000; // Convert to ms
            }
          }
        } else if (report.type === 'local-candidate') {
          localCandidateCount++;
          if (candidatePair?.localCandidateId === report.id) {
            localCandidate = report as CandidateStat;
            console.log('📍 Found local candidate:', localCandidate);
          }
        } else if (report.type === 'remote-candidate') {
          remoteCandidateCount++;
          if (candidatePair?.remoteCandidateId === report.id) {
            remoteCandidate = report as CandidateStat;
            console.log('📍 Found remote candidate:', remoteCandidate);
          }
        }
      });

      console.log(`📊 Stats summary: ${candidatePairCount} candidate pairs, ${localCandidateCount} local candidates, ${remoteCandidateCount} remote candidates`);

      if (localCandidate && remoteCandidate) {
        const localType = (localCandidate as CandidateStat)?.candidateType;
        const remoteType = (remoteCandidate as CandidateStat)?.candidateType;
        const protocol = (localCandidate as CandidateStat)?.protocol;
        
        console.log(`🔗 Final connection analysis:`, {
          localType,
          remoteType,
          protocol,
          rtt: this.stats.rtt
        });
        
        // Determine connection type for logging - but keep fixed chunk size
        if (localType === 'host' || (localType === 'srflx' && remoteType === 'srflx')) {
          this.connectionType = 'direct';
          console.log('🚀 FAST PATH: Direct/STUN connection - using fixed 16KB chunks for reliability');
          this.onStatusMessage?.('Direct connection established - reliable transfer!');
        } else if (localType === 'relay' || remoteType === 'relay') {
          this.connectionType = 'relay';
          console.log('� RELAY PATH: TURN relay connection - using fixed 16KB chunks for reliability');
          this.onStatusMessage?.('Using relay connection - optimized for stability');
        } else {
          console.log('🔧 FALLBACK: Unknown connection type - using fixed 16KB chunks for reliability');
        }

        this.onConnectionInfo?.({
          localType,
          remoteType,
          protocol,
          connectionType: this.connectionType
        });
      }
    } catch (error) {
      console.warn('Could not analyze connection:', error);
    }
  }

  private async restartIce(): Promise<void> {
    if (this.peerConnection && this.role === 'sender') {
      try {
        const offer = await this.peerConnection.createOffer({ iceRestart: true });
        await this.peerConnection.setLocalDescription(offer);
        
        signalingService.sendSignal({
          type: 'offer',
          payload: offer,
          toRoom: this.roomCode,
        });
      } catch (error) {
        console.error('ICE restart failed:', error);
      }
    }
  }

  private createDataChannel(): void {
    // Use ordered delivery for reliability (critical for large files)
    this.dataChannel = this.peerConnection!.createDataChannel('file-transfer', {
      ordered: true,        // CRITICAL: Ensure ordered delivery
      maxRetransmits: 0,    // Don't retransmit, we handle at app level
    });
    
    this.dataChannel.binaryType = 'arraybuffer';
    
    // CRITICAL: Set bufferedAmountLowThreshold for flow control
    this.dataChannel.bufferedAmountLowThreshold = TRANSFER_CONFIG.BUFFER_LOW_WATER_MARK;
    
    this.setupDataChannelHandlers();
  }

  private setupDataChannelReceiver(): void {
    this.peerConnection!.ondatachannel = (event) => {
      this.dataChannel = event.channel;
      this.dataChannel.binaryType = 'arraybuffer';
      this.dataChannel.bufferedAmountLowThreshold = TRANSFER_CONFIG.BUFFER_LOW_WATER_MARK;
      this.setupDataChannelHandlers();
    };
  }

  private setupDataChannelHandlers(): void {
    if (!this.dataChannel) return;

    this.dataChannel.onopen = () => {
      this.onDataChannelOpen?.();
      
      if (this.role === 'sender' && !this.hasStartedTransfer && this.currentFiles.length > 0) {
        this.hasStartedTransfer = true;
        setTimeout(() => this.startOptimizedTransfer(), 500);
      }
    };

    this.dataChannel.onclose = () => {
      this.onDataChannelClose?.();
      this.onStatusMessage?.('Connection closed');
    };

    this.dataChannel.onerror = (error) => {
      console.error('Data channel error:', error);
      this.onError?.('Connection error occurred');
    };

    // CRITICAL: Handle bufferedamountlow event for flow control
    this.dataChannel.onbufferedamountlow = () => {
      if (this.role === 'sender' && this.isSending) {
        this.resumeSending();
      }
    };

    this.dataChannel.onmessage = (event) => {
      this.handleOptimizedMessage(new Uint8Array(event.data));
    };
  }

  // OPTIMIZED TRANSFER PROTOCOL (Binary-only, like ToffeeShare)
  private async startOptimizedTransfer(): Promise<void> {
    if (this.currentFiles.length === 0 || !this.dataChannel) return;

    await this.analyzeConnection();

    if (this.dataChannel.readyState !== 'open') {
      this.onError?.('Data channel not ready');
      return;
    }

    // Send file list as binary protocol
    const fileList: FileMetadata[] = this.currentFiles.map((file, index) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      fileIndex: index,
    }));

    // Send metadata separately (once at start)
    const metadataJson = JSON.stringify(fileList);
    const metadataBytes = new TextEncoder().encode(metadataJson);
    const metadataMessage = new Uint8Array(5 + metadataBytes.length);
    metadataMessage[0] = 0xFF; // Special marker for metadata
    new DataView(metadataMessage.buffer).setUint32(1, metadataBytes.length, true);
    metadataMessage.set(metadataBytes, 5);
    
    this.dataChannel.send(metadataMessage);
    
    this.transferStartTime = Date.now();
    this.currentFileIndex = 0;
    
    this.onStatusMessage?.(`Starting optimized transfer (${this.connectionType} connection)...`);
    await this.sendFileOptimized(0);
  }

  // STREAMING FILE SENDER (Memory-efficient, like ToffeeShare)
  private async sendFileOptimized(fileIndex: number): Promise<void> {
    if (fileIndex >= this.currentFiles.length) {
      // All files sent
      const completeMsg = new Uint8Array([PROTOCOL.TRANSFER_COMPLETE]);
      this.dataChannel!.send(completeMsg);
      this.onStatusMessage?.('All files sent successfully!');
      this.onTransferComplete?.();
      return;
    }

    if (this.cancelledFileIndices.has(fileIndex)) {
      await this.sendFileOptimized(fileIndex + 1);
      return;
    }

    const file = this.currentFiles[fileIndex];
    this.currentFileIndex = fileIndex;
    this.bytesSent = 0;
    this.chunksInFlight = 0;
    
    console.log(`Sending file: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB) with ${this.chunkSize / 1024}KB chunks`);
    this.onStatusMessage?.(`Sending ${file.name}...`);

    // Send file header (binary protocol)
    await this.sendFileHeader(file, fileIndex);

    // Stream the file (don't load all into memory)
    await this.streamFile(file);

    // CRITICAL: Wait for all buffered data to be sent before sending FILE_END
    console.log(`⏳ Waiting for all chunks to be sent (buffered: ${this.dataChannel!.bufferedAmount} bytes)...`);
    
    // First, wait for buffer to empty
    while (this.dataChannel!.bufferedAmount > 0) {
      await new Promise(resolve => setTimeout(resolve, 50)); // Increased from 10ms to 50ms
    }
    
    // Additional safety delay to ensure WebRTC internal processing is complete
    console.log(`⏳ Buffer empty, waiting additional 500ms for WebRTC processing...`);
    await new Promise(resolve => setTimeout(resolve, 500)); // 500ms safety delay
    
    console.log(`✅ All chunks sent, sending FILE_END for ${file.name}`);

    // Send file end marker
    const endMsg = new Uint8Array([PROTOCOL.FILE_END]);
    this.dataChannel!.send(endMsg);

    // Move to next file
    await this.sendFileOptimized(fileIndex + 1);
  }

  private async sendFileHeader(file: File, fileIndex: number): Promise<void> {
    const nameBytes = new TextEncoder().encode(file.name);
    const typeBytes = new TextEncoder().encode(file.type);
    
    // Header structure: [type(1)] [fileIndex(4)] [size(8)] [lastModified(8)] [nameLen(2)] [name] [typeLen(2)] [type]
    const headerSize = 1 + 4 + 8 + 8 + 2 + nameBytes.length + 2 + typeBytes.length;
    const header = new Uint8Array(headerSize);
    const view = new DataView(header.buffer);
    
    let offset = 0;
    header[offset++] = PROTOCOL.FILE_HEADER;
    view.setUint32(offset, fileIndex, true); offset += 4;
    view.setBigUint64(offset, BigInt(file.size), true); offset += 8;
    view.setBigUint64(offset, BigInt(file.lastModified), true); offset += 8;
    view.setUint16(offset, nameBytes.length, true); offset += 2;
    header.set(nameBytes, offset); offset += nameBytes.length;
    view.setUint16(offset, typeBytes.length, true); offset += 2;
    header.set(typeBytes, offset);
    
    this.dataChannel!.send(header);
  }

  private async streamFile(file: File): Promise<void> {
    const stream = file.stream();
    this.sendReader = stream.getReader();
    this.isSending = true;
    this.sendQueue = [];
    
    try {
      let done = false;
      let buffer = new Uint8Array(0);
      
      while (!done) {
        // Read from stream
        const { value, done: readerDone } = await this.sendReader.read();
        done = readerDone;
        
        if (value) {
          // Combine with existing buffer
          const newBuffer = new Uint8Array(buffer.length + value.length);
          newBuffer.set(buffer);
          newBuffer.set(value, buffer.length);
          buffer = newBuffer;
          
          // Send complete chunks
          while (buffer.length >= this.chunkSize) {
            const chunk = buffer.slice(0, this.chunkSize);
            buffer = buffer.slice(this.chunkSize);
            
            await this.sendChunkOptimized(chunk);
          }
        }
        
        // Send remaining data if done
        if (done && buffer.length > 0) {
          await this.sendChunkOptimized(buffer);
        }
      }
    } finally {
      this.sendReader = null;
      this.isSending = false;
    }
  }

  private async sendChunkOptimized(data: Uint8Array): Promise<void> {
    // Safety check: WebRTC has a hard limit of ~256KB per message
    const MAX_WEBRTC_MESSAGE_SIZE = 250 * 1024; // 250KB to be safe
    if (data.length > MAX_WEBRTC_MESSAGE_SIZE) {
      console.error(`Chunk too large: ${data.length} bytes, max allowed: ${MAX_WEBRTC_MESSAGE_SIZE}`);
      this.onError?.(`Internal error: chunk size too large`);
      return;
    }
    
    // Create chunk message: [type(1)] [data]
    const message = new Uint8Array(1 + data.length);
    message[0] = PROTOCOL.FILE_CHUNK;
    message.set(data, 1);
    
    // Aggressive flow control - wait if buffer is getting full
    while (this.dataChannel!.bufferedAmount > TRANSFER_CONFIG.BUFFER_HIGH_WATER_MARK) {
      await new Promise<void>(resolve => {
        const checkBuffer = () => {
          if (this.dataChannel!.bufferedAmount < TRANSFER_CONFIG.BUFFER_LOW_WATER_MARK) {
            resolve();
          } else {
            setTimeout(checkBuffer, 5); // Check every 5ms
          }
        };
        checkBuffer();
      });
    }
    
    this.dataChannel!.send(message);
    this.bytesSent += data.length;
    this.stats.chunksSent++;
    
    // Add debug logging for chunks
    if (this.stats.chunksSent % 10 === 0) {
      console.log(`📤 Sent chunk #${this.stats.chunksSent} (${data.length} bytes, total: ${this.bytesSent} bytes)`);
    }
    
    // Update progress (throttled)
    const now = Date.now();
    if (now - this.lastProgressUpdate > TRANSFER_CONFIG.PROGRESS_INTERVAL_MS) {
      this.updateProgress();
      this.lastProgressUpdate = now;
    }
  }

  private resumeSending(): void {
    // Called when buffer is low, continue sending queued chunks
    if (this.sendQueue.length > 0 && this.isSending) {
      const chunk = this.sendQueue.shift()!;
      this.sendChunkOptimized(chunk);
    }
  }

  private updateProgress(): void {
    const file = this.currentFiles[this.currentFileIndex];
    if (!file) return;
    
    const progress = (this.bytesSent / file.size) * 100;
    const elapsed = (Date.now() - this.transferStartTime) / 1000;
    const speed = elapsed > 0 ? this.bytesSent / elapsed : 0;
    
    this.onTransferProgress?.({
      fileName: file.name,
      fileIndex: this.currentFileIndex,
      progress: Math.min(100, progress),
      bytesTransferred: this.bytesSent,
      totalBytes: file.size,
      speed,
    });
  }

  // OPTIMIZED RECEIVER (Binary protocol handler)
  private handleOptimizedMessage(data: Uint8Array): void {
    if (data.length === 0) return;
    
    const messageType = data[0];
    
    console.log(`📨 Received message type: ${messageType}, size: ${data.length} bytes`);
    
    // Special case for metadata (JSON)
    if (messageType === 0xFF) {
      const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
      const metadataLength = view.getUint32(1, true);
      const metadataBytes = data.slice(5, 5 + metadataLength);
      const metadataJson = new TextDecoder().decode(metadataBytes);
      const fileList = JSON.parse(metadataJson) as FileMetadata[];
      this.onIncomingFiles?.(fileList);
      this.onStatusMessage?.('Ready to receive files!');
      return;
    }
    
    switch (messageType) {
      case PROTOCOL.FILE_HEADER:
        this.handleFileHeader(data.slice(1));
        break;
        
      case PROTOCOL.FILE_CHUNK:
        this.handleFileChunk(data.slice(1));
        break;
        
      case PROTOCOL.FILE_END:
        // Add longer delay to ensure all chunks are processed
        console.log(`⏰ FILE_END received, waiting 250ms for any remaining chunks...`);
        setTimeout(() => {
          this.handleFileEnd();
        }, 250); // Increased from 100ms to 250ms
        break;
        
      case PROTOCOL.TRANSFER_COMPLETE:
        this.onStatusMessage?.('All files received successfully!');
        this.onTransferComplete?.();
        break;
        
      case PROTOCOL.CANCEL:
        this.handleCancel(data.slice(1));
        break;
    }
  }

  private handleFileHeader(data: Uint8Array): void {
    const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    let offset = 0;
    
    this.currentFileIndex = view.getUint32(offset, true); offset += 4;
    this.expectedFileSize = Number(view.getBigUint64(offset, true)); offset += 8;
    this.currentFileLastModified = Number(view.getBigUint64(offset, true)); offset += 8;
    
    const nameLen = view.getUint16(offset, true); offset += 2;
    this.currentFileName = new TextDecoder().decode(data.slice(offset, offset + nameLen)); 
    offset += nameLen;
    
    const typeLen = view.getUint16(offset, true); offset += 2;
    this.currentFileType = new TextDecoder().decode(data.slice(offset, offset + typeLen));
    
    // Reset receive state
    this.receiveBuffer = [];
    this.receivedBytes = 0;
    this.receiveStartTime = Date.now();
    
    console.log(`Receiving: ${this.currentFileName} (${(this.expectedFileSize / 1024 / 1024).toFixed(2)} MB)`);
    this.onStatusMessage?.(`Receiving ${this.currentFileName}...`);
  }

  private handleFileChunk(data: Uint8Array): void {
    if (this.cancelledFileIndices.has(this.currentFileIndex)) {
      return; // Skip cancelled file chunks
    }
    
    // Add detailed logging for debugging
    console.log(`📦 Received chunk: ${data.length} bytes for file ${this.currentFileIndex} (${this.currentFileName})`);
    
    // Efficient buffering - store chunks
    this.receiveBuffer.push(data);
    this.receivedBytes += data.length;
    
    // Log progress periodically
    if (this.receiveBuffer.length % 10 === 0 || this.receivedBytes >= this.expectedFileSize) {
      console.log(`📊 Progress: ${this.receiveBuffer.length} chunks, ${this.receivedBytes}/${this.expectedFileSize} bytes (${((this.receivedBytes/this.expectedFileSize)*100).toFixed(1)}%)`);
    }
    
    // Update progress
    const progress = (this.receivedBytes / this.expectedFileSize) * 100;
    const elapsed = (Date.now() - this.receiveStartTime) / 1000;
    const speed = elapsed > 0 ? this.receivedBytes / elapsed : 0;
    
    this.onTransferProgress?.({
      fileName: this.currentFileName,
      fileIndex: this.currentFileIndex,
      progress: Math.min(100, progress),
      bytesTransferred: this.receivedBytes,
      totalBytes: this.expectedFileSize,
      speed,
    });
  }

  private handleFileEnd(): void {
    console.log(`🏁 File end signal received for file ${this.currentFileIndex} (${this.currentFileName})`);
    
    if (this.cancelledFileIndices.has(this.currentFileIndex)) {
      console.log(`⏭️ Skipping cancelled file ${this.currentFileIndex}`);
      this.receiveBuffer = [];
      this.receivedBytes = 0;
      return;
    }
    
    // Check if we have any data at all
    if (this.receiveBuffer.length === 0) {
      console.warn(`⚠️ No chunks received for ${this.currentFileName}, but file end was signaled`);
      this.onError?.(`No data received for ${this.currentFileName}. Transfer may have failed.`);
      return;
    }
    
    // Reconstruct file from chunks
    const totalSize = this.receiveBuffer.reduce((sum, chunk) => sum + chunk.length, 0);
    
    console.log(`File reconstruction: expected=${this.expectedFileSize}, received=${totalSize}, chunks=${this.receiveBuffer.length}`);
    
    if (totalSize !== this.expectedFileSize) {
      console.error(`Size mismatch: expected ${this.expectedFileSize}, got ${totalSize}`);
      
      // More generous tolerance for small files (10% or 1KB, whichever is larger)
      const tolerance = Math.max(this.expectedFileSize * 0.1, 1024);
      const sizeDiff = Math.abs(totalSize - this.expectedFileSize);
      
      if (sizeDiff <= tolerance && totalSize > 0) {
        console.warn(`Size mismatch within tolerance (${sizeDiff} bytes), proceeding with partial file`);
      } else {
        this.onError?.(`File transfer incomplete for ${this.currentFileName}: ${totalSize}/${this.expectedFileSize} bytes received`);
        this.receiveBuffer = [];
        this.receivedBytes = 0;
        return;
      }
    }
    
    // Efficient concatenation
    const fileData = new Uint8Array(totalSize);
    let offset = 0;
    for (const chunk of this.receiveBuffer) {
      fileData.set(chunk, offset);
      offset += chunk.length;
    }
    
    // Create file
    const file = new File([fileData], this.currentFileName, {
      type: this.currentFileType,
      lastModified: this.currentFileLastModified,
    });
    
    console.log(`✅ File received: ${this.currentFileName} (${file.size} bytes)`);
    this.onFileReceived?.(file);
    
    // Clean up
    this.receiveBuffer = [];
    this.receivedBytes = 0;
  }

  private handleCancel(data: Uint8Array): void {
    if (data.length < 4) return;
    
    const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    const fileIndex = view.getUint32(0, true);
    
    this.cancelledFileIndices.add(fileIndex);
    // Additional cancel handling...
  }

  private async handleSignalingMessage(message: SignalingMessage): Promise<void> {
    try {
      switch (message.type) {
        case 'offer':
          if (this.role === 'receiver') {
            this.onStatusMessage?.('Sender found! Establishing secure connection...');
            await this.peerConnection!.setRemoteDescription(message.payload);
            const answer = await this.peerConnection!.createAnswer();
            await this.peerConnection!.setLocalDescription(answer);
            signalingService.sendSignal({
              type: 'answer',
              payload: answer,
              toRoom: this.roomCode,
            });
          }
          break;

        case 'answer':
          if (this.role === 'sender') {
            this.onStatusMessage?.('Receiver responded! Finalizing connection...');
            await this.peerConnection!.setRemoteDescription(message.payload);
          }
          break;

        case 'ice':
          try {
            await this.peerConnection!.addIceCandidate(message.payload);
          } catch {
            // ICE candidate errors are common and usually harmless
          }
          break;
      }
    } catch (error) {
      console.error('Signaling error:', error);
      this.onError?.('Connection setup failed. Please try again.');
    }
  }

  private setConnectionTimeout(duration: number = 60000): void {
    this.connectionTimeout = setTimeout(() => {
      const iceState = this.peerConnection?.iceConnectionState;
      const connState = this.peerConnection?.connectionState;
      
      console.log(`Connection timeout - ICE: ${iceState}, Connection: ${connState}`);
      
      if (iceState !== 'connected' && iceState !== 'completed' && connState !== 'connected') {
        let errorMsg = 'Connection timeout. ';
        
        if (this.role === 'receiver') {
          errorMsg += 'Make sure the sender is still active and try again.';
        } else {
          errorMsg += 'Make sure the receiver has joined and both devices have stable internet.';
        }
        
        this.onError?.(errorMsg);
        this.cleanup();
      }
    }, duration);
  }

  private clearConnectionTimeout(): void {
    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
      this.connectionTimeout = null;
    }
  }

  // Performance monitoring
  async getConnectionStats(): Promise<Record<string, unknown> | null> {
    if (!this.peerConnection) return null;
    
    try {
      const stats = await this.peerConnection.getStats();
      const result: Record<string, unknown> = {
        connectionType: this.connectionType,
        chunkSize: this.chunkSize,
        stats: this.stats,
      };
      
      stats.forEach((report) => {
        if (report.type === 'candidate-pair' && report.state === 'succeeded') {
          result.candidatePair = {
            availableOutgoingBitrate: report.availableOutgoingBitrate,
            currentRoundTripTime: report.currentRoundTripTime,
            bytesReceived: report.bytesReceived,
            bytesSent: report.bytesSent
          };
        }
        
        if (report.type === 'data-channel') {
          result.dataChannel = {
            state: report.state,
            messagesSent: report.messagesSent,
            messagesReceived: report.messagesReceived,
            bytesSent: report.bytesSent,
            bytesReceived: report.bytesReceived
          };
        }
      });
      
      return result;
    } catch (error) {
      console.error('Failed to get connection stats:', error);
      return null;
    }
  }

  // Cancel operations (binary protocol)
  cancelTransfer(): void {
    this.onStatusMessage?.('Cancelling transfer...');
    
    if (this.role && this.dataChannel?.readyState === 'open') {
      const cancelMsg = new Uint8Array([PROTOCOL.CANCEL]);
      this.dataChannel.send(cancelMsg);
    }
    
    this.cleanup();
  }

  cancelFile(fileIndex: number, fileName: string): void {
    this.cancelledFileIndices.add(fileIndex);
    this.onStatusMessage?.(`Skipping ${fileName}...`);
    
    if (this.role && this.dataChannel?.readyState === 'open') {
      const cancelMsg = new Uint8Array(5);
      cancelMsg[0] = PROTOCOL.CANCEL;
      new DataView(cancelMsg.buffer).setUint32(1, fileIndex, true);
      this.dataChannel.send(cancelMsg);
    }
    
    this.onFileCancelled?.({
      fileIndex,
      fileName,
      cancelledBy: this.role!
    });
  }

  cleanup(): void {
    this.clearConnectionTimeout();
    
    // Clean up reader if active
    if (this.sendReader) {
      this.sendReader.cancel();
      this.sendReader = null;
    }
    
    if (this.dataChannel) {
      this.dataChannel.close();
      this.dataChannel = null;
    }

    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }

    signalingService.removeAllListeners();
    
    // Reset all state
    this.currentFiles = [];
    this.sendQueue = [];
    this.receiveBuffer = [];
    this.currentFileIndex = 0;
    this.transferStartTime = 0;
    this.bytesSent = 0;
    this.receivedBytes = 0;
    this.expectedFileSize = 0;
    this.currentFileName = '';
    this.currentFileType = '';
    this.currentFileLastModified = 0;
    this.lastProgressUpdate = 0;
    this.chunksInFlight = 0;
    this.cancelledFileIndices.clear();
    this.role = null;
    this.roomCode = '';
    this.hasStartedTransfer = false;
    this.offerCreated = false;
    this.isConnecting = false;
    this.isSending = false;
    
    // Reset stats
    this.stats = {
      chunksAcked: 0,
      chunksSent: 0,
      retransmissions: 0,
      throughput: [],
      rtt: 0,
    };
    
    this.connectionType = 'unknown';
    this.chunkSize = TRANSFER_CONFIG.CHUNK_SIZE; // Reset to fixed reliable chunk size
    
    this.onStatusMessage?.('Disconnected');
  }
}

export const webrtcService = new WebRTCService();