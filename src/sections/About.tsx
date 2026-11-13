import type { CSSProperties } from 'react'
import { Arrow, MaskLines, SectionLabel } from '../components/ui'
import { TLink } from '../components/Transition'

const capabilities = ['Brand identity', 'Websites', 'Paid social & search', 'Creative & motion', 'Reporting']

export function About({ teaser = false }: { teaser?: boolean }) {
  return (
    <section id="about" aria-labelledby="about-title" className="section relative">
      <div className="shell">
        <div className="hairline-t grid-12 gap-y-6 pt-6">
          <SectionLabel index={teaser ? '05' : undefined} className="col-span-12 md:col-span-4">
            Studio
          </SectionLabel>
          <MaskLines
            as="h2"
            id="about-title"
            className="t-headline col-span-12 md:col-span-8"
            lines={['A small studio,', 'built in Vancouver.']}
          />
        </div>

        <div className="grid-12 mt-14 gap-y-12 md:mt-20">
          <div
            className="col-span-12 md:col-span-5 md:col-start-5"
            data-reveal="fade"
            style={{ '--d': '0ms' } as CSSProperties}
          >
            <p className="t-lead">AVRA designs, builds and runs marketing for small and mid-size businesses.</p>
            <p className="muted mt-5 max-w-[46ch]">
              The people who plan your work are the people who make it, from the first call to the monthly report.
              No account managers in between, no handing you off once the contract is signed.
            </p>
            {teaser && (
              <TLink to="/about" className="link-arrow mt-8">
                More about the studio <Arrow />
              </TLink>
            )}
          </div>

          <ul
            className="col-span-12 md:col-span-3 md:col-start-10"
            data-reveal="fade"
            style={{ '--d': '120ms' } as CSSProperties}
          >
            <li className="label muted pb-3">What we do</li>
            {capabilities.map((c) => (
              <li key={c} className="hairline-t py-3 text-[1.0625rem] font-medium">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
