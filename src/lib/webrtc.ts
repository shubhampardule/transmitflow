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
  // Mobile senders (to PC): Use binary for speed - optimized for throughput
  BINARY_CHUNK_SIZE_SMALL: 64 * 1024,          // 64KB for large files on mobile (increased)
  BINARY_CHUNK_SIZE_NORMAL: 256 * 1024,        // 256KB for normal files on mobile (increased)
  BINARY_BUFFER_THRESHOLD: 1024 * 1024,        // 1MB buffer for mobile (increased for speed)
  
  // PC senders (to mobile): Use Base64 - PC handles the heavy conversion work
  BASE64_CHUNK_SIZE: 64 * 1024,                // 64KB Base64 chunks
  BASE64_BUFFER_THRESHOLD: 256 * 1024,         // 256KB buffer for Base64
  
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
  FILE_ACK: 'FILE_ACK',                    // Acknowledgment that file was successfully received
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
  private acknowledgedFiles = new Set<number>(); // Track files confirmed received by peer
  
  // Receiver state - hybrid approach
  private receivedFiles = new Map<number, {
    metadata: FileMetadata;
    chunks: Map<number, string | ArrayBuffer>; // Support both types
    totalChunks: number;
    receivedChunks: Set<number>;
    bytesReceived: number; // Track actual bytes received
    startTime: number;
    complete: boolean;
    transferMethod: 'binary' | 'base64';
  }>();
  
  private expectedFiles: FileMetadata[] = [];
  private connectionTimeout: NodeJS.Timeout | null = null;
  
  // Binary channel handling
  private setWaitingForChunk?: (fileIndex: number, chunkIndex: number, chunkSize: number) => void;

  get currentRole(): 'sender' | 'receiver' | null {
    return this.role;
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
    
    // Detect if sender is mobile to choose transfer method
    this.senderIsMobile = isMobileDevice();
    // CORRECT: Binary for mobile senders (fast, no conversion), Base64 for PC senders (PC handles conversion)
    this.transferMethod = this.senderIsMobile ? 'binary' : 'base64';
    
    console.log(`📱 Device type: ${this.senderIsMobile ? 'Mobile' : 'PC'}, Transfer method: ${this.transferMethod}`);
    
    if (this.transferMethod === 'binary') {
      // Mobile sender: Use binary for speed (no slow conversion on mobile processor)
      const totalFileSize = files.reduce((sum, file) => sum + file.size, 0);
      const hasLargeFiles = files.some(file => file.size > CONFIG.LARGE_FILE_THRESHOLD);
      
      if (hasLargeFiles || totalFileSize > CONFIG.LARGE_FILE_THRESHOLD) {
        // Use smaller chunks for large files on mobile to manage memory
        this.chunkSize = CONFIG.BINARY_CHUNK_SIZE_SMALL;
        console.log('📱 Mobile with large files: Using small binary chunks (32KB) for memory efficiency');
      } else {
        this.chunkSize = CONFIG.BINARY_CHUNK_SIZE_NORMAL;
        console.log('📱 Mobile with small files: Using normal binary chunks (128KB)');
      }
      this.bufferThreshold = CONFIG.BINARY_BUFFER_THRESHOLD;
      console.log('📱 Mobile sender: Using BINARY transfer (fast, no conversion needed)');
    } else {
      // PC sender: Use Base64 (PC handles the heavy conversion work)
      this.chunkSize = CONFIG.BASE64_CHUNK_SIZE;
      this.bufferThreshold = CONFIG.BASE64_BUFFER_THRESHOLD;
      console.log('🖥️ PC sender: Using Base64 transfer (PC handles conversion)');
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
    console.log(`📥 Initializing as RECEIVER for room: ${roomCode}`);
    
    this.roomCode = roomCode;
    this.role = 'receiver';
    
    this.onStatusMessage?.('Connecting to sender...');
    
    console.log('📥 Creating peer connection for receiver...');
    await this.createPeerConnection();
    this.setupDataChannelReceivers();
    
    this.setConnectionTimeout();
    console.log('📥 Receiver initialization complete, waiting for sender...');
  }

  private async createPeerConnection(): Promise<void> {
    console.log('🔗 Creating WebRTC peer connection...');
    this.peerConnection = new RTCPeerConnection(this.config);
    
    this.peerConnection.onconnectionstatechange = () => {
      const state = this.peerConnection!.connectionState;
      console.log(`🔗 Connection state: ${state}`);
      this.onConnectionStateChange?.(state);
      
      if (state === 'connected') {
        this.clearConnectionTimeout();
        this.onStatusMessage?.('Connected! Preparing transfer...');
        console.log('✅ WebRTC connection established successfully');
      } else if (state === 'failed') {
        console.error('❌ WebRTC connection failed');
        this.onError?.('Connection failed. Please try again.');
        this.cleanup();
      } else if (state === 'disconnected') {
        console.warn('⚠️ WebRTC connection disconnected');
      }
    };
    
    this.peerConnection.oniceconnectionstatechange = () => {
      const iceState = this.peerConnection!.iceConnectionState;
      console.log(`🧊 ICE connection state: ${iceState}`);
    };
    
    this.peerConnection.onicegatheringstatechange = () => {
      const gatheringState = this.peerConnection!.iceGatheringState;
      console.log(`🧊 ICE gathering state: ${gatheringState}`);
    };
    
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('🧊 Sending ICE candidate');
        signalingService.sendSignal({
          type: 'ice',
          payload: event.candidate,
          toRoom: this.roomCode,
        });
      } else {
        console.log('🧊 ICE gathering complete');
      }
    };
    
    signalingService.onSignal(this.handleSignalingMessage.bind(this));
    console.log('🔗 Peer connection setup complete');
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
      // Create binary channel optimized for high throughput
      this.binaryChannel = this.peerConnection!.createDataChannel('binary', {
        ordered: true,
        maxRetransmits: 3,
        // Remove maxPacketLifeTime for better compatibility
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
        // Find the expected chunk that matches this data size
        let matchingChunk: { fileIndex: number; chunkIndex: number; chunkSize: number; timeout: NodeJS.Timeout } | null = null;
        
        for (const [key, expected] of expectedChunks) {
          if (expected.chunkSize === event.data.byteLength) {
            matchingChunk = expected;
            expectedChunks.delete(key);
            clearTimeout(expected.timeout);
            break;
          }
        }
        
        if (matchingChunk) {
          console.log(`📦 Received binary chunk ${matchingChunk.chunkIndex} for file ${matchingChunk.fileIndex} (${event.data.byteLength} bytes)`);
          this.handleBinaryChunk(matchingChunk.fileIndex, matchingChunk.chunkIndex, event.data);
        } else {
          console.error(`❌ Received unexpected binary data: ${event.data.byteLength} bytes, no matching expected chunk`);
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
    this.onStatusMessage?.('All files sent! Waiting for confirmation...');
    console.log('📤 All files sent, waiting for peer acknowledgments...');
    
    // Don't call onTransferComplete yet - wait for acknowledgments via checkTransferCompletion()
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
      
      // Optimized buffer management for speed
      while (this.binaryChannel!.bufferedAmount > CONFIG.BINARY_BUFFER_THRESHOLD) {
        // Shorter wait time for better throughput
        await new Promise(resolve => setTimeout(resolve, 10));
      }
      
      // Send control message first
      this.sendControlMessage({
        type: MSG_TYPE.FILE_CHUNK_BINARY,
        fileIndex,
        chunkIndex,
        chunkSize: arrayBuffer.byteLength,
      });
      
      // Minimal delay for control message - optimized for speed
      await new Promise(resolve => setTimeout(resolve, 2));
      
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
      
      // Minimal delay for speed optimization - only when buffer is getting full
      if (this.binaryChannel!.bufferedAmount > CONFIG.BINARY_BUFFER_THRESHOLD * 0.8) {
        await new Promise(resolve => setTimeout(resolve, 2)); // Very small delay only when needed
      }
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
    // More aggressive flow control for mobile devices
    const bufferLimit = this.senderIsMobile ? this.bufferThreshold * 0.5 : this.bufferThreshold;
    
    while (this.dataChannel && this.dataChannel.bufferedAmount > bufferLimit) {
      // Longer waits for mobile to prevent overwhelming the buffer
      const waitTime = this.senderIsMobile ? 25 : 10;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    // Add adaptive delay for large files on mobile
    if (this.senderIsMobile && this.filesToSend[fileIndex].size > CONFIG.LARGE_FILE_THRESHOLD) {
      const delayPerChunk = Math.min(50, chunkIndex * 2); // Progressive delay up to 50ms
      if (delayPerChunk > 10) {
        await new Promise(resolve => setTimeout(resolve, delayPerChunk));
      }
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
        const progressMessage = {
          type: MSG_TYPE.CONVERSION_PROGRESS,
          fileIndex,
          fileName: file.name,
          conversionProgress,
          stage: 'converting' as const,
        };
        
        try {
          this.dataChannel.send(JSON.stringify(progressMessage));
          console.log(`📤 ✅ Throttled conversion progress sent: ${conversionProgress}% for ${file.name}`);
        } catch (error) {
          console.error(`📤 ❌ Failed to send conversion progress:`, error);
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
    console.log(`📥 Processing control message:`, {
      type: message.type,
      fileIndex: message.fileIndex,
      fileName: message.fileName,
      role: this.role
    });
    
    switch (message.type) {
      case MSG_TYPE.FILE_LIST:
        this.handleFileList(message.files!, message.transferMethod);
        break;
        
      case MSG_TYPE.FILE_START:
        this.handleFileStart(message);
        break;
        
      case MSG_TYPE.FILE_CHUNK_BINARY:
        this.setWaitingForChunk?.(message.fileIndex!, message.chunkIndex!, message.chunkSize || 0);
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
        
      case MSG_TYPE.CONVERSION_PROGRESS:
        console.log(`📥 ✅ Received CONVERSION_PROGRESS message, calling handler...`);
        this.handleConversionProgress(message);
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
        
      default:
        console.warn(`⚠️ Unknown message type: ${message.type}`);
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
      bytesReceived: 0, // Initialize bytes received counter
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
    fileInfo.bytesReceived += data.byteLength; // Track actual bytes received
    
    console.log(`File ${fileIndex}: Received binary chunk ${chunkIndex}/${fileInfo.totalChunks - 1} (${data.byteLength} bytes) - Total: ${fileInfo.bytesReceived}/${fileInfo.metadata.size} bytes`);
    
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
    
    // Estimate bytes for Base64 (3/4 ratio)
    const estimatedBytes = Math.floor((data!.length * 3) / 4);
    fileInfo.bytesReceived += estimatedBytes;
    
    if (fileInfo.receivedChunks.size % 10 === 0 || fileInfo.receivedChunks.size === fileInfo.totalChunks) {
      console.log(`File ${fileIndex}: ${fileInfo.receivedChunks.size}/${fileInfo.totalChunks} Base64 chunks received - Total: ${fileInfo.bytesReceived}/${fileInfo.metadata.size} bytes`);
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

  private handleFileAck(message: ControlMessage): void {
    const { fileIndex, fileName } = message;
    
    console.log(`📨 Received FILE_ACK for file ${fileIndex}: ${fileName}`);
    
    // Track acknowledged files
    if (fileIndex !== undefined) {
      this.acknowledgedFiles.add(fileIndex);
      
      const file = this.filesToSend[fileIndex];
      if (file) {
        this.onTransferProgress?.({
          fileName: fileName || file.name,
          fileIndex,
          progress: 100,
          bytesTransferred: file.size,
          totalBytes: file.size,
          speed: 0,
          stage: 'transferring',
        });
        
        console.log(`✅ File ${fileIndex} (${fileName}) confirmed received by peer`);
      }
      
      // Check if all files have been acknowledged
      this.checkTransferCompletion();
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
      this.onTransferComplete?.();
      this.onStatusMessage?.('All files sent and confirmed received!');
    }
  }

  private updateReceiveProgress(fileIndex: number, fileInfo: {
    metadata: FileMetadata;
    chunks: Map<number, string | ArrayBuffer>;
    totalChunks: number;
    receivedChunks: Set<number>;
    bytesReceived: number;
    startTime: number;
    complete: boolean;
    transferMethod: 'binary' | 'base64';
  }): void {
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
    const { fileIndex, fileName } = message;
    
    const fileInfo = this.receivedFiles.get(fileIndex!);
    if (!fileInfo) {
      console.error(`FILE_COMPLETE for unknown file ${fileIndex}`);
      return;
    }
    
    console.log(`🔍 File completion check for ${fileName}:`);
    console.log(`  - Expected size: ${fileInfo.metadata.size} bytes`);
    console.log(`  - Received bytes: ${fileInfo.bytesReceived} bytes`);
    console.log(`  - Total chunks expected: ${fileInfo.totalChunks}`);
    console.log(`  - Chunks received: ${fileInfo.receivedChunks.size}`);
    console.log(`  - Transfer method: ${fileInfo.transferMethod}`);
    
    // Validate that all chunks are received
    const missingChunks: number[] = [];
    for (let i = 0; i < fileInfo.totalChunks; i++) {
      if (!fileInfo.receivedChunks.has(i)) {
        missingChunks.push(i);
      }
    }
    
    if (missingChunks.length > 0) {
      console.error(`❌ File incomplete: ${fileName} (missing ${missingChunks.length} chunks: ${missingChunks.slice(0, 10).join(', ')}${missingChunks.length > 10 ? '...' : ''})`);
      console.error(`  - Missing chunks represent ~${((missingChunks.length / fileInfo.totalChunks) * 100).toFixed(2)}% of the file`);
      
      // For large files, be more lenient with a few missing chunks at the end
      const fileSize = fileInfo.metadata.size;
      const isLargeFile = fileSize > CONFIG.LARGE_FILE_THRESHOLD;
      const missingPercentage = (missingChunks.length / fileInfo.totalChunks) * 100;
      
      if (isLargeFile && missingPercentage < 1) {
        console.warn(`⚠️ Large file ${fileName} missing ${missingPercentage.toFixed(2)}% chunks, attempting reconstruction anyway`);
        // Continue with reconstruction for large files with minimal missing chunks
      } else {
        console.error(`❌ Too many missing chunks (${missingPercentage.toFixed(2)}%), aborting reconstruction`);
        this.onError?.(`Transfer incomplete: ${fileName} (missing ${missingChunks.length} chunks)`);
        return;
      }
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
    console.log(`📡 Received signaling message: ${message.type}`);
    try {
      switch (message.type) {
        case 'offer':
          if (this.role === 'receiver') {
            console.log('📡 Processing offer from sender...');
            this.onStatusMessage?.('Sender found! Establishing connection...');
            await this.peerConnection!.setRemoteDescription(message.payload);
            const answer = await this.peerConnection!.createAnswer();
            await this.peerConnection!.setLocalDescription(answer);
            console.log('📡 Sending answer to sender...');
            signalingService.sendSignal({
              type: 'answer',
              payload: answer,
              toRoom: this.roomCode,
            });
          }
          break;
          
        case 'answer':
          if (this.role === 'sender') {
            console.log('📡 Processing answer from receiver...');
            this.onStatusMessage?.('Receiver connected! Establishing data channel...');
            await this.peerConnection!.setRemoteDescription(message.payload);
          }
          break;
          
        case 'ice':
          console.log('📡 Processing ICE candidate...');
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
    this.acknowledgedFiles.clear();
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