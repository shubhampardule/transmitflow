// Custom interface for candidate stats properties
interface CandidateStat {
  candidateType?: string;
  protocol?: string;
}
import { FileMetadata, SignalingMessage, DataChannelMessage, FileTransferProgress } from '@/types';
import { signalingService } from './signaling';

export class WebRTCService {
  private peerConnection: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private roomCode: string = '';
  private role: 'sender' | 'receiver' | null = null;
  
  // Adaptive connection configuration
  private readonly config: RTCConfiguration = {
    iceServers: [
      // Multiple STUN servers for better connectivity
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
      { urls: 'stun:stun.cloudflare.com:3478' },
      
      // Multiple TURN servers for redundancy
      {
        urls: ["turn:standard.relay.metered.ca:80", "turn:standard.relay.metered.ca:80?transport=tcp"],
        username: process.env.NEXT_PUBLIC_METERED_TURN_USERNAME,
        credential: process.env.NEXT_PUBLIC_METERED_TURN_CREDENTIAL,
      },
      {
        urls: ["turn:relay.metered.ca:80", "turn:relay.metered.ca:80?transport=tcp"],
        username: process.env.NEXT_PUBLIC_METERED_TURN_USERNAME_2,
        credential: process.env.NEXT_PUBLIC_METERED_TURN_CREDENTIAL_2,
      },
      // Add more TURN servers if available
    ],
    
    // Optimized ICE settings for remote connections
    iceTransportPolicy: 'all',
    bundlePolicy: 'max-bundle',
    rtcpMuxPolicy: 'require',
    iceCandidatePoolSize: 10, // Pre-gather candidates
  };

