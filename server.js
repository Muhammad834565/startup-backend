const express = require('express');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');
const connectDB = require('./config/db');
const profileRoutes = require('./routes/profileRoutes');

const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/profile', profileRoutes);

connectDB();

io.on('connection', (socket) => {
  console.log('New socket connection:', socket.id);

  // Listen for new message events from clients
  socket.on('sendMessage', async ({ sender, receiver, content }) => {
    try {
      const message = new Message({ sender, receiver, content });
      await message.save(); // Save message to DB

      // Emit the message to the specific receiver
      io.to(receiver).emit('newMessage', message);
      io.to(sender).emit('newMessage', message); // Optionally, emit to sender as well
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  