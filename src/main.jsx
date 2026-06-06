import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import './index.css'
import './styles/terminal.css'
import './styles/paper.css'
import App from './App.jsx'
import { ViewProvider } from './context/ViewContext'
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
    <ViewProvider>
      <ReactLenis root options={lenisOptions}>
        <App />
        <Analytics mode='production' />
      </ReactLenis>
    </ViewProvider>
  </StrictMode>,
)
