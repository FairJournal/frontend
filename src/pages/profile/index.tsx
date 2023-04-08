import React from 'react'
import { Header } from '../../components/header'
import { Avatar, Box, Chip, Container, Typography, Divider } from '@mui/material'

export const Profile = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', mt: 4, mb: 2 }}>
          <Avatar alt="Avatar" src="/images/M4.png" sx={{ width: 150, height: 150, mr: 2 }} />
          <Box>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Igor Cgernyshev
            </Typography>
            <Chip label="0x2638...E90F69" />
          </Box>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle1" gutterBottom>
          Welcome to Fair Journal, the decentralized blogging platform that puts the power back in the hands of content
          creators. Join us and share your voice today.
        </Typography>
        <Divider sx={{ mt: 2 }} />
      </Container>
    </>
  )
}
