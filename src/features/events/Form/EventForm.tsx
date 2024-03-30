import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
//redux
import { useAppSelector } from "../../../app/store/store";
import { actions } from "../eventSlice";
//date-picker
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
//fireStore
import { Timestamp } from "firebase/firestore";
//hook
import { useFireStore } from "../../../app/hooks/fireStore/useFireStore";
//components
import { Button, Container, Form, Header, Segment } from "semantic-ui-react";
import { categoryOptions } from "./categoryOptions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
//Type
import { AppEvent } from "../../../app/types/event";



export default function EventForm() {
  const {loadDocument, create, update} = useFireStore('events');
  //control prop for <Controller /> component in the form to control <Select /> component
  //setValue for <Select /> component, work with onChange prop
  const {register, handleSubmit, control, setValue, formState: { errors, isValid, isSubmitting }} = useForm({
    mode: 'onTouched',
    //to tell the form re-render so can show data in its fields when reload page
    defaultValues: async () => {
      if (event) return {...event, date: new Date(event.date)}
    } 
  });

  const {id} = useParams()
  const event = useAppSelector(state => state.events.data.find(e=> e.id === id));
  const {status} = useAppSelector(state => state.events);
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return;
    loadDocument(id, actions);


  }, [id, loadDocument])
  

  //update event
  async function updateEvent(data: AppEvent) {
    if (!event) return;

    await update(data.id, {
      ...data,
       date: Timestamp.fromDate(data.date as unknown as Date),
    });
  }
  
  //create event
  async function createEvent(data: AppEvent) { 
    const ref = await create({
      ...data,
       hostedBy: 'Marc', 
       hostPhotoURL: '', 
       attendees: [],
       date: Timestamp.fromDate(data.date as unknown as Date),
    });

    return ref;
  }

  //cancel event
  async function handleCancelToggle(event:AppEvent) {
    await update(event.id, {
      isCancelled: !event.isCancelled
    })
    toast.success(`Event has been ${event.isCancelled ? 'uncancelled' : 'cancelled'}`)
  }

  //submit event
  async function onSubmit(data: FieldValues) {
    try {
      if (event) { 
        await updateEvent({ ...event, ...data});
        navigate(`/events/${event.id}`);
      }
      else {
        const ref = await createEvent(data as AppEvent);
        navigate(`/events/${ref?.id}`);
      }
      
    } catch (error: any) {
      toast.error(error.message);
      console.error(error.message);
    }
  }


  if (status === 'loading') return <LoadingComponent />

  
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
          
          {event && 
            <Button 
              type='button'
              floated='left'
              color={event.isCancelled ? 'green' : 'red'} 
              content={event.isCancelled ? 'Reactivate event' : 'Cancel event'} 
              onClick={() => handleCancelToggle(event)}
            />

          }

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