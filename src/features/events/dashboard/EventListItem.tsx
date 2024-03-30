import { Link } from "react-router-dom";
import { Button, Icon, Item, ItemGroup, Label, List, Segment, SegmentGroup } from "semantic-ui-react";
//redux
import EventListAttendee from "./EventListAttendee";
//type
import { AppEvent } from "../../../app/types/event";
//hook
// import { useFireStore } from "../../../app/hooks/fireStore/useFireStore";


type Props = {
  event: AppEvent;
}


export default function EventListItem({event}: Props) {

  /* 
  * NOTE:
  * Maybe we don't want to show Delete button in client side of the app
  * so we will hide button, and also commenting remove functionality
   */
  // const {remove} = useFireStore('events');



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
              {event.isCancelled &&
                <Label
                  style={{top: '-40px'}}
                  ribbon='right'
                  color='red'
                  content='This event has been cancelled'
                />
              }
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
          {event.attendees.map(attendee => 
          
            <EventListAttendee key={attendee.id} attendee={attendee} />
          
          )}
        </List>
      </Segment>

      <Segment clearing>
        <span style={{display: 'block', marginBottom: '30px' }}>{event.description}</span>
        {/* <Button 
          floated='right' 
          color='red' 
          content='Delete' 
          onClick={() => remove(event.id)}
        >
        </Button> */}
        <Button 
          as={Link}
          to={`/events/${event.id}`}
          style={{marginRight: '2px'}}
          floated='right' 
          color='teal' 
          content='View' 
        >
        </Button>
      </Segment>

    </SegmentGroup>
  )
}