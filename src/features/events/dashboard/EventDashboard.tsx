import { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "./EventForm";
import { AppEvent } from "../../../app/types/event";
import { sampleData } from "../../../app/api/sampleData";

type Props = {
  isFormOpen: boolean;
  setIsFormOpen: (value: boolean) => void;
  selectedEvent: AppEvent | null;
  handleSelectEvent: (event: AppEvent | null) => void;
}


export default function EventDashboard({isFormOpen, setIsFormOpen, selectedEvent, handleSelectEvent}: Props) {

  const [events, setEvents] = useState<AppEvent[]>([]);

  useEffect(()=> {
    setEvents(sampleData);
  }, [])

  function addEvent(event: AppEvent) {
    setEvents(prevEvents => [...prevEvents, event]);
  }

  function updateEvent(updatedEvent: AppEvent) {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    handleSelectEvent(null);
    setIsFormOpen(false);
  }

  function deleteEvent(eventId: string) {
    setEvents(events.filter(event => event.id !== eventId))  
  }



  return (
    <Grid>

      <Grid.Column width={10}>  
        <EventList events={events} handleSelectEvent={handleSelectEvent} deleteEvent={deleteEvent} />
      </Grid.Column>

      <Grid.Column width={6}> 
        {isFormOpen && 
          <EventForm 
            key={selectedEvent ? selectedEvent.id : 'new'}//so react will re-render 
            setIsFormOpen={setIsFormOpen} 
            selectedEvent={selectedEvent} 
            addEvent={addEvent}
            updateEvent={updateEvent}
          />
        } 
      </Grid.Column>

    </Grid>
  )
}