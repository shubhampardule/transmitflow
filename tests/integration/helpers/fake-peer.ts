export type DeliveryOptions = {
  drop?: (payload: unknown, index: number) => boolean;
  duplicate?: (payload: unknown, index: number) => number;
  corrupt?: (payload: unknown, index: number) => unknown;
  delayMs?: number;
};

export class FakeRTCDataChannel {
  readyState: RTCDataChannelState = 'open';
  bufferedAmount = 0;
  binaryType = 'arraybuffer';
  onopen: (() => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: ((event: Event) => void) | null = null;
  onmessage: ((event: MessageEvent) => void) | null = null;
  sent: unknown[] = [];
  peer: FakeRTCDataChannel | null = null;
  options: DeliveryOptions = {};
  private sendIndex = 0;

  send(payload: unknown) {
    if (this.readyState !== 'open') throw new Error('Data channel is not open');
    const index = this.sendIndex++;
    this.sent.push(payload);
    if (this.options.drop?.(payload, index)) return;
    const transformed = this.options.corrupt ? this.options.corrupt(payload, index) : payload;
    const copies = 1 + (this.options.duplicate?.(payload, index) ?? 0);
    for (let copy = 0; copy < copies; copy++) {
      const deliver = () => this.peer?.onmessage?.({ data: transformed } as MessageEvent);
      if ((this.options.delayMs ?? 0) > 0) setTimeout(deliver, this.options.delayMs);
      else queueMicrotask(deliver);
    }
  }

  close() {
    if (this.readyState === 'closed') return;
    this.readyState = 'closed';
    this.onclose?.();
  }
}

export class FakeRTCPeerConnection {
  connectionState: RTCPeerConnectionState = 'new';
  iceConnectionState: RTCIceConnectionState = 'new';
  signalingState: RTCSignalingState = 'stable';
  localDescription: RTCSessionDescriptionInit | null = null;
  remoteDescription: RTCSessionDescriptionInit | null = null;
  onicecandidate: ((event: RTCPeerConnectionIceEvent) => void) | null = null;
  onconnectionstatechange: (() => void) | null = null;
  oniceconnectionstatechange: (() => void) | null = null;
  ondatachannel: ((event: RTCDataChannelEvent) => void) | null = null;
  readonly channels: FakeRTCDataChannel[] = [];
  readonly options: DeliveryOptions;

  constructor(options: DeliveryOptions = {}) { this.options = options; }
  createDataChannel() {
    const channel = new FakeRTCDataChannel();
    channel.options = this.options;
    this.channels.push(channel);
    return channel as unknown as RTCDataChannel;
  }
  async createOffer() { return { type: 'offer' as const, sdp: 'fake-offer' }; }
  async createAnswer() { return { type: 'answer' as const, sdp: 'fake-answer' }; }
  async setLocalDescription(description: RTCSessionDescriptionInit) { this.localDescription = description; }
  async setRemoteDescription(description: RTCSessionDescriptionInit) { this.remoteDescription = description; }
  async addIceCandidate() { return undefined; }
  close() { this.connectionState = 'closed'; this.onconnectionstatechange?.(); }
  establishWith(peer: FakeRTCPeerConnection) {
    const local = this.channels[0] ?? (this.createDataChannel() as unknown as FakeRTCDataChannel);
    const remote = peer.channels[0] ?? (peer.createDataChannel() as unknown as FakeRTCDataChannel);
    local.peer = remote;
    remote.peer = local;
    peer.ondatachannel?.({ channel: remote as unknown as RTCDataChannel } as RTCDataChannelEvent);
    this.connectionState = peer.connectionState = 'connected';
    this.iceConnectionState = peer.iceConnectionState = 'connected';
    this.onconnectionstatechange?.();
    peer.onconnectionstatechange?.();
    local.onopen?.();
    remote.onopen?.();
  }
}

export function binaryPayload(bytes: number[]) {
  return new Uint8Array(bytes).buffer;
}
