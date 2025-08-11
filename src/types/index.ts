export interface FileMetadata {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  fileIndex: number;
}

export interface FileTransferProgress {
  fileIndex: number;
  fileName: string;
  progress: number;
  speed: number;
  bytesTransferred: number;
  totalBytes: number;
  cancelled?: boolean;
  cancelledBy?: 'sender' | 'receiver';
}

export interface PeerConnection {
  id: string;
  connected: boolean;
  role: 'sender' | 'receiver';
}

export interface TransferState {
  status: 'idle' | 'connecting' | 'transferring' | 'completed' | 'error' | 'cancelled';
  files: FileMetadata[];
  progress: FileTransferProgress[];
  error?: string;
  peer?: PeerConnection;
}

export interface SignalingMessage {
  type: 'offer' | 'answer' | 'ice' | 'file-meta' | 'file-chunk' | 'transfer-complete' | 'transfer-cancelled';
  payload?: any;
  toRoom?: string;
  fromPeer?: string;
  data?: any;
}

export interface DataChannelMessage {
  type: 'file-list' | 'file-meta' | 'transfer-complete' | 'transfer-cancelled' | 'file-cancelled' | 'progress-sync';
  data?: FileMetadata[] | FileMetadata | { cancelledBy: 'sender' | 'receiver' } | { fileIndex: number; fileName: string; cancelledBy: 'sender' | 'receiver' } | FileTransferProgress;
}

export type UserRole = 'sender' | 'receiver' | null;
