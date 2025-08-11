const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configure CORS for Express
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : [
        'http://localhost:3000', 'http://127.0.0.1:3000', 
        'http://localhost:3001', 'http://127.0.0.1:3001',
        'http://localhost:3002', 'http://127.0.0.1:3002',
        // Allow any IP address on the local network
        /^http:\/\/192\.168\.\d+\.\d+:3000$/,
        /^http:\/\/192\.168\.\d+\.\d+:3001$/,
        /^http:\/\/10\.\d+\.\d+\.\d+:3000$/,
        /^http:\/\/10\.\d+\.\d+\.\d+:3001$/,
        /^http:\/\/172\.(1[6-9]|2[0-9]|3[0-1])\.\d+\.\d+:3000$/,
        /^http:\/\/172\.(1[6-9]|2[0-9]|3[0-1])\.\d+\.\d+:3001$/
      ],
  credentials: true
}));

// Configure Socket.IO with CORS
const io = socketIO(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://your-domain.com'] 
      : [
        'http://localhost:3000', 'http://127.0.0.1:3000',
        'http://localhost:3002', 'http://127.0.0.1:3002',
        // Allow any IP address on the local network
        /^http:\/\/192\.168\.\d+\.\d+:3000$/,
        /^http:\/\/10\.\d+\.\d+\.\d+:3000$/,
        /^http:\/\/172\.(1[6-9]|2[0-9]|3[0-1])\.\d+\.\d+:3000$/
      ],
    methods: ['GET', 'POST'],
    credentials: true
  },
  transports: ['polling', 'websocket'], // Start with polling
  allowEIO3: true, // Allow Engine.IO v3 clients
  pingTimeout: 60000,
  pingInterval: 25000,
});

// Store rooms and their participants
const rooms = new Map();
const MAX_ROOM_SIZE = 2;
const ROOM_TIMEOUT = 10 * 60 * 1000; // 10 minutes

// Room management functions
function createRoom(roomId) {
  const room = {
    id: roomId,
    participants: new Set(),
    transferInProgress: false,
    createdAt: Date.now(),
    lastActivity: Date.now()
  };
  rooms.set(roomId, room);
  
  // Auto-cleanup room after timeout
  setTimeout(() => {
    if (rooms.has(roomId)) {
      console.log(`Room ${roomId} expired, cleaning up...`);
      const room = rooms.get(roomId);
      room.participants.forEach(socketId => {
        const socket = io.sockets.sockets.get(socketId);
        if (socket) {
          socket.emit('room-expired');
          socket.leave(roomId);
        }
      });
      rooms.delete(roomId);
    }
  }, ROOM_TIMEOUT);
  
  return room;
}

function getRoomInfo(roomId) {
  return rooms.get(roomId);
}

function addToRoom(roomId, socketId) {
  let room = getRoomInfo(roomId);
  if (!room) {
    room = createRoom(roomId);
  }
  
  room.participants.add(socketId);
  room.lastActivity = Date.now();
  return room;
}

function removeFromRoom(roomId, socketId) {
  const room = getRoomInfo(roomId);
  if (room) {
    room.participants.delete(socketId);
    if (room.participants.size === 0) {
      rooms.delete(roomId);
      console.log(`Room ${roomId} is empty, deleted`);
    }
  }
}

io.on('connection', (socket) => {
  const clientIP = socket.handshake.address || socket.request.connection.remoteAddress;
  console.log('Client connected:', socket.id, 'from IP:', clientIP);

  socket.on('join-room', (roomId) => {
    console.log(`${socket.id} wants to join room: ${roomId}`);
    
    const room = getRoomInfo(roomId);
    
    // Check if room is full
    if (room && room.participants.size >= MAX_ROOM_SIZE) {
      socket.emit('room-full', { room: roomId });
      return;
    }
    
    // Check if room is busy with transfer
    if (room && room.transferInProgress) {
      socket.emit('room-busy', { room: roomId });
      return;
    }
    
    // Add to room
    const updatedRoom = addToRoom(roomId, socket.id);
    socket.join(roomId);
    socket.roomId = roomId;
    
    console.log(`${socket.id} joined room ${roomId}. Room size: ${updatedRoom.participants.size}`);
    
    // Notify others in the room
    socket.to(roomId).emit('peer-joined', socket.id);
    
    // If room is full, enable transfer
    if (updatedRoom.participants.size === MAX_ROOM_SIZE) {
      io.to(roomId).emit('room-ready');
    }
  });

  socket.on('webrtc-offer', (data) => {
    socket.to(data.roomId).emit('webrtc-offer', {
      offer: data.offer,
      from: socket.id
    });
  });

  socket.on('webrtc-answer', (data) => {
    socket.to(data.roomId).emit('webrtc-answer', {
      answer: data.answer,
      from: socket.id
    });
  });

  socket.on('webrtc-ice-candidate', (data) => {
    socket.to(data.roomId).emit('webrtc-ice-candidate', {
      candidate: data.candidate,
      from: socket.id
    });
  });

  socket.on('transfer-start', (roomId) => {
    const room = getRoomInfo(roomId);
    if (room) {
      room.transferInProgress = true;
      room.lastActivity = Date.now();
      socket.to(roomId).emit('transfer-started');
    }
  });

  socket.on('transfer-complete', (roomId) => {
    const room = getRoomInfo(roomId);
    if (room) {
      room.transferInProgress = false;
      room.lastActivity = Date.now();
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
    }
  });

  socket.on('disconnect', () => {
    const clientIP = socket.handshake.address || socket.request.connection.remoteAddress;
    console.log('Client disconnected:', socket.id, 'from IP:', clientIP);
    
    if (socket.roomId) {
      const roomId = socket.roomId;
      removeFromRoom(roomId, socket.id);
      
      // Notify others in the room
      socket.to(roomId).emit('peer-disconnected', socket.id);
    }
  });

  // Heartbeat to keep room activity updated
  socket.on('heartbeat', (roomId) => {
    const room = getRoomInfo(roomId);
    if (room) {
      room.lastActivity = Date.now();
    }
  });
});

const PORT = process.env.PORT || 3003;
const HOST = process.env.HOST || '0.0.0.0'; // Bind to all network interfaces

server.listen(PORT, HOST, () => {
  console.log(`🚀 P2P Signaling Server running on ${HOST}:${PORT}`);
  console.log(`📡 Socket.IO server ready for connections`);
  console.log(`🔒 CORS enabled for development mode`);
  console.log(`🌐 Accessible from network at http://<your-ip>:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
