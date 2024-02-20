import React from 'react'
import { TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { auth } from '../../helpers/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { LoginFormData } from '../../helpers/interfaces'

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const submitHandler = ({email, password} : LoginFormData) => {
    signInWithEmailAndPassword(auth, email, password).then(() => {
      console.log("Success Login");
    }).catch((error) => {console.error(error.message)})
  }
  return (
    <form onSubmit={handleSubmit(submitHandler)} style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField 
        variant='outlined'
        type={'email'}
        placeholder='email'
        sx={{
          display: 'block',
          my: '0.5rem',
          mx: 'auto',
          name: 'email',
        }}
        {...register("email", {required: true})}
      />
      <TextField 
        variant='outlined'
        type={'password'}
        placeholder='password'
        sx={{
          display: 'block',
          my: '0.8rem',
          mx: 'auto',
          name: 'password',
        }}
        {...register("password", {required: true})}
      />
      <Button 
        type='submit'
        variant='contained'
        sx={{
          display: 'block',
          mx: 'auto',
          mb: '1rem',
        }}
      >
        Logowanie
      </Button>
    </form>
  )
}

export default LoginForm