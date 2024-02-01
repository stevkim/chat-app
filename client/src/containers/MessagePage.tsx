import MessageForm from "../components/MessageForm"
import MessageList from "../components/MessageList"
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
      <h1>{room}</h1>
      <MessageList />
      <MessageForm />
    </div>
  )
}
export default MessagePage