/**
 * Static prerender: renders each route to HTML so the site reads fully without
 * JavaScript (and crawlers get real content). The client then hydrates.
 * Run after `vite build` and `vite build --ssr` (see package.json "build").
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

let template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

// Inline the (small) stylesheet so it doesn't block first paint, and preload the
// headline font so the hero renders in Inter Tight straight away.
template = template.replace(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/, (_, href) => {
  const css = fs.readFileSync(path.join(dist, href), 'utf8')
  return `<style>${css}</style>`
})
const assets = fs.readdirSync(path.join(dist, 'assets'))
const preloads = ['inter-tight-latin-800-normal', 'inter-tight-latin-400-normal']
  .map((n) => assets.find((f) => f.startsWith(n) && f.endsWith('.woff2')))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ')
template = template.replace('</title>', `</title>\n    ${preloads}`)
const { render, routeMeta, site } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const abs = (p) => `${site.url}${p}`

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${site.url}/#business`,
  name: 'AVRA',
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  image: abs('/og-image.png'),
  logo: abs('/brand/avra-wordmark.svg'),
  ...(site.email ? { email: site.email } : {}),
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: site.country,
  },
  areaServed: [
    { '@type': 'City', name: 'Vancouver' },
    { '@type': 'AdministrativeArea', name: 'British Columbia' },
  ],
  knowsAbout: ['Brand identity', 'Website design and development', 'Performance marketing'],
  sameAs: [site.social.instagram, site.social.linkedin].filter(Boolean),
}

const routes = [
  { url: '/', out: 'index.html' },
  { url: '/contact', out: 'contact/index.html' },
  { url: '/contact', out: 'contact.html', alias: true },
  { url: '/404', out: '404.html', noindex: true },
]

for (const r of routes) {
  const meta = routeMeta[r.url] ?? { title: 'Page not found — AVRA', description: routeMeta['/'].description }
  const appHtml = render(r.url)
  const head = [
    r.noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${esc(abs(r.url))}" />`,
    `<meta property="og:url" content="${esc(abs(r.url))}" />`,
    r.url === '/' ? `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>` : '',
  ]
    .filter(Boolean)
    .join('\n    ')

  const html = template
    .replace('<div id="root">', `<div id="root" data-route="${r.url}">`)
    .replace('<!--app-html-->', appHtml)
    .replace('<!--app-head-->', head)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${esc(meta.title)}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
    .replace(/(<meta\s+property="og:image"\s+content=")[^"]*(")/, `$1${esc(abs('/og-image.png'))}$2`)

  const file = path.join(dist, r.out)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, html)
  console.log(`prerendered ${r.url} → dist/${r.out}`)
}

fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter((r) => !r.noindex && !r.alias)
  .map((r) => `  <url><loc>${abs(r.url)}</loc></url>`)
  .join('\n')}
</urlset>
`,
)
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`)
fs.rmSync(ssrDir, { recursive: true, force: true })
console.log('sitemap.xml + robots.txt written')
