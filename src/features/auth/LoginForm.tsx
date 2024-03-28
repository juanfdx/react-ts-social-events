import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { FieldValues, useForm } from "react-hook-form";
//redux
import { useAppDispatch } from "../../app/store/store";
import { signIn } from "./authSlice";
import { closeModal } from "../../app/common/modals/modalSlice";
//components
import { Button, Form, FormInput } from "semantic-ui-react";



export default function LoginForm() {

    const {register, handleSubmit, formState: {isSubmitting, isValid, isDirty, errors}} = useForm({
        mode: 'onTouched',
    })

    const dispatch = useAppDispatch()

    function onSubmit(data: FieldValues) {
        dispatch(signIn(data))
        dispatch(closeModal())
    }



    return (
      <ModalWrapper header='Sign into re-vents'>
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

          <Button
            type='submit'
            loading={isSubmitting}
            disabled={!isValid || !isDirty || isSubmitting} 
            fluid
            size="large"
            color="teal"
            content='Login'
          />

        </Form>
      </ModalWrapper>
  )
}