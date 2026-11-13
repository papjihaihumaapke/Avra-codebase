import type { CSSProperties } from 'react'
import { PageHeader } from '../components/PageHeader'
import { TLink } from '../components/Transition'
import { Arrow, BookButton } from '../components/ui'
import { Frame } from '../components/WorkCard'
import { services } from '../content/site'
import { projectBySlug } from '../content/work'
import { FinalCta } from '../sections/FinalCta'
import { Process } from '../sections/Process'

const detail: Record<string, { lead: string; includes: string[]; example: string }> = {
  brand: {
    lead: 'A clear, consistent identity that makes a small business look as good as the work it does.',
    includes: ['Logo and mark', 'Visual identity system', 'Brand guidelines', 'Packaging and print', 'Creative direction'],
    example: 'little-anna',
  },
  websites: {
    lead: 'Fast, accessible websites designed to turn visitors into enquiries, bookings and sales.',
    includes: ['Structure and content plan', 'UX and UI design', 'Development', 'Speed and technical SEO', 'Analytics and lead tracking'],
    example: 'go-green-mowing',
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
        lines={['Three ways', 'we help you grow.']}
        lead="Brand, websites and performance marketing. Take one, or let them work together."
      />

      <div className="section pt-16 md:pt-24">
        <div className="shell space-y-[clamp(5rem,10vw,8rem)]">
          {services.map((s) => {
            const d = detail[s.slug]
            const ex = projectBySlug(d.example)
            return (
              <section key={s.slug} id={s.slug} aria-labelledby={`svc-${s.slug}`} className="hairline-t grid-12 gap-y-10 pt-6">
                <div className="col-span-12 lg:col-span-6" data-reveal="fade">
                  <p className="label muted">{s.index}</p>
                  <h2 id={`svc-${s.slug}`} className="t-headline mt-6">
                    {s.title}
                  </h2>
                  <p className="t-lead mt-6 max-w-[34ch]">{d.lead}</p>
                  <ul className="mt-8 max-w-[28rem]">
                    {d.includes.map((x) => (
                      <li key={x} className="hairline-t flex items-center justify-between py-3 text-[1.0625rem]">
                        {x}
                      </li>
                    ))}
                  </ul>
                  <TLink to={`/contact?need=${s.slug}`} className="link-arrow mt-8">
                    Start a {s.title.toLowerCase()} project <Arrow />
                  </TLink>
                </div>
                {ex && (
                  <div
                    className="col-span-12 lg:col-span-5 lg:col-start-8"
                    data-reveal="fade"
                    style={{ '--d': '120ms' } as CSSProperties}
                  >
                    <TLink to={`/work/${ex.slug}`} className="group block">
                      <Frame image={ex.cover} />
                      <p className="label muted mt-4">Example</p>
                      <p className="mt-1 flex items-center gap-2 text-[1.25rem] font-semibold">
                        {ex.title} <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                      </p>
                    </TLink>
                  </div>
                )}
              </section>
            )
          })}
        </div>
      </div>

      <Process />

      <section className="shell pb-[var(--section-space)]">
        <div className="hairline-t flex flex-wrap items-center justify-between gap-6 pt-6">
          <p className="t-title max-w-[24ch]">Not sure which you need? We’ll help you pick.</p>
          <BookButton size="lg" />
        </div>
      </section>
      <FinalCta />
    </>
  )
}
