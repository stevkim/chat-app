import type { TMessage } from "../utils/types"


interface Props {
  message: TMessage
}

const SystemMessage = ({ message }:Props) => {
  return (
    <li className="system-message">{message.text}</li>
  )
}
export default SystemMessage