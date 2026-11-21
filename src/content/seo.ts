/**
 * Structured data (JSON-LD, Schema.org) for every route, built as one @graph per page.
 * Used by scripts/prerender.mjs. Nodes reference each other by @id so search engines
 * and AI systems see one consistent entity: AVRA, its website, pages, services and articles.
 * Keep it truthful: only mark up what is visible on the page.
 */
import { plain, postBySlug, postModified, sortedPosts, wordCount } from './blog'
import { metaFor } from './meta'
import { services, site } from './site'
import { coverOf, projectBySlug, projects } from './work'

type Node = Record<string, unknown>

const abs = (p: string) => (p.startsWith('http') ? p : `${site.url}${p}`)
const ORG = `${site.url}/#business`
const WEBSITE = `${site.url}/#website`
const BLOG = `${site.url}/blog#blog`

const serviceDetail: Record<string, string> = {
  brand: 'Brand identity',
  websites: 'Website design and development',
  performance: 'Performance marketing',
}

const areaServed = [
  { '@type': 'City', name: 'Vancouver', containedInPlace: { '@type': 'AdministrativeArea', name: 'British Columbia' } },
  { '@type': 'AdministrativeArea', name: 'British Columbia' },
  { '@type': 'Country', name: 'Canada' },
]

function organization(): Node {
  return {
    '@type': 'ProfessionalService',
    '@id': ORG,
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: `${site.url}/`,
    logo: { '@type': 'ImageObject', '@id': `${site.url}/#logo`, url: abs('/android-chrome-512.png'), width: 512, height: 512 },
    image: abs('/og-image.png'),
    ...(site.email ? { email: site.email } : {}),
    address: { '@type': 'PostalAddress', addressLocality: site.city, addressRegion: site.region, addressCountry: site.country },
    areaServed,
    knowsAbout: [
      'Brand identity',
      'Logo design',
      'Website design and development',
      'E-commerce',
      'Search engine optimization',
      'Performance marketing',
      'Meta advertising',
      'Google Ads',
    ],
    sameAs: Object.values(site.social).filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Marketing services',
      itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@id': `${site.url}/services#${s.slug}` } })),
    },
  }
}

function website(): Node {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE,
    url: `${site.url}/`,
    name: site.name,
    description: site.description,
    inLanguage: 'en-CA',
    publisher: { '@id': ORG },
  }
}

type Crumb = { name: string; path: string }

function crumbsFor(path: string): Crumb[] {
  if (path === '/') return []
  const top: Record<string, string> = { '/work': 'Work', '/services': 'Services', '/about': 'About', '/blog': 'Blog', '/contact': 'Contact' }
  const out: Crumb[] = [{ name: 'Home', path: '/' }]
  const section = `/${path.split('/')[1]}`
  if (top[section]) out.push({ name: top[section], path: section })
  const work = path.match(/^\/work\/(.+)$/)
  if (work) {
    const p = projectBySlug(work[1])
    if (p) out.push({ name: p.title, path })
  }
  const blog = path.match(/^\/blog\/(.+)$/)
  if (blog) {
    const p = postBySlug(blog[1])
    if (p) out.push({ name: p.title, path })
  }
  return out
}

function breadcrumb(path: string): Node | null {
  const c = crumbsFor(path)
  if (c.length < 2) return null
  return {
    '@type': 'BreadcrumbList',
    '@id': `${abs(path)}#breadcrumb`,
    itemListElement: c.map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: x.name, item: abs(x.path) })),
  }
}

const pageType: Record<string, string> = {
  '/about': 'AboutPage',
  '/contact': 'ContactPage',
  '/work': 'CollectionPage',
  '/blog': 'CollectionPage',
}

/** The @graph for a route, or null for routes that shouldn't carry schema (404). */
export function jsonLdFor(path: string): Node | null {
  const meta = metaFor(path)
  if (!meta) return null
  const url = abs(path === '/' ? '/' : path)
  const crumbs = breadcrumb(path)
  const image = abs(meta.image ?? '/og-image.png')

  const page: Node = {
    '@type': pageType[path] ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: meta.title,
    description: meta.description,
    inLanguage: 'en-CA',
    isPartOf: { '@id': WEBSITE },
    about: { '@id': ORG },
    primaryImageOfPage: { '@type': 'ImageObject', url: image },
    ...(crumbs ? { breadcrumb: { '@id': crumbs['@id'] } } : {}),
  }

  const graph: Node[] = [organization(), website(), page]
  if (crumbs) graph.push(crumbs)

  if (path === '/services') {
    for (const s of services) {
      graph.push({
        '@type': 'Service',
        '@id': `${site.url}/services#${s.slug}`,
        name: s.title,
        serviceType: serviceDetail[s.slug] ?? s.title,
        description: s.body,
        url: `${site.url}/services#${s.slug}`,
        provider: { '@id': ORG },
        areaServed,
      })
    }
  }

  if (path === '/work') {
    page.mainEntity = {
      '@type': 'ItemList',
      itemListElement: projects.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/work/${p.slug}`), name: p.title })),
    }
  }

  const work = path.match(/^\/work\/(.+)$/)
  const project = work ? projectBySlug(work[1]) : undefined
  if (project) {
    const cover = coverOf(project)
    graph.push({
      '@type': 'CreativeWork',
      '@id': `${url}#work`,
      name: project.title,
      headline: project.summary,
      description: project.summary,
      url,
      image: abs(cover.src),
      creator: { '@id': ORG },
      publisher: { '@id': ORG },
      about: { '@type': 'Organization', name: project.client },
      genre: project.category,
      keywords: project.services.split('·').map((s) => s.trim()).join(', '),
      ...(project.year ? { dateCreated: project.year.slice(0, 4) } : {}),
      ...(project.url ? { sameAs: project.url } : {}),
      mainEntityOfPage: { '@id': `${url}#webpage` },
      inLanguage: 'en-CA',
    })
  }

  if (path === '/blog') {
    graph.push({
      '@type': 'Blog',
      '@id': BLOG,
      url,
      name: 'AVRA Blog',
      description: meta.description,
      publisher: { '@id': ORG },
      inLanguage: 'en-CA',
      blogPost: sortedPosts.map((p) => ({
        '@type': 'BlogPosting',
        '@id': `${abs(`/blog/${p.slug}`)}#article`,
        headline: p.title,
        url: abs(`/blog/${p.slug}`),
        datePublished: p.published,
        dateModified: postModified(p),
      })),
    })
  }

  const blog = path.match(/^\/blog\/(.+)$/)
  const post = blog ? postBySlug(blog[1]) : undefined
  if (post) {
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: post.title,
      description: plain(post.summary),
      abstract: post.takeaways.map(plain).join(' '),
      url,
      image,
      datePublished: post.published,
      dateModified: postModified(post),
      author: { '@id': ORG },
      publisher: { '@id': ORG },
      isPartOf: { '@id': BLOG },
      mainEntityOfPage: { '@id': `${url}#webpage` },
      articleSection: post.category,
      wordCount: wordCount(post),
      inLanguage: 'en-CA',
      ...(post.related?.length
        ? { mentions: post.related.flatMap((s) => (projectBySlug(s) ? [{ '@id': `${abs(`/work/${s}`)}#work` }] : [])) }
        : {}),
    })
    if (post.faq?.length) {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        isPartOf: { '@id': `${url}#webpage` },
        mainEntity: post.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
        })),
      })
    }
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}
