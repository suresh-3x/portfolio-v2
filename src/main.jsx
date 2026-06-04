import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import './index.css'
import './styles/neobrutalism.css'
import './styles/editorial.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { initGoogleAnalytics } from './utils/analytics'

// Lenis smooth-scroll options: momentum wheel + gentle touch sync.
const lenisOptions = {
  lerp: 0.1,
  smoothWheel: true,
  wheelMultiplier: 1,
  syncTouch: false,
};

// Initialize Google Analytics
initGoogleAnalytics()

// Fix for mobile "scroll crawling" on reload
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ReactLenis root options={lenisOptions}>
        <App />
        <Analytics mode='production' />
      </ReactLenis>
    </ThemeProvider>
  </StrictMode>,
)
