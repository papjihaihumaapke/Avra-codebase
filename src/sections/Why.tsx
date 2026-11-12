import type { CSSProperties } from 'react'
import { MaskLines, SectionLabel } from '../components/ui'
import { whyPoints } from '../content/site'

export function Why() {
  return (
    <section id="why" aria-labelledby="why-title" className="section relative">
      <div className="shell">
        <div className="hairline-t grid-12 gap-y-6 pt-6">
          <SectionLabel index="04" className="col-span-12">
            Why Avra
          </SectionLabel>
        </div>
        <div className="grid-12 mt-12 gap-y-14 md:mt-20">
          <MaskLines
            as="h2"
            id="why-title"
            className="t-display col-span-12 lg:col-span-7"
            lines={['No noise.', 'Just momentum.']}
          />
          <ul className="col-span-12 lg:col-span-5 lg:pt-4">
            {whyPoints.map((p, i) => (
              <li
                key={p.title}
                data-reveal="fade"
                style={{ '--d': `${i * 100}ms` } as CSSProperties}
                className="hairline-t grid grid-cols-[3rem_1fr] gap-x-4 py-6 last:border-b last:border-shadow"
              >
                <span className="label muted pt-1.5">0{i + 1}</span>
                <div>
                  <h3 className="text-[1.375rem] font-semibold leading-tight tracking-[-0.02em]">{p.title}</h3>
                  <p className="muted mt-2 max-w-[38ch] leading-snug">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
