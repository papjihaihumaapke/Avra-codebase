import { BookButton, MaskLines } from '../components/ui'
import { TLink } from '../components/Transition'
import { site } from '../content/site'

export function FinalCta() {
  const emailHref = site.email ? `mailto:${site.email}` : '/contact'
  return (
    <section aria-labelledby="cta-title" className="on-dark relative z-10 bg-graphite text-paper">
      <div className="shell py-[clamp(6rem,14vw,12rem)]">
        <p className="label muted">Next step</p>
        <MaskLines
          as="h2"
          id="cta-title"
          className="t-display mt-8 max-w-[13ch]"
          lines={['Ready to grow', 'without the noise?']}
        />
        <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6 md:mt-16">
          <BookButton variant="inverse" size="lg" />
          <TLink
            to={emailHref}
            className="label underline decoration-stone underline-offset-[6px] transition-colors duration-200 hover:decoration-paper"
          >
            {site.email || '[Email address]'}
          </TLink>
        </div>
      </div>
    </section>
  )
}
