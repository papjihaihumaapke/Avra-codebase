import { whyPoints } from '../content/site'

/** Dark band: the promise in giant type, three plain reasons underneath. */
export function Why() {
  return (
    <section id="why" aria-labelledby="why-title" className="why-band on-dark">
      <div className="shell">
        <p className="label opacity-60">Why AVRA</p>
        <h2 id="why-title" className="why-band__title" data-split="">
          No noise.
          <br />
          <span className="text-signal">Just momentum.</span>
        </h2>
        <ul className="why-band__list">
          {whyPoints.map((p, i) => (
            <li key={p.title} data-reveal="fade">
              <span className="label opacity-50">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
