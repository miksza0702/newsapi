import React from 'react'
import LoginForm from '../LoginForm/LoginForm'
import { Typography, Button, Card } from '@mui/material'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <>
      <Card sx={{
        mt: "1.2rem",
        p: "1rem",
      }}>
        <LoginForm />
        <Typography
          variant='h6'
          sx={{
            fontWeight: "100",
            textAlign: "center",
          }}
        >
          Don't have an account yet? Register now
        </Typography>
        <Link to="/register" style={{textDecoration: "none"}}>
          <Button
            variant='outlined'
            sx={{
              display: "block",
              mx: "auto",
            }}
          >
            Register
          </Button>
        </Link>

      </Card> 
    </>

  )
}

export default LoginPage