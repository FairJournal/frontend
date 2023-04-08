import * as React from 'react'
import { Card, CardContent, CardHeader, CardMedia, IconButton, Typography, CardActionArea } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

export const ArticlCard = ({
  img,
  title,
  text,
  isEdit,
}: {
  img: string
  title: string
  text: string
  isEdit: boolean
}) => {
  return (
    <Card sx={{ maxWidth: 300, backgroundColor: 'primary.light' }}>
      <CardActionArea>
        <CardHeader
          action={
            isEdit ? (
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            ) : (
              ''
            )
          }
          subheader="September 14, 2016"
        />
        <CardMedia component="img" height="200" image={img} alt={title} />
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
