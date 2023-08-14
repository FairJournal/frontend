/* eslint-disable max-depth */
import React, { useRef, useCallback, useEffect, useState } from 'react'
import { createReactEditorJS } from 'react-editor-js'
import { getEditorJsTools } from './tools'
import { Container, Toolbar, AppBar, Button, Box, ThemeProvider, Typography } from '@mui/material'
import { OutputData } from '@editorjs/editorjs'
import { SmallAvatar } from '../../components/smallAvatar'
import { isValidAddress, shortenString } from '../../utils'
import { useAppSelector } from '../../store/hooks'
import { selectMain } from '../../store/slices/mainSlice'
import { useTonAddress } from '@tonconnect/ui-react'
import { useNavigate, useParams } from 'react-router-dom'
import { theme } from '../../App'
import { getUserInfo } from '../../api/users'
import { geArticleBySlug } from '../../api/article'
import { addArticleToFs, updateArticleToFs } from '../../utils/fs'
import { NotFoundComponent } from '../../components/notfound'

const defaultValue = {
  time: 1556098174501,
  blocks: [
    {
      type: 'header',
      data: {
        text: 'Your Header Text',
        level: 1,
      },
    },
  ],
  version: '2.12.4',
}

const ReactEditorJS = createReactEditorJS()

interface EditorCore {
  destroy(): Promise<void>

  clear(): Promise<void>

  save(): Promise<OutputData>

  render(data: OutputData): Promise<void>
}

export const Write = () => {
  const editorCore = useRef<EditorCore | null>(null)
  const { profile, publickey } = useAppSelector(selectMain)
  const userFriendlyAddress = useTonAddress()
  const navigate = useNavigate()

  const { address, slug } = useParams()
  const [article, setArticle] = useState<OutputData | null>(null)
  const [status, setStatus] = useState<string>('ok')

  const EDITOR_JS_TOOLS = getEditorJsTools()

  useEffect(() => {
    const checkAddressAndFetchData = async () => {
      setStatus('pending')

      if (address) {
        if (!address || !isValidAddress(address)) {
          setStatus('notfound')

          return
        }
        try {
          const { isUserExists } = await getUserInfo(address)

          if (isUserExists) {
            try {
              if (slug) {
                try {
                  const res = (await geArticleBySlug({ userAddress: address, slug })).article.data
                  setArticle(res)
                  setStatus('ok')
                } catch {
                  setStatus('notfound')
                }
              } else {
                setStatus('notfound')
              }
            } catch {
              setStatus('notfound')
            }
          } else {
            setStatus('notfound')
          }
        } catch {
          setStatus('notfound')
        }
      } else {
        setArticle(defaultValue)
        setStatus('ok')
      }
    }

    checkAddressAndFetchData()
  }, [address, slug])

  const handleInitialize = useCallback((instance: EditorCore) => {
    editorCore.current = instance
  }, [])

  const handleSave = useCallback(async () => {
    try {
      if (!profile) {
        return
      }
      const savedData = await editorCore.current?.save()

      if (savedData !== undefined && savedData.time && savedData.blocks) {
        if (!slug) {
          await addArticleToFs({ data: savedData, address: publickey })
        } else {
          await updateArticleToFs({ data: savedData, address: publickey, slug })
        }
        navigate('/dashboard')
      }
    } catch (e) {
      console.log(e)
    }
  }, [])

  const shortWallet = shortenString(userFriendlyAddress)

  if (status === 'notfound') {
    return <NotFoundComponent />
  }

  return (
    <>
      <Box sx={{ backgroundColor: '#fff', minHeight: '100vh', minWidth: '90vw' }}>
        <Container maxWidth="md">
          {profile && (
            <>
              <AppBar position="fixed" sx={{ backgroundColor: '#fff' }}>
                <Toolbar
                  sx={{
                    display: 'flex',
                    backgroundColor: 'fff',
                    justifyContent: { md: 'space-between', xs: 'space-around' },
                  }}
                >
                  <SmallAvatar
                    to="/dashboard"
                    profile={{ name: profile.name, avatar: profile.avatar, wallet: shortWallet }}
                  />

                  <Button variant="outlined" color="success" sx={{ m: 1 }} onClick={handleSave}>
                    Publish
                  </Button>
                </Toolbar>
              </AppBar>
              <Toolbar />
            </>
          )}
          {!profile && (
            <>
              <Box
                sx={{
                  minHeight: '80vh',
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography align="center" variant="h5" sx={{ mb: 2, mt: 2 }}>
                    Something went wrong!
                  </Typography>
                  <Box>
                    <Button variant="outlined" color="inherit" onClick={() => navigate('/dashboard')}>
                      Go Dashboard
                    </Button>
                  </Box>
                </Box>
              </Box>
            </>
          )}
          {article !== null && profile && (
            <ThemeProvider theme={theme}>
              <ReactEditorJS
                autofocus={true}
                onInitialize={handleInitialize}
                tools={EDITOR_JS_TOOLS}
                defaultValue={article}
              />
            </ThemeProvider>
          )}
        </Container>
      </Box>
    </>
  )
}
