import express from 'express';
import 'dotenv/config'
import { Server } from 'socket.io';
import { addMessage, getMessagesFromRoom } from './controllers/messages.js';
import { getCurrentRoom, updateCurrentRoom, setCurrentRoom } from './controllers/rooms.js';
import roomRouter from './routes/roomRouter.js';
import messagesRouter from './routes/messagesRouter.js';
import cors from 'cors';

const app = express();
const clientPORT = 5173;
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/rooms', roomRouter);
app.use('/api/messages', messagesRouter);

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

export const io = new Server(server, {
  cors: [`http://localhost:${clientPORT}`, `http://127.0.0.1:${clientPORT}`]
})

io.on('connection', socket => {
  socket.on('joinRoom', async ({ name, room }) => {

    const prevRoom = await getCurrentRoom(name);

    if (prevRoom) {
      socket.leave(prevRoom);
      await updateCurrentRoom({ name, room });
    } else {
      await setCurrentRoom({ name, room });
    }
    socket.join(room)
  })

  socket.on('joinedRoom', ({ name, room }) => {
    // Message to the user that connected
    socket.emit('msg', createSystemMessage(`Welcome to Miscord! - Room ${room}`));
    // Message to everyone else in the room
    socket.broadcast.to(room).emit('msg', createSystemMessage(`User ${name} has joined the room.`))
  })

  socket.on('msg', async (data) => {
    console.log(data)
    // format and send message to everyone in the room
    const formatted = createMessage(data);
    io.to(formatted.room).emit('msg', formatted);

    // Message needs to be saved on the backend
    // addMessage will only return on error
    const error = await addMessage(formatted);

    if (error) {
      socket.emit('msg', createSystemMessage('Internal server error: Message might not have been sent!'))
    }
  })

  socket.on('disconnect', () => {
    // Sends a message to everyone in the room when someone leaves.
    socket.broadcast.emit('msg', createSystemMessage(`${socket.id.substring(0, 8)} has left.`))
  })

  socket.on('activity', data => {
    const { name, room } = data;
    // Message to frontend to show activity
    socket.broadcast.to(room).emit('activity', `${name} is typing...`);
  })
})

function createMessage(data) {
  data.timestamp = Date.now();
  return data;
}

function createSystemMessage(text) {
  return {
    name: 'System',
    text,
    timestamp: Date.now()
  }
}