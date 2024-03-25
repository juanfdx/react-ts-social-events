import { Outlet } from "react-router-dom"
import { Container } from "semantic-ui-react"
import Navbar from "./nav/Navbar"


function App() {

  return (
    <>
      <Navbar  />
      <Container className="main">
        <Outlet />
      </Container>
    </>
    
  )
}

export default App
