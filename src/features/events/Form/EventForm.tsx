import { Link, useNavigate, useParams } from "react-router-dom";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { createId } from "@paralleldrive/cuid2";
//redux
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { createEvent, updateEvent } from "../eventSlice";
//date-picker
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
//components
import { Button, Container, Form, Header, Segment } from "semantic-ui-react";
import { categoryOptions } from "./categoryOptions";



export default function EventForm() {
  //control prop for <Controller /> component in the form to control <Select /> component
  //setValue for <Select /> component, work with onChange prop
  const {register, handleSubmit, control, setValue, formState: { errors, isValid, isSubmitting }} = useForm({
    mode: 'onTouched',
  });

  let {id} = useParams()
  const event = useAppSelector(state => state.events.events.find(e=> e.id === id));
  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  function onSubmit(data: FieldValues) {
    id = id ?? createId();// is there another way?
    
    event
      ? dispatch(updateEvent({...event, ...data, date: data.date.toDateString()}))//toDateString() so obj date can be rendered as string
      : dispatch(createEvent({...data, id, hostedBy: 'Marc', hostPhotoURL: '', attendees: [], date: data.date.toDateString()}))
  
    navigate(`/events/${id}`)
  }


  
  return (
    <Segment>
      <Header content={'Event Details'} sub color='teal' style={{marginBottom: '10px'}} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Input //uncontrolled input
          defaultValue={event?.title || ''}
          {...register('title', { required: true })} //one way to do this
          error={errors.title && 'Title is required!'}
          placeholder='Event title'      
        />

        <Controller 
          name='category'
          control={control}
          rules={{ required: 'The category is required!' }}
          defaultValue={event?.category || ''}
          render={({ field }) => (

            <Form.Select  
              placeholder='Category' 
              options={categoryOptions}
              clearable
              {...field}
              onChange={(_, d) => setValue('category', d.value, {shouldValidate: true})}// (_, d) means that we are passing the value of d (the second parameter) to setValue function 
              error={errors.category && errors.category.message}
            />

          )}
        />

        <Form.TextArea 
          defaultValue={event?.description || ''}
          {...register('description', { required: 'Description is required!' })}
          placeholder='Description'
          error={errors.description && errors.description.message}
        />

        <Header content={'Location details'} sub color='teal' style={{marginBottom: '10px'}} />

        <Form.Input 
          defaultValue={event?.city || ''}
          {...register('city', { required: 'City is required!' })}
          placeholder='City'
          error={errors.city && errors.city.message}
        />

        <Form.Input 
          defaultValue={event?.venue || ''}
          {...register('venue', { required: 'Venue is required!' })}
          placeholder='Venue'  
          error={errors.venue && errors.venue.message}
        />

        <Form.Field>
          <Controller
            name='date'
            control={control}
            rules={{required: 'Date is required!'}}
            defaultValue={event && new Date(event.date) || null}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(value) => setValue('date', value, {shouldValidate: true})}
                showTimeSelect
                timeCaption='Time'
                dateFormat='MMM d, yyyy h:mm aa'
                placeholderText='Event date and time'
              />
            )}
          />
        </Form.Field>

        <Container  textAlign='right' style={{marginTop: '20px'}}>
          <Button 
            loading={isSubmitting} 
            disabled={!isValid} 
            type="submit" 
            positive 
            content='Submit' 
          />
          <Button 
            disabled={isSubmitting} 
            as={Link} 
            to='/events' 
            type="button"  
            content='Cancel' 
          />
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