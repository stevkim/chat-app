import { useEffect, useState } from "react"
import { socket } from "../utils/socket"

const Activity = () => {
  const [activity, setActivity] = useState<string | null>();

  useEffect(() => {
    let clearActivity: ReturnType<typeof setTimeout>;

    socket.on('activity', (message) => {
      setActivity(message);

      clearTimeout(clearActivity);
      clearActivity = setTimeout(() => {
        setActivity(null);
      }, 1000);
    })
  }, [])

  return (
    <sub>{activity}</sub>
  )
}
export default Activity;