export type TRooms = {
  id: number,
  name: string,
  image: string
}


export type TMessage = {
  id: number | undefined,
  name: string,
  text: string,
  room: string,
  timestamp: number | undefined
}