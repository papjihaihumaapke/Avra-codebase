import type { CSSProperties, ReactNode } from 'react'
import { MaskLines, SectionLabel } from './ui'

/** Top of an inner page: mono label, huge masked headline, optional lead. */
export function PageHeader({
  label,
  lines,
  lead,
  children,
}: {
  label: string
  lines: ReactNode[]
  lead?: ReactNode
  children?: ReactNode
}) {
  return (
    <header className="relative pt-[calc(var(--nav-height)+clamp(3rem,10vw,7rem))]">
      <div className="shell">
        <SectionLabel>{label}</SectionLabel>
        <MaskLines as="h1" hero className="t-mega mt-6 max-w-[14ch] md:mt-8" lines={lines} />
        {lead && (
          <p className="t-lead muted hero-fade mt-8 max-w-[40rem]" style={{ '--d': '380ms' } as CSSProperties}>
            {lead}
          </p>
        )}
        {children}
      </div>
    </header>
  )
}
