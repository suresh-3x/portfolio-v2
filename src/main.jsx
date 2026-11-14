import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import './index.css'
import './styles/terminal.css'
import './styles/subpages.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { RouterProvider } from './router/Router'
import { initGoogleAnalytics } from './utils/analytics'

// Lenis smooth-scroll options: optimized for performance
const lenisOptions = {
  lerp: 0.14, // soft easing that still tracks the wheel; 0.08 felt like lag
  smoothWheel: true,
  wheelMultiplier: 1.0,
  touchMultiplier: 1.0,
  syncTouch: false,
  preventDefault: (node) => node.classList.contains('no-scroll'),
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
        <RouterProvider>
          <App />
          <Analytics mode='production' />
        </RouterProvider>
      </ReactLenis>
    </ThemeProvider>
  </StrictMode>,
)
