export class ChunkSender {
  constructor(readonly channel: RTCDataChannel) {}
  get bufferedAmount(): number { return this.channel.bufferedAmount; }
  send(chunk: ArrayBuffer | ArrayBufferView | Blob | string): void {
    if (typeof chunk === 'string') {
      this.channel.send(chunk);
      return;
    }

    if (chunk instanceof Blob) {
      this.channel.send(chunk);
      return;
    }

    if (chunk instanceof ArrayBuffer) {
      this.channel.send(chunk);
      return;
    }

    this.channel.send(chunk as ArrayBufferView<ArrayBuffer>);
  }
}
