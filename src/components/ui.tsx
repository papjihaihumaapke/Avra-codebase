import type { ReactNode } from 'react'
import { bookHref } from '../content/site'
import { TLink } from './Transition'

export function Logo({ className = '', inverse = false }: { className?: string; inverse?: boolean }) {
  // Official wordmark from the AVRA logo kit (brand-assets/AVRA-Logo-Kit).
  return (
    <img
      src={inverse ? '/brand/avra-wordmark-paper.svg' : '/brand/avra-wordmark.svg'}
      alt="AVRA"
      width={542}
      height={138}
      className={`h-auto ${className}`}
      fetchPriority="high"
    />
  )
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`arrow ${className}`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}

export function BookButton({
  className = '',
  variant = 'primary',
  size,
  children = 'Book a call',
  onClick,
}: {
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'inverse'
  size?: 'lg'
  children?: ReactNode
}) {
  return (
    <TLink to={bookHref} onClick={onClick} className={`btn btn-${variant} ${size === 'lg' ? 'btn-lg' : ''} ${className}`}>
      {children}
    </TLink>
  )
}

/**
 * Bulletproof-style pill: a label chip and a separate arrow chip, joined.
 * `tone="dark"` for use on graphite sections.
 */
export function PillLink({
  to,
  children,
  tone = 'light',
  className = '',
  arrow = true,
  cursor,
}: {
  to: string
  children: ReactNode
  tone?: 'light' | 'dark' | 'solid'
  className?: string
  arrow?: boolean
  cursor?: string
}) {
  return (
    <TLink to={to} className={`pill pill--${tone} group ${className}`} data-cursor={cursor}>
      <span className="pill__label">{children}</span>
      {arrow && (
        <span className="pill__arrow" aria-hidden="true">
          <Arrow />
        </span>
      )}
    </TLink>
  )
}
