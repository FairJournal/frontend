import React from 'react'
import { Header } from '../../components/header'
import { Avatar, Box, Chip, Container, Typography, Divider, Grid, Toolbar } from '@mui/material'
import { ArticlCard } from '../../components/articleCard'

const articles = [
  {
    id: '1',
    img: '/images/M4.png',
    title: 'How it works',
    description: 'Injected by the documentation to work in an iframe t need it on your project...',
  },
  {
    id: '2',
    img: '/images/M5.png',
    title: 'How it works',
    description: 'Injected by the documentation to work in an iframe t need it on your project...',
  },
  {
    id: '3',
    img: '/images/M3.png',
    title: 'How it works',
    description: 'Injected by the documentation to work in an iframe t need it on your project...',
  },
  {
    id: '4',
    img: '/images/M2.png',
    title: 'How it works',
    description: 'Injected by the documentation to work in an iframe t need it on your project...',
  },
  {
    id: '5',
    img: '/images/M1.png',
    title: 'How it works',
    description: 'Injected by the documentation to work in an iframe t need it on your project...',
  },
]

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
        <Typography variant="subtitle1" gutterBottom>
          Welcome to Fair Journal, the decentralized blogging platform that puts the power back in the hands of content
          creators. Join us and share your voice today.
        </Typography>
        <Divider sx={{ mt: 2 }} />
        <Grid container spacing={2} sx={{ pt: 2, pb: 4 }}>
          {articles.map(el => (
            <Grid key={el.id} item lg={4} md={6} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <ArticlCard img={el.img} title={el.title} text={el.description} isEdit={false} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Toolbar />
    </>
  )
}
