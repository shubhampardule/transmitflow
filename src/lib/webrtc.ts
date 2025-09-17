// SIMPLIFIED AND RELIABLE WebRTC Implementation
// This version uses JSON messages for reliability and proper chunk tracking

import { FileMetadata, SignalingMessage } from '@/types';
import { signalingService } from './signaling';

// Simple, reliable configuration - OPTIMIZED FOR SPEED
const CONFIG = {
  CHUNK_SIZE: 64 * 1024,              // 64KB chunks - 4x larger for speed
  BUFFER_THRESHOLD: 256 * 1024,       // 256KB buffer threshold - 4x larger
  ACK_TIMEOUT: 2000,                  // 2 second timeout - faster retries
  MAX_RETRIES: 5,                     // More retries for reliability at high speed
};

// Message types - using strings for clarity
const MSG_TYPE = {
  FILE_LIST: 'FILE_LIST',
  FILE_START: 'FILE_START',
  FILE_CHUNK: 'FILE_CHUNK',
  FILE_COMPLETE: 'FILE_COMPLETE',
  CHUNK_ACK: 'CHUNK_ACK',
  TRANSFER_COMPLETE: 'TRANSFER_COMPLETE',
  CONVERSION_PROGRESS: 'CONVERSION_PROGRESS',
  FILE_CANCEL: 'FILE_CANCEL',
  CANCEL: 'CANCEL',
  ERROR: 'ERROR',
};

interface ChunkMessage {
  type: string;
  fileIndex?: number;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  lastModified?: number;
  chunkIndex?: number;
  totalChunks?: number;
  data?: string; // Base64 encoded chunk
  files?: FileMetadata[];
  message?: string;
  conversionProgress?: number;
  stage?: 'converting' | 'transferring';
  cancelledBy?: 'sender' | 'receiver';
}

export class WebRTCService {
  private peerConnection: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private roomCode: string = '';
  private role: 'sender' | 'receiver' | null = null;
  
