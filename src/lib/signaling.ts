import { io, Socket } from 'socket.io-client';
import { SignalingMessage } from '@/types';

class SignalingService {
  private socket: Socket | null = null;
  private serverUrl: string = '';
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

  connect(serverUrl?: string): Promise<Socket> {
    return new Promise((resolve, reject) => {
      // If already connected, resolve with existing socket
      if (this.socket && this.socket.connected) {
        console.log('Already connected to signaling server:', this.socket.id);
        resolve(this.socket);
        return;
      }

      // Disconnect existing socket if any
      if (this.socket) {
        this.removeSignalListeners();
        this.socket.disconnect();
      }

      // Determine the correct signaling server URL
      if (serverUrl) {
        this.serverUrl = serverUrl;
      } else {
        // Check if we're in production (Vercel deployment)
        const hostname = window.location.hostname;
        const protocol = window.location.protocol;
        
        console.log('Detected hostname:', hostname);
        console.log('Detected protocol:', protocol);
        
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
      
      console.log('Connecting to signaling server:', this.serverUrl);

      this.socket = io(this.serverUrl, {
        transports: ['polling', 'websocket'], // Try polling first, then websocket
        timeout: 20000, // Increased timeout to 20 seconds
        forceNew: true, // Force a new connection
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        upgrade: true, // Allow transport upgrades
        rememberUpgrade: false, // Don't remember the upgrade
      });

      this.socket.on('connect', () => {
        console.log('Connected to signaling server:', this.socket?.id);
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

      this.socket.on('disconnect', (reason) => {
        console.log('Disconnected from signaling server:', reason);
      });

      // Add a timeout fallback
      setTimeout(() => {
        if (this.socket && !this.socket.connected) {
          reject(new Error('Connection timeout after 20 seconds'));
        }
      }, 20000);
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
  }

  joinRoom(roomCode: string): void {
    if (this.socket) {
      this.socket.emit('join-room', roomCode);
    }
  }

  sendSignal(message: SignalingMessage): void {
    if (this.socket) {
      console.log('Sending signal:', message);
      
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

  onSignal(callback: (message: SignalingMessage) => void): void {
    if (this.socket) {
      this.removeSignalListeners();

      const offerListener = (data: { offer: RTCSessionDescriptionInit; from?: string }) => {
        console.log('Received WebRTC offer:', data);
        callback({
          type: 'offer',
          payload: data.offer,
          fromPeer: data.from,
          toRoom: '',
        });
      };

      const answerListener = (data: { answer: RTCSessionDescriptionInit; from?: string }) => {
        console.log('Received WebRTC answer:', data);
        callback({
          type: 'answer',
          payload: data.answer,
          fromPeer: data.from,
          toRoom: '',
        });
      };

      const iceListener = (data: { candidate: RTCIceCandidateInit; from?: string }) => {
        console.log('Received WebRTC ICE candidate:', data);
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
    }
  }

  get id(): string | null {
    return this.socket?.id || null;
  }

  get connected(): boolean {
    return this.socket?.connected || false;
  }
}

export const signalingService = new SignalingService();
