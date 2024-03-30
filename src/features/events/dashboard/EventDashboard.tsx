import { Grid } from "semantic-ui-react";
import { useFireStore } from "../../../app/hooks/fireStore/useFireStore";
//redux
import { useAppSelector } from "../../../app/store/store";
import { actions } from "../eventSlice";
//components
import EventList from "./EventList";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";




export default function EventDashboard() {

  const {data: events, status} = useAppSelector(state => state.events);
  const { loadCollection } = useFireStore('events');


  useEffect(() => {
    loadCollection(actions);

  }, [loadCollection])
  
  if (status === 'loading') return <LoadingComponent />  
  
    

  return (
    <Grid>

      <Grid.Column width={10}>  
        <EventList events={events} />
      </Grid.Column>

      <Grid.Column width={6}> 
        <h2>Filters</h2>
      </Grid.Column>

    </Grid>
  )
}