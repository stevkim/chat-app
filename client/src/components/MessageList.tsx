import { useState, useEffect } from "react";
import { socket } from "../utils/socket";


export type Message = {
  id: number,
  name: string,
  text: string
  room: string,
  timestamp: number
}

const MessageList = () => {
  const [msgList, setMsgList] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('msg', data => {
      if (Array.isArray(data)) {
        setMsgList(prev => [...prev, ...data]);
      } else {
        setMsgList(prev => [...prev, data]);
      }
    })
  }, [])

  return (
    <ul className="message-list">
      {
        msgList.map(message => {
          return <li key={message.timestamp}><span>{message.name}: </span> {message.text}</li>
        })
      }
    </ul>
  )
}

export default MessageList;