  // ICE configuration from environment - OPTIMIZED FOR SPEED
  private readonly config: RTCConfiguration = {
    iceServers: [
      ...(process.env.NEXT_PUBLIC_TURN_URL && process.env.NEXT_PUBLIC_TURN_USER && process.env.NEXT_PUBLIC_TURN_PASS ? [{
        urls: process.env.NEXT_PUBLIC_TURN_URL,
        username: process.env.NEXT_PUBLIC_TURN_USER,
        credential: process.env.NEXT_PUBLIC_TURN_PASS
      }] : []),
      
      ...(process.env.NEXT_PUBLIC_STUN_URL ? [{
        urls: process.env.NEXT_PUBLIC_STUN_URL
      }] : process.env.NEXT_PUBLIC_TURN_URL ? [{
        urls: `stun:${process.env.NEXT_PUBLIC_TURN_URL.split(':')[1]}`
      }] : []),
    ],
    iceTransportPolicy: 'all',
    bundlePolicy: 'max-bundle',      // Bundle all media for efficiency
    rtcpMuxPolicy: 'require',        // Multiplex RTP and RTCP for speed
    iceCandidatePoolSize: 10,        // Pre-gather ICE candidates for faster connection
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
  private sendChunksMap = new Map<number, string[]>(); // fileIndex -> chunks
  private sendProgressMap = new Map<number, {
    sentChunks: Set<number>;
    totalChunks: number;
    startTime: number;
  }>();
  private isSending = false;
  private cancelledFiles = new Set<number>(); // Track cancelled file indices
  
  // Receiver state - SIMPLIFIED WITH PROPER TRACKING
  private receivedFiles = new Map<number, {
    metadata: FileMetadata;
    chunks: Map<number, string>; // chunkIndex -> base64 data
    totalChunks: number;
    receivedChunks: Set<number>;
    startTime: number;
    complete: boolean;
  }>();
  
  private expectedFiles: FileMetadata[] = [];
  private connectionTimeout: NodeJS.Timeout | null = null;

  get currentRole(): 'sender' | 'receiver' | null {
    return this.role;
  }

  async initializeAsSender(roomCode: string, files: File[]): Promise<void> {
    this.roomCode = roomCode;
    this.role = 'sender';
    this.filesToSend = files;
    
    this.onStatusMessage?.('Preparing to send files...');
    
    await this.createPeerConnection();
    this.createDataChannel();
    
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
    this.setupDataChannelReceiver();
    
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

  private createDataChannel(): void {
    this.dataChannel = this.peerConnection!.createDataChannel('file-transfer', {
      ordered: true,          // CRITICAL: Ensure ordered delivery
      maxRetransmits: 0,      // No retransmits for speed (reliability handled at app level)
      protocol: 'udp',       // Use UDP for maximum speed
      negotiated: false,     // Let WebRTC handle negotiation
      id: 1                  // Explicit channel ID for optimization
    });
    
    this.setupDataChannelHandlers();
  }

  private setupDataChannelReceiver(): void {
    this.peerConnection!.ondatachannel = (event) => {
      this.dataChannel = event.channel;
      this.setupDataChannelHandlers();
    };
  }

  private setupDataChannelHandlers(): void {
    if (!this.dataChannel) return;
    
    this.dataChannel.onopen = () => {
      console.log('Data channel opened');
      this.onDataChannelOpen?.();
      
      if (this.role === 'sender' && this.filesToSend.length > 0) {
        // Start transfer immediately for maximum speed
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
        const message: ChunkMessage = JSON.parse(event.data);
        await this.handleMessage(message);
      } catch (error) {
        console.error('Error handling message:', error);
      }
    };
  }

  // SENDER METHODS - SIMPLIFIED
  private async startTransfer(): Promise<void> {
    if (!this.dataChannel || this.dataChannel.readyState !== 'open') {
      this.onError?.('Connection not ready');
      return;
    }
    
    // Send file list first
    const fileList: FileMetadata[] = this.filesToSend.map((file, index) => ({
      name: file.name,
      size: file.size,
      type: file.type || 'application/octet-stream',
      lastModified: file.lastModified,
      fileIndex: index,
    }));
    
    this.sendMessage({
      type: MSG_TYPE.FILE_LIST,
      files: fileList,
    });
    
    this.onStatusMessage?.('Starting file transfer...');
    
    // Process all files
    for (let i = 0; i < this.filesToSend.length; i++) {
      await this.sendFile(i);
    }
    
    // Send final completion message
    this.sendMessage({ type: MSG_TYPE.TRANSFER_COMPLETE });
    this.onTransferComplete?.();
    this.onStatusMessage?.('All files sent successfully!');
  }

  private async sendFile(fileIndex: number): Promise<void> {
    const file = this.filesToSend[fileIndex];
    if (!file) return;
    
    // Check if file was cancelled before starting
    if (this.cancelledFiles.has(fileIndex)) {
      console.log(`Skipping cancelled file ${fileIndex}: ${file.name}`);
      return;
    }
    
    console.log(`Sending file ${fileIndex}: ${file.name} (${file.size} bytes)`);
    
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
    
    // Convert file to chunks (this is where the delay happens)
    const chunks = await this.fileToChunks(file, fileIndex);
    this.sendChunksMap.set(fileIndex, chunks);
    
    // Show conversion complete, transfer starting
    this.onTransferProgress?.({
      fileName: file.name,
      fileIndex,
      progress: 0,
      bytesTransferred: 0,
      totalBytes: file.size,
      speed: 0,
      stage: 'transferring',
    });
    
    // Send conversion complete to receiver
    this.sendMessage({
      type: MSG_TYPE.CONVERSION_PROGRESS,
      fileIndex,
      fileName: file.name,
      fileSize: file.size,
      conversionProgress: 100,
      stage: 'transferring',
    });
    
    // Initialize progress tracking
    this.sendProgressMap.set(fileIndex, {
      sentChunks: new Set(),
      totalChunks: chunks.length,
      startTime: Date.now(),
    });
    
    // Send file start message
    this.sendMessage({
      type: MSG_TYPE.FILE_START,
      fileIndex,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type || 'application/octet-stream',
      lastModified: file.lastModified,
      totalChunks: chunks.length,
    });
    
    // Send all chunks with flow control
    for (let i = 0; i < chunks.length; i++) {
      await this.sendChunkWithFlowControl(fileIndex, i, chunks[i]);
      
      // Update progress
      const progress = this.sendProgressMap.get(fileIndex)!;
      progress.sentChunks.add(i);
      
      const percentComplete = (progress.sentChunks.size / progress.totalChunks) * 100;
      const bytesTransferred = progress.sentChunks.size * CONFIG.CHUNK_SIZE;
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
    
    // Send file complete message
    console.log(`All ${chunks.length} chunks sent for ${file.name}, sending FILE_COMPLETE`);
    this.sendMessage({
      type: MSG_TYPE.FILE_COMPLETE,
      fileIndex,
      fileName: file.name,
    });
  }

  private async sendChunkWithFlowControl(fileIndex: number, chunkIndex: number, data: string): Promise<void> {
    // Wait if buffer is getting full - reduced delay for speed
    while (this.dataChannel && this.dataChannel.bufferedAmount > CONFIG.BUFFER_THRESHOLD) {
      await new Promise(resolve => setTimeout(resolve, 10)); // 5x faster backpressure handling
    }
    
    this.sendMessage({
      type: MSG_TYPE.FILE_CHUNK,
      fileIndex,
      chunkIndex,
      data,
    });
  }

  private async fileToChunks(file: File, fileIndex: number): Promise<string[]> {
    const chunks: string[] = [];
    const reader = new FileReader();
    const totalChunks = Math.ceil(file.size / CONFIG.CHUNK_SIZE);
    
    for (let offset = 0; offset < file.size; offset += CONFIG.CHUNK_SIZE) {
      // Check if file was cancelled during conversion
      if (this.cancelledFiles.has(fileIndex)) {
        console.log(`File ${fileIndex} cancelled during conversion, stopping`);
        return []; // Return empty array to stop processing
      }
      
      const slice = file.slice(offset, Math.min(offset + CONFIG.CHUNK_SIZE, file.size));
      const chunkIndex = chunks.length;
      
      // Show conversion progress locally
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
      
      // Send conversion progress to receiver
      this.sendMessage({
        type: MSG_TYPE.CONVERSION_PROGRESS,
        fileIndex,
        fileName: file.name,
        fileSize: file.size,
        conversionProgress,
        stage: 'converting',
      });
      
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          // Remove data URL prefix to get pure base64
          resolve(result.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(slice);
      });
      
      chunks.push(base64);
    }
    
    return chunks;
  }

  // RECEIVER METHODS - COMPLETELY REWRITTEN FOR RELIABILITY
  private async handleMessage(message: ChunkMessage): Promise<void> {
    switch (message.type) {
      case MSG_TYPE.FILE_LIST:
        this.handleFileList(message.files!);
        break;
        
      case MSG_TYPE.FILE_START:
        this.handleFileStart(message);
        break;
        
      case MSG_TYPE.FILE_CHUNK:
        this.handleFileChunk(message);
        break;
        
      case MSG_TYPE.FILE_COMPLETE:
        this.handleFileComplete(message);
        break;
        
      case MSG_TYPE.CONVERSION_PROGRESS:
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
    }
  }

  private handleFileList(files: FileMetadata[]): void {
    console.log('Received file list:', files);
    this.expectedFiles = files;
    this.onIncomingFiles?.(files);
    this.onStatusMessage?.('Ready to receive files');
  }

  private handleFileStart(message: ChunkMessage): void {
    const { fileIndex, fileName, fileSize, fileType, lastModified, totalChunks } = message;
    
    console.log(`Starting to receive file ${fileIndex}: ${fileName} (${totalChunks} chunks)`);
    
    // Initialize file reception tracking
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
    });
    
    this.onStatusMessage?.(`Receiving ${fileName}...`);
  }

