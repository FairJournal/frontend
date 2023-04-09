import React from 'react'
import { Main } from './pages/main'
import { Box, createTheme, ThemeProvider } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import { AboutUs } from './pages/aboutus'
import { Footer } from './components/footer'
import { HowItWorks } from './pages/howitworks'
import { Blog } from './pages/blog'
import { Community } from './pages/community'
import { Dashboard } from './pages/dashboard'
import { Profile } from './pages/profile'
import { Write } from './pages/write'

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        'GFS Didot',
        'serif',
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
        fontSize: '1.1rem',
      },
    },
    palette: {
      primary: {
        main: '#FAF7F5',
        light: '#F2F3F4',
      },
      secondary: {
        main: '#000000',
      },
      success: {
        main: '#0EB8B7',
      },
    },
  })

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            backgroundColor: 'primary.main',
            minHeight: '100vh',
            position: 'relative',
          }}
        >
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/howitworks" element={<HowItWorks />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/community" element={<Community />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/write" element={<Write />} />
          </Routes>
          <Footer />
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default App
