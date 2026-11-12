import type { CSSProperties, ElementType, ReactNode } from 'react'
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
      decoding="async"
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

/** "01 / SERVICES" */
export function SectionLabel({ index, children, className = '' }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`label muted ${className}`}>
      {index && (
        <>
          <span>{index}</span>
          <span aria-hidden="true"> / </span>
          <span className="sr-only"> — </span>
        </>
      )}
      <span>{children}</span>
    </p>
  )
}

/**
 * Splits content into masked lines that rise into view.
 * `lines` are rendered one per mask; each line can be a string or JSX.
 */
export function MaskLines({
  as: Tag = 'div',
  lines,
  className = '',
  delay = 0,
  hero = false,
  id,
}: {
  as?: ElementType
  lines: ReactNode[]
  className?: string
  delay?: number
  hero?: boolean
  id?: string
}) {
  return (
    <Tag
      id={id}
      className={`${hero ? 'hero-rise' : ''} ${className}`}
      {...(hero ? {} : { 'data-reveal': '' })}
      style={{ '--d': `${delay}ms` } as CSSProperties}
    >
      {lines.map((line, i) => (
        <span className="mask" key={i}>
          <span style={{ '--i': i } as CSSProperties}>{line}</span>
        </span>
      ))}
    </Tag>
  )
}
