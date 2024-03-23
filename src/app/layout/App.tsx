import { Container } from "semantic-ui-react"
import EventDashboard from "../../features/events/dashboard/EventDashboard"
import Navbar from "./nav/Navbar"

function App() {

  return (
    <>
      <Navbar />
      <Container className="main">
        <EventDashboard />
      </Container>
    </>
    
  )
}

export default App
