import { PageHeader } from '../components/PageHeader'
import { projectBySlug, coverOf } from '../content/work'
import { About } from '../sections/About'
import { Clients } from '../sections/Clients'
import { FinalCta } from '../sections/FinalCta'
import { Why } from '../sections/Why'

const principles = [
  { t: 'Results over noise', b: 'Likes and views are easy. We measure work by the leads, bookings and sales it brings in.' },
  { t: 'Senior hands on every job', b: 'The people who plan your work make it. Nothing gets passed down a chain.' },
  { t: 'Plain language', b: 'Clear scopes, clear prices and reports you can read in five minutes.' },
  { t: 'Built to last', b: 'Brand systems and websites you can grow into, not redo next year.' },
]

/** Three pieces of work, drifting at different speeds. */
const strip = ['dunes-and-scents', 'alps-annie-ling', 'little-anna']

export function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        lines={['Quiet work.', 'Loud results.']}
        lead="AVRA is a small marketing studio in Vancouver. We help small and mid-size businesses grow with brand, websites and performance marketing, without the noise."
      />

      <div className="about-strip shell" aria-hidden="true">
        {strip.map((slug, i) => {
          const p = projectBySlug(slug)
          if (!p) return null
          const a = coverOf(p)
          return (
            <div key={slug} className="about-strip__item">
              <img
                src={a.src}
                alt=""
                width={a.w}
                height={a.h}
                loading="lazy"
                decoding="async"
                data-parallax={['0.1', '0.25', '0.15'][i]}
              />
            </div>
          )
        })}
      </div>

      <About />

      <section aria-labelledby="principles-title" className="principles shell">
        <p className="label opacity-60">How we work</p>
        <h2 id="principles-title" className="principles__title" data-split="">
          Four things we don’t compromise on
        </h2>
        <ol className="principles__list">
          {principles.map((p, i) => (
            <li key={p.t} data-reveal="fade">
              <span className="principles__n">0{i + 1}</span>
              <h3 className="principles__name">{p.t}</h3>
              <p className="principles__body">{p.b}</p>
            </li>
          ))}
        </ol>
      </section>

      <Why />
      <Clients />
      <FinalCta />
    </>
  )
}
