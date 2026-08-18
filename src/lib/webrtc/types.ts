/** Shared WebRTC transfer contracts and protocol primitives. */
export type TransferRole = 'sender' | 'receiver';
export type TransferMethod = 'binary' | 'base64';
export type ReceiveStorageMode = 'memory' | 'indexeddb';
export type NetworkType = 'wifi' | 'cellular' | 'ethernet' | 'unknown';
export type TransferLifecycleState = 'idle' | 'initializing' | 'connecting' | 'negotiating' | 'transferring' | 'completed' | 'cancelled' | 'failed';
export interface TransferPolicy { maxFileSize: number; maxTotalSize: number; maxFileCount: number; preferredChunkSize: number; allowBinary: boolean; allowBase64: boolean; }
export interface FileMetadata { name: string; size: number; type: string; lastModified?: number; totalChunks?: number; hash?: string; }
export interface ReceivedFileInfo extends FileMetadata { chunks: Map<number, Uint8Array>; receivedChunks: number; expectedChunks: number; }
export interface ChunkRequest { fileIndex: number; chunkIndices: number[]; round?: number; }
export const DEFAULT_CHUNK_SIZE = 16 * 1024;
export const MAX_REPAIR_ROUNDS = 3;
export const SHA256_ALGORITHM = 'SHA-256';
export type ControlMessage = Record<string, unknown> & { type: string };
export type SignalingMessage = Record<string, unknown> & { type: string };
