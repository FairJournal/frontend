import React from 'react'
import { Main } from './pages/main'
import { Box, createTheme, ThemeProvider } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import { Whitepaper } from './pages/whitepaper'
import { Header } from './components/header'
import { Footer } from './components/footer'

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
    },
    palette: {
      primary: {
        main: '#FAF7F5',
      },
      secondary: {
        main: '#FAF7F5',
      },
    },
  })

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: 'primary.main' }}>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/whitepaper" element={<Whitepaper />} />
          </Routes>
          <Footer />
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default App
