export class ChunkReceiver {
  private readonly chunks = new Map<number, ArrayBuffer>();
  add(index: number, chunk: ArrayBuffer): boolean { if (this.chunks.has(index)) return false; this.chunks.set(index, chunk); return true; }
  get size(): number { return this.chunks.size; }
  get(index: number): ArrayBuffer | undefined { return this.chunks.get(index); }
}
