const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configure CORS for Express - MORE PERMISSIVE FOR CROSS-NETWORK
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        // Allow all Vercel app domains
        /^https:\/\/.*\.vercel\.app$/,
        'https://sendify-ivory.vercel.app',
        'https://sendify-ten.vercel.app',
        'https://sendify.vercel.app',
        'https://your-custom-domain.com'
      ]
    : true, // Allow ALL origins in development for easier testing
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Configure Socket.IO with enhanced settings
const io = socketIO(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? [
        /^https:\/\/.*\.vercel\.app$/,
        'https://sendify-ten.vercel.app',
        'https://sendify.vercel.app'
      ]
      : true,
    methods: ['GET', 'POST'],
    credentials: true
  },
  transports: ['websocket', 'polling'], // Prefer WebSocket first
  allowEIO3: true,
  pingTimeout: 60000,  // Reduced from 120000
  pingInterval: 25000, // Reduced from 30000
  maxHttpBufferSize: 1e7,
  perMessageDeflate: false,
  upgradeTimeout: 10000, // Add for faster WebSocket upgrade
  allowUpgrades: true, // Ensure upgrades are allowed
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    rooms: rooms.size,
    activeConnections: io.sockets.sockets.size,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Sendify P2P Signaling Server',
    status: 'Running',
    version: '2.0.0',
    features: [
      'Enhanced NAT traversal support',
      'ICE candidate buffering',
      'Connection state tracking',
      'Automatic reconnection support'
    ],
    endpoints: {
      health: '/health',
      websocket: 'Socket.IO enabled'
    }
  });
});

// Enhanced room storage with more metadata
const rooms = new Map();
const MAX_ROOM_SIZE = 2;
const ROOM_TIMEOUT = 30 * 60 * 1000; // Increased to 30 minutes
const pendingCandidates = new Map(); // Store ICE candidates before peer joins

// Room management functions
function createRoom(roomId) {
  const room = {
    id: roomId,
    participants: new Set(),
    participantDetails: new Map(), // Store more info about participants
    transferInProgress: false,
    createdAt: Date.now(),
    lastActivity: Date.now(),
    connectionAttempts: 0,
    iceRestartCount: 0
  };
  rooms.set(roomId, room);
  
  // Auto-cleanup room after timeout
  setTimeout(() => {
    if (rooms.has(roomId)) {
      const room = rooms.get(roomId);
      const timeSinceActivity = Date.now() - room.lastActivity;
      
      // Only cleanup if truly inactive
      if (timeSinceActivity >= ROOM_TIMEOUT) {
        console.log(`Room ${roomId} expired after ${ROOM_TIMEOUT/1000/60} minutes of inactivity`);
        room.participants.forEach(socketId => {
          const socket = io.sockets.sockets.get(socketId);
          if (socket) {
            socket.emit('room-expired');
            socket.leave(roomId);
          }
        });
        rooms.delete(roomId);
        pendingCandidates.delete(roomId); // Clean up pending candidates
      }
    }
  }, ROOM_TIMEOUT);
  
  return room;
}

function getRoomInfo(roomId) {
  return rooms.get(roomId);
}

function addToRoom(roomId, socketId, role) {
  let room = getRoomInfo(roomId);
  if (!room) {
    room = createRoom(roomId);
  }
  
  room.participants.add(socketId);
  room.participantDetails.set(socketId, {
    role: role,
    joinedAt: Date.now(),
    connectionState: 'new'
  });
  room.lastActivity = Date.now();
  return room;
}

function removeFromRoom(roomId, socketId) {
  const room = getRoomInfo(roomId);
  if (room) {
    room.participants.delete(socketId);
    room.participantDetails.delete(socketId);
    if (room.participants.size === 0) {
      rooms.delete(roomId);
      pendingCandidates.delete(roomId);
      console.log(`Room ${roomId} is empty, deleted`);
    }
  }
}

// Connection tracking for better debugging
const connectionStats = new Map();

