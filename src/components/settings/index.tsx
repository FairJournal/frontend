import * as React from 'react'
import { Avatar, Box, Chip, Container, Divider, Paper, Typography, Button } from '@mui/material'

export const Settings = () => {
  return (
    <Paper sx={{ with: '600px', backgroundColor: 'primary.main', pt: 2 }} elevation={3}>
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
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button variant="contained" color="success" sx={{ color: '#ffffff', mt: 2, mb: 2 }}>
            Save Settings
          </Button>
        </Box>
      </Container>
    </Paper>
  )
}
