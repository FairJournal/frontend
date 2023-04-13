import React from 'react'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { Box } from '@mui/material'
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined'

interface AvatarPickerProps {
  avatarUrl: string
  onAvatarChange: (newAvatar: string) => void
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({ avatarUrl, onAvatarChange }) => {
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        onAvatarChange(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Box>
      <IconButton color="primary" component="label">
        <Avatar src={avatarUrl} sx={{ width: 150, height: 150, mr: 2, backgroundColor: '#F2F3F4' }}>
          <UploadOutlinedIcon sx={{ width: 56, height: 56, color: '#616161' }} />
        </Avatar>
        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
      </IconButton>
    </Box>
  )
}
