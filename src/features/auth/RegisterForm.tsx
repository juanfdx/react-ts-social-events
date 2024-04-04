import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { FieldValues, useForm } from "react-hook-form";
//redux
import { useAppDispatch } from "../../app/store/store";
import { closeModal } from "../../app/common/modals/modalSlice";
//firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../app/config/firebase";
import { Timestamp } from "firebase/firestore";
//components
import { Button, Form, FormInput, Label } from "semantic-ui-react";
import { signIn } from "./authSlice";
import { useFireStore } from "../../app/hooks/fireStore/useFireStore";



export default function RegisterForm() {
    //when use this hook, it will create profiles collection in firestore
    const {set} = useFireStore('profiles');

    const {register, handleSubmit, setError, formState: {isSubmitting, isValid, isDirty, errors}} = useForm({
        mode: 'onTouched',
    })

    const dispatch = useAppDispatch()

    async function onSubmit(data: FieldValues) {
      try {
        //we don't need the result, because in App.tx L22 firebase gets the user when logged in
        const userCreds = await createUserWithEmailAndPassword(auth, data.email, data.password);
        await updateProfile(userCreds.user, {
          displayName: data.displayName
        });

        await  set(userCreds.user.uid, {
          displayName: data.displayName,
          email: data.email,
          createdAt: Timestamp.now()
        });

        dispatch(signIn(userCreds.user))
        dispatch(closeModal())
          
        } catch (error: any ) {
          setError('root.serverError', {
            type:'400',
            message: error.message  
          })
          console.error(error);
        }
    }



    return (
      <ModalWrapper header='Register to re-vents'>
        <Form onSubmit={handleSubmit(onSubmit)}>
         
          <FormInput 
            {...register('displayName', { required: true })}
            placeholder='Display name'
            error={errors.displayName && 'Display name is required!'}  
          />  

          <FormInput 
            {...register('email', { required: true, pattern: /.+@.+\..+/ })}
            placeholder='Email'
            error={
              errors.email?.type === 'required' && 'Email is required!' ||
              errors.email?.type === 'pattern' && 'Email is invalid!' 
            }  
          />
 
          <FormInput 
            type='password'
            {...register('password', { required: 'Password is required!' })}
            placeholder='Password'
            error={errors.password && errors.password.message}  
          /> 

          {errors.root &&
            <Label 
              basic 
              color='red' 
              style={{display: 'block', marginBottom: '10px'}}
              content={errors.root.serverError?.message}  
            />
          }

          <Button
            type='submit'
            loading={isSubmitting}
            disabled={!isValid || !isDirty || isSubmitting} 
            fluid
            size="large"
            color="teal"
            content='Register'
          />

        </Form>
      </ModalWrapper>
  )
}