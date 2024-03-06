import React from 'react'
import Avatar from '@mui/material/Avatar'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { shortenName, shortenString } from '../../utils'

interface SmallAvatarProps {
  to: string
  profile: { name: string; avatar: string; wallet: string }
}

export const SmallAvatar: React.FC<SmallAvatarProps> = ({ to, profile }) => {
  const shortWallet = shortenString(profile.wallet)
  const shortName = shortenName(profile.name)

  return (
    <Box sx={{ display: 'flex', mt: 0, mb: 0 }}>
      <Link to={to} style={{ textDecoration: 'none', color: '#000', display: 'flex', alignItems: 'center' }}>
        <Avatar alt="Avatar" src={profile.avatar} sx={{ width: 56, height: 56, mr: 1 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography title={profile.name} variant="subtitle2" sx={{ mb: 0, mt: 1, whiteSpace: 'nowrap' }}>
            {shortName}
          </Typography>
          <Typography title={profile.wallet} variant="caption" gutterBottom>
            {shortWallet}
          </Typography>
        </Box>
      </Link>
    </Box>
  )
}
