const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Enhanced CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        /^https:\/\/.*\.vercel\.app$/,
        'https://sendify-ivory.vercel.app',
        'https://sendify-ten.vercel.app',
        'https://sendify.vercel.app',
        'https://serverforminecraftbedrock.fun',
        'https://www.serverforminecraftbedrock.fun'
      ]
    : true,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Forwarded-For']
}));

// Enhanced Socket.IO with optimizations for long-distance connections
const io = socketIO(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? [
          /^https:\/\/.*\.vercel\.app$/, 
          'https://sendify-ten.vercel.app',
          'https://serverforminecraftbedrock.fun',
          'https://www.serverforminecraftbedrock.fun'
        ]
      : true,
    methods: ['GET', 'POST'],
    credentials: true
  },
  transports: ['websocket', 'polling'],
  allowEIO3: true,
  pingTimeout: 180000,    // 3 minutes for very slow connections
  pingInterval: 45000,    // Ping every 45 seconds
  maxHttpBufferSize: 1e7,
  perMessageDeflate: false,
  upgradeTimeout: 60000,  // 1 minute upgrade timeout
  allowUpgrades: true,
  connectTimeout: 120000, // 2 minute connection timeout
  timeout: 300000         // 5 minute total timeout
});

// Health check with comprehensive diagnostics
app.get('/health', (req, res) => {
  const healthInfo = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    rooms: rooms.size,
    activeConnections: io.sockets.sockets.size,
    environment: process.env.NODE_ENV || 'development',
    longDistanceRooms: Array.from(rooms.values()).filter(r => r.isLongDistance).length,
    relayConnections: Array.from(connectionIssues.values()).filter(c => c.usingRelay).length,
    turnServers: turnServers.length,
    averageConnectionTime: getAverageConnectionTime(),
    memoryUsage: process.memoryUsage()
  };
  
  res.status(200).json(healthInfo);
});

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Sendify P2P Signaling Server - Long Distance Optimized',
    status: 'Running',
    version: '4.0.0',
    features: [
      'Multi-TURN server failover',
      'Long-distance connection optimization',
      'Adaptive ICE candidate handling',
      'Connection quality monitoring',
      'Geographic connection detection',
      'Network troubleshooting support',
      'Bandwidth adaptation',
      'Connection recovery mechanisms'
    ]
  });
});

// Enhanced room and connection tracking
const rooms = new Map();
const connectionIssues = new Map();
const connectionStats = new Map();
// const geolocation = new Map(); // Track approximate user locations (unused)
const MAX_ROOM_SIZE = 2;
const ROOM_TIMEOUT = 60 * 60 * 1000; // 1 hour for long transfers

// Multiple TURN/STUN servers for better global coverage
const turnServers = [
  // Custom TURN server (Oracle COTURN - primary)
  ...(process.env.NEXT_PUBLIC_TURN_URL && process.env.NEXT_PUBLIC_TURN_USER && process.env.NEXT_PUBLIC_TURN_PASS ? [{
    urls: [process.env.NEXT_PUBLIC_TURN_URL],
    username: process.env.NEXT_PUBLIC_TURN_USER,
    credential: process.env.NEXT_PUBLIC_TURN_PASS,
    region: "custom"
  }] : []),
  
  // Custom STUN server (Oracle COTURN - same server, STUN mode)
  ...(process.env.NEXT_PUBLIC_STUN_URL ? [{
    urls: [process.env.NEXT_PUBLIC_STUN_URL],
    region: "custom"
  }] : []),
  
  // Free public STUN servers for fallback
  {
    urls: [
      "stun:stun.l.google.com:19302",
      "stun:stun1.l.google.com:19302",
      "stun:stun2.l.google.com:19302"
    ],
    region: "global"
  },
  
  // Additional public STUN servers for redundancy
  {
    urls: [
      "stun:stun.stunprotocol.org:3478",
      "stun:stun.voiparound.com",
      "stun:stun.voipbuster.com"
    ],
    region: "global"
  },
  
  // Free TURN server fallback
  {
    urls: [
      "turn:turn.anyfirewall.com:443?transport=tcp"
    ],
    username: "webrtc",
    credential: "webrtc",
    region: "global"
  }
];

const ROOM_CODE_REGEX = /^[A-Z0-9]{8}$/;
const VALID_PARTICIPANT_ROLES = new Set(['sender', 'receiver']);
const VALID_NETWORK_TYPES = new Set(['wifi', 'cellular', 'ethernet', 'unknown']);
const VALID_CONNECTION_STATES = new Set([
  'new',
  'connecting',
  'connected',
  'disconnected',
  'failed',
  'closed',
]);
const SDP_MAX_LENGTH = 2 * 1024 * 1024;
const ICE_CANDIDATE_MAX_LENGTH = 8192;
const MAX_REASON_LENGTH = 160;
const MAX_FILE_NAME_LENGTH = 260;

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function hasOnlyAllowedKeys(value, allowedKeys) {
  return Object.keys(value).every((key) => allowedKeys.includes(key));
}

