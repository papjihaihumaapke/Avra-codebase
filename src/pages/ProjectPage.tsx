import type { CSSProperties } from 'react'
import { useParams } from 'react-router-dom'
import { TLink } from '../components/Transition'
import { Arrow, MaskLines } from '../components/ui'
import { Frame } from '../components/WorkCard'
import { projects, projectBySlug, type Img } from '../content/work'
import { FinalCta } from '../sections/FinalCta'
import { NotFound } from './NotFound'

/** Image at its natural ratio on a Bone panel (never cropped). */
function Figure({ image, eager = false }: { image: Img; eager?: boolean }) {
  const tall = image.h / image.w > 1.6
  return (
    <figure className="overflow-hidden rounded-lg bg-bone p-[clamp(0.75rem,3vw,2.5rem)] shadow-[var(--card-shadow)]">
      <img
        src={image.src}
        alt={image.alt}
        width={image.w}
        height={image.h}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`mx-auto h-auto w-auto max-w-full rounded-sm ${tall ? 'max-h-[min(140svh,2400px)]' : 'max-h-[78svh]'}`}
      />
    </figure>
  )
}

export function ProjectPage() {
  const { slug = '' } = useParams()
  const project = projectBySlug(slug)
  if (!project) return <NotFound />

  const i = projects.indexOf(project)
  const next = projects[(i + 1) % projects.length]
  const meta = [
    { k: 'Client', v: project.client },
    { k: 'Services', v: project.services },
    project.year ? { k: 'Year', v: project.status ? `${project.year}, ${project.status.toLowerCase()}` : project.year } : null,
    project.tools ? { k: 'Tools', v: project.tools } : null,
  ].filter(Boolean) as { k: string; v: string }[]

  return (
    <>
      <article>
        <header className="pt-[calc(var(--nav-height)+clamp(2.5rem,7vw,5rem))]">
          <div className="shell">
            <TLink to="/work" className="link-arrow label muted">
              <Arrow className="rotate-180" /> All work
            </TLink>
            <p className="label muted mt-10 flex flex-wrap gap-x-3">
              <span>{project.category}</span>
              <span aria-hidden="true">/</span>
              <span>{project.type === 'Concept' ? 'Concept study' : 'Client work'}</span>
            </p>
            <MaskLines as="h1" hero className="t-display mt-5 max-w-[16ch]" lines={[project.title]} />
            <p className="t-lead hero-fade mt-6 max-w-[44rem]" style={{ '--d': '300ms' } as CSSProperties}>
              {project.summary}
            </p>

            <dl
              className="hero-fade hairline-t mt-10 grid gap-x-8 gap-y-6 pt-6 sm:grid-cols-2 lg:grid-cols-4"
              style={{ '--d': '420ms' } as CSSProperties}
            >
              {meta.map((m) => (
                <div key={m.k}>
                  <dt className="label muted">{m.k}</dt>
                  <dd className="mt-2 leading-snug">{m.v}</dd>
                </div>
              ))}
            </dl>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary hero-fade mt-8"
                style={{ '--d': '500ms' } as CSSProperties}
              >
                Visit live site <Arrow className="-rotate-45" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
          <div className="shell mt-12 md:mt-16">
            <div className="hero-fade" style={{ '--d': '360ms' } as CSSProperties}>
              <Figure image={project.cover} eager />
            </div>
          </div>
        </header>

        <div className="shell section space-y-[clamp(4rem,9vw,7rem)]">
          {project.sections.map((s) => (
            <section key={s.heading} className="grid-12 gap-y-6" aria-label={s.heading}>
              <h2 className="t-title col-span-12 md:col-span-4" data-reveal="fade">
                {s.heading}
              </h2>
              <div className="col-span-12 space-y-5 md:col-span-8" data-reveal="fade" style={{ '--d': '80ms' } as CSSProperties}>
                {s.body.map((p, k) => (
                  <p key={k} className={k === 0 ? 't-lead' : 'muted max-w-[60ch] text-[1.0625rem] leading-relaxed'}>
                    {p}
                  </p>
                ))}
              </div>
              {s.images?.map((im) => (
                <div key={im.src} className="col-span-12 mt-4" data-reveal="fade">
                  <Figure image={im} />
                </div>
              ))}
            </section>
          ))}

          {project.gallery && project.gallery.length > 0 && (
            <section aria-label="Gallery" className="hairline-t pt-6">
              <p className="label muted">Gallery</p>
              <ul className="mt-8 grid grid-cols-1 gap-[var(--grid-gap)] sm:grid-cols-2 lg:grid-cols-3">
                {project.gallery.map((im, k) => (
                  <li key={im.src} data-reveal="fade" style={{ '--d': `${(k % 3) * 60}ms` } as CSSProperties}>
                    <Frame image={im} ratio="aspect-square" />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <nav aria-label="Next project" className="shell pb-[var(--section-space)]">
          <TLink to={`/work/${next.slug}`} className="group hairline-t grid-12 items-center gap-y-6 pt-6">
            <div className="col-span-12 md:col-span-7">
              <p className="label muted">Next project</p>
              <p className="t-display mt-4 flex items-center gap-4">
                {next.title}
                <Arrow className="h-[0.4em] w-[0.4em] transition-transform duration-300 group-hover:translate-x-2" />
              </p>
              <p className="muted mt-3">{next.services}</p>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <Frame image={next.cover} />
            </div>
          </TLink>
        </nav>
      </article>
      <FinalCta />
    </>
  )
}
