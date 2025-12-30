import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { initGoogleAnalytics } from './utils/analytics'

// Initialize Google Analytics
initGoogleAnalytics()

// Fix for mobile "scroll crawling" on reload
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Analytics mode='production' />
    </ThemeProvider>
  </StrictMode>,
)
