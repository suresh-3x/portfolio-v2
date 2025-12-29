import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { initGoogleAnalytics } from './utils/analytics'

// Initialize Google Analytics
initGoogleAnalytics()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Analytics mode='production' />
    </ThemeProvider>
  </StrictMode>,
)
