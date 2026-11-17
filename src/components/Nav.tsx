import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { navLinks } from '../content/site'
import { BookButton, Logo } from './ui'
import { TLink } from './Transition'
import { lockScroll } from '../lib/smooth'

export function Nav() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Slide away while scrolling down, come back on any scroll up.
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (Math.abs(y - lastY) < 6) return
      setHidden(y > lastY && y > 160)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: lock scroll, trap focus, close on Escape, restore focus.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    root.style.overflow = 'hidden'
    lockScroll(true)
    const menu = menuRef.current
    const focusables = () =>
      [
        ...Array.from(menu?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []),
        ...(toggleRef.current ? [toggleRef.current] : []),
      ]
    focusables()[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      const f = focusables()
      if (!f.length) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = ''
      lockScroll(false)
      document.removeEventListener('keydown', onKey)
      toggleRef.current?.focus()
    }
  }, [open])

  const close = () => setOpen(false)
  const state = `${hidden && !open ? 'is-hidden' : ''} ${open ? 'is-open' : ''}`
  return (
    <>
      <a
        href="#main"
        className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
      >
        Skip to content
      </a>
    {/* Logo lives outside the header so its difference blend reads against the page (white on dark, black on light). */}
    <TLink to="/" className={`nav-logo ${state}`} aria-label="AVRA, home" onClick={close}>
      <Logo inverse className="w-[92px] md:w-[108px]" />
    </TLink>
    <header className={`nav ${state}`}>
      <nav aria-label="Primary" className="shell flex h-[var(--nav-height)] items-center justify-between gap-6">
        <span className="w-[92px] md:w-[108px]" aria-hidden="true" />

        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-2 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <TLink to={l.href} className="nav__pill">
                  {l.label}
                </TLink>
              </li>
            ))}
          </ul>
          <button
            ref={toggleRef}
            type="button"
            className="nav__pill relative z-[61] inline-flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="nav__burger relative block h-3 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 h-px w-6 bg-graphite transition-transform duration-300 ease-move ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 h-px w-6 bg-graphite transition-transform duration-300 ease-move ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-0 z-[60] bg-paper lg:hidden"
      >
        <div className="shell flex h-full flex-col justify-between pb-10 pt-[calc(var(--nav-height)+2.5rem)]">
          <ul className="space-y-1">
            {navLinks.map((l, i) => (
              <li key={l.href} className="hairline-b">
                <TLink
                  to={l.href}
                  onClick={close}
                  className="group flex items-baseline justify-between py-3 text-[clamp(2.5rem,12vw,4.5rem)] font-bold leading-none tracking-[-0.04em]"
                  style={{ '--i': i } as CSSProperties}
                >
                  <span className="transition-transform duration-300 ease-move group-hover:translate-x-2">{l.label}</span>
                  <span className="label muted">0{i + 1}</span>
                </TLink>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-6">
            <BookButton className="btn-lg w-full" onClick={close} />
            <p className="label muted">Vancouver, BC</p>
          </div>
        </div>
      </div>
    </header>
    </>
  )
}
