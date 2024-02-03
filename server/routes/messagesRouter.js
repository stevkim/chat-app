import { getMessagesFromRoom } from '../controllers/messages.js';
import express from 'express';

const messagesRouter = express.Router();

messagesRouter.route('/')
  .get(async (req, res) => {
    const data = await getMessagesFromRoom(req.query.room);

    if (data) {
      res.status(200).json(data);
    } else {
      res.sendStatus(500);
    }
  })

export default messagesRouter;

