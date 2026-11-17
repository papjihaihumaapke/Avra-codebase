import { PageHeader } from '../components/PageHeader'
import { TLink } from '../components/Transition'
import { PillLink } from '../components/ui'
import { services } from '../content/site'
import { coverOf, projectBySlug } from '../content/work'
import { FinalCta } from '../sections/FinalCta'
import { Process } from '../sections/Process'
import { WordWall } from '../sections/WordWall'

const detail: Record<string, { lead: string; includes: string[]; example: string }> = {
  brand: {
    lead: 'A clear, consistent identity that makes a small business look as good as the work it does.',
    includes: ['Logo and mark', 'Visual identity system', 'Brand guidelines', 'Packaging and print', 'Creative direction'],
    example: 'little-anna',
  },
  websites: {
    lead: 'Fast, accessible websites designed to turn visitors into enquiries, bookings and sales.',
    includes: ['Structure and content plan', 'UX and UI design', 'Development', 'Speed and technical SEO', 'Analytics and lead tracking'],
    example: 'alps-annie-ling',
  },
  performance: {
    lead: 'Paid campaigns that are measured by leads and revenue, not likes and views.',
    includes: ['Paid social (Meta and Instagram)', 'Search ads', 'Ad creative and testing', 'Lead tracking', 'Plain-language monthly reports'],
    example: 'social-creative',
  },
}

export function ServicesPage() {
  return (
    <>
      <PageHeader
        label="Services"
        lines={['Three ways', 'we help', 'you grow.']}
        lead="Brand, websites and performance marketing. Take one, or let them work together."
      >
        <nav aria-label="Services on this page" className="chips">
          {services.map((s) => (
            <TLink key={s.slug} to={`/services#${s.slug}`} className="chip">
              {s.title}
              <sup>{s.index}</sup>
            </TLink>
          ))}
        </nav>
      </PageHeader>

      <div className="svc-list">
        {services.map((s, i) => {
          const d = detail[s.slug]
          const ex = projectBySlug(d.example)
          const art = ex ? coverOf(ex) : null
          return (
            <section
              key={s.slug}
              id={s.slug}
              aria-labelledby={`svc-${s.slug}`}
              className={`svc shell ${i % 2 ? 'svc--flip' : ''}`}
            >
              <div className="svc__text">
                <p className="svc__index">{s.index}</p>
                <h2 id={`svc-${s.slug}`} className="svc__title" data-split="">
                  {s.title}
                </h2>
                <p className="svc__lead" data-split="lines">
                  {d.lead}
                </p>
                <ul className="svc__includes">
                  {d.includes.map((x, k) => (
                    <li key={x}>
                      <span className="label opacity-50">{String(k + 1).padStart(2, '0')}</span>
                      {x}
                    </li>
                  ))}
                </ul>
                <PillLink to={`/contact?need=${s.slug}`} className="mt-10">
                  Start a {s.title.toLowerCase()} project
                </PillLink>
              </div>
              {ex && art && (
                <TLink to={`/work/${ex.slug}`} className="svc__media group" data-cursor="View">
                  <div className="svc__frame">
                    <img src={art.src} alt={art.alt} width={art.w} height={art.h} loading="lazy" decoding="async" data-zoom="" />
                  </div>
                  <p className="label mt-4 opacity-60">Example</p>
                  <p className="svc__example">{ex.title}</p>
                </TLink>
              )}
            </section>
          )
        })}
      </div>

      <Process />
      <WordWall />
      <FinalCta />
    </>
  )
}
