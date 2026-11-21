import { PillLink } from '../components/ui'

export function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="page-head shell min-h-[90svh] justify-center">
      <p className="label page-head__label">404 · Not found</p>
      <h1 id="nf-title" className="page-head__title" data-split="hero">
        <span className="block text-signal">Wrong </span>
        <span className="block">step.</span>
      </h1>
      <p className="page-head__lead">This page doesn’t exist, or it moved.</p>
      <PillLink to="/" className="mt-10">
        Back to the start
      </PillLink>
    </section>
  )
}
