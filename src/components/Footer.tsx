import { useEffect, useRef } from 'react'
import { bookHref, site } from '../content/site'
import { gsap } from '../lib/gsap'
import { motionEnabled } from '../lib/motion'
import { TLink } from './Transition'
import { PillLink } from './ui'

const footerNav = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

function Social({ label, url }: { label: string; url: string }) {
  if (!url) return <span className="opacity-40">{label}</span>
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="footer__link">
      {label}
    </a>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root || !motionEnabled()) return
    const ctx = gsap.context(() => {
      gsap.from('.footer__mark', {
        rotate: -25,
        scale: 0.8,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom bottom', scrub: true },
      })
      gsap.from('.footer__wordmark', {
        yPercent: 60,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom bottom', scrub: true },
      })
      gsap.from('.footer__nav a', {
        yPercent: 100,
        autoAlpha: 0,
        duration: 1,
        ease: 'avra',
        stagger: 0.06,
        scrollTrigger: { trigger: '.footer__nav', start: 'top 85%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={ref} className="footer on-dark">
      <img src="/brand/avra-submark-paper.svg" alt="" aria-hidden="true" className="footer__mark" loading="lazy" />

      <div className="footer__grid shell">
        <div className="footer__col">
          <p className="label opacity-50">Connect</p>
          <ul className="footer__small">
            <li>
              <TLink to="/contact" className="footer__link">
                Get in touch
              </TLink>
            </li>
            <li>
              <Social label="Instagram" url={site.social.instagram} />
            </li>
            <li>
              <Social label="LinkedIn" url={site.social.linkedin} />
            </li>
          </ul>
        </div>

        <nav aria-label="Footer" className="footer__nav">
          <ul>
            {footerNav.map((l) => (
              <li key={l.href} className="mask">
                <TLink to={l.href} className="footer__big">
                  {l.label}
                </TLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <p className="label opacity-50">New project</p>
          <p className="footer__small">Ready to grow?</p>
          <PillLink to={bookHref} tone="dark" className="mt-3">
            Book a call
          </PillLink>
          {site.email && (
            <a href={`mailto:${site.email}`} className="footer__link mt-3 block">
              {site.email}
            </a>
          )}
        </div>
      </div>

      <div className="footer__legal shell">
        <p className="label opacity-50">Vancouver, British Columbia</p>
        <p className="label opacity-50">© {year} AVRA. All rights reserved.</p>
      </div>

      <div className="footer__wordmark-wrap" aria-hidden="true">
        <img src="/brand/avra-wordmark-paper.svg" alt="" className="footer__wordmark" loading="lazy" />
      </div>
    </footer>
  )
}
