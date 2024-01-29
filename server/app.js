import express from 'express';
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

  // Message to the user that connected
  socket.emit('msg', { id: 'System', text: 'Welcome to Miscord!'})

  // Message to everyone else in the room
  socket.broadcast.emit('msg', { id: 'System', text: `User ${socket.id.substring(0, 8)}} has joined the room.`})

  socket.on('msg', data => {
    console.log(data);
    io.emit('msg', { id: socket.id.substring(0, 8), text: data });
  })

  socket.on('disconnect', () => {
    console.log('Disconnected');
    socket.broadcast.emit('msg', { id: 'System', text: `${socket.id.substring(0, 8)} has left.` })
  })

  socket.on('activity', (name) => {
    console.log(name)
    socket.broadcast.emit('activity', `${name} is typing...`);
  })
})