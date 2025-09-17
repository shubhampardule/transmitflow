// OPTIMIZED WebRTC Implementation for Mobile and Large Files
// Uses binary transfer with ArrayBuffer for maximum performance

import { FileMetadata, SignalingMessage } from '@/types';
import { signalingService } from './signaling';

// Adaptive configuration based on device capabilities
const CONFIG = {
  // Adaptive chunk sizes
  CHUNK_SIZE_MOBILE: 64 * 1024,      // 64KB for mobile
  CHUNK_SIZE_DESKTOP: 256 * 1024,    // 256KB for desktop
  CHUNK_SIZE_MAX: 1024 * 1024,       // 1MB max chunk for very fast connections
  
  // Buffer management
  BUFFER_HIGH_THRESHOLD: 8 * 1024 * 1024,  // 8MB high water mark
  BUFFER_LOW_THRESHOLD: 2 * 1024 * 1024,   // 2MB low water mark
  
  // Performance
  PARALLEL_CHUNKS: 10,                // Send up to 10 chunks in parallel
  PROGRESS_UPDATE_INTERVAL: 250,      // Update progress every 250ms
};

// Detect if mobile device
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
    || window.innerWidth < 768;
};

// Message types for control channel (JSON)
const MSG_TYPE = {
  FILE_LIST: 'FILE_LIST',
  FILE_START: 'FILE_START',
  FILE_CHUNK_BINARY: 'FILE_CHUNK_BINARY',  // Notification that binary chunk is coming
  FILE_COMPLETE: 'FILE_COMPLETE',
  CHUNK_ACK: 'CHUNK_ACK',
  TRANSFER_COMPLETE: 'TRANSFER_COMPLETE',
  CANCEL: 'CANCEL',
  ERROR: 'ERROR',
  SPEED_TEST: 'SPEED_TEST',
  SPEED_RESULT: 'SPEED_RESULT',
};

interface ControlMessage {
  type: string;
  fileIndex?: number;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  lastModified?: number;
  chunkIndex?: number;
  totalChunks?: number;
  chunkSize?: number;
  files?: FileMetadata[];
  message?: string;
  speed?: number;
}

export class WebRTCService {
  private peerConnection: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private binaryChannel: RTCDataChannel | null = null; // Separate channel for binary data
  private roomCode: string = '';
  private role: 'sender' | 'receiver' | null = null;
  
  // Adaptive settings
  private chunkSize: number = isMobileDevice() ? CONFIG.CHUNK_SIZE_MOBILE : CONFIG.CHUNK_SIZE_DESKTOP;
  private measuredSpeed: number = 0;
  
  // Internal method for binary chunk handling
  private setWaitingForChunk?: (fileIndex: number, chunkIndex: number) => void;
  
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
    iceTransportPolicy: 'all',
    bundlePolicy: 'max-bundle',
    rtcpMuxPolicy: 'require',
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
  public onError?: (error: string) => void;
  public onStatusMessage?: (message: string) => void;
  public onTransferCancelled?: (cancelledBy: 'sender' | 'receiver') => void;
  public onFileCancelled?: (data: { fileIndex: number; fileName: string; cancelledBy: 'sender' | 'receiver' }) => void;
  
  // Sender state
  private filesToSend: File[] = [];
  private currentSendFileIndex = 0;
  private sendProgress = new Map<number, {
    bytesSent: number;
    totalBytes: number;
    startTime: number;
    lastProgressUpdate: number;
  }>();
  
  // Receiver state - Optimized for binary chunks
  private receivedFiles = new Map<number, {
    metadata: FileMetadata;
    chunks: ArrayBuffer[];
    expectedChunks: number;
    receivedBytes: number;
    startTime: number;
  }>();
  
  private expectedChunkIndex = new Map<number, number>(); // Track next expected chunk per file
  private connectionTimeout: NodeJS.Timeout | null = null;

  get currentRole(): 'sender' | 'receiver' | null {
    return this.role;
  }

  async initializeAsSender(roomCode: string, files: File[]): Promise<void> {
    this.roomCode = roomCode;
    this.role = 'sender';
    this.filesToSend = files;
    
    this.onStatusMessage?.('Preparing connection...');
    
    await this.createPeerConnection();
    this.createDataChannels();
    
    const offer = await this.peerConnection!.createOffer();
    await this.peerConnection!.setLocalDescription(offer);
    
    signalingService.sendSignal({
      type: 'offer',
      payload: offer,
      toRoom: roomCode,
    });
    
    this.onStatusMessage?.('Waiting for receiver...');
    this.setConnectionTimeout();
  }

