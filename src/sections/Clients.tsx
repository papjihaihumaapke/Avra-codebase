import { clients } from '../content/site'

function LogoRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {clients.map((c) => (
        <li key={c.name} className="marquee__item">
          <img
            src={c.logo}
            alt={hidden ? '' : `${c.name} logo`}
            width={c.w}
            height={c.h}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="marquee__logo"
          />
        </li>
      ))}
    </ul>
  )
}

/** "Brands we've worked with": an endless, calm logo marquee. Pauses on hover. */
export function Clients() {
  return (
    <section aria-labelledby="clients-title" className="relative py-[clamp(2.5rem,6vw,4.5rem)]">
      <div className="shell flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <h2 id="clients-title" className="label muted">
          Brands we’ve worked with
        </h2>
        <p className="label muted hidden sm:block">{clients.length} brands and counting</p>
      </div>
      <div className="marquee mt-6 border-y border-shadow">
        <div className="marquee__track">
          <LogoRow />
          <LogoRow hidden />
        </div>
      </div>
    </section>
  )
}
