import React, { useState } from 'react'
import { IconButton } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import TelegramIcon from '@mui/icons-material/Telegram'
import LinkIcon from '@mui/icons-material/Link'
import DoneIcon from '@mui/icons-material/Done'

interface SocialButtonProps {
  href: string
  background: string
  color: string
  icon: React.ReactNode
}

const SocialButton: React.FC<SocialButtonProps> = ({ href, background, color, icon }) => {
  const handleShareOnTelegram = () => {
    window.open(href, '_blank')
  }

  return (
    <IconButton sx={{ background, color, mr: 1 }} onClick={handleShareOnTelegram}>
      {icon}
    </IconButton>
  )
}

export const ShareButtons: React.FC<{ link: string }> = ({ link }) => {
  const [copied, setCopied] = useState(false)

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
  }
  const socials = [
    {
      href: `${process.env.REACT_APP_URL_SHARE_LINKEDIN}${link}`,
      background: '#0a66c2',
      color: 'white',
      icon: <LinkedInIcon sx={{ fontSize: 13, p: 0 }} />,
    },
    {
      href: `${process.env.REACT_APP_URL_SHARE_TWITTER}${link}`,
      background: '#00aced',
      color: 'white',
      icon: <TwitterIcon sx={{ fontSize: 13, p: 0 }} />,
    },
    {
      href: `${process.env.REACT_APP_URL_SHARE_TELEGRAM}${link}`,
      background: '#00aced',
      color: 'white',
      icon: <TelegramIcon sx={{ fontSize: 13, p: 0 }} />,
    },
  ]

  return (
    <div>
      {socials.map((social, index) => (
        <SocialButton key={index} {...social} />
      ))}
      <IconButton sx={{ backgroundColor: '#f8f7fa', color: '#000', mr: 1 }} onClick={handleCopy}>
        {copied ? <DoneIcon sx={{ fontSize: 18, p: 0 }} /> : <LinkIcon sx={{ fontSize: 18, p: 0 }} />}
      </IconButton>
    </div>
  )
}
