import { PillLink } from '../components/ui'
import { bookHref, site } from '../content/site'

/** Closing band on inner pages: giant centred question, italic aside, one action. */
export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="cta on-dark">
      <div className="cta__bg" aria-hidden="true" data-parallax="0.2" />
      <div className="shell relative">
        <p className="label opacity-60">Next step</p>
        <h2 id="cta-title" className="cta__title" data-split="">
          Ready to grow
          {' '}
          <br />
          without the noise?
        </h2>
        <p className="cta__aside">A short call about where your business is and where it could go.</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <PillLink to={bookHref} tone="solid">
            Book a call
          </PillLink>
          <PillLink to={site.email ? `mailto:${site.email}` : '/contact'} tone="dark">
            {site.email ? 'Email us' : 'Send a message'}
          </PillLink>
        </div>
      </div>
    </section>
  )
}
