import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { motionEnabled } from '../lib/motion'

/**
 * Custom cursor (fine pointers only): a small dot that trails the pointer and
 * grows into a labelled disc over anything with `data-cursor="Label"`.
 * The native cursor stays visible, so nothing is lost if this fails.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !motionEnabled() || !window.matchMedia('(pointer: fine)').matches) return
    const label = el.querySelector<HTMLElement>('.cursor__label')!
    const x = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' })
    const y = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' })
    let current = ''
    let shown = false

    const onMove = (e: PointerEvent) => {
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY })
        gsap.to(el, { autoAlpha: 1, duration: 0.3 })
        shown = true
      }
      x(e.clientX)
      y(e.clientY)
      const target = (e.target as Element | null)?.closest<HTMLElement>('[data-cursor]')
      const next = target?.dataset.cursor ?? ''
      if (next === current) return
      current = next
      if (next) label.textContent = next
      el.classList.toggle('is-active', Boolean(next))
    }
    const onLeave = () => {
      gsap.to(el, { autoAlpha: 0, duration: 0.2 })
      shown = false
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <span className="cursor__label" />
    </div>
  )
}
