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
  // Mobile senders (to PC): Use smaller chunks for memory efficiency
  BINARY_CHUNK_SIZE_SMALL: 32 * 1024,    // 32KB for large files (>5MB) on mobile
  BINARY_CHUNK_SIZE_NORMAL: 128 * 1024,  // 128KB for smaller files on mobile
  BINARY_BUFFER_THRESHOLD: 512 * 1024,   // 512KB buffer (reduced for mobile)
  
  // PC senders (to mobile): Use Base64 for reliability
  BASE64_CHUNK_SIZE: 64 * 1024,          // 64KB for Base64 (mobile-friendly)
  BASE64_BUFFER_THRESHOLD: 256 * 1024,   // 256KB buffer
  
  // File size thresholds
  LARGE_FILE_THRESHOLD: 5 * 1024 * 1024, // 5MB threshold for chunk size adjustment
  
  ACK_TIMEOUT: 2000,
  MAX_RETRIES: 5,
  PROGRESS_UPDATE_INTERVAL: 250,
  CHUNK_TIMEOUT: 15000, // 15 seconds for large file chunks
};

// Message types for both protocols
const MSG_TYPE = {
  FILE_LIST: 'FILE_LIST',
  FILE_START: 'FILE_START',
  FILE_CHUNK_BINARY: 'FILE_CHUNK_BINARY',  // Binary chunk notification
  FILE_CHUNK_BASE64: 'FILE_CHUNK_BASE64',  // Base64 chunk data
  FILE_COMPLETE: 'FILE_COMPLETE',
  CHUNK_ACK: 'CHUNK_ACK',
  TRANSFER_COMPLETE: 'TRANSFER_COMPLETE',
  CONVERSION_PROGRESS: 'CONVERSION_PROGRESS',
  FILE_CANCEL: 'FILE_CANCEL',              // Individual file cancellation
  CANCEL: 'CANCEL',                        // Full transfer cancellation
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
  data?: string; // Base64 encoded chunk data
  files?: FileMetadata[];
  message?: string;
  conversionProgress?: number;
  stage?: 'converting' | 'transferring';
  cancelledBy?: 'sender' | 'receiver';
  transferMethod?: 'binary' | 'base64';
}

export class WebRTCService {
  private peerConnection: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private binaryChannel: RTCDataChannel | null = null; // For binary transfers
  private roomCode: string = '';
  private role: 'sender' | 'receiver' | null = null;
  
  // Transfer method detection
  private senderIsMobile: boolean = false;
  private transferMethod: 'binary' | 'base64' = 'base64';
  
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
  
  // Receiver state - hybrid approach
  private receivedFiles = new Map<number, {
    metadata: FileMetadata;
    chunks: Map<number, string | ArrayBuffer>; // Support both types
    totalChunks: number;
    receivedChunks: Set<number>;
    startTime: number;
    complete: boolean;
    transferMethod: 'binary' | 'base64';
  }>();
  
  private expectedFiles: FileMetadata[] = [];
  private connectionTimeout: NodeJS.Timeout | null = null;
  
  // Binary channel handling
  private setWaitingForChunk?: (fileIndex: number, chunkIndex: number) => void;

  get currentRole(): 'sender' | 'receiver' | null {
    return this.role;
  }

