import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PillLink } from '../components/ui'
import { TLink } from '../components/Transition'
import { slides } from '../content/home'
import { blurOf, coverOf } from '../content/work'
import { gsap } from '../lib/gsap'
import { motionEnabled } from '../lib/motion'

const pad = (n: number) => String(n).padStart(2, '0')

/** Title broken into words, each word into letters (static markup, so SSR and no-JS read fine). */
function SplitTitle({ text }: { text: string }) {
  return (
    <span className="slide__title" aria-label={text}>
      {text.split(' ').map((word, wi) => (
        <span key={wi} className="slide__titleword" aria-hidden="true">
          {word.split('').map((ch, ci) => (
            <span key={ci} className="mask slide__charmask">
              <span className="slide__char">{ch}</span>
            </span>
          ))}
        </span>
      ))}
    </span>
  )
}

/**
 * Full-bleed featured work: Embla (fade + autoplay) drives the slides,
 * GSAP re-runs the letter, image and line entrances on every change.
 */
export function FeaturedSlider() {
  // Plugins are created once; no autoplay for reduced motion.
  const [plugins] = useState(() => {
    const reduced = typeof window !== 'undefined' && !motionEnabled()
    return [Fade(), ...(reduced ? [] : [Autoplay({ delay: 6500, stopOnInteraction: false, stopOnMouseEnter: true })])]
  })
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, duration: 32 }, plugins)
  const [index, setIndex] = useState(0)
  const rootRef = useRef<HTMLElement>(null)

  const animateIn = useCallback((i: number) => {
    const root = rootRef.current
    if (!root || !motionEnabled()) return
    const slide = root.querySelectorAll<HTMLElement>('.slide')[i]
    if (!slide) return
    const chars = slide.querySelectorAll('.slide__char')
    gsap.killTweensOf([chars, slide.querySelectorAll('.slide__card, .slide__line, .slide__bg')])
    gsap.fromTo(
      chars,
      { yPercent: 120 },
      { yPercent: 0, duration: 1.2, ease: 'avra', stagger: { each: 0.04, from: 'random' }, delay: 0.15 },
    )
    gsap.fromTo(
      slide.querySelector('.slide__card'),
      { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 },
      { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.4, ease: 'avraInOut' },
    )
    gsap.fromTo(slide.querySelectorAll('.slide__line'), { yPercent: 105 }, {
      yPercent: 0,
      duration: 1,
      ease: 'avra',
      stagger: 0.1,
      delay: 0.5,
    })
    gsap.fromTo(slide.querySelector('.slide__bg'), { scale: 1.3 }, { scale: 1.12, duration: 7, ease: 'power1.out' })
    gsap.fromTo(root.querySelector('.slider__progress-fill'), { scaleX: 0 }, { scaleX: 1, duration: 6.5, ease: 'none' })
  }, [])

  useEffect(() => {
    if (!embla) return
    const onSelect = () => {
      const i = embla.selectedScrollSnap()
      setIndex(i)
      animateIn(i)
    }
    embla.on('select', onSelect)
    onSelect()
    return () => {
      embla.off('select', onSelect)
    }
  }, [embla, animateIn])

  const current = slides[index]

  return (
    <section ref={rootRef} aria-roledescription="carousel" aria-label="Featured projects" className="slider on-dark">
      <div className="slider__viewport" ref={emblaRef} data-cursor="Drag">
        <div className="slider__container">
          {slides.map((project, i) => {
            const art = coverOf(project)
            const line = project.tagline ?? ['', '']
            return (
              <article
                key={project.slug}
                className="slide"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}: ${project.title}`}
              >
                <div className="slide__bg" style={{ backgroundImage: `url(${blurOf(art.src)})` }} aria-hidden="true" />
                <div className="slide__shade" aria-hidden="true" />
                <h3 className="slide__heading">
                  <SplitTitle text={project.title.replace(' by Annie Ling', '')} />
                </h3>
                <p className="slide__tagline">
                  <span className="mask">
                    <span className="slide__line">{line[0]}</span>
                  </span>
                  <span className="mask">
                    <span className="slide__line">
                      <em>{line[1]}</em>
                    </span>
                  </span>
                </p>
                <TLink to={`/work/${project.slug}`} className="slide__card" data-cursor="View" tabIndex={-1}>
                  <img
                    src={art.src}
                    alt={art.alt}
                    width={art.w}
                    height={art.h}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                  />
                </TLink>
              </article>
            )
          })}
        </div>
      </div>

      <div className="slider__bar shell">
        <div className="flex items-center gap-8">
          <p className="label opacity-60">Featured projects</p>
          <TLink to="/work" className="label slider__all">
            All work →
          </TLink>
        </div>
        <div className="slider__nav">
          <span className="label tabular-nums">
            {index + 1} / {slides.length}
          </span>
          <div className="slider__dots" role="tablist" aria-label="Choose a project">
            {slides.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show ${s.title}`}
                className={`slider__dot ${i === index ? 'is-active' : ''}`}
                onClick={() => embla?.scrollTo(i)}
              >
                {i === index && <span className="slider__progress-fill" />}
              </button>
            ))}
          </div>
        </div>
        <div className="slider__current">
          <div className="hidden text-right lg:block">
            <p className="label opacity-60">Project {pad(index + 1)}</p>
            <p className="label">{current.category}</p>
          </div>
          <PillLink to={`/work/${current.slug}`} tone="solid">
            Explore
          </PillLink>
        </div>
      </div>
    </section>
  )
}
