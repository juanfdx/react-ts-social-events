import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, ButtonGroup, Card, CardGroup, Grid, GridColumn, Header, Image, TabPane } from 'semantic-ui-react';
import { Photo, Profile } from '../../app/types/profile';
//firebase
import { auth, storage } from '../../app/config/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
//redux
import { useAppSelector } from '../../app/store/store';
import { actions } from './PhotosSlice';
import { useFireStore } from '../../app/hooks/fireStore/useFireStore';
//components
import PhotoUpload from './PhotoUpload';


type Props = {
  profile: Profile
}

export default function ProfilePhotos({profile}: Props) {

  const [editMode, setEditMode] = useState(false);
  const isCurrentUser = auth.currentUser?.uid === profile.id;
  const {data: photos, status} = useAppSelector(state => state.photos);
  const {loadCollection, remove} = useFireStore(`profiles/${profile.id}/photos`);
  const {update} = useFireStore('profiles');

  
  useEffect(() => {
    loadCollection(actions);
  }, [loadCollection])
  
  async function handleSetMainImage(photo: Photo) {
    await update(profile.id, {
      photoURL: photo.url
    });
    await updateProfile(auth.currentUser!, {
      photoURL: photo.url
    });
  }

  async function handleDeletePhoto(photo: Photo) {
    try {
      const storageRef = ref(storage, `${profile.id}/user_images/${photo.id}`);
      await deleteObject(storageRef);
      await remove(photo.id);
      
    } catch (error: any) {
      toast.error(error.message);
    }
  }


  return (
    <TabPane loading={status === 'loading'}>
      <Grid>
        <GridColumn width={16}>
          <Header floated='left' icon='photo' content='Photo' />
          {isCurrentUser && 
            <Button 
              floated='right' 
              basic 
              content={editMode ? 'Cancel' : 'Photo'} 
              onClick={() => setEditMode(!editMode)}
            />
          }
        </GridColumn>

        <GridColumn width={16}>

          {editMode ? <PhotoUpload profile={profile} setEditMode={setEditMode} /> : (
            <CardGroup>
              {photos?.map(photo => 

                <Card key={photo.id} style={{maxWidth: '200px'}}>
                  <Image  src={photo.url} />
                  {isCurrentUser && 
                    <ButtonGroup>
                      <Button 
                        basic 
                        color='green' 
                        disabled={photo.url === profile.photoURL}
                        onClick={() => handleSetMainImage(photo)}
                      >
                        Main
                      </Button>
                      <Button 
                        basic 
                        color='red' 
                        icon='trash' 
                        disabled={photo.url === profile.photoURL}
                        onClick={() => handleDeletePhoto(photo)}
                      />
                    </ButtonGroup>
                  }
                </Card>

              )}
            </CardGroup>
          )}

        </GridColumn>
      </Grid>
    </TabPane>
  )
}