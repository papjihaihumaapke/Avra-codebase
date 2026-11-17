import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, ScrollTrigger, SplitText } from './gsap'
import { introDone } from './intro'
import { motionEnabled } from './motion'

/**
 * Page-wide motion by data attributes, re-run on every route:
 *  - data-split="hero"   letters rise on load (after the preloader)
 *  - data-split          letters rise when scrolled into view
 *  - data-split="lines"  lines rise when scrolled into view (for paragraphs)
 *  - data-parallax="0.15" element drifts by that fraction of its height while it crosses the screen
 *  - data-zoom           image scales down from 1.2 to 1 as it enters (wrap must clip)
 * Elements are hidden by CSS only while .motion-ok is set, so no-JS and reduced motion read normally.
 */
export function usePageMotion() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (!motionEnabled()) return
    let cancelled = false
    const ctx = gsap.context(() => {})
    const main = document.getElementById('main')
    if (!main) return

    // Wait a frame so the new route has painted (page transitions swap under a cover).
    const raf = requestAnimationFrame(() => {
      if (cancelled) return
      ctx.add(() => {
        main.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
          const mode = el.dataset.split
          const lines = mode === 'lines'
          const split = SplitText.create(el, lines ? { type: 'lines', mask: 'lines' } : { type: 'lines,chars', mask: 'chars' })
          gsap.set(el, { visibility: 'visible' })
          const targets = lines ? split.lines : split.chars
          const from = { yPercent: 115 }
          const to = {
            yPercent: 0,
            duration: lines ? 1 : 1.15,
            ease: 'avra',
            stagger: lines ? 0.08 : { each: 0.022, from: mode === 'hero' ? ('random' as const) : ('start' as const) },
          }
          gsap.set(targets, from)
          if (mode === 'hero') {
            introDone.then(() => {
              if (!cancelled) ctx.add(() => gsap.to(targets, { ...to, delay: 0.1 }))
            })
          } else {
            gsap.to(targets, { ...to, scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
          }
        })

        main.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
          const amt = parseFloat(el.dataset.parallax || '0.15') * 100
          gsap.fromTo(
            el,
            { yPercent: -amt / 2 },
            {
              yPercent: amt / 2,
              ease: 'none',
              scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })

        main.querySelectorAll<HTMLElement>('[data-zoom]').forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 1.2 },
            { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'center center', scrub: true } },
          )
        })
        ScrollTrigger.refresh()
      })
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      ctx.revert()
    }
  }, [pathname])
}
