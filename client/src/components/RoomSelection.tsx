import { useContext } from "react"
import { RoomContext, RoomState } from "../contexts/RoomContext"
import RoomIcon from "./RoomIcon";

const RoomSelection = () => {
  const { roomList } = useContext(RoomContext) as RoomState;

  return (
    <div className="room-list">
      <h2>Rooms</h2>
      <div className="divider"></div>
      {
        roomList.map(room => {
          return <RoomIcon key={room.name} room={room} />
        })
      }
    </div>
  )
}
export default RoomSelection