io.on('connection', (socket) => {
  const clientIP = socket.handshake.address || 
                   socket.request.connection?.remoteAddress || 
                   socket.handshake.headers['x-forwarded-for']?.split(',')[0] || 
                   'unknown';
  
  console.log('Client connected:', socket.id, 'from IP:', clientIP);
  
  // Track connection stats
  connectionStats.set(socket.id, {
    connectedAt: Date.now(),
    ip: clientIP,
    userAgent: socket.handshake.headers['user-agent']
  });

  // Enhanced room join with role tracking
  socket.on('join-room', (data) => {
    const roomId = typeof data === 'string' ? data : data.roomId;
    const role = typeof data === 'object' ? data.role : 'unknown';
    
    console.log(`${socket.id} (${role}) wants to join room: ${roomId}`);
    
    const room = getRoomInfo(roomId);
    
    // Check if room is full
    if (room && room.participants.size >= MAX_ROOM_SIZE) {
      socket.emit('room-full', { room: roomId });
      return;
    }
    
    // Add to room
    const updatedRoom = addToRoom(roomId, socket.id, role);
    socket.join(roomId);
    socket.roomId = roomId;
    socket.role = role;
    
    console.log(`${socket.id} joined room ${roomId}. Room size: ${updatedRoom.participants.size}`);
    
    // Send any pending ICE candidates to the newly joined peer
    const roomCandidates = pendingCandidates.get(roomId);
    if (roomCandidates && roomCandidates.length > 0) {
      console.log(`Sending ${roomCandidates.length} buffered ICE candidates to ${socket.id}`);
      roomCandidates.forEach(candidateData => {
        socket.emit('webrtc-ice-candidate', candidateData);
      });
      // Clear the pending candidates after sending
      pendingCandidates.delete(roomId);
    }
    
    // Notify others in the room with more details
    socket.to(roomId).emit('peer-joined', {
      peerId: socket.id,
      role: role
    });
    
    // If room is full, enable transfer with participant info
    if (updatedRoom.participants.size === MAX_ROOM_SIZE) {
      const participantList = Array.from(updatedRoom.participantDetails.entries()).map(([id, details]) => ({
        id,
        role: details.role
      }));
      
      io.to(roomId).emit('room-ready', {
        participants: participantList
      });
    }
  });

  // Enhanced offer handling with better error recovery
  socket.on('webrtc-offer', (data) => {
    console.log(`Offer from ${socket.id} to room ${data.roomId}`);
    
    const room = getRoomInfo(data.roomId);
    if (room) {
      room.connectionAttempts++;
      room.lastActivity = Date.now();
      
      // Check if this is an ICE restart
      if (data.iceRestart) {
        room.iceRestartCount++;
        console.log(`ICE restart #${room.iceRestartCount} for room ${data.roomId}`);
      }
    }
    
    socket.to(data.roomId).emit('webrtc-offer', {
      offer: data.offer,
      from: socket.id,
      iceRestart: data.iceRestart || false
    });
  });

  // Enhanced answer handling
  socket.on('webrtc-answer', (data) => {
    console.log(`Answer from ${socket.id} to room ${data.roomId}`);
    
    const room = getRoomInfo(data.roomId);
    if (room) {
      room.lastActivity = Date.now();
    }
    
    socket.to(data.roomId).emit('webrtc-answer', {
      answer: data.answer,
      from: socket.id
    });
  });

  // Enhanced ICE candidate handling with buffering
  socket.on('webrtc-ice-candidate', (data) => {
    const room = getRoomInfo(data.roomId);
    
    if (room) {
      room.lastActivity = Date.now();
      
      // Log candidate type for debugging
      if (data.candidate && data.candidate.candidate) {
        const candidateString = data.candidate.candidate;
        let type = 'unknown';
        if (candidateString.includes('typ host')) type = 'host';
        else if (candidateString.includes('typ srflx')) type = 'server reflexive';
        else if (candidateString.includes('typ relay')) type = 'relay (TURN)';
        
        console.log(`ICE candidate from ${socket.id}: ${type}`);
      }
      
      // If room is not full, buffer the candidate
      if (room.participants.size < MAX_ROOM_SIZE) {
        if (!pendingCandidates.has(data.roomId)) {
          pendingCandidates.set(data.roomId, []);
        }
        pendingCandidates.get(data.roomId).push({
          candidate: data.candidate,
          from: socket.id
        });
        console.log(`Buffered ICE candidate for room ${data.roomId}`);
      }
      
      // Always relay to other participants
      socket.to(data.roomId).emit('webrtc-ice-candidate', {
        candidate: data.candidate,
        from: socket.id
      });
    }
  });

  // Connection state reporting for debugging
  socket.on('connection-state', (data) => {
    const room = getRoomInfo(data.roomId);
    if (room) {
      const participant = room.participantDetails.get(socket.id);
      if (participant) {
        participant.connectionState = data.state;
        console.log(`${socket.id} connection state: ${data.state}`);
        
        // Notify other peer of connection state
        socket.to(data.roomId).emit('peer-connection-state', {
          peerId: socket.id,
          state: data.state
        });
      }
    }
  });

  // ICE gathering state reporting
  socket.on('ice-gathering-state', (data) => {
    console.log(`${socket.id} ICE gathering state: ${data.state}`);
    if (data.roomId) {
      socket.to(data.roomId).emit('peer-ice-gathering-state', {
        peerId: socket.id,
        state: data.state
      });
    }
  });

  // Transfer progress tracking
  socket.on('transfer-start', (roomId) => {
    const room = getRoomInfo(roomId);
    if (room) {
      room.transferInProgress = true;
      room.lastActivity = Date.now();
      room.transferStartTime = Date.now();
      socket.to(roomId).emit('transfer-started');
      console.log(`Transfer started in room ${roomId}`);
    }
  });

  socket.on('transfer-complete', (roomId) => {
    const room = getRoomInfo(roomId);
    if (room) {
      room.transferInProgress = false;
      room.lastActivity = Date.now();
      
      if (room.transferStartTime) {
        const duration = (Date.now() - room.transferStartTime) / 1000;
        console.log(`Transfer completed in room ${roomId} after ${duration}s`);
      }
      
      socket.to(roomId).emit('transfer-completed');
    }
  });

  socket.on('transfer-cancel', (data) => {
    const room = getRoomInfo(data.roomId);
    if (room) {
      room.transferInProgress = false;
      room.lastActivity = Date.now();
      socket.to(data.roomId).emit('transfer-cancelled', {
        cancelledBy: data.cancelledBy
      });
      console.log(`Transfer cancelled in room ${data.roomId} by ${data.cancelledBy}`);
    }
  });

  // Enhanced disconnect handling
  socket.on('disconnect', () => {
    const stats = connectionStats.get(socket.id);
    const connectionDuration = stats ? (Date.now() - stats.connectedAt) / 1000 : 0;
    
    console.log(`Client disconnected: ${socket.id} after ${connectionDuration}s`);
    connectionStats.delete(socket.id);
    
    if (socket.roomId) {
      const roomId = socket.roomId;
      const room = getRoomInfo(roomId);
      
      if (room) {
        // Notify others with disconnect reason
        socket.to(roomId).emit('peer-disconnected', {
          peerId: socket.id,
          role: socket.role,
          wasTransferring: room.transferInProgress
        });
        
        // Cancel transfer if in progress
        if (room.transferInProgress) {
          socket.to(roomId).emit('transfer-cancelled', {
            cancelledBy: 'peer-disconnect'
          });
          room.transferInProgress = false;
        }
      }
      
      removeFromRoom(roomId, socket.id);
    }
  });

  // Enhanced heartbeat with more info
  socket.on('heartbeat', (data) => {
    const roomId = typeof data === 'string' ? data : data.roomId;
    const room = getRoomInfo(roomId);
    
    if (room) {
      room.lastActivity = Date.now();
      
      // Echo back with server time for latency measurement
      socket.emit('heartbeat-ack', {
        serverTime: Date.now(),
        roomParticipants: room.participants.size
      });
    }
  });

  // Force ICE restart support
  socket.on('request-ice-restart', (roomId) => {
    console.log(`ICE restart requested by ${socket.id} for room ${roomId}`);
    socket.to(roomId).emit('ice-restart-requested', {
      from: socket.id
    });
  });
});

