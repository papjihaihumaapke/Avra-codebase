import { useEffect, useRef } from 'react'
import { wordRows } from '../content/home'
import { gsap } from '../lib/gsap'
import { motionEnabled } from '../lib/motion'

/**
 * Full-bleed image with rows of giant words sliding in opposite directions as you
 * scroll (the services and the city, set like a departures board).
 */
export function WordWall() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root || !motionEnabled()) return
    const ctx = gsap.context(() => {
      const st = { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
      gsap.utils.toArray<HTMLElement>('.wordwall__row', root).forEach((row, i) => {
        const dir = i % 2 ? 1 : -1
        gsap.fromTo(row, { xPercent: dir > 0 ? -28 : -8 }, { xPercent: dir > 0 ? -8 : -28, ease: 'none', scrollTrigger: st })
      })
      gsap.fromTo('.wordwall__bg', { yPercent: -12, scale: 1.25 }, { yPercent: 12, scale: 1.25, ease: 'none', scrollTrigger: st })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} aria-labelledby="wordwall-title" className="wordwall on-dark">
      <h2 id="wordwall-title" className="sr-only">
        What we do: {wordRows.slice(0, 3).flat().join(', ')}. Based in Vancouver, British Columbia.
      </h2>
      <div className="wordwall__bg" aria-hidden="true" />
      <div className="wordwall__rows" aria-hidden="true">
        {wordRows.map((row, i) => (
          <div key={i} className="wordwall__row">
            {[...row, ...row, ...row].map((w, j) => (
              <span key={j}>{w}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