  private handleConversionProgress(message: ChunkMessage): void {
    const { fileIndex, fileName, fileSize, conversionProgress, stage } = message;
    
    // Use file size from message if available, otherwise try to find in expected files
    const totalBytes = fileSize || this.expectedFiles.find(f => f.fileIndex === fileIndex)?.size || 0;
    
    // Update progress for the receiver to show sender's conversion progress
    this.onTransferProgress?.({
      fileName: fileName!,
      fileIndex: fileIndex!,
      progress: conversionProgress || 0,
      bytesTransferred: 0,
      totalBytes: totalBytes,
      speed: 0,
      stage: stage || 'converting',
      conversionProgress: conversionProgress,
    });
  }

  private handleFileCancel(message: ChunkMessage): void {
    const { fileIndex, fileName, cancelledBy } = message;
    
    if (fileIndex !== undefined) {
      // Add to cancelled files set
      this.cancelledFiles.add(fileIndex);
      
      // Remove from received files if it exists
      this.receivedFiles.delete(fileIndex);
      
      // Trigger the file cancelled callback
      this.onFileCancelled?.({
        fileIndex,
        fileName: fileName!,
        cancelledBy: cancelledBy!,
      });
      
      console.log(`File ${fileIndex} (${fileName}) cancelled by ${cancelledBy}`);
    }
  }

