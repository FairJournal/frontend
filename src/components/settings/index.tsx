/* eslint-disable no-console */
import React, { useState } from 'react'
import { Box, Chip, Container, Divider, Paper, Button, TextField, Grid } from '@mui/material'
import { AvatarPicker } from './avatarPicker'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { changeProfile, selectMain } from '../../store/slices/mainSlice'
import { shortenString } from '../../utils'
import { useTonAddress } from '@tonconnect/ui-react'

export const Settings = () => {
  const { profile } = useAppSelector(selectMain)
  const dispatch = useAppDispatch()
  const [avatar, setAvatar] = useState(profile ? profile.avatar : '')
  const [title, setTitle] = useState(profile ? profile.title : '')
  const [bio, setBio] = useState(profile ? profile.bio : '')
  const userFriendlyAddress = useTonAddress()

  const handleAvatarChange = (newAvatar: string) => {
    setAvatar(newAvatar)
  }

  const saveSettings = () => {
    if (profile) {
      dispatch(changeProfile({ id: profile?.id, avatar, title, bio }))
    }
  }

  const shortWallet = shortenString(userFriendlyAddress)

  return (
    <Paper sx={{ with: '600px', backgroundColor: 'primary.main', pt: 2 }} elevation={3}>
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ display: 'flex', mt: 4, mb: 2 }}>
          <AvatarPicker avatarUrl={avatar} onAvatarChange={handleAvatarChange} />
          <Grid item md={5} xs={10}>
            <TextField
              id="standard-basic"
              label={`Name ${title.length}/30`}
              variant="outlined"
              value={title}
              onChange={event => setTitle(event.target.value)}
              sx={{ display: 'block', mb: 2 }}
              inputProps={{ maxLength: 30 }}
              fullWidth
            />
            <Chip label={shortWallet} />
          </Grid>
        </Grid>
        <Divider sx={{ mb: 2 }} />
        <Box>
          <TextField
            id="standard-basic"
            label={`Bio ${bio.length}/180`}
            variant="outlined"
            value={bio}
            onChange={event => setBio(event.target.value)}
            sx={{ display: 'block', mb: 2 }}
            inputProps={{ maxLength: 180 }}
            multiline
            fullWidth
          />
        </Box>
        <Divider sx={{ mt: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button onClick={saveSettings} variant="contained" color="success" sx={{ color: '#ffffff', mt: 2, mb: 2 }}>
            Save Settings
          </Button>
        </Box>
      </Container>
    </Paper>
  )
}
