import React from 'react'
import Avatar from '@mui/material/Avatar'
import { Box, Typography } from '@mui/material'
import { Profile } from '../../store/slices/mainSlice'
import { Link } from 'react-router-dom'

interface smallAvatarProps {
  to: string
  profile: Profile
  shortWallet: string
}

export const SmallAvatar: React.FC<smallAvatarProps> = ({ to, profile, shortWallet }) => {
  return (
    <Link to={to} style={{ textDecoration: 'none', color: '#000000', display: 'flex', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', mt: 0, mb: 0 }}>
        <Avatar alt="Avatar" src={profile.avatar} sx={{ width: 56, height: 56, mr: 1 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle2" sx={{ mb: 0, mt: 1 }}>
            {profile.title}
          </Typography>
          <Typography variant="caption" gutterBottom>
            {shortWallet}
          </Typography>
        </Box>
      </Box>
    </Link>
  )
}