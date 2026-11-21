import { PageHeader } from '../components/PageHeader'
import { TLink } from '../components/Transition'
import { formatDate, readingTime, sortedPosts } from '../content/blog'
import { FinalCta } from '../sections/FinalCta'

export function BlogIndex() {
  return (
    <>
      <PageHeader
        label={`Blog · ${sortedPosts.length} articles`}
        lines={['Notes on', 'growth']}
        lead="Plain-language guides on brand, websites, search and paid marketing for small and mid-size businesses."
      />

      <section aria-label="Articles" className="blog-list shell">
        <ol>
          {sortedPosts.map((p, i) => (
            <li key={p.slug} className="blog-row" data-reveal="fade">
              <article aria-labelledby={`post-${p.slug}`}>
                <TLink to={`/blog/${p.slug}`} className="blog-row__link group" data-cursor="Read">
                  <span className="label blog-row__n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="blog-row__main">
                    <span className="label blog-row__meta">
                      {p.category} · <time dateTime={p.published}>{formatDate(p.published)}</time> · {readingTime(p)} min read
                    </span>
                    <h2 id={`post-${p.slug}`} className="blog-row__title">
                      {p.title}
                    </h2>
                    <p className="blog-row__summary">{p.summary}</p>
                  </span>
                  <span className="blog-row__arrow" aria-hidden="true">
                    →
                  </span>
                </TLink>
              </article>
            </li>
          ))}
        </ol>
        <p className="label blog-list__rss">
          <a href="/blog/rss.xml" className="prose__link">
            RSS feed
          </a>
        </p>
      </section>

      <FinalCta />
    </>
  )
}
