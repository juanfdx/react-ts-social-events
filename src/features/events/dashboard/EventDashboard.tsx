import { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "./EventForm";
import { AppEvent } from "../../../app/types/event";
import { sampleData } from "../../../app/api/sampleData";

type Props = {
  isFormOpen: boolean;
  setIsFormOpen: (value: boolean) => void;
}


export default function EventDashboard({isFormOpen, setIsFormOpen}: Props) {

  const [events, setEvents] = useState<AppEvent[]>([]);

  useEffect(()=> {
    setEvents(sampleData);
  }, [])


  return (
    <Grid>

      <Grid.Column width={10}>  
        <EventList events={events} />
      </Grid.Column>

      <Grid.Column width={6}> 
        {isFormOpen && <EventForm setIsFormOpen={setIsFormOpen} />} 
      </Grid.Column>

    </Grid>
  )
}