// Periodic stats logging
setInterval(() => {
  if (rooms.size > 0 || io.sockets.sockets.size > 0) {
    console.log(`[STATS] Active rooms: ${rooms.size}, Connected clients: ${io.sockets.sockets.size}`);
    
    // Log room details
    rooms.forEach((room, roomId) => {
      const age = Math.floor((Date.now() - room.createdAt) / 1000 / 60);
      console.log(`  Room ${roomId}: ${room.participants.size} participants, ${age}min old, Transfer: ${room.transferInProgress}`);
    });
  }
}, 60000); // Every minute

const PORT = process.env.PORT || 3003;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`🚀 Enhanced P2P Signaling Server v2.0 running on ${HOST}:${PORT}`);
  console.log(`📡 Socket.IO server ready with NAT traversal support`);
  console.log(`🔒 CORS: ${process.env.NODE_ENV === 'production' ? 'Production mode' : 'Development mode (all origins allowed)'}`);
  console.log(`🌐 Server accessible at:`);
  console.log(`   - Local: http://localhost:${PORT}`);
  console.log(`   - Network: http://<your-ip>:${PORT}`);
  console.log(`⏱️ Room timeout: ${ROOM_TIMEOUT/1000/60} minutes`);
  console.log(`📊 Stats logging: Every 60 seconds`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  
  // Notify all clients
  io.emit('server-shutdown');
  
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  
  // Notify all clients
  io.emit('server-shutdown');
  
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// TURN server configuration
const turnConfig = {
  iceServers: [
    // ...existing STUN servers...
    {
      urls: "turn:standard.relay.metered.ca:80",
      username: process.env.NEXT_PUBLIC_METERED_TURN_USERNAME,
      credential: process.env.NEXT_PUBLIC_METERED_TURN_CREDENTIAL,
    },
    {
      urls: "turn:standard.relay.metered.ca:80",
      username: process.env.NEXT_PUBLIC_METERED_TURN_USERNAME_2,
      credential: process.env.NEXT_PUBLIC_METERED_TURN_CREDENTIAL_2,
    },
    {
      urls: "turn:standard.relay.metered.ca:80",
      username: process.env.NEXT_PUBLIC_METERED_TURN_USERNAME_3,
      credential: process.env.NEXT_PUBLIC_METERED_TURN_CREDENTIAL_3,
    },
    // ...add more as needed...
  ]
};