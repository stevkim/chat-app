import { useState, useEffect, useRef } from "react";
import { socket } from "../utils/socket";
import SystemMessage from "./SystemMessage";
import UserMessage from "./UserMessage";
import type { TMessage } from "../utils/types";
import Activity from "./Activity";

const MessageList = () => {
  const [msgList, setMsgList] = useState<TMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on('msg', data => {
      if (Array.isArray(data)) {
        setMsgList(prev => [...prev, ...data]);
      } else {
        setMsgList(prev => [...prev, data]);
      }
    })
  }, [])

  useEffect(() => {
    // scroll back to bottom when a new message is added
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgList])

  return (
    <ul className="message-list">
      {
        msgList.map(message => {
          if (message.name === 'System') {
            return <SystemMessage message={message} />
          } else {
            return <UserMessage message={message} />
          }
        })
      }
      <div ref={bottomRef}></div>
      <Activity />
    </ul>
  )
}

export default MessageList;