function toRoomId(rawRoomId) {
  if (typeof rawRoomId !== 'string') return null;
  const normalized = rawRoomId.trim().toUpperCase();
  if (!ROOM_CODE_REGEX.test(normalized)) return null;
  return normalized;
}

function toRole(rawRole) {
  if (typeof rawRole !== 'string') return null;
  const normalized = rawRole.trim().toLowerCase();
  if (!VALID_PARTICIPANT_ROLES.has(normalized)) return null;
  return normalized;
}

function toNetworkType(rawNetworkType) {
  if (typeof rawNetworkType !== 'string') return 'unknown';
  const normalized = rawNetworkType.trim().toLowerCase();
  if (!VALID_NETWORK_TYPES.has(normalized)) return 'unknown';
  return normalized;
}

function toSafeString(rawValue, maxLength) {
  if (typeof rawValue !== 'string') return null;
  const normalized = rawValue.trim();
  if (!normalized || normalized.length > maxLength) return null;
  return normalized;
}

function toNonNegativeNumber(rawValue) {
  if (typeof rawValue !== 'number' || !Number.isFinite(rawValue) || rawValue < 0) {
    return null;
  }
  return rawValue;
}

function toNonNegativeInteger(rawValue) {
  if (!Number.isInteger(rawValue) || rawValue < 0) {
    return null;
  }
  return rawValue;
}

function rejectInvalidPayload(socket, eventName, reason) {
  console.warn(`[SECURITY] Rejecting ${eventName} from ${socket.id}: ${reason}`);
  socket.emit('request-invalid', {
    event: eventName,
    message: 'Invalid request payload',
  });
}

function parseJoinRoomPayload(data) {
  if (typeof data === 'string') {
    const roomId = toRoomId(data);
    if (!roomId) return null;
    return { roomId, requestedRole: null, networkType: 'unknown' };
  }

  if (!isPlainObject(data) || !hasOnlyAllowedKeys(data, ['roomId', 'role', 'networkInfo'])) {
    return null;
  }

  const roomId = toRoomId(data.roomId);
  if (!roomId) return null;

  const requestedRole = data.role === undefined ? null : toRole(data.role);
  if (data.role !== undefined && !requestedRole) {
    return null;
  }

  let networkType = 'unknown';
  if (data.networkInfo !== undefined) {
    if (!isPlainObject(data.networkInfo) || !hasOnlyAllowedKeys(data.networkInfo, ['type'])) {
      return null;
    }
    networkType = toNetworkType(data.networkInfo.type);
  }

  return { roomId, requestedRole, networkType };
}

function parseRoomOnlyPayload(data) {
  if (typeof data === 'string') {
    const roomId = toRoomId(data);
    return roomId ? { roomId } : null;
  }

  if (!isPlainObject(data) || !hasOnlyAllowedKeys(data, ['roomId'])) {
    return null;
  }

  const roomId = toRoomId(data.roomId);
  return roomId ? { roomId } : null;
}

function parseSessionDescriptionPayload(data, descriptionKey, expectedType) {
  if (
    !isPlainObject(data) ||
    !hasOnlyAllowedKeys(data, ['roomId', descriptionKey, 'iceRestart'])
  ) {
    return null;
  }

  const roomId = toRoomId(data.roomId);
  if (!roomId) return null;

  const description = data[descriptionKey];
  if (
    !isPlainObject(description) ||
    !hasOnlyAllowedKeys(description, ['type', 'sdp']) ||
    description.type !== expectedType
  ) {
    return null;
  }

  if (typeof description.sdp !== 'string' || description.sdp.length === 0 || description.sdp.length > SDP_MAX_LENGTH) {
    return null;
  }

  if (data.iceRestart !== undefined && typeof data.iceRestart !== 'boolean') {
    return null;
  }

  const payload = {
    roomId,
  };
  payload[descriptionKey] = {
    type: expectedType,
    sdp: description.sdp,
  };
  payload.iceRestart = data.iceRestart === true;

  return payload;
}

