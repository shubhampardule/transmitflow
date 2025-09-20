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
    const roomId = typeof data === 'string' ? data : data.roomId;
    const role = typeof data === 'object' ? data.role : 'unknown';
    const networkInfo = typeof data === 'object' ? data.networkInfo : {};
    
    console.log(`${socket.id} (${role}) joining room: ${roomId} from ${country}`);
    
    let room = rooms.get(roomId);
    
    if (room && room.participants.size >= MAX_ROOM_SIZE) {
      socket.emit('room-full', { room: roomId });
      return;
    }
    
    if (!room) {
      room = createRoom(roomId);
    }
    
    room.participants.add(socket.id);
    room.participantDetails.set(socket.id, {
      role,
      joinedAt: Date.now(),
      connectionState: 'new',
      lastSeen: Date.now(),
      candidateCount: 0,
      connectionQuality: 'unknown',
      ip: clientIP,
      country,
      networkType: networkInfo.type || 'unknown'
    });
    
    room.lastActivity = Date.now();
    socket.join(roomId);
    socket.roomId = roomId;
    socket.role = role;
    
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
            chunkSize: 1024,   // 1KB chunks
            bufferSize: 8192,  // 8KB buffer
            delay: 200         // 200ms delay
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
    
    socket.to(roomId).emit('peer-joined', {
      peerId: socket.id,
      role,
      country,
      networkType: networkInfo.type,
      isLongDistance: room.isLongDistance
    });
    
    if (room.participants.size === MAX_ROOM_SIZE) {
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
    console.log(`Offer from ${socket.id} to room ${data.roomId}`);
    
    const room = rooms.get(data.roomId);
    if (room) {
      room.connectionAttempts++;
      room.lastActivity = Date.now();
      
      if (data.iceRestart) {
        room.iceRestartCount++;
        console.log(`ICE restart #${room.iceRestartCount} for room ${data.roomId}`);
        
        // Switch to next TURN server
        room.turnServerIndex = (room.turnServerIndex + 1) % turnServers.length;
        const newServer = selectOptimalTurnServer(room);
        
        io.to(data.roomId).emit('turn-server-switch', {
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
    }
    
    socket.to(data.roomId).emit('webrtc-offer', {
      offer: data.offer,
      from: socket.id,
      iceRestart: data.iceRestart || false,
      connectionAttempt: room?.connectionAttempts || 1,
      isLongDistance: room?.isLongDistance || false
    });
  });

  socket.on('webrtc-answer', (data) => {
    console.log(`Answer from ${socket.id} to room ${data.roomId}`);
    
    const room = rooms.get(data.roomId);
    if (room) {
      room.lastActivity = Date.now();
    }
    
    socket.to(data.roomId).emit('webrtc-answer', {
      answer: data.answer,
      from: socket.id
    });
  });

  socket.on('webrtc-ice-candidate', (data) => {
    const room = rooms.get(data.roomId);
    
    if (room) {
      room.lastActivity = Date.now();
      
      const participant = room.participantDetails.get(socket.id);
      if (participant) {
        participant.candidateCount++;
        participant.lastSeen = Date.now();
      }
      
      // Enhanced candidate analysis
      if (data.candidate && data.candidate.candidate) {
        const candidateString = data.candidate.candidate;
        let candidateType = 'unknown';
        
        if (candidateString.includes('typ host')) {
          candidateType = 'host';
        } else if (candidateString.includes('typ srflx')) {
          candidateType = 'srflx';
        } else if (candidateString.includes('typ relay')) {
          candidateType = 'relay';
          room.isLongDistance = true;
          
          if (!connectionIssues.has(data.roomId)) {
            connectionIssues.set(data.roomId, {
              usingRelay: true,
              relayCount: 0,
              startTime: Date.now()
            });
          }
          connectionIssues.get(data.roomId).relayCount++;
        }
        
        console.log(`ICE candidate from ${socket.id}: ${candidateType} (room: ${data.roomId})`);
      }
    }
    
    socket.to(data.roomId).emit('webrtc-ice-candidate', {
      candidate: data.candidate,
      from: socket.id,
      candidateCount: room?.participantDetails.get(socket.id)?.candidateCount || 0
    });
  });

  socket.on('connection-state', (data) => {
    const room = rooms.get(data.roomId);
    if (room) {
      const participant = room.participantDetails.get(socket.id);
      if (participant) {
        participant.connectionState = data.state;
        participant.lastSeen = Date.now();
        
        console.log(`${socket.id} connection state: ${data.state} (long-distance: ${room.isLongDistance})`);
        
        if (data.state === 'connected') {
          const stats = connectionStats.get(socket.id);
          if (stats) {
            stats.connectedDuration = Date.now() - stats.connectedAt;
          }
          
          room.connectionQuality = room.connectionAttempts <= 2 ? 'good' : 'fair';
        }
        
        if (data.state === 'failed') {
          if (!connectionIssues.has(data.roomId)) {
            connectionIssues.set(data.roomId, { issues: [] });
          }
          connectionIssues.get(data.roomId).issues.push({
            type: 'connection-failed',
            timestamp: Date.now(),
            socketId: socket.id,
            isLongDistance: room.isLongDistance
          });
          
          // Enhanced troubleshooting for long-distance connections
          socket.emit('connection-troubleshooting', {
            suggestions: room.isLongDistance ? [
              '🌍 Long-distance connection detected',
              '📱 Both try switching to mobile data/hotspot',
              '🔄 Try different WiFi networks if available',
              '🛡️ Temporarily disable VPN/proxy if using',
              '🔥 Check if firewall blocks UDP traffic',
              '⏰ Connection may take 1-2 minutes to establish'
            ] : [
              '📶 Check your internet connection stability',
              '🔄 Try refreshing both browsers',
              '🛡️ Check firewall/antivirus settings',
              '📱 Consider switching networks'
            ],
            isLongDistance: room.isLongDistance,
            connectionAttempts: room.connectionAttempts,
            estimatedDistance: room.estimatedDistance
          });
        }
      }
      
      socket.to(data.roomId).emit('peer-connection-state', {
        peerId: socket.id,
        state: data.state,
        quality: room.connectionQuality,
        isLongDistance: room.isLongDistance
      });
    }
  });

  socket.on('transfer-start', (data) => {
    const roomId = typeof data === 'string' ? data : data.roomId;
    const room = rooms.get(roomId);
    
    if (room) {
      room.transferInProgress = true;
      room.lastActivity = Date.now();
      room.transferStartTime = Date.now();
      
      console.log(`Transfer started in room ${roomId} (long-distance: ${room.isLongDistance})`);
      
      socket.to(roomId).emit('transfer-started', {
        isLongDistance: room.isLongDistance,
        estimatedDistance: room.estimatedDistance,
        adaptiveSettings: room.adaptiveSettings
      });
    }
  });

  socket.on('transfer-progress', (data) => {
    const room = rooms.get(data.roomId);
    if (room) {
      room.lastActivity = Date.now();
      
      // Adapt settings based on transfer performance
      if (data.speed && room.isLongDistance) {
        const speedKBps = data.speed / 1024;
        
        if (speedKBps < 10 && room.adaptiveSettings.chunkSize > 512) {
          // Very slow - reduce chunk size further
          room.adaptiveSettings.chunkSize = 512;
          room.adaptiveSettings.delay = Math.min(500, room.adaptiveSettings.delay + 50);
          
          io.to(data.roomId).emit('adaptive-settings-update', room.adaptiveSettings);
          console.log(`Adapted settings for slow transfer: ${speedKBps.toFixed(1)} KB/s`);
        }
      }
      
      socket.to(data.roomId).emit('peer-transfer-progress', {
        from: socket.id,
        ...data
      });
    }
  });

  socket.on('transfer-complete', (data) => {
    const roomId = typeof data === 'string' ? data : data.roomId;
    const room = rooms.get(roomId);
    
    if (room && room.transferStartTime) {
      const duration = (Date.now() - room.transferStartTime) / 1000;
      const fileSize = data.totalBytes || 0;
      const avgSpeed = fileSize / duration;
      
      console.log(`Transfer completed in ${roomId}: ${duration.toFixed(1)}s, ${(fileSize/1024/1024).toFixed(2)}MB, ${(avgSpeed/1024).toFixed(1)}KB/s (long-distance: ${room.isLongDistance})`);
      
      room.transferInProgress = false;
      room.lastActivity = Date.now();
      
      socket.to(roomId).emit('transfer-completed', {
        duration,
        averageSpeed: avgSpeed,
        wasLongDistance: room.isLongDistance
      });
    }
  });

  socket.on('request-troubleshooting', (roomId) => {
    const room = rooms.get(roomId);
    const issues = connectionIssues.get(roomId);
    
    let suggestions = [
      '📶 Ensure stable internet on both devices',
      '🔄 Try refreshing both browser windows',
      '🛡️ Check firewall allows WebRTC (UDP traffic)'
    ];
    
    if (room?.isLongDistance) {
      suggestions = [
        '🌍 Long-distance transfer - expect slower speeds',
        '📱 Both users try mobile hotspot for better routing',
        '🔄 Try different networks (WiFi vs mobile data)',
        '📦 Consider splitting very large files',
        '⏱️ Allow extra time for connection (up to 3 minutes)',
        ...suggestions
      ];
    }
    
    socket.emit('troubleshooting-suggestions', {
      suggestions,
      connectionInfo: {
        isLongDistance: room?.isLongDistance || false,
        estimatedDistance: room?.estimatedDistance || 0,
        usingRelay: issues?.usingRelay || false,
        connectionAttempts: room?.connectionAttempts || 0,
        connectionQuality: room?.connectionQuality || 'unknown'
      }
    });
  });

  socket.on('heartbeat', (data) => {
    const roomId = typeof data === 'string' ? data : data.roomId;
    const room = rooms.get(roomId);
    
    if (room) {
      room.lastActivity = Date.now();
      const participant = room.participantDetails.get(socket.id);
      if (participant) {
        participant.lastSeen = Date.now();
      }
      
      socket.emit('heartbeat-ack', {
        serverTime: Date.now(),
        roomInfo: {
          participants: room.participants.size,
          isLongDistance: room.isLongDistance,
          connectionQuality: room.connectionQuality,
          estimatedDistance: room.estimatedDistance
        }
      });
    }
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