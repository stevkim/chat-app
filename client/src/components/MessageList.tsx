import { socket } from "../utils/chat";
import { useEffect, useState } from "react";

const MessageList = () => {
  const [mList, setMList] = useState<string[]>([]);

  useEffect(() => {
    socket.on('message', (data) => {
      setMList(state => [...state, data]);
    })
  }, [])

  return (
    <ul className="message-list">
      {
        mList.map((message) => {
          return <li key={message}>{message}</li>
        })
      }
    </ul>
  )
}

export default MessageList;