  async initializeAsReceiver(roomCode: string): Promise<void> {
    this.roomCode = roomCode;
    this.role = 'receiver';
    
    this.onStatusMessage?.('Connecting to sender...');
    
    await this.createPeerConnection();
    this.setupDataChannelReceivers();
    
    this.setConnectionTimeout();
  }

  private async createPeerConnection(): Promise<void> {
    this.peerConnection = new RTCPeerConnection(this.config);
    
    this.peerConnection.onconnectionstatechange = () => {
      const state = this.peerConnection!.connectionState;
      this.onConnectionStateChange?.(state);
      
      if (state === 'connected') {
        this.clearConnectionTimeout();
        this.onStatusMessage?.('Connected! Optimizing transfer speed...');
      } else if (state === 'failed') {
        this.onError?.('Connection failed.');
        this.cleanup();
      }
    };
    
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        signalingService.sendSignal({
          type: 'ice',
          payload: event.candidate,
          toRoom: this.roomCode,
        });
      }
    };
    
    signalingService.onSignal(this.handleSignalingMessage.bind(this));
  }

  private createDataChannels(): void {
    // Control channel for JSON messages
    this.dataChannel = this.peerConnection!.createDataChannel('control', {
      ordered: true,
    });
    
    // Binary channel for file data (unordered for speed)
    this.binaryChannel = this.peerConnection!.createDataChannel('binary', {
      ordered: true, // Keep ordered but with no retransmits for speed
      maxRetransmits: 3,
    });
    this.binaryChannel.binaryType = 'arraybuffer';
    
    this.setupDataChannelHandlers();
    this.setupBinaryChannelHandlers();
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
        // Perform speed test then start transfer
        setTimeout(() => this.performSpeedTest(), 500);
      }
    };
    
    this.dataChannel.onclose = () => {
      this.onDataChannelClose?.();
    };
    
    this.dataChannel.onmessage = async (event) => {
      try {
        const message: ControlMessage = JSON.parse(event.data);
        await this.handleControlMessage(message);
      } catch (error) {
        console.error('Error handling control message:', error);
      }
    };
  }

  private setupBinaryChannelHandlers(): void {
    if (!this.binaryChannel) return;
    
    let waitingForChunk: {
      fileIndex: number;
      chunkIndex: number;
      timeout: NodeJS.Timeout;
    } | null = null;
    
    this.binaryChannel.onopen = () => {
      console.log('Binary channel opened');
    };
    
    this.binaryChannel.onmessage = (event) => {
      if (waitingForChunk && event.data instanceof ArrayBuffer) {
        // Clear timeout and process chunk
        clearTimeout(waitingForChunk.timeout);
        this.handleBinaryChunk(waitingForChunk.fileIndex, waitingForChunk.chunkIndex, event.data);
        waitingForChunk = null;
      } else {
        console.warn('Received unexpected binary data or no waiting chunk');
      }
    };
    
    // Store reference for control messages with proper typing
    this.setWaitingForChunk = (fileIndex: number, chunkIndex: number) => {
      // Clear any existing timeout
      if (waitingForChunk) {
        clearTimeout(waitingForChunk.timeout);
      }
      
      // Set up new waiting state with timeout
      const timeout = setTimeout(() => {
        console.error(`Timeout waiting for chunk ${chunkIndex} of file ${fileIndex}`);
        waitingForChunk = null;
      }, 5000); // 5 second timeout for chunk arrival
      
      waitingForChunk = { fileIndex, chunkIndex, timeout };
    };
  }

  // Speed test to optimize chunk size
  private async performSpeedTest(): Promise<void> {
    if (!this.binaryChannel || this.binaryChannel.readyState !== 'open') {
      // Skip speed test if binary channel not ready
      this.startTransfer();
      return;
    }
    
    const testSize = 1024 * 1024; // 1MB test
    const testData = new ArrayBuffer(testSize);
    const startTime = Date.now();
    
    this.sendControlMessage({ type: MSG_TYPE.SPEED_TEST });
    
    try {
      this.binaryChannel.send(testData);
      
      // Wait for acknowledgment (with timeout)
      await new Promise((resolve) => {
        const timeout = setTimeout(resolve, 5000);
        const originalHandler = this.dataChannel!.onmessage;
        
        this.dataChannel!.onmessage = (event) => {
          const message = JSON.parse(event.data);
          if (message.type === MSG_TYPE.SPEED_RESULT) {
            clearTimeout(timeout);
            const duration = Date.now() - startTime;
            this.measuredSpeed = (testSize / duration) * 1000; // bytes per second
            
            // Adapt chunk size based on speed
            if (this.measuredSpeed > 10 * 1024 * 1024) { // > 10MB/s
              this.chunkSize = CONFIG.CHUNK_SIZE_MAX;
            } else if (this.measuredSpeed > 1 * 1024 * 1024) { // > 1MB/s
              this.chunkSize = CONFIG.CHUNK_SIZE_DESKTOP;
            } else {
              this.chunkSize = CONFIG.CHUNK_SIZE_MOBILE;
            }
            
            console.log(`Speed test: ${(this.measuredSpeed / 1024 / 1024).toFixed(2)} MB/s, using chunk size: ${this.chunkSize / 1024}KB`);
            this.dataChannel!.onmessage = originalHandler;
            resolve(undefined);
          } else if (originalHandler && this.dataChannel) {
            originalHandler.call(this.dataChannel, event);
          }
        };
      });
    } catch (error) {
      console.warn('Speed test failed, using default chunk size:', error);
    }
    
    this.startTransfer();
  }

  // OPTIMIZED BINARY TRANSFER
  private async startTransfer(): Promise<void> {
    if (!this.dataChannel || this.dataChannel.readyState !== 'open') {
      this.onError?.('Connection not ready');
      return;
    }
    
    // Send file list
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
    });
    
    this.onStatusMessage?.('Starting optimized transfer...');
    
    // Process files
    for (let i = 0; i < this.filesToSend.length; i++) {
      await this.sendFileBinary(i);
    }
    
    this.sendControlMessage({ type: MSG_TYPE.TRANSFER_COMPLETE });
    this.onTransferComplete?.();
    this.onStatusMessage?.('Transfer complete!');
  }

  private async sendFileBinary(fileIndex: number): Promise<void> {
    const file = this.filesToSend[fileIndex];
    if (!file) return;
    
    const totalChunks = Math.ceil(file.size / this.chunkSize);
    
    console.log(`Sending ${file.name}: ${totalChunks} chunks of ${this.chunkSize / 1024}KB`);
    
    // Initialize progress
    this.sendProgress.set(fileIndex, {
      bytesSent: 0,
      totalBytes: file.size,
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
      chunkSize: this.chunkSize,
    });
    
    // Stream file in chunks without converting to base64
    let offset = 0;
    let chunkIndex = 0;
    
    while (offset < file.size) {
      const chunkSize = Math.min(this.chunkSize, file.size - offset);
      const chunk = file.slice(offset, offset + chunkSize);
      
      // Read as ArrayBuffer (much faster than base64)
      const arrayBuffer = await chunk.arrayBuffer();
      
      // Wait for buffer space
      while (this.binaryChannel!.bufferedAmount > CONFIG.BUFFER_HIGH_THRESHOLD) {
        await new Promise(resolve => setTimeout(resolve, 10));
      }
      
      console.log(`Sending chunk ${chunkIndex}/${totalChunks - 1} for ${file.name} (${arrayBuffer.byteLength} bytes)`);
      
      // Send control message first
      this.sendControlMessage({
        type: MSG_TYPE.FILE_CHUNK_BINARY,
        fileIndex,
        chunkIndex,
        chunkSize: arrayBuffer.byteLength,
      });
      
      // Small delay to ensure control message arrives first
      await new Promise(resolve => setTimeout(resolve, 5));
      
      // Then send binary data
      try {
        this.binaryChannel!.send(arrayBuffer);
      } catch (error) {
        console.error(`Failed to send chunk ${chunkIndex}:`, error);
        this.onError?.(`Failed to send chunk ${chunkIndex} of ${file.name}`);
        return;
      }
      
      offset += chunkSize;
      chunkIndex++;
      
      // Update progress
      this.updateSendProgress(fileIndex, offset, file.size);
      
      // Small delay between chunks to prevent overwhelming the receiver
      await new Promise(resolve => setTimeout(resolve, 1));
    }
    
    // Send completion
    this.sendControlMessage({
      type: MSG_TYPE.FILE_COMPLETE,
      fileIndex,
      fileName: file.name,
    });
  }

  private updateSendProgress(fileIndex: number, bytesSent: number, totalBytes: number): void {
    const progress = this.sendProgress.get(fileIndex);
    if (!progress) return;
    
    progress.bytesSent = bytesSent;
    const now = Date.now();
    
    // Throttle progress updates
    if (now - progress.lastProgressUpdate > CONFIG.PROGRESS_UPDATE_INTERVAL) {
      const elapsed = (now - progress.startTime) / 1000;
      const speed = elapsed > 0 ? bytesSent / elapsed : 0;
      
      this.onTransferProgress?.({
        fileName: this.filesToSend[fileIndex].name,
        fileIndex,
        progress: (bytesSent / totalBytes) * 100,
        bytesTransferred: bytesSent,
        totalBytes,
        speed,
        stage: 'transferring',
        conversionProgress: undefined,
      });
      
      progress.lastProgressUpdate = now;
    }
  }

  // RECEIVER METHODS
  private async handleControlMessage(message: ControlMessage): Promise<void> {
    switch (message.type) {
      case MSG_TYPE.FILE_LIST:
        this.handleFileList(message.files!);
        break;
        
      case MSG_TYPE.FILE_START:
        this.handleFileStart(message);
        break;
        
      case MSG_TYPE.FILE_CHUNK_BINARY:
        // Prepare to receive binary chunk
        this.setWaitingForChunk?.(message.fileIndex!, message.chunkIndex!);
        break;
        
      case MSG_TYPE.FILE_COMPLETE:
        await this.handleFileComplete(message);
        break;
        
      case MSG_TYPE.SPEED_TEST:
        // Respond to speed test
        this.sendControlMessage({ type: MSG_TYPE.SPEED_RESULT });
        break;
        
      case MSG_TYPE.TRANSFER_COMPLETE:
        this.onTransferComplete?.();
        this.onStatusMessage?.('Transfer complete!');
        break;
        
      case MSG_TYPE.ERROR:
        this.onError?.(message.message || 'Transfer error');
        break;
    }
  }

  private handleFileList(files: FileMetadata[]): void {
    this.onIncomingFiles?.(files);
    this.onStatusMessage?.('Ready to receive files');
  }

  private handleFileStart(message: ControlMessage): void {
    const { fileIndex, fileName, fileSize, fileType, lastModified, totalChunks } = message;
    
    console.log(`Receiving ${fileName}: ${totalChunks} chunks`);
    
    this.receivedFiles.set(fileIndex!, {
      metadata: {
        name: fileName!,
        size: fileSize!,
        type: fileType!,
        lastModified: lastModified!,
        fileIndex: fileIndex!,
      },
      chunks: new Array(totalChunks!), // Pre-allocate array with correct size
      expectedChunks: totalChunks!,
      receivedBytes: 0,
      startTime: Date.now(),
    });
    
    this.expectedChunkIndex.set(fileIndex!, 0);
    this.onStatusMessage?.(`Receiving ${fileName}...`);
  }

  private handleBinaryChunk(fileIndex: number, chunkIndex: number, data: ArrayBuffer): void {
    const fileInfo = this.receivedFiles.get(fileIndex);
    if (!fileInfo) {
      console.error(`Received chunk for unknown file ${fileIndex}`);
      return;
    }
    
    // Check if chunk already received (avoid duplicates)
    if (fileInfo.chunks[chunkIndex]) {
      console.warn(`Duplicate chunk ${chunkIndex} for file ${fileIndex}`);
      return;
    }
    
    // Store chunk directly as ArrayBuffer (no conversion needed)
    fileInfo.chunks[chunkIndex] = data;
    fileInfo.receivedBytes += data.byteLength;
    
    // Count actual received chunks (filter out undefined)
    const receivedChunks = fileInfo.chunks.filter(chunk => chunk !== undefined).length;
    
    // Update progress based on actual received chunks
    const progress = (receivedChunks / fileInfo.expectedChunks) * 100;
    const elapsed = (Date.now() - fileInfo.startTime) / 1000;
    const speed = elapsed > 0 ? fileInfo.receivedBytes / elapsed : 0;
    
    console.log(`File ${fileIndex}: Received chunk ${chunkIndex}/${fileInfo.expectedChunks - 1} (${receivedChunks}/${fileInfo.expectedChunks} total)`);
    
    this.onTransferProgress?.({
      fileName: fileInfo.metadata.name,
      fileIndex,
      progress,
      bytesTransferred: fileInfo.receivedBytes,
      totalBytes: fileInfo.metadata.size,
      speed,
      stage: 'transferring',
      conversionProgress: undefined,
    });
  }

  private async handleFileComplete(message: ControlMessage): Promise<void> {
    const { fileIndex, fileName } = message;
    
    const fileInfo = this.receivedFiles.get(fileIndex!);
    if (!fileInfo) {
      console.error(`FILE_COMPLETE for unknown file ${fileIndex}`);
      return;
    }
    
    // Validate that all chunks are received
    const receivedChunks = fileInfo.chunks.filter(chunk => chunk !== undefined).length;
    const missingChunks = fileInfo.expectedChunks - receivedChunks;
    
    if (missingChunks > 0) {
      console.error(`❌ File incomplete: ${fileName} (missing ${missingChunks} chunks)`);
      this.onError?.(`Transfer incomplete: ${fileName} (missing ${missingChunks} chunks)`);
      return;
    }
    
    // Verify all chunk indices are present (no gaps)
    for (let i = 0; i < fileInfo.expectedChunks; i++) {
      if (!fileInfo.chunks[i]) {
        console.error(`❌ Missing chunk ${i} for file ${fileName}`);
        this.onError?.(`Transfer incomplete: ${fileName} (missing chunk ${i})`);
        return;
      }
    }
    
    console.log(`Reconstructing ${fileName} from ${receivedChunks} chunks`);
    
    try {
      // Combine ArrayBuffer chunks (much faster than base64)
      const totalSize = fileInfo.chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
      const combined = new Uint8Array(totalSize);
      let offset = 0;
      
      for (const chunk of fileInfo.chunks) {
        combined.set(new Uint8Array(chunk), offset);
        offset += chunk.byteLength;
      }
      
      // Create file
      const file = new File([combined], fileInfo.metadata.name, {
        type: fileInfo.metadata.type,
        lastModified: fileInfo.metadata.lastModified,
      });
      
      console.log(`✅ File reconstructed: ${fileName} (${file.size} bytes)`);
      
      this.onFileReceived?.(file);
      
      // Final progress
      this.onTransferProgress?.({
        fileName: fileInfo.metadata.name,
        fileIndex: fileIndex!,
        progress: 100,
        bytesTransferred: file.size,
        totalBytes: file.size,
        speed: 0,
        stage: 'transferring',
        conversionProgress: undefined,
      });
      
    } catch (error) {
      console.error(`Failed to reconstruct ${fileName}:`, error);
      this.onError?.(`Failed to process ${fileName}`);
    }
  }

  private sendControlMessage(message: ControlMessage): void {
    if (this.dataChannel && this.dataChannel.readyState === 'open') {
      try {
        this.dataChannel.send(JSON.stringify(message));
      } catch (error) {
        console.error('Error sending control message:', error);
      }
    }
  }

  private async handleSignalingMessage(message: SignalingMessage): Promise<void> {
    try {
      switch (message.type) {
        case 'offer':
          if (this.role === 'receiver') {
            this.onStatusMessage?.('Connecting...');
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
            this.onStatusMessage?.('Finalizing connection...');
            await this.peerConnection!.setRemoteDescription(message.payload);
          }
          break;
          
        case 'ice':
          try {
            await this.peerConnection!.addIceCandidate(message.payload);
          } catch {
            // ICE errors are common, ignore
          }
          break;
      }
    } catch (error) {
      console.error('Signaling error:', error);
      this.onError?.('Connection failed');
    }
  }

  private setConnectionTimeout(duration: number = 30000): void {
    this.connectionTimeout = setTimeout(() => {
      if (this.peerConnection?.connectionState !== 'connected') {
        this.onError?.('Connection timeout');
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
    
    signalingService.removeAllListeners();
    
    // Clear state
    this.filesToSend = [];
    this.sendProgress.clear();
    this.receivedFiles.clear();
    this.expectedChunkIndex.clear();
    this.role = null;
    this.roomCode = '';
    this.currentSendFileIndex = 0;
    
    this.onStatusMessage?.('Disconnected');
  }

  cancelTransfer(): void {
    this.sendControlMessage({ type: MSG_TYPE.CANCEL });
    this.cleanup();
  }

  cancelFile(fileIndex: number, fileName: string): void {
    console.log(`Cancel not implemented for individual files in optimized version - ${fileName} (index: ${fileIndex})`);
  }
}

export const webrtcService = new WebRTCService();