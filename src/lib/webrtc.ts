import { FileMetadata, SignalingMessage, DataChannelMessage, FileTransferProgress } from '@/types';
import { signalingService } from './signaling';

export class WebRTCService {
  private peerConnection: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private roomCode: string = '';
  private role: 'sender' | 'receiver' | null = null;
  
  // Enhanced configuration with TURN servers
  private readonly config: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
      { urls: 'stun:stun3.l.google.com:19302' },
      { urls: 'stun:stun4.l.google.com:19302' },
      { urls: 'stun:stun.services.mozilla.com' },
      { urls: 'stun:stun.stunprotocol.org:3478' },
      { urls: "stun:stun.relay.metered.ca:80" },
      {
        urls: "turn:standard.relay.metered.ca:80",
        username: process.env.NEXT_PUBLIC_METERED_TURN_USERNAME,
        credential: process.env.NEXT_PUBLIC_METERED_TURN_CREDENTIAL,
      },
      {
        urls: "turn:standard.relay.metered.ca:80?transport=tcp",
        username: process.env.NEXT_PUBLIC_METERED_TURN_USERNAME,
        credential: process.env.NEXT_PUBLIC_METERED_TURN_CREDENTIAL,
      },
      {
        urls: "turn:standard.relay.metered.ca:443",
        username: process.env.NEXT_PUBLIC_METERED_TURN_USERNAME,
        credential: process.env.NEXT_PUBLIC_METERED_TURN_CREDENTIAL,
      },
      {
        urls: "turns:standard.relay.metered.ca:443?transport=tcp",
        username: process.env.NEXT_PUBLIC_METERED_TURN_USERNAME,
        credential: process.env.NEXT_PUBLIC_METERED_TURN_CREDENTIAL,
      },
    ],
    
    // Enhanced ICE configuration for better NAT traversal
    iceTransportPolicy: 'all', // Use both STUN and TURN
    bundlePolicy: 'max-bundle',
    rtcpMuxPolicy: 'require',
    iceCandidatePoolSize: 10, // Pre-gather ICE candidates for faster connection
  };

  // Optimized transfer settings for cross-network
  private readonly chunkSize = 16 * 1024; // Reduced to 16KB for better reliability over TURN
  private readonly maxBufferSize = 1 * 1024 * 1024; // Reduced to 1MB for TURN relay

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
  public onConnectionInfo?: (info: { localType?: string; remoteType?: string; protocol?: string }) => void;

  // Transfer state
  private currentFiles: File[] = [];
  private receiveBuffers: ArrayBuffer[] = [];
  private currentFileIndex = 0;
  private currentFileMeta: FileMetadata | null = null;
  private transferStartTime = 0;
  private receivedBytes = 0;
  private lastProgressSync = 0;
  private cancelledFileIndices = new Set<number>();
  private iceGatheringTimeout: NodeJS.Timeout | null = null;
  private connectionTimeout: NodeJS.Timeout | null = null;

  // Getters
  get currentRole(): 'sender' | 'receiver' | null {
    return this.role;
  }

  async initializeAsSender(roomCode: string, files: File[]): Promise<void> {
    this.roomCode = roomCode;
    this.role = 'sender';
    this.currentFiles = files;

    await this.createPeerConnection();
    this.createDataChannel();
    
    // Wait for ICE gathering to complete or timeout
    await this.waitForIceGathering();
    
    // Create offer with specific options for better compatibility
    const offer = await this.peerConnection!.createOffer({
      offerToReceiveAudio: false,
      offerToReceiveVideo: false,
  // voiceActivityDetection: false // Removed: not a valid RTCOfferOptions property
    });
    
    await this.peerConnection!.setLocalDescription(offer);
    
    signalingService.sendSignal({
      type: 'offer',
      payload: offer,
      toRoom: roomCode,
    });

    // Set connection timeout
    this.setConnectionTimeout();
  }

  async initializeAsReceiver(roomCode: string): Promise<void> {
    this.roomCode = roomCode;
    this.role = 'receiver';

    await this.createPeerConnection();
    this.setupDataChannelReceiver();
    
    // Set connection timeout
    this.setConnectionTimeout();
  }

  private async createPeerConnection(): Promise<void> {
    this.peerConnection = new RTCPeerConnection(this.config);

    // Enhanced connection state monitoring
    this.peerConnection.onconnectionstatechange = () => {
      const state = this.peerConnection!.connectionState;
      console.log('Connection state changed:', state);
      console.log('ICE connection state:', this.peerConnection!.iceConnectionState);
      console.log('ICE gathering state:', this.peerConnection!.iceGatheringState);
      this.onConnectionStateChange?.(state);
      if (state === 'connected') {
        this.clearConnectionTimeout();
        this.reportConnectionType();
        // Start file transfer immediately for sender
        if (this.role === 'sender' && this.dataChannel && this.dataChannel.readyState === 'open' && this.currentFiles.length > 0) {
          console.log('Connection established, starting file transfer immediately');
          this.startFileTransfer();
        }
      } else if (state === 'failed') {
        console.error('WebRTC connection failed - likely NAT/firewall issue');
        this.onError?.('Connection failed. This usually means strict NAT/firewall is blocking the connection. Try using a VPN or mobile hotspot.');
      } else if (state === 'disconnected') {
        // Try to reconnect
        this.attemptReconnection();
      }
    };

    // Monitor ICE connection state separately
    this.peerConnection.oniceconnectionstatechange = () => {
      const state = this.peerConnection!.iceConnectionState;
      console.log('ICE connection state:', state);
      
      if (state === 'failed') {
        console.error('ICE connection failed - checking if we need to restart ICE');
        this.restartIce();
      }
    };

    // Monitor ICE gathering
    this.peerConnection.onicegatheringstatechange = () => {
      const state = this.peerConnection!.iceGatheringState;
      console.log('ICE gathering state:', state);
      this.onIceGatheringStateChange?.(state);
    };

    // Enhanced ICE candidate handling
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('ICE candidate generated:');
        console.log('  Type:', event.candidate.type);
        console.log('  Protocol:', event.candidate.protocol);
        console.log('  Address:', event.candidate.address || 'hidden');
        console.log('  Port:', event.candidate.port);
        
        // Send all candidates including relay (TURN) candidates
        signalingService.sendSignal({
          type: 'ice',
          payload: event.candidate,
          toRoom: this.roomCode,
        });
      } else {
        console.log('ICE gathering completed');
        if (this.iceGatheringTimeout) {
          clearTimeout(this.iceGatheringTimeout);
          this.iceGatheringTimeout = null;
        }
      }
    };

    // Set up signaling message handler
    signalingService.onSignal(this.handleSignalingMessage.bind(this));
  }

  private async waitForIceGathering(): Promise<void> {
    return new Promise((resolve) => {
      if (this.peerConnection!.iceGatheringState === 'complete') {
        resolve();
        return;
      }

      // Set a timeout for ICE gathering (10 seconds should be enough)
      this.iceGatheringTimeout = setTimeout(() => {
        console.log('ICE gathering timeout - proceeding anyway');
        resolve();
      }, 10000);

      const checkGatheringState = () => {
        if (this.peerConnection!.iceGatheringState === 'complete') {
          if (this.iceGatheringTimeout) {
            clearTimeout(this.iceGatheringTimeout);
            this.iceGatheringTimeout = null;
          }
          resolve();
        } else {
          setTimeout(checkGatheringState, 100);
        }
      };
      
      checkGatheringState();
    });
  }

  private setConnectionTimeout(): void {
    // 30 second timeout for connection establishment
    this.connectionTimeout = setTimeout(() => {
      if (this.peerConnection?.connectionState !== 'connected') {
        console.error('Connection timeout - failed to establish connection');
        this.onError?.('Connection timeout. Please check your network settings and try again. If using strict firewall, try mobile hotspot.');
        this.cleanup();
      }
    }, 30000);
  }

  private clearConnectionTimeout(): void {
    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
      this.connectionTimeout = null;
    }
  }

  private async restartIce(): Promise<void> {
    try {
      console.log('Attempting ICE restart...');
      
      // Create new offer with ICE restart
      const offer = await this.peerConnection!.createOffer({ iceRestart: true });
      await this.peerConnection!.setLocalDescription(offer);
      
      signalingService.sendSignal({
        type: 'offer',
        payload: offer,
        toRoom: this.roomCode,
      });
    } catch (error) {
      console.error('ICE restart failed:', error);
    }
  }

  private async attemptReconnection(): Promise<void> {
    console.log('Attempting to reconnect...');
    
    // Wait a bit to see if connection recovers
    setTimeout(() => {
      if (this.peerConnection?.connectionState === 'disconnected') {
        this.restartIce();
      }
    }, 2000);
  }

  private reportConnectionType(): void {
    // Get connection statistics to understand what type of connection was established
    this.peerConnection?.getStats().then(stats => {
      stats.forEach(report => {
        if (report.type === 'candidate-pair' && report.state === 'succeeded') {
          const info: Record<string, unknown> = {};
          
          if (report.localCandidateId) {
            stats.forEach(candidate => {
              if (candidate.id === report.localCandidateId) {
                info.localType = candidate.candidateType;
                info.protocol = candidate.protocol;
              }
            });
          }
          
          if (report.remoteCandidateId) {
            stats.forEach(candidate => {
              if (candidate.id === report.remoteCandidateId) {
                info.remoteType = candidate.candidateType;
              }
            });
          }
          
          console.log('Connection established via:', info);
          this.onConnectionInfo?.(info);
          
          // Warn if using relay (TURN)
          if (info.localType === 'relay' || info.remoteType === 'relay') {
            console.log('Using TURN relay server - transfer might be slower');
          }
        }
      });
    });
  }

  private createDataChannel(): void {
    console.log('Creating data channel...');
    
    // Enhanced data channel configuration for reliability
    this.dataChannel = this.peerConnection!.createDataChannel('file-transfer', {
      ordered: true,
      maxRetransmits: 3, // Allow some retransmits for reliability
      maxPacketLifeTime: undefined, // No time limit
      protocol: 'file-transfer-v1'
    });

    this.dataChannel.binaryType = 'arraybuffer';
    this.dataChannel.bufferedAmountLowThreshold = this.chunkSize * 2; // Set low threshold
    
    console.log('Data channel created with ID:', this.dataChannel.id);
    this.setupDataChannelHandlers();
  }

  private setupDataChannelReceiver(): void {
    this.peerConnection!.ondatachannel = (event) => {
      this.dataChannel = event.channel;
      this.dataChannel.binaryType = 'arraybuffer';
      this.dataChannel.bufferedAmountLowThreshold = this.chunkSize * 2;
      this.setupDataChannelHandlers();
    };
  }

  private setupDataChannelHandlers(): void {
    if (!this.dataChannel) return;

    this.dataChannel.onopen = () => {
      console.log('Data channel opened');
      this.onDataChannelOpen?.();
      
      if (this.role === 'sender' && this.currentFiles.length > 0) {
        console.log('Starting file transfer as sender');
        this.startFileTransfer();
      }
    };

    this.dataChannel.onclose = () => {
      console.log('Data channel closed');
      this.onDataChannelClose?.();
    };

    this.dataChannel.onerror = (error) => {
      console.error('Data channel error:', error);
      this.onError?.('Data channel error occurred');
    };

    this.dataChannel.onbufferedamountlow = () => {
      console.log('Buffer amount low - ready for more data');
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
    try {
      switch (message.type) {
        case 'offer':
          if (this.role === 'receiver') {
            await this.peerConnection!.setRemoteDescription(message.payload);
            
            // Wait for ICE gathering before sending answer
            await this.waitForIceGathering();
            
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
            await this.peerConnection!.setRemoteDescription(message.payload);
          }
          break;

        case 'ice':
          // Add ICE candidate
          try {
            await this.peerConnection!.addIceCandidate(message.payload);
            console.log('Added ICE candidate successfully');
          } catch (error) {
            console.error('Error adding ICE candidate:', error);
            // Continue anyway - some candidates might fail
          }
          break;
      }
    } catch (error) {
      console.error('Error handling signaling message:', error);
      this.onError?.('Failed to process signaling message');
    }
  }

  private async startFileTransfer(): Promise<void> {
    if (this.currentFiles.length === 0) return;

    const fileList: FileMetadata[] = this.currentFiles.map((file, index) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      fileIndex: index,
    }));

    if (this.dataChannel) {
      this.dataChannel.send(JSON.stringify({
        type: 'file-list',
        data: fileList
      }));
    }

    this.transferStartTime = Date.now();
    this.currentFileIndex = 0;
    
    await this.sendFile(this.currentFiles[0]);
  }

  private async sendFile(file: File): Promise<void> {
    if (this.cancelledFileIndices.has(this.currentFileIndex)) {
      this.currentFileIndex++;
      if (this.currentFileIndex < this.currentFiles.length) {
        await this.sendFile(this.currentFiles[this.currentFileIndex]);
      } else {
        this.sendTextMessage({ type: 'transfer-complete' });
        this.onTransferComplete?.();
      }
      return;
    }
    
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
    
    for (let i = 0; i < totalChunks; i++) {
      if (this.cancelledFileIndices.has(this.currentFileIndex)) {
        return;
      }
      
      const start = i * this.chunkSize;
      const end = Math.min(start + this.chunkSize, arrayBuffer.byteLength);
      const chunk = arrayBuffer.slice(start, end);
      
      // Enhanced buffer management with exponential backoff
      let attempts = 0;
      let backoffMs = 10;
      const maxAttempts = 2000; // Increased timeout for TURN connections
      
      while (this.dataChannel!.bufferedAmount > this.maxBufferSize && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, backoffMs));
        backoffMs = Math.min(backoffMs * 1.5, 100); // Exponential backoff up to 100ms
        attempts++;
      }
      
      if (attempts >= maxAttempts) {
        console.error('Buffer timeout - transfer may have failed');
        this.onError?.('Transfer timeout - connection may be too slow');
        return;
      }
      
      try {
        this.dataChannel!.send(chunk);
        
        // Adaptive delay based on connection type
        if (i < totalChunks - 1) {
          // Longer delay for TURN connections
          const delay = this.dataChannel!.bufferedAmount > this.chunkSize * 4 ? 10 : 2;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      } catch (error) {
        console.error(`Error sending chunk ${i + 1}:`, error);
        this.onError?.('Failed to send file chunk');
        return;
      }
      
      // Report progress
      const progress = ((i + 1) / totalChunks) * 100;
      const speed = this.calculateSpeed(end);
      
      const progressData = {
        fileName: file.name,
        fileIndex: this.currentFileIndex,
        progress,
        bytesTransferred: end,
        totalBytes: file.size,
        speed,
      };
      
      this.onTransferProgress?.(progressData);
      
      // Send progress sync to receiver
      const now = Date.now();
      if (now - this.lastProgressSync > 500 || progress >= 100) {
        this.sendTextMessage({
          type: 'progress-sync',
          data: progressData
        });
        this.lastProgressSync = now;
      }
    }

    // Move to next file
    this.currentFileIndex++;
    if (this.currentFileIndex < this.currentFiles.length) {
      await this.sendFile(this.currentFiles[this.currentFileIndex]);
    } else {
      this.sendTextMessage({ type: 'transfer-complete' });
      this.onTransferComplete?.();
    }
  }

  private handleTextMessage(message: DataChannelMessage): void {
    switch (message.type) {
      case 'file-list':
        const fileList = message.data as FileMetadata[];
        this.onIncomingFiles?.(fileList);
        break;

      case 'file-meta':
        this.currentFileMeta = message.data as FileMetadata;
        this.currentFileIndex = this.currentFileMeta.fileIndex;
        this.receiveBuffers = [];
        this.receivedBytes = 0;
        
        if (this.transferStartTime === 0) {
          this.transferStartTime = Date.now();
        }
        break;

      case 'transfer-complete':
        this.onTransferComplete?.();
        break;

      case 'transfer-cancelled':
        const cancelData = message.data as { cancelledBy: 'sender' | 'receiver' };
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
        
        this.onFileCancelled?.(fileCancelData);
        break;

      case 'progress-sync':
        const progressData = message.data as FileTransferProgress;
        this.onTransferProgress?.(progressData);
        break;
    }
  }

  private handleBinaryData(data: ArrayBuffer): void {
    if (!this.currentFileMeta) return;

    this.receiveBuffers.push(data);
    this.receivedBytes += data.byteLength;

    if (this.receivedBytes >= this.currentFileMeta.size) {
      const blob = new Blob(this.receiveBuffers, { type: this.currentFileMeta.type });
      const file = new File([blob], this.currentFileMeta.name, {
        type: this.currentFileMeta.type,
        lastModified: this.currentFileMeta.lastModified,
      });

      if (this.onFileReceived) {
        this.onFileReceived(file);
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

  cancelTransfer(): void {
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
    
    if (this.iceGatheringTimeout) {
      clearTimeout(this.iceGatheringTimeout);
      this.iceGatheringTimeout = null;
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
  }
}

export const webrtcService = new WebRTCService();