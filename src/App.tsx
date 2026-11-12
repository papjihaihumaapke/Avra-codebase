import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Atmosphere } from './components/Atmosphere'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { TransitionProvider } from './components/Transition'
import { routeMeta } from './content/site'
import { useRevealObserver } from './lib/useRevealObserver'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

/** Keeps <title> and meta description in sync on client-side navigation. */
function useRouteMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = routeMeta[pathname] ?? { title: 'Page not found — AVRA', description: routeMeta['/'].description }
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  }, [pathname])
}

function Shell() {
  useRevealObserver()
  useRouteMeta()
  return (
    <>
      <Atmosphere />
      <Nav />
      <main id="main" tabIndex={-1} className="relative z-10 outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <TransitionProvider>
      <Shell />
    </TransitionProvider>
  )
}
