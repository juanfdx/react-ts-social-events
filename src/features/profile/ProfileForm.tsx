import { FieldValues, useForm } from 'react-hook-form';
//hooks
import { useFireStore } from '../../app/hooks/fireStore/useFireStore'
import { Profile } from '../../app/types/profile';
//firestore
import { auth } from '../../app/config/firebase';
import { updateProfile } from 'firebase/auth';
import { Button, Form, FormInput, TextArea } from 'semantic-ui-react';

type Props = {
  profile: Profile;
  setEditMode: (value: boolean) => void;
}


export default function ProfileForm({profile, setEditMode}: Props) {

  const {update} = useFireStore('profiles');

  const {register, handleSubmit, formState: {errors, isSubmitting, isDirty, isValid}} = useForm({
    mode: 'onTouched',
    defaultValues: {
      displayName: profile.displayName,
      description: profile.description,
    },
  });

  async function onSubmit(data: FieldValues) {
    await update(profile.id, data);
    
    if (profile.displayName !== data.displayName) {
      await updateProfile(auth.currentUser!, {
        displayName: data.displayName 
      });
    }
    setEditMode(false);
  }


  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormInput 
        placeholder='Display Name'
        {...register('displayName', {required: true})}
        error={errors.displayName && 'Display Name is required'}
      />

      <TextArea 
        placeholder='Tell us about yourself...'
        {...register('description')}
      />

      <Button
        style={{marginTop: '10px'}} 
        loading={isSubmitting}
        disabled={isSubmitting || !isDirty || !isValid}
        floated='right'
        type='submit'
        size='large'
        positive
        content='Update profile'
      />
    
    </Form>
  )
}