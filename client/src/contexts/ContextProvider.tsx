import { ReactNode, useState, useEffect, useCallback } from "react"
import { NameContext } from "./NameContext"
import { RoomContext } from "./RoomContext"
import { MessageListContext } from "./MessageListContext"
import type { TRooms } from "../utils/types"
import type { TMessage } from "../utils/types"
import { socket } from "../utils/socket"
import { useQuery } from "@tanstack/react-query"
import { fetchMessage } from "../utils/fetch"

interface Props {
  children: ReactNode
}

const ContextProvider = ({ children }:Props) => {
  const [room, setRoom] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [roomList, setRoomList] = useState<TRooms[]>([]);
  const [msgList, setMsgList] = useState<TMessage[]>([]);

  const handleRoomChange = (input: string) => {
    setRoom(input);
    socket.emit('joinRoom', { name, room: input });
  }

  const handleJoinedRoom = useCallback(() => {
    socket.emit('joinedRoom', { name, room });
  }, [name, room])

  useEffect(() => {
    socket.on('msg', data => {
      setMsgList(prev => [...prev, data])
    })
  }, [])

  const { data } = useQuery({
    queryKey: ['messages', room],
    queryFn: () => fetchMessage(room)
  })

  useEffect(() => {
    if (data) {
      setMsgList(data);
      handleJoinedRoom();
    }
  }, [data, handleJoinedRoom])

  return (
    <NameContext.Provider value={{ name, setName }}>
      <RoomContext.Provider value={{ room, handleRoomChange, roomList, setRoomList }}>
        <MessageListContext.Provider value={{ msgList, setMsgList }}>
          {children}
        </MessageListContext.Provider>
      </RoomContext.Provider>
    </NameContext.Provider>
  )
}
export default ContextProvider