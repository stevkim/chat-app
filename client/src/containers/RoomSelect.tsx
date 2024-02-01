import { ChangeEvent, useContext } from "react"
import { RoomContext, RoomState } from "../contexts/RoomContext"
import { NameContext, NameState } from "../contexts/NameContext"
import { Link } from "@tanstack/react-router"
import { socket } from "../utils/socket"
import ChooseName from "./ChooseName"
import { useQuery } from "@tanstack/react-query"
import { fetchRooms } from "../utils/fetch"

const RoomSelect = () => {
  const { room, setRoom } = useContext(RoomContext) as RoomState;
  const { name } = useContext(NameContext) as NameState;

  const { isPending, error, data } = useQuery({
    queryKey: ['roomsData'],
    queryFn: fetchRooms,
   })

  const handleSelect = (e:ChangeEvent<HTMLSelectElement>) => {
    setRoom(e.target.value);
  }

  const handleJoinRoom = () => {
    socket.emit('joinRoom', { name, room });
  }

  if (isPending) return  <div> Loading... </div>

  if (error) return <div>Error getting data!</div>

  return (
    <div className="selector">
      <ChooseName />
      <select onChange={(e) => handleSelect(e)} defaultValue={'default'}>
        <option value='default' disabled hidden>select a room</option>
        {
          data.map((room)=> {
            return <option key={room.id} value={room.name}>{room.name}</option>
          })
        }
      </select>
      <Link to={`/${room}`} onClick={handleJoinRoom}>Join Room</Link>
    </div>
  )
}
export default RoomSelect