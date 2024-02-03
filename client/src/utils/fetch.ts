import type { TRooms, TMessage } from "./types"

export const fetchRooms = (): Promise<TRooms[]> => {
  return fetch('http://localhost:3000/api/rooms').then(res => {
    return res.json();
  })
}

export const fetchMessage = (room: string | null): Promise<TMessage[]> | null => {
  if (!room) return null
  return fetch(`http://localhost:3000/api/messages?room=${room}`).then(res => {
    return res.json();
  })
}