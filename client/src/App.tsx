import { Outlet, Link } from "@tanstack/react-router"
import ContextProvider from "./contexts/ContextProvider";

function App() {

  return (
    <>
      <div className="navbar">
        <Link to='/'>Home</Link>
      </div>
      <ContextProvider>
        <Outlet />
      </ContextProvider>
    </>
  )
}

export default App
