import React, { SetStateAction, useState } from 'react'
import { Box, Chip, Container, Divider, Paper, Button, TextField, Grid } from '@mui/material'
import { AvatarPicker } from './avatarPicker'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { changeProfile, selectMain } from '../../store/slices/mainSlice'
import { shortenString } from '../../utils'
import { addProfileInfo, uploadFile } from '../../utils/fs'
import EditIcon from '@mui/icons-material/Edit'
import { Typography } from '@mui/material'
import TelegramIcon from '@mui/icons-material/Telegram'
import GithubIcon from '@mui/icons-material/GitHub'
import LinkedinIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'

function extractSocialHandler(url: string) {
  const parts = url.split('/')
  // Filter out empty parts (which can be caused by trailing slashes)
  const filteredParts = parts.filter(part => part !== '')

  return filteredParts[filteredParts.length - 1]
}

export const Settings = () => {
  const { profile, publickey, wallet } = useAppSelector(selectMain)
  const dispatch = useAppDispatch()
  const [avatar, setAvatar] = useState<File | undefined>()
  const [name, setName] = useState(profile ? profile.name : '')
  const [description, setDescription] = useState(profile ? profile.description : '')
  const [telegram, setTelegram] = useState(profile?.telegram ?? '')
  const [github, setGithub] = useState(profile?.github ?? '')
  const [twitter, setTwitter] = useState(profile?.twitter ?? '')
  const [linkedin, setLinkedin] = useState(profile?.linkedin ?? '')
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const saveSettings = async () => {
    try {
      if (!profile) {
        return
      }

      // Update state and capture the new values synchronously
      const newTelegram = extractSocialHandler(telegram)
      const newGithub = extractSocialHandler(github)
      const newTwitter = extractSocialHandler(twitter)
      const newLinkedin = extractSocialHandler(linkedin)

      // Set state with new values
      setTelegram(newTelegram)
      setGithub(newGithub)
      setTwitter(newTwitter)
      setLinkedin(newLinkedin)

      let hashAvatar = profile.avatar

      if (avatar) {
        hashAvatar = (await uploadFile(avatar)).data.reference
      }

      await addProfileInfo({
        address: publickey,
        data: {
          avatar: hashAvatar,
          name,
          description,
          wallet,
          telegram: newTelegram,
          twitter: newTwitter,
          github: newGithub,
          linkedin: newLinkedin,
        },
      })

      dispatch(changeProfile({ ...profile, name, description, avatar: hashAvatar }))
      setIsEdit(false)
    } catch (e) {
      console.log(e)
    }
  }

  const extractLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g

    return text.match(urlRegex) || []
  }

  const cancelEdit = () => {
    setDescription(profile ? profile.description : '')
    setIsEdit(false)
  }

  const renderTextWithLinksAndLineBreaks = (text: string) => {
    const links = extractLinks(text)
    let lastIndex = 0
    const components = []

    links.forEach((link, index) => {
      const parts = text.split(link)

      if (parts[0]) {
        components.push(
          parts[0],
          <a key={`link${index}`} href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>,
        )
      }
      lastIndex = parts[0].length + link.length
    })

    components.push(text.slice(lastIndex))

    const finalComponents: JSX.Element[] = []
    components.forEach((component, index) => {
      if (typeof component === 'string') {
        finalComponents.push(
          ...component.split('\n').map((line, i) => (
            <React.Fragment key={`${index}-${i}`}>
              {line}
              <br />
            </React.Fragment>
          )),
        )
      } else {
        finalComponents.push(component)
      }
    })

    return finalComponents
  }

  const shortWallet = shortenString({ str: wallet })

  return (
    <Paper sx={{ with: '600px', backgroundColor: 'secondary', pt: 2 }} elevation={3}>
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ display: 'flex', mt: 4, mb: 2 }}>
          <AvatarPicker avatarUrl={avatar} onAvatarChange={setAvatar} isdisabled={!isEdit} />
          <Grid item md={5} xs={10}>
            <TextField
              disabled={!isEdit}
              id="standard-basic"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(event: { target: { value: React.SetStateAction<string> } }) => setName(event.target.value)}
              sx={{
                display: 'block',
                mb: 2,
              }}
              inputProps={{ maxLength: 30 }}
              fullWidth
            />
            <Chip title={wallet} label={shortWallet} />
          </Grid>
        </Grid>
        <Divider sx={{ mb: 2 }} />
        <Box>
          {isEdit ? (
            <>
              <TextField
                disabled={!isEdit}
                id="standard-basic"
                label="Bio"
                variant="outlined"
                value={description}
                onChange={(event: { target: { value: SetStateAction<string> } }) => setDescription(event.target.value)}
                sx={{ display: 'block', mb: 2 }}
                inputProps={{ maxLength: 180 }}
                multiline
                fullWidth
              />
              <TextField
                disabled={!isEdit}
                id="standard-basic"
                label="Telegram"
                variant="outlined"
                value={telegram}
                onChange={(event: { target: { value: string } }) => setTelegram(event.target.value)}
                sx={{ display: 'block', mb: 2 }}
                inputProps={{ maxLength: 180 }}
                fullWidth
              />
              <TextField
                disabled={!isEdit}
                id="standard-basic"
                label="Github"
                variant="outlined"
                value={github}
                onChange={(event: { target: { value: string } }) => setGithub(event.target.value)}
                sx={{ display: 'block', mb: 2 }}
                inputProps={{ maxLength: 180 }}
                fullWidth
              />
              <TextField
                disabled={!isEdit}
                id="standard-basic"
                label="Linkedin"
                variant="outlined"
                value={linkedin}
                onChange={(event: { target: { value: string } }) => setLinkedin(event.target.value)}
                sx={{ display: 'block', mb: 2 }}
                inputProps={{ maxLength: 180 }}
                fullWidth
              />
              <TextField
                disabled={!isEdit}
                id="standard-basic"
                label="Twitter"
                variant="outlined"
                value={twitter}
                onChange={(event: { target: { value: string } }) => setTwitter(event.target.value)}
                sx={{ display: 'block', mb: 2 }}
                inputProps={{ maxLength: 180 }}
                fullWidth
              />
            </>
          ) : (
            <>
              <Typography component="div">{renderTextWithLinksAndLineBreaks(description)}</Typography>
              <hr />
              {telegram && (
                <Typography component="div">
                  <a
                    key={`link-telegram`}
                    href={`https://t.me/${telegram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}
                  >
                    <TelegramIcon style={{ marginRight: 8, width: 24 }} />
                    t.me/{telegram}
                  </a>
                </Typography>
              )}
              {github && (
                <Typography component="div">
                  <a
                    key={`link-github`}
                    href={`https://github.com/${github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}
                  >
                    <GithubIcon style={{ marginRight: 8, width: 24 }} />
                    github.com/{github}
                  </a>
                </Typography>
              )}
              {linkedin && (
                <Typography component="div">
                  <a
                    key={`link-linkedin`}
                    href={`https://linkedin.com/in/${linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}
                  >
                    <LinkedinIcon style={{ marginRight: 8, width: 24 }} />
                    linkedin.com/in/{linkedin}
                  </a>
                </Typography>
              )}
              {twitter && (
                <Typography component="div">
                  <a
                    key={`link-twitter`}
                    href={`https://x.com/${twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}
                  >
                    <TwitterIcon style={{ marginRight: 8, width: 24 }} />
                    x.com/{twitter}
                  </a>
                </Typography>
              )}
            </>
          )}
        </Box>
        <Divider sx={{ mt: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'end', p: 2 }}>
          {isEdit ? (
            <>
              <Button sx={{ mr: 2 }} onClick={cancelEdit} variant="outlined" color="success">
                Cancel
              </Button>
              <Button onClick={saveSettings} variant="contained" color="success">
                Save
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEdit(true)} variant="contained" color="success">
                Edit <EditIcon sx={{ fontSize: 20, ml: 1 }} />
              </Button>
            </>
          )}
        </Box>
      </Container>
    </Paper>
  )
}
