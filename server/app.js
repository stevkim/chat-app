import { Server } from 'socket.io';
import { createServer } from 'http';

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173']
  }
});

io.on('connection', socket => {
  console.log(socket.id)

  socket.on('message', data => {
    console.log(data);
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('disconnected')
    io.emit('message', `${socket.id} has left.`)
  })
})

httpServer.listen(3001, () => {
  console.log('Listening on port 3001');
})