import type { ReactNode } from 'react'

/**
 * Inner-page opener, set like the homepage statement: a small label, giant centred
 * uppercase lines (the first can take the red accent), then an italic serif lead.
 */
export function PageHeader({
  label,
  lines,
  lead,
  accentFirst = true,
  children,
}: {
  label: string
  lines: string[]
  lead?: ReactNode
  accentFirst?: boolean
  children?: ReactNode
}) {
  return (
    <header className="page-head shell">
      <p className="label page-head__label">{label}</p>
      <h1 className="page-head__title" data-split="hero">
        {lines.map((l, i) => (
          <span key={i} className={`block ${i === 0 && accentFirst ? 'text-signal' : ''}`}>
            {l}
            {/* Keeps a word gap when crawlers and screen readers flatten the lines. */}
            {i < lines.length - 1 ? ' ' : null}
          </span>
        ))}
      </h1>
      {lead && (
        <p className="page-head__lead" data-split="lines">
          {lead}
        </p>
      )}
      {children}
    </header>
  )
}

/** Section opener: label on the left, big uppercase heading. */
export function SectionHead({
  label,
  title,
  id,
  className = '',
}: {
  label: string
  title: string
  id?: string
  className?: string
}) {
  return (
    <div className={`section-head ${className}`}>
      <p className="label section-head__label">{label}</p>
      <h2 id={id} className="section-head__title" data-split="">
        {title}
      </h2>
    </div>
  )
}
