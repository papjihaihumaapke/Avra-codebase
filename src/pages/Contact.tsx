import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Arrow, MaskLines, SectionLabel } from '../components/ui'
import { contactOptions, site } from '../content/site'

type Errors = Partial<Record<'name' | 'email' | 'need' | 'message', string>>

const needFromSlug: Record<string, string> = {
  brand: 'Brand',
  websites: 'Websites',
  performance: 'Performance marketing',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null
  return (
    <p id={id} className="mt-2 text-sm font-medium text-graphite">
      <span aria-hidden="true" className="mr-1.5 inline-block h-2 w-2 rounded-full bg-signal align-middle" />
      {msg}
    </p>
  )
}

export function Contact() {
  const [params] = useSearchParams()
  const preset = needFromSlug[params.get('need') ?? ''] ?? ''
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const successRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // Prerendered HTML has no preset, so apply ?need= after hydration too.
  useEffect(() => {
    if (!preset) return
    const radio = formRef.current?.querySelector<HTMLInputElement>(`input[name="need"][value="${preset}"]`)
    if (radio) radio.checked = true
  }, [preset])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('company_website')) return // honeypot

    const next: Errors = {}
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    if (!name) next.name = 'Please tell us your name.'
    if (!email) next.email = 'Please add your email so we can reply.'
    else if (!EMAIL_RE.test(email)) next.email = 'That email doesn’t look quite right.'
    if (!data.get('need')) next.need = 'Pick the option closest to what you need.'
    if (!message) next.message = 'A sentence or two is plenty.'
    setErrors(next)

    const firstInvalid = Object.keys(next)[0]
    if (firstInvalid) {
      const el = form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
      el?.focus()
      return
    }

    setStatus('sending')
    const payload = Object.fromEntries(data.entries())
    try {
      if (site.formEndpoint) {
        const res = await fetch(site.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
      } else {
        // No backend configured yet: set site.formEndpoint in src/content/site.ts.
        console.warn('[AVRA] site.formEndpoint is empty — form submission was not sent anywhere.', payload)
        await new Promise((r) => setTimeout(r, 500))
      }
      setStatus('sent')
      requestAnimationFrame(() => successRef.current?.focus())
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <section aria-labelledby="contact-title" className="relative pt-[calc(var(--nav-height)+clamp(3rem,10vw,8rem))]">
        <div className="shell">
          <SectionLabel>Contact</SectionLabel>
          <MaskLines
            as="h1"
            id="contact-title"
            hero
            className="t-mega mt-6 max-w-[12ch] md:mt-8"
            lines={['Let’s talk', 'about growth.']}
          />
          <p className="t-lead muted hero-fade mt-8 max-w-[38rem]">
            Tell us a little about your business and what you need. We reply within two working days.
          </p>
        </div>
      </section>

      <section aria-label="Enquiry form and booking" className="section relative pt-16 md:pt-24">
        <div className="shell grid-12 gap-y-16">
          <div className="col-span-12 lg:col-span-7">
            {status === 'sent' ? (
              <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                className="rounded-lg bg-bone p-8 shadow-[var(--card-shadow)] md:p-12"
              >
                <p className="label muted">Message received</p>
                <p className="t-headline mt-6">Thank you.</p>
                <p className="t-lead mt-4 max-w-[34ch]">
                  We have your note and will reply within two working days.
                </p>
                <button
                  type="button"
                  className="link-arrow mt-8"
                  onClick={() => {
                    setStatus('idle')
                    formRef.current?.reset()
                  }}
                >
                  Send another message <Arrow />
                </button>
              </div>
            ) : (
              <form ref={formRef} noValidate onSubmit={onSubmit} className="space-y-8" aria-describedby="form-note">
                <p id="form-note" className="label muted">
                  Fields marked * are required
                </p>

                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block font-medium">
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="field"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    <FieldError id="name-error" msg={errors.name} />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block font-medium">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      required
                      className="field"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    <FieldError id="email-error" msg={errors.email} />
                  </div>
                </div>

                <div>
                  <label htmlFor="business" className="mb-2 block font-medium">
                    Business
                  </label>
                  <input id="business" name="business" type="text" autoComplete="organization" className="field" />
                </div>

                <fieldset aria-describedby={errors.need ? 'need-error' : undefined}>
                  <legend className="mb-3 font-medium">What do you need? *</legend>
                  <div className="flex flex-wrap gap-2.5">
                    {contactOptions.needs.map((n) => (
                      <label
                        key={n}
                        className="cursor-pointer rounded-md border border-shadow bg-bone px-4 py-3 text-[0.9375rem] font-medium transition-colors duration-200 hover:border-stone has-[:checked]:border-graphite has-[:checked]:bg-graphite has-[:checked]:text-paper has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-graphite"
                      >
                        <input type="radio" name="need" value={n} className="sr-only" />
                        {n}
                      </label>
                    ))}
                  </div>
                  <FieldError id="need-error" msg={errors.need} />
                </fieldset>

                <div>
                  <label htmlFor="budget" className="mb-2 block font-medium">
                    Budget range
                  </label>
                  <div className="relative">
                    <select id="budget" name="budget" className="field appearance-none pr-10" defaultValue="">
                      <option value="" disabled>
                        Select a range
                      </option>
                      {contactOptions.budgets.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      aria-hidden="true"
                    >
                      <path d="M1 1.5 6 6.5l5-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block font-medium">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="field resize-y"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : 'message-hint'}
                  />
                  <p id="message-hint" className="muted mt-2 text-sm">
                    Where you are now, where you want to be, and any timing.
                  </p>
                  <FieldError id="message-error" msg={errors.message} />
                </div>

                {/* Honeypot: hidden from people and assistive tech */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="company_website">Leave this empty</label>
                  <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </button>
                  <p aria-live="polite" className="text-sm font-medium">
                    {status === 'error' && 'Something went wrong. Please try again, or email us directly.'}
                  </p>
                </div>
              </form>
            )}
          </div>

          <aside id="book" aria-labelledby="book-title" className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="hairline-t pt-6">
              <p className="label muted">Prefer to talk?</p>
              <h2 id="book-title" className="t-title mt-4">
                Book a 30-minute call.
              </h2>
              <p className="muted mt-3 max-w-[32ch]">
                A short, no-pressure conversation about where your business is and where it could go.
              </p>
              {site.bookingUrl ? (
                <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-6">
                  Book a call <Arrow />
                </a>
              ) : (
                <p className="mt-6 inline-block rounded-md border border-dashed border-stone px-4 py-3 font-mono text-sm">
                  [Booking link]
                </p>
              )}
            </div>
            <div className="hairline-t mt-12 pt-6">
              <p className="label muted">Email</p>
              {site.email ? (
                <a href={`mailto:${site.email}`} className="mt-3 inline-block text-lg font-medium underline underline-offset-4">
                  {site.email}
                </a>
              ) : (
                <p className="mt-3 font-mono text-sm">[Email address]</p>
              )}
              <p className="label muted mt-10">Studio</p>
              <p className="mt-3">Vancouver, BC</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
