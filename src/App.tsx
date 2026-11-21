import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Atmosphere } from './components/Atmosphere'
import { Cursor } from './components/Cursor'
import { Preloader } from './components/Preloader'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { TransitionProvider } from './components/Transition'
import { metaFor, notFoundMeta } from './content/meta'
import { site } from './content/site'
import { motionEnabled } from './lib/motion'
import { startSmoothScroll } from './lib/smooth'
import { usePageMotion } from './lib/usePageMotion'
import { useRevealObserver } from './lib/useRevealObserver'
import { AboutPage } from './pages/AboutPage'
import { BlogIndex } from './pages/BlogIndex'
import { BlogPost } from './pages/BlogPost'
import { Contact } from './pages/Contact'
import { ProjectPage } from './pages/ProjectPage'
import { ServicesPage } from './pages/ServicesPage'
import { WorkIndex } from './pages/WorkIndex'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

/** Keeps <title>, description, canonical and share tags in sync on client-side navigation. */
function useRouteMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = metaFor(pathname) ?? notFoundMeta
    const clean = pathname.replace(/\/+$/, '') || '/'
    const url = `${site.url}${clean === '/' ? '/' : clean}`
    const set = (sel: string, v: string) => document.querySelector(sel)?.setAttribute('content', v)
    document.title = meta.title
    set('meta[name="description"]', meta.description)
    set('meta[property="og:title"]', meta.title)
    set('meta[property="og:description"]', meta.description)
    set('meta[property="og:url"]', url)
    set('meta[property="og:type"]', meta.type ?? 'website')
    set('meta[name="twitter:title"]', meta.title)
    set('meta[name="twitter:description"]', meta.description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
  }, [pathname])
}

function useSmoothScroll() {
  useEffect(() => (motionEnabled() ? startSmoothScroll() : undefined), [])
}

function Shell() {
  useRevealObserver()
  usePageMotion()
  useRouteMeta()
  useSmoothScroll()
  return (
    <>
      <Preloader />
      <Atmosphere />
      <Cursor />
      <Nav />
      <main id="main" tabIndex={-1} className="relative z-10 outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkIndex />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
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
