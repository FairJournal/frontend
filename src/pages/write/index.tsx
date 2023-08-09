/* eslint-disable no-console */
import React, { useRef, useCallback, useEffect, useState } from 'react'
import { createReactEditorJS } from 'react-editor-js'
import { getEditorJsTools } from './tools'
import { Container, Toolbar, AppBar, Button, Box, ThemeProvider } from '@mui/material'
import { OutputData } from '@editorjs/editorjs'
import { SmallAvatar } from '../../components/smallAvatar'
import { findArticleById, shortenString } from '../../utils'
import { useAppSelector } from '../../store/hooks'
import { selectMain } from '../../store/slices/mainSlice'
import { useDispatch } from 'react-redux'
import { useTonAddress } from '@tonconnect/ui-react'
import { useNavigate, useParams } from 'react-router-dom'
import { theme } from '../../App'
import { addArticleToFs, addProfileInfo } from '../../utils/fs'
import { getPathInfo, getProfileInfo } from '../../api/users'
import { geArticleBySlug, getUserArticles } from '../../api/article'

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
  const [editArticle, setEditArticle] = useState<OutputData | null | undefined>(null)
  const { edit } = useParams()
  const { profile, articles, wallet, publickey } = useAppSelector(selectMain)
  const dispatch = useDispatch()
  const userFriendlyAddress = useTonAddress()
  const navigate = useNavigate()

  let EDITOR_JS_TOOLS

  if (profile) {
    EDITOR_JS_TOOLS = getEditorJsTools(profile.id)
  }

  useEffect(() => {
    if (edit !== 'new' && typeof Number(edit) === 'number') {
      const res = findArticleById(articles, Number(edit))
      setEditArticle(res)
    } else {
      setEditArticle(defaultValue)
    }
  }, [edit])

  const handleInitialize = useCallback((instance: EditorCore) => {
    editorCore.current = instance
  }, [])

  const handleSave = useCallback(async () => {
    const savedData = (await editorCore.current?.save()) as OutputData

    // const responss = await getPathInfo({ userAddress: publickey, path: '/profile-json' })
    // console.log(responss)
    // console.log(savedData)
    // const res = await addArticleToFs({ data: savedData, address: publickey })
    // console.log(res)

    // const res = await uploadJsonFile(savedData)
    // console.log(res)
    // console.log(wallet)

    // const respon = await getUserArticles(publickey)
    // console.log(respon)

    // const respon = await getProfileInfo(wallet)
    // console.log(respon)
    // const respon = await removeArticleToFs({ address: wallet, slug: 'your-header-textsdcsdc' })
    // console.log(respon)
    // const respon = await addProfileInfo({
    //   address: wallet,
    //   data: {
    //     avatar: 'dfv',
    //     name: 'No User Namewefwefwefwef',
    //     description: 'No Uwefwefwdfvdvefwefwefwser Descridfvdfption',
    //   },
    // })
    // console.log(respon)

    const respons = await geArticleBySlug({ userAddress: publickey, slug: 'o-o-o' })
    console.log(respons)
    // try {
    //   if (!profile) {
    //     return
    //   }

    //   const savedData = await editorCore.current?.save()

    //   if (savedData !== undefined && savedData.time && savedData.blocks) {
    //     if (edit === 'new') {
    //       const id = await createArticle({ authorId: profile.id, hash: '00000000000', content: savedData })
    //       dispatch(saveArticle({ id, time: savedData.time, blocks: savedData.blocks }))
    //     } else {
    //       const id = await updateArticle(Number(edit), profile.id, '00000000000', savedData)

    //       // eslint-disable-next-line max-depth
    //       if (id) {
    //         dispatch(updateArticleBy({ id, time: savedData.time, blocks: savedData.blocks }))
    //       }
    //     }
    //     navigate('/dashboard')
    //   }
    // } catch (e) {
    //   console.log(e)
    // }
  }, [])

  const shortWallet = shortenString(userFriendlyAddress)

  return (
    <>
      <Box sx={{ backgroundColor: '#fff', minHeight: '100vh', minWidth: '90vw' }}>
        <Container maxWidth="md">
          <AppBar position="fixed" sx={{ backgroundColor: '#fff' }}>
            <Toolbar
              sx={{
                display: 'flex',
                backgroundColor: 'fff',
                justifyContent: { md: 'space-between', xs: 'space-around' },
              }}
            >
              {profile && (
                <SmallAvatar
                  to="/dashboard"
                  profile={{ name: profile.name, avatar: profile.avatar, wallet: shortWallet }}
                />
              )}
              <Button variant="outlined" color="success" sx={{ m: 1 }} onClick={handleSave}>
                Publish
              </Button>
            </Toolbar>
          </AppBar>
          <Toolbar />
          {editArticle !== null && (
            <ThemeProvider theme={theme}>
              <ReactEditorJS
                autofocus={true}
                onInitialize={handleInitialize}
                tools={EDITOR_JS_TOOLS}
                defaultValue={editArticle}
              />
            </ThemeProvider>
          )}
        </Container>
      </Box>
    </>
  )
}
