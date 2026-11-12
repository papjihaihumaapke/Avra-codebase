import type { CSSProperties } from 'react'
import { Arrow, MaskLines, SectionLabel } from '../components/ui'
import { work } from '../content/site'

/**
 * Uniform, orderly grid. Every piece sits uncropped (object-contain) inside the
 * same Bone frame, so websites and square brand pieces line up cleanly.
 */
export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="section relative">
      <div className="shell">
        <div className="hairline-t grid-12 gap-y-6 pt-6">
          <SectionLabel index="03" className="col-span-12 md:col-span-4">
            Work
          </SectionLabel>
          <div className="col-span-12 md:col-span-8">
            <MaskLines as="h2" id="work-title" className="t-headline" lines={['Selected work.']} />
            <p className="muted mt-5 max-w-[44ch]">
              Websites, identities and campaign creative for local businesses and growing brands.
            </p>
          </div>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-x-[var(--grid-gap)] gap-y-12 sm:grid-cols-2 md:mt-20 lg:grid-cols-3 lg:gap-y-16">
          {work.map((item, i) => {
            const body = (
              <>
                <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-bone shadow-[var(--card-shadow)] transition-shadow duration-300 ease-move group-hover:shadow-[var(--card-shadow-hover)]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    width={item.w}
                    height={item.h}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 m-auto h-[86%] w-[90%] object-contain transition-transform duration-500 ease-reveal group-hover:-translate-y-1"
                  />
                </div>
                <div className="hairline-t mt-5 flex items-baseline justify-between gap-4 pt-4">
                  <p className="label muted">{item.clientType}</p>
                  <p className="label muted">{String(i + 1).padStart(2, '0')}</p>
                </div>
                <h3 className="mt-3 flex items-center gap-2 text-[1.5rem] font-semibold leading-tight tracking-[-0.02em]">
                  {item.title}
                  {item.url && <Arrow className="-rotate-45 transition-transform duration-300 group-hover:translate-x-0.5" />}
                </h3>
                <p className="muted mt-1.5">{item.services}</p>
              </>
            )
            return (
              <li key={item.id} data-reveal="fade" style={{ '--d': `${(i % 3) * 80}ms` } as CSSProperties}>
                <article className="group h-full">
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
                      {body}
                      <span className="sr-only"> (visit live site, opens in a new tab)</span>
                    </a>
                  ) : (
                    body
                  )}
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
