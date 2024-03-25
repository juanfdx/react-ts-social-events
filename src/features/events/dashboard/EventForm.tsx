import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Form, Header, Segment } from "semantic-ui-react";



export default function EventForm() {

  const initialValues = {
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
    console.log(values);
    
    // if selectedEvent then updateEvent if not then addEvent  
    // selectedEvent 
    //   ? updateEvent({...selectedEvent, ...values}) 
    //   : addEvent({...values, id: createId(), hostedBy: 'Marc', hostPhotoURL: '', attendees: []});  
    // setIsFormOpen(false);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {  
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  }



  
  return (
    <Segment>
      <Header content={'Create Event'} />
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