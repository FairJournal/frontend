import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { Alert } from '@mui/material'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Alert severity="error">
        This is a development version of the website. Please note that all articles and data will be removed upon the
        release of the main version. Thank you for your understanding.
      </Alert>
      <App />
    </Provider>
  </BrowserRouter>,
)
