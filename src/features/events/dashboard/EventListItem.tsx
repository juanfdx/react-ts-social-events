import { Button, Icon, Item, ItemGroup, List, Segment, SegmentGroup } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { AppEvent } from "../../../app/types/event";

type Props = {
  event: AppEvent;
  handleSelectEvent: (event: AppEvent) => void;
  deleteEvent: (eventId: string) => void;
}


export default function EventListItem({event, handleSelectEvent, deleteEvent}: Props) {

  return (
    <SegmentGroup>

      <Segment>
        <ItemGroup>
          <Item>
            <Item.Image size="tiny" circular src={event.hostPhotoURL || '/user.png'} />
            <Item.Content verticalAlign='middle'>
              <Item.Header>{event.title}</Item.Header>
              <Item.Description>
                Hosted by {event.hostedBy}
              </Item.Description>
            </Item.Content>
          </Item>
        </ItemGroup>
      </Segment>

      <Segment>
        <span>
          <Icon name='clock'/>{event.date} &nbsp;&nbsp;
          <Icon name='marker'/>{event.venue}
        </span>
      </Segment>

      <Segment secondary >
        <List horizontal >
          {event.attendees.map((attendee: any) => 
          
            <EventListAttendee key={attendee.id} attendee={attendee} />
          
          )}
        </List>
      </Segment>

      <Segment clearing>
        <span style={{display: 'block', marginBottom: '30px' }}>{event.description}</span>
        <Button 
          floated='right' 
          color='red' 
          content='Delete' 
          onClick={() => deleteEvent(event.id)}
          >
        </Button>
        <Button 
          style={{marginRight: '2px'}}
          floated='right' 
          color='teal' 
          content='View' 
          onClick={() => handleSelectEvent(event)}
          >
        </Button>
      </Segment>

    </SegmentGroup>
  )
}