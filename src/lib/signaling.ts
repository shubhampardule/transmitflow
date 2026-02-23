import { io, Socket } from 'socket.io-client';
import { SignalingMessage } from '@/types';

export interface AdaptiveTransferSettings {
  chunkSize: number;
  bufferSize: number;
  delay: number;
}

class SignalingService {
  private socket: Socket | null = null;
  private serverUrl: string = '';
  private dynamicIceServers: RTCIceServer[] = [];
  private adaptiveSettings: AdaptiveTransferSettings | null = null;
  private adaptiveSettingsListener: ((settings: AdaptiveTransferSettings) => void) | null = null;
  private signalListeners: {
    offer?: (data: { offer: RTCSessionDescriptionInit; from?: string }) => void;
    answer?: (data: { answer: RTCSessionDescriptionInit; from?: string }) => void;
    ice?: (data: { candidate: RTCIceCandidateInit; from?: string }) => void;
  } = {};

  private removeSignalListeners(): void {
    if (!this.socket) return;

    if (this.signalListeners.offer) {
      this.socket.off('webrtc-offer', this.signalListeners.offer);
    }
    if (this.signalListeners.answer) {
      this.socket.off('webrtc-answer', this.signalListeners.answer);
    }
    if (this.signalListeners.ice) {
      this.socket.off('webrtc-ice-candidate', this.signalListeners.ice);
    }

    this.signalListeners = {};
  }

  private parseIceServerUrls(rawUrls: unknown): string[] {
    if (typeof rawUrls === 'string') {
      const trimmed = rawUrls.trim();
      return trimmed ? [trimmed] : [];
    }

    if (!Array.isArray(rawUrls)) {
      return [];
    }

    return Array.from(
      new Set(
        rawUrls
          .filter((entry): entry is string => typeof entry === 'string')
          .map((entry) => entry.trim())
          .filter((entry) => entry.length > 0),
      ),
    );
  }

  private sanitizeIceServer(rawServer: unknown): RTCIceServer | null {
    if (!rawServer || typeof rawServer !== 'object') {
      return null;
    }

    const candidate = rawServer as {
      urls?: unknown;
      username?: unknown;
      credential?: unknown;
    };

    const urls = this.parseIceServerUrls(candidate.urls);
    if (urls.length === 0) {
      return null;
    }

    const sanitized: RTCIceServer = { urls };

    if (typeof candidate.username === 'string' && candidate.username.trim().length > 0) {
      sanitized.username = candidate.username.trim();
    }

    if (typeof candidate.credential === 'string' && candidate.credential.trim().length > 0) {
      sanitized.credential = candidate.credential.trim();
    }

    return sanitized;
  }

  private updateDynamicIceServers(rawServers: unknown): void {
    if (!Array.isArray(rawServers)) {
      this.dynamicIceServers = [];
      return;
    }

    this.dynamicIceServers = rawServers
      .map((server) => this.sanitizeIceServer(server))
      .filter((server): server is RTCIceServer => server !== null);
  }

  private upsertDynamicIceServer(rawServer: unknown, newIndex?: unknown): void {
    const sanitized = this.sanitizeIceServer(rawServer);
    if (!sanitized) {
      return;
    }

    if (typeof newIndex === 'number' && Number.isInteger(newIndex) && newIndex >= 0) {
      if (newIndex < this.dynamicIceServers.length) {
        const nextServers = [...this.dynamicIceServers];
        nextServers[newIndex] = sanitized;
        this.dynamicIceServers = nextServers;
        return;
      }

      this.dynamicIceServers = [...this.dynamicIceServers, sanitized];
      return;
    }

    if (this.dynamicIceServers.length > 0) {
      this.dynamicIceServers = [sanitized, ...this.dynamicIceServers.slice(1)];
      return;
    }

    this.dynamicIceServers = [sanitized];
  }

  private toBoundedInteger(rawValue: unknown, min: number, max: number): number | null {
    if (typeof rawValue !== 'number' || !Number.isFinite(rawValue)) {
      return null;
    }

    const normalized = Math.floor(rawValue);
    if (normalized < min || normalized > max) {
      return null;
    }

    return normalized;
  }

