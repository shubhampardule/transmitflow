import { FileMetadata, SignalingMessage, DataChannelMessage, FileTransferProgress } from '@/types';
import { signalingService } from './signaling';

export class WebRTCService {
  private peerConnection: RTCPeerConnection | null = null;
  private dataChannel: RTCDataChannel | null = null;
  private roomCode: string = '';
  private role: 'sender' | 'receiver' | null = null;
  
  // Configuration
  private readonly config: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
    ],
  };

  private readonly chunkSize = 64 * 1024; // 64KB chunks (original stable setting)
  private readonly maxBufferSize = 8 * 1024 * 1024; // 8MB max buffer (original stable setting)

  // Event handlers
  public onConnectionStateChange?: (state: RTCPeerConnectionState) => void;
  public onDataChannelOpen?: () => void;
  public onDataChannelClose?: () => void;
  public onFileReceived?: (file: File) => void;
  public onIncomingFiles?: (files: FileMetadata[]) => void; // New callback for incoming file list
  public onTransferProgress?: (progress: { 
    fileName: string; 
    fileIndex: number; // Add file index to progress
    progress: number; 
    bytesTransferred: number; 
    totalBytes: number;
    speed: number;
  }) => void;
  public onTransferComplete?: () => void;
  public onTransferCancelled?: (cancelledBy: 'sender' | 'receiver') => void;
  public onFileCancelled?: (data: { fileIndex: number; fileName: string; cancelledBy: 'sender' | 'receiver' }) => void;
  public onError?: (error: string) => void;

  // Transfer state
  private currentFiles: File[] = [];
  private receiveBuffers: ArrayBuffer[] = [];
  private currentFileIndex = 0;
  private currentFileMeta: FileMetadata | null = null;
  private transferStartTime = 0;
  private receivedBytes = 0;
  private lastProgressSync = 0; // Throttle progress sync messages
  private cancelledFileIndices = new Set<number>(); // Track cancelled files

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
    
    // Create offer
    const offer = await this.peerConnection!.createOffer();
    await this.peerConnection!.setLocalDescription(offer);
    
    signalingService.sendSignal({
      type: 'offer',
      payload: offer,
      toRoom: roomCode,
    });
  }

  async initializeAsReceiver(roomCode: string): Promise<void> {
    this.roomCode = roomCode;
    this.role = 'receiver';

    await this.createPeerConnection();
    this.setupDataChannelReceiver();
  }

  private async createPeerConnection(): Promise<void> {
    this.peerConnection = new RTCPeerConnection(this.config);

    this.peerConnection.onconnectionstatechange = () => {
      const state = this.peerConnection!.connectionState;
      console.log('Connection state changed:', state);
      console.log('ICE connection state:', this.peerConnection!.iceConnectionState);
      console.log('ICE gathering state:', this.peerConnection!.iceGatheringState);
      this.onConnectionStateChange?.(state);
      
      if (state === 'failed') {
        console.error('WebRTC connection failed');
        this.onError?.('WebRTC connection failed');
      }
    };

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('ICE candidate generated:', event.candidate.candidate);
        signalingService.sendSignal({
          type: 'ice',
          payload: event.candidate,
          toRoom: this.roomCode,
        });
      } else {
        console.log('ICE gathering completed');
      }
    };

    // Set up signaling message handler
    signalingService.onSignal(this.handleSignalingMessage.bind(this));
  }

  private createDataChannel(): void {
    console.log('Creating data channel...');
    this.dataChannel = this.peerConnection!.createDataChannel('file-transfer', {
      ordered: true,
      maxRetransmits: 0,
    });

    this.dataChannel.binaryType = 'arraybuffer';
    console.log('Data channel created with ID:', this.dataChannel.id);
    this.setupDataChannelHandlers();
  }

  private setupDataChannelReceiver(): void {
    this.peerConnection!.ondatachannel = (event) => {
      this.dataChannel = event.channel;
      this.dataChannel.binaryType = 'arraybuffer';
      this.setupDataChannelHandlers();
    };
  }

  private setupDataChannelHandlers(): void {
    if (!this.dataChannel) return;

    this.dataChannel.onopen = () => {
      console.log('Data channel opened');
      this.onDataChannelOpen?.();
      
      // Start file transfer if sender
      if (this.role === 'sender' && this.currentFiles.length > 0) {
        console.log('Data channel opened - starting file transfer as sender');
        console.log('Files to transfer:', this.currentFiles.length);
        this.startFileTransfer();
      } else {
        console.log('Data channel opened - role:', this.role, 'files:', this.currentFiles.length);
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
          await this.peerConnection!.addIceCandidate(message.payload);
          break;
      }
    } catch (error) {
      console.error('Error handling signaling message:', error);
      this.onError?.('Failed to process signaling message');
    }
  }

  private async startFileTransfer(): Promise<void> {
    console.log('startFileTransfer called');
    console.log('currentFiles:', this.currentFiles);
    if (this.currentFiles.length === 0) {
      console.log('No files to transfer');
      return;
    }

    // Send file list to receiver first
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
    
    console.log('Starting transfer of first file:', this.currentFiles[0].name);
    await this.sendFile(this.currentFiles[0]);
  }

  private async sendFile(file: File): Promise<void> {
    console.log('sendFile called for:', file.name, 'size:', file.size);
    
    // Check if this file has been cancelled
    if (this.cancelledFileIndices.has(this.currentFileIndex)) {
      console.log('Skipping cancelled file:', file.name, 'at index:', this.currentFileIndex);
      // Move to next file
      this.currentFileIndex++;
      if (this.currentFileIndex < this.currentFiles.length) {
        console.log('Moving to next file after cancelled one...');
        await this.sendFile(this.currentFiles[this.currentFileIndex]);
      } else {
        console.log('All files processed (some cancelled), sending completion signal');
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

    console.log('Sending file metadata:', metadata);
    // Send file metadata
    this.sendTextMessage({
      type: 'file-meta',
      data: metadata,
    });

    console.log('Reading file as ArrayBuffer...');
    // Send file data in chunks
    const arrayBuffer = await file.arrayBuffer();
    const totalChunks = Math.ceil(arrayBuffer.byteLength / this.chunkSize);
    
    console.log('File read successfully. Total chunks:', totalChunks);
    
    for (let i = 0; i < totalChunks; i++) {
      // Check if file was cancelled during transfer
      if (this.cancelledFileIndices.has(this.currentFileIndex)) {
        console.log('File was cancelled during transfer, stopping current file only:', file.name);
        // Just stop this file, don't try to move to next file automatically
        // Let the natural flow handle the next file
        return;
      }
      
      const start = i * this.chunkSize;
      const end = Math.min(start + this.chunkSize, arrayBuffer.byteLength);
      const chunk = arrayBuffer.slice(start, end);
      
      console.log(`Preparing chunk ${i + 1}/${totalChunks}, size: ${chunk.byteLength}`);
      console.log(`Current buffer amount: ${this.dataChannel!.bufferedAmount}`);
      
      // Wait for buffer to be available with timeout
      let attempts = 0;
      const maxAttempts = 1000; // 10 seconds timeout (original setting)
      while (this.dataChannel!.bufferedAmount > this.maxBufferSize && attempts < maxAttempts) {
        console.log(`Waiting for buffer to clear... (${this.dataChannel!.bufferedAmount}/${this.maxBufferSize})`);
        await new Promise(resolve => setTimeout(resolve, 10)); // Original 10ms timing
        attempts++;
      }
      
      if (attempts >= maxAttempts) {
        console.error('Buffer timeout - transfer may have failed');
        this.onError?.('Transfer timeout - data channel buffer full');
        return;
      }
      
      try {
        console.log(`Sending chunk ${i + 1}/${totalChunks}`);
        this.dataChannel!.send(chunk);
        console.log(`Chunk ${i + 1} sent successfully`);
        
        // Add small delay between chunks to prevent overwhelming
        if (i < totalChunks - 1) {
          await new Promise(resolve => setTimeout(resolve, 1)); // Back to original 1ms delay
        }
      } catch (error) {
        console.error(`Error sending chunk ${i + 1}:`, error);
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
      
      console.log(`Progress update - Progress: ${progress}%, Speed: ${speed} bytes/sec, Bytes: ${end}/${file.size}`);
      
      // Send progress to local callback
      this.onTransferProgress?.(progressData);
      
      // Send progress sync to receiver (throttled to every 500ms or at completion)
      const now = Date.now();
      if (now - this.lastProgressSync > 500 || progress >= 100) {
        this.sendTextMessage({
          type: 'progress-sync',
          data: progressData
        });
        this.lastProgressSync = now;
      }
    }

    console.log('File transfer completed for:', file.name);
    // Move to next file or complete transfer
    this.currentFileIndex++;
    if (this.currentFileIndex < this.currentFiles.length) {
      console.log('Moving to next file...');
      await this.sendFile(this.currentFiles[this.currentFileIndex]);
    } else {
      console.log('All files transferred, sending completion signal');
      this.sendTextMessage({ type: 'transfer-complete' });
      this.onTransferComplete?.();
    }
  }

  private handleTextMessage(message: DataChannelMessage): void {
    switch (message.type) {
      case 'file-list':
        const fileList = message.data as FileMetadata[];
        console.log('Received file list:', fileList);
        this.onIncomingFiles?.(fileList);
        break;

      case 'file-meta':
        this.currentFileMeta = message.data as FileMetadata;
        this.currentFileIndex = this.currentFileMeta.fileIndex; // Set the current file index from metadata
        this.receiveBuffers = [];
        this.receivedBytes = 0;
        
        // Set transfer start time for receiver when first file meta is received
        if (this.transferStartTime === 0) {
          this.transferStartTime = Date.now();
        }
        
        if (this.currentFileMeta) {
          console.log('Receiving file:', this.currentFileMeta.name, 'at index:', this.currentFileIndex);
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
        console.log('File cancelled:', fileCancelData);
        console.log('Received cancellation from:', fileCancelData.cancelledBy, 'My role is:', this.role);
        
        // Track the cancelled file
        this.cancelledFileIndices.add(fileCancelData.fileIndex);
        
        // If this is the current file being received, stop receiving it
        if (this.currentFileIndex === fileCancelData.fileIndex && this.currentFileMeta) {
          console.log('Stopping current file reception due to cancellation');
          this.currentFileMeta = null;
          this.receiveBuffers = [];
          this.receivedBytes = 0;
        }
        
        this.onFileCancelled?.(fileCancelData);
        break;

      case 'progress-sync':
        const progressData = message.data as FileTransferProgress;
        console.log('Received progress sync from sender:', progressData);
        this.onTransferProgress?.(progressData);
        break;
    }
  }

  private handleBinaryData(data: ArrayBuffer): void {
    if (!this.currentFileMeta) {
      console.log('Received binary data but no currentFileMeta - ignoring');
      return;
    }

    this.receiveBuffers.push(data);
    this.receivedBytes += data.byteLength;

    console.log(`Chunk received: ${this.receivedBytes}/${this.currentFileMeta.size} bytes (${Math.round(this.receivedBytes/this.currentFileMeta.size*100)}%)`);

    // Check if file is complete
    if (this.receivedBytes >= this.currentFileMeta.size) {
      console.log('=== FILE COMPLETE ===');
      console.log('File name:', this.currentFileMeta.name);
      console.log('File size:', this.currentFileMeta.size);
      console.log('Bytes received:', this.receivedBytes);
      console.log('Current file index:', this.currentFileIndex);
      console.log('Cancelled indices:', Array.from(this.cancelledFileIndices));
      
      const blob = new Blob(this.receiveBuffers, { type: this.currentFileMeta.type });
      console.log('Blob created - size:', blob.size);
      
      const file = new File([blob], this.currentFileMeta.name, {
        type: this.currentFileMeta.type,
        lastModified: this.currentFileMeta.lastModified,
      });
      console.log('File object created:', file.name, file.size);

      // ALWAYS call onFileReceived - ignore cancellation for now
      console.log('About to call onFileReceived...');
      if (this.onFileReceived) {
        this.onFileReceived(file);
        console.log('onFileReceived called successfully');
      } else {
        console.error('onFileReceived callback is null/undefined!');
      }
      
      // Reset for next file
      this.currentFileMeta = null;
      this.receiveBuffers = [];
      this.receivedBytes = 0;
    }
  }

  private sendTextMessage(message: DataChannelMessage): void {
    console.log('sendTextMessage called:', message.type);
    console.log('dataChannel state:', this.dataChannel?.readyState);
    if (this.dataChannel?.readyState === 'open') {
      console.log('Sending message via data channel:', message);
      this.dataChannel.send(JSON.stringify(message));
    } else {
      console.log('Data channel not open, cannot send message');
    }
  }

  private calculateSpeed(bytesTransferred: number): number {
    if (this.transferStartTime === 0 || bytesTransferred === 0) {
      return 0;
    }
    
    const elapsed = (Date.now() - this.transferStartTime) / 1000;
    const speed = elapsed > 0 ? bytesTransferred / elapsed : 0;
    
    // Return a valid number, avoid NaN or Infinity
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
    console.log('Cancelling file:', fileName, 'at index:', fileIndex);
    console.log('WebRTC service role when cancelling:', this.role);
    
    // Track cancelled file locally
    this.cancelledFileIndices.add(fileIndex);
    
    if (this.role) {
      console.log('Sending file cancellation message with role:', this.role);
      this.sendTextMessage({
        type: 'file-cancelled',
        data: { 
          fileIndex, 
          fileName, 
          cancelledBy: this.role 
        },
      });
    } else {
      console.log('No role set, cannot send cancellation message');
    }
  }

  cleanup(): void {
    if (this.dataChannel) {
      this.dataChannel.close();
      this.dataChannel = null;
    }

    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }

    signalingService.removeAllListeners();
    
    // Reset state
    this.currentFiles = [];
    this.receiveBuffers = [];
    this.currentFileIndex = 0;
    this.currentFileMeta = null;
    this.transferStartTime = 0;
    this.receivedBytes = 0;
    this.lastProgressSync = 0;
    this.cancelledFileIndices.clear(); // Clear cancelled files for new transfer
    this.role = null;
    this.roomCode = '';
  }
}

export const webrtcService = new WebRTCService();
