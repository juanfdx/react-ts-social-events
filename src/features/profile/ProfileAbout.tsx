import { useState } from 'react';
import { Button, Grid, GridColumn, Header, TabPane } from 'semantic-ui-react';
import { Profile } from '../../app/types/profile';
import ProfileForm from './ProfileForm';
//firebase
import { auth } from '../../app/config/firebase';


type Props = {
  profile: Profile
}

export default function ProfileAbout({profile}: Props) {

  const [editMode, setEditMode] = useState(false);
  const isCurrentUser = auth.currentUser?.uid === profile.id;


  return (
    <TabPane>
      <Grid>
        <GridColumn width={16}>
          <Header floated='left' icon='user' content={`About ${profile.displayName}`} />
          {isCurrentUser && 
            <Button 
              floated='right' 
              basic 
              content={editMode ? 'Cancel' : 'Edit profile'} 
              onClick={() => setEditMode(!editMode)}
            />
          }
        </GridColumn>

        <GridColumn width={16}>
          {editMode ? <ProfileForm profile={profile} setEditMode={setEditMode} /> : (
            <>
              <div style={{marginBottom: '10px'}}>
                <strong>Member since: {profile.createdAt}</strong>
                <div style={{marginTop: '10px'}}>{profile.description}</div>
              </div>
            </>
          )}
        </GridColumn>
      </Grid>
    </TabPane>
  )
}