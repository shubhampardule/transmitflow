import { FileMetadata, SignalingMessage, DataChannelMessage, FileTransferProgress } from '@/types';
import { signalingService } from './signaling';

export class WebRTCService {
  private peerConnection: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private roomCode: string = '';
  private role: 'sender' | 'receiver' | null = null;
  
  // AGGRESSIVE optimization - minimal ICE servers
  private readonly config: RTCConfiguration = {
    iceServers: [
      // Only use Google STUN - it's the fastest and most reliable
      { urls: 'stun:stun.l.google.com:19302' },
      // Keep one TURN as fallback but don't wait for it
      {
        urls: "turn:standard.relay.metered.ca:80",
        username: process.env.NEXT_PUBLIC_METERED_TURN_USERNAME,
        credential: process.env.NEXT_PUBLIC_METERED_TURN_CREDENTIAL,
      },
    ],
    
    // CRITICAL: These settings speed up connection
    iceTransportPolicy: 'all',
    bundlePolicy: 'max-bundle',
    rtcpMuxPolicy: 'require',
    iceCandidatePoolSize: 0, // Don't pre-gather
  };

  // Aggressive transfer settings for LAN/fast connections
  private readonly chunkSize = 64 * 1024; // 64KB chunks (original stable setting)
  private readonly maxBufferSize = 8 * 1024 * 1024; // 8MB max buffer (original stable setting)

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
  private connectionTimeout: NodeJS.Timeout | null = null;
  private hasStartedTransfer = false;
  private offerCreated = false;
  private isConnecting = false;

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

    // Create peer connection and data channel in parallel
    await this.createPeerConnection();
    this.createDataChannel();
    
