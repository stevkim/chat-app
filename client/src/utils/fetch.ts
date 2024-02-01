

export type TRooms = {
  id: number,
  name: string
}

export const fetchRooms = (): Promise<TRooms[]> => {
  return fetch('http://localhost:3000/api/rooms').then(res => {
    console.log(res);
    return res.json();
  })
}