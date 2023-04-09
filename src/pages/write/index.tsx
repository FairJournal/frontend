import React, { useRef, useCallback } from 'react'
import { createReactEditorJS } from 'react-editor-js'
import { Link } from 'react-router-dom'
import { EDITOR_JS_TOOLS } from './tools'
import { Container, Avatar, Typography, Toolbar, Box, AppBar, Button } from '@mui/material'
import { OutputData } from '@editorjs/editorjs'

const ReactEditorJS = createReactEditorJS()

interface EditorCore {
  destroy(): Promise<void>

  clear(): Promise<void>

  save(): Promise<OutputData>

  render(data: OutputData): Promise<void>
}

export const Write = () => {
  const editorCore = useRef<EditorCore | null>(null)

  const handleInitialize = useCallback((instance: EditorCore) => {
    editorCore.current = instance
  }, [])

  const handleSave = useCallback(async () => {
    const savedData = await editorCore.current?.save()
    // eslint-disable-next-line no-console
    console.log(savedData)
  }, [])

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
            <Link
              to="/dashboard"
              style={{ textDecoration: 'none', color: '#000000', display: 'flex', alignItems: 'center' }}
            >
              <Box sx={{ display: 'flex', mt: 0, mb: 0 }}>
                <Avatar alt="Avatar" src="/images/M4.png" sx={{ width: 56, height: 56, mr: 1 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="subtitle2" sx={{ mb: 0, mt: 1 }}>
                    Igor Cgernyshev
                  </Typography>
                  <Typography variant="caption" gutterBottom>
                    0x423...343222
                  </Typography>
                </Box>
              </Box>
            </Link>
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
