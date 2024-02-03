import type { TRooms } from "../utils/types"
import { Link } from "@tanstack/react-router"
import { useContext } from "react"
import { RoomContext, RoomState } from "../contexts/RoomContext"

interface Props {
  room: TRooms
}

const RoomIcon = ({ room }: Props) => {
  const { handleRoomChange } = useContext(RoomContext) as RoomState;

  return (
    <Link to={`/${room.name}`} className='room-icon' onClick={() => handleRoomChange(room.name)} >
      <img style={{ position: 'absolute', borderRadius: '50%' }} src={room.image} width={100} height={100} alt={room.name}/>
      <div className="room-icon-name">{room.name}</div>
    </Link>
  )
}
export default RoomIcon