import { useEffect, useRef, type CSSProperties } from 'react'
import { gsap, SplitText } from '../lib/gsap'
import { introDone } from '../lib/intro'
import { motionEnabled } from '../lib/motion'

/** Blurred, slowly crossfading work imagery: colour and movement, never detail. */
const backdrops = [
  '/work/dunes-and-scents/art-blur.webp',
  '/work/social-creative/art-blur.webp',
  '/work/little-anna/art-blur.webp',
  '/work/wall-canvas/art-blur.webp',
  '/work/go-green-mowing/art-blur.webp',
]

/** Words are placed on a loose staggered grid, like type set by hand. */
const words: { text: string; x: string; row: number }[] = [
  { text: 'Growth', x: '22%', row: 0 },
  { text: 'that', x: '4%', row: 1 },
  { text: 'flows', x: '50%', row: 1 },
  { text: 'without', x: '12%', row: 2 },
  { text: 'noise', x: '62%', row: 2 },
]

export function Hero() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || !motionEnabled()) return
    let cancelled = false
    let offMove = () => {}
    const ctx = gsap.context(() => {})

    // Backdrop crossfade runs straight away (it sits under the preloader).
    ctx.add(() => {
      const layers = gsap.utils.toArray<HTMLElement>('.hero__bg', root)
      gsap.set(layers, { autoAlpha: 0 })
      gsap.set(layers[0], { autoAlpha: 1 })
      const tl = gsap.timeline({ repeat: -1 })
      layers.forEach((layer, i) => {
        const next = layers[(i + 1) % layers.length]
        tl.fromTo(layer, { scale: 1.15 }, { scale: 1.35, duration: 6, ease: 'none' }, i * 4.5)
        tl.to(next, { autoAlpha: 1, duration: 1.6, ease: 'power2.inOut' }, i * 4.5 + 3.4)
        tl.set(layer, { autoAlpha: 0 }, i * 4.5 + 5.1)
      })
    })

    introDone.then(() => {
      if (cancelled) return
      ctx.add(() => {
        const wordEls = gsap.utils.toArray<HTMLElement>('.hero__word', root)
        const split = SplitText.create(wordEls, { type: 'chars', mask: 'chars' })
        gsap.set(wordEls, { autoAlpha: 1 })
        gsap.from(split.chars, {
          yPercent: 115,
          duration: 1.3,
          ease: 'avra',
          stagger: { each: 0.035, from: 'random' },
        })
        gsap.from('.hero__meta', { autoAlpha: 0, y: 16, duration: 1, ease: 'avra', delay: 0.6, stagger: 0.08 })

        // Scroll: words part ways, the backdrop sinks.
        const st = { trigger: root, start: 'top top', end: 'bottom top', scrub: true }
        wordEls.forEach((w, i) => {
          gsap.to(w, { xPercent: i % 2 ? -35 : 35, ease: 'none', scrollTrigger: st })
        })
        gsap.to('.hero__bgwrap', { yPercent: 20, ease: 'none', scrollTrigger: st })
        gsap.to('.hero__words', { opacity: 0.25, ease: 'none', scrollTrigger: st })

        // Pointer: a gentle depth parallax per word.
        const movers = wordEls.map((w, i) => ({
          x: gsap.quickTo(w, 'x', { duration: 1.2, ease: 'power3' }),
          y: gsap.quickTo(w, 'y', { duration: 1.2, ease: 'power3' }),
          depth: 10 + (i % 3) * 12,
        }))
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5
          const ny = e.clientY / window.innerHeight - 0.5
          movers.forEach((m) => {
            m.x(nx * m.depth * 2)
            m.y(ny * m.depth)
          })
        }
        window.addEventListener('pointermove', onMove, { passive: true })
        offMove = () => window.removeEventListener('pointermove', onMove)
      })
    })

    return () => {
      cancelled = true
      offMove()
      ctx.revert()
    }
  }, [])

  return (
    <section ref={rootRef} id="top" aria-labelledby="hero-title" className="hero on-dark">
      <div className="hero__bgwrap" aria-hidden="true">
        {backdrops.map((src, i) => (
          <div key={src} className="hero__bg" style={{ backgroundImage: `url(${src})`, opacity: i ? 0 : 1 }} />
        ))}
        <div className="hero__shade" />
      </div>

      <h1 id="hero-title" className="hero__words">
        <span className="sr-only">Growth that flows, without noise. AVRA is a marketing studio in Vancouver, BC.</span>
        {[0, 1, 2].map((row) => (
          <span key={row} className="hero__row" aria-hidden="true">
            {words
              .filter((w) => w.row === row)
              .map((w) => (
                <span key={w.text} className="hero__word" style={{ '--x': w.x } as CSSProperties}>
                  {w.text}
                </span>
              ))}
          </span>
        ))}
      </h1>

      <div className="hero__foot shell">
        <p className="hero__meta label">Marketing studio · Vancouver, BC</p>
        <p className="hero__meta label hidden md:block">Brand · Websites · Performance</p>
        <p className="hero__meta label">
          <span className="hero__scroll" aria-hidden="true" /> Scroll
        </p>
      </div>
    </section>
  )
}
