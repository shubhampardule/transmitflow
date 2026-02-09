interface StoredChunkRecord {
  sessionId: string;
  fileIndex: number;
  chunkIndex: number;
  data: Blob;
  byteLength: number;
}

interface FileChunksResult {
  chunks: Blob[];
  missingChunkIndices: number[];
  totalBytes: number;
}

const DB_NAME = 'transmitflow_chunk_store';
const DB_VERSION = 1;
const STORE_NAME = 'chunks';
const BY_SESSION_INDEX = 'by_session';
const BY_FILE_INDEX = 'by_file';

export class IndexedDbChunkStore {
  private dbPromise: Promise<IDBDatabase> | null = null;

  isSupported(): boolean {
    return typeof indexedDB !== 'undefined';
  }

  private async getDatabase(): Promise<IDBDatabase> {
    if (!this.isSupported()) {
      throw new Error('IndexedDB is not supported in this browser');
    }

    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
          const database = request.result;
          if (!database.objectStoreNames.contains(STORE_NAME)) {
            const store = database.createObjectStore(STORE_NAME, {
              keyPath: ['sessionId', 'fileIndex', 'chunkIndex'],
            });
            store.createIndex(BY_SESSION_INDEX, 'sessionId', { unique: false });
            store.createIndex(BY_FILE_INDEX, ['sessionId', 'fileIndex'], { unique: false });
          }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error ?? new Error('Failed to open IndexedDB'));
      });
    }

    return this.dbPromise;
  }

  private toBlob(data: Blob | ArrayBuffer | Uint8Array): Blob {
    if (data instanceof Blob) {
      return data;
    }
    if (data instanceof Uint8Array) {
      const copy = new Uint8Array(data.byteLength);
      copy.set(data);
      return new Blob([copy.buffer]);
    }
    return new Blob([data]);
  }

  async putChunk(
    sessionId: string,
    fileIndex: number,
    chunkIndex: number,
    data: Blob | ArrayBuffer | Uint8Array,
  ): Promise<number> {
    const database = await this.getDatabase();
    const blob = this.toBlob(data);
    const record: StoredChunkRecord = {
      sessionId,
      fileIndex,
      chunkIndex,
      data: blob,
      byteLength: blob.size,
    };

    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      store.put(record);

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error ?? new Error('Failed to store chunk'));
      transaction.onabort = () => reject(transaction.error ?? new Error('Chunk write aborted'));
    });

    return blob.size;
  }

  async getFileChunks(
    sessionId: string,
    fileIndex: number,
    expectedChunkCount: number,
  ): Promise<FileChunksResult> {
    const database = await this.getDatabase();

    const records = await new Promise<StoredChunkRecord[]>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index(BY_FILE_INDEX);
      const request = index.openCursor(IDBKeyRange.only([sessionId, fileIndex]));
      const result: StoredChunkRecord[] = [];

      request.onsuccess = () => {
        const cursor = request.result;
        if (!cursor) {
          resolve(result);
          return;
        }

        result.push(cursor.value as StoredChunkRecord);
        cursor.continue();
      };

      request.onerror = () => {
        reject(request.error ?? new Error('Failed to read chunks from IndexedDB'));
      };
    });

    const chunks: Blob[] = [];
    const missingChunkIndices: number[] = [];
    let expectedChunkIndex = 0;
    let totalBytes = 0;

    for (const record of records) {
      while (expectedChunkIndex < record.chunkIndex && expectedChunkIndex < expectedChunkCount) {
        missingChunkIndices.push(expectedChunkIndex);
        expectedChunkIndex++;
      }

      if (record.chunkIndex >= expectedChunkCount) {
        continue;
      }

      chunks.push(record.data);
      totalBytes += record.byteLength;
      expectedChunkIndex = record.chunkIndex + 1;
    }

    while (expectedChunkIndex < expectedChunkCount) {
      missingChunkIndices.push(expectedChunkIndex);
      expectedChunkIndex++;
    }

    return {
      chunks,
      missingChunkIndices,
      totalBytes,
    };
  }

  async clearFile(sessionId: string, fileIndex: number): Promise<void> {
    if (!this.isSupported()) return;
    const database = await this.getDatabase();

    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index(BY_FILE_INDEX);
      const request = index.openCursor(IDBKeyRange.only([sessionId, fileIndex]));

      request.onsuccess = () => {
        const cursor = request.result;
        if (!cursor) {
          return;
        }

        store.delete(cursor.primaryKey);
        cursor.continue();
      };

      request.onerror = () => reject(request.error ?? new Error('Failed to clear file chunks'));
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error ?? new Error('File chunk cleanup failed'));
      transaction.onabort = () => reject(transaction.error ?? new Error('File chunk cleanup aborted'));
    });
  }

  async clearSession(sessionId: string): Promise<void> {
    if (!this.isSupported()) return;
    const database = await this.getDatabase();

    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index(BY_SESSION_INDEX);
      const request = index.openCursor(IDBKeyRange.only(sessionId));

      request.onsuccess = () => {
        const cursor = request.result;
        if (!cursor) {
          return;
        }

        store.delete(cursor.primaryKey);
        cursor.continue();
      };

      request.onerror = () => reject(request.error ?? new Error('Failed to clear session chunks'));
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error ?? new Error('Session chunk cleanup failed'));
      transaction.onabort = () => reject(transaction.error ?? new Error('Session chunk cleanup aborted'));
    });
  }
}