  private sanitizeAdaptiveSettings(rawSettings: unknown): AdaptiveTransferSettings | null {
    if (!rawSettings || typeof rawSettings !== 'object' || Array.isArray(rawSettings)) {
      return null;
    }

    const candidate = rawSettings as {
      chunkSize?: unknown;
      bufferSize?: unknown;
      delay?: unknown;
    };

    const chunkSize = this.toBoundedInteger(candidate.chunkSize, 16 * 1024, 512 * 1024);
    const bufferSize = this.toBoundedInteger(candidate.bufferSize, 64 * 1024, 8 * 1024 * 1024);
    const delay = this.toBoundedInteger(candidate.delay, 0, 1000);

    if (chunkSize === null && bufferSize === null && delay === null) {
      return null;
    }

    return {
      chunkSize: chunkSize ?? this.adaptiveSettings?.chunkSize ?? (128 * 1024),
      bufferSize: bufferSize ?? this.adaptiveSettings?.bufferSize ?? (1024 * 1024),
      delay: delay ?? this.adaptiveSettings?.delay ?? 0,
    };
  }

  private updateAdaptiveSettings(rawSettings: unknown): void {
    const sanitized = this.sanitizeAdaptiveSettings(rawSettings);
    if (!sanitized) {
      return;
    }

    this.adaptiveSettings = sanitized;

    if (this.adaptiveSettingsListener) {
      this.adaptiveSettingsListener({ ...sanitized });
    }
  }

  connect(serverUrl?: string): Promise<Socket> {
    return new Promise((resolve, reject) => {
      // If already connected, resolve with existing socket
      if (this.socket && this.socket.connected) {
        resolve(this.socket);
        return;
      }

      // Disconnect existing socket if any
      if (this.socket) {
        this.removeSignalListeners();
        this.socket.disconnect();
      }
      this.dynamicIceServers = [];
      this.adaptiveSettings = null;

      // Determine the correct signaling server URL
      if (serverUrl) {
        this.serverUrl = serverUrl;
      } else {
        // Check if we're in production (Vercel deployment)
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;
        
        // Production configuration
        if (hostname.includes('vercel.app') || 
            hostname.includes('serverforminecraftbedrock.fun') || 
            hostname.includes('your-custom-domain.com')) {
          // Use your deployed signaling server URL
          this.serverUrl = process.env.NEXT_PUBLIC_SIGNALING_SERVER_URL || 'https://signaling-server-6ziv.onrender.com';
        } else if (hostname === 'localhost' || hostname === '127.0.0.1') {
          this.serverUrl = 'http://localhost:3001';
        } else {
          // Use the same IP/hostname but port 3003 for local network
          this.serverUrl = `${protocol}//${hostname}:3001`;
        }
      }
      
      const connectTimeoutMs = 120000;

      this.socket = io(this.serverUrl, {
        transports: ['polling', 'websocket'], // Try polling first, then websocket
        timeout: connectTimeoutMs,
        forceNew: true, // Force a new connection
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        upgrade: true, // Allow transport upgrades
        rememberUpgrade: false, // Don't remember the upgrade
      });

      this.socket.on('turn-servers', (data: { servers?: unknown; adaptiveSettings?: unknown }) => {
        this.updateDynamicIceServers(data?.servers);
        this.updateAdaptiveSettings(data?.adaptiveSettings);
        const relayServerCount = this.dynamicIceServers.filter(
          (server) =>
            typeof server.username === 'string' &&
            server.username.length > 0 &&
            typeof server.credential === 'string' &&
            server.credential.length > 0,
        ).length;

        void relayServerCount;
      });

      this.socket.on('turn-server-switch', (data: { server?: unknown; newIndex?: unknown }) => {
        this.upsertDynamicIceServer(data?.server, data?.newIndex);
      });

      this.socket.on('adaptive-settings-update', (data: unknown) => {
        this.updateAdaptiveSettings(data);
      });

      this.socket.on('connect', () => {
        resolve(this.socket!);
      });

      this.socket.on('connect_error', (error) => {
        console.error('Signaling connection error:', error);
        // Try to provide more specific error messages
        let errorMessage = 'Connection failed';
        if (error.message) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
        reject(new Error(`Connection failed: ${errorMessage}`));
      });

      this.socket.on('disconnect', () => undefined);

      // Add a timeout fallback
      setTimeout(() => {
        if (this.socket && !this.socket.connected) {
          reject(new Error('Connection timeout after 2 minutes'));
        }
      }, connectTimeoutMs);
    });
  }

