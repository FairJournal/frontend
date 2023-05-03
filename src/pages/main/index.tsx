import React from 'react'
import { Box, Button, Container, Fade, Grid, Typography, Zoom } from '@mui/material'
import { CardMediaMain } from '../../components/card'
import { Header } from '../../components/header'
import { useNavigate } from 'react-router-dom'

const cardsData = [
  {
    id: '1',
    src: './images/M1.png',
    title: 'Decentralized:',
    text: 'As mentioned before, Fair Journal is a decentralized platform that is powered by blockchain technology. This means that there is no central authority controlling the platform, and users have complete control over their content and data. This ensures that the platform is resistant to censorship and provides users with the freedom to express themselves without fear of being silenced or removed.',
  },
  {
    id: '2',
    src: './images/M2.png',
    title: 'Censorship-resistant:',
    text: 'Because Fair Journal is decentralized, it is highly resistant to censorship. This means that users can share their ideas and opinions without fear of being silenced or removed from the platform. In contrast, centralized blog platforms often have the power to remove or censor content that they deem to be inappropriate or controversial.',
  },
  {
    id: '3',
    src: './images/M3.png',
    title: 'Ownership of your data:',
    text: "Fair Journal is designed to give users complete ownership and control over their data. This means that users can decide how their data is used and who has access to it. In contrast, centralized blogs often retain ownership of user data, which can be used for targeted advertising or sold to third parties without the user's consent.",
  },
  {
    id: '4',
    src: './images/M4.png',
    title: 'Complete control of your content:',
    text: 'With Fair Journal, users have complete control over their content. They can decide how their content is published, shared, and distributed, and they can choose whether or not to monetize their content. This gives users the ability to earn revenue from their content in a fair and transparent manner, without having to rely on ad revenue or other monetization strategies that are controlled by centralized blog platforms.',
  },
  {
    id: '5',
    src: './images/M5.png',
    title: 'Fair compensation for creators:',
    text: 'Fair Journal is designed to provide fair compensation for creators. Through features such as donations and NFT purchases, users can support the creators they love and help them earn a living from their work. This is in contrast to centralized blog platforms, which often do not provide fair compensation for creators and may even exploit them for their content.',
  },
  {
    id: '6',
    src: './images/M6.png',
    title: 'Community-driven:',
    text: ' Fair Journal is a community-driven platform that is built on the principles of collaboration and openness. Users can share their ideas and collaborate with other users to create new content and build a vibrant and supportive community. This is in contrast to centralized blog platforms, which often prioritize individual success over community collaboration and can foster a competitive rather than supportive environment.',
  },
]

export const Main = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={7}
            sx={{ display: 'flex', alignItems: 'center', p: 2, textAlign: { xs: 'center', md: 'start' } }}
          >
            <Zoom in={true} timeout={1500}>
              <Box>
                <Typography variant="h2" gutterBottom sx={{ mt: 4 }}>
                  Fair Journal
                </Typography>
                <Typography variant="h4" gutterBottom>
                  Your voice, Your story, Your platform
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ m: 1, color: '#ffffff' }}
                  onClick={() => navigate('/dashboard')}
                >
                  Get Started
                </Button>
                <Button variant="outlined" color="inherit" sx={{ m: 1 }} onClick={() => navigate('/aboutus')}>
                  Learn More
                </Button>
              </Box>
            </Zoom>
          </Grid>
          <Grid item md={5} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Fade in={true} timeout={1500}>
              <Box
                component="img"
                sx={{
                  width: '100%',
                  //maxWidth: 500,
                }}
                alt="The house from the offer."
                src="./images/main.png"
              />
            </Fade>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ pt: 2, mb: 8 }}>
          {cardsData.map(el => {
            return (
              <Grid key={el.id} item lg={4} md={6} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <CardMediaMain img={el.src} title={el.title} text={el.text} />
              </Grid>
            )
          })}
        </Grid>
        <Box sx={{ pb: 16 }}>
          <Typography variant="h3" gutterBottom sx={{ mt: 4, textAlign: 'center' }}>
            Join Fair Journal today!
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="success"
              sx={{ ml: 'auto', mr: 'auto', color: '#ffffff' }}
              onClick={() => navigate('/dashboard')}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}