  // Adaptive chunk settings based on connection type
  private chunkSize = 16 * 1024; // Start with 16KB (safer for relay)
  private maxChunkSize = 64 * 1024; // Maximum for local connections
  private minChunkSize = 4 * 1024; // Minimum for poor connections
  private maxBufferSize = 2 * 1024 * 1024; // Reduced initial buffer
  private connectionType: 'direct' | 'relay' | 'unknown' = 'unknown';
  private isSlowConnection = false;
  private retransmissionCount = 0;

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
  }) => void;
  public onTransferComplete?: () => void;
  public onTransferCancelled?: (cancelledBy: 'sender' | 'receiver') => void;
  public onFileCancelled?: (data: { fileIndex: number; fileName: string; cancelledBy: 'sender' | 'receiver' }) => void;
  public onError?: (error: string) => void;
  public onIceGatheringStateChange?: (state: RTCIceGatheringState) => void;
  public onConnectionInfo?: (info: { localType?: string; remoteType?: string; protocol?: string; connectionType?: string }) => void;
  public onStatusMessage?: (message: string) => void;

  // Transfer state
  private currentFiles: File[] = [];
  private receiveBuffers: ArrayBuffer[] = [];
  private currentFileIndex = 0;
  private currentFileMeta: FileMetadata | null = null;
  private transferStartTime = 0;
  private receivedBytes = 0;
  private lastProgressSync = 0;
  private cancelledFileIndices = new Set<number>();
  private connectionTimeout: NodeJS.Timeout | null = null;
  private hasStartedTransfer = false;
  private offerCreated = false;
  private isConnecting = false;
  
  // Performance monitoring
  private speedHistory: number[] = [];
  private errorCount = 0;
  private adaptiveDelayMs = 0;

  // Getters
  get currentRole(): 'sender' | 'receiver' | null {
    return this.role;
  }

  async initializeAsSender(roomCode: string, files: File[]): Promise<void> {
    console.time('Sender initialization');
    
    if (this.isConnecting) {
      console.log('Already connecting, skipping duplicate initialization');
      return;
    }
    
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
      
      console.log('Sending offer immediately');
      signalingService.sendSignal({
        type: 'offer',
        payload: offer,
        toRoom: roomCode,
      });

      this.onStatusMessage?.('Connecting to receiver...');
    }

    // Longer timeout for remote connections
    this.setConnectionTimeout(30000); // 30 seconds for remote
    
    console.timeEnd('Sender initialization');
  }

  async initializeAsReceiver(roomCode: string): Promise<void> {
    console.time('Receiver initialization');
    
    if (this.isConnecting) {
      console.log('Already connecting, skipping duplicate initialization');
      return;
    }
    
    this.isConnecting = true;
    this.roomCode = roomCode;
    this.role = 'receiver';

    this.onStatusMessage?.('Waiting for sender to connect...');

    await this.createPeerConnection();
    this.setupDataChannelReceiver();
    
    this.setConnectionTimeout(30000);
    
    console.timeEnd('Receiver initialization');
  }

  private async createPeerConnection(): Promise<void> {
    console.time('Create peer connection');
    
    this.peerConnection = new RTCPeerConnection(this.config);

    let transferAttempted = false;
    
    const attemptTransferStart = () => {
      if (!transferAttempted && this.role === 'sender' && this.dataChannel) {
        const dcState = this.dataChannel.readyState;
        const iceState = this.peerConnection?.iceConnectionState;
        const connState = this.peerConnection?.connectionState;
        
        console.log(`Checking transfer start: DC=${dcState}, ICE=${iceState}, Conn=${connState}`);
        
        if (dcState === 'open' || iceState === 'connected' || iceState === 'completed') {
          if (!this.hasStartedTransfer && this.currentFiles.length > 0) {
            console.log('🚀 Starting transfer!');
            this.onStatusMessage?.('Connected! Analyzing connection quality...');
            this.hasStartedTransfer = true;
            transferAttempted = true;
            
            // Wait a moment to analyze connection before starting
            setTimeout(() => this.startFileTransfer(), 1000);
          }
        }
      }
    };

    // Monitor connection state
    this.peerConnection.onconnectionstatechange = () => {
      const state = this.peerConnection!.connectionState;
      console.log(`Connection state: ${state} at ${Date.now()}`);
      this.onConnectionStateChange?.(state);
      
      if (state === 'connecting') {
        this.onStatusMessage?.('Establishing connection...');
      } else if (state === 'connected') {
        this.onStatusMessage?.('Connected! Optimizing for your network...');
        this.clearConnectionTimeout();
        this.analyzeConnection();
        attemptTransferStart();
      } else if (state === 'failed') {
        this.onError?.('Connection failed. This may be due to network restrictions. Please try again.');
      }
    };

    this.peerConnection.oniceconnectionstatechange = () => {
      const state = this.peerConnection!.iceConnectionState;
      console.log(`ICE state: ${state} at ${Date.now()}`);
      
      if (state === 'checking') {
        this.onStatusMessage?.('Finding best connection path...');
      } else if (state === 'connected' || state === 'completed') {
        this.clearConnectionTimeout();
        this.analyzeConnection();
        attemptTransferStart();
      } else if (state === 'failed') {
        this.onError?.('Connection failed. Trying different network path...');
        // Attempt ICE restart
        this.restartIce();
      } else if (state === 'disconnected') {
        this.onStatusMessage?.('Connection lost. Attempting to reconnect...');
      }
    };

    this.peerConnection.onicegatheringstatechange = () => {
      const state = this.peerConnection!.iceGatheringState;
      console.log(`ICE gathering: ${state} at ${Date.now()}`);
      this.onIceGatheringStateChange?.(state);
    };

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // Analyze candidate types for connection optimization
        this.analyzeCandidateType(event.candidate);
        
        signalingService.sendSignal({
          type: 'ice',
          payload: event.candidate,
          toRoom: this.roomCode,
        });
      }
    };

    signalingService.onSignal(this.handleSignalingMessage.bind(this));
    
    console.timeEnd('Create peer connection');
  }

  private analyzeCandidateType(candidate: RTCIceCandidate): void {
    const candidateString = candidate.candidate;
    
    if (candidateString.includes('typ host')) {
      console.log('✅ Host candidate - potential direct connection');
    } else if (candidateString.includes('typ srflx')) {
      console.log('⚡ Server reflexive candidate - NAT traversal');
    } else if (candidateString.includes('typ relay')) {
      console.log('🔄 Relay candidate - will use TURN server');
      this.connectionType = 'relay';
      this.isSlowConnection = true;
      // Optimize for relay connection
      this.optimizeForRelay();
    }
  }

  private async analyzeConnection(): Promise<void> {
    try {
      const stats = await this.peerConnection!.getStats();
  let localCandidate: CandidateStat | null = null;
  let remoteCandidate: CandidateStat | null = null;
      let candidatePair: RTCIceCandidatePairStats | null = null;

      stats.forEach((report) => {
        if (report.type === 'candidate-pair' && report.state === 'succeeded') {
          candidatePair = report as RTCIceCandidatePairStats;
        } else if (report.type === 'local-candidate' && candidatePair?.localCandidateId === report.id) {
          localCandidate = report as CandidateStat;
        } else if (report.type === 'remote-candidate' && candidatePair?.remoteCandidateId === report.id) {
          remoteCandidate = report as CandidateStat;
        }
      });

      if (localCandidate && remoteCandidate) {
  const localType = (localCandidate as CandidateStat)?.candidateType;
  const remoteType = (remoteCandidate as CandidateStat)?.candidateType;
  const protocol = (localCandidate as CandidateStat)?.protocol;
        
        console.log(`Connection analysis: Local=${localType}, Remote=${remoteType}, Protocol=${protocol}`);
        
        // Determine connection type and optimize accordingly
        if ((localType === 'host' && remoteType === 'host') || 
            (localType === 'srflx' && remoteType === 'srflx')) {
          this.connectionType = 'direct';
          this.optimizeForDirect();
          this.onStatusMessage?.('Direct connection established - optimal speed!');
        } else if (localType === 'relay' || remoteType === 'relay') {
          this.connectionType = 'relay';
          this.isSlowConnection = true;
          this.optimizeForRelay();
          this.onStatusMessage?.('Using relay connection - optimized for stability');
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

  private optimizeForDirect(): void {
    console.log('🚀 Optimizing for direct connection');
    this.chunkSize = this.maxChunkSize; // Use large chunks
    this.maxBufferSize = 8 * 1024 * 1024; // Large buffer
    this.adaptiveDelayMs = 0; // No delay
  }

  private optimizeForRelay(): void {
    console.log('🔄 Optimizing for relay connection');
    this.chunkSize = this.minChunkSize; // Use small chunks
    this.maxBufferSize = 512 * 1024; // Small buffer
    this.adaptiveDelayMs = 10; // Small delay between chunks
  }

  private async restartIce(): Promise<void> {
    console.log('🔄 Attempting ICE restart');
    if (this.peerConnection && this.role === 'sender') {
      try {
        const offer = await this.peerConnection.createOffer({ iceRestart: true });
        await this.peerConnection.setLocalDescription(offer);
        
        signalingService.sendSignal({
          type: 'offer',
          payload: offer,
          toRoom: this.roomCode,
        });
        
        this.onStatusMessage?.('Trying different connection method...');
      } catch (error) {
        console.error('ICE restart failed:', error);
      }
    }
  }

  private setConnectionTimeout(duration: number = 30000): void {
    this.connectionTimeout = setTimeout(() => {
      const iceState = this.peerConnection?.iceConnectionState;
      const connState = this.peerConnection?.connectionState;
      
      if (iceState !== 'connected' && iceState !== 'completed' && connState !== 'connected') {
        console.error(`Connection timeout - ICE: ${iceState}, Conn: ${connState}`);
        this.onError?.('Connection is taking longer than expected. This may be due to network restrictions between you and your friend. Please both try connecting to a different WiFi network or using mobile data.');
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

  private createDataChannel(): void {
    console.time('Create data channel');
    
    // Configure data channel based on expected connection type
    const dataChannelOptions: RTCDataChannelInit = {
      ordered: true,
      maxRetransmits: this.isSlowConnection ? 20 : 3, // More retransmits for slow connections
    };
    
    this.dataChannel = this.peerConnection!.createDataChannel('file-transfer', dataChannelOptions);
    this.dataChannel.binaryType = 'arraybuffer';
    this.dataChannel.bufferedAmountLowThreshold = this.chunkSize * 2;
    
    console.log(`Data channel created with ID: ${this.dataChannel.id}`);
    this.setupDataChannelHandlers();
    
    console.timeEnd('Create data channel');
  }

  private setupDataChannelReceiver(): void {
    this.peerConnection!.ondatachannel = (event) => {
      console.log('Data channel received from sender');
      this.dataChannel = event.channel;
      this.dataChannel.binaryType = 'arraybuffer';
      this.dataChannel.bufferedAmountLowThreshold = this.chunkSize * 2;
      this.setupDataChannelHandlers();
    };
  }

  private setupDataChannelHandlers(): void {
    if (!this.dataChannel) return;

    this.dataChannel.onopen = () => {
      console.log(`📡 Data channel OPEN at ${Date.now()}`);
      this.onDataChannelOpen?.();
      
      if (this.role === 'sender' && !this.hasStartedTransfer && this.currentFiles.length > 0) {
        console.log('🚀 Starting transfer on DC open!');
        this.hasStartedTransfer = true;
        
        // Brief delay to let connection stabilize
        setTimeout(() => {
          this.onStatusMessage?.('Starting optimized file transfer...');
          this.startFileTransfer();
        }, 500);
      }
    };

    this.dataChannel.onclose = () => {
      console.log('Data channel closed');
      this.onDataChannelClose?.();
      this.onStatusMessage?.('Connection closed');
    };

    this.dataChannel.onerror = (error) => {
      console.error('Data channel error:', error);
      this.errorCount++;
      if (this.errorCount > 5) {
        this.onError?.('Too many connection errors. Please try again with a more stable internet connection.');
      }
    };

    this.dataChannel.onmessage = (event) => {
      if (typeof event.data === 'string') {
        this.handleTextMessage(JSON.parse(event.data));
      } else {
        this.handleBinaryData(event.data);
      }
    };
  }

  private async handleSignalingMessage(message: SignalingMessage): Promise<void> {
    console.log(`Handling signal: ${message.type} at ${Date.now()}`);
    
    try {
      switch (message.type) {
        case 'offer':
          if (this.role === 'receiver') {
            console.time('Process offer and send answer');
            this.onStatusMessage?.('Sender found! Establishing secure connection...');
            
            await this.peerConnection!.setRemoteDescription(message.payload);
            
            const answer = await this.peerConnection!.createAnswer();
            await this.peerConnection!.setLocalDescription(answer);
            
            signalingService.sendSignal({
              type: 'answer',
              payload: answer,
              toRoom: this.roomCode,
            });
            
            console.timeEnd('Process offer and send answer');
          }
          break;

        case 'answer':
          if (this.role === 'sender') {
            console.time('Process answer');
            this.onStatusMessage?.('Receiver responded! Finalizing connection...');
            await this.peerConnection!.setRemoteDescription(message.payload);
            console.timeEnd('Process answer');
          }
          break;

        case 'ice':
          try {
            await this.peerConnection!.addIceCandidate(message.payload);
          } catch (e) {
            console.debug('ICE candidate failed (normal):', e);
          }
          break;
      }
    } catch (error) {
      console.error('Signaling error:', error);
      this.onError?.('Connection setup failed. Please try again.');
    }
  }

  private async startFileTransfer(): Promise<void> {
    console.log(`📤 Starting optimized file transfer with ${this.currentFiles.length} files`);
    console.log(`📊 Connection type: ${this.connectionType}, Chunk size: ${this.chunkSize / 1024}KB`);
    
    if (this.currentFiles.length === 0 || !this.dataChannel) return;

    // Final connection analysis before starting
    await this.analyzeConnection();

    if (this.dataChannel.readyState !== 'open') {
      console.log('Waiting for data channel to open...');
      await new Promise(resolve => {
        const checkOpen = setInterval(() => {
          if (this.dataChannel?.readyState === 'open') {
            clearInterval(checkOpen);
            resolve(undefined);
          }
        }, 100);
        
        setTimeout(() => {
          clearInterval(checkOpen);
          resolve(undefined);
        }, 5000);
      });
    }

    if (this.dataChannel.readyState !== 'open') {
      console.error('Data channel failed to open');
      this.onError?.('Unable to start transfer. Please try again.');
      return;
    }

    const fileList: FileMetadata[] = this.currentFiles.map((file, index) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      fileIndex: index,
    }));

    this.dataChannel.send(JSON.stringify({
      type: 'file-list',
      data: fileList
    }));
    
    this.transferStartTime = Date.now();
    this.currentFileIndex = 0;
    
    this.onStatusMessage?.(`Starting transfer with ${this.connectionType} connection...`);
    await this.sendFile(this.currentFiles[0]);
  }

  private async sendFile(file: File): Promise<void> {
    if (this.cancelledFileIndices.has(this.currentFileIndex)) {
      this.currentFileIndex++;
      if (this.currentFileIndex < this.currentFiles.length) {
        await this.sendFile(this.currentFiles[this.currentFileIndex]);
      } else {
        this.sendTextMessage({ type: 'transfer-complete' });
        this.onStatusMessage?.('All files sent successfully!');
        this.onTransferComplete?.();
      }
      return;
    }
    
    console.log(`Sending file: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
    this.onStatusMessage?.(`Sending ${file.name}...`);
    
    const metadata: FileMetadata = {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      fileIndex: this.currentFileIndex,
    };

    this.sendTextMessage({
      type: 'file-meta',
      data: metadata,
    });

    const arrayBuffer = await file.arrayBuffer();
    const totalChunks = Math.ceil(arrayBuffer.byteLength / this.chunkSize);
    
    console.log(`Sending ${totalChunks} chunks of ${this.chunkSize / 1024}KB each (${this.connectionType} connection)`);
    
    let sentBytes = 0;
    let lastSpeedCheck = Date.now();
    let bytesAtLastCheck = 0;
    
    for (let i = 0; i < totalChunks; i++) {
      if (this.cancelledFileIndices.has(this.currentFileIndex)) {
        return;
      }
      
      const start = i * this.chunkSize;
      const end = Math.min(start + this.chunkSize, arrayBuffer.byteLength);
      const chunk = arrayBuffer.slice(start, end);
      
      // Adaptive buffer management
      const bufferThreshold = this.isSlowConnection ? this.maxBufferSize / 4 : this.maxBufferSize;
      
      if (this.dataChannel!.bufferedAmount > bufferThreshold) {
        await new Promise(resolve => {
          const checkBuffer = setInterval(() => {
            if (this.dataChannel!.bufferedAmount < bufferThreshold / 2) {
              clearInterval(checkBuffer);
              resolve(undefined);
            }
          }, 10);
        });
      }
      
      try {
        this.dataChannel!.send(chunk);
        sentBytes += chunk.byteLength;
        
        // Add adaptive delay for slow connections
        if (this.adaptiveDelayMs > 0) {
          await new Promise(resolve => setTimeout(resolve, this.adaptiveDelayMs));
        }
        
      } catch (error) {
        console.error(`Error sending chunk ${i + 1}:`, error);
        this.retransmissionCount++;
        
        if (this.retransmissionCount > 10) {
          this.onError?.('Too many transmission errors. Connection may be unstable.');
          return;
        }
        
        // Retry the chunk
        i--; // Retry current chunk
        continue;
      }
      
      // Monitor speed and adapt
      const now = Date.now();
      if (now - lastSpeedCheck > 2000) { // Check every 2 seconds
        const speed = (sentBytes - bytesAtLastCheck) / ((now - lastSpeedCheck) / 1000);
        this.speedHistory.push(speed);
        
        // Keep last 5 speed readings
        if (this.speedHistory.length > 5) {
          this.speedHistory.shift();
        }
        
        // Adapt chunk size based on performance
  this.adaptChunkSize();
        
        lastSpeedCheck = now;
        bytesAtLastCheck = sentBytes;
      }
      
      // Report progress less frequently for slow connections
      const progressInterval = this.isSlowConnection ? 25 : 10;
      if (i % progressInterval === 0 || i === totalChunks - 1) {
        const progress = ((i + 1) / totalChunks) * 100;
        const speed = this.calculateSpeed(sentBytes);
        
        const progressData = {
          fileName: file.name,
          fileIndex: this.currentFileIndex,
          progress,
          bytesTransferred: sentBytes,
          totalBytes: file.size,
          speed,
        };
        
        this.onTransferProgress?.(progressData);
        
        // Sync progress less frequently for slow connections
        const syncInterval = this.isSlowConnection ? 5000 : 1000;
        const now = Date.now();
        if (now - this.lastProgressSync > syncInterval || progress >= 100) {
          this.sendTextMessage({
            type: 'progress-sync',
            data: progressData
          });
          this.lastProgressSync = now;
        }
      }
    }

    console.log(`✅ File sent: ${file.name}`);

    this.currentFileIndex++;
    if (this.currentFileIndex < this.currentFiles.length) {
      await this.sendFile(this.currentFiles[this.currentFileIndex]);
    } else {
      this.sendTextMessage({ type: 'transfer-complete' });
      this.onStatusMessage?.('All files sent successfully!');
      this.onTransferComplete?.();
    }
  }

  private adaptChunkSize(): void {
    // Don't adapt if we don't have enough data
    if (this.speedHistory.length < 3) return;
    const avgSpeed = this.speedHistory.reduce((a, b) => a + b, 0) / this.speedHistory.length;
    // If speed is consistently low (< 50KB/s), reduce chunk size
    if (avgSpeed < 50 * 1024 && this.chunkSize > this.minChunkSize) {
      this.chunkSize = Math.max(this.minChunkSize, this.chunkSize * 0.8);
      this.adaptiveDelayMs = Math.min(50, this.adaptiveDelayMs + 5);
      console.log(`📉 Reduced chunk size to ${this.chunkSize / 1024}KB due to slow speed`);
    }
    // If speed is good (> 200KB/s) and we're using small chunks, increase
    else if (avgSpeed > 200 * 1024 && this.chunkSize < this.maxChunkSize && this.connectionType === 'direct') {
      this.chunkSize = Math.min(this.maxChunkSize, this.chunkSize * 1.2);
      this.adaptiveDelayMs = Math.max(0, this.adaptiveDelayMs - 5);
      console.log(`� Increased chunk size to ${this.chunkSize / 1024}KB due to good speed`);
    }
  }

  private handleTextMessage(message: DataChannelMessage): void {
    switch (message.type) {
      case 'file-list':
        const fileList = message.data as FileMetadata[];
        this.onStatusMessage?.('Ready to receive files!');
        this.onIncomingFiles?.(fileList);
        break;

      case 'file-meta':
        this.currentFileMeta = message.data as FileMetadata;
        this.currentFileIndex = this.currentFileMeta.fileIndex;
        this.receiveBuffers = [];
        this.receivedBytes = 0;
        
        console.log(`📝 File metadata received:`, {
          name: this.currentFileMeta.name,
          size: this.currentFileMeta.size,
          type: this.currentFileMeta.type,
          fileIndex: this.currentFileMeta.fileIndex
        });
        
        this.onStatusMessage?.(`Receiving ${this.currentFileMeta.name}...`);
        
        if (this.transferStartTime === 0) {
          this.transferStartTime = Date.now();
        }
        break;

      case 'transfer-complete':
        this.onStatusMessage?.('All files received successfully!');
        this.onTransferComplete?.();
        break;

      case 'transfer-cancelled':
        const cancelData = message.data as { cancelledBy: 'sender' | 'receiver' };
        this.onStatusMessage?.('Transfer was cancelled.');
        this.onTransferCancelled?.(cancelData?.cancelledBy || 'peer');
        break;

      case 'file-cancelled':
        const fileCancelData = message.data as { fileIndex: number; fileName: string; cancelledBy: 'sender' | 'receiver' };
        this.cancelledFileIndices.add(fileCancelData.fileIndex);
        
        if (this.currentFileIndex === fileCancelData.fileIndex && this.currentFileMeta) {
          this.currentFileMeta = null;
          this.receiveBuffers = [];
          this.receivedBytes = 0;
        }
        
        this.onStatusMessage?.(`${fileCancelData.fileName} was skipped.`);
        this.onFileCancelled?.(fileCancelData);
        break;

      case 'progress-sync':
        const progressData = message.data as FileTransferProgress;
        this.onTransferProgress?.(progressData);
        break;
    }
  }

  private handleBinaryData(data: ArrayBuffer): void {
    if (!this.currentFileMeta) {
      console.warn('⚠️ Received binary data but no file metadata available');
      return;
    }

    console.log(`📦 Received chunk: ${data.byteLength} bytes (Total: ${this.receivedBytes + data.byteLength}/${this.currentFileMeta.size})`);
    
    // Validate chunk size
    if (data.byteLength === 0) {
      console.warn('⚠️ Received empty chunk, skipping');
      return;
    }
    
    // Check if adding this chunk would exceed expected file size
    if (this.receivedBytes + data.byteLength > this.currentFileMeta.size) {
      console.warn(`⚠️ Chunk would exceed file size. Truncating chunk.`);
      const allowedBytes = this.currentFileMeta.size - this.receivedBytes;
      if (allowedBytes > 0) {
        const truncatedChunk = data.slice(0, allowedBytes);
        this.receiveBuffers.push(truncatedChunk);
        this.receivedBytes += truncatedChunk.byteLength;
      }
    } else {
      this.receiveBuffers.push(data);
      this.receivedBytes += data.byteLength;
    }

    // Report progress for receiver
    const progress = (this.receivedBytes / this.currentFileMeta.size) * 100;
    const speed = this.calculateSpeed(this.receivedBytes);
    
    this.onTransferProgress?.({
      fileName: this.currentFileMeta.name,
      fileIndex: this.currentFileIndex,
      progress,
      bytesTransferred: this.receivedBytes,
      totalBytes: this.currentFileMeta.size,
      speed,
    });

    if (this.receivedBytes >= this.currentFileMeta.size) {
      console.log(`📦 Reconstructing file: ${this.currentFileMeta.name}`);
      console.log(`📊 Total chunks received: ${this.receiveBuffers.length}`);
      console.log(`📊 Total bytes received: ${this.receivedBytes}`);
      console.log(`📊 Expected file size: ${this.currentFileMeta.size}`);
      
      try {
        // Create blob from all received chunks
        const blob = new Blob(this.receiveBuffers, { type: this.currentFileMeta.type });
        console.log(`📊 Blob size after reconstruction: ${blob.size}`);
        
        // Verify blob size matches expected size
        if (blob.size !== this.currentFileMeta.size) {
          console.error(`❌ File size mismatch! Expected: ${this.currentFileMeta.size}, Got: ${blob.size}`);
          this.onError?.(`File reconstruction failed: size mismatch for ${this.currentFileMeta.name}`);
          return;
        }
        
        const file = new File([blob], this.currentFileMeta.name, {
          type: this.currentFileMeta.type,
          lastModified: this.currentFileMeta.lastModified,
        });
        
        console.log(`📊 Final file size: ${file.size}`);
        
        if (this.onFileReceived) {
          this.onFileReceived(file);
        }
        
        console.log(`✅ File received successfully: ${this.currentFileMeta.name}`);
        
      } catch (error) {
        console.error(`❌ Error reconstructing file ${this.currentFileMeta.name}:`, error);
        this.onError?.(`Failed to reconstruct file: ${this.currentFileMeta.name}`);
        return;
      }
      
      this.currentFileMeta = null;
      this.receiveBuffers = [];
      this.receivedBytes = 0;
    }
  }

  private sendTextMessage(message: DataChannelMessage): void {
    if (this.dataChannel?.readyState === 'open') {
      this.dataChannel.send(JSON.stringify(message));
    }
  }

  private calculateSpeed(bytesTransferred: number): number {
    if (this.transferStartTime === 0 || bytesTransferred === 0) return 0;
    
    const elapsed = (Date.now() - this.transferStartTime) / 1000;
    const speed = elapsed > 0 ? bytesTransferred / elapsed : 0;
    
    return isFinite(speed) ? Math.max(0, speed) : 0;
  }

  // Get connection quality info for debugging
  async getConnectionStats(): Promise<Record<string, unknown> | null> {
    if (!this.peerConnection) return null;
    
    try {
      const stats = await this.peerConnection.getStats();
  const result: Record<string, unknown> = {
        connectionType: this.connectionType,
        chunkSize: this.chunkSize,
        isSlowConnection: this.isSlowConnection,
        speedHistory: [...this.speedHistory],
        errorCount: this.errorCount,
        retransmissionCount: this.retransmissionCount
      };
      
      stats.forEach((report) => {
        if (report.type === 'candidate-pair' && report.state === 'succeeded') {
          result.candidatePair = {
            availableOutgoingBitrate: report.availableOutgoingBitrate,
            currentRoundTripTime: report.currentRoundTripTime,
            totalRoundTripTime: report.totalRoundTripTime,
            bytesReceived: report.bytesReceived,
            bytesSent: report.bytesSent
          };
        }
      });
      
      return result;
    } catch (error) {
      console.error('Failed to get connection stats:', error);
      return null;
    }
  }

  cancelTransfer(): void {
    this.onStatusMessage?.('Cancelling transfer...');
    
    if (this.role) {
      this.sendTextMessage({
        type: 'transfer-cancelled',
        data: { cancelledBy: this.role },
      });
    }
    
    this.cleanup();
  }

  cancelFile(fileIndex: number, fileName: string): void {
    this.cancelledFileIndices.add(fileIndex);
    this.onStatusMessage?.(`Skipping ${fileName}...`);
    
    if (this.role) {
      this.sendTextMessage({
        type: 'file-cancelled',
        data: { 
          fileIndex, 
          fileName, 
          cancelledBy: this.role 
        },
      });
    }
  }

  cleanup(): void {
    this.clearConnectionTimeout();
    
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
    this.receiveBuffers = [];
    this.currentFileIndex = 0;
    this.currentFileMeta = null;
    this.transferStartTime = 0;
    this.receivedBytes = 0;
    this.lastProgressSync = 0;
    this.cancelledFileIndices.clear();
    this.role = null;
    this.roomCode = '';
    this.hasStartedTransfer = false;
    this.offerCreated = false;
    this.isConnecting = false;
    
    // Reset performance tracking
    this.speedHistory = [];
    this.errorCount = 0;
    this.retransmissionCount = 0;
    this.connectionType = 'unknown';
    this.isSlowConnection = false;
    this.adaptiveDelayMs = 0;
    this.chunkSize = 16 * 1024; // Reset to conservative default
    
    this.onStatusMessage?.('Disconnected');
  }
}

export const webrtcService = new WebRTCService();