  isConnected(): boolean {
    return this.socket !== null && this.socket.connected;
  }

  disconnect(): void {
    if (this.socket) {
      this.removeSignalListeners();
      this.socket.disconnect();
      this.socket = null;
    }
    this.dynamicIceServers = [];
    this.adaptiveSettings = null;
    this.adaptiveSettingsListener = null;
  }

  joinRoom(
    roomCode: string,
    options?: {
      role?: 'sender' | 'receiver';
      networkInfo?: { type?: string };
    },
  ): void {
    if (this.socket) {
      const payload = options
        ? {
            roomId: roomCode,
            role: options.role,
            networkInfo: options.networkInfo,
          }
        : roomCode;
      this.socket.emit('join-room', payload);
    }
  }

  leaveRoom(): void {
    if (this.socket) {
      this.socket.emit('leave-room');
    }
  }

  sendSignal(message: SignalingMessage): void {
    if (this.socket) {
      // Map the generic signal to specific server events
      switch (message.type) {
        case 'offer':
          this.socket.emit('webrtc-offer', {
            roomId: message.toRoom,
            offer: message.payload
          });
          break;
        case 'answer':
          this.socket.emit('webrtc-answer', {
            roomId: message.toRoom,
            answer: message.payload
          });
          break;
        case 'ice':
          this.socket.emit('webrtc-ice-candidate', {
            roomId: message.toRoom,
            candidate: message.payload
          });
          break;
        default:
          console.warn('Unknown signal type:', message.type);
      }
    }
  }

  emitTransferStart(roomCode: string): void {
    if (this.socket) {
      this.socket.emit('transfer-start', { roomId: roomCode });
    }
  }

  emitTransferComplete(roomCode: string, totalBytes?: number): void {
    if (this.socket) {
      this.socket.emit('transfer-complete', { roomId: roomCode, totalBytes: totalBytes || 0 });
    }
  }

  emitTransferProgress(
    roomCode: string,
    payload: {
      fileIndex: number;
      progress: number;
      bytesTransferred: number;
      totalBytes: number;
      speed: number;
      stage?: 'converting' | 'transferring';
      conversionProgress?: number;
    },
  ): void {
    if (this.socket) {
      this.socket.emit('transfer-progress', {
        roomId: roomCode,
        fileIndex: payload.fileIndex,
        progress: payload.progress,
        bytesTransferred: payload.bytesTransferred,
        totalBytes: payload.totalBytes,
        speed: payload.speed,
        stage: payload.stage || 'transferring',
        ...(payload.conversionProgress !== undefined
          ? { conversionProgress: payload.conversionProgress }
          : {}),
      });
    }
  }

  emitTransferCancel(
    roomCode: string,
    cancelledBy: 'sender' | 'receiver' | 'system' = 'system',
    reason?: string,
  ): void {
    if (this.socket) {
      this.socket.emit('transfer-cancel', { roomId: roomCode, cancelledBy, reason });
    }
  }

  onRoomFull(callback: (data: { room: string }) => void): void {
    if (this.socket) {
      this.socket.off('room-full');
      this.socket.on('room-full', callback);
    }
  }

  onRoomBusy(callback: (data: { room: string }) => void): void {
    if (this.socket) {
      this.socket.off('room-busy');
      this.socket.on('room-busy', callback);
    }
  }

  onRoomExpired(callback: () => void): void {
    if (this.socket) {
      this.socket.off('room-expired');
      this.socket.on('room-expired', callback);
    }
  }

  onPeerJoined(callback: (peerId: string) => void): void {
    if (this.socket) {
      this.socket.off('peer-joined');
      this.socket.on('peer-joined', (data: { peerId?: string } | string) => {
        const peerId = typeof data === 'string' ? data : data.peerId;
        if (peerId) callback(peerId);
      });
    }
  }

