import { useContext } from "react"
import { NameContext, NameState } from "../contexts/NameContext";

const ChooseName = () => {
  const { setName } = useContext(NameContext) as NameState

  return (
    <div>
      <input type='text' onChange={(e) => setName(e.target.value)}/>
    </div>
  )
}
export default ChooseName