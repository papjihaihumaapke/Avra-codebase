import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { PillLink } from '../components/ui'
import { TLink } from '../components/Transition'
import { indexItems } from '../content/home'
import { coverOf, type Project } from '../content/work'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { motionEnabled } from '../lib/motion'

/** Horizontal offsets for the stacked names: a hand-set zig-zag, repeating. */
const offsets = ['18%', '28%', '34%', '24%', '30%', '14%', '22%', '36%', '20%']

function ListIcon() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden="true">
      <path d="M0 1h14M0 5h10M0 9h14" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}
function GridIcon() {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" aria-hidden="true">
      <rect x=".6" y=".6" width="6" height="8.8" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9.4" y=".6" width="6" height="8.8" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

/**
 * The work index. List view (desktop + motion): a pinned stage where scrolling
 * moves through giant stacked names; the active one turns solid and its cover
 * opens in the middle. Grid view: a plain card grid. No JS: a plain list.
 */
export function WorkStack({
  projects,
  initialMode = 'list',
  showAll = true,
}: {
  projects?: Project[]
  initialMode?: 'list' | 'grid'
  showAll?: boolean
} = {}) {
  const items = indexItems(projects)
  const [mode, setMode] = useState<'list' | 'grid'>(initialMode)
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || !motionEnabled() || mode !== 'list') return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const list = root.querySelector<HTMLElement>('.wstack__list')!
      const rows = gsap.utils.toArray<HTMLElement>('.wstack__row', root)
      const rowH = rows[0].offsetHeight
      const n = rows.length
      root.classList.add('is-pinned')
      // Centre row i in the stage.
      const yFor = (i: number) => -(i * rowH) - rowH / 2
      gsap.set(list, { y: yFor(0) })
      let last = -1
      const st = ScrollTrigger.create({
        trigger: root.querySelector('.wstack__stage'),
        start: 'top top',
        end: () => `+=${n * window.innerHeight * 0.32}`,
        pin: true,
        scrub: 0.6,
        animation: gsap.to(list, { y: yFor(n - 1), ease: 'none' }),
        onUpdate: (self) => {
          const i = Math.min(n - 1, Math.round(self.progress * (n - 1)))
          if (i !== last) {
            last = i
            setActive(i)
          }
        },
      })
      return () => {
        st.kill()
        root.classList.remove('is-pinned')
        gsap.set(list, { clearProps: 'transform' })
      }
    })
    return () => mm.revert()
  }, [mode])

  // Cover swap: wipe the new one up from below.
  useEffect(() => {
    const root = rootRef.current
    if (!root || !motionEnabled()) return
    const img = root.querySelectorAll<HTMLElement>('.wstack__cover')[active]
    if (!img) return
    gsap.fromTo(
      img,
      { clipPath: 'inset(100% 0 0 0)', scale: 1.15 },
      { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 0.9, ease: 'avraInOut', overwrite: true },
    )
  }, [active])

  // Mode change: fade the incoming view in with a stagger (not on first render).
  const firstRender = useRef(true)
  useEffect(() => {
    const root = rootRef.current
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (!root || !motionEnabled()) return
    ScrollTrigger.refresh()
    const targets = root.querySelectorAll(mode === 'grid' ? '.wgrid__item' : '.wstack__row')
    gsap.from(targets, { autoAlpha: 0, y: 40, duration: 0.8, ease: 'avra', stagger: 0.05 })
  }, [mode])

  const controls = (
    <div className="wstack__controls shell">
          <div className="flex items-center gap-5" role="group" aria-label="Work view">
            <button
              type="button"
              className={`wstack__toggle ${mode === 'list' ? 'is-on' : ''}`}
              aria-pressed={mode === 'list'}
              onClick={() => setMode('list')}
            >
              <ListIcon /> List
            </button>
            <button
              type="button"
              className={`wstack__toggle ${mode === 'grid' ? 'is-on' : ''}`}
              aria-pressed={mode === 'grid'}
              onClick={() => setMode('grid')}
            >
              <GridIcon /> Grid
            </button>
          </div>
          {showAll && <PillLink to="/work">All work</PillLink>}
        </div>
  )

  return (
    <section ref={rootRef} id="work" aria-labelledby="work-title" className={`wstack wstack--${mode}`}>
      <h2 id="work-title" className="sr-only">
        Selected work
      </h2>
      {mode === 'list' ? (
        <div className="wstack__stage">
          <div className="wstack__covers" aria-hidden="true">
            {items.map(({ project }, i) => (
              <img
                key={project.slug}
                className={`wstack__cover ${i === active ? 'is-active' : ''}`}
                src={coverOf(project).src}
                alt=""
                width={coverOf(project).w}
                height={coverOf(project).h}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
          <ol className="wstack__list">
            {items.map(({ project, name, n }, i) => (
              <li
                key={project.slug}
                className={`wstack__row ${i === active ? 'is-active' : ''}`}
                style={{ '--x': offsets[i % offsets.length] } as CSSProperties}
              >
                <TLink to={`/work/${project.slug}`} className="wstack__link" data-cursor="View">
                  <span className="wstack__n">{n}</span>
                  <span className="wstack__name">{name}</span>
                </TLink>
              </li>
            ))}
          </ol>
          <div className="wstack__caption" aria-live="polite">
            <p className="label">{items[Math.min(active, items.length - 1)].project.category}</p>
            <p className="wstack__services">{items[Math.min(active, items.length - 1)].project.services}</p>
          </div>
          {controls}
        </div>
      ) : (
        <ul className="wgrid shell">
          {items.map(({ project, n }) => (
            <li key={project.slug} className="wgrid__item">
              <TLink to={`/work/${project.slug}`} className="group block" data-cursor="View">
                <div className="wgrid__media">
                  <img
                    src={coverOf(project).src}
                    alt={coverOf(project).alt}
                    width={coverOf(project).w}
                    height={coverOf(project).h}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="label opacity-50">{n}</span>
                  <h3 className="wgrid__title">{project.title}</h3>
                </div>
                <p className="wgrid__sub">{project.services}</p>
              </TLink>
            </li>
          ))}
          <li className="wgrid__controls">{controls}</li>
        </ul>
      )}

    </section>
  )
}
