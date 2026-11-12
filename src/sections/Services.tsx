import type { CSSProperties } from 'react'
import { Arrow, MaskLines, SectionLabel } from '../components/ui'
import { TLink } from '../components/Transition'
import { services } from '../content/site'

/** Desktop: cards step up and to the right like stairs. Mobile: each indents further right. */
const stepClass = [
  'ml-0 mr-8 lg:mr-0 lg:mt-[15rem]',
  'ml-4 mr-4 lg:ml-0 lg:mr-0 lg:mt-[7.5rem]',
  'ml-8 mr-0 lg:ml-0 lg:mt-0',
]

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section relative">
      <div className="shell">
        <div className="hairline-t grid-12 gap-y-6 pt-6">
          <SectionLabel index="01" className="col-span-12 md:col-span-4">
            Services
          </SectionLabel>
          <MaskLines
            as="h2"
            id="services-title"
            className="t-headline col-span-12 md:col-span-8"
            lines={['Three ways we help', 'you grow.']}
          />
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-5 md:mt-24 lg:grid-cols-12 lg:gap-[var(--grid-gap)]">
          {services.map((s, i) => (
            <li
              key={s.slug}
              data-reveal="fade"
              style={{ '--d': `${i * 120}ms` } as CSSProperties}
              className={`lg:col-span-4 ${stepClass[i]}`}
            >
              <article className="group relative flex h-full min-h-[19rem] flex-col rounded-lg bg-bone p-6 shadow-[var(--card-shadow)] transition-[transform,box-shadow] duration-300 ease-move hover:-translate-y-1.5 hover:shadow-[var(--card-shadow-hover)] focus-within:-translate-y-1.5 md:min-h-[24rem] md:p-8">
                <p className="label muted transition-colors duration-300 group-hover:text-signal group-focus-within:text-signal">
                  {s.index}
                </p>
                <h3 className="t-title mt-auto pt-16">{s.title}</h3>
                <p className="muted mt-3 max-w-[30ch] text-[1.0625rem] leading-snug">{s.body}</p>
                <div className="hairline-t mt-8 pt-5">
                  <TLink
                    to={`/contact?need=${s.slug}`}
                    className="link-arrow after:absolute after:inset-0 after:content-['']"
                  >
                    Learn more<span className="sr-only"> about {s.title}</span> <Arrow />
                  </TLink>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
