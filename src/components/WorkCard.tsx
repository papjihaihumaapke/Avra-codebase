import { useRef, type CSSProperties } from 'react'
import type { Img, Project } from '../content/work'
import { Arrow } from './ui'
import { TLink } from './Transition'
import { useTilt } from '../lib/useTilt'

/** Uncropped image inside a Bone frame of a fixed ratio. */
export function Frame({
  image,
  ratio = 'aspect-[4/3]',
  eager = false,
  className = '',
  fit = 'contain',
}: {
  image: Img
  ratio?: string
  eager?: boolean
  className?: string
  fit?: 'contain' | 'cover'
}) {
  return (
    <div className={`relative ${ratio} overflow-hidden rounded-md bg-bone shadow-[var(--card-shadow)] ${className}`}>
      <img
        src={image.src}
        alt={image.alt}
        width={image.w}
        height={image.h}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        {...(eager ? { fetchPriority: 'high' as const } : {})}
        className={
          fit === 'contain'
            ? 'absolute inset-0 m-auto h-[86%] w-[90%] object-contain'
            : 'absolute inset-0 h-full w-full object-cover object-top'
        }
      />
    </div>
  )
}

export function WorkCard({ project, index, delay = 0 }: { project: Project; index: number; delay?: number }) {
  const tiltRef = useRef<HTMLDivElement>(null)
  useTilt(tiltRef, 5)
  return (
    <li data-reveal="fade" style={{ '--d': `${delay}ms` } as CSSProperties}>
      <TLink to={`/work/${project.slug}`} className="group block">
        <div ref={tiltRef}>
          <Frame image={project.cover} className="transition-shadow duration-300 group-hover:shadow-[var(--card-shadow-hover)]" />
        </div>
        <div className="hairline-t mt-5 flex items-baseline justify-between gap-4 pt-4">
          <p className="label muted">{project.category}</p>
          <p className="label muted">{String(index + 1).padStart(2, '0')}</p>
        </div>
        <h3 className="mt-3 flex items-center gap-2 text-[1.5rem] font-semibold leading-tight tracking-[-0.02em]">
          {project.title}
          <Arrow className="opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
        </h3>
        <p className="muted mt-1.5">{project.services}</p>
      </TLink>
    </li>
  )
}
