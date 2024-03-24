import { AppEvent } from "../../../app/types/event";
import EventListItem from "./EventListItem";

type Props = {
  events: AppEvent[];
  handleSelectEvent: (event: AppEvent) => void;
  deleteEvent: (eventId: string) => void;
}

export default function EventList({events, handleSelectEvent, deleteEvent}: Props) {

  return ( 
    <>
      {events.map((event) =>
        <EventListItem 
          key={event.id} 
          event={event} 
          handleSelectEvent= {handleSelectEvent} 
          deleteEvent={deleteEvent}
        />
      )}
    </>
  )
}