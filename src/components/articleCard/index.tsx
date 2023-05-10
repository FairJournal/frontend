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
import { formatDate } from '../../utils'
import { OutputBlockData } from '@editorjs/editorjs'
import { deleteArticle } from '../../api/article'
import { deleteArticleById } from '../../store/slices/mainSlice'
import { useDispatch } from 'react-redux'

export const ArticlCard = ({
  id,
  blocks,
  time,
  isEdit,
}: {
  id: number
  time: number
  blocks: OutputBlockData<string, any>[]
  isEdit: boolean
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const dispatch = useDispatch()
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDelete = async (id: number) => {
    const res = await deleteArticle(id)
    dispatch(deleteArticleById(res))
    handleClose()
  }

  const timeArticle = formatDate(time)
  const title = blocks.find(el => el.type === 'header')?.data.text ?? 'New article!'
  const text = blocks.find(el => el.type === 'paragraph')?.data.text ?? ''
  const image = '/images/M1.png'

  return (
    <Card sx={{ maxWidth: 300, minWidth: 250, backgroundColor: 'primary.light' }}>
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
                <MenuItem onClick={async () => handleDelete(id)}>Remove</MenuItem>
              </Menu>
            </>
          ) : (
            ''
          )
        }
        subheader={timeArticle}
      />
      <CardActionArea>
        <CardMedia component="img" height="200" image={image} alt={title} />
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
