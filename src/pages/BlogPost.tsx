import { useParams } from 'react-router-dom'
import { Rich } from '../components/Rich'
import { TLink } from '../components/Transition'
import { PillLink } from '../components/ui'
import { formatDate, postBySlug, postModified, readingTime, slugify, sortedPosts, type Block } from '../content/blog'
import { coverOf, projectBySlug } from '../content/work'
import { FinalCta } from '../sections/FinalCta'
import { NotFound } from './NotFound'

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case 'h2':
      return (
        <h2 id={slugify(b.text)} className="prose__h2">
          {b.text}
        </h2>
      )
    case 'h3':
      return <h3 className="prose__h3">{b.text}</h3>
    case 'ul':
    case 'ol': {
      const List = b.type
      return (
        <List className={`prose__list prose__list--${b.type}`}>
          {b.items.map((x) => (
            <li key={x}>
              <Rich text={x} />
            </li>
          ))}
        </List>
      )
    }
    case 'quote':
      return (
        <blockquote className="prose__quote">
          <Rich text={b.text} />
        </blockquote>
      )
    default:
      return (
        <p>
          <Rich text={b.text} />
        </p>
      )
  }
}

export function BlogPost() {
  const { slug = '' } = useParams()
  const post = postBySlug(slug)
  if (!post) return <NotFound />

  const toc = post.body.flatMap((b) => (b.type === 'h2' ? [b.text] : []))
  const modified = postModified(post)
  const related = (post.related ?? []).flatMap((s) => {
    const p = projectBySlug(s)
    return p ? [p] : []
  })
  const more = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <article className="post" aria-labelledby="post-title">
        <header className="post__head shell">
          <nav aria-label="Breadcrumb" className="label post__crumbs">
            <ol>
              <li>
                <TLink to="/">Home</TLink>
              </li>
              <li>
                <TLink to="/blog">Blog</TLink>
              </li>
              <li aria-current="page">{post.category}</li>
            </ol>
          </nav>
          <h1 id="post-title" className="post__title">
            {post.title}
          </h1>
          <p className="label post__meta">
            By{' '}
            <TLink to="/about" rel="author">
              AVRA
            </TLink>{' '}
            · Published <time dateTime={post.published}>{formatDate(post.published)}</time>
            {modified !== post.published && (
              <>
                {' '}
                · Updated <time dateTime={modified}>{formatDate(modified)}</time>
              </>
            )}{' '}
            · {readingTime(post)} min read
          </p>
        </header>

        <div className="post__grid shell">
          <aside className="post__aside" aria-label="On this page">
            <p className="label opacity-60">On this page</p>
            <ol className="post__toc">
              {toc.map((h) => (
                <li key={h}>
                  <a href={`#${slugify(h)}`}>{h}</a>
                </li>
              ))}
              {post.faq && post.faq.length > 0 && (
                <li>
                  <a href="#faq">Questions</a>
                </li>
              )}
            </ol>
          </aside>

          <div className="post__body prose">
            {/* The direct answer first: what search snippets and AI answers quote. */}
            <section aria-label="Summary" className="post__summary">
              <p className="post__lead">{post.summary}</p>
              <p className="label opacity-60">Key takeaways</p>
              <ul className="prose__list">
                {post.takeaways.map((t) => (
                  <li key={t}>
                    <Rich text={t} />
                  </li>
                ))}
              </ul>
            </section>

            {post.body.map((b, i) => (
              <BlockView key={i} b={b} />
            ))}

            {post.faq && post.faq.length > 0 && (
              <section aria-labelledby="faq" className="post__faq">
                <h2 id="faq" className="prose__h2">
                  Questions
                </h2>
                <dl>
                  {post.faq.map((f) => (
                    <div key={f.q}>
                      <dt>
                        <h3 className="prose__h3">{f.q}</h3>
                      </dt>
                      <dd>
                        <p>
                          <Rich text={f.a} />
                        </p>
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            <div className="post__cta">
              <p>Want help putting this into practice?</p>
              <PillLink to="/contact">Talk to AVRA</PillLink>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="post-related shell">
          <p className="label opacity-60">From our work</p>
          <h2 id="related-title" className="post-related__title">
            Related case studies
          </h2>
          <ul className="post-related__grid">
            {related.map((p) => {
              const a = coverOf(p)
              return (
                <li key={p.slug}>
                  <TLink to={`/work/${p.slug}`} className="group block" data-cursor="View">
                    <span className="post-related__media">
                      <img src={a.src} alt={a.alt} width={a.w} height={a.h} loading="lazy" decoding="async" data-zoom="" />
                    </span>
                    <span className="post-related__name">{p.title}</span>
                    <span className="label opacity-60">{p.services}</span>
                  </TLink>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {more.length > 0 && (
        <nav aria-labelledby="more-title" className="post-more shell">
          <p id="more-title" className="label opacity-60">
            More from the blog
          </p>
          <ul>
            {more.map((p) => (
              <li key={p.slug}>
                <TLink to={`/blog/${p.slug}`} className="post-more__link">
                  <span className="label opacity-60">{p.category}</span>
                  <span className="post-more__title">{p.title}</span>
                </TLink>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <FinalCta />
    </>
  )
}
