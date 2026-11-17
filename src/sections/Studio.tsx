import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useRef } from 'react'
import { PillLink } from '../components/ui'
import { TLink } from '../components/Transition'
import { studioCards } from '../content/home'
import { gsap, SplitText } from '../lib/gsap'
import { motionEnabled } from '../lib/motion'

/** Dark band: three spread words, then a draggable strip of real pieces from the portfolio. */
export function Studio() {
  const [emblaRef, embla] = useEmblaCarousel({ dragFree: true, align: 'start', containScroll: 'trimSnaps' })
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root || !motionEnabled()) return
    const ctx = gsap.context(() => {
      const split = SplitText.create('.studio__word', { type: 'chars', mask: 'chars' })
      gsap.from(split.chars, {
        yPercent: 110,
        duration: 1.1,
        ease: 'avra',
        stagger: 0.03,
        scrollTrigger: { trigger: root, start: 'top 75%' },
      })
      gsap.from('.studio__card', {
        x: 120,
        autoAlpha: 0,
        duration: 1.2,
        ease: 'avra',
        stagger: 0.08,
        scrollTrigger: { trigger: '.studio__strip', start: 'top 85%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  // Cards skew a touch with drag velocity, then settle.
  useEffect(() => {
    if (!embla || !motionEnabled()) return
    const cards = embla.slideNodes()
    const skew = gsap.quickTo(cards, 'skewX', { duration: 0.5, ease: 'power3' })
    let prev = embla.scrollProgress()
    const onScroll = () => {
      const p = embla.scrollProgress()
      skew(gsap.utils.clamp(-6, 6, (p - prev) * -400))
      prev = p
    }
    const onSettle = () => skew(0)
    embla.on('scroll', onScroll).on('settle', onSettle)
    return () => {
      embla.off('scroll', onScroll).off('settle', onSettle)
    }
  }, [embla])

  return (
    <section ref={ref} aria-labelledby="studio-title" className="studio on-dark">
      <h2 id="studio-title" className="studio__title shell">
        <span className="studio__word">Always</span>
        <span className="studio__word">making</span>
        <span className="studio__word">things</span>
      </h2>

      <div className="studio__strip" ref={emblaRef} data-cursor="Drag">
        <ul className="studio__track">
          {studioCards.map(({ project, image, caption }, i) => (
            <li key={i} className="studio__card">
              <TLink to={`/work/${project.slug}`} className="block" draggable={false}>
                <div className="studio__media">
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.w}
                    height={image.h}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </div>
                <p className="label mt-5 opacity-60">{project.category}</p>
                <p className="studio__caption">{caption}</p>
              </TLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 flex justify-center">
        <PillLink to="/work" tone="dark">
          All work
        </PillLink>
      </div>
    </section>
  )
}
