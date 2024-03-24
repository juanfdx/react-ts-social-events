import { useState } from "react"
import { Container } from "semantic-ui-react"
import EventDashboard from "../../features/events/dashboard/EventDashboard"
import Navbar from "./nav/Navbar"

function App() {

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)

  return (
    <>
      <Navbar setFormOpen={setIsFormOpen} />
      <Container className="main">
        <EventDashboard isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
      </Container>
    </>
    
  )
}

export default App
