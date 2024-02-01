import express from 'express';
import { getAllRooms } from '../controllers/rooms.js';

const roomRouter = express.Router();

roomRouter.route('/')
  .get(async (req, res) => {
    const result = await getAllRooms();

    if (result) {
      res.status(200).json(result);
    } else {
      res.sendStatus(500);
    }
  })



export default roomRouter;