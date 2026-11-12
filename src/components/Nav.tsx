import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { navLinks } from '../content/site'
import { BookButton, Logo } from './ui'
import { TLink } from './Transition'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: lock scroll, trap focus, close on Escape, restore focus.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    root.style.overflow = 'hidden'
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
      document.removeEventListener('keydown', onKey)
      toggleRef.current?.focus()
    }
  }, [open])

  const close = () => setOpen(false)
  const solid = scrolled && !open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ease-move ${
        solid ? 'border-b border-shadow bg-paper' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="btn btn-primary sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="shell flex h-[var(--nav-height)] items-center justify-between gap-6">
        <TLink to="/" className="relative z-[61] shrink-0" aria-label="AVRA, home" onClick={close}>
          <Logo className="w-[84px] md:w-[96px]" />
        </TLink>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <TLink
                to={l.href}
                className="text-[0.9375rem] font-medium tracking-tight decoration-1 underline-offset-[6px] transition-colors duration-200 hover:underline"
              >
                {l.label}
              </TLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <BookButton className="hidden sm:inline-flex" />
          <button
            ref={toggleRef}
            type="button"
            className="relative z-[61] inline-flex h-11 w-11 items-center justify-center rounded-md lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-6" aria-hidden="true">
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
  )
}
