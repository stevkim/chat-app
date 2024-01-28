import { socket } from "../utils/chat";
import { useState, FormEvent } from "react";

const MessageForm = () => {
  const [message, setMessage] = useState<string>('');

  const handleSend = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('message', message);
    setMessage('')
  };

  return (
    <form onSubmit={(e) => handleSend(e)}>
      <input type='text' value={message} onChange={(e) => setMessage(e.target.value)}/>
      <button type='submit'>
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1em', height: '1em' }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
      </svg>
      </button>
    </form>
  )
}

export default MessageForm;