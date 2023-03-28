import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

export const ActionAreaCard = ({ img, title, text }: { img: string; title: string; text: string }) => {
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: '#F2F3F4' }}>
      <CardActionArea>
        <CardMedia component="img" height="250" image={img} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.primory">
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
