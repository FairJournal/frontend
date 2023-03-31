import React from 'react'
import { Box, Container, Grid, Link, Typography } from '@mui/material'

export const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        backgroundColor: '#F0E9E4',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        position: 'absolute',
        bottom: 0,
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1">
              <Link href="#" color="inherit" underline="none">
                2023{' '}
              </Link>
              <Link href="#" color="inherit" underline="none">
                | Twitter{' '}
              </Link>
              <Link href="#" color="inherit" underline="none">
                | Telegram{' '}
              </Link>
              <Link href="#" color="inherit" underline="none">
                | GitHub
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
