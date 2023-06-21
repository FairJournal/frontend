import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../../components/header'

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '80vh',
        }}
      >
        <Typography variant="h1">404</Typography>
        <Typography variant="h6">The page you’re looking for doesn’t exist.</Typography>
        <Button variant="outlined" color="inherit" onClick={() => navigate('/')}>
          Back Home
        </Button>
      </Box>
    </>
  )
}
