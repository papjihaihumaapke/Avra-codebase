import { gsap } from 'gsap'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motionEnabled } from '../lib/motion'
import { scrollToTarget } from '../lib/smooth'

type Ctx = { go: (to: string) => void }
const TransitionContext = createContext<Ctx>({ go: () => {} })

function scrollToHash(hash: string, smooth: boolean) {
  const id = decodeURIComponent(hash.replace(/^#/, ''))
  const el = id ? document.getElementById(id) : null
  if (!el) return
  scrollToTarget(el, { immediate: !smooth || !motionEnabled() })
  // Move focus for keyboard and screen-reader users without a second jump.
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())))

export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const wipeRef = useRef<HTMLDivElement>(null)
  const busy = useRef(false)
  const pathRef = useRef(location.pathname)

  // After a pathname change: jump to the hash target or the top.
  useEffect(() => {
    if (pathRef.current === location.pathname) return
    pathRef.current = location.pathname
    if (location.hash) {
      nextFrame().then(() => scrollToHash(location.hash, false))
    } else {
      scrollToTarget(0, { immediate: true })
    }
  }, [location.pathname, location.hash])

  // First load with a hash (e.g. /#work from another site).
  useEffect(() => {
    if (window.location.hash) nextFrame().then(() => scrollToHash(window.location.hash, false))
  }, [])

  const go = useCallback(
    async (to: string) => {
      const url = new URL(to, window.location.href)
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        navigate(url.pathname + url.search + url.hash, { preventScrollReset: true })
        if (url.hash) scrollToHash(url.hash, true)
        else scrollToTarget(0, { immediate: !motionEnabled() })
        return
      }
      const wipe = wipeRef.current
      if (busy.current) return
      if (!wipe || !motionEnabled()) {
        navigate(url.pathname + url.search + url.hash)
        return
      }
      busy.current = true
      // Cover quickly, swap the page while hidden, let the new page settle, then reveal.
      await gsap.fromTo(wipe, { yPercent: 101 }, { yPercent: 0, duration: 0.32, ease: 'power3.in' })
      navigate(url.pathname + url.search + url.hash)
      await nextFrame()
      ScrollTrigger.refresh()
      await nextFrame()
      await gsap.to(wipe, { yPercent: -101, duration: 0.5, ease: 'expo.out' })
      gsap.set(wipe, { yPercent: 101 })
      busy.current = false
    },
    [navigate],
  )

  return (
    <TransitionContext.Provider value={{ go }}>
      {children}
      <div ref={wipeRef} className="paper-wipe" aria-hidden="true" />
    </TransitionContext.Provider>
  )
}

export function useTransitionNav() {
  return useContext(TransitionContext)
}

type TLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }

/** Internal link: real <a href> for SSR/no-JS, paper-wipe navigation with JS. */
export function TLink({ to, onClick, children, ...rest }: TLinkProps) {
  const { go } = useTransitionNav()
  const external = /^(https?:|mailto:|tel:)/.test(to)

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (external || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    go(to)
  }

  return (
    <a
      href={to}
      onClick={handle}
      {...(external && to.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
    </a>
  )
}
