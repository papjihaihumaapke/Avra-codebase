import type { CSSProperties } from 'react'
import { MaskLines, SectionLabel } from '../components/ui'
import { processSteps } from '../content/site'

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="section relative">
      <div className="shell">
        <div className="hairline-t grid-12 gap-y-6 pt-6">
          <SectionLabel index="02" className="col-span-12 md:col-span-4">
            Process
          </SectionLabel>
          <MaskLines as="h2" id="process-title" className="t-headline col-span-12 md:col-span-8" lines={['Step by step.']} />
        </div>

        <ol className="process mt-16 grid grid-cols-1 md:mt-28 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <li
              key={step.index}
              data-reveal=""
              className="process-step relative"
              style={{ '--step-i': i, '--d': `${i * 160}ms` } as CSSProperties}
            >
              <span className="stair-tread" aria-hidden="true" />
              <span className="stair-riser" aria-hidden="true" />
              <div className="pb-12 pl-5 pr-6 pt-5 lg:pl-5 lg:pb-0">
                <span className="mask label muted">
                  <span style={{ '--i': 0 } as CSSProperties}>{step.index}</span>
                </span>
                <h3 className="mt-6 text-[clamp(2rem,3.4vw,3rem)] font-bold leading-none tracking-[-0.04em]">
                  <span className="mask">
                    <span style={{ '--i': 1 } as CSSProperties}>{step.title}</span>
                  </span>
                </h3>
                <p className="muted mt-4 max-w-[26ch] text-[1.0625rem] leading-snug">
                  <span className="mask">
                    <span style={{ '--i': 2 } as CSSProperties}>{step.body}</span>
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
