import '@fontsource/inter-tight/latin-400.css'
import '@fontsource/inter-tight/latin-500.css'
import '@fontsource/inter-tight/latin-600.css'
import '@fontsource/inter-tight/latin-700.css'
import '@fontsource/inter-tight/latin-800.css'
import '@fontsource/instrument-serif/latin-400.css'
import '@fontsource/instrument-serif/latin-400-italic.css'
import '@fontsource/geist-mono/latin-400.css'
import '@fontsource/geist-mono/latin-500.css'
import './index.css'

import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { metaFor } from './content/meta'
import { ScrollTrigger } from './lib/gsap'

declare global {
  interface Window {
    __avraReady?: boolean
  }
}

const container = document.getElementById('root')!
const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Hydrate only when the prerendered HTML matches this URL; otherwise render fresh
// (dev mode, or a host that served a fallback page).
const path = window.location.pathname.replace(/\/+$/, '') || '/'
const prerendered = container.dataset.route
const matches = prerendered === path || (prerendered === '/404' && !metaFor(path))
if (container.firstElementChild && matches) hydrateRoot(container, tree)
else createRoot(container).render(tree)

window.__avraReady = true

// Recalculate scroll positions once webfonts settle (prevents pin offsets drifting).
document.fonts?.ready.then(() => {
  ScrollTrigger.refresh()
})
