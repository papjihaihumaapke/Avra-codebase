/**
 * Homepage-only copy: slide taglines, the work index, studio carousel and the word wall.
 * Project facts still come from src/content/work.ts.
 */
import { projects, projectBySlug, type Img, type Project } from './work'

/** Featured slider, in order. */
const featuredOrder = ['alps-annie-ling', 'dunes-and-scents', 'little-anna', 'wall-canvas', 'go-green-mowing']

export const slides: Project[] = featuredOrder.flatMap((slug) => {
  const p = projectBySlug(slug)
  return p ? [p] : []
})

/** Short display names for the giant work index (fits one line at display size). */
const shortNames: Record<string, string> = {
  'alps-annie-ling': 'ALPS',
  'go-green-mowing': 'Go Green',
  'little-anna': 'Little Anna',
  'desert-fox': 'Desert Fox',
  'dunes-and-scents': 'Dunes & Scents',
  'wall-canvas': 'Wall Canvas',
  'social-creative': 'Social Ads',
  sitetask: 'SiteTask',
  tuniff: 'Tuniff',
}
export const indexItems = (list: Project[] = projects) =>
  list.map((p) => ({
    project: p,
    name: shortNames[p.slug] ?? p.title,
    n: String(projects.indexOf(p) + 1).padStart(2, '0'),
  }))

/** Dark "always making" carousel: real pieces from the portfolio. */
const studio: { slug: string; file: string; caption: string }[] = [
  { slug: 'desert-fox', file: 'g-5', caption: 'Merch for a dessert stall' },
  { slug: 'dunes-and-scents', file: 'g-2', caption: 'A fragrance wardrobe, in five bottles' },
  { slug: 'little-anna', file: 'g-3', caption: 'Pattern packaging for a bakery' },
  { slug: 'wall-canvas', file: 'g-2', caption: 'Neon that stops the scroll' },
  { slug: 'social-creative', file: 'g-1', caption: 'One offer, said clearly' },
  { slug: 'go-green-mowing', file: 'g-2', caption: 'A mascot with a mower' },
  { slug: 'desert-fox', file: 'g-8', caption: 'Stickers, sleeves and sand' },
  { slug: 'dunes-and-scents', file: 'g-5', caption: 'Cinematic single-bottle scenes' },
]
export const studioCards = studio.flatMap(({ slug, file, caption }) => {
  const project = projectBySlug(slug)
  if (!project) return []
  const image: Img = { src: `/work/${slug}/${file}.webp`, w: 512, h: 512, alt: `${project.title}: ${caption}` }
  return [{ project, image, caption }]
})

/** Word wall rows over the full-bleed image (like a city list). */
export const wordRows = [
  ['Brand', 'Websites', 'Paid social'],
  ['Search', 'Packaging', 'Identity'],
  ['Content', 'E-commerce', 'Reporting'],
  ['Vancouver', 'British Columbia', 'Canada'],
]
