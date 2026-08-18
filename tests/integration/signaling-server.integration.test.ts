import { describe, expect, it } from 'vitest';
import { emitAndWait, once, startTestSignalingServer } from './helpers/signaling-server';

const room = (roomId: string, role?: string) => ({
  roomId,
  ...(role === undefined ? {} : { role }),
});
const emitCreate = <T>(socket: any, payload: unknown, event: string) => emitAndWait<T>(socket, 'create-room', payload, event);
const emitJoin = <T>(socket: any, payload: unknown, event: string) => emitAndWait<T>(socket, 'join-room', payload, event);

describe('signaling server integration', () => {
  it('creates a room and a second participant joins it', async () => {
    const server = await startTestSignalingServer();
    const sender = await server.connect();
    const receiver = await server.connect();
    await expect(emitCreate(sender, room('1234', 'sender'), 'turn-servers')).resolves.toMatchObject({ servers: expect.any(Array) });
    const ready = once(sender, 'room-ready');
    await expect(emitJoin(receiver, room('1234', 'receiver'), 'turn-servers')).resolves.toMatchObject({ servers: expect.any(Array) });
    await expect(ready).resolves.toMatchObject({ participants: expect.any(Array) });
    await server.close();
  });

  it('rejects joining a code that has no live room, with a generic error', async () => {
    const server = await startTestSignalingServer();
    const intruder = await server.connect();
    const response = emitJoin<{ message?: string }>(intruder, room('2233', 'receiver'), 'request-invalid');
    await expect(response).resolves.toMatchObject({ message: 'Invalid request payload' });
    await server.close();
  });

  it('rejects creating a room on a code that is already live', async () => {
    const server = await startTestSignalingServer();
    const owner = await server.connect();
    const squatter = await server.connect();
    await emitCreate(owner, room('3344', 'sender'), 'turn-servers');
    await expect(emitCreate<{ room: string }>(squatter, room('3344', 'sender'), 'room-code-taken')).resolves.toMatchObject({ room: '3344' });
    await server.close();
  });

  it('rejects a second receiver and a third peer', async () => {
    const server = await startTestSignalingServer();
    const sender = await server.connect();
    const receiver = await server.connect();
    const secondReceiver = await server.connect();
    const third = await server.connect();
    await emitCreate(sender, room('5566', 'sender'), 'turn-servers');
    await emitJoin(receiver, room('5566', 'receiver'), 'turn-servers');
    secondReceiver.emit('join-room', room('5566', 'receiver'));
    await expect(once(secondReceiver, 'request-invalid')).resolves.toMatchObject({ message: 'Invalid request payload' });
    third.emit('join-room', room('5566', 'sender'));
    await expect(once(third, 'room-full')).resolves.toMatchObject({ room: '5566' });
    await server.close();
  });

  it('rejects malformed, wrong-type, unknown-key, and non-numeric codes', async () => {
    const server = await startTestSignalingServer();
    const client = await server.connect();
    const malformed = [null, {}, { roomId: 123 }, { roomId: 'AB12', role: 'sender' }, { roomId: '1234', role: 'admin' }];
    for (const payload of malformed) {
      client.emit('join-room', payload);
      await expect(once(client, 'request-invalid')).resolves.toMatchObject({ event: 'join-room' });
    }
    await server.close();
  });

  it('shuts a room down after too many join attempts against it', async () => {
    const server = await startTestSignalingServer();
    const sender = await server.connect();
    await emitCreate(sender, room('7788', 'sender'), 'turn-servers');
    const roomState = server.rooms.get('7788') as { joinAttempts: number };
    roomState.joinAttempts = 12; // one below the cap
    const attacker = await server.connect();
    attacker.emit('join-room', room('7788', 'receiver'));
    await expect(once(sender, 'room-expired')).resolves.toBeDefined();
    await server.close();
  });

  it('enforces role authorization for sender-only and receiver-only actions', async () => {
    const server = await startTestSignalingServer();
    const sender = await server.connect();
    const receiver = await server.connect();
    await emitCreate(sender, room('9911', 'sender'), 'turn-servers');
    await emitJoin(receiver, room('9911', 'receiver'), 'turn-servers');
    receiver.emit('webrtc-offer', { roomId: '9911', offer: { type: 'offer', sdp: 'v=0' } });
    await expect(once(receiver, 'request-invalid')).resolves.toMatchObject({ event: 'webrtc-offer' });
    sender.emit('webrtc-answer', { roomId: '9911', answer: { type: 'answer', sdp: 'v=0' } });
    await expect(once(sender, 'request-invalid')).resolves.toMatchObject({ event: 'webrtc-answer' });
    await server.close();
  });

  it('rate-limits rapid repeated join attempts', async () => {
    const server = await startTestSignalingServer();
    const sender = await server.connect();
    await emitCreate(sender, room('1357', 'sender'), 'turn-servers');
    const client = await server.connect();
    const rateLimited = once<{ event: string }>(client, 'rate-limited');
    for (let i = 0; i < 8; i++) client.emit('join-room', room('1357', 'receiver'));
    await expect(rateLimited).resolves.toMatchObject({ event: 'join-room' });
    await server.close();
  });

  it('validates CORS origins during an HTTP preflight', async () => {
    const server = await startTestSignalingServer();
    const address = new URL(server.url);
    const allowed = await fetch(`${server.url}/socket.io/?EIO=4&transport=polling`, { headers: { Origin: 'http://localhost:3000' } });
    expect(allowed.headers.get('access-control-allow-origin')).toBe('http://localhost:3000');
    const denied = await fetch(`${server.url}/socket.io/?EIO=4&transport=polling`, { headers: { Origin: 'https://evil.example' } });
    expect(denied.headers.get('access-control-allow-origin')).toBeNull();
    expect(address.port).toBeTruthy();
    await server.close();
  });

  it('expires inactive paired rooms and handles reconnects without duplicating membership', async () => {
    const server = await startTestSignalingServer();
    const sender = await server.connect();
    const receiver = await server.connect();
    await emitCreate(sender, room('2468', 'sender'), 'turn-servers');
    await emitJoin(receiver, room('2468', 'receiver'), 'turn-servers');
    const roomState = server.rooms.get('2468') as { lastActivity: number };
    roomState.lastActivity = Date.now() - 60 * 60 * 1000 - 1;
    sender.disconnect();
    receiver.disconnect();
    await new Promise((resolve) => setTimeout(resolve, 30));
    expect(server.rooms.has('2468')).toBe(false);
    const reconnected = await server.connect();
    await expect(emitCreate(reconnected, room('2468', 'sender'), 'turn-servers')).resolves.toMatchObject({ servers: expect.any(Array) });
    await server.close();
  });
});
