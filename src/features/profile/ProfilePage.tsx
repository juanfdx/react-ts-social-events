import { useEffect } from 'react';
import { Grid } from "semantic-ui-react";
//redux
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/store/store';
import { actions } from './ProfileSlice';
//hooks
import { useFireStore } from '../../app/hooks/fireStore/useFireStore';
//components
import ProfileHeader from "./ProfileHeader";
import ProfileContent from './ProfileContent';
import LoadingComponent from '../../app/layout/LoadingComponent';



export default function ProfilePage() {

  const {id} = useParams();
  const {status, data} = useAppSelector(state => state.profiles);
  const profile = data.find(p => p.id === id);
  const {loadDocument} = useFireStore('profiles');


  useEffect(() => {
    if (id) loadDocument(id, actions);
    
  }, [id, loadDocument])

  if (status === 'loading') return <LoadingComponent content='Loading profile...' />;

  if (!profile) return <h2>Profile not found!</h2>


  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>

          <ProfileHeader profile={profile} />
          <ProfileContent profile={profile} />

        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}