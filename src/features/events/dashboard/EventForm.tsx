import { Button, Container, Form, Header, Segment } from "semantic-ui-react";

type Props = {
  setIsFormOpen: (value: boolean) => void;
}


export default function EventForm({setIsFormOpen}: Props) {
  
  return (
    <Segment>
      <Header content='Create Event' />
      <Form>
        <Form.Field>
          <input type="text" placeholder='Event title' />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder='Category' />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder='Description' />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder='City' />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder='Venue' />
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder='Date' />
        </Form.Field>

        <Container  textAlign='right'>
          <Button type="submit" positive content='Submit' />
          <Button type="button"  content='Cancel' onClick={() => setIsFormOpen(false)} />
        </Container>
      </Form>
    </Segment>
  )
}