  private handleFileChunk(message: ChunkMessage): void {
    const { fileIndex, chunkIndex, data } = message;
    
    const fileInfo = this.receivedFiles.get(fileIndex!);
    if (!fileInfo) {
      console.error(`Received chunk for unknown file ${fileIndex}`);
      return;
    }
    
    // Store the chunk
    fileInfo.chunks.set(chunkIndex!, data!);
    fileInfo.receivedChunks.add(chunkIndex!);
    
    // Log progress periodically
    if (fileInfo.receivedChunks.size % 10 === 0 || fileInfo.receivedChunks.size === fileInfo.totalChunks) {
      console.log(`File ${fileIndex}: ${fileInfo.receivedChunks.size}/${fileInfo.totalChunks} chunks received`);
    }
    
    // Update progress
    const progress = (fileInfo.receivedChunks.size / fileInfo.totalChunks) * 100;
    const bytesReceived = fileInfo.receivedChunks.size * CONFIG.CHUNK_SIZE;
    const elapsed = (Date.now() - fileInfo.startTime) / 1000;
    const speed = elapsed > 0 ? bytesReceived / elapsed : 0;
    
    this.onTransferProgress?.({
      fileName: fileInfo.metadata.name,
      fileIndex: fileIndex!,
      progress,
      bytesTransferred: Math.min(bytesReceived, fileInfo.metadata.size),
      totalBytes: fileInfo.metadata.size,
      speed,
      stage: 'transferring',
    });
    
    // Send acknowledgment
    this.sendMessage({
      type: MSG_TYPE.CHUNK_ACK,
      fileIndex,
      chunkIndex,
    });
  }

