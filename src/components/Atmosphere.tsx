import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { motionEnabled } from '../lib/motion'

/** Paper grain + soft diagonal light bands, fixed behind all content. */
export function Atmosphere() {
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = innerRef.current
    if (!el || !motionEnabled()) return
    // Subtle scroll parallax: bands sway slowly as you move down the page.
    const toY = gsap.quickTo(el, 'yPercent', { duration: 1.6, ease: 'power3.out' })
    const toX = gsap.quickTo(el, 'xPercent', { duration: 1.6, ease: 'power3.out' })
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        toY(Math.sin(y / 1400) * 6)
        toX(Math.cos(y / 1800) * 3)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="light-bands" aria-hidden="true">
        <div className="light-bands__drift">
          <div ref={innerRef} className="light-bands__inner" />
        </div>
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  )
}
