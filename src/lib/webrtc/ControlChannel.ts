export class ControlChannel {
  constructor(readonly channel: RTCDataChannel) {}
  send(message: unknown): void { this.channel.send(JSON.stringify(message)); }
  static deserialize(data: string): unknown { return JSON.parse(data); }
  close(): void { this.channel.close(); }
}
