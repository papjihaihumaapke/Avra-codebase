import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Fragment, useEffect, useRef } from 'react'
import { motionEnabled } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

const ROW_A = ['Brand', 'Websites', 'Performance marketing']
const ROW_B = ['Growth that flows', 'Step by step', 'No noise']

function Row({ words, outline = false }: { words: string[]; outline?: boolean }) {
  // Repeat so the row is always wider than the screen while it travels.
  const items = [...words, ...words, ...words]
  return (
    <p className={`kinetic__row ${outline ? 'kinetic__row--outline' : ''}`}>
      {items.map((w, i) => (
        <Fragment key={i}>
          <span>{w}</span>
          <span className="kinetic__dot" aria-hidden="true">
            ·
          </span>
        </Fragment>
      ))}
    </p>
  )
}

/** Two oversized rows that drift in opposite directions and lean with scroll speed. */
export function KineticBand() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || !motionEnabled()) return
    const ctx = gsap.context(() => {
      const [a, b] = gsap.utils.toArray<HTMLElement>('.kinetic__row')
      const st = { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
      gsap.fromTo(a, { xPercent: 0 }, { xPercent: -28, ease: 'none', scrollTrigger: st })
      gsap.fromTo(b, { xPercent: -30 }, { xPercent: -2, ease: 'none', scrollTrigger: st })

      const skew = gsap.quickTo([a, b], 'skewX', { duration: 0.5, ease: 'power3.out' })
      ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => skew(gsap.utils.clamp(-8, 8, self.getVelocity() / -250)),
        onLeave: () => skew(0),
        onLeaveBack: () => skew(0),
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} aria-label="Brand, websites, performance marketing. Growth that flows." className="kinetic relative pt-[clamp(3rem,8vw,6rem)] pb-[clamp(1rem,3vw,2rem)]">
      <div aria-hidden="true" className="space-y-2">
        <Row words={ROW_A} />
        <Row words={ROW_B} outline />
      </div>
    </section>
  )
}
