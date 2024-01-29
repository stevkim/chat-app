import { ChangeEvent, useContext } from "react"
import { RoomContext, RoomState } from "../contexts/RoomContext"
import { NameContext, NameState } from "../contexts/NameContext"
import { Link } from "@tanstack/react-router"
import { socket } from "../utils/socket"
import ChooseName from "./ChooseName"

const ROOMS = [
  'room1',
  'room2',
  'room3'
]

const RoomSelect = () => {
  const { room, setRoom } = useContext(RoomContext) as RoomState;
  const { name } = useContext(NameContext) as NameState;

  const handleSelect = (e:ChangeEvent<HTMLSelectElement>) => {
    setRoom(e.target.value);
  }

  const handleJoinRoom = () => {
    socket.emit('joinRoom', { name, room });
  }

  return (
    <div className="selector">
      <ChooseName />
      <select onChange={(e) => handleSelect(e)} defaultValue={ROOMS[0]}>
        {
          ROOMS.map(room => {
            return <option key={room} value={room}>{room}</option>
          })
        }
      </select>
      <Link to={`/${room}`} onClick={handleJoinRoom}>Join Room</Link>
    </div>
  )
}
export default RoomSelect