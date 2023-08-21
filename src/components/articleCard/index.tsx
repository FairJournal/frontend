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
  Link,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { formatDate } from '../../utils'
import { deleteArticleBySlug } from '../../store/slices/mainSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeArticleToFs } from '../../utils/fs'

export const ArticlCard = ({
  title,
  time,
  slug,
  img,
  shortText,
  isEdit,
  publickey,
  isloading,
}: {
  title: string
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
    await removeArticleToFs({ address, slug })
    dispatch(deleteArticleBySlug(slug))
    handleClose()
  }

  const handleEdit = (address: string) => {
    navigate(`/write/${address}/${slug}`)
    handleClose()
  }

  const timeArticle = formatDate(time)
  const titleCur = title ? title : 'New Article'
  const regex = /ton:\/\/([A-Za-z0-9]+)/
  const image = img ? img.replace(regex, `${process.env.REACT_APP_URL_TON_STORAGE}ton/$1/blob`) : '/images/F2.png'

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

      {isloading ? (
        <Skeleton sx={{ height: 200 }} animation="wave" variant="rectangular" />
      ) : (
        <CardActionArea className="zoomable" onClick={() => window.open(`/${publickey}/${slug}`, '_blank')}>
          <CardMedia component="img" height="200" image={image} alt={title} />
        </CardActionArea>
      )}
      <CardContent sx={{ minHeight: 100, p: 1 }}>
        {isloading ? (
          <>
            <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        ) : (
          <>
            <Typography gutterBottom variant="body1" component="div">
              <Link
                href={`/${publickey}/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: '#000', fontWeight: 600, '&:hover': { color: '#5479F7' } }}
              >
                {titleCur}
              </Link>
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
