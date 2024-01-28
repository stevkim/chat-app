import { useState, useEffect } from "react";
import { socket } from "../utils/socket";


export type Message = {
  id: string,
  text: string
}

const MessageList = () => {
  const [msgList, setMsgList] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('msg', data => {
      setMsgList(prev => [...prev, data]);
    })
  }, [])

  return (
    <ul className="message-list">
      {
        msgList.map(message => {
          return <li key={message.text}><span>{message.id}: </span> {message.text}</li>
        })
      }
    </ul>
  )
}

export default MessageList;