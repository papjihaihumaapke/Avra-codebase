import { useEffect, useRef } from 'react'
import { PillLink } from '../components/ui'
import { gsap, SplitText } from '../lib/gsap'
import { motionEnabled } from '../lib/motion'

/** Centered positioning statement: one accent line, two graphite lines, an italic serif aside. */
export function Statement() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root || !motionEnabled()) return
    const ctx = gsap.context(() => {
      const split = SplitText.create('.statement__title', { type: 'lines,chars', mask: 'lines' })
      gsap.from(split.chars, {
        yPercent: 110,
        duration: 1.1,
        ease: 'avra',
        stagger: 0.018,
        scrollTrigger: { trigger: root, start: 'top 70%' },
      })
      const aside = SplitText.create('.statement__aside', { type: 'lines', mask: 'lines' })
      gsap.from(aside.lines, {
        yPercent: 100,
        duration: 1,
        ease: 'avra',
        stagger: 0.08,
        scrollTrigger: { trigger: '.statement__aside', start: 'top 85%' },
      })
      // The whole block drifts up slightly slower than the page.
      gsap.fromTo('.statement__inner', { y: 80 }, {
        y: -80,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} aria-labelledby="statement-title" className="statement">
      <div className="statement__inner shell">
        <h2 id="statement-title" className="statement__title">
          <span className="text-signal">Small studio.</span>
          <br />
          Senior craft.
          <br />
          Real growth.
        </h2>
        <p className="statement__aside">
          A Vancouver marketing studio for brands ready to rise. Brand, websites and performance marketing, made by
          the people you actually talk to.
        </p>
        <PillLink to="/about" className="mt-10">
          About us
        </PillLink>
      </div>
    </section>
  )
}
