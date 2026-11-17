import { processSteps } from '../content/site'

/** Dark band: four steps, each a giant number that fills in as you reach it. */
export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="process-band on-dark">
      <div className="shell">
        <p className="label opacity-60">How we work</p>
        <h2 id="process-title" className="process-band__title" data-split="">
          Step by step
        </h2>
        <ol className="process-band__steps">
          {processSteps.map((step) => (
            <li key={step.index} className="process-band__step" data-reveal="fade">
              <span className="process-band__n" aria-hidden="true">
                {step.index}
              </span>
              <h3 className="process-band__name">{step.title}</h3>
              <p className="process-band__body">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
