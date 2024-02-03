import { useEffect, useRef, useContext } from "react";
import SystemMessage from "./SystemMessage";
import UserMessage from "./UserMessage";
import Activity from "./Activity";
import { MessageListContext, MessageListState } from "../contexts/MessageListContext";

const MessageList = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { msgList } = useContext(MessageListContext) as MessageListState;

  useEffect(() => {
    // scroll back to bottom when a new message is added
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgList])

  return (
    <ul className="message-list">
      {
        msgList.map(message => {
          if (message.name === 'System') {
            return <SystemMessage key={Date.now()} message={message} />
          } else {
            return <UserMessage key={message.timestamp} message={message} />
          }
        })
      }
      <div ref={bottomRef}></div>
      <Activity />
    </ul>
  )
}

export default MessageList;