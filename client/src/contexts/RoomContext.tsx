import { createContext } from "react";
import type { TRooms } from "../utils/types";

export type RoomState = {
  room: string | null,
  handleRoomChange: (name:string) => void,
  roomList: TRooms[] | [],
  setRoomList: (TRooms: TRooms[]) => void
}

export const RoomContext = createContext<RoomState | null>(null);