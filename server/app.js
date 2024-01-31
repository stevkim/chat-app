import express from 'express';
import 'dotenv/config'
import { Server } from 'socket.io';

const app = express();
const clientPORT = 5173;
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

const io = new Server(server, {
  cors: [`http://localhost:${clientPORT}`, `http://127.0.0.1:${clientPORT}`]
})

io.on('connection', socket => {
  socket.on('joinRoom', ({name, room}) => {
    socket.join(room)
    // Message to the user that connected
    io.to(room).emit('msg', { id: 'System', text: `Welcome to Miscord! - Room ${room}`})
    // Message to everyone else in the room
    socket.broadcast.to(room).emit('msg', { id: 'System', text: `User ${name} has joined the room.`})
  })

  socket.on('msg', data => {
    const { name, text, room } = data;
    io.to(room).emit('msg', { id: name, text: text });
  })

  socket.on('disconnect', () => {
    console.log('Disconnected');
    socket.broadcast.emit('msg', { id: 'System', text: `${socket.id.substring(0, 8)} has left.` })
  })

  socket.on('activity', data => {
    const { name, room } = data;
    socket.broadcast.to(room).emit('activity', `${name} is typing...`);
  })
})