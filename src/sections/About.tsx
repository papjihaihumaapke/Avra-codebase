const capabilities = ['Brand identity', 'Websites', 'Paid social & search', 'Creative & motion', 'Reporting']

/** Studio intro: a large italic statement beside a short list of what we do. */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="about-intro shell">
      <h2 id="about-title" className="sr-only">
        The studio
      </h2>
      <p className="about-intro__big" data-split="lines">
        AVRA designs, builds and runs marketing for small and mid-size businesses. The people who plan your work are the
        people who make it, from the first call to the monthly report.
      </p>
      <div className="about-intro__side">
        <p className="label opacity-60">What we do</p>
        <ul>
          {capabilities.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
