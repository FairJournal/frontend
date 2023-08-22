import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import { Alert, Box } from '@mui/material'
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
  const [showFileSizeError, setShowFileSizeError] = useState(false)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]

    if (file) {
      if (file.size <= Number(process.env.REACT_APP_MAX_SIZE_FILE)) {
        onAvatarChange(file)
      } else {
        setShowFileSizeError(true)

        setTimeout(() => {
          setShowFileSizeError(false)
        }, 4000)
      }
    }

    if (e.target) {
      e.target.value = ''
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
              sx={{ width: 150, height: 150, backgroundColor: '#fff' }}
            >
              <UploadOutlinedIcon sx={{ width: 56, height: 56, color: '#616161' }} />
            </Avatar>
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
          </IconButton>
          {showFileSizeError && (
            <Alert
              severity="error"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                marginBottom: 2,
                marginRight: 2,
                zIndex: 10,
              }}
            >
              File size exceeds the limit of 10MB
            </Alert>
          )}
        </Box>
      )}
    </Box>
  )
}
