import { Arrow, MaskLines, SectionLabel } from '../components/ui'
import { TLink } from '../components/Transition'

export function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="shell flex min-h-[80svh] flex-col justify-end pb-24 pt-40">
      <SectionLabel index="404">Not found</SectionLabel>
      <MaskLines as="h1" id="nf-title" hero className="t-mega mt-6" lines={['Wrong step.']} />
      <TLink to="/" className="link-arrow mt-10 text-lg">
        Back to the start <Arrow />
      </TLink>
    </section>
  )
}
