import type { TMessage } from "../utils/types"


interface Props {
  message: TMessage
}

const SystemMessage = ({ message }) => {
  return (
    <li key={message.text + }>{message.text}</li>
  )
}
export default SystemMessage