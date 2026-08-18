import { io as createClient, type Socket } from 'socket.io-client';
import { afterEach } from 'vitest';

const serverModule = require('../../../signaling-server.js') as {
  server: import('http').Server;
  rooms: Map<string, unknown>;
  startSignalingServer: (port?: number) => Promise<import('http').Server>;
  resetAbuseCounters: () => void;
};

export type TestClient = Socket;

export async function startTestSignalingServer() {
  const server = serverModule.server;
  if (!server.listening) await serverModule.startSignalingServer(0);
  serverModule.resetAbuseCounters();
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Test server did not expose a TCP address');
  const url = `http://127.0.0.1:${address.port}`;
  const clients: Socket[] = [];

  const connect = async (origin = 'http://localhost:3000') => {
    const socket = createClient(url, {
      transports: ['websocket'],
      forceNew: true,
      reconnection: false,
      extraHeaders: { origin },
    });
    clients.push(socket);
    await new Promise<void>((resolve, reject) => {
      socket.once('connect', () => resolve());
      socket.once('connect_error', reject);
    });
    return socket;
  };

  const close = async () => {
    for (const client of clients) client.disconnect();
    serverModule.rooms.clear();
    serverModule.resetAbuseCounters();
    await new Promise((resolve) => setTimeout(resolve, 10));
    if (server.listening) {
      const io = (serverModule as any).io;
      io?.sockets?.sockets?.forEach((socket: any) => socket.disconnect(true));
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  };

  return { url, connect, close, rooms: serverModule.rooms };
}

export function once<T>(socket: Socket, event: string, timeoutMs = 800): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Timed out waiting for ${event}`)), timeoutMs);
    socket.once(event, (payload: T) => {
      clearTimeout(timer);
      resolve(payload);
    });
  });
}

export function emitAndWait<T>(socket: Socket, event: string, payload: unknown, responseEvent: string) {
  const result = once<T>(socket, responseEvent);
  socket.emit(event, payload);
  return result;
}

afterEach(async () => {
  if (serverModule.server.listening) {
    serverModule.rooms.clear();
    (serverModule as any).io?.sockets?.sockets?.forEach((socket: any) => socket.disconnect(true));
    await new Promise<void>((resolve) => serverModule.server.close(() => resolve()));
  }
});
