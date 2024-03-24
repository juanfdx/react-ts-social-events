import { Button, Icon, Item, ItemGroup, List, Segment, SegmentGroup } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { AppEvent } from "../../../app/types/event";

type Props = {
  event: AppEvent
}


export default function EventListItem({event}: Props) {

  return (
    <SegmentGroup>

      <Segment>
        <ItemGroup>
          <Item>
            <Item.Image size="tiny" circular src={event.hostPhotoURL} />
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
        <Button floated='right' color='teal' content='View'></Button>
      </Segment>

    </SegmentGroup>
  )
}