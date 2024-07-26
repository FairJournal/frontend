import React, { useState } from 'react'
import { Button, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TelegramIcon from '@mui/icons-material/Telegram'
import IosShareIcon from '@mui/icons-material/IosShare'
import LinkIcon from '@mui/icons-material/Link'
import DoneIcon from '@mui/icons-material/Done'
import XIcon from '@mui/icons-material/X'

export const ShareButtons: React.FC<{ link: string }> = ({ link }) => {
  const [copied, setCopied] = useState(false)
  const urlTelegram = `https://t.me/share/url?text=${encodeURIComponent(`Новая статья!`)}&url=${encodeURIComponent(
    link,
  )}`

  const linkedinShareLink = `https://www.linkedin.com/shareArticle/?mini=true&url=${encodeURIComponent(
    link,
  )}&summary=${encodeURIComponent(`Новая статья!`)}`

  const twitterShareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `Новая статья!`,
  )}&url=${encodeURIComponent(link)}`

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleShareOnTelegram = (href: string) => {
    window.open(href, '_blank')
    handleClose()
  }

  const handleCopy = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 1500)
      })
      .catch(error => {
        console.error('Copy failed:', error)
      })
    handleClose()
  }

  return (
    <div>
      <Button
        size="small"
        onClick={handleClick}
        sx={{
          fontSize: '1rem',
          p: '6px 12px',
          color: 'gray',
          '& .MuiSvgIcon-root': {
            color: 'gray',
          },
        }}
        endIcon={<IosShareIcon />}
      >
        Share
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleCopy}>
          <ListItemIcon sx={{ mr: 2 }}>{copied ? <DoneIcon /> : <LinkIcon />}</ListItemIcon>
          Copy link
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleShareOnTelegram(urlTelegram)}>
          <ListItemIcon sx={{ mr: 2 }}>
            <TelegramIcon />
          </ListItemIcon>
          Share on Telegram
        </MenuItem>
        <MenuItem onClick={() => handleShareOnTelegram(twitterShareLink)}>
          <ListItemIcon sx={{ mr: 2 }}>
            <XIcon />
          </ListItemIcon>
          Share on X
        </MenuItem>
        <MenuItem onClick={() => handleShareOnTelegram(linkedinShareLink)}>
          <ListItemIcon sx={{ mr: 2 }}>
            <LinkedInIcon />
          </ListItemIcon>
          Share on LinkedIn
        </MenuItem>
      </Menu>
    </div>
  )
}
