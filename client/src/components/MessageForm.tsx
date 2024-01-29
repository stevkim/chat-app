import { ChangeEvent, FormEvent, useState } from "react";
import { socket } from "../utils/socket";
import { useContext } from "react";
import { RoomContext, RoomState } from "../contexts/RoomContext";
import { NameContext, NameState } from "../contexts/NameContext";

const MessageForm = () => {
  const [message, setMessage] = useState<string>('');
  const { room } = useContext(RoomContext) as RoomState;
  const { name } = useContext(NameContext) as NameState;

  const handleSend = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('msg', { name, room, text: message });
    setMessage('');
  }

  const handleActivity = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    socket.emit('activity', { name, room });
    setMessage(e.target.value);
  }

  return (
    <form onSubmit={(e) => handleSend(e)}>
      <input type='text' value={message} onChange={(e) => handleActivity(e)} />
      <button type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1em', height: '1em'}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
      </button>
    </form>
  )
}

export default MessageForm;