import { useEffect, useState } from "react"
import { socket } from "../utils/socket"

const Activity = () => {
  const [activity, setActivity] = useState<string | null>();

  useEffect(() => {
    let clearActivity: ReturnType<typeof setTimeout>;

    socket.on('activity', (name) => {
      setActivity(name);

      clearTimeout(clearActivity);
      clearActivity = setTimeout(() => {
        setActivity(null);
      }, 2000);
    })
  }, [])

  return (
    <sub>{activity}</sub>
  )
}
export default Activity;