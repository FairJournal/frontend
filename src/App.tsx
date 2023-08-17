import React from 'react'
import { Main } from './pages/main'
import { Box, createTheme, ThemeProvider } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import { AboutUs } from './pages/aboutus'
import { HowItWorks } from './pages/howitworks'
import { Blog } from './pages/blog'
import { Community } from './pages/community'
import { Dashboard } from './pages/dashboard'
import { Profile } from './pages/profile'
import { Write } from './pages/write'
import { RenderArticle } from './pages/renderarticle'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { NotFound } from './pages/notfound'

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '2rem',
          fontSize: '1.2rem',
          lineHeight: '1.2rem',
          padding: '0.7rem 1.4rem',
          textTransform: 'capitalize',
        },
      },
    },
  },
  typography: {
    fontSize: 20,
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 400,
    },
    h6: {
      fontWeight: 400,
    },
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    body1: {
      fontSize: '20px',
    },
    body2: {
      fontSize: '16px',
    },
  },
  palette: {
    primary: {
      main: '#5479F7',
      light: '#CADDFF',
    },
    secondary: {
      main: '#ffffff',
      light: '#F2F3F4',
    },
    success: {
      main: '#37A1AB',
      light: '#000',
    },
  },
})

function App() {
  return (
    <>
      <TonConnectUIProvider manifestUrl="https://fairjournal.net/tonconnect-manifest.json">
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              backgroundColor: 'secondary.main',
              minHeight: '100vh',
              position: 'relative',
            }}
          >
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/howitworks" element={<HowItWorks />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/community" element={<Community />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile/:address" element={<Profile />} />
              <Route path="/write/:address?/:slug?" element={<Write />} />
              <Route path="/:address/:slug" element={<RenderArticle />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </TonConnectUIProvider>
    </>
  )
}

export default App
