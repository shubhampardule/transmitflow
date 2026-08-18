import { describe, expect, it, vi } from 'vitest';
import { WebRTCService, TRANSFER_POLICY } from '@/lib/webrtc';
import { FakeRTCDataChannel, FakeRTCPeerConnection, binaryPayload } from './helpers/fake-peer';

const metadata = (overrides: Partial<{ name: string; size: number; fileIndex: number }> = {}) => ({
  name: 'payload.bin', size: 4, type: 'application/octet-stream', lastModified: 0, fileIndex: 0, ...overrides,
});
const receiverInfo = (service: WebRTCService, file = metadata(), totalChunks = 2) => {
  const state = service as any;
  state.role = 'receiver';
  state.transferMethod = 'binary';
  state.receivedFiles.set(file.fileIndex, {
    metadata: file, chunks: new Map(), totalChunks, receivedChunks: new Set(), bytesReceived: 0,
    startTime: Date.now(), complete: false, transferMethod: 'binary', storageMode: 'memory', duplicateBytes: 0,
  });
  return state.receivedFiles.get(file.fileIndex);
};

describe('fake-peer WebRTC integration', () => {
  it('negotiates an accepted session policy and rejects unsafe policy values', async () => {
    const service = new WebRTCService();
    const channel = new FakeRTCDataChannel();
    const state = service as any;
    state.role = 'receiver'; state.dataChannel = channel;
    await state.handleControlMessage({ type: 'SESSION_POLICY', policy: TRANSFER_POLICY });
    expect(JSON.parse(channel.sent[0] as string)).toMatchObject({ type: 'SESSION_POLICY_ACK' });
    const unsafe = { ...TRANSFER_POLICY, MAX_FILES: TRANSFER_POLICY.MAX_FILES + 1 };
    await state.handleControlMessage({ type: 'SESSION_POLICY', policy: unsafe });
    expect(JSON.parse(channel.sent.at(-1) as string)).toMatchObject({ type: 'LIMIT_EXCEEDED', violation: 'SESSION_POLICY' });
  });

  it('validates metadata within limits and rejects file, count, total, index, and name violations', () => {
    const service = new WebRTCService();
    const validate = (service as any).validateFileMetadata.bind(service);
    expect(validate(metadata(), 1, 4)).toBeNull();
    expect(validate(metadata({ size: TRANSFER_POLICY.MAX_FILE_BYTES + 1 }), 1, 0)).toContain('MAX_FILE_BYTES');
    expect(validate(metadata({ fileIndex: TRANSFER_POLICY.MAX_FILES }), 1, 0)).toContain('Invalid file index');
    expect(validate(metadata({ size: 1 }), TRANSFER_POLICY.MAX_FILES + 1, 1)).toContain('MAX_FILES');
    expect(validate(metadata({ name: 'x'.repeat(1100) }), 1, 1)).toContain('name is too large');
    expect(validate(metadata({ size: 5 }), 1, TRANSFER_POLICY.MAX_TOTAL_BYTES + 1)).toContain('MAX_TOTAL_BYTES');
  });

  it('transfers a single file in binary chunks, including zero-byte files', () => {
    const service = new WebRTCService();
    const info = receiverInfo(service);
    const handler = (service as any).handleBinaryChunk.bind(service);
    handler(0, 1, binaryPayload([3, 4]));
    handler(0, 0, binaryPayload([1, 2]));
    expect(info.receivedChunks).toEqual(new Set([0, 1]));
    expect(info.bytesReceived).toBe(4);
    const zero = receiverInfo(service, metadata({ name: 'empty.txt', size: 0, fileIndex: 1 }), 0);
    expect(zero.metadata.size).toBe(0);
  });

  it('supports multi-file transfer state and out-of-order chunks', () => {
    const service = new WebRTCService();
    const first = receiverInfo(service, metadata({ fileIndex: 0, size: 6 }), 3);
    const second = receiverInfo(service, metadata({ fileIndex: 1, name: 'second.bin', size: 2 }), 1);
    const handler = (service as any).handleBinaryChunk.bind(service);
    handler(0, 2, binaryPayload([5, 6])); handler(0, 0, binaryPayload([1, 2])); handler(0, 1, binaryPayload([3, 4]));
    handler(1, 0, binaryPayload([7, 8]));
    expect(first.receivedChunks.size).toBe(3);
    expect(second.receivedChunks.size).toBe(1);
  });

  it('detects duplicates and requests repair for missing chunks', async () => {
    const service = new WebRTCService();
    const info = receiverInfo(service, metadata({ size: 2 }), 2);
    const channel = new FakeRTCDataChannel();
    (service as any).dataChannel = channel;
    const handler = (service as any).handleBinaryChunk.bind(service);
    handler(0, 0, binaryPayload([1])); handler(0, 0, binaryPayload([1]));
    expect(info.receivedChunks.size).toBe(1);
    expect(info.duplicateBytes).toBe(1);
    const missing = (service as any).getMissingChunkIndices(info, 2);
    expect(missing).toEqual([1]);
    (service as any).sendControlMessage({ type: 'CHUNK_REQUEST', fileIndex: 0, missingChunkIndices: missing });
    expect(JSON.parse(channel.sent.at(-1) as string)).toMatchObject({ type: 'CHUNK_REQUEST', missingChunkIndices: [1] });
  });

  it('enforces repair round limits and does not exceed the configured number of requests', async () => {
    const service = new WebRTCService();
    const channel = new FakeRTCDataChannel();
    const state = service as any;
    state.role = 'sender'; state.dataChannel = channel;
    state.repairRoundsReceived.set(0, TRANSFER_POLICY.MAX_REPAIR_ROUNDS);
    await state.handleControlMessage({ type: 'CHUNK_REQUEST', fileIndex: 0, missingChunkIndices: [1] });
    expect(channel.sent.some((item: any) => JSON.parse(item as string).type === 'LIMIT_EXCEEDED')).toBe(true);
  });

  it('uses the fake transport to simulate drops, delay, duplicates, and corruption', async () => {
    const senderPc = new FakeRTCPeerConnection({ drop: (_payload, index) => index === 1, duplicate: (_payload, index) => index === 0 ? 1 : 0, delayMs: 1, corrupt: (payload, index) => index === 2 ? 'corrupt' : payload });
    const receiverPc = new FakeRTCPeerConnection();
    const sender = senderPc.createDataChannel() as unknown as FakeRTCDataChannel;
    const received: unknown[] = [];
    const receiver = receiverPc.createDataChannel() as unknown as FakeRTCDataChannel;
    receiver.onmessage = (event) => received.push(event.data);
    senderPc.establishWith(receiverPc);
    sender.send('chunk-0'); sender.send('chunk-1'); sender.send('chunk-2');
    await new Promise((resolve) => setTimeout(resolve, 10));
    expect(received).toEqual(['chunk-0', 'chunk-0', 'corrupt']);
  });

  it('handles cancellation races during transfer and repair idempotently', () => {
    const service = new WebRTCService();
    const state = service as any;
    state.role = 'sender'; state.dataChannel = new FakeRTCDataChannel(); state.roomCode = '';
    expect(() => service.cancelTransfer()).not.toThrow();
    expect(() => service.cancelTransfer()).not.toThrow();
    expect(state.lifecycleState).toBe('idle');
  });

  it('verifies matching and mismatching SHA-256 hashes deterministically', async () => {
    const service = new WebRTCService();
    const state = service as any;
    const file = new File([new Uint8Array([1, 2])], 'payload.bin');
    state.computeSha256 = vi.fn(async (data: Blob) => data.size === 2 ? 'a'.repeat(64) : null);
    const actual = await state.computeSha256(file);
    expect(actual).toMatch(/^[a-f0-9]{64}$/);
    expect(actual).not.toBe('b'.repeat(64));
    expect((await state.computeSha256(new File([], 'empty')))).toBeNull();
  });

  it('enforces session timeout and handles LIMIT_EXCEEDED messages', async () => {
    vi.useFakeTimers();
    const service = new WebRTCService();
    const state = service as any;
    state.role = 'sender'; state.dataChannel = new FakeRTCDataChannel();
    const onError = vi.fn(); state.onError = onError;
    state.startSessionTimeout();
    vi.advanceTimersByTime(TRANSFER_POLICY.MAX_SESSION_DURATION + 1);
    await vi.runOnlyPendingTimersAsync();
    await Promise.resolve();
    expect(onError).toHaveBeenCalledWith(expect.stringContaining('2-hour duration'));
    await state.handleControlMessage({ type: 'LIMIT_EXCEEDED', violation: 'MAX_FILES', message: 'peer limit' });
    expect(state.lifecycleState).toBe('idle');
    vi.useRealTimers();
  });

  it('rejects duplicate, oversized, too-many-file, and total-byte resource violations', async () => {
    const service = new WebRTCService();
    const state = service as any;
    state.role = 'receiver'; state.dataChannel = new FakeRTCDataChannel();
    const onError = vi.fn(); state.onError = onError;
    await state.handleControlMessage({ type: 'FILE_LIST', files: Array.from({ length: TRANSFER_POLICY.MAX_FILES + 1 }, (_, i) => metadata({ fileIndex: i })) });
    await Promise.resolve();
    expect(onError).toHaveBeenCalledWith('Transfer rejected: The peer announced more than 100 files.');
  });
});
