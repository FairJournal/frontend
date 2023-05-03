import * as React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  CardActionArea,
  Menu,
  MenuItem,
} from '@mui/material'
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <Card sx={{ maxWidth: 300, backgroundColor: 'primary.light' }}>
      <CardHeader
        action={
          isEdit ? (
            <>
              <IconButton aria-label="settings" onClick={handleMenu}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>Remove</MenuItem>
              </Menu>
            </>
          ) : (
            ''
          )
        }
        subheader="September 14, 2016"
      />
      <CardActionArea>
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
