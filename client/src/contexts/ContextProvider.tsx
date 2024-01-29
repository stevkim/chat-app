import { ReactNode, useState } from "react"
import { NameContext } from "./NameContext"
import { RoomContext } from "./RoomContext"

interface Props {
  children: ReactNode
}

const ContextProvider = ({ children }:Props) => {
  const [room, setRoom] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null)

  return (
    <NameContext.Provider value={{ name, setName }}>
      <RoomContext.Provider value={{ room, setRoom }}>
      {children}
      </RoomContext.Provider>
    </NameContext.Provider>
  )
}
export default ContextProvider