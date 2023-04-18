import React, { useRef, useCallback } from 'react'
import { createReactEditorJS } from 'react-editor-js'
import { EDITOR_JS_TOOLS } from './tools'
import { Container, Toolbar, AppBar, Button } from '@mui/material'
import { OutputData } from '@editorjs/editorjs'
import { SmallAvatar } from '../../components/smallAvatar'
import { shortenString } from '../../utils'
import { useAppSelector } from '../../store/hooks'
import { saveArticle, selectMain } from '../../store/slices/mainSlice'
import { useDispatch } from 'react-redux'

const ReactEditorJS = createReactEditorJS()

interface EditorCore {
  destroy(): Promise<void>

  clear(): Promise<void>

  save(): Promise<OutputData>

  render(data: OutputData): Promise<void>
}

export const Write = () => {
  const editorCore = useRef<EditorCore | null>(null)
  const { wallet, profile } = useAppSelector(selectMain)
  const dispatch = useDispatch()

  const handleInitialize = useCallback((instance: EditorCore) => {
    editorCore.current = instance
  }, [])

  const handleSave = useCallback(async () => {
    const savedData = await editorCore.current?.save()
    // eslint-disable-next-line no-console
    console.log(savedData)

    if (savedData !== undefined) dispatch(saveArticle(savedData))
  }, [])

  const shortWallet = shortenString(wallet)

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: '#fff',
          minHeight: '100vh',
        }}
      >
        <AppBar position="fixed">
          <Toolbar sx={{ display: 'flex', justifyContent: { md: 'space-between', xs: 'space-around' } }}>
            <SmallAvatar shortWallet={shortWallet} to="/dashboard" profile={profile} />
            <Button variant="outlined" color="success" sx={{ m: 1 }} onClick={handleSave}>
              Publish
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <ReactEditorJS
          onInitialize={handleInitialize}
          tools={EDITOR_JS_TOOLS}
          defaultValue={{
            time: 1635603431943,
            blocks: [
              {
                id: 'sheNwCUP5A',
                type: 'header',
                data: {
                  text: 'Title',
                  level: 1,
                },
              },
            ],
          }}
        />
      </Container>
    </>
  )
}
