import * as React from 'react'
import { Box, CardActionArea, Fade, Paper, Typography } from '@mui/material'

export const CardMediaMain = ({ src, title, text, url }: { src: string; title: string; text: string; url: string }) => {
  return (
    <Fade in={true} timeout={1500}>
      <CardActionArea sx={{ position: 'relative', height: '100%' }} onClick={() => window.open(url, '_blank')}>
        <Paper elevation={3} className="card-container">
          <Box sx={{ p: 3, pb: 7 }}>
            <Box
              component="img"
              sx={{
                width: '5rem',
                transition: 'transform 1s',
              }}
              alt={title}
              src={src}
              className="rotate-on-hover"
            />
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {text}
            </Typography>
          </Box>
        </Paper>
      </CardActionArea>
    </Fade>
  )
}
