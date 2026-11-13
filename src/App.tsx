import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Atmosphere } from './components/Atmosphere'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { TransitionProvider } from './components/Transition'
import { metaFor, notFoundMeta } from './content/meta'
import { motionEnabled } from './lib/motion'
import { startSmoothScroll } from './lib/smooth'
import { useRevealObserver } from './lib/useRevealObserver'
import { AboutPage } from './pages/AboutPage'
import { Contact } from './pages/Contact'
import { ProjectPage } from './pages/ProjectPage'
import { ServicesPage } from './pages/ServicesPage'
import { WorkIndex } from './pages/WorkIndex'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

/** Keeps <title> and meta description in sync on client-side navigation. */
function useRouteMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = metaFor(pathname) ?? notFoundMeta
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  }, [pathname])
}

function useSmoothScroll() {
  useEffect(() => (motionEnabled() ? startSmoothScroll() : undefined), [])
}

function Shell() {
  useRevealObserver()
  useRouteMeta()
  useSmoothScroll()
  return (
    <>
      <Atmosphere />
      <Nav />
      <main id="main" tabIndex={-1} className="relative z-10 outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkIndex />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
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
