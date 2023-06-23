import React from 'react'
import { IconButton } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import TelegramIcon from '@mui/icons-material/Telegram'

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
  const socials = [
    {
      href: `https://www.linkedin.com/shareArticle/?mini=true&url=${link}`,
      background: '#0a66c2',
      color: 'white',
      icon: <LinkedInIcon />,
    },
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${link}`,
      background: '#3b5898',
      color: 'white',
      icon: <FacebookIcon />,
    },
    {
      href: `https://twitter.com/intent/tweet?url=${link}`,
      background: '#00aced',
      color: 'white',
      icon: <TwitterIcon />,
    },
    {
      href: `https://t.me/share/url?url=${link}`,
      background: '#00aced',
      color: 'white',
      icon: <TelegramIcon />,
    },
  ]

  return (
    <div>
      {socials.map((social, index) => (
        <SocialButton key={index} {...social} />
      ))}
    </div>
  )
}
