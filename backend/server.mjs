import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import youtubeRoutes from './routes/youtube.mjs';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST']
  }
});

// Configure CORS more explicitly
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api/youtube', youtubeRoutes);

// Global reaction state - in production this should be stored in a database
let songReactions = {}; // Structure: { songId: { emoji: count } }
let activeUsers = {}; // Structure: { songId: { userId: userData } }

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join a song room when user starts practicing
  socket.on('join-song', ({ songId, userId, userName }) => {
    socket.join(`song-${songId}`);
    socket.songId = songId;
    socket.userId = userId;
    socket.userName = userName;
    
    // Initialize song reactions if not exists
    if (!songReactions[songId]) {
      songReactions[songId] = {};
    }
    
    // Track active users
    if (!activeUsers[songId]) {
      activeUsers[songId] = {};
    }
    activeUsers[songId][userId] = { userName, socketId: socket.id };
    
    console.log(`User ${userName} (${userId}) joined song room: ${songId}`);
    
    // Send current reaction state to the new user
    socket.emit('reaction-update', {
      songId,
      reactions: songReactions[songId],
      activeUsers: Object.keys(activeUsers[songId]).length
    });
    
    // Notify others in the room
    socket.to(`song-${songId}`).emit('user-joined', {
      userId,
      userName,
      message: `${userName} joined the practice session`,
      activeUsers: Object.keys(activeUsers[songId]).length
    });
  });

  // Handle emoji reactions with counting
  socket.on('add-reaction', ({ emoji, songId, userId, userName }) => {
    console.log(`Emoji ${emoji} sent by ${userName} in song ${songId}`);
    
    // Initialize song reactions if not exists
    if (!songReactions[songId]) {
      songReactions[songId] = {};
    }
    
    // Increment reaction count
    songReactions[songId][emoji] = (songReactions[songId][emoji] || 0) + 1;
    
    // Broadcast updated reaction state to all users in the song room
    io.to(`song-${songId}`).emit('reaction-update', {
      songId,
      reactions: songReactions[songId],
      activeUsers: activeUsers[songId] ? Object.keys(activeUsers[songId]).length : 0
    });
    
    // Also send individual emoji for floating animation
    socket.to(`song-${songId}`).emit('emoji-received', {
      emoji,
      userId,
      userName,
      timestamp: Date.now(),
      id: Math.random().toString(36).substr(2, 9)
    });
  });

  // Handle legacy emoji sending (for backward compatibility)
  socket.on('send-emoji', ({ emoji, songId, userId, userName }) => {
    console.log(`Legacy emoji ${emoji} sent by ${userName} in song ${songId}`);
    
    // Treat as add-reaction
    socket.emit('add-reaction', { emoji, songId, userId, userName });
  });

  // Leave song room
  socket.on('leave-song', ({ songId, userId, userName }) => {
    socket.leave(`song-${songId}`);
    
    // Remove from active users
    if (activeUsers[songId] && activeUsers[songId][userId]) {
      delete activeUsers[songId][userId];
    }
    
    console.log(`User ${userName} left song room: ${songId}`);
    
    // Notify others in the room
    socket.to(`song-${songId}`).emit('user-left', {
      userId,
      userName,
      message: `${userName} left the practice session`,
      activeUsers: activeUsers[songId] ? Object.keys(activeUsers[songId]).length : 0
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    if (socket.songId && socket.userId && socket.userName) {
      // Remove from active users
      if (activeUsers[socket.songId] && activeUsers[socket.songId][socket.userId]) {
        delete activeUsers[socket.songId][socket.userId];
      }
      
      // Notify others in the room about disconnection
      socket.to(`song-${socket.songId}`).emit('user-left', {
        userId: socket.userId,
        userName: socket.userName,
        message: `${socket.userName} disconnected`,
        activeUsers: activeUsers[socket.songId] ? Object.keys(activeUsers[socket.songId]).length : 0
      });
    }
  });

  // Get reaction stats for a song
  socket.on('get-reactions', ({ songId }) => {
    socket.emit('reaction-update', {
      songId,
      reactions: songReactions[songId] || {},
      activeUsers: activeUsers[songId] ? Object.keys(activeUsers[songId]).length : 0
    });
  });
});

server.listen(3000, () => console.log('Server with Socket.io listening on port 3000'));
