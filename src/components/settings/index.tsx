/* eslint-disable no-console */
import React, { useState } from 'react'
import { Box, Chip, Container, Divider, Paper, Button, TextField, Grid } from '@mui/material'
import { AvatarPicker } from './avatarPicker'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { changeProfile, selectMain } from '../../store/slices/mainSlice'
import { shortenString } from '../../utils'
import { useTonAddress } from '@tonconnect/ui-react'
import { updateUser } from '../../api/users'

export const Settings = () => {
  const { profile, wallet } = useAppSelector(selectMain)
  const dispatch = useAppDispatch()
  const [avatar, setAvatar] = useState<File | undefined>()
  const [name, setName] = useState(profile ? profile.name : '')
  const [description, setDescription] = useState(profile ? profile.description : '')
  const userFriendlyAddress = useTonAddress()

  const saveSettings = async () => {
    try {
      if (profile) {
        const res = await updateUser(profile.id, {
          name,
          description,
          avatar,
          wallet,
        })
        dispatch(changeProfile({ ...profile, name, description, avatar: res.avatar }))
      }
    } catch (e) {
      console.log(e)
    }
  }

  const shortWallet = shortenString(userFriendlyAddress)

  return (
    <Paper sx={{ with: '600px', backgroundColor: 'secondary', pt: 2 }} elevation={3}>
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ display: 'flex', mt: 4, mb: 2 }}>
          <AvatarPicker avatarUrl={avatar} onAvatarChange={setAvatar} />
          <Grid item md={5} xs={10}>
            <TextField
              id="standard-basic"
              label={`Name ${name.length}/30`}
              variant="outlined"
              value={name}
              onChange={event => setName(event.target.value)}
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
            label={`Bio ${description.length}/180`}
            variant="outlined"
            value={description}
            onChange={event => setDescription(event.target.value)}
            sx={{ display: 'block', mb: 2 }}
            inputProps={{ maxLength: 180 }}
            multiline
            fullWidth
          />
        </Box>
        <Divider sx={{ mt: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            onClick={saveSettings}
            variant="contained"
            color="success"
            sx={{ color: '#ffffff', mt: 2, mb: 2, p: 2 }}
          >
            Save Settings
          </Button>
        </Box>
      </Container>
    </Paper>
  )
}
