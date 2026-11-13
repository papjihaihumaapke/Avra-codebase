import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, type CSSProperties } from 'react'
import { TLink } from '../components/Transition'
import { Arrow, MaskLines, SectionLabel } from '../components/ui'
import { projectBySlug } from '../content/work'
import { motionEnabled } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

/**
 * Featured case study. The site sits in a browser frame that starts tilted in 3D
 * and settles flat as you scroll; product pages float at different depths.
 * The pointer adds a small extra tilt on desktop.
 */
export function FeaturedCase() {
  const p = projectBySlug('alps-annie-ling')
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || !motionEnabled()) return
    const ctx = gsap.context(() => {
      const st = { trigger: root, start: 'top bottom', end: 'center center', scrub: 0.8 }
      gsap.fromTo(
        '.browser',
        { rotationX: 24, rotationY: -26, rotationZ: 3, scale: 0.84, yPercent: 8 },
        { rotationX: 4, rotationY: -8, rotationZ: 0, scale: 1, yPercent: 0, ease: 'none', scrollTrigger: st },
      )
      gsap.fromTo('.float-card--a', { y: 120, z: 60, rotationY: -18 }, { y: -20, z: 120, rotationY: -6, ease: 'none', scrollTrigger: st })
      gsap.fromTo('.float-card--b', { y: 200, z: 140, rotationY: -22 }, { y: 10, z: 200, rotationY: -10, ease: 'none', scrollTrigger: st })

      // Pointer tilt on the whole stage (desktop only).
      const stage = root.querySelector<HTMLElement>('.stage-3d__inner')
      if (stage && window.matchMedia('(pointer: fine)').matches) {
        const rx = gsap.quickTo(stage, 'rotationX', { duration: 0.8, ease: 'power3.out' })
        const ry = gsap.quickTo(stage, 'rotationY', { duration: 0.8, ease: 'power3.out' })
        const move = (e: PointerEvent) => {
          const r = root.getBoundingClientRect()
          rx(-((e.clientY - r.top) / r.height - 0.5) * 6)
          ry(((e.clientX - r.left) / r.width - 0.5) * 8)
        }
        root.addEventListener('pointermove', move)
        return () => root.removeEventListener('pointermove', move)
      }
    }, root)
    return () => ctx.revert()
  }, [])

  if (!p) return null
  const fact = (k: string) => p.facts?.find((f) => f.k === k)?.v

  return (
    <section ref={rootRef} id="featured" aria-labelledby="featured-title" className="section relative overflow-hidden">
      <div className="shell">
        <div className="hairline-t grid-12 gap-y-6 pt-6">
          <SectionLabel className="col-span-12 md:col-span-4">Featured case study</SectionLabel>
        </div>

        <div className="grid-12 mt-12 items-center gap-y-14 md:mt-16">
          <div className="col-span-12 lg:col-span-4">
            <MaskLines as="h2" id="featured-title" className="t-headline" lines={['ALPS by', 'Annie Ling.']} />
            <p className="t-lead mt-6" data-reveal="fade">
              {p.summary}
            </p>
            <dl className="mt-8" data-reveal="fade" style={{ '--d': '100ms' } as CSSProperties}>
              {[
                ['Markets', fact('Markets')],
                ['Timeline', fact('Timeline')],
                ['Live', 'annieling.com'],
              ].map(([k, v]) => (
                <div key={k} className="hairline-t flex justify-between gap-6 py-3">
                  <dt className="label muted">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <TLink to={`/work/${p.slug}`} className="link-arrow mt-8 text-[1.0625rem]">
              Read the case study <Arrow />
            </TLink>
          </div>

          <div className="stage-3d col-span-12 lg:col-span-7 lg:col-start-6" aria-hidden="true">
            <div className="stage-3d__inner pb-[18%] pr-[6%]">
              <div className="browser">
                <div className="browser__bar">
                  <span />
                  <span />
                  <span />
                </div>
                <img
                  src={p.cover.src}
                  alt=""
                  width={p.cover.w}
                  height={p.cover.h}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
              </div>
              <div className="float-card float-card--a bottom-[2%] left-[-4%] w-[42%]">
                <img
                  src="/work/alps-annie-ling/site-desktop.webp"
                  alt=""
                  width={1440}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full rounded-sm"
                />
              </div>
              <div className="float-card float-card--b bottom-[-4%] right-0 w-[19%]">
                <img
                  src="/work/alps-annie-ling/site-mobile.webp"
                  alt=""
                  width={780}
                  height={1688}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full rounded-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
