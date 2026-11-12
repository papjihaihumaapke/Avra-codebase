import { navLinks, site } from '../content/site'
import { TLink } from './Transition'

function Social({ label, url }: { label: string; url: string }) {
  if (!url) return <span className="muted">{label} [link]</span>
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
      {label}
    </a>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative z-10">
      <div className="shell pb-8 pt-20 md:pt-28">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <TLink to="/" aria-label="AVRA, home" className="inline-block">
              <img
                src="/brand/avra-lockup-tagline.svg"
                alt={`AVRA — ${site.tagline}`}
                width={542}
                height={232}
                loading="lazy"
                className="h-auto w-[200px] md:w-[240px]"
              />
            </TLink>
            <p className="label muted mt-6">Vancouver, BC</p>
          </div>

          <nav aria-label="Footer" className="col-span-6 md:col-span-3 md:col-start-7">
            <p className="label muted mb-4">Studio</p>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <TLink to={l.href} className="hover:underline underline-offset-4">
                    {l.label}
                  </TLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-6 md:col-span-3">
            <p className="label muted mb-4">Follow</p>
            <ul className="space-y-2">
              <li>
                <Social label="Instagram" url={site.social.instagram} />
              </li>
              <li>
                <Social label="LinkedIn" url={site.social.linkedin} />
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline-t mt-20 flex flex-wrap justify-between gap-4 pt-6">
          <p className="label muted">© {year} AVRA. All rights reserved.</p>
          <p className="label muted">Vancouver, British Columbia</p>
        </div>
      </div>
    </footer>
  )
}
