import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { SectionLabel } from '../components/ui'
import { motion, motionEnabled } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

const NOISE = ['LIKES.', 'VIEWS.', 'HYPE.', 'NOISE.']
const CALM = ['Noise is easy.', 'Noise that pays', 'is marketing.', 'We make that kind.']

/**
 * Scroll-driven manifesto. Markup is plain, readable text; the kinetic layout
 * only applies under html.motion-ok (see index.css), and GSAP drives the scrub.
 */
export function Manifesto() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || !motionEnabled()) return

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('.manifesto__word')
      const calm = gsap.utils.toArray<HTMLElement>('.manifesto__calm .mask > span')
      const noise = root.querySelector<HTMLElement>('.manifesto__noise')!
      const light = root.querySelector<HTMLElement>('.manifesto__sweep-light')!
      const shade = root.querySelector<HTMLElement>('.manifesto__sweep-shade')!

      // Diagonal wipe. p: 0 → 1. Edge runs from top-x to bottom-x (slanted).
      const SLANT = 28 // % horizontal offset between top and bottom of the edge
      const BAND = 16 // light band width in %
      const SHADE = 7 // trailing shadow width in %
      const sweep = { p: 0 }
      const applySweep = () => {
        const top = -BAND - SHADE + sweep.p * (100 + SLANT + 2 * (BAND + SHADE))
        const bot = top - SLANT
        // Words remain visible only to the right of the edge.
        noise.style.clipPath = `polygon(${top}% 0, 120% 0, 120% 100%, ${bot}% 100%)`
        light.style.clipPath = `polygon(${top - BAND}% 0, ${top}% 0, ${bot}% 100%, ${bot - BAND}% 100%)`
        shade.style.clipPath = `polygon(${top}% 0, ${top + SHADE}% 0, ${bot + SHADE}% 100%, ${bot}% 100%)`
        const vis = sweep.p > 0 && sweep.p < 1 ? '1' : '0'
        light.style.opacity = vis
        shade.style.opacity = sweep.p > 0 && sweep.p < 1 ? '0.55' : '0'
      }
      applySweep()

      gsap.set(words, { yPercent: 110, opacity: 0 })
      gsap.set(calm, { yPercent: 110 })
      const stage = root.querySelector('.manifesto__stage')

      // The first word arrives while the section scrolls into view, so the
      // stage is never empty when it pins.
      gsap.to(words[0], {
        yPercent: 0,
        opacity: 1,
        ease: motion.easeReveal,
        scrollTrigger: { trigger: stage, start: 'top 75%', end: 'top 10%', scrub: 0.6 },
      })

      const tl = gsap.timeline({
        defaults: { ease: motion.easeReveal },
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: '+=240%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      })

      // 1. Words crowd in, each louder than the last; earlier words get pushed.
      words.slice(1).forEach((w, k) => {
        const i = k + 1
        const at = k * 0.55
        tl.to(w, { yPercent: 0, opacity: 1, duration: 1 }, at)
        tl.to(
          words.slice(0, i),
          { scale: 1 + i * 0.035, x: (j) => (j % 2 ? 1 : -1) * i * 6, duration: 1, ease: motion.easeMove },
          at,
        )
      })
      tl.to({}, { duration: 0.6 }) // hold the noise

      // 2. Diagonal light sweeps across and wipes them away.
      tl.to(sweep, { p: 1, duration: 2.2, ease: motion.easeMove, onUpdate: applySweep })

      // 3. Calm text rises from masks.
      tl.to(calm, { yPercent: 0, duration: 1.2, stagger: 0.18 }, '-=0.9')
      tl.to({}, { duration: 0.8 }) // let it breathe before unpinning
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} id="manifesto" aria-labelledby="manifesto-title" className="relative">
      <div className="manifesto__stage shell section">
        <SectionLabel className="relative z-10 mb-10">Manifesto</SectionLabel>
        <h2 id="manifesto-title" className="sr-only">
          Noise is easy. Noise that brings in money is marketing.
        </h2>
        <p className="manifesto__noise">
          {NOISE.map((w) => (
            <span key={w} className={`manifesto__word ${w === 'NOISE.' ? 'text-signal' : ''}`}>
              {w}{' '}
            </span>
          ))}
        </p>
        <div className="manifesto__sweep" aria-hidden="true">
          <div className="manifesto__sweep-shade" />
          <div className="manifesto__sweep-light" />
        </div>
        <div className="manifesto__calm">
          <p className="t-display max-w-[14ch]">
            {CALM.map((line, i) => (
              <span className="mask" key={line}>
                <span className={i === 1 || i === 2 ? '' : 'muted'}>{line}</span>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
