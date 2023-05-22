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
              <Link href="https://twitter.com/fair_journal" color="inherit" underline="none" target="_blank">
                | Twitter{' '}
              </Link>
              <Link href="https://t.me/fair_journal_en" color="inherit" underline="none" target="_blank">
                | Telegram{' '}
              </Link>
              <Link href="https://github.com/FairJournal" color="inherit" underline="none" target="_blank">
                | GitHub
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
