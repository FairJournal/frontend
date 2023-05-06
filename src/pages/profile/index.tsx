import React from 'react'
import { Header } from '../../components/header'
import { Avatar, Box, Chip, Container, Typography, Divider, Grid, Toolbar } from '@mui/material'
import { ArticlCard } from '../../components/articleCard'
import { useAppSelector } from '../../store/hooks'
import { selectMain } from '../../store/slices/mainSlice'
import { shortenString } from '../../utils'
import { useTonAddress } from '@tonconnect/ui-react'

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
  const { profile } = useAppSelector(selectMain)
  const userFriendlyAddress = useTonAddress()
  const shortWallet = shortenString(userFriendlyAddress)

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', mt: 4, mb: 2 }}>
          <Avatar alt="Avatar" src={profile?.avatar} sx={{ width: 150, height: 150, mr: 2 }} />
          <Box>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              {profile?.name}
            </Typography>
            <Chip label={shortWallet} />
          </Box>
        </Box>
        <Typography variant="subtitle1" gutterBottom>
          {profile?.description}
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
