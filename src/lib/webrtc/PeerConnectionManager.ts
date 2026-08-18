export interface IceServerConfig { urls: string | string[]; username?: string; credential?: string; }
export class PeerConnectionManager {
  readonly connection: RTCPeerConnection;
  constructor(configuration: RTCConfiguration = {}) { this.connection = new RTCPeerConnection(configuration); }
  get connectionState(): RTCPeerConnectionState { return this.connection.connectionState; }
  close(): void { this.connection.close(); }
}