    // Create offer IMMEDIATELY - don't wait for anything
    if (!this.offerCreated) {
      this.offerCreated = true;
      const offer = await this.peerConnection!.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: false,
      });
      
      await this.peerConnection!.setLocalDescription(offer);
      
      // Send offer RIGHT AWAY
      console.log('Sending offer immediately');
      signalingService.sendSignal({
        type: 'offer',
        payload: offer,
        toRoom: roomCode,
      });
    }

    // Very short timeout since we're on fast network
    this.setConnectionTimeout(10000); // 10 seconds
    
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

    await this.createPeerConnection();
    this.setupDataChannelReceiver();
    
    this.setConnectionTimeout(10000);
    
    console.timeEnd('Receiver initialization');
  }

  private async createPeerConnection(): Promise<void> {
    console.time('Create peer connection');
    
    this.peerConnection = new RTCPeerConnection(this.config);

    // CRITICAL: Try to start transfer on ANY positive signal
    let transferAttempted = false;
    
    const attemptTransferStart = () => {
      if (!transferAttempted && this.role === 'sender' && this.dataChannel) {
        const dcState = this.dataChannel.readyState;
        const iceState = this.peerConnection?.iceConnectionState;
        const connState = this.peerConnection?.connectionState;
        
        console.log(`Checking transfer start: DC=${dcState}, ICE=${iceState}, Conn=${connState}`);
        
        // Start if data channel is open OR ICE is connected
        if (dcState === 'open' || iceState === 'connected' || iceState === 'completed') {
          if (!this.hasStartedTransfer && this.currentFiles.length > 0) {
            console.log('🚀 Starting transfer IMMEDIATELY!');
            this.hasStartedTransfer = true;
            transferAttempted = true;
            this.startFileTransfer();
          }
        }
      }
    };

    // Monitor connection state
    this.peerConnection.onconnectionstatechange = () => {
      const state = this.peerConnection!.connectionState;
      console.log(`Connection state: ${state} at ${Date.now()}`);
      this.onConnectionStateChange?.(state);
      
      if (state === 'connected') {
        this.clearConnectionTimeout();
        attemptTransferStart();
      } else if (state === 'failed') {
        this.onError?.('Connection failed');
      }
    };

    // Monitor ICE connection - THIS IS USUALLY FASTER
    this.peerConnection.oniceconnectionstatechange = () => {
      const state = this.peerConnection!.iceConnectionState;
      console.log(`ICE state: ${state} at ${Date.now()}`);
      
      // Start transfer on ICE connected - don't wait for full connection
      if (state === 'connected' || state === 'completed') {
        this.clearConnectionTimeout();
        attemptTransferStart();
      } else if (state === 'checking') {
        console.log('ICE checking - connection imminent...');
      }
    };

    // ICE gathering state
    this.peerConnection.onicegatheringstatechange = () => {
      const state = this.peerConnection!.iceGatheringState;
      console.log(`ICE gathering: ${state} at ${Date.now()}`);
      this.onIceGatheringStateChange?.(state);
    };

    // Send ICE candidates AS SOON AS they're generated
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // Log only important candidates
        if (event.candidate.type === 'host' || event.candidate.type === 'srflx') {
          console.log(`Sending ${event.candidate.type} candidate`);
        }
        
        // Send immediately - no buffering
        signalingService.sendSignal({
          type: 'ice',
          payload: event.candidate,
          toRoom: this.roomCode,
        });
      }
    };

    // Set up signaling BEFORE creating connection
    signalingService.onSignal(this.handleSignalingMessage.bind(this));
    
    console.timeEnd('Create peer connection');
  }

  private setConnectionTimeout(duration: number = 10000): void {
    this.connectionTimeout = setTimeout(() => {
      const iceState = this.peerConnection?.iceConnectionState;
      const connState = this.peerConnection?.connectionState;
      
      if (iceState !== 'connected' && iceState !== 'completed' && connState !== 'connected') {
        console.error(`Connection timeout - ICE: ${iceState}, Conn: ${connState}`);
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

  private createDataChannel(): void {
    console.time('Create data channel');
    
    // OPTIMIZED data channel for speed
    this.dataChannel = this.peerConnection!.createDataChannel('file-transfer', {
      ordered: true,
      maxRetransmits: 10, // More retransmits for reliability on fast networks
    });

    this.dataChannel.binaryType = 'arraybuffer';
    this.dataChannel.bufferedAmountLowThreshold = this.chunkSize * 10; // Bigger threshold
    
    console.log(`Data channel created with ID: ${this.dataChannel.id}`);
    this.setupDataChannelHandlers();
    
    console.timeEnd('Create data channel');
  }

  private setupDataChannelReceiver(): void {
    this.peerConnection!.ondatachannel = (event) => {
      console.log('Data channel received from sender');
      this.dataChannel = event.channel;
      this.dataChannel.binaryType = 'arraybuffer';
      this.dataChannel.bufferedAmountLowThreshold = this.chunkSize * 10;
      this.setupDataChannelHandlers();
    };
  }

  private setupDataChannelHandlers(): void {
    if (!this.dataChannel) return;

    this.dataChannel.onopen = () => {
      console.log(`📡 Data channel OPEN at ${Date.now()}`);
      this.onDataChannelOpen?.();
      
      // IMMEDIATELY start transfer if sender
      if (this.role === 'sender' && !this.hasStartedTransfer && this.currentFiles.length > 0) {
        console.log('🚀 Starting transfer on DC open!');
        this.hasStartedTransfer = true;
        this.startFileTransfer();
      }
    };

    this.dataChannel.onclose = () => {
      console.log('Data channel closed');
      this.onDataChannelClose?.();
    };

    this.dataChannel.onerror = (error) => {
      console.error('Data channel error:', error);
      this.onError?.('Data channel error');
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
            
            // Set remote description
            await this.peerConnection!.setRemoteDescription(message.payload);
            
            // Create and send answer IMMEDIATELY
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
            await this.peerConnection!.setRemoteDescription(message.payload);
            console.timeEnd('Process answer');
          }
          break;

        case 'ice':
          // Add ICE candidate without waiting
          this.peerConnection!.addIceCandidate(message.payload).catch(e => {
            // Ignore failures - some candidates might not work
            console.debug('ICE candidate failed (normal):', e.message);
          });
          break;
      }
    } catch (error) {
      console.error('Signaling error:', error);
    }
  }

  private async startFileTransfer(): Promise<void> {
    console.log(`📤 Starting file transfer with ${this.currentFiles.length} files`);
    
    if (this.currentFiles.length === 0 || !this.dataChannel) return;

    // Wait a tiny bit for channel to stabilize if needed
    if (this.dataChannel.readyState !== 'open') {
      console.log('Waiting for data channel to open...');
      await new Promise(resolve => {
        const checkOpen = setInterval(() => {
          if (this.dataChannel?.readyState === 'open') {
            clearInterval(checkOpen);
            resolve(undefined);
          }
        }, 50);
        
        // Timeout after 2 seconds
        setTimeout(() => {
          clearInterval(checkOpen);
          resolve(undefined);
        }, 2000);
      });
    }

    if (this.dataChannel.readyState !== 'open') {
      console.error('Data channel failed to open');
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
    
    // Start sending first file
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
    
    console.log(`Sending file: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
    
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
    
    console.log(`Sending ${totalChunks} chunks of ${this.chunkSize / 1024}KB each`);
    
    // Send chunks FAST
    let sentBytes = 0;
    for (let i = 0; i < totalChunks; i++) {
      if (this.cancelledFileIndices.has(this.currentFileIndex)) {
        return;
      }
      
      const start = i * this.chunkSize;
      const end = Math.min(start + this.chunkSize, arrayBuffer.byteLength);
      const chunk = arrayBuffer.slice(start, end);
      
      // Only wait if buffer is REALLY full
      if (this.dataChannel!.bufferedAmount > this.maxBufferSize) {
        await new Promise(resolve => {
          const checkBuffer = setInterval(() => {
            if (this.dataChannel!.bufferedAmount < this.maxBufferSize / 2) {
              clearInterval(checkBuffer);
              resolve(undefined);
            }
          }, 1);
        });
      }
      
      try {
        this.dataChannel!.send(chunk);
        sentBytes += chunk.byteLength;
      } catch (error) {
        console.error(`Error sending chunk ${i + 1}:`, error);
        this.onError?.('Failed to send file chunk');
        return;
      }
      
      // Report progress every 50 chunks or at the end
      if (i % 50 === 0 || i === totalChunks - 1) {
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
        
        // Sync less frequently
        const now = Date.now();
        if (now - this.lastProgressSync > 1000 || progress >= 100) {
          this.sendTextMessage({
            type: 'progress-sync',
            data: progressData
          });
          this.lastProgressSync = now;
        }
      }
    }

    console.log(`✅ File sent: ${file.name}`);

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
    this.hasStartedTransfer = false;
    this.offerCreated = false;
    this.isConnecting = false;
  }
}

export const webrtcService = new WebRTCService();