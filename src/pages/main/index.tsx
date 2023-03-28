import { Box, Button, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { ActionAreaCard } from '../../components/card'
import { Footer } from '../../components/footer'
import { Header } from '../../components/header'

const cardsData = [
  {
    id: '1',
    src: './images/M1.png',
    title: 'Decentralized',
    text: 'Fair Journal is a decentralized platform that is powered by blockchain technology. This means that there is no central authority controlling the platform, and users have complete control over their content and data.',
  },
  {
    id: '2',
    src: './images/M2.png',
    title: 'Censorship-resistant',
    text: 'Because Fair Journal is decentralized, it is highly resistant to censorship. This means that you can share their ideas and opinions without fear of being silenced or removed from the platform.    ',
  },
  {
    id: '3',
    src: './images/M3.png',
    title: 'Ownership',
    text: 'Fair Journal is designed to give you complete ownership and control over your data. This means that you can decide how your data is used and who has access to it.',
  },
  {
    id: '4',
    src: './images/M4.png',
    title: 'Control',
    text: 'With Fair Journal, you have complete control over your content. They can decide how their content is published, shared, and distributed, and you can choose whether or not to monetize you content.',
  },
  {
    id: '5',
    src: './images/M5.png',
    title: 'Fair compensation',
    text: 'Fair Journal is designed to provide fair compensation for creators. Through features such as donations and NFT purchases, you can support the creators you love and help them earn a living from their work.',
  },
  {
    id: '6',
    src: './images/M6.png',
    title: 'Community-driven',
    text: ' Fair Journal is a community-driven platform that is built on the principles of collaboration and openness. You can share your ideas and collaborate with other users to create new content.',
  },
]

export const Main = () => {
  return (
    <Box sx={{ backgroundColor: 'primary.main' }}>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={7}
            sx={{ display: 'flex', alignItems: 'center', p: 2, textAlign: { xs: 'center', md: 'start' } }}
          >
            <Box>
              <Typography variant="h2" gutterBottom sx={{ mt: 4 }}>
                Fair Journal
              </Typography>
              <Typography variant="h4" gutterBottom>
                Your voice, Your story, Your platform
              </Typography>
              <Button variant="outlined" color="inherit" sx={{ m: 1 }}>
                Get Started
              </Button>
              <Button variant="outlined" color="inherit" sx={{ m: 1 }}>
                Learn More
              </Button>
            </Box>
          </Grid>
          <Grid item md={5} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Box
              component="img"
              sx={{
                width: '100%',
                //maxWidth: 500,
              }}
              alt="The house from the offer."
              src="./images/main.png"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ pt: 2, mb: 8 }}>
          {cardsData.map(el => {
            return (
              <Grid key={el.id} item lg={4} md={6} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <ActionAreaCard img={el.src} title={el.title} text={el.text} />
              </Grid>
            )
          })}
        </Grid>
        <Box>
          <Typography variant="h3" gutterBottom sx={{ mt: 4, textAlign: 'center' }}>
            Join Fair Journal today!
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="outlined" color="inherit" sx={{ ml: 'auto', mr: 'auto' }}>
              Get Started
            </Button>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}
