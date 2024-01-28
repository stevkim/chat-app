import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();

const clientPORT = 5173;

const io = new Server(httpServer, {
  cors: [`http://localhost:${clientPORT}`, `http://127.0.0.1:${clientPORT}`]
})

io.on('connection', socket => {
  io.emit('msg', { id: 'System', text: `${socket.id.substring(0, 8)} has joined the room.` })

  socket.on('msg', data => {
    console.log(data);
    io.emit('msg', { id: socket.id.substring(0, 8), text: data });
  })

  socket.on('disconnect', () => {
    console.log('Disconnected');
    io.emit('msg', { id: 'System', text: `${socket.id.substring(0, 8)} has left.` })
  })
})

httpServer.listen(3000, () => {
  console.log('Listening on port 3000');
})