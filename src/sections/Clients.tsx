import type { CSSProperties } from 'react'
import { SectionLabel } from '../components/ui'
import { clients, moreClients } from '../content/site'

/** Logo wall. Logos sit in muted greyscale and return to full colour on hover. */
export function Clients() {
  return (
    <section aria-labelledby="clients-title" className="relative">
      <div className="shell">
        <div className="hairline-t grid-12 gap-y-4 pt-6">
          <SectionLabel className="col-span-12 md:col-span-4">Clients</SectionLabel>
          <h2 id="clients-title" className="t-title col-span-12 md:col-span-8">
            Brands we’ve worked with.
          </h2>
        </div>

        <ul className="mt-12 grid grid-cols-2 border-l border-t border-shadow md:mt-16 md:grid-cols-3 lg:grid-cols-6">
          {clients.map((c, i) => (
            <li
              key={c.name}
              data-reveal="fade"
              style={{ '--d': `${i * 60}ms` } as CSSProperties}
              className="group flex aspect-[4/3] flex-col items-center justify-between border-b border-r border-shadow p-4 md:p-5"
            >
              <div className="flex w-full flex-1 items-center justify-center">
                <img
                  src={c.logo}
                  alt={`${c.name} logo`}
                  width={c.w}
                  height={c.h}
                  loading="lazy"
                  decoding="async"
                  className="max-h-[56px] w-auto max-w-[78%] object-contain opacity-70 grayscale transition-[filter,opacity] duration-300 ease-move group-hover:opacity-100 group-hover:grayscale-0 md:max-h-[64px]"
                />
              </div>
              <p className="label muted mt-3 text-center text-[0.6875rem] md:text-[0.75rem]">{c.name}</p>
            </li>
          ))}
          <li className="flex flex-col justify-center border-b border-r border-shadow p-4 md:p-5">
            <p className="label muted">And more</p>
            <p className="mt-2 text-[0.8125rem] leading-snug md:text-[0.9375rem]">{moreClients.join(', ')}</p>
          </li>
        </ul>
      </div>
    </section>
  )
}
