import type { CSSProperties } from 'react'
import { PageHeader } from '../components/PageHeader'
import { SectionLabel } from '../components/ui'
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

export function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        lines={['Quiet work.', 'Loud results.']}
        lead="AVRA is a small marketing studio in Vancouver. We help small and mid-size businesses grow with brand, websites and performance marketing, without the noise."
      />
      <About />
      <section aria-labelledby="principles-title" className="section relative pt-0">
        <div className="shell">
          <div className="hairline-t grid-12 gap-y-6 pt-6">
            <SectionLabel className="col-span-12 md:col-span-4">How we work</SectionLabel>
            <h2 id="principles-title" className="t-headline col-span-12 md:col-span-8">
              Four things we don’t compromise on.
            </h2>
          </div>
          <ul className="mt-14 grid gap-[var(--grid-gap)] sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <li
                key={p.t}
                data-reveal="fade"
                style={{ '--d': `${i * 80}ms` } as CSSProperties}
                className="flex min-h-[15rem] flex-col rounded-lg bg-bone p-6 shadow-[var(--card-shadow)]"
              >
                <span className="label muted">0{i + 1}</span>
                <h3 className="mt-auto pt-10 text-[1.375rem] font-semibold leading-tight tracking-[-0.02em]">{p.t}</h3>
                <p className="muted mt-2 leading-snug">{p.b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Why />
      <div className="pb-[calc(var(--section-space)*0.6)]">
        <Clients />
      </div>
      <FinalCta />
    </>
  )
}