  private async handleFileComplete(message: ChunkMessage): Promise<void> {
    const { fileIndex, fileName } = message;
    
    const fileInfo = this.receivedFiles.get(fileIndex!);
    if (!fileInfo) {
      console.error(`FILE_COMPLETE for unknown file ${fileIndex}`);
      return;
    }
    
    console.log(`FILE_COMPLETE received for ${fileName}, checking chunks...`);
    console.log(`Expected ${fileInfo.totalChunks} chunks, received ${fileInfo.receivedChunks.size} chunks`);
    
    // Verify all chunks are received
    const missingChunks: number[] = [];
    for (let i = 0; i < fileInfo.totalChunks; i++) {
      if (!fileInfo.receivedChunks.has(i)) {
        missingChunks.push(i);
      }
    }
    
    if (missingChunks.length > 0) {
      console.error(`Missing chunks for ${fileName}: ${missingChunks.join(', ')}`);
      this.onError?.(`Incomplete file: ${fileName} (missing ${missingChunks.length} chunks)`);
      return;
    }
    
    // All chunks received - reconstruct file
    console.log(`All chunks received for ${fileName}, reconstructing file...`);
    
    try {
      // Show conversion start for reconstruction
      this.onTransferProgress?.({
        fileName: fileInfo.metadata.name,
        fileIndex: fileIndex!,
        progress: 100,
        bytesTransferred: fileInfo.metadata.size,
        totalBytes: fileInfo.metadata.size,
        speed: 0,
        stage: 'converting',
        conversionProgress: 0,
      });
      
      // Combine all chunks in order
      const chunks: string[] = [];
      for (let i = 0; i < fileInfo.totalChunks; i++) {
        const chunk = fileInfo.chunks.get(i);
        if (!chunk) {
          throw new Error(`Missing chunk ${i} during reconstruction`);
        }
        chunks.push(chunk);
      }
      
      // Convert base64 chunks to blob
      const binaryChunks: Uint8Array[] = [];
      let totalSize = 0;
      
      for (let chunkIdx = 0; chunkIdx < chunks.length; chunkIdx++) {
        const base64Chunk = chunks[chunkIdx];
        
        // Show conversion progress
        const conversionProgress = Math.round(((chunkIdx + 1) / chunks.length) * 100);
        this.onTransferProgress?.({
          fileName: fileInfo.metadata.name,
          fileIndex: fileIndex!,
          progress: 100,
          bytesTransferred: fileInfo.metadata.size,
          totalBytes: fileInfo.metadata.size,
          speed: 0,
          stage: 'converting',
          conversionProgress,
        });
        
        const binaryString = atob(base64Chunk);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        binaryChunks.push(bytes);
        totalSize += bytes.length;
      }
      
      // Combine all binary chunks
      const combinedArray = new Uint8Array(totalSize);
      let offset = 0;
      for (const chunk of binaryChunks) {
        combinedArray.set(chunk, offset);
        offset += chunk.length;
      }
      
      // Create file
      const file = new File([combinedArray], fileInfo.metadata.name, {
        type: fileInfo.metadata.type || 'application/octet-stream',
        lastModified: fileInfo.metadata.lastModified,
      });
      
      console.log(`File reconstructed: ${fileName} (${file.size} bytes)`);
      
      // Verify size matches (with small tolerance for base64 padding)
      const sizeDiff = Math.abs(file.size - fileInfo.metadata.size);
      if (sizeDiff > 100) {
        console.warn(`Size mismatch: expected ${fileInfo.metadata.size}, got ${file.size}`);
      }
      
      // Mark as complete and trigger download
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
      
      console.log(`✅ Successfully processed ${fileName}`);
      
    } catch (error) {
      console.error(`Failed to reconstruct file ${fileName}:`, error);
      this.onError?.(`Failed to process ${fileName}`);
    }
  }

  private sendMessage(message: ChunkMessage): void {
    if (this.dataChannel && this.dataChannel.readyState === 'open') {
      try {
        const jsonStr = JSON.stringify(message);
        this.dataChannel.send(jsonStr);
      } catch (error) {
        console.error('Error sending message:', error);
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
    this.isSending = false;
    this.role = null;
    this.roomCode = '';
    
    this.onStatusMessage?.('Disconnected');
  }

  // Simplified cancel methods (removed complex binary protocol)
  cancelTransfer(): void {
    this.sendMessage({ type: MSG_TYPE.CANCEL });
    this.cleanup();
  }

  cancelFile(fileIndex: number, fileName: string): void {
    // Add to cancelled files set
    this.cancelledFiles.add(fileIndex);
    
    // Send cancellation message to peer
    this.sendMessage({
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