import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);

// Configure CORS
app.use(cors());

// Socket.IO server with CORS configuration
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// In-memory storage
const onlineUsers = new Map(); // socketId -> username

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user join
  socket.on('join', (username) => {
    onlineUsers.set(socket.id, username);
    socket.username = username;
    
    console.log(`${username} joined the chat`);
    
    // Broadcast to all users that someone joined
    io.emit('userJoined', {
      username,
      message: `${username} joined the chat`,
      timestamp: new Date().toISOString()
    });
    
    // Send updated online users list to all clients
    io.emit('getOnlineUsers', Array.from(onlineUsers.values()));
  });

  // Handle incoming messages
  socket.on('sendMessage', (data) => {
    const messageData = {
      username: socket.username,
      message: data.message,
      timestamp: new Date().toISOString()
    };
    
    console.log('Message from', socket.username, ':', data.message);
    
    // Broadcast message to all connected users
    io.emit('receiveMessage', messageData);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const username = onlineUsers.get(socket.id);
    
    if (username) {
      console.log(`${username} left the chat`);
      
      onlineUsers.delete(socket.id);
      
      // Broadcast to all users that someone left
      io.emit('userLeft', {
        username,
        message: `${username} left the chat`,
        timestamp: new Date().toISOString()
      });
      
      // Send updated online users list
      io.emit('getOnlineUsers', Array.from(onlineUsers.values()));
    }
  });
});

const PORT = 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Socket.IO server ready for connections');
});
