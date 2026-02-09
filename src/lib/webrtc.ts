// HYBRID WebRTC Implementation for Optimal Performance
// Uses binary transfer for phone->PC and Base64 for PC->phone
// Best of both worlds: speed where it works, reliability everywhere

import { FileMetadata, SignalingMessage } from '@/types';
import { signalingService } from './signaling';

// Detect if mobile device
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
    || window.innerWidth < 768;
};

// Adaptive configuration based on sender device
const CONFIG = {
  // Mobile senders (to PC): Use BINARY with optimized chunks for speed
  BINARY_CHUNK_SIZE_SMALL: 64 * 1024,          // 64KB chunks for better speed
  BINARY_CHUNK_SIZE_NORMAL: 128 * 1024,        // 128KB for even better throughput
  BINARY_BUFFER_THRESHOLD: 512 * 1024,         // 512KB buffer for maximum speed
  
  // PC senders (to mobile): Use Base64 when PC does the heavy lifting
  BASE64_CHUNK_SIZE: 32 * 1024,                // 32KB Base64 chunks
  BASE64_BUFFER_THRESHOLD: 128 * 1024,         // 128KB buffer for Base64
  
  // File size thresholds
  LARGE_FILE_THRESHOLD: 5 * 1024 * 1024, // 5MB threshold for chunk size adjustment
  
  ACK_TIMEOUT: 3000,          // 3 second timeout
  MAX_RETRIES: 5,             // More retries for binary reliability
  PROGRESS_UPDATE_INTERVAL: 200,  // Faster updates for better UX
  CHUNK_TIMEOUT: 30000,       // 30 seconds for chunks (increased for mobile)
  FILE_COMPLETE_GRACE_BINARY: 12000, // Wait for late binary chunks after FILE_COMPLETE
  FILE_COMPLETE_GRACE_BASE64: 4000,  // Base64 is same-channel, needs less grace
  BUFFER_DRAIN_TIMEOUT: 20000,       // Max wait for sender channel buffer drain
};

// Message types for both protocols
const MSG_TYPE = {
  FILE_LIST: 'FILE_LIST',
  FILE_START: 'FILE_START',
  FILE_CHUNK_BINARY: 'FILE_CHUNK_BINARY',  // Binary chunk notification
  FILE_CHUNK_BASE64: 'FILE_CHUNK_BASE64',  // Base64 chunk data
  FILE_COMPLETE: 'FILE_COMPLETE',
  FILE_ACK: 'FILE_ACK',                    // Acknowledgment that file was successfully received
  CHUNK_ACK: 'CHUNK_ACK',
  TRANSFER_COMPLETE: 'TRANSFER_COMPLETE',
  PROGRESS_SYNC: 'PROGRESS_SYNC',          // Synchronize progress between sender and receiver
  CONVERSION_PROGRESS: 'CONVERSION_PROGRESS',
  FILE_CANCEL: 'FILE_CANCEL',              // Individual file cancellation
  CANCEL: 'CANCEL',                        // Full transfer cancellation
  ERROR: 'ERROR',
  SPEED_TEST: 'SPEED_TEST',
  SPEED_RESULT: 'SPEED_RESULT',
} as const;

type TransferMethod = 'binary' | 'base64';
type ControlMessageType = (typeof MSG_TYPE)[keyof typeof MSG_TYPE];

interface ControlMessage {
  type: ControlMessageType;
  fileIndex?: number;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  lastModified?: number;
  chunkIndex?: number;
  totalChunks?: number;
  chunkSize?: number;
  data?: string; // Base64 encoded chunk data
  files?: FileMetadata[];
  message?: string;
  progress?: number; // Progress percentage for sync messages
  conversionProgress?: number;
  stage?: 'converting' | 'transferring';
  cancelledBy?: 'sender' | 'receiver';
  transferMethod?: TransferMethod;
}

interface ReceivedFileInfo {
  metadata: FileMetadata;
  chunks: Map<number, string | ArrayBuffer>;
  totalChunks: number;
  receivedChunks: Set<number>;
  bytesReceived: number;
  startTime: number;
  complete: boolean;
  transferMethod: TransferMethod;
}

export class WebRTCService {
  private peerConnection: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private binaryChannel: RTCDataChannel | null = null; // For binary transfers
  private roomCode: string = '';
  private role: 'sender' | 'receiver' | null = null;
  
  // Transfer method detection
  private senderIsMobile: boolean = false;
  private transferMethod: TransferMethod = 'base64';
  
  // Adaptive settings
  private chunkSize: number = CONFIG.BASE64_CHUNK_SIZE;
  private bufferThreshold: number = CONFIG.BASE64_BUFFER_THRESHOLD;
  
  // ICE configuration
  private readonly config: RTCConfiguration = {
    iceServers: [
      ...(process.env.NEXT_PUBLIC_TURN_URL && process.env.NEXT_PUBLIC_TURN_USER && process.env.NEXT_PUBLIC_TURN_PASS ? [{
        urls: process.env.NEXT_PUBLIC_TURN_URL,
        username: process.env.NEXT_PUBLIC_TURN_USER,
        credential: process.env.NEXT_PUBLIC_TURN_PASS
      }] : []),
      
      ...(process.env.NEXT_PUBLIC_STUN_URL ? [{
        urls: process.env.NEXT_PUBLIC_STUN_URL
      }] : []),
    ],
    // For testing TURN server, you can temporarily force relay-only mode:
    // iceTransportPolicy: 'relay', // Uncomment this line to test TURN only
    iceTransportPolicy: 'all',
    bundlePolicy: 'max-bundle',
    rtcpMuxPolicy: 'require',
    iceCandidatePoolSize: 10,
  };
  
