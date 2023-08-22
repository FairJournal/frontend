import React from 'react'
import { Box, Container, Divider, IconButton, Stack } from '@mui/material'
import TwitterIcon from '@mui/icons-material/Twitter'
import TelegramIcon from '@mui/icons-material/Telegram'
import GitHubIcon from '@mui/icons-material/GitHub'

export const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        position: 'absolute',
        bottom: 0,
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center">
          <Divider />
          <Stack direction="row" spacing={1} sx={{ p: 2, justifyContent: 'center' }}>
            <IconButton aria-label="twitter" onClick={() => window.open('https://twitter.com/fair_journal', '_blank')}>
              <TwitterIcon />
            </IconButton>
            <IconButton aria-label="telegram" onClick={() => window.open('https://t.me/fair_journal_en', '_blank')}>
              <TelegramIcon />
            </IconButton>
            <IconButton aria-label="github" onClick={() => window.open('https://github.com/FairJournal', '_blank')}>
              <GitHubIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