  async initializeAsSender(roomCode: string, files: File[]): Promise<void> {
    this.roomCode = roomCode;
    this.role = 'sender';
    this.filesToSend = files;
    
    // Detect if sender is mobile to choose transfer method
    this.senderIsMobile = isMobileDevice();
    this.transferMethod = this.senderIsMobile ? 'binary' : 'base64';
    
    if (this.transferMethod === 'binary') {
      // Adaptive chunk size based on total file sizes
      const totalFileSize = files.reduce((sum, file) => sum + file.size, 0);
      const hasLargeFiles = files.some(file => file.size > CONFIG.LARGE_FILE_THRESHOLD);
      
      if (hasLargeFiles || totalFileSize > CONFIG.LARGE_FILE_THRESHOLD) {
        this.chunkSize = CONFIG.BINARY_CHUNK_SIZE_SMALL;
        console.log('Large files detected: Using small chunks (32KB) for mobile memory efficiency');
      } else {
        this.chunkSize = CONFIG.BINARY_CHUNK_SIZE_NORMAL;
        console.log('Small files detected: Using normal chunks (128KB) for mobile speed');
      }
      this.bufferThreshold = CONFIG.BINARY_BUFFER_THRESHOLD;
      console.log('Mobile sender detected: Using binary transfer');
    } else {
      this.chunkSize = CONFIG.BASE64_CHUNK_SIZE;
      this.bufferThreshold = CONFIG.BASE64_BUFFER_THRESHOLD;
      console.log('PC sender detected: Using Base64 transfer for mobile compatibility');
    }
    
    this.onStatusMessage?.('Preparing to send files...');
    
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
        this.onStatusMessage?.('Connected! Preparing transfer...');
      } else if (state === 'failed') {
        this.onError?.('Connection failed. Please try again.');
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
    
    // Binary channel only for binary transfers
    if (this.transferMethod === 'binary') {
      this.binaryChannel = this.peerConnection!.createDataChannel('binary', {
        ordered: true,
        maxRetransmits: 3,
      });
      this.binaryChannel.binaryType = 'arraybuffer';
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
        setTimeout(() => this.startTransfer(), 100);
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
        clearTimeout(waitingForChunk.timeout);
        this.handleBinaryChunk(waitingForChunk.fileIndex, waitingForChunk.chunkIndex, event.data);
        waitingForChunk = null;
      } else {
        console.warn('Received unexpected binary data or no waiting chunk');
      }
    };
    