function parseIceCandidatePayload(data) {
  if (!isPlainObject(data) || !hasOnlyAllowedKeys(data, ['roomId', 'candidate'])) {
    return null;
  }

  const roomId = toRoomId(data.roomId);
  if (!roomId) return null;

  const candidate = data.candidate;
  if (
    !isPlainObject(candidate) ||
    !hasOnlyAllowedKeys(candidate, ['candidate', 'sdpMid', 'sdpMLineIndex', 'usernameFragment'])
  ) {
    return null;
  }

  if (
    typeof candidate.candidate !== 'string' ||
    candidate.candidate.length === 0 ||
    candidate.candidate.length > ICE_CANDIDATE_MAX_LENGTH
  ) {
    return null;
  }

  if (
    candidate.sdpMid !== undefined &&
    candidate.sdpMid !== null &&
    typeof candidate.sdpMid !== 'string'
  ) {
    return null;
  }

  if (
    candidate.sdpMLineIndex !== undefined &&
    candidate.sdpMLineIndex !== null &&
    toNonNegativeInteger(candidate.sdpMLineIndex) === null
  ) {
    return null;
  }

  if (
    candidate.usernameFragment !== undefined &&
    candidate.usernameFragment !== null &&
    typeof candidate.usernameFragment !== 'string'
  ) {
    return null;
  }

  const sanitizedCandidate = {
    candidate: candidate.candidate,
  };

  if (candidate.sdpMid !== undefined) {
    sanitizedCandidate.sdpMid = candidate.sdpMid;
  }
  if (candidate.sdpMLineIndex !== undefined) {
    sanitizedCandidate.sdpMLineIndex = candidate.sdpMLineIndex;
  }
  if (candidate.usernameFragment !== undefined) {
    sanitizedCandidate.usernameFragment = candidate.usernameFragment;
  }

  return {
    roomId,
    candidate: sanitizedCandidate,
  };
}

function parseConnectionStatePayload(data) {
  if (!isPlainObject(data) || !hasOnlyAllowedKeys(data, ['roomId', 'state'])) {
    return null;
  }

  const roomId = toRoomId(data.roomId);
  const state = typeof data.state === 'string' ? data.state.trim().toLowerCase() : null;
  if (!roomId || !state || !VALID_CONNECTION_STATES.has(state)) {
    return null;
  }

  return { roomId, state };
}

function parseTransferStartPayload(data) {
  if (typeof data === 'string') {
    const roomId = toRoomId(data);
    return roomId ? { roomId } : null;
  }

  if (!isPlainObject(data) || !hasOnlyAllowedKeys(data, ['roomId'])) {
    return null;
  }

  const roomId = toRoomId(data.roomId);
  return roomId ? { roomId } : null;
}

function parseTransferProgressPayload(data) {
  if (
    !isPlainObject(data) ||
    !hasOnlyAllowedKeys(data, [
      'roomId',
      'fileIndex',
      'fileName',
      'progress',
      'bytesTransferred',
      'totalBytes',
      'speed',
      'stage',
      'conversionProgress',
    ])
  ) {
    return null;
  }

  const roomId = toRoomId(data.roomId);
  if (!roomId) return null;

  const payload = { roomId };

  if (data.fileIndex !== undefined) {
    const fileIndex = toNonNegativeInteger(data.fileIndex);
    if (fileIndex === null) return null;
    payload.fileIndex = fileIndex;
  }

  if (data.fileName !== undefined) {
    const fileName = toSafeString(data.fileName, MAX_FILE_NAME_LENGTH);
    if (!fileName) return null;
    payload.fileName = fileName;
  }

  if (data.progress !== undefined) {
    const progress = toNonNegativeNumber(data.progress);
    if (progress === null || progress > 100) return null;
    payload.progress = progress;
  }

  if (data.bytesTransferred !== undefined) {
    const bytesTransferred = toNonNegativeNumber(data.bytesTransferred);
    if (bytesTransferred === null) return null;
    payload.bytesTransferred = bytesTransferred;
  }

  if (data.totalBytes !== undefined) {
    const totalBytes = toNonNegativeNumber(data.totalBytes);
    if (totalBytes === null) return null;
    payload.totalBytes = totalBytes;
  }

  if (
    payload.bytesTransferred !== undefined &&
    payload.totalBytes !== undefined &&
    payload.bytesTransferred > payload.totalBytes
  ) {
    return null;
  }

  if (data.speed !== undefined) {
    const speed = toNonNegativeNumber(data.speed);
    if (speed === null) return null;
    payload.speed = speed;
  }

  if (data.stage !== undefined) {
    if (data.stage !== 'converting' && data.stage !== 'transferring') {
      return null;
    }
    payload.stage = data.stage;
  }

  if (data.conversionProgress !== undefined) {
    const conversionProgress = toNonNegativeNumber(data.conversionProgress);
    if (conversionProgress === null || conversionProgress > 100) return null;
    payload.conversionProgress = conversionProgress;
  }

  return payload;
}

function parseTransferCompletePayload(data) {
  if (typeof data === 'string') {
    const roomId = toRoomId(data);
    return roomId ? { roomId, totalBytes: 0 } : null;
  }

  if (!isPlainObject(data) || !hasOnlyAllowedKeys(data, ['roomId', 'totalBytes'])) {
    return null;
  }

  const roomId = toRoomId(data.roomId);
  if (!roomId) return null;

  let totalBytes = 0;
  if (data.totalBytes !== undefined) {
    const parsedTotalBytes = toNonNegativeNumber(data.totalBytes);
    if (parsedTotalBytes === null) return null;
    totalBytes = parsedTotalBytes;
  }

  return { roomId, totalBytes };
}

