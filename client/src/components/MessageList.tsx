import { useState, useEffect } from "react";
import { socket } from "../utils/socket";
import SystemMessage from "./SystemMessage";
import UserMessage from "./UserMessage";
import type { TMessage } from "../utils/types";
import Activity from "./Activity";

const MessageList = () => {
  const [msgList, setMsgList] = useState<TMessage[]>([]);

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
          if (message.name === 'System') {
            return <SystemMessage message={message} />
          }
          return <UserMessage message={message} />
        })
      }
      <Activity />
    </ul>
  )
}

export default MessageList;