/* eslint-disable no-console */
import React, { useRef, useCallback, useEffect, useState } from 'react'
import { createReactEditorJS } from 'react-editor-js'
import { getEditorJsTools } from './tools'
import { Container, Toolbar, AppBar, Button, Box } from '@mui/material'
import { OutputData } from '@editorjs/editorjs'
import { SmallAvatar } from '../../components/smallAvatar'
import { findArticleById, shortenString } from '../../utils'
import { useAppSelector } from '../../store/hooks'
import { saveArticle, selectMain, updateArticleBy } from '../../store/slices/mainSlice'
import { useDispatch } from 'react-redux'
import { useTonAddress } from '@tonconnect/ui-react'
import { createArticle } from '../../api/users'
import { useNavigate, useParams } from 'react-router-dom'
import { updateArticle } from '../../api/article'

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
  const { profile, articles } = useAppSelector(selectMain)
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
      console.log(res)
      setEditArticle(res)
    } else {
      setEditArticle(defaultValue)
    }
  }, [edit])

  const handleInitialize = useCallback((instance: EditorCore) => {
    editorCore.current = instance
  }, [])

  const handleSave = useCallback(async () => {
    try {
      if (!profile) {
        return
      }

      const savedData = await editorCore.current?.save()
      console.log(savedData)

      if (savedData !== undefined && savedData.time && savedData.blocks) {
        if (edit === 'new') {
          const id = await createArticle({ authorId: profile.id, hash: '00000000000', content: savedData })
          dispatch(saveArticle({ id, time: savedData.time, blocks: savedData.blocks }))
        } else {
          const id = await updateArticle(Number(edit), profile.id, '00000000000', savedData)

          // eslint-disable-next-line max-depth
          if (id) {
            dispatch(updateArticleBy({ id, time: savedData.time, blocks: savedData.blocks }))
          }
        }
        navigate('/dashboard')
      }
    } catch (e) {
      console.log(e)
    }
  }, [])

  const shortWallet = shortenString(userFriendlyAddress)

  return (
    <>
      <Box sx={{ backgroundColor: '#fff', minHeight: '100vh', minWidth: '90vw' }}>
        <Container maxWidth="md">
          <AppBar position="fixed">
            <Toolbar sx={{ display: 'flex', justifyContent: { md: 'space-between', xs: 'space-around' } }}>
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
            <ReactEditorJS
              autofocus={true}
              onInitialize={handleInitialize}
              tools={EDITOR_JS_TOOLS}
              defaultValue={editArticle}
            />
          )}
        </Container>
      </Box>
    </>
  )
}
