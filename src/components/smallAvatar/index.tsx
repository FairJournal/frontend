/* eslint-disable no-console */
import React from 'react'
import Avatar from '@mui/material/Avatar'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

interface SmallAvatarProps {
  to: string
  profile: { name: string; avatar: string; wallet: string }
}

export const SmallAvatar: React.FC<SmallAvatarProps> = ({ to, profile }) => {
  return (
    <Box sx={{ display: 'flex', mt: 0, mb: 0 }}>
      <Link to={to} style={{ textDecoration: 'none', color: '#000000', display: 'flex', alignItems: 'center' }}>
        <Avatar
          alt="Avatar"
          src={`${process.env.REACT_APP_URL_API}${profile.avatar}`}
          sx={{ width: 56, height: 56, mr: 1 }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle2" sx={{ mb: 0, mt: 1 }}>
            {profile.name}
          </Typography>
          <Typography variant="caption" gutterBottom>
            {profile.wallet}
          </Typography>
        </Box>
      </Link>
    </Box>
  )
}