  onPeerDisconnected(callback: (peerId: string) => void): void {
    if (this.socket) {
      this.socket.off('peer-disconnected');
      this.socket.on('peer-disconnected', (data: { peerId?: string } | string) => {
        const peerId = typeof data === 'string' ? data : data.peerId;
        if (peerId) callback(peerId);
      });
    }
  }

  onTransferStarted(
    callback: (data: {
      isLongDistance?: boolean;
      estimatedDistance?: number;
      adaptiveSettings?: { chunkSize?: number; bufferSize?: number; delay?: number };
    }) => void,
  ): void {
    if (this.socket) {
      this.socket.off('transfer-started');
      this.socket.on('transfer-started', callback);
    }
  }

  onTransferCompleted(
    callback: (data: { duration?: number; averageSpeed?: number; wasLongDistance?: boolean }) => void,
  ): void {
    if (this.socket) {
      this.socket.off('transfer-completed');
      this.socket.on('transfer-completed', callback);
    }
  }

  onTransferCancelled(
    callback: (data: { from?: string; cancelledBy?: string; reason?: string | null; at?: number }) => void,
  ): void {
    if (this.socket) {
      this.socket.off('transfer-cancelled');
      this.socket.on('transfer-cancelled', callback);
    }
  }

  onAdaptiveSettingsUpdate(callback: (settings: AdaptiveTransferSettings) => void): void {
    this.adaptiveSettingsListener = callback;

    if (this.adaptiveSettings) {
      callback({ ...this.adaptiveSettings });
    }
  }

  onSignal(callback: (message: SignalingMessage) => void): void {
    if (this.socket) {
      this.removeSignalListeners();

      const offerListener = (data: { offer: RTCSessionDescriptionInit; from?: string }) => {
        callback({
          type: 'offer',
          payload: data.offer,
          fromPeer: data.from,
          toRoom: '',
        });
      };

      const answerListener = (data: { answer: RTCSessionDescriptionInit; from?: string }) => {
        callback({
          type: 'answer',
          payload: data.answer,
          fromPeer: data.from,
          toRoom: '',
        });
      };

      const iceListener = (data: { candidate: RTCIceCandidateInit; from?: string }) => {
        callback({
          type: 'ice',
          payload: data.candidate,
          fromPeer: data.from,
          toRoom: '',
        });
      };

      this.signalListeners = {
        offer: offerListener,
        answer: answerListener,
        ice: iceListener,
      };

      // Listen for WebRTC offer/answer/candidate messages
      this.socket.on('webrtc-offer', offerListener);
      this.socket.on('webrtc-answer', answerListener);
      this.socket.on('webrtc-ice-candidate', iceListener);
    }
  }

  offSignal(): void {
    this.removeSignalListeners();
  }

  removeAllListeners(): void {
    if (this.socket) {
      this.socket.off('webrtc-offer');
      this.socket.off('webrtc-answer');
      this.socket.off('webrtc-ice-candidate');
      this.socket.off('peer-joined');
      this.socket.off('peer-disconnected');
      this.socket.off('room-full');
      this.socket.off('room-busy');
      this.socket.off('room-expired');
      this.socket.off('transfer-started');
      this.socket.off('transfer-completed');
      this.socket.off('transfer-cancelled');
      this.socket.off('turn-servers');
      this.socket.off('turn-server-switch');
      this.socket.off('adaptive-settings-update');
    }
  }

  getIceServers(): RTCIceServer[] {
    return this.dynamicIceServers.map((server) => ({
      ...server,
      urls: Array.isArray(server.urls) ? [...server.urls] : server.urls,
    }));
  }

  getAdaptiveSettings(): AdaptiveTransferSettings | null {
    if (!this.adaptiveSettings) {
      return null;
    }

    return { ...this.adaptiveSettings };
  }

  get id(): string | null {
    return this.socket?.id || null;
  }

  get connected(): boolean {
    return this.socket?.connected || false;
  }
}

export const signalingService = new SignalingService();