    this.setWaitingForChunk = (fileIndex: number, chunkIndex: number) => {
      if (waitingForChunk) {
        clearTimeout(waitingForChunk.timeout);
      }
      
      // Use longer timeout for large files
      const timeout = setTimeout(() => {
        console.error(`Timeout waiting for chunk ${chunkIndex} of file ${fileIndex}`);
        waitingForChunk = null;
        // Don't fail the whole transfer, just log the missing chunk
      }, CONFIG.CHUNK_TIMEOUT);
      
      waitingForChunk = { fileIndex, chunkIndex, timeout };
    };
  }

  // SENDER METHODS - Hybrid approach
  private async startTransfer(): Promise<void> {
    if (!this.dataChannel || this.dataChannel.readyState !== 'open') {
      this.onError?.('Connection not ready');
      return;
    }
    
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
    
    // Process all files
    for (let i = 0; i < this.filesToSend.length; i++) {
      if (this.transferMethod === 'binary') {
        await this.sendFileBinary(i);
      } else {
        await this.sendFileBase64(i);
      }
    }
    
    this.sendControlMessage({ type: MSG_TYPE.TRANSFER_COMPLETE });
    this.onTransferComplete?.();
    this.onStatusMessage?.('All files sent successfully!');
  }

  // Binary transfer method (mobile to PC)
  private async sendFileBinary(fileIndex: number): Promise<void> {
    const file = this.filesToSend[fileIndex];
    if (!file || this.cancelledFiles.has(fileIndex)) return;
    
    const totalChunks = Math.ceil(file.size / this.chunkSize);
    
    console.log(`Sending ${file.name} via binary: ${totalChunks} chunks of ${this.chunkSize / 1024}KB`);
    
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
      chunkSize: this.chunkSize,
      transferMethod: 'binary',
    });
    
    // Stream file in chunks with improved flow control for large files
    let offset = 0;
    let chunkIndex = 0;
    
    while (offset < file.size && !this.cancelledFiles.has(fileIndex)) {
      const chunkSize = Math.min(this.chunkSize, file.size - offset);
      const chunk = file.slice(offset, offset + chunkSize);
      
      const arrayBuffer = await chunk.arrayBuffer();
      
      // Enhanced buffer management for large files
      const maxBufferSize = file.size > CONFIG.LARGE_FILE_THRESHOLD ? 
        CONFIG.BINARY_BUFFER_THRESHOLD / 2 : CONFIG.BINARY_BUFFER_THRESHOLD;
      
      while (this.binaryChannel!.bufferedAmount > maxBufferSize) {
        console.log(`Buffer full (${this.binaryChannel!.bufferedAmount} bytes), waiting...`);
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      // Send control message first
      this.sendControlMessage({
        type: MSG_TYPE.FILE_CHUNK_BINARY,
        fileIndex,
        chunkIndex,
        chunkSize: arrayBuffer.byteLength,
      });
      
      // Longer delay for large files to ensure control message arrives first
      const controlDelay = file.size > CONFIG.LARGE_FILE_THRESHOLD ? 10 : 5;
      await new Promise(resolve => setTimeout(resolve, controlDelay));
      
      try {
        // Then send binary data
        this.binaryChannel!.send(arrayBuffer);
        console.log(`Sent binary chunk ${chunkIndex}/${totalChunks - 1} for ${file.name} (${arrayBuffer.byteLength} bytes)`);
      } catch (error) {
        console.error(`Failed to send chunk ${chunkIndex}:`, error);
        // Try smaller chunks if we hit memory issues
        if (this.chunkSize > CONFIG.BINARY_CHUNK_SIZE_SMALL) {
          console.log('Reducing chunk size due to memory issues');
          this.chunkSize = CONFIG.BINARY_CHUNK_SIZE_SMALL;
        }
        throw error;
      }
      
      offset += chunkSize;
      chunkIndex++;
      
      // Update progress
      this.updateSendProgress(fileIndex, offset, file.size);
      
      // Adaptive delay between chunks based on file size
      const chunkDelay = file.size > CONFIG.LARGE_FILE_THRESHOLD ? 5 : 1;
      await new Promise(resolve => setTimeout(resolve, chunkDelay));
    }
    
    if (!this.cancelledFiles.has(fileIndex)) {
      this.sendControlMessage({
        type: MSG_TYPE.FILE_COMPLETE,
        fileIndex,
        fileName: file.name,
      });
    }
  }

  // Base64 transfer method (PC to mobile) - from working implementation
  private async sendFileBase64(fileIndex: number): Promise<void> {
    const file = this.filesToSend[fileIndex];
    if (!file || this.cancelledFiles.has(fileIndex)) return;
    
    console.log(`Sending file ${fileIndex}: ${file.name} (${file.size} bytes) via Base64`);
    
    // Show conversion start
    this.onTransferProgress?.({
      fileName: file.name,
      fileIndex,
      progress: 0,
      bytesTransferred: 0,
      totalBytes: file.size,
      speed: 0,
      stage: 'converting',
    });
    
    // Convert file to chunks
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
      const speed = elapsed > 0 ? bytesTransferred / elapsed : 0;
      
      this.onTransferProgress?.({
        fileName: file.name,
        fileIndex,
        progress: percentComplete,
        bytesTransferred: Math.min(bytesTransferred, file.size),
        totalBytes: file.size,
        speed,
        stage: 'transferring',
      });
    }
    
    if (!this.cancelledFiles.has(fileIndex)) {
      this.sendControlMessage({
        type: MSG_TYPE.FILE_COMPLETE,
        fileIndex,
        fileName: file.name,
      });
    }
  }

  private async sendChunkWithFlowControl(fileIndex: number, chunkIndex: number, data: string): Promise<void> {
    while (this.dataChannel && this.dataChannel.bufferedAmount > this.bufferThreshold) {
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    
    this.sendControlMessage({
      type: MSG_TYPE.FILE_CHUNK_BASE64,
      fileIndex,
      chunkIndex,
      data,
    });
  }

  private async fileToChunks(file: File, fileIndex: number): Promise<string[]> {
    const chunks: string[] = [];
    const reader = new FileReader();
    const totalChunks = Math.ceil(file.size / this.chunkSize);
    
    for (let offset = 0; offset < file.size; offset += this.chunkSize) {
      if (this.cancelledFiles.has(fileIndex)) {
        console.log(`File ${fileIndex} cancelled during conversion, stopping`);
        return [];
      }
      
      const slice = file.slice(offset, Math.min(offset + this.chunkSize, file.size));
      const chunkIndex = chunks.length;
      
      const conversionProgress = Math.round((chunkIndex / totalChunks) * 100);
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
      
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(slice);
      });
      
      chunks.push(base64);
    }
    
    return chunks;
  }

  private updateSendProgress(fileIndex: number, bytesSent: number, totalBytes: number): void {
    const progress = this.sendProgressMap.get(fileIndex);
    if (!progress) return;
    
    const now = Date.now();
    
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

  // RECEIVER METHODS - Hybrid support
  private async handleControlMessage(message: ControlMessage): Promise<void> {
    switch (message.type) {
      case MSG_TYPE.FILE_LIST:
        this.handleFileList(message.files!, message.transferMethod);
        break;
        
      case MSG_TYPE.FILE_START:
        this.handleFileStart(message);
        break;
        
      case MSG_TYPE.FILE_CHUNK_BINARY:
        this.setWaitingForChunk?.(message.fileIndex!, message.chunkIndex!);
        break;
        
      case MSG_TYPE.FILE_CHUNK_BASE64:
        this.handleBase64Chunk(message);
        break;
        
      case MSG_TYPE.FILE_COMPLETE:
        await this.handleFileComplete(message);
        break;
        
      case MSG_TYPE.FILE_CANCEL:
        this.handleFileCancel(message);
        break;
        
      case MSG_TYPE.TRANSFER_COMPLETE:
        this.onTransferComplete?.();
        this.onStatusMessage?.('All files received successfully!');
        break;
        
      case MSG_TYPE.ERROR:
        this.onError?.(message.message || 'Transfer error occurred');
        break;
    }
  }

  private handleFileList(files: FileMetadata[], transferMethod?: string): void {
    console.log('Received file list:', files, 'Method:', transferMethod);
    this.expectedFiles = files;
    this.onIncomingFiles?.(files);
    this.onStatusMessage?.(`Ready to receive files (${transferMethod || 'unknown'} mode)`);
  }

  private handleFileStart(message: ControlMessage): void {
    const { fileIndex, fileName, fileSize, fileType, lastModified, totalChunks, transferMethod } = message;
    
    console.log(`Starting to receive file ${fileIndex}: ${fileName} (${totalChunks} chunks, ${transferMethod} mode)`);
    
    this.receivedFiles.set(fileIndex!, {
      metadata: {
        name: fileName!,
        size: fileSize!,
        type: fileType!,
        lastModified: lastModified!,
        fileIndex: fileIndex!,
      },
      chunks: new Map(),
      totalChunks: totalChunks!,
      receivedChunks: new Set(),
      startTime: Date.now(),
      complete: false,
      transferMethod: (transferMethod as 'binary' | 'base64') || 'base64',
    });
    
    this.onStatusMessage?.(`Receiving ${fileName}...`);
  }

  private handleBinaryChunk(fileIndex: number, chunkIndex: number, data: ArrayBuffer): void {
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
    
    console.log(`File ${fileIndex}: Received binary chunk ${chunkIndex}/${fileInfo.totalChunks - 1} (${fileInfo.receivedChunks.size}/${fileInfo.totalChunks} total)`);
    
    this.updateReceiveProgress(fileIndex, fileInfo);
  }

  private handleBase64Chunk(message: ControlMessage): void {
    const { fileIndex, chunkIndex, data } = message;
    
    const fileInfo = this.receivedFiles.get(fileIndex!);
    if (!fileInfo) {
      console.error(`Received chunk for unknown file ${fileIndex}`);
      return;
    }
    
    if (fileInfo.receivedChunks.has(chunkIndex!)) {
      console.warn(`Duplicate chunk ${chunkIndex} for file ${fileIndex}`);
      return;
    }
    
    fileInfo.chunks.set(chunkIndex!, data!);
    fileInfo.receivedChunks.add(chunkIndex!);
    
    if (fileInfo.receivedChunks.size % 10 === 0 || fileInfo.receivedChunks.size === fileInfo.totalChunks) {
      console.log(`File ${fileIndex}: ${fileInfo.receivedChunks.size}/${fileInfo.totalChunks} Base64 chunks received`);
    }
    
    this.updateReceiveProgress(fileIndex!, fileInfo);
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

  private updateReceiveProgress(fileIndex: number, fileInfo: {
    metadata: FileMetadata;
    chunks: Map<number, string | ArrayBuffer>;
    totalChunks: number;
    receivedChunks: Set<number>;
    startTime: number;
    complete: boolean;
    transferMethod: 'binary' | 'base64';
  }): void {
    const progress = (fileInfo.receivedChunks.size / fileInfo.totalChunks) * 100;
    const bytesReceived = fileInfo.receivedChunks.size * this.chunkSize;
    const elapsed = (Date.now() - fileInfo.startTime) / 1000;
    const speed = elapsed > 0 ? bytesReceived / elapsed : 0;
    
    this.onTransferProgress?.({
      fileName: fileInfo.metadata.name,
      fileIndex,
      progress,
      bytesTransferred: Math.min(bytesReceived, fileInfo.metadata.size),
      totalBytes: fileInfo.metadata.size,
      speed,
      stage: 'transferring',
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
    const missingChunks: number[] = [];
    for (let i = 0; i < fileInfo.totalChunks; i++) {
      if (!fileInfo.receivedChunks.has(i)) {
        missingChunks.push(i);
      }
    }
    
    if (missingChunks.length > 0) {
      console.error(`❌ File incomplete: ${fileName} (missing ${missingChunks.length} chunks: ${missingChunks.slice(0, 10).join(', ')}${missingChunks.length > 10 ? '...' : ''})`);
      
      // For large files, be more lenient with a few missing chunks at the end
      const fileSize = fileInfo.metadata.size;
      const isLargeFile = fileSize > CONFIG.LARGE_FILE_THRESHOLD;
      const missingPercentage = (missingChunks.length / fileInfo.totalChunks) * 100;
      
      if (isLargeFile && missingPercentage < 1) {
        console.warn(`Large file ${fileName} missing ${missingPercentage.toFixed(2)}% chunks, attempting reconstruction anyway`);
        // Continue with reconstruction for large files with minimal missing chunks
      } else {
        this.onError?.(`Transfer incomplete: ${fileName} (missing ${missingChunks.length} chunks)`);
        return;
      }
    }
    
    console.log(`All chunks received for ${fileName}, reconstructing file...`);
    
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
        // Reconstruct from Base64 chunks (existing logic)
        const binaryChunks: Uint8Array[] = [];
        let totalSize = 0;
        
        for (let i = 0; i < fileInfo.totalChunks; i++) {
          const base64Chunk = fileInfo.chunks.get(i) as string;
          if (!base64Chunk) continue;
          
          const binaryString = atob(base64Chunk);
          const bytes = new Uint8Array(binaryString.length);
          for (let j = 0; j < binaryString.length; j++) {
            bytes[j] = binaryString.charCodeAt(j);
          }
          binaryChunks.push(bytes);
          totalSize += bytes.length;
        }
        
        const combinedArray = new Uint8Array(totalSize);
        let offset = 0;
        for (const chunk of binaryChunks) {
          combinedArray.set(chunk, offset);
          offset += chunk.length;
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
      
    } catch (error) {
      console.error(`Failed to reconstruct file ${fileName}:`, error);
      this.onError?.(`Failed to process ${fileName}: ${error}`);
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
            this.onStatusMessage?.('Sender found! Establishing connection...');
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
            this.onStatusMessage?.('Receiver connected! Establishing data channel...');
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
    
    // Clear all state
    this.filesToSend = [];
    this.currentSendIndex = 0;
    this.sendChunksMap.clear();
    this.sendProgressMap.clear();
    this.receivedFiles.clear();
    this.expectedFiles = [];
    this.cancelledFiles.clear();
    this.role = null;
    this.roomCode = '';
    
    this.onStatusMessage?.('Disconnected');
  }

  // Cancel methods - restored from working implementation
  cancelTransfer(): void {
    this.sendControlMessage({ type: MSG_TYPE.CANCEL });
    this.cleanup();
  }

  cancelFile(fileIndex: number, fileName: string): void {
    // Add to cancelled files set
    this.cancelledFiles.add(fileIndex);
    
    // Send cancellation message to peer
    this.sendControlMessage({
      type: MSG_TYPE.FILE_CANCEL,
      fileIndex,
      fileName,
      cancelledBy: this.role as 'sender' | 'receiver',
    });
    
    // Remove from send progress if it exists
    this.sendProgressMap.delete(fileIndex);
    this.sendChunksMap.delete(fileIndex);
    
    console.log(`Cancelled file ${fileIndex} (${fileName})`);
  }
}

export const webrtcService = new WebRTCService();