function parseTransferCancelPayload(data) {
  if (typeof data === 'string') {
    const roomId = toRoomId(data);
    return roomId ? { roomId, cancelledBy: null, reason: null } : null;
  }

  if (!isPlainObject(data) || !hasOnlyAllowedKeys(data, ['roomId', 'cancelledBy', 'reason'])) {
    return null;
  }

  const roomId = toRoomId(data.roomId);
  if (!roomId) return null;

  let cancelledBy = null;
  if (data.cancelledBy !== undefined) {
    if (data.cancelledBy === 'system') {
      cancelledBy = 'system';
    } else {
      cancelledBy = toRole(data.cancelledBy);
      if (!cancelledBy) return null;
    }
  }

  let reason = null;
  if (data.reason !== undefined && data.reason !== null) {
    reason = toSafeString(data.reason, MAX_REASON_LENGTH);
    if (!reason) return null;
  }

  return { roomId, cancelledBy, reason };
}

function resolveRoleForJoin(room, requestedRole) {
  const activeRoles = new Set(
    Array.from(room.participantDetails.values())
      .map((participant) => participant.role)
      .filter((role) => VALID_PARTICIPANT_ROLES.has(role)),
  );

  if (requestedRole) {
    if (activeRoles.has(requestedRole)) {
      return null;
    }
    return requestedRole;
  }

  if (!activeRoles.has('sender')) {
    return 'sender';
  }
  if (!activeRoles.has('receiver')) {
    return 'receiver';
  }

  return null;
}

function authorizeRoomEvent(socket, roomId, eventName, allowedRoles) {
  const room = rooms.get(roomId);
  if (!room) {
    rejectInvalidPayload(socket, eventName, `room-not-found:${roomId}`);
    return null;
  }

  if (
    socket.roomId !== roomId ||
    !socket.rooms ||
    !socket.rooms.has(roomId) ||
    !room.participants.has(socket.id)
  ) {
    rejectInvalidPayload(socket, eventName, `socket-not-authorized-for-room:${roomId}`);
    return null;
  }

  const participant = room.participantDetails.get(socket.id);
  if (!participant) {
    rejectInvalidPayload(socket, eventName, `participant-details-missing:${roomId}`);
    return null;
  }

  if (Array.isArray(allowedRoles) && allowedRoles.length > 0 && !allowedRoles.includes(participant.role)) {
    rejectInvalidPayload(socket, eventName, `role-not-allowed:${participant.role}`);
    return null;
  }

  return { room, participant };
}

function createRoom(roomId) {
  const room = {
    id: roomId,
    participants: new Set(),
    participantDetails: new Map(),
    transferInProgress: false,
    createdAt: Date.now(),
    lastActivity: Date.now(),
    connectionAttempts: 0,
    iceRestartCount: 0,
    connectionIssues: [],
    turnServerIndex: 0,
    isLongDistance: false,
    estimatedDistance: 0,
    connectionQuality: 'unknown',
    networkType: 'unknown', // wifi, cellular, unknown
    adaptiveSettings: {
      chunkSize: 2048,
      bufferSize: 16384,
      delay: 100
    }
  };
  
  rooms.set(roomId, room);
  
  // Extended timeout for long transfers
  setTimeout(() => {
    if (rooms.has(roomId)) {
      const room = rooms.get(roomId);
      const timeSinceActivity = Date.now() - room.lastActivity;
      
      if (timeSinceActivity >= ROOM_TIMEOUT) {
        console.log(`Room ${roomId} expired after ${ROOM_TIMEOUT/1000/60} minutes`);
        room.participants.forEach(socketId => {
          const socket = io.sockets.sockets.get(socketId);
          if (socket) {
            socket.emit('room-expired');
            socket.leave(roomId);
          }
        });
        cleanup(roomId);
      }
    }
  }, ROOM_TIMEOUT);
  
  return room;
}

function cleanup(roomId) {
  rooms.delete(roomId);
  connectionIssues.delete(roomId);
}

function estimateDistance(ip1, ip2) {
  // Simple heuristic: if IPs are very different, likely long distance
  // In production, you'd use a GeoIP service
  if (!ip1 || !ip2 || ip1 === ip2) return 0;
  
  const ip1Parts = ip1.split('.').map(Number);
  const ip2Parts = ip2.split('.').map(Number);
  
  // Very rough estimate based on IP difference
  const diff = Math.abs(ip1Parts[0] - ip2Parts[0]) + Math.abs(ip1Parts[1] - ip2Parts[1]);
  
  if (diff > 100) return 1000; // Likely different countries
  if (diff > 50) return 500;   // Likely different regions
  if (diff > 20) return 100;   // Likely different cities
  return 10; // Likely same city/region
}

