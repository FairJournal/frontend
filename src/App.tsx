import React from 'react'
import { Main } from './pages/main'
import { Box, createTheme, ThemeProvider } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import { AboutUs } from './pages/aboutus'
import { Header } from './components/header'
import { Footer } from './components/footer'
import { HowItWorks } from './pages/howitworks'
import { Blog } from './pages/blog'
import { Community } from './pages/community'

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
      },
      secondary: {
        main: '#000000',
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
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/howitworks" element={<HowItWorks />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/community" element={<Community />} />
          </Routes>
          <Footer />
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default App
