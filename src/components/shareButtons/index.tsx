import React from 'react'
import { IconButton } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
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
      icon: <LinkedInIcon sx={{ fontSize: 20 }} />,
    },
    {
      href: `https://twitter.com/intent/tweet?url=${link}`,
      background: '#00aced',
      color: 'white',
      icon: <TwitterIcon sx={{ fontSize: 20 }} />,
    },
    {
      href: `https://t.me/share/url?url=${link}`,
      background: '#00aced',
      color: 'white',
      icon: <TelegramIcon sx={{ fontSize: 20 }} />,
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
