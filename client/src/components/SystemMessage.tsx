import type { TMessage } from "../utils/types"


interface Props {
  message: TMessage
}

const SystemMessage = ({ message }:Props) => {
  return (
    <li key={message.timestamp} className="system-message">{message.text}</li>
  )
}
export default SystemMessage