  // Event handlers
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
    stage: 'converting' | 'transferring';
    conversionProgress?: number;
  }) => void;
  public onTransferComplete?: () => void;
  public onTransferCancelled?: (cancelledBy: 'sender' | 'receiver') => void;
  public onFileCancelled?: (data: { fileIndex: number; fileName: string; cancelledBy: 'sender' | 'receiver' }) => void;
  public onError?: (error: string) => void;
  public onStatusMessage?: (message: string) => void;
  
  // Sender state
  private filesToSend: File[] = [];
  private currentSendIndex = 0;
  private sendChunksMap = new Map<number, string[]>(); // For Base64 chunks
  private sendProgressMap = new Map<number, {
    sentChunks: Set<number>;
    totalChunks: number;
    startTime: number;
    lastProgressUpdate: number;
  }>();
  private cancelledFiles = new Set<number>(); // Track cancelled file indices
  private acknowledgedFiles = new Set<number>(); // Track files confirmed received by peer
  private transferCompleted = false; // Track if transfer finished successfully
  private transferStarted = false;
  private serverTransferActive = false;
  
  // Receiver state - hybrid approach
  private receivedFiles = new Map<number, ReceivedFileInfo>();
  
  private expectedFiles: FileMetadata[] = [];
  private connectionTimeout: NodeJS.Timeout | null = null;
  private pendingIceCandidates: RTCIceCandidateInit[] = [];
  private hasRemoteDescription = false;
  
  // Binary channel handling
  private setWaitingForChunk?: (fileIndex: number, chunkIndex: number, chunkSize: number) => void;

  get currentRole(): 'sender' | 'receiver' | null {
    return this.role;
  }

  private isControlMessage(value: unknown): value is ControlMessage {
    if (!value || typeof value !== 'object') return false;
    const candidate = value as { type?: unknown };
    return typeof candidate.type === 'string' && Object.values(MSG_TYPE).includes(candidate.type as ControlMessageType);
  }

  private async waitForChannelOpen(
    getChannel: () => RTCDataChannel | null,
    label: 'control' | 'binary',
    timeoutMs: number = 10000,
  ): Promise<RTCDataChannel> {
    const existing = getChannel();
    if (existing?.readyState === 'open') {
      return existing;
    }

    return new Promise((resolve, reject) => {
      const startedAt = Date.now();

      const checkChannel = () => {
        const channel = getChannel();
        if (channel?.readyState === 'open') {
          clearInterval(intervalId);
          resolve(channel);
          return;
        }

        if (Date.now() - startedAt >= timeoutMs) {
          clearInterval(intervalId);
          reject(new Error(`${label} data channel did not open within ${timeoutMs}ms`));
        }
      };

      const intervalId = setInterval(checkChannel, 50);
      checkChannel();
    });
  }

  private async waitForChannelBufferDrain(
    channel: RTCDataChannel,
    label: 'control' | 'binary',
    timeoutMs: number = CONFIG.BUFFER_DRAIN_TIMEOUT,
  ): Promise<void> {
    const startedAt = Date.now();

    while (channel.readyState === 'open' && channel.bufferedAmount > 0) {
      if (Date.now() - startedAt >= timeoutMs) {
        console.warn(
          `Timed out waiting for ${label} channel buffer drain (${channel.bufferedAmount} bytes still queued)`,
        );
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 20));
    }
  }

  private async waitForExpectedChunks(
    fileIndex: number,
    expectedChunks: number,
    timeoutMs: number,
  ): Promise<boolean> {
    const startedAt = Date.now();

    while (Date.now() - startedAt < timeoutMs) {
      const fileInfo = this.receivedFiles.get(fileIndex);
      if (!fileInfo) {
        return false;
      }

      if (fileInfo.receivedChunks.size >= expectedChunks) {
        return true;
      }

      await new Promise((resolve) => setTimeout(resolve, 120));
    }

    const fileInfo = this.receivedFiles.get(fileIndex);
    return !!fileInfo && fileInfo.receivedChunks.size >= expectedChunks;
  }

  private async flushPendingIceCandidates(): Promise<void> {
    const peerConnection = this.peerConnection;
    if (!peerConnection || !peerConnection.remoteDescription || this.pendingIceCandidates.length === 0) {
      return;
    }

    const queuedCandidates = [...this.pendingIceCandidates];
    this.pendingIceCandidates = [];

    for (const candidate of queuedCandidates) {
      try {
        await peerConnection.addIceCandidate(candidate);
      } catch (error) {
        console.warn('Failed to add queued ICE candidate:', error);
      }
    }
  }

  private getTotalFilesSize(): number {
    return this.filesToSend.reduce((total, file) => total + file.size, 0);
  }

  private notifyServerTransferStart(): void {
    if (this.role !== 'sender' || !this.roomCode || this.serverTransferActive) {
      return;
    }

    signalingService.emitTransferStart(this.roomCode);
    this.serverTransferActive = true;
  }

  private notifyServerTransferComplete(totalBytes?: number): void {
    if (this.role !== 'sender' || !this.roomCode || !this.serverTransferActive) {
      return;
    }

    signalingService.emitTransferComplete(this.roomCode, totalBytes);
    this.serverTransferActive = false;
  }

  private notifyServerTransferCancelled(
    cancelledBy: 'sender' | 'receiver' | 'system' = 'system',
    reason?: string,
  ): void {
    if (this.role !== 'sender' || !this.roomCode || !this.serverTransferActive) {
      return;
    }

    signalingService.emitTransferCancel(this.roomCode, cancelledBy, reason);
    this.serverTransferActive = false;
  }

  async initializeAsSender(roomCode: string, files: File[]): Promise<void> {
    console.log(`🚀 Initializing as SENDER for room: ${roomCode}`);
    console.log(`📁 Files to send: ${files.length} (${files.map(f => f.name).join(', ')})`);
    
    this.roomCode = roomCode;
    this.role = 'sender';
    this.filesToSend = files;
    
    // Reset tracking for new transfer
    this.cancelledFiles.clear();
    this.acknowledgedFiles.clear();
    this.sendProgressMap.clear();
    this.sendChunksMap.clear();
    this.receivedFiles.clear();
    this.expectedFiles = [];
    this.pendingIceCandidates = [];
    this.hasRemoteDescription = false;
    this.transferCompleted = false;
    this.transferStarted = false;
    this.serverTransferActive = false;
    
    // Detect if sender is mobile to choose transfer method
    this.senderIsMobile = isMobileDevice();
    
    // OPTIMIZED: Use binary for mobile (fast, no CPU conversion) with small chunks for reliability
    // Use Base64 only when PC sends to mobile (PC handles conversion overhead)
    this.transferMethod = this.senderIsMobile ? 'binary' : 'base64';
    
    console.log(`📱 Device type: ${this.senderIsMobile ? 'Mobile' : 'PC'}, Transfer method: ${this.transferMethod} (optimized for sender)`);
    
    // Set chunk size based on transfer method and device capability
    this.chunkSize = this.transferMethod === 'binary' ? CONFIG.BINARY_CHUNK_SIZE_SMALL : CONFIG.BASE64_CHUNK_SIZE;
    this.bufferThreshold = this.transferMethod === 'binary' ? CONFIG.BINARY_BUFFER_THRESHOLD : CONFIG.BASE64_BUFFER_THRESHOLD;
    console.log(`Using ${this.transferMethod} transfer with chunk size ${this.chunkSize / 1024}KB`);
    
    this.onStatusMessage?.('Preparing to send files...');
    
    await this.createPeerConnection();
    this.createDataChannels();
    
    if (!this.peerConnection) {
      throw new Error('Peer connection initialization failed');
    }

    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    
    signalingService.sendSignal({
      type: 'offer',
      payload: offer,
      toRoom: roomCode,
    });
    
    this.onStatusMessage?.('Waiting for receiver...');
    this.setConnectionTimeout();
  }

  async initializeAsReceiver(roomCode: string): Promise<void> {
    console.log(`📥 Initializing as RECEIVER for room: ${roomCode}`);
    
    this.roomCode = roomCode;
    this.role = 'receiver';
    this.receivedFiles.clear();
    this.expectedFiles = [];
    this.cancelledFiles.clear();
    this.pendingIceCandidates = [];
    this.hasRemoteDescription = false;
    this.transferCompleted = false;
    this.transferStarted = false;
    this.serverTransferActive = false;
    
    this.onStatusMessage?.('Connecting to sender...');
    
    console.log('📥 Creating peer connection for receiver...');
    await this.createPeerConnection();
    this.setupDataChannelReceivers();
    
    this.setConnectionTimeout();
    console.log('📥 Receiver initialization complete, waiting for sender...');
  }

  private async createPeerConnection(): Promise<void> {
    console.log('Creating WebRTC peer connection...');

    // Debug ICE server configuration
    console.log('ICE Configuration:', {
      iceServers: this.config.iceServers,
      iceTransportPolicy: this.config.iceTransportPolicy,
      turnConfigured: !!(process.env.NEXT_PUBLIC_TURN_URL && process.env.NEXT_PUBLIC_TURN_USER && process.env.NEXT_PUBLIC_TURN_PASS),
      stunConfigured: !!process.env.NEXT_PUBLIC_STUN_URL,
    });

    this.peerConnection = new RTCPeerConnection(this.config);
    const peerConnection = this.peerConnection;

    peerConnection.onconnectionstatechange = () => {
      const state = peerConnection.connectionState;
      console.log(`Connection state: ${state}`);
      this.onConnectionStateChange?.(state);

      if (state === 'connected') {
        this.clearConnectionTimeout();
        this.onStatusMessage?.('Connected! Preparing transfer...');
      } else if (state === 'failed') {
        this.onError?.('Connection failed. Please try again.');
        this.cleanup();
      } else if (state === 'disconnected') {
        // Only treat disconnection as error if transfer was incomplete
        if (!this.transferCompleted) {
          this.onError?.('Connection lost. Transfer incomplete.');
        }
      }
    };

    peerConnection.oniceconnectionstatechange = () => {
      console.log(`ICE connection state: ${peerConnection.iceConnectionState}`);
    };

    peerConnection.onicegatheringstatechange = () => {
      console.log(`ICE gathering state: ${peerConnection.iceGatheringState}`);
    };

    peerConnection.onicecandidate = (event) => {
      if (!event.candidate) {
        console.log('ICE gathering complete');
        return;
      }

      console.log('Sending ICE candidate', {
        type: event.candidate.type,
        protocol: event.candidate.protocol,
      });

      signalingService.sendSignal({
        type: 'ice',
        payload: event.candidate,
        toRoom: this.roomCode,
      });
    };

    signalingService.offSignal();
    signalingService.onSignal((message) => {
      void this.handleSignalingMessage(message);
    });

    console.log('Peer connection setup complete');
  }

  private createDataChannels(): void {
    console.log(`📺 Creating data channels for ${this.role} with transfer method: ${this.transferMethod}`);
    
    // Control channel for JSON messages
    this.dataChannel = this.peerConnection!.createDataChannel('control', {
      ordered: true,
    });
    console.log('📺 Control data channel created');
    
    // Binary channel only for binary transfers
    if (this.transferMethod === 'binary') {
      // Create binary channel optimized for high throughput with reliability
      this.binaryChannel = this.peerConnection!.createDataChannel('binary', {
        ordered: true, // Keep ordered and reliable for chunk integrity
      });
      this.binaryChannel.binaryType = 'arraybuffer';
      console.log('📺 Binary data channel created');
    }
    
    this.setupDataChannelHandlers();
    if (this.binaryChannel) {
      this.setupBinaryChannelHandlers();
    }
  }

  private setupDataChannelReceivers(): void {
    this.peerConnection!.ondatachannel = (event) => {
      const channel = event.channel;
      
      if (channel.label === 'control') {
        this.dataChannel = channel;
        this.setupDataChannelHandlers();
      } else if (channel.label === 'binary') {
        this.binaryChannel = channel;
        this.binaryChannel.binaryType = 'arraybuffer';
        this.setupBinaryChannelHandlers();
      }
    };
  }

  private setupDataChannelHandlers(): void {
    if (!this.dataChannel) return;
    
    this.dataChannel.onopen = () => {
      console.log('Control channel opened');
      this.onDataChannelOpen?.();
      
      if (this.role === 'sender' && this.filesToSend.length > 0) {
        setTimeout(() => {
          void this.startTransfer();
        }, 100);
      }
    };
    
    this.dataChannel.onclose = () => {
      this.onDataChannelClose?.();
      this.onStatusMessage?.('Connection closed');
    };
    
    this.dataChannel.onerror = (error) => {
      console.error('Data channel error:', error);
      // Only treat as error if transfer wasn't completed successfully
      if (!this.transferCompleted) {
        this.onError?.('Connection error occurred');
      } else {
        console.log('✅ Data channel closed after successful transfer');
      }
    };
    
    this.dataChannel.onmessage = async (event) => {
      try {
        // Check if this is an optimized Base64 chunk (starts with fileIndex:chunkIndex:length|)
        const data = event.data;
        if (typeof data === 'string') {
          if (/^\d+:\d+:\d+\|/.test(data)) {
            // Parse optimized Base64 chunk format: "fileIndex:chunkIndex:length|base64data"
            const pipeIndex = data.indexOf('|');
            const header = data.substring(0, pipeIndex);
            const base64Data = data.substring(pipeIndex + 1);
            
            const [fileIndex, chunkIndex] = header.split(':').map(Number);
            
            console.log(`📥 Received optimized Base64 chunk ${chunkIndex} for file ${fileIndex} (${base64Data.length} chars)`);
            
            // Convert to standard message format for existing handler
            const message: ControlMessage = {
              type: MSG_TYPE.FILE_CHUNK_BASE64,
              fileIndex,
              chunkIndex,
              data: base64Data,
            };
            
            this.handleBase64Chunk(message);
          } else if (data.startsWith('CONV:')) {
            // Parse compact conversion progress: "CONV:fileIndex:progress"
            const parts = data.split(':');
            if (parts.length === 3) {
              const fileIndex = parseInt(parts[1]);
              const conversionProgress = parseInt(parts[2]);
              
              console.log(`📥 Received compact conversion progress: ${conversionProgress}% for file ${fileIndex}`);
              
              // Convert to standard message format for existing handler
              const message: ControlMessage = {
                type: MSG_TYPE.CONVERSION_PROGRESS,
                fileIndex,
                conversionProgress,
                stage: 'converting',
                fileName: this.expectedFiles[fileIndex]?.name || `File ${fileIndex}`,
              };
              
              this.handleConversionProgress(message);
            }
          } else {
            // Standard JSON message format
            const parsed = JSON.parse(data) as unknown;
            if (!this.isControlMessage(parsed)) {
              console.warn('Ignoring invalid control message payload');
              return;
            }
            await this.handleControlMessage(parsed);
          }
        } else {
          // Handle non-string data (shouldn't happen on data channel)
          console.warn('Received non-string data on data channel:', data);
        }
      } catch (error) {
        console.error('Error handling data channel message:', error);
      }
    };
  }

  private setupBinaryChannelHandlers(): void {
    if (!this.binaryChannel) return;
    
    // Track expected chunks per file
    const expectedChunks = new Map<number, {
      fileIndex: number;
      chunkIndex: number;
      chunkSize: number;
      timeout: NodeJS.Timeout;
    }>();
    
    this.binaryChannel.onopen = () => {
      console.log('Binary channel opened');
    };
    
    this.binaryChannel.onmessage = (event) => {
      if (event.data instanceof ArrayBuffer) {
        const data = event.data;
        
        // Check if this is optimized format with embedded metadata (8-byte header)
        if (data.byteLength >= 8) {
          const headerView = new DataView(data, 0, 8);
          const fileIndex = headerView.getUint32(0, true);
          const chunkIndex = headerView.getUint32(4, true);
          
          // Extract actual chunk data (everything after 8-byte header)
          const chunkData = data.slice(8);
          
          console.log(`📦 Received optimized binary chunk ${chunkIndex} for file ${fileIndex} (${chunkData.byteLength} bytes + 8 byte header)`);
          this.handleBinaryChunk(fileIndex, chunkIndex, chunkData);
        } else {
          // Legacy format - try to match with expected chunks
          let matchingChunk: { fileIndex: number; chunkIndex: number; chunkSize: number; timeout: NodeJS.Timeout } | null = null;
          
          for (const [key, expected] of expectedChunks) {
            if (expected.chunkSize === data.byteLength) {
              matchingChunk = expected;
              expectedChunks.delete(key);
              clearTimeout(expected.timeout);
              break;
            }
          }
          
          if (matchingChunk) {
            console.log(`📦 Received legacy binary chunk ${matchingChunk.chunkIndex} for file ${matchingChunk.fileIndex} (${data.byteLength} bytes)`);
            this.handleBinaryChunk(matchingChunk.fileIndex, matchingChunk.chunkIndex, data);
          } else {
            console.error(`❌ Received unexpected binary data: ${data.byteLength} bytes, no matching expected chunk`);
          }
        }
      } else {
        console.warn('Received non-ArrayBuffer data on binary channel');
      }
    };
    
    this.setWaitingForChunk = (fileIndex: number, chunkIndex: number, chunkSize: number) => {
      // Clear any existing timeout for this chunk
      const existing = expectedChunks.get(fileIndex * 10000 + chunkIndex);
      if (existing) {
        clearTimeout(existing.timeout);
      }
      
      // Use longer timeout for large files
      const timeout = setTimeout(() => {
        console.error(`❌ Timeout waiting for chunk ${chunkIndex} of file ${fileIndex} (${chunkSize} bytes)`);
        expectedChunks.delete(fileIndex * 10000 + chunkIndex);
        // Don't fail the whole transfer, just log the missing chunk
      }, CONFIG.CHUNK_TIMEOUT);
      
      expectedChunks.set(fileIndex * 10000 + chunkIndex, { 
        fileIndex, 
        chunkIndex, 
        chunkSize, 
        timeout 
      });
    };
  }

  // SENDER METHODS - Hybrid approach
  private async startTransfer(): Promise<void> {
    if (this.transferStarted) {
      console.warn('Transfer already started, ignoring duplicate start request');
      return;
    }

    if (!this.dataChannel || this.dataChannel.readyState !== 'open') {
      this.onError?.('Connection not ready');
      return;
    }

    this.transferStarted = true;

    try {
      // Ensure binary channel is ready before sending binary payloads
      if (this.transferMethod === 'binary') {
        await this.waitForChannelOpen(() => this.binaryChannel, 'binary', 15000);
      }

      this.notifyServerTransferStart();

      // Send file list with transfer method info
      const fileList: FileMetadata[] = this.filesToSend.map((file, index) => ({
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
        lastModified: file.lastModified,
        fileIndex: index,
      }));

      this.sendControlMessage({
        type: MSG_TYPE.FILE_LIST,
        files: fileList,
        transferMethod: this.transferMethod,
      });

      this.onStatusMessage?.(`Starting transfer (${this.transferMethod} mode)...`);

      if (this.filesToSend.length === 0) {
        this.checkTransferCompletion();
        return;
      }

      // Process all files
      for (let i = 0; i < this.filesToSend.length; i++) {
        if (this.transferMethod === 'binary') {
          await this.sendFileBinary(i);
        } else {
          await this.sendFileBase64(i);
        }
      }

      this.onStatusMessage?.('All files sent! Waiting for confirmation...');
      console.log('All files sent, waiting for peer acknowledgments...');

      // Don't send TRANSFER_COMPLETE here - wait for all FILE_ACK messages
      // The TRANSFER_COMPLETE will be sent by checkTransferCompletion() when all files are acknowledged
    } catch (error) {
      this.transferStarted = false;
      this.notifyServerTransferCancelled('system', 'start-transfer-failed');
      const message = error instanceof Error ? error.message : 'Transfer failed';
      this.onError?.(message);
    }
  }

  // Binary transfer method (mobile to PC)
  private async sendFileBinary(fileIndex: number): Promise<void> {
    const file = this.filesToSend[fileIndex];
    if (!file || this.cancelledFiles.has(fileIndex)) return;

    const binaryChannel = await this.waitForChannelOpen(() => this.binaryChannel, 'binary', 15000);

    // Dynamic chunk sizing based on file size for optimal speed
    let dynamicChunkSize = this.chunkSize;
    if (file.size > CONFIG.LARGE_FILE_THRESHOLD) {
      // Use larger chunks for big files
      dynamicChunkSize = CONFIG.BINARY_CHUNK_SIZE_NORMAL;
      console.log(`Large file detected: Using ${dynamicChunkSize / 1024}KB chunks for better speed`);
    }

    const totalChunks = Math.ceil(file.size / dynamicChunkSize);

    console.log(`Sending ${file.name} via binary: ${totalChunks} chunks of ${dynamicChunkSize / 1024}KB`);

    // Initialize progress
    this.sendProgressMap.set(fileIndex, {
      sentChunks: new Set(),
      totalChunks,
      startTime: Date.now(),
      lastProgressUpdate: Date.now(),
    });

    // Send file start
    this.sendControlMessage({
      type: MSG_TYPE.FILE_START,
      fileIndex,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      lastModified: file.lastModified,
      totalChunks,
      chunkSize: dynamicChunkSize,
      transferMethod: 'binary',
    });

    // Stream file in chunks with flow control
    let offset = 0;
    let chunkIndex = 0;

    while (offset < file.size && !this.cancelledFiles.has(fileIndex)) {
      if (binaryChannel.readyState !== 'open') {
        throw new Error('Binary data channel closed during transfer');
      }

      const chunkSize = Math.min(dynamicChunkSize, file.size - offset);
      const chunk = file.slice(offset, offset + chunkSize);

      while (binaryChannel.bufferedAmount > this.bufferThreshold) {
        if (binaryChannel.readyState !== 'open') {
          throw new Error('Binary data channel closed while waiting for buffer to drain');
        }
        await new Promise((resolve) => setTimeout(resolve, 5));
      }

      const chunkArrayBuffer = await chunk.arrayBuffer();

      // Format: 8-byte header [fileIndex:4 + chunkIndex:4] + actual data
      const header = new ArrayBuffer(8);
      const headerView = new DataView(header);
      headerView.setUint32(0, fileIndex, true);
      headerView.setUint32(4, chunkIndex, true);

      const combinedData = new ArrayBuffer(header.byteLength + chunkArrayBuffer.byteLength);
      const combinedView = new Uint8Array(combinedData);
      combinedView.set(new Uint8Array(header), 0);
      combinedView.set(new Uint8Array(chunkArrayBuffer), header.byteLength);

      try {
        binaryChannel.send(combinedData);

        const progress = this.sendProgressMap.get(fileIndex);
        progress?.sentChunks.add(chunkIndex);
      } catch (error) {
        console.error(`Failed to send chunk ${chunkIndex}:`, error);
        throw error;
      }

      offset += chunkSize;
      chunkIndex++;

      this.updateSendProgress(fileIndex, offset, file.size);
    }

    if (!this.cancelledFiles.has(fileIndex)) {
      // Prevent FILE_COMPLETE from racing ahead of late binary chunks.
      await this.waitForChannelBufferDrain(binaryChannel, 'binary');

      this.sendControlMessage({
        type: MSG_TYPE.FILE_COMPLETE,
        fileIndex,
        fileName: file.name,
        totalChunks,
      });
    }
  }

  // Base64 transfer method (PC to mobile) - from working implementation
  private async sendFileBase64(fileIndex: number): Promise<void> {
    const file = this.filesToSend[fileIndex];
    if (!file || this.cancelledFiles.has(fileIndex)) return;
    
    console.log(`Sending file ${fileIndex}: ${file.name} (${file.size} bytes) via Base64`);
    
    // Ensure data channel is ready before starting conversion
    if (!this.dataChannel || this.dataChannel.readyState !== 'open') {
      console.log('⏳ Waiting for data channel to be ready before starting conversion...');
      // Wait up to 5 seconds for connection
      for (let i = 0; i < 50; i++) {
        if (this.dataChannel?.readyState === 'open') break;
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      if (!this.dataChannel || this.dataChannel.readyState !== 'open') {
        console.error('❌ Data channel not ready for conversion progress updates');
        this.onError?.('Connection not ready');
        return;
      }
    }
    
    console.log('✅ Data channel ready, starting file conversion with progress updates to receiver');
    
    // Show conversion start locally
    this.onTransferProgress?.({
      fileName: file.name,
      fileIndex,
      progress: 0,
      bytesTransferred: 0,
      totalBytes: file.size,
      speed: 0,
      stage: 'converting',
    });
    
    // Convert file to chunks (this will send progress to receiver)
    const chunks = await this.fileToChunks(file, fileIndex);
    if (chunks.length === 0) return; // Cancelled during conversion
    
    this.sendChunksMap.set(fileIndex, chunks);
    
    // Initialize progress tracking
    this.sendProgressMap.set(fileIndex, {
      sentChunks: new Set(),
      totalChunks: chunks.length,
      startTime: Date.now(),
      lastProgressUpdate: Date.now(),
    });
    
    // Send file start message
    this.sendControlMessage({
      type: MSG_TYPE.FILE_START,
      fileIndex,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type || 'application/octet-stream',
      lastModified: file.lastModified,
      totalChunks: chunks.length,
      transferMethod: 'base64',
    });
    
    // Send all chunks with flow control
    for (let i = 0; i < chunks.length && !this.cancelledFiles.has(fileIndex); i++) {
      await this.sendChunkWithFlowControl(fileIndex, i, chunks[i]);
      
      // Update progress
      const progress = this.sendProgressMap.get(fileIndex)!;
      progress.sentChunks.add(i);
      
      const percentComplete = (progress.sentChunks.size / progress.totalChunks) * 100;
      const bytesTransferred = progress.sentChunks.size * this.chunkSize;
      const elapsed = (Date.now() - progress.startTime) / 1000;
      
      // Calculate actual network usage including Base64 overhead and headers
      const base64Overhead = bytesTransferred * 0.33; // Base64 encoding overhead
      const headerOverhead = progress.sentChunks.size * 15; // Compact header size per chunk
      const actualNetworkBytes = bytesTransferred + base64Overhead + headerOverhead;
      const speed = elapsed > 0 ? actualNetworkBytes / elapsed : 0;
      
      this.onTransferProgress?.({
        fileName: file.name,
        fileIndex,
        progress: percentComplete,
        bytesTransferred: Math.min(bytesTransferred, file.size),
        totalBytes: file.size,
        speed, // Now reflects actual network usage
        stage: 'transferring',
      });
    }
    
    if (!this.cancelledFiles.has(fileIndex)) {
      // Send final 100% progress update BEFORE sending FILE_COMPLETE
      this.onTransferProgress?.({
        fileName: file.name,
        fileIndex,
        progress: 100,
        bytesTransferred: file.size,
        totalBytes: file.size,
        speed: 0,
        stage: 'transferring',
      });
      
      // Short delay to ensure UI updates before sending completion message
      await new Promise(resolve => setTimeout(resolve, 100));
      
      this.sendControlMessage({
        type: MSG_TYPE.FILE_COMPLETE,
        fileIndex,
        fileName: file.name,
        totalChunks: chunks.length,
      });
    }
  }

  private async sendChunkWithFlowControl(fileIndex: number, chunkIndex: number, data: string): Promise<void> {
    // Conservative flow control for maximum reliability
    const bufferLimit = this.bufferThreshold * 0.3; // Very conservative buffer limit
    
    // Wait for buffer to clear with timeout protection
    let waitCount = 0;
    const maxWaits = 100; // Maximum waits to prevent infinite loops
    
    while (this.dataChannel && this.dataChannel.bufferedAmount > bufferLimit && waitCount < maxWaits) {
      // Longer waits for better reliability
      const waitTime = 50; // Fixed 50ms wait for stability
      await new Promise(resolve => setTimeout(resolve, waitTime));
      waitCount++;
      
      // Log buffer status every 10 waits
      if (waitCount % 10 === 0) {
        console.log(`⏳ Waiting for buffer: ${this.dataChannel.bufferedAmount}/${bufferLimit} bytes (wait ${waitCount})`);
      }
    }
    
    if (waitCount >= maxWaits) {
      console.warn(`⚠️ Buffer wait timeout for chunk ${chunkIndex} of file ${fileIndex}`);
    }
    
    // Additional delay between chunks for mobile reliability
    if (this.senderIsMobile) {
      await new Promise(resolve => setTimeout(resolve, 25)); // 25ms delay between chunks
    }
    
    // Send chunk with validation
    try {
      const chunkHeader = `${fileIndex}:${chunkIndex}:${data.length}|`;
      const compactMessage = chunkHeader + data;
      
      if (!this.dataChannel || this.dataChannel.readyState !== 'open') {
        throw new Error('Data channel not available');
      }
      
      this.dataChannel.send(compactMessage);
      console.log(`✓ Sent chunk ${chunkIndex} for file ${fileIndex} (${data.length} chars)`);
      
    } catch (error) {
      console.error(`❌ Failed to send chunk ${chunkIndex} for file ${fileIndex}:`, error);
      throw error; // Re-throw to handle at higher level
    }
  }

  private async fileToChunks(file: File, fileIndex: number): Promise<string[]> {
    const chunks: string[] = [];
    const totalChunks = Math.ceil(file.size / this.chunkSize);
    
    console.log(`📱 Converting ${file.name} to ${totalChunks} Base64 chunks (${this.chunkSize} bytes each)`);
    
    // Notify receiver that conversion is starting (if connected)
    if (this.dataChannel?.readyState === 'open') {
      this.sendControlMessage({
        type: MSG_TYPE.CONVERSION_PROGRESS,
        fileIndex,
        fileName: file.name,
        conversionProgress: 0,
        stage: 'converting',
      });
      console.log(`📤 Notified receiver that conversion is starting for ${file.name}`);
    } else {
      console.warn(`⚠️ Cannot notify receiver of conversion start - data channel not ready`);
    }
    
    // Process in smaller batches to avoid memory issues on mobile
    const batchSize = this.senderIsMobile ? 5 : 20; // Smaller batches for mobile
    
    for (let offset = 0; offset < file.size; offset += this.chunkSize) {
      if (this.cancelledFiles.has(fileIndex)) {
        console.log(`File ${fileIndex} cancelled during conversion, stopping`);
        return [];
      }
      
      const slice = file.slice(offset, Math.min(offset + this.chunkSize, file.size));
      const chunkIndex = chunks.length;
      
      // Update conversion progress
      const conversionProgress = Math.round((chunkIndex / totalChunks) * 100);
      
      // Update sender's local progress
      this.onTransferProgress?.({
        fileName: file.name,
        fileIndex,
        progress: conversionProgress,
        bytesTransferred: offset,
        totalBytes: file.size,
        speed: 0,
        stage: 'converting',
        conversionProgress,
      });

      // Send conversion progress to receiver - THROTTLED to reduce data usage
      // Only send every 5% or every 10 chunks, whichever is less frequent
      const shouldSendProgress = (
        conversionProgress % 5 === 0 || // Every 5%
        chunkIndex % 10 === 0 || // Every 10 chunks
        chunkIndex === 0 || // First chunk
        chunkIndex === totalChunks - 1 // Last chunk
      );
      
      if (shouldSendProgress && this.dataChannel?.readyState === 'open') {
        // OPTIMIZATION: Use compact format for conversion progress: "CONV:fileIndex:progress"
        const compactProgress = `CONV:${fileIndex}:${conversionProgress}`;
        
        try {
          this.dataChannel.send(compactProgress);
          console.log(`📤 ✅ Compact conversion progress sent: ${conversionProgress}% for file ${fileIndex}`);
        } catch (error) {
          console.error(`📤 ❌ Failed to send conversion progress:`, error);
          // Fallback to full JSON message if compact fails
          const progressMessage = {
            type: MSG_TYPE.CONVERSION_PROGRESS,
            fileIndex,
            fileName: file.name,
            conversionProgress,
            stage: 'converting' as const,
          };
          try {
            this.dataChannel.send(JSON.stringify(progressMessage));
          } catch (fallbackError) {
            console.error(`📤 ❌ Fallback progress message also failed:`, fallbackError);
          }
        }
      } else if (!shouldSendProgress) {
        // Silent - don't log every skipped message to reduce console spam
      } else {
        console.warn(`⚠️ Cannot send conversion progress - data channel state: ${this.dataChannel?.readyState || 'null'}`);
      }      console.log(`🔄 Sender conversion progress: ${conversionProgress}% (chunk ${chunkIndex}/${totalChunks})`);
      
      // Convert chunk to Base64 with error handling
      try {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          const timeout = setTimeout(() => reject(new Error('FileReader timeout')), 10000);
          
          reader.onload = () => {
            clearTimeout(timeout);
            const result = reader.result as string;
            resolve(result.split(',')[1]);
          };
          reader.onerror = () => {
            clearTimeout(timeout);
            reject(reader.error);
          };
          reader.readAsDataURL(slice);
        });
        
        chunks.push(base64);
        
        // Add periodic delays for mobile devices to prevent blocking
        if (this.senderIsMobile && chunkIndex % batchSize === 0 && chunkIndex > 0) {
          await new Promise(resolve => setTimeout(resolve, 50)); // 50ms break
        }
        
      } catch (error) {
        console.error(`Failed to convert chunk ${chunkIndex}:`, error);
        throw new Error(`File conversion failed at chunk ${chunkIndex}`);
      }
    }
    
    console.log(`✅ File conversion complete: ${chunks.length} chunks generated`);
    return chunks;
  }

  private updateSendProgress(fileIndex: number, bytesSent: number, totalBytes: number): void {
    const progress = this.sendProgressMap.get(fileIndex);
    if (!progress) return;
    
    const now = Date.now();
    
    if (now - progress.lastProgressUpdate > CONFIG.PROGRESS_UPDATE_INTERVAL) {
      const elapsed = (now - progress.startTime) / 1000;
      
      // Calculate actual network usage including overhead
      let actualNetworkBytes = bytesSent;
      
      if (this.transferMethod === 'binary') {
        // Binary mode: 8-byte header per chunk + file data
        const numChunks = Math.ceil(bytesSent / this.chunkSize);
        actualNetworkBytes = bytesSent + (numChunks * 8); // Add header overhead
      } else {
        // Base64 mode: ~33% Base64 encoding overhead + compact headers
        const base64Overhead = bytesSent * 0.33; // Base64 encoding overhead
        const numChunks = Math.ceil(bytesSent / this.chunkSize);
        const headerOverhead = numChunks * 15; // Approximate compact header size
        actualNetworkBytes = bytesSent + base64Overhead + headerOverhead;
      }
      
      const speed = elapsed > 0 ? actualNetworkBytes / elapsed : 0;
      
      this.onTransferProgress?.({
        fileName: this.filesToSend[fileIndex].name,
        fileIndex,
        progress: (bytesSent / totalBytes) * 100,
        bytesTransferred: bytesSent,
        totalBytes,
        speed, // Now reflects actual network usage
        stage: 'transferring',
        conversionProgress: undefined,
      });
      
      progress.lastProgressUpdate = now;
    }
  }

  // RECEIVER METHODS - Hybrid support
  private async handleControlMessage(message: ControlMessage): Promise<void> {
    console.log(`📥 Processing control message:`, {
      type: message.type,
      fileIndex: message.fileIndex,
      fileName: message.fileName,
      role: this.role
    });
    
    switch (message.type) {
      case MSG_TYPE.FILE_LIST:
        if (message.files) {
          this.handleFileList(message.files, message.transferMethod);
        }
        break;
        
      case MSG_TYPE.FILE_START:
        this.handleFileStart(message);
        break;
        
      case MSG_TYPE.FILE_CHUNK_BINARY:
        if (message.fileIndex !== undefined && message.chunkIndex !== undefined) {
          this.setWaitingForChunk?.(message.fileIndex, message.chunkIndex, message.chunkSize || 0);
        }
        break;
        
      case MSG_TYPE.FILE_CHUNK_BASE64:
        this.handleBase64Chunk(message);
        break;
        
      case MSG_TYPE.FILE_COMPLETE:
        await this.handleFileComplete(message);
        break;
        
      case MSG_TYPE.FILE_ACK:
        this.handleFileAck(message);
        break;
        
      case MSG_TYPE.PROGRESS_SYNC:
        this.handleProgressSync(message);
        break;
        
      case MSG_TYPE.CONVERSION_PROGRESS:
        console.log(`📥 ✅ Received CONVERSION_PROGRESS message, calling handler...`);
        this.handleConversionProgress(message);
        break;
        
      case MSG_TYPE.FILE_CANCEL:
        this.handleFileCancel(message);
        break;
        
      case MSG_TYPE.CHUNK_ACK:
        console.log(`📨 Chunk ACK received:`, message);
        break;
        
      case MSG_TYPE.TRANSFER_COMPLETE:
        this.transferCompleted = true;
        this.onTransferComplete?.();
        this.onStatusMessage?.('All files received successfully!');
        break;
        
      case MSG_TYPE.ERROR:
        this.onError?.(message.message || 'Transfer error occurred');
        break;

      case MSG_TYPE.CANCEL:
        this.handleTransferCancel(message);
        break;
        
      default:
        console.warn(`⚠️ Unknown message type: ${message.type}`);
    }
  }

  private handleTransferCancel(message: ControlMessage): void {
    const cancelledBy = message.cancelledBy ?? (this.role === 'sender' ? 'receiver' : 'sender');
    this.notifyServerTransferCancelled(cancelledBy, 'peer-cancelled');
    this.onTransferCancelled?.(cancelledBy);
    this.onStatusMessage?.(`Transfer cancelled by ${cancelledBy}`);
    this.cleanup();
  }

  private handleFileList(files: FileMetadata[], transferMethod?: TransferMethod): void {
    console.log('Received file list:', files, 'Method:', transferMethod);
    this.expectedFiles = files;
    this.onIncomingFiles?.(files);
    this.onStatusMessage?.(`Ready to receive files (${transferMethod || 'unknown'} mode)`);
  }

  private handleFileStart(message: ControlMessage): void {
    const { fileIndex, fileName, fileSize, fileType, lastModified, totalChunks, transferMethod } = message;

    if (
      fileIndex === undefined ||
      !fileName ||
      fileSize === undefined ||
      totalChunks === undefined
    ) {
      console.warn('Ignoring invalid FILE_START message:', message);
      return;
    }

    if (this.cancelledFiles.has(fileIndex)) {
      console.log(`Skipping FILE_START for cancelled file ${fileIndex} (${fileName})`);
      return;
    }

    const resolvedTransferMethod: TransferMethod = transferMethod === 'binary' ? 'binary' : 'base64';

    console.log(`Starting to receive file ${fileIndex}: ${fileName} (${totalChunks} chunks, ${resolvedTransferMethod} mode)`);

    this.receivedFiles.set(fileIndex, {
      metadata: {
        name: fileName,
        size: fileSize,
        type: fileType || 'application/octet-stream',
        lastModified: lastModified || Date.now(),
        fileIndex,
      },
      chunks: new Map(),
      totalChunks,
      receivedChunks: new Set(),
      bytesReceived: 0, // Initialize bytes received counter
      startTime: Date.now(),
      complete: false,
      transferMethod: resolvedTransferMethod,
    });
    
    this.onStatusMessage?.(`Receiving ${fileName}...`);
  }

  private handleBinaryChunk(fileIndex: number, chunkIndex: number, data: ArrayBuffer): void {
    if (this.cancelledFiles.has(fileIndex)) {
      return;
    }

    const fileInfo = this.receivedFiles.get(fileIndex);
    if (!fileInfo) {
      console.error(`Received chunk for unknown file ${fileIndex}`);
      return;
    }
    
    if (fileInfo.receivedChunks.has(chunkIndex)) {
      console.warn(`Duplicate chunk ${chunkIndex} for file ${fileIndex}`);
      return;
    }
    
    fileInfo.chunks.set(chunkIndex, data);
    fileInfo.receivedChunks.add(chunkIndex);
    fileInfo.bytesReceived += data.byteLength; // Track actual bytes received
    
    console.log(`File ${fileIndex}: Received binary chunk ${chunkIndex}/${fileInfo.totalChunks - 1} (${data.byteLength} bytes) - Total: ${fileInfo.bytesReceived}/${fileInfo.metadata.size} bytes`);
    
    this.updateReceiveProgress(fileIndex, fileInfo);
  }

  private handleBase64Chunk(message: ControlMessage): void {
    const { fileIndex, chunkIndex, data } = message;
    
    // Validate chunk data
    if (fileIndex === undefined || chunkIndex === undefined || !data) {
      console.error(`❌ Invalid chunk data:`, { fileIndex, chunkIndex, dataLength: data?.length });
      return;
    }

    if (this.cancelledFiles.has(fileIndex)) {
      return;
    }
    
    const fileInfo = this.receivedFiles.get(fileIndex);
    if (!fileInfo) {
      console.error(`❌ Received chunk for unknown file ${fileIndex}`);
      return;
    }
    
    if (fileInfo.receivedChunks.has(chunkIndex)) {
      console.warn(`⚠️ Duplicate chunk ${chunkIndex} for file ${fileIndex} - ignoring`);
      return;
    }
    
    // Validate Base64 data
    try {
      // Test if it's valid Base64
      atob(data.substring(0, Math.min(data.length, 100))); // Test first 100 chars
    } catch (error) {
      console.error(`❌ Invalid Base64 data in chunk ${chunkIndex} for file ${fileIndex}:`, error);
      return;
    }
    
    // Store chunk and mark as received
    fileInfo.chunks.set(chunkIndex, data);
    fileInfo.receivedChunks.add(chunkIndex);
    
    // Estimate bytes for Base64 (3/4 ratio)
    const estimatedBytes = Math.floor((data.length * 3) / 4);
    fileInfo.bytesReceived += estimatedBytes;
    
    // Enhanced logging for debugging
    console.log(`✓ Chunk ${chunkIndex}/${fileInfo.totalChunks - 1} received for file ${fileIndex} (${data.length} chars, ~${estimatedBytes} bytes)`);
    
    // Log progress more frequently for debugging
    if (fileInfo.receivedChunks.size % 5 === 0 || fileInfo.receivedChunks.size === fileInfo.totalChunks) {
      console.log(`📊 File ${fileIndex} progress: ${fileInfo.receivedChunks.size}/${fileInfo.totalChunks} chunks (${((fileInfo.receivedChunks.size / fileInfo.totalChunks) * 100).toFixed(1)}%) - Bytes: ${fileInfo.bytesReceived}/${fileInfo.metadata.size}`);
    }
    
    this.updateReceiveProgress(fileIndex, fileInfo);
    
    // Send chunk acknowledgment back to sender for debugging
    if (fileInfo.receivedChunks.size % 10 === 0) {
      this.sendControlMessage({
        type: MSG_TYPE.CHUNK_ACK,
        fileIndex,
        chunkIndex,
        message: `Received ${fileInfo.receivedChunks.size}/${fileInfo.totalChunks} chunks`
      });
    }
  }

  private handleFileCancel(message: ControlMessage): void {
    const { fileIndex, fileName, cancelledBy } = message;
    
    if (fileIndex !== undefined) {
      this.cancelledFiles.add(fileIndex);
      this.receivedFiles.delete(fileIndex);
      
      this.onFileCancelled?.({
        fileIndex,
        fileName: fileName!,
        cancelledBy: cancelledBy!,
      });
      
      console.log(`File ${fileIndex} (${fileName}) cancelled by ${cancelledBy}`);
    }
  }

  private handleFileAck(message: ControlMessage): void {
    const { fileIndex, fileName } = message;
    
    console.log(`📨 Received FILE_ACK for file ${fileIndex}: ${fileName}`);
    
    // Track acknowledged files
    if (fileIndex !== undefined) {
      this.acknowledgedFiles.add(fileIndex);
      
      const file = this.filesToSend[fileIndex];
      if (file) {
        // Only send progress update if we haven't already sent 100%
        const progress = this.sendProgressMap.get(fileIndex);
        const alreadyComplete = progress && progress.sentChunks.size === progress.totalChunks;
        
        if (!alreadyComplete) {
          this.onTransferProgress?.({
            fileName: fileName || file.name,
            fileIndex,
            progress: 100,
            bytesTransferred: file.size,
            totalBytes: file.size,
            speed: 0,
            stage: 'transferring',
          });
        }
        
        console.log(`✅ File ${fileIndex} (${fileName}) confirmed received by peer`);
      }
      
      // Check if all files have been acknowledged
      this.checkTransferCompletion();
    }
  }

  private handleProgressSync(message: ControlMessage): void {
    const { fileIndex, progress, fileName } = message;
    
    if (fileIndex !== undefined && progress !== undefined) {
      console.log(`📊 Progress sync for file ${fileIndex} (${fileName}): ${progress}%`);
      
      const file = this.filesToSend[fileIndex];
      if (file) {
        this.onTransferProgress?.({
          fileName: fileName || file.name,
          fileIndex,
          progress,
          bytesTransferred: Math.floor((file.size * progress) / 100),
          totalBytes: file.size,
          speed: 0,
          stage: 'transferring',
        });
      }
    }
  }

  private handleConversionProgress(message: ControlMessage): void {
    const { fileIndex, fileName, conversionProgress } = message;
    
    console.log(`📥 🔄 Received CONVERSION_PROGRESS message:`, {
      fileIndex,
      fileName,
      conversionProgress,
      role: this.role
    });
    
    if (fileIndex !== undefined && conversionProgress !== undefined) {
      console.log(`🔄 Processing conversion progress for ${fileName}: ${conversionProgress}%`);
      
      if (this.role === 'receiver') {
        console.log(`📱 Receiver displaying sender's conversion progress: ${conversionProgress}%`);
        
        // Receiver seeing sender's conversion progress (PC converting for phone)
        this.onTransferProgress?.({
          fileName: fileName || `File ${fileIndex}`,
          fileIndex,
          progress: conversionProgress,
          bytesTransferred: 0, // Unknown for sender conversion
          totalBytes: 0, // Unknown for sender conversion  
          speed: 0,
          stage: 'converting',
          conversionProgress,
        });
        
        // Update status message for receiver
        if (conversionProgress === 0) {
          this.onStatusMessage?.(`Sender is converting ${fileName}...`);
          console.log(`📱 Status: Sender starting conversion of ${fileName}`);
        } else if (conversionProgress % 25 === 0 && conversionProgress > 0) {
          this.onStatusMessage?.(`Sender converting ${fileName}... ${conversionProgress}%`);
          console.log(`📱 Status: Sender conversion progress: ${conversionProgress}%`);
        } else if (conversionProgress === 100) {
          this.onStatusMessage?.(`Sender finished converting ${fileName}, preparing to send...`);
          console.log(`📱 Status: Sender finished converting ${fileName}`);
        }
        
      } else if (this.role === 'sender') {
        console.log(`🖥️ Sender seeing receiver's conversion progress: ${conversionProgress}%`);
        
        // Sender seeing receiver's conversion progress (phone processing received file)
        const file = this.filesToSend[fileIndex];
        if (file) {
          this.onTransferProgress?.({
            fileName: fileName || file.name,
            fileIndex,
            progress: conversionProgress,
            bytesTransferred: Math.floor((file.size * conversionProgress) / 100),
            totalBytes: file.size,
            speed: 0,
            stage: 'converting',
            conversionProgress,
          });
        }
      }
    } else {
      console.warn(`⚠️ Invalid conversion progress message:`, message);
    }
  }

  private checkTransferCompletion(): void {
    const totalFiles = this.filesToSend.length;
    const acknowledgedCount = this.acknowledgedFiles.size;
    const cancelledCount = this.cancelledFiles.size;
    
    console.log(`📊 Transfer status: ${acknowledgedCount}/${totalFiles} acknowledged, ${cancelledCount} cancelled`);
    
    // All files either acknowledged or cancelled
    if (acknowledgedCount + cancelledCount >= totalFiles) {
      console.log('🎉 All files processed! Transfer complete.');
      
      // Now send TRANSFER_COMPLETE to notify receiver that sender is done
      this.sendControlMessage({ type: MSG_TYPE.TRANSFER_COMPLETE });
      this.notifyServerTransferComplete(this.getTotalFilesSize());
      
      this.transferCompleted = true;
      this.onTransferComplete?.();
      this.onStatusMessage?.('All files sent and confirmed received!');
    }
  }

  private updateReceiveProgress(fileIndex: number, fileInfo: ReceivedFileInfo): void {
    // Use actual bytes received instead of estimated chunk size
    const progress = (fileInfo.bytesReceived / fileInfo.metadata.size) * 100;
    const elapsed = (Date.now() - fileInfo.startTime) / 1000;
    const speed = elapsed > 0 ? fileInfo.bytesReceived / elapsed : 0;
    
    this.onTransferProgress?.({
      fileName: fileInfo.metadata.name,
      fileIndex,
      progress: Math.min(progress, 100), // Cap at 100%
      bytesTransferred: fileInfo.bytesReceived,
      totalBytes: fileInfo.metadata.size,
      speed,
      stage: 'transferring',
    });
  }

  private updateConversionProgress(fileIndex: number, fileName: string, fileSize: number, conversionProgress: number): void {
    // Show conversion progress for receiver
    this.onTransferProgress?.({
      fileName,
      fileIndex,
      progress: conversionProgress,
      bytesTransferred: Math.floor((fileSize * conversionProgress) / 100),
      totalBytes: fileSize,
      speed: 0,
      stage: 'converting',
      conversionProgress,
    });
  }

  private async handleFileComplete(message: ControlMessage): Promise<void> {
    const { fileIndex, fileName, totalChunks } = message;

    if (fileIndex === undefined) {
      console.error('FILE_COMPLETE missing fileIndex');
      return;
    }

    if (this.cancelledFiles.has(fileIndex)) {
      console.log(`Ignoring FILE_COMPLETE for cancelled file ${fileIndex} (${fileName})`);
      return;
    }
    
    let fileInfo = this.receivedFiles.get(fileIndex);
    if (!fileInfo) {
      console.error(`FILE_COMPLETE for unknown file ${fileIndex}`);
      return;
    }

    const expectedChunks =
      typeof totalChunks === 'number' && totalChunks > 0 ? totalChunks : fileInfo.totalChunks;

    if (expectedChunks > fileInfo.totalChunks) {
      fileInfo.totalChunks = expectedChunks;
    }

    if (fileInfo.receivedChunks.size < expectedChunks) {
      const graceMs =
        fileInfo.transferMethod === 'binary'
          ? CONFIG.FILE_COMPLETE_GRACE_BINARY
          : CONFIG.FILE_COMPLETE_GRACE_BASE64;

      console.warn(
        `FILE_COMPLETE for ${fileName || `file ${fileIndex}`} arrived before all chunks (${fileInfo.receivedChunks.size}/${expectedChunks}); waiting up to ${graceMs}ms`,
      );

      await this.waitForExpectedChunks(fileIndex, expectedChunks, graceMs);

      const refreshedFileInfo = this.receivedFiles.get(fileIndex);
      if (!refreshedFileInfo) {
        return;
      }

      fileInfo = refreshedFileInfo;
    }
    
    console.log(`🔍 File completion check for ${fileName}:`);
    console.log(`  - Expected size: ${fileInfo.metadata.size} bytes`);
    console.log(`  - Received bytes: ${fileInfo.bytesReceived} bytes`);
    console.log(`  - Total chunks expected: ${expectedChunks}`);
    console.log(`  - Chunks received: ${fileInfo.receivedChunks.size}`);
    console.log(`  - Transfer method: ${fileInfo.transferMethod}`);
    
    // Validate that all chunks are received
    const missingChunks: number[] = [];
    for (let i = 0; i < expectedChunks; i++) {
      if (!fileInfo.receivedChunks.has(i)) {
        missingChunks.push(i);
      }
    }
    
    if (missingChunks.length > 0) {
      console.error(`❌ File incomplete: ${fileName} (missing ${missingChunks.length} chunks: ${missingChunks.slice(0, 10).join(', ')}${missingChunks.length > 10 ? '...' : ''})`);
      console.error(`  - Missing chunks represent ~${((missingChunks.length / expectedChunks) * 100).toFixed(2)}% of the file`);
      
      const missingPercentage = (missingChunks.length / expectedChunks) * 100;
      
      // STRICT: No tolerance for missing chunks to ensure file integrity
      console.error(`❌ Transfer failed - missing ${missingPercentage.toFixed(2)}% of chunks`);
      console.error(`❌ Expected ${expectedChunks} chunks, received ${fileInfo.receivedChunks.size} chunks`);
      console.error(`❌ Transfer method: ${fileInfo.transferMethod}`);
      console.error(`❌ Bytes received: ${fileInfo.bytesReceived} / ${fileInfo.metadata.size}`);
      
      // Log detailed chunk analysis for debugging
      const receivedChunksList = Array.from(fileInfo.receivedChunks).sort((a, b) => a - b);
      console.error(`❌ Received chunks: [${receivedChunksList.slice(0, 10).join(', ')}${receivedChunksList.length > 10 ? '...' : ''}]`);
      console.error(`❌ Missing chunks: [${missingChunks.slice(0, 10).join(', ')}${missingChunks.length > 10 ? '...' : ''}]`);
      
      // Send detailed error back to sender
      this.sendControlMessage({
        type: MSG_TYPE.ERROR,
        fileIndex: fileIndex!,
        fileName: fileName!,
        message: `Transfer failed: missing ${missingChunks.length} chunks (${missingPercentage.toFixed(2)}%). Expected ${expectedChunks} chunks, received ${fileInfo.receivedChunks.size}.`
      });
      
      this.onError?.(`Transfer incomplete: ${fileName} (missing ${missingChunks.length} chunks)`);
      return;
    } else {
      console.log(`✅ All chunks received for ${fileName}, proceeding with reconstruction`);
    }
    
    try {
      let file: File;
      
      if (fileInfo.transferMethod === 'binary') {
        // Reconstruct from ArrayBuffer chunks with memory management
        console.log('Reconstructing large binary file with memory optimization...');
        
        // Calculate total size from received chunks only (handle missing chunks)
        let totalSize = 0;
        const sortedChunks: { index: number; data: ArrayBuffer }[] = [];
        
        for (let i = 0; i < fileInfo.totalChunks; i++) {
          const chunk = fileInfo.chunks.get(i) as ArrayBuffer;
          if (chunk) {
            sortedChunks.push({ index: i, data: chunk });
            totalSize += chunk.byteLength;
          }
        }
        
        console.log(`Reconstructing from ${sortedChunks.length} chunks, total size: ${totalSize} bytes`);
        
        // Use chunked reconstruction for large files to avoid memory issues
        const combined = new Uint8Array(totalSize);
        let offset = 0;
        
        for (const { data } of sortedChunks) {
          combined.set(new Uint8Array(data), offset);
          offset += data.byteLength;
          
          // Force garbage collection periodically for large files
          if (offset % (10 * 1024 * 1024) === 0) { // Every 10MB
            await new Promise(resolve => setTimeout(resolve, 10));
          }
        }
        
        file = new File([combined], fileInfo.metadata.name, {
          type: fileInfo.metadata.type,
          lastModified: fileInfo.metadata.lastModified,
        });
      } else {
        // Reconstruct from Base64 chunks with optimized memory management
        console.log('Reconstructing Base64 file with memory optimization...');
        
        // Count valid chunks and calculate total size
        let totalSize = 0;
        const validChunks: { index: number; data: string }[] = [];
        
        for (let i = 0; i < fileInfo.totalChunks; i++) {
          const base64Chunk = fileInfo.chunks.get(i) as string;
          if (base64Chunk) {
            validChunks.push({ index: i, data: base64Chunk });
            // Estimate size from Base64 (3/4 ratio for Base64 to binary)
            totalSize += Math.floor((base64Chunk.length * 3) / 4);
          }
        }
        
        console.log(`Reconstructing from ${validChunks.length} Base64 chunks, estimated size: ${totalSize} bytes`);
        
        // Show conversion start message to receiver
        this.onStatusMessage?.(`Converting ${fileInfo.metadata.name}...`);
        
        // Send conversion start notification to sender
        this.sendControlMessage({
          type: MSG_TYPE.CONVERSION_PROGRESS,
          fileIndex: fileIndex!,
          fileName: fileInfo.metadata.name,
          conversionProgress: 0,
          stage: 'converting',
        });
        
        // Update local progress to show conversion starting  
        this.updateConversionProgress(fileIndex!, fileInfo.metadata.name, fileInfo.metadata.size, 0);
        
        console.log(`🔄 Starting Base64 conversion for ${fileInfo.metadata.name}`);
        
        // Process chunks in batches to avoid memory pressure
        const batchSize = 50; // Process 50 chunks at a time
        const binaryChunks: Uint8Array[] = [];
        let actualTotalSize = 0;
        
        for (let batchStart = 0; batchStart < validChunks.length; batchStart += batchSize) {
          const batchEnd = Math.min(batchStart + batchSize, validChunks.length);
          const batch = validChunks.slice(batchStart, batchEnd);
          
          for (const { data: base64Chunk } of batch) {
            try {
              const binaryString = atob(base64Chunk);
              const bytes = new Uint8Array(binaryString.length);
              for (let j = 0; j < binaryString.length; j++) {
                bytes[j] = binaryString.charCodeAt(j);
              }
              binaryChunks.push(bytes);
              actualTotalSize += bytes.length;
            } catch (error) {
              console.error('Failed to decode Base64 chunk:', error);
            }
          }
          
          // Calculate and send conversion progress - THROTTLED
          const conversionProgress = Math.round((batchEnd / validChunks.length) * 100);
          
          // Update receiver's progress FIRST (more important for UX)
          this.updateConversionProgress(fileIndex!, fileInfo.metadata.name, fileInfo.metadata.size, conversionProgress);
          
          // Update status message every 25%
          if (conversionProgress % 25 === 0 && conversionProgress > 0) {
            this.onStatusMessage?.(`Converting ${fileInfo.metadata.name}... ${conversionProgress}%`);
          }

          // Send progress to sender - THROTTLED to reduce data usage
          // Only send every 10% or significant milestones
          const shouldSendProgress = (
            conversionProgress % 10 === 0 || // Every 10%
            batchStart === 0 || // First batch
            batchEnd >= validChunks.length // Last batch
          );
          
          if (shouldSendProgress) {
            this.sendControlMessage({
              type: MSG_TYPE.CONVERSION_PROGRESS,
              fileIndex: fileIndex!,
              fileName: fileInfo.metadata.name,
              conversionProgress,
              stage: 'converting',
            });
            console.log(`📤 Throttled receiver conversion progress sent: ${conversionProgress}%`);
          }
          
          console.log(`🔄 Base64 conversion progress: ${conversionProgress}% (batch ${batchEnd}/${validChunks.length})`);
          
          // Add small delay between batches for large files
          if (fileInfo.metadata.size > CONFIG.LARGE_FILE_THRESHOLD && batchEnd < validChunks.length) {
            await new Promise(resolve => setTimeout(resolve, 10));
          }
        }
        
        // Combine all chunks efficiently
        console.log(`Combining ${binaryChunks.length} decoded chunks, actual size: ${actualTotalSize} bytes`);
        
        // Show combining message to receiver
        this.onStatusMessage?.(`Finalizing ${fileInfo.metadata.name}...`);
        
        // Send combining progress notification
        this.sendControlMessage({
          type: MSG_TYPE.CONVERSION_PROGRESS,
          fileIndex: fileIndex!,
          fileName: fileInfo.metadata.name,
          conversionProgress: 95,
          stage: 'converting',
        });
        
        // Update receiver progress for combining phase
        this.updateConversionProgress(fileIndex!, fileInfo.metadata.name, fileInfo.metadata.size, 95);
        
        console.log(`🔄 Combining decoded chunks for ${fileInfo.metadata.name}...`);
        
        const combinedArray = new Uint8Array(actualTotalSize);
        let offset = 0;
        const totalChunks = binaryChunks.length;
        
        for (let i = 0; i < binaryChunks.length; i++) {
          const chunk = binaryChunks[i];
          combinedArray.set(chunk, offset);
          offset += chunk.length;
          
          // Send progress updates during combining - THROTTLED
          if (i % 100 === 0 || i === totalChunks - 1) {
            const combiningProgress = 95 + Math.floor((i / totalChunks) * 5); // 95-100%
            
            // Update receiver progress FIRST
            this.updateConversionProgress(fileIndex!, fileInfo.metadata.name, fileInfo.metadata.size, combiningProgress);
            
            // Send to sender - THROTTLED (only at significant milestones)
            const shouldSendCombiningProgress = (
              i === totalChunks - 1 || // Last chunk always
              i % 500 === 0 // Every 500 chunks instead of every 100
            );
            
            if (shouldSendCombiningProgress) {
              this.sendControlMessage({
                type: MSG_TYPE.CONVERSION_PROGRESS,
                fileIndex: fileIndex!,
                fileName: fileInfo.metadata.name,
                conversionProgress: combiningProgress,
                stage: 'converting',
              });
            }
            
            if (combiningProgress === 100) {
              this.onStatusMessage?.(`Conversion complete: ${fileInfo.metadata.name}`);
            }
          }
          
          // Periodic yield for large reconstructions
          if (offset % (5 * 1024 * 1024) === 0) { // Every 5MB
            await new Promise(resolve => setTimeout(resolve, 10));
          }
        }
        
        file = new File([combinedArray], fileInfo.metadata.name, {
          type: fileInfo.metadata.type || 'application/octet-stream',
          lastModified: fileInfo.metadata.lastModified,
        });
      }
      
      console.log(`✅ File reconstructed: ${fileName} (${file.size} bytes)`);
      
      // Verify file size is reasonable (within 1% of expected for large files)
      const expectedSize = fileInfo.metadata.size;
      const sizeDifference = Math.abs(file.size - expectedSize);
      const sizePercentage = (sizeDifference / expectedSize) * 100;
      
      if (sizePercentage > 5) {
        console.warn(`Size mismatch for ${fileName}: expected ${expectedSize}, got ${file.size} (${sizePercentage.toFixed(2)}% difference)`);
      }
      
      fileInfo.complete = true;
      this.onFileReceived?.(file);
      
      // Final progress update
      this.onTransferProgress?.({
        fileName: fileInfo.metadata.name,
        fileIndex: fileIndex!,
        progress: 100,
        bytesTransferred: file.size,
        totalBytes: file.size,
        speed: 0,
        stage: 'transferring',
      });
      
      // Send progress sync to sender to ensure they see 100%
      this.sendControlMessage({
        type: MSG_TYPE.PROGRESS_SYNC,
        fileIndex: fileIndex!,
        fileName: fileInfo.metadata.name,
        progress: 100,
      });
      
      // Send acknowledgment back to sender that file was successfully received
      this.sendControlMessage({
        type: MSG_TYPE.FILE_ACK,
        fileIndex: fileIndex!,
        fileName: fileInfo.metadata.name,
      });
      
      console.log(`📤 Sent FILE_ACK for ${fileName} back to sender`);
      
    } catch (error) {
      console.error(`Failed to reconstruct file ${fileName}:`, error);
      this.onError?.(`Failed to process ${fileName}: ${error}`);
    }
  }

  private sendControlMessage(message: ControlMessage): void {
    if (this.dataChannel && this.dataChannel.readyState === 'open') {
      try {
        this.dataChannel.send(JSON.stringify(message));
        
        // Add extra logging for conversion progress messages
        if (message.type === MSG_TYPE.CONVERSION_PROGRESS) {
          console.log(`📤 ✅ Successfully sent CONVERSION_PROGRESS message:`, {
            fileIndex: message.fileIndex,
            fileName: message.fileName,
            progress: message.conversionProgress
          });
        }
      } catch (error) {
        console.error('Error sending control message:', error);
        
        // Add extra logging for conversion progress failures
        if (message.type === MSG_TYPE.CONVERSION_PROGRESS) {
          console.error(`📤 ❌ Failed to send CONVERSION_PROGRESS message:`, error);
        }
      }
    } else {
      console.warn(`⚠️ Cannot send control message - data channel not ready:`, {
        messageType: message.type,
        channelState: this.dataChannel?.readyState || 'null',
        message: message.type === MSG_TYPE.CONVERSION_PROGRESS ? {
          fileIndex: message.fileIndex,
          fileName: message.fileName,
          progress: message.conversionProgress
        } : 'other'
      });
    }
  }

  private async handleSignalingMessage(message: SignalingMessage): Promise<void> {
    const peerConnection = this.peerConnection;
    if (!peerConnection) {
      console.warn('Ignoring signaling message because peer connection is not ready');
      return;
    }

    console.log(`Received signaling message: ${message.type}`);

    try {
      switch (message.type) {
        case 'offer':
          if (this.role !== 'receiver') return;

          this.onStatusMessage?.('Sender found! Establishing connection...');
          await peerConnection.setRemoteDescription(message.payload);
          this.hasRemoteDescription = true;
          await this.flushPendingIceCandidates();

          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);

          signalingService.sendSignal({
            type: 'answer',
            payload: answer,
            toRoom: this.roomCode,
          });
          break;

        case 'answer':
          if (this.role !== 'sender') return;

          this.onStatusMessage?.('Receiver connected! Establishing data channel...');
          await peerConnection.setRemoteDescription(message.payload);
          this.hasRemoteDescription = true;
          await this.flushPendingIceCandidates();
          break;

        case 'ice': {
          const candidate = message.payload;
          if (!candidate) return;

          if (!peerConnection.remoteDescription || !this.hasRemoteDescription) {
            this.pendingIceCandidates.push(candidate);
            return;
          }

          try {
            await peerConnection.addIceCandidate(candidate);
          } catch (error) {
            console.warn('Failed to add ICE candidate:', error);
          }
          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.error('Signaling error:', error);
      this.onError?.('Connection setup failed');
    }
  }

  private setConnectionTimeout(duration: number = 30000): void {
    this.connectionTimeout = setTimeout(() => {
      if (this.peerConnection?.connectionState !== 'connected') {
        this.onError?.('Connection timeout. Please try again.');
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

  cleanup(): void {
    this.clearConnectionTimeout();

    if (!this.transferCompleted && this.serverTransferActive) {
      this.notifyServerTransferCancelled('system', 'cleanup');
    }
    
    if (this.dataChannel) {
      this.dataChannel.close();
      this.dataChannel = null;
    }
    
    if (this.binaryChannel) {
      this.binaryChannel.close();
      this.binaryChannel = null;
    }
    
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
    
    signalingService.offSignal();
    
    // Clear all state
    this.filesToSend = [];
    this.currentSendIndex = 0;
    this.sendChunksMap.clear();
    this.sendProgressMap.clear();
    this.receivedFiles.clear();
    this.expectedFiles = [];
    this.cancelledFiles.clear();
    this.acknowledgedFiles.clear();
    this.transferCompleted = false;
    this.transferStarted = false;
    this.serverTransferActive = false;
    this.pendingIceCandidates = [];
    this.hasRemoteDescription = false;
    this.setWaitingForChunk = undefined;
    this.role = null;
    this.roomCode = '';
    
    this.onStatusMessage?.('Disconnected');
  }

  // Cancel methods - restored from working implementation
  cancelTransfer(): void {
    const cancelledBy = this.role === 'receiver' ? 'receiver' : 'sender';
    this.sendControlMessage({ type: MSG_TYPE.CANCEL, cancelledBy });
    this.notifyServerTransferCancelled(cancelledBy, 'local-cancel');
    this.cleanup();
  }

  cancelFile(fileIndex: number, fileName: string): void {
    // Add to cancelled files set
    this.cancelledFiles.add(fileIndex);

    // Ensure local partial receiver state is released immediately
    this.receivedFiles.delete(fileIndex);
    
    // Send cancellation message to peer
    this.sendControlMessage({
      type: MSG_TYPE.FILE_CANCEL,
      fileIndex,
      fileName,
      cancelledBy: this.role === 'receiver' ? 'receiver' : 'sender',
    });
    
    // Remove from send progress if it exists
    this.sendProgressMap.delete(fileIndex);
    this.sendChunksMap.delete(fileIndex);
    
    console.log(`Cancelled file ${fileIndex} (${fileName})`);
  }
}

export const webrtcService = new WebRTCService();
