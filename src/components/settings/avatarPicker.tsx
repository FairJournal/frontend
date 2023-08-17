import React from 'react'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { Box } from '@mui/material'
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined'
import { useAppSelector } from '../../store/hooks'
import { selectMain } from '../../store/slices/mainSlice'
import { hashToUrl } from '../../utils'

interface AvatarPickerProps {
  avatarUrl: File | undefined
  onAvatarChange: (avatarFile: File) => void
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({ avatarUrl, onAvatarChange }) => {
  const { profile } = useAppSelector(selectMain)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]

    if (file) {
      onAvatarChange(file)
    }
  }

  const avatar = avatarUrl ? URL.createObjectURL(avatarUrl) : undefined

  return (
    <Box>
      {profile && (
        <Box>
          <IconButton color="primary" component="label">
            <Avatar
              src={avatar ?? `${hashToUrl(profile.avatar)}`}
              sx={{ width: 150, height: 150, mr: 2, backgroundColor: '#fff' }}
            >
              <UploadOutlinedIcon sx={{ width: 56, height: 56, color: '#616161' }} />
            </Avatar>
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
          </IconButton>
        </Box>
      )}
    </Box>
  )
}
