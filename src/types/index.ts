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
  stage: 'converting' | 'transferring';
  conversionProgress?: number;
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

export interface BaseSignalingMessage {
  toRoom?: string;
  fromPeer?: string;
}

export interface OfferMessage extends BaseSignalingMessage {
  type: 'offer';
  payload: RTCSessionDescriptionInit;
}

export interface AnswerMessage extends BaseSignalingMessage {
  type: 'answer';
  payload: RTCSessionDescriptionInit;
}

export interface IceMessage extends BaseSignalingMessage {
  type: 'ice';
  payload: RTCIceCandidateInit;
}

export interface FileMetaMessage extends BaseSignalingMessage {
  type: 'file-meta';
  data: FileMetadata;
}

export interface FileChunkMessage extends BaseSignalingMessage {
  type: 'file-chunk';
  data: ArrayBuffer;
}

export interface TransferCompleteMessage extends BaseSignalingMessage {
  type: 'transfer-complete';
}

export interface TransferCancelledMessage extends BaseSignalingMessage {
  type: 'transfer-cancelled';
}

export type SignalingMessage = 
  | OfferMessage 
  | AnswerMessage 
  | IceMessage 
  | FileMetaMessage 
  | FileChunkMessage 
  | TransferCompleteMessage 
  | TransferCancelledMessage;

export interface DataChannelMessage {
  type: 'file-list' | 'file-meta' | 'transfer-complete' | 'transfer-cancelled' | 'file-cancelled' | 'progress-sync' | 'file-complete';
  data?: FileMetadata[] | FileMetadata | { cancelledBy: 'sender' | 'receiver' } | { fileIndex: number; fileName: string; cancelledBy: 'sender' | 'receiver' } | FileTransferProgress | { fileIndex: number };
}

export type UserRole = 'sender' | 'receiver' | null;