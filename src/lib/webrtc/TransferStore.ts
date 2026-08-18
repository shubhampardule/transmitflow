export class TransferStore {
  private readonly chunks = new Map<string, Uint8Array>();
  put(key: string, value: Uint8Array): void { this.chunks.set(key, value); }
  get(key: string): Uint8Array | undefined { return this.chunks.get(key); }
  delete(key: string): void { this.chunks.delete(key); }
  clear(): void { this.chunks.clear(); }
}
