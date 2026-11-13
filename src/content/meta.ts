import { routeMeta, site } from './site'
import { projectBySlug, projects } from './work'

export type Meta = { title: string; description: string; image?: string }

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
  return null
}

export const notFoundMeta: Meta = { title: 'Page not found — AVRA', description: site.description }

/** Every route that should be prerendered. */
export const allRoutes = [...Object.keys(routeMeta), ...projects.map((p) => `/work/${p.slug}`)]
