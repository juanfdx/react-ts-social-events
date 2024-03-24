import { useState } from "react"
import { AppEvent } from "../types/event"
import { Container } from "semantic-ui-react"
import EventDashboard from "../../features/events/dashboard/EventDashboard"
import Navbar from "./nav/Navbar"


function App() {

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);

  function handleSelectEvent(event: AppEvent | null) {
    setSelectedEvent(event);
    setIsFormOpen(true);
  }

  function handleCreateFormOpen() {
    setSelectedEvent(null);
    setIsFormOpen(true);
  }


  return (
    <>
      <Navbar handleCreateFormOpen={handleCreateFormOpen} />
      <Container className="main">
        <EventDashboard 
          isFormOpen={isFormOpen} 
          setIsFormOpen={setIsFormOpen} 
          selectedEvent={selectedEvent} 
          handleSelectEvent={handleSelectEvent}
        />
      </Container>
    </>
    
  )
}

export default App
