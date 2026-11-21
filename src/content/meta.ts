import { plain, postBySlug, postModified, posts } from './blog'
import { routeMeta, site } from './site'
import { projectBySlug, projects } from './work'

export type Meta = {
  title: string
  description: string
  image?: string
  /** Open Graph type. Blog posts are articles; everything else is a website page. */
  type?: 'website' | 'article'
  published?: string
  modified?: string
  section?: string
}

/** Title/description (and share image) for any route. */
export function metaFor(path: string): Meta | null {
  const clean = path.replace(/\/+$/, '') || '/'
  if (routeMeta[clean]) return routeMeta[clean]
  const m = clean.match(/^\/work\/([a-z0-9-]+)$/)
  if (m) {
    const p = projectBySlug(m[1])
    if (p) {
      return {
        title: `${p.title} — ${p.services} | AVRA`,
        description: p.summary,
        image: p.cover.src,
      }
    }
  }
  const b = clean.match(/^\/blog\/([a-z0-9-]+)$/)
  if (b) {
    const p = postBySlug(b[1])
    if (p) {
      return {
        title: `${p.seoTitle ?? p.title} | AVRA`,
        description: plain(p.summary),
        image: p.image,
        type: 'article',
        published: p.published,
        modified: postModified(p),
        section: p.category,
      }
    }
  }
  return null
}

export const notFoundMeta: Meta = { title: 'Page not found — AVRA', description: site.description }

/** Every route that should be prerendered. */
export const allRoutes = [
  ...Object.keys(routeMeta),
  ...projects.map((p) => `/work/${p.slug}`),
  ...posts.map((p) => `/blog/${p.slug}`),
]
