import React, { useState } from 'react'
import { Box, Button, CardActionArea, Chip, Grid, Paper, Typography } from '@mui/material'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import LinkIcon from '@mui/icons-material/Link'
import TelegramIcon from '@mui/icons-material/Telegram'

export const Verification = ({ bagid, address, sub }: { bagid: string; address: string; sub: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard
      .writeText(bagid)
      .then(() => {
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 1500)
      })
      .catch(error => {
        console.error('Copy failed:', error)
      })
  }

  return (
    <Grid container spacing={2} justifyContent="center" mb={3}>
      <Grid item xs={10} md={3} lg={3}>
        <Box sx={{ p: 1 }}>
          <Button
            variant="contained"
            size="small"
            color="success"
            onClick={() => window.open(`https://t.me/fair_journal_bot?start=${sub}`, '_blank')}
            endIcon={<TelegramIcon />}
          >
            Subscribe
          </Button>
        </Box>
      </Grid>
      <Grid item xs={10} md={6} lg={3}>
        <CardActionArea>
          <Paper elevation={1}>
            <Box sx={{ p: 1 }}>
              <Typography variant="caption" sx={{ fontSize: '0.8rem' }} display="block" gutterBottom>
                Author Address
                <ArrowOutwardIcon sx={{ fontSize: '1rem' }} />
              </Typography>
              <Chip
                title={address}
                sx={{ fontSize: '0.8rem' }}
                label={address}
                onClick={() => window.open(`https://tonviewer.com/${address}`, '_blank')}
              />
            </Box>
          </Paper>
        </CardActionArea>
      </Grid>
      <Grid item xs={10} md={6} lg={3}>
        <CardActionArea>
          <Paper elevation={1}>
            <Box sx={{ p: 1 }}>
              <Typography variant="caption" sx={{ fontSize: '0.8rem' }} display="block" gutterBottom>
                BagID
                {copied ? ' Coped!' : <LinkIcon sx={{ fontSize: 18, ml: 1 }} />}
              </Typography>
              <Chip title={bagid} sx={{ fontSize: '0.8rem' }} label={bagid} onClick={handleCopy} />
            </Box>
          </Paper>
        </CardActionArea>
      </Grid>
    </Grid>
  )
}
