import MessageForm from "../components/MessageForm"
import MessageList from "../components/MessageList"
import Activity from "../components/Activity"
import { useContext } from "react"
import { RoomContext, RoomState } from "../contexts/RoomContext"
import { Navigate } from "@tanstack/react-router"

const MessagePage = () => {
  const { room } = useContext(RoomContext) as RoomState;


  if (!room) {
    return <Navigate to='/' />
  }

  return (
    <div>
      <h1>Main Room</h1>
      <MessageList />
      <Activity />
      <MessageForm />
    </div>
  )
}
export default MessagePage