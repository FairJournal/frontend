import * as React from 'react'
import { Card, CardContent, CardMedia, Fade, Typography } from '@mui/material'

export const CardMediaMain = ({ img, title, text }: { img: string; title: string; text: string }) => {
  return (
    <Fade in={true} timeout={1500}>
      <Card sx={{ maxWidth: 345, backgroundColor: 'primary.light' }}>
        <CardMedia component="img" height="250" image={img} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.primory">
            {text}
          </Typography>
        </CardContent>
      </Card>
    </Fade>
  )
}
