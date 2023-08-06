import React from 'react'
import {
  Box,
  Button,
  Container,
  Divider,
  Fade,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material'
import { CardMediaMain } from '../../components/card'
import { Header } from '../../components/header'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../../components/footer'

const cardsData = [
  {
    id: '1',
    src: './images/M1.png',
    title: 'Full Decentralization with TON',
    text: 'Fair Journal leverages TON blockchain, providing a decentralized ecosystem where users have complete control over their content.',
    url: 'https://ton.org/',
  },
  {
    id: '2',
    src: './images/M2.png',
    title: 'Secured with TON Storage',
    text: 'Fair Journal utilizes TON Storage for data storage, ensuring enhanced security and privacy.',
    url: 'https://docs.ton.org/participate/ton-storage/storage-daemon',
  },
]

const steps = [
  'MVP Development and Launch',
  'Transition to Decentralization',
  'Enhanced Features and Community Building',
  'Scaling and Ecosystem Expansion',
  'Governance and Sustainability',
]

export const Main = () => {
  const navigate = useNavigate()

  return (
    <>
      {/* <Alert severity="error">
        This is a development version of the website. Please note that all articles and data will be removed upon the
        release of the main version. Thank you for your understanding.
      </Alert> */}
      <Header />
      <Container maxWidth="lg" sx={{ mt: 10, pb: { lg: 20, md: 25, xs: 10 } }}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={7}
            sx={{ display: 'flex', alignItems: 'center', p: 2, textAlign: { xs: 'center', md: 'start' } }}
          >
            <Fade in={true} timeout={1500}>
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
                  sx={{ m: 1, pt: '1.3rem', pb: '1.3rem', pl: '1.9rem', pr: '1.9rem', color: 'secondary.main' }}
                  onClick={() => navigate('/dashboard')}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  sx={{ m: 1, pt: '1.3rem', pb: '1.3rem', pl: '1.9rem', pr: '1.9rem' }}
                  onClick={() => navigate('/aboutus')}
                >
                  Learn More
                </Button>
              </Box>
            </Fade>
          </Grid>
          <Grid item md={5} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Box
              component="img"
              sx={{
                width: '100%',
              }}
              alt="The house from the offer."
              src="./images/main.png"
              className="rotateX"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ pt: 2, mb: 8, mt: 4, display: 'flex', justifyContent: 'center' }}>
          {cardsData.map(el => {
            return (
              <Grid item key={el.id} lg={6} md={6} xs={12}>
                <CardMediaMain {...el} />
              </Grid>
            )
          })}
        </Grid>
        <Paper elevation={3} sx={{ borderRadius: 2 }}>
          <Grid
            container
            sx={{
              backgroundColor: 'primary.main',
              display: 'flex',
              justifyContent: 'center',
              p: 3,
            }}
          >
            <Grid item lg={8} md={8} xs={12}>
              <Typography gutterBottom variant="h5" component="div" color="secondary">
                Fair compensation for creators
              </Typography>
              <Typography variant="body2" color="secondary">
                Creators on our platform can earn fair compensation through unique NFT articles, which they can sell and
                collect. Additionally, users can subscribe to their favorite creators via our Telegram bot and access
                exclusive content through paid subscriptions. This provides reliable and sustainable income sources for
                talented creators on our platform.
              </Typography>
            </Grid>
            <Grid item lg={4} md={4} xs={0}>
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Box
                  component="img"
                  src="./images/M3.png"
                  alt="NFT"
                  sx={{
                    width: { lg: '60%', md: '70%', xs: '0%' },
                    height: 'auto',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 3,
            mt: 4,
          }}
        >
          <Grid item lg={8} md={8} xs={12}>
            <Typography gutterBottom variant="h5" component="div">
              Your Community-Driven Platform!
            </Typography>
            <Typography variant="body2">
              At Fair Journal, we value community above all else. Join us to freely share ideas, connect with
              like-minded individuals, and engage in meaningful discussions. Together, we shape the direction of Fair
              Journal, celebrating diverse perspectives and fostering creativity. Whether you're a blogger, journalist,
              artist, or avid reader, you're invited to our vibrant community.iptions. This provides reliable and
              sustainable income sources for talented creators on our platform.
            </Typography>
            <Button
              variant="contained"
              sx={{
                m: 1,
                mt: 3,
                pt: '1.3rem',
                pb: '1.3rem',
                pl: '1.9rem',
                pr: '1.9rem',
                color: 'secondary.main',
                backgroundColor: '#000',
              }}
              onClick={() => window.open('https://github.com/FairJournal', '_blank')}
            >
              View GitHub
            </Button>
            <Button
              onClick={() => window.open('https://t.me/fair_journal_en', '_blank')}
              variant="outlined"
              color="success"
              sx={{ m: 1, mt: 3, pt: '1.3rem', pb: '1.3rem', pl: '1.9rem', pr: '1.9rem' }}
            >
              Join Us
            </Button>
          </Grid>
          <Grid item lg={4} md={4} xs={0}>
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Box
                component="img"
                src="./images/M4.png"
                alt="NFT"
                sx={{
                  width: { lg: '80%', md: '80%', xs: '0%' },
                  height: 'auto',
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            p: 3,
            mt: 4,
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            Development Roadmap
          </Typography>
          <Typography variant="body2">
            Stay tuned for upcoming milestones, platform enhancements, and new features. As we evolve and grow together,
            we aim to provide you with the best blogging experience possible. Join us on this journey of innovation and
            progress.
          </Typography>
          <Box sx={{ width: '100%', mt: 5, display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
            <Stepper
              color="success"
              activeStep={1}
              alternativeLabel
              sx={{
                '@media (max-width: 600px)': {
                  display: 'none',
                },
                '@media (max-width: 900px)': {
                  transform: 'scale(0.85)',
                  transformOrigin: 'top left',
                },
              }}
            >
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <List
              sx={{
                display: 'none',
                '@media (max-width: 600px)': {
                  display: 'block',
                },
              }}
            >
              {steps.map(label => (
                <div key={label}>
                  <Divider />
                  <ListItem alignItems="flex-start">
                    <ListItemText primaryTypographyProps={{ variant: 'h6' }} primary={label} />
                  </ListItem>
                </div>
              ))}
            </List>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  )
}
