import { useParams } from 'react-router-dom'
import { TLink } from '../components/Transition'
import { coverOf, projects, projectBySlug, type Img } from '../content/work'
import { FinalCta } from '../sections/FinalCta'
import { NotFound } from './NotFound'

/** Image at its natural ratio on a bone panel (screenshots are never cropped). */
function Figure({ image, eager = false }: { image: Img; eager?: boolean }) {
  const tall = image.h / image.w > 1.6
  return (
    <figure className="case-figure" data-reveal="fade">
      <img
        src={image.src}
        alt={image.alt}
        width={image.w}
        height={image.h}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={tall ? 'case-figure__tall' : ''}
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
  const art = coverOf(project)
  const nextArt = coverOf(next)
  const line = project.tagline
  const meta =
    project.facts ??
    ([
      { k: 'Client', v: project.client },
      { k: 'Services', v: project.services },
      project.year ? { k: 'Year', v: project.status ? `${project.year}, ${project.status.toLowerCase()}` : project.year } : null,
      project.tools ? { k: 'Tools', v: project.tools } : null,
    ].filter(Boolean) as { k: string; v: string }[])

  return (
    <>
      <article>
        <header className="case-hero on-dark">
          <div className="case-hero__bg" style={{ backgroundImage: `url(${art.src})` }} aria-hidden="true" />
          <div className="case-hero__shade" aria-hidden="true" />
          <div className="case-hero__inner shell">
            <TLink to="/work" className="label case-hero__back">
              ← All work
            </TLink>
            <h1 className="case-hero__title" data-split="hero">
              {project.title}
            </h1>
            {line && (
              <p className="case-hero__line">
                {line[0]} <em>{line[1]}</em>
              </p>
            )}
            <div className="case-hero__card">
              <img src={art.src} alt={art.alt} width={art.w} height={art.h} fetchPriority="high" decoding="async" />
            </div>
            <div className="case-hero__foot">
              <p className="label">{project.category}</p>
              <p className="label opacity-70">{project.services}</p>
              <p className="label">
                {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </p>
            </div>
          </div>
        </header>

        <section className="case-intro shell" aria-label="Overview">
          <p className="case-intro__summary" data-split="lines">
            {project.summary}
          </p>
          <dl className="case-facts">
            {meta.map((m) => (
              <div key={m.k}>
                <dt className="label opacity-60">{m.k}</dt>
                <dd>{m.v}</dd>
              </div>
            ))}
          </dl>
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="pill pill--light group mt-10">
              <span className="pill__label">Visit live site</span>
              <span className="pill__arrow" aria-hidden="true">
                ↗
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </section>

        {project.art && (
          <div className="shell">
            <Figure image={project.cover} eager />
          </div>
        )}

        <div className="case-body shell">
          {project.sections.map((s, k) => (
            <section key={s.heading} className="case-sec" aria-label={s.heading}>
              <div className="case-sec__head">
                <span className="label opacity-50">{String(k + 1).padStart(2, '0')}</span>
                <h2 className="case-sec__title" data-split="">
                  {s.heading}
                </h2>
              </div>
              <div className="case-sec__body">
                {s.body.map((p, j) => (
                  <p key={j} className={j === 0 ? 'case-sec__lead' : 'case-sec__p'}>
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="case-list">
                    {s.list.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                )}
                {s.groups && (
                  <div className="case-groups">
                    {s.groups.map((g) => (
                      <div key={g.title}>
                        <h3 className="case-groups__title">{g.title}</h3>
                        <ul className="case-list">
                          {g.items.map((x) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                {s.table && (
                  <div className="case-table">
                    <table>
                      <thead>
                        <tr>
                          {s.table.head.map((h) => (
                            <th key={h} scope="col" className="label">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((r) => (
                          <tr key={r[0]}>
                            <th scope="row">{r[0]}</th>
                            <td className="label">{r[1]}</td>
                            <td>{r[2]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              {s.images && s.images.length > 0 && (
                <div className="case-sec__images">
                  {s.images.map((im) => (
                    <Figure key={im.src} image={im} />
                  ))}
                </div>
              )}
            </section>
          ))}

          {project.gallery && project.gallery.length > 0 && (
            <section aria-label="Gallery" className="case-gallery">
              <p className="label opacity-60">Gallery</p>
              <ul>
                {project.gallery.map((im) => (
                  <li key={im.src} data-reveal="fade">
                    <img src={im.src} alt={im.alt} width={im.w} height={im.h} loading="lazy" decoding="async" data-zoom="" />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <nav aria-label="Next project">
          <TLink to={`/work/${next.slug}`} className="case-next on-dark" data-cursor="Next">
            <img src={nextArt.src} alt="" width={nextArt.w} height={nextArt.h} loading="lazy" className="case-next__bg" data-parallax="0.2" />
            <span className="case-next__inner shell">
              <span className="label opacity-70">Next project</span>
              <span className="case-next__title">{next.title}</span>
              {next.tagline && (
                <span className="case-next__line">
                  {next.tagline[0]} <em>{next.tagline[1]}</em>
                </span>
              )}
            </span>
          </TLink>
        </nav>
      </article>
      <FinalCta />
    </>
  )
}