function getAverageConnectionTime() {
  const stats = Array.from(connectionStats.values());
  if (stats.length === 0) return 0;
  
  const times = stats
    .filter(s => s.connectedDuration)
    .map(s => s.connectedDuration);
  
  return times.length > 0 
    ? Math.round(times.reduce((a, b) => a + b, 0) / times.length)
    : 0;
}

function selectOptimalTurnServer(room, userRegion = 'global') {
  // Rotate through servers, preferring those that match region
  const regionalServers = turnServers.filter(s => s.region === userRegion || s.region === 'global');
  const serverList = regionalServers.length > 0 ? regionalServers : turnServers;
  
  return serverList[room.turnServerIndex % serverList.length];
}

io.on('connection', (socket) => {
  const clientIP = socket.handshake.address ||
                   socket.request.connection?.remoteAddress ||
                   socket.handshake.headers['x-forwarded-for']?.split(',')[0] ||
                   'unknown';

  const userAgent = socket.handshake.headers['user-agent'] || '';
  const country = socket.handshake.headers['cf-ipcountry'] || 'unknown';

  console.log(`Client connected: ${socket.id} from ${clientIP} (${country})`);

  connectionStats.set(socket.id, {
    connectedAt: Date.now(),
    ip: clientIP,
    userAgent,
    country,
    networkType: userAgent.includes('Mobile') ? 'cellular' : 'wifi'
  });

  socket.on('join-room', (data) => {
    const payload = parseJoinRoomPayload(data);
    if (!payload) {
      rejectInvalidPayload(socket, 'join-room', 'invalid-join-room-payload');
      return;
    }

    const { roomId, requestedRole, networkType } = payload;

    if (socket.roomId && socket.roomId !== roomId) {
      rejectInvalidPayload(socket, 'join-room', 'socket-already-joined-another-room');
      return;
    }

    let room = rooms.get(roomId);
    console.log(`${socket.id} (${requestedRole || 'auto'}) joining room: ${roomId} from ${country}`);

    // Reject joins while an active transfer is in progress in this room
    if (room && room.transferInProgress) {
      socket.emit('room-busy', { room: roomId });
      return;
    }

    if (room && room.participants.size >= MAX_ROOM_SIZE && !room.participants.has(socket.id)) {
      socket.emit('room-full', { room: roomId });
      return;
    }

    if (!room) {
      room = createRoom(roomId);
    }

    const isNewParticipant = !room.participants.has(socket.id);
    const existingParticipant = room.participantDetails.get(socket.id);
    let assignedRole = existingParticipant?.role || null;

    if (assignedRole && !VALID_PARTICIPANT_ROLES.has(assignedRole)) {
      assignedRole = null;
    }

    if (!assignedRole) {
      assignedRole = resolveRoleForJoin(room, requestedRole);
      if (!assignedRole) {
        rejectInvalidPayload(socket, 'join-room', 'requested-role-not-available');
        socket.emit('room-full', { room: roomId });
        return;
      }
    }

    room.participants.add(socket.id);
    room.participantDetails.set(socket.id, {
      role: assignedRole,
      joinedAt: existingParticipant?.joinedAt || Date.now(),
      connectionState: existingParticipant?.connectionState || 'new',
      lastSeen: Date.now(),
      candidateCount: existingParticipant?.candidateCount || 0,
      connectionQuality: existingParticipant?.connectionQuality || 'unknown',
      ip: clientIP,
      country,
      networkType: networkType || existingParticipant?.networkType || 'unknown'
    });

    room.lastActivity = Date.now();
    socket.join(roomId);
    socket.roomId = roomId;
    socket.role = assignedRole;

    // Estimate if this is a long-distance connection
    if (room.participants.size === 2) {
      const participants = Array.from(room.participantDetails.values());
      if (participants.length === 2) {
        const distance = estimateDistance(participants[0].ip, participants[1].ip);
        room.estimatedDistance = distance;
        room.isLongDistance = distance > 100;

        if (room.isLongDistance) {
          console.log(`Long-distance room detected: ${roomId} (estimated ${distance}km)`);
          // Optimize settings for long distance
          room.adaptiveSettings = {
            chunkSize: 1024,
            bufferSize: 8192,
            delay: 200
          };
        }
      }
    }

    // Send optimized TURN server configuration
    const optimalServer = selectOptimalTurnServer(room, country);
    socket.emit('turn-servers', {
      servers: turnServers,
      recommended: optimalServer,
      currentIndex: room.turnServerIndex,
      isLongDistance: room.isLongDistance,
      adaptiveSettings: room.adaptiveSettings
    });

    if (isNewParticipant) {
      socket.to(roomId).emit('peer-joined', {
        peerId: socket.id,
        role: assignedRole,
        country,
        networkType: networkType || 'unknown',
        isLongDistance: room.isLongDistance
      });
    }

    if (isNewParticipant && room.participants.size === MAX_ROOM_SIZE) {
      io.to(roomId).emit('room-ready', {
        participants: Array.from(room.participantDetails.entries()).map(([id, details]) => ({
          id,
          role: details.role,
          country: details.country,
          networkType: details.networkType
        })),
        isLongDistance: room.isLongDistance,
        estimatedDistance: room.estimatedDistance,
        recommendedSettings: room.adaptiveSettings
      });
    }
  });

  socket.on('webrtc-offer', (data) => {
    const payload = parseSessionDescriptionPayload(data, 'offer', 'offer');
    if (!payload) {
      rejectInvalidPayload(socket, 'webrtc-offer', 'invalid-offer-payload');
      return;
    }

    const authorized = authorizeRoomEvent(socket, payload.roomId, 'webrtc-offer', ['sender']);
    if (!authorized) return;

    const { room } = authorized;
    console.log(`Offer from ${socket.id} to room ${payload.roomId}`);

    room.connectionAttempts++;
    room.lastActivity = Date.now();

    if (payload.iceRestart) {
      room.iceRestartCount++;
      console.log(`ICE restart #${room.iceRestartCount} for room ${payload.roomId}`);

      // Switch to next TURN server
      room.turnServerIndex = (room.turnServerIndex + 1) % turnServers.length;
      const newServer = selectOptimalTurnServer(room);

      io.to(payload.roomId).emit('turn-server-switch', {
        newIndex: room.turnServerIndex,
        server: newServer,
        reason: 'ice-restart'
      });
    }

    // Track connection attempts for quality assessment
    if (room.connectionAttempts > 5) {
      room.connectionQuality = 'poor';
      room.isLongDistance = true;
    }

    socket.to(payload.roomId).emit('webrtc-offer', {
      offer: payload.offer,
      from: socket.id,
      iceRestart: payload.iceRestart,
      connectionAttempt: room.connectionAttempts || 1,
      isLongDistance: room.isLongDistance || false
    });
  });

  socket.on('webrtc-answer', (data) => {
    const payload = parseSessionDescriptionPayload(data, 'answer', 'answer');
    if (!payload) {
      rejectInvalidPayload(socket, 'webrtc-answer', 'invalid-answer-payload');
      return;
    }

    const authorized = authorizeRoomEvent(socket, payload.roomId, 'webrtc-answer', ['receiver']);
    if (!authorized) return;

    const { room } = authorized;
    console.log(`Answer from ${socket.id} to room ${payload.roomId}`);

    room.lastActivity = Date.now();

    socket.to(payload.roomId).emit('webrtc-answer', {
      answer: payload.answer,
      from: socket.id
    });
  });

  socket.on('webrtc-ice-candidate', (data) => {
    const payload = parseIceCandidatePayload(data);
    if (!payload) {
      rejectInvalidPayload(socket, 'webrtc-ice-candidate', 'invalid-ice-candidate-payload');
      return;
    }

    const authorized = authorizeRoomEvent(socket, payload.roomId, 'webrtc-ice-candidate', ['sender', 'receiver']);
    if (!authorized) return;

    const { room, participant } = authorized;
    room.lastActivity = Date.now();

    participant.candidateCount++;
    participant.lastSeen = Date.now();

    // Enhanced candidate analysis
    if (payload.candidate && payload.candidate.candidate) {
      const candidateString = payload.candidate.candidate;
      let candidateType = 'unknown';

      if (candidateString.includes('typ host')) {
        candidateType = 'host';
      } else if (candidateString.includes('typ srflx')) {
        candidateType = 'srflx';
      } else if (candidateString.includes('typ relay')) {
        candidateType = 'relay';
        room.isLongDistance = true;

        if (!connectionIssues.has(payload.roomId)) {
          connectionIssues.set(payload.roomId, {
            usingRelay: true,
            relayCount: 0,
            startTime: Date.now()
          });
        }
        connectionIssues.get(payload.roomId).relayCount++;
      }

      console.log(`ICE candidate from ${socket.id}: ${candidateType} (room: ${payload.roomId})`);
    }

    socket.to(payload.roomId).emit('webrtc-ice-candidate', {
      candidate: payload.candidate,
      from: socket.id,
      candidateCount: participant.candidateCount || 0
    });
  });

  socket.on('connection-state', (data) => {
    const payload = parseConnectionStatePayload(data);
    if (!payload) {
      rejectInvalidPayload(socket, 'connection-state', 'invalid-connection-state-payload');
      return;
    }

    const authorized = authorizeRoomEvent(socket, payload.roomId, 'connection-state', ['sender', 'receiver']);
    if (!authorized) return;

    const { room, participant } = authorized;
    participant.connectionState = payload.state;
    participant.lastSeen = Date.now();

    console.log(`${socket.id} connection state: ${payload.state} (long-distance: ${room.isLongDistance})`);

    if (payload.state === 'connected') {
      const stats = connectionStats.get(socket.id);
      if (stats) {
        stats.connectedDuration = Date.now() - stats.connectedAt;
      }

      room.connectionQuality = room.connectionAttempts <= 2 ? 'good' : 'fair';
    }

    if (payload.state === 'failed') {
      if (!connectionIssues.has(payload.roomId)) {
        connectionIssues.set(payload.roomId, { issues: [] });
      }
      connectionIssues.get(payload.roomId).issues.push({
        type: 'connection-failed',
        timestamp: Date.now(),
        socketId: socket.id,
        isLongDistance: room.isLongDistance
      });

      // Enhanced troubleshooting for long-distance connections
      socket.emit('connection-troubleshooting', {
        suggestions: room.isLongDistance ? [
          'Long-distance connection detected',
          'Both try switching to mobile data or hotspot',
          'Try different WiFi networks if available',
          'Temporarily disable VPN or proxy if using',
          'Check if firewall blocks UDP traffic',
          'Connection may take 1-2 minutes to establish'
        ] : [
          'Check your internet connection stability',
          'Try refreshing both browsers',
          'Check firewall or antivirus settings',
          'Consider switching networks'
        ],
        isLongDistance: room.isLongDistance,
        connectionAttempts: room.connectionAttempts,
        estimatedDistance: room.estimatedDistance
      });
    }

    socket.to(payload.roomId).emit('peer-connection-state', {
      peerId: socket.id,
      state: payload.state,
      quality: room.connectionQuality,
      isLongDistance: room.isLongDistance
    });
  });

  socket.on('transfer-start', (data) => {
    const payload = parseTransferStartPayload(data);
    if (!payload) {
      rejectInvalidPayload(socket, 'transfer-start', 'invalid-transfer-start-payload');
      return;
    }

    const authorized = authorizeRoomEvent(socket, payload.roomId, 'transfer-start', ['sender']);
    if (!authorized) return;

    const { room } = authorized;
    room.transferInProgress = true;
    room.lastActivity = Date.now();
    room.transferStartTime = Date.now();

    console.log(`Transfer started in room ${payload.roomId} (long-distance: ${room.isLongDistance})`);

    socket.to(payload.roomId).emit('transfer-started', {
      isLongDistance: room.isLongDistance,
      estimatedDistance: room.estimatedDistance,
      adaptiveSettings: room.adaptiveSettings
    });
  });

  socket.on('transfer-progress', (data) => {
    const payload = parseTransferProgressPayload(data);
    if (!payload) {
      rejectInvalidPayload(socket, 'transfer-progress', 'invalid-transfer-progress-payload');
      return;
    }

    const authorized = authorizeRoomEvent(socket, payload.roomId, 'transfer-progress', ['sender']);
    if (!authorized) return;

    const { room } = authorized;
    room.lastActivity = Date.now();

    // Adapt settings based on transfer performance
    if (payload.speed && room.isLongDistance) {
      const speedKBps = payload.speed / 1024;

      if (speedKBps < 10 && room.adaptiveSettings.chunkSize > 512) {
        // Very slow - reduce chunk size further
        room.adaptiveSettings.chunkSize = 512;
        room.adaptiveSettings.delay = Math.min(500, room.adaptiveSettings.delay + 50);

        io.to(payload.roomId).emit('adaptive-settings-update', room.adaptiveSettings);
        console.log(`Adapted settings for slow transfer: ${speedKBps.toFixed(1)} KB/s`);
      }
    }

    socket.to(payload.roomId).emit('peer-transfer-progress', {
      from: socket.id,
      ...payload
    });
  });

  socket.on('transfer-complete', (data) => {
    const payload = parseTransferCompletePayload(data);
    if (!payload) {
      rejectInvalidPayload(socket, 'transfer-complete', 'invalid-transfer-complete-payload');
      return;
    }

    const authorized = authorizeRoomEvent(socket, payload.roomId, 'transfer-complete', ['sender']);
    if (!authorized) return;

    const { room } = authorized;
    const duration = room.transferStartTime ? (Date.now() - room.transferStartTime) / 1000 : 0;
    const fileSize = payload.totalBytes || 0;
    const avgSpeed = duration > 0 ? fileSize / duration : 0;

    console.log(`Transfer completed in ${payload.roomId}: ${duration.toFixed(1)}s, ${(fileSize/1024/1024).toFixed(2)}MB, ${(avgSpeed/1024).toFixed(1)}KB/s (long-distance: ${room.isLongDistance})`);

    room.transferInProgress = false;
    room.lastActivity = Date.now();

    socket.to(payload.roomId).emit('transfer-completed', {
      duration,
      averageSpeed: avgSpeed,
      wasLongDistance: room.isLongDistance
    });
  });

  socket.on('transfer-cancel', (data) => {
    const payload = parseTransferCancelPayload(data);
    if (!payload) {
      rejectInvalidPayload(socket, 'transfer-cancel', 'invalid-transfer-cancel-payload');
      return;
    }

    const authorized = authorizeRoomEvent(socket, payload.roomId, 'transfer-cancel', ['sender', 'receiver']);
    if (!authorized) return;

    const { room, participant } = authorized;
    const participantRole = participant.role;

    if (
      payload.cancelledBy &&
      payload.cancelledBy !== 'system' &&
      payload.cancelledBy !== participantRole
    ) {
      rejectInvalidPayload(socket, 'transfer-cancel', 'cancelledBy-does-not-match-actor-role');
      return;
    }

    const cancelledBy = payload.cancelledBy || participantRole || 'system';
    const reason = payload.reason || null;

    room.transferInProgress = false;
    room.lastActivity = Date.now();

    console.log(`Transfer cancelled in room ${payload.roomId} by ${cancelledBy}${reason ? ` (${reason})` : ''}`);

    socket.to(payload.roomId).emit('transfer-cancelled', {
      from: socket.id,
      cancelledBy,
      reason,
      at: Date.now()
    });
  });

  socket.on('request-troubleshooting', (data) => {
    const payload = parseRoomOnlyPayload(data);
    if (!payload) {
      rejectInvalidPayload(socket, 'request-troubleshooting', 'invalid-request-troubleshooting-payload');
      return;
    }

    const authorized = authorizeRoomEvent(socket, payload.roomId, 'request-troubleshooting', ['sender', 'receiver']);
    if (!authorized) return;

    const { room } = authorized;
    const issues = connectionIssues.get(payload.roomId);

    let suggestions = [
      'Ensure stable internet on both devices',
      'Try refreshing both browser windows',
      'Check firewall allows WebRTC (UDP traffic)'
    ];

    if (room.isLongDistance) {
      suggestions = [
        'Long-distance transfer - expect slower speeds',
        'Both users try mobile hotspot for better routing',
        'Try different networks (WiFi vs mobile data)',
        'Consider splitting very large files',
        'Allow extra time for connection (up to 3 minutes)',
        ...suggestions
      ];
    }

    socket.emit('troubleshooting-suggestions', {
      suggestions,
      connectionInfo: {
        isLongDistance: room.isLongDistance,
        estimatedDistance: room.estimatedDistance,
        usingRelay: issues?.usingRelay || false,
        connectionAttempts: room.connectionAttempts,
        connectionQuality: room.connectionQuality
      }
    });
  });

  socket.on('heartbeat', (data) => {
    const payload = parseRoomOnlyPayload(data);
    if (!payload) {
      rejectInvalidPayload(socket, 'heartbeat', 'invalid-heartbeat-payload');
      return;
    }

    const authorized = authorizeRoomEvent(socket, payload.roomId, 'heartbeat', ['sender', 'receiver']);
    if (!authorized) return;

    const { room, participant } = authorized;
    room.lastActivity = Date.now();
    participant.lastSeen = Date.now();

    socket.emit('heartbeat-ack', {
      serverTime: Date.now(),
      roomInfo: {
        participants: room.participants.size,
        isLongDistance: room.isLongDistance,
        connectionQuality: room.connectionQuality,
        estimatedDistance: room.estimatedDistance
      }
    });
  });

  socket.on('disconnect', () => {
    const stats = connectionStats.get(socket.id);
    const duration = stats ? (Date.now() - stats.connectedAt) / 1000 : 0;

    console.log(`Client disconnected: ${socket.id} after ${duration.toFixed(1)}s`);
    connectionStats.delete(socket.id);

    if (socket.roomId) {
      const room = rooms.get(socket.roomId);

      if (room) {
        socket.to(socket.roomId).emit('peer-disconnected', {
          peerId: socket.id,
          role: socket.role,
          wasTransferring: room.transferInProgress,
          connectionDuration: duration
        });

        room.participants.delete(socket.id);
        room.participantDetails.delete(socket.id);

        // Reset transfer state when one peer leaves mid-transfer
        if (room.transferInProgress && room.participants.size < 2) {
          room.transferInProgress = false;
          room.lastActivity = Date.now();
        }

        if (room.participants.size === 0) {
          cleanup(socket.roomId);
        }
      }
    }
  });
});



// Enhanced monitoring
setInterval(() => {
  const totalRooms = rooms.size;
  const longDistanceRooms = Array.from(rooms.values()).filter(r => r.isLongDistance).length;
  const activeTransfers = Array.from(rooms.values()).filter(r => r.transferInProgress).length;
  
  if (totalRooms > 0) {
    console.log(`[ENHANCED STATS] Total: ${totalRooms}, Long-distance: ${longDistanceRooms}, Active transfers: ${activeTransfers}, Connections: ${io.sockets.sockets.size}`);
  }
}, 120000); // Every 2 minutes

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Enhanced Sendify Signaling Server running on port ${PORT}`);
  console.log(`📡 Optimized for long-distance WebRTC connections`);
  console.log(`🌍 Supporting ${turnServers.length} TURN servers for global coverage`);
  console.log(`⚡ Features: Multi-TURN failover, adaptive settings, connection recovery`);
});
