import React, { useState } from 'react'
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
  Skeleton,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { formatDate, slugToHeader } from '../../utils'
import { deleteArticle } from '../../api/article'
import { deleteArticleById } from '../../store/slices/mainSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const ArticlCard = ({
  time,
  slug,
  img,
  shortText,
  isEdit,
  publickey,
  isloading,
}: {
  time: number
  slug: string
  img: string
  shortText: string
  isEdit: boolean
  publickey: string
  isloading: boolean
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDelete = async (address: string) => {
    const res = await deleteArticle(address)
    dispatch(deleteArticleById(res))
    handleClose()
  }

  const handleEdit = (address: string) => {
    navigate(`/write/${address}`)
    handleClose()
  }

  const timeArticle = formatDate(time)
  const title = slug ? slugToHeader(slug) : 'New Article'
  const image = img ? img : '/images/F2.png'

  return (
    <Card sx={{ width: 300, backgroundColor: 'secondary' }}>
      <CardHeader
        action={
          // eslint-disable-next-line no-nested-ternary
          isloading ? null : isEdit ? (
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
                <MenuItem onClick={() => handleEdit(publickey)}>Edit</MenuItem>
                <MenuItem onClick={async () => handleDelete(publickey)}>Remove</MenuItem>
              </Menu>
            </>
          ) : (
            ''
          )
        }
        subheader={isloading ? <Skeleton animation="wave" height={15} width="80%" /> : timeArticle}
      />
      <CardActionArea onClick={() => window.open(`/${publickey}/${slug}`, '_blank')}>
        {isloading ? (
          <Skeleton sx={{ height: 200 }} animation="wave" variant="rectangular" />
        ) : (
          <CardMedia component="img" height="200" image={image} alt={title} />
        )}
      </CardActionArea>
      <CardContent>
        {isloading ? (
          <>
            <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        ) : (
          <>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.primory">
              {shortText + '...'}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  )
}
