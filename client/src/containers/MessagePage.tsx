import MessageForm from "../components/MessageForm"
import MessageList from "../components/MessageList"
import RoomSelection from "../components/RoomSelection"
import { useContext } from "react"
import { RoomContext, RoomState } from "../contexts/RoomContext"
import { Navigate } from "@tanstack/react-router"

const MessagePage = () => {
  const { room } = useContext(RoomContext) as RoomState;


  if (!room) {
    return <Navigate to='/' />
  }

  return (
    <div className="message-page">
      <RoomSelection />
      <section>
        <h1>{room}</h1>
        <MessageList />
        <MessageForm />
      </section>
    </div>
  )
}
export default MessagePage