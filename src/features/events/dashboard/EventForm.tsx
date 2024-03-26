import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createId } from "@paralleldrive/cuid2";
//redux
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
//components
import { Button, Container, Form, Header, Segment } from "semantic-ui-react";
import { createEvent, updateEvent } from "../eventSlice";



export default function EventForm() {

  let {id} = useParams()
  const event = useAppSelector(state => state.events.events.find(e=> e.id === id));
  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  const initialValues = event ?? {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: '',
  }

  const [values, setValues] = useState(initialValues);


  function onSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    id = id ?? createId();// is there another way
    
    event
      ? dispatch(updateEvent({...event, ...values}))
      : dispatch(createEvent({...values, id, hostedBy: 'Marc', hostPhotoURL: '', attendees: []}))
  
    navigate(`/events/${id}`)
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {  
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  }



  
  return (
    <Segment>
      <Header content={event ? 'Update Event' : 'Create Event'} />
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <input 
            type="text" 
            name="title"
            value={values.title}
            onChange={(e)=> handleInputChange(e)}
            placeholder='Event title' 
          />
        </Form.Field>
        <Form.Field>
          <input 
            type="text"
            name="category"
            value={values.category}
            onChange={(e)=> handleInputChange(e)} 
            placeholder='Category' 
          />
        </Form.Field>
        <Form.Field>
          <input 
            type="text" 
            name="description"
            value={values.description}
            onChange={(e)=> handleInputChange(e)} 
            placeholder='Description' 
          />
        </Form.Field>
        <Form.Field>
          <input 
            type="text"
            name="city"
            value={values.city}
            onChange={(e)=> handleInputChange(e)}  
            placeholder='City' 
          />
        </Form.Field>
        <Form.Field>
          <input 
            type="text" 
            name="venue"
            value={values.venue}
            onChange={(e)=> handleInputChange(e)} 
            placeholder='Venue' 
          />
        </Form.Field>
        <Form.Field>
          <input 
            type="date" 
            name="date"
            value={values.date}
            onChange={(e)=> handleInputChange(e)} 
            placeholder='Date' 
          />
        </Form.Field>

        <Container  textAlign='right'>
          <Button type="submit" positive content='Submit' />
          <Button as={Link} to='/events' type="button"  content='Cancel' />
        </Container>
      </Form>
    </Segment>
  )
}


 /*
 * NOTE: 
 *The nullish coalescing (??) operator is a shorthand for the logical operator ||.
 *It returns its right-hand side operand when its left-hand side operand is null or undefined, 
 *otherwise returns its left-hand side operand. 
 */