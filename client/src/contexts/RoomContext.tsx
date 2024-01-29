import { createContext } from "react";

export type RoomState = {
  room: string | null,
  setRoom: (name:string) => void
}

export const RoomContext = createContext<RoomState | null>(null);