import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { FieldValues, useForm } from "react-hook-form";
//redux
import { useAppDispatch } from "../../app/store/store";
import { closeModal } from "../../app/common/modals/modalSlice";
//firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../app/config/firebase";
//components
import { Button, Divider, Form, FormInput, Label } from "semantic-ui-react";
import SocialLogin from "./SocialLogin";



export default function LoginForm() {

    const {register, handleSubmit, setError, formState: {isSubmitting, isValid, isDirty, errors}} = useForm({
        mode: 'onTouched',
    })

    const dispatch = useAppDispatch()

    async function onSubmit(data: FieldValues) {
      try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        dispatch(closeModal())
          
        } catch (error: any) {
          setError('root.serverError', {
            type:'400',
            message: error.message  
          })
          console.error(error);  
        }
    }



    return (
      <ModalWrapper header='Sign into re-vents' size='mini'>
        <Form onSubmit={handleSubmit(onSubmit)}>
         
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
            content='Login'
          />

          <Divider horizontal> Or </Divider>

          {/* Github and Google buttons */}
          <SocialLogin />

        </Form>
      </ModalWrapper>
  )
}