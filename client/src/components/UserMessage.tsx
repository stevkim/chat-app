import type { TMessage } from "../utils/types";
import { useContext } from "react";
import { NameContext, NameState } from "../contexts/NameContext";

interface Props {
  message: TMessage
}

const UserMessage = ({ message }:Props) => {
  const { name } = useContext(NameContext) as NameState

  return (
    <div className={message.name === name ? 'user-message' : 'sender-message'}>
      <li><span className="message-name">{message.name === name ? '' : message.name}</span>{message.text}</li>
      <sub className="message-date">{message.timestamp}</sub>
    </div>
  )
}
export default UserMessage