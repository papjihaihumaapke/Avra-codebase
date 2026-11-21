/**
 * Static prerender: renders each route to HTML so the site reads fully without
 * JavaScript (and crawlers get real content). The client then hydrates.
 * Run after `vite build` and `vite build --ssr` (see package.json "build").
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { execSync } from 'node:child_process'

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
const { render, allRoutes, metaFor, notFoundMeta, site, jsonLdFor, sortedPosts, postModified, plain, projects, services } =
  await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const abs = (p) => (p.startsWith('http') ? p : `${site.url}${p}`)
const today = new Date().toISOString().slice(0, 10)

/** Last commit date touching these paths (falls back to today outside git). Feeds sitemap <lastmod>. */
const gitDate = (...paths) => {
  try {
    const d = execSync(`git log -1 --format=%cs -- ${paths.map((p) => `"${p}"`).join(' ')}`, { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim()
    return d || today
  } catch {
    return today
  }
}
const siteDate = gitDate('src', 'public', 'index.html')
const workDate = gitDate('src/content/work.ts', 'public/work')
const newestPost = sortedPosts.map(postModified).sort().at(-1) ?? siteDate
const lastmodFor = (url) => {
  const post = url.match(/^\/blog\/(.+)$/) && sortedPosts.find((p) => `/blog/${p.slug}` === url)
  if (post) return postModified(post)
  if (url === '/blog') return [newestPost, siteDate].sort().at(-1)
  if (url.startsWith('/work')) return [workDate, siteDate].sort().at(-1)
  return siteDate
}

const routes = [
  ...allRoutes.map((url) => ({ url, out: url === '/' ? 'index.html' : `${url.slice(1)}/index.html` })),
  // `/contact.html` style aliases for hosts that resolve extensionless URLs to .html files
  ...allRoutes.filter((u) => u !== '/').map((url) => ({ url, out: `${url.slice(1)}.html`, alias: true })),
  { url: '/404', out: '404.html', noindex: true },
]

const ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

for (const r of routes) {
  const meta = metaFor(r.url) ?? notFoundMeta
  const appHtml = render(r.url)
  const url = abs(r.url)
  const image = abs(meta.image ?? '/og-image.png')
  const ld = r.noindex ? null : jsonLdFor(r.url)
  const head = [
    r.noindex ? '<meta name="robots" content="noindex" />' : `<meta name="robots" content="${ROBOTS}" />`,
    r.noindex ? '' : `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    ...(meta.type === 'article'
      ? [
          `<meta property="article:published_time" content="${meta.published}T00:00:00-08:00" />`,
          `<meta property="article:modified_time" content="${meta.modified}T00:00:00-08:00" />`,
          `<meta property="article:section" content="${esc(meta.section)}" />`,
        ]
      : []),
    `<link rel="alternate" type="application/rss+xml" title="AVRA Blog" href="${abs('/blog/rss.xml')}" />`,
    ld ? `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>` : '',
  ]
    .filter(Boolean)
    .join('\n    ')

  let html = template
    .replace('<div id="root">', `<div id="root" data-route="${r.url}">`)
    .replace('<!--app-html-->', appHtml)
    .replace('<!--app-head-->', head)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
    .replace(/(<meta\s+property="og:type"\s+content=")[^"]*(")/, `$1${meta.type ?? 'website'}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${esc(meta.title)}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
    .replace(/(<meta\s+property="og:image"\s+content=")[^"]*(")/, `$1${esc(image)}$2`)
  // The declared 1200×630 size and alt only describe the default share image.
  if (meta.image) {
    html = html
      .replace(/\s*<meta\s+property="og:image:(width|height)"[^>]*>/g, '')
      .replace(/(<meta\s+property="og:image:alt"\s+content=")[^"]*(")/, `$1${esc(meta.title)}$2`)
  }

  const file = path.join(dist, r.out)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, html)
}
console.log(`prerendered ${routes.length} pages`)

/* ---------------------------------------------------------------- sitemap.xml */
const indexable = routes.filter((r) => !r.noindex && !r.alias)
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((r) => `  <url><loc>${abs(r.url)}</loc><lastmod>${lastmodFor(r.url)}</lastmod></url>`).join('\n')}
</urlset>
`,
)

/* ---------------------------------------------------------------- blog/rss.xml */
const rfc822 = (iso) => new Date(`${iso}T12:00:00Z`).toUTCString()
const xml = (s) => esc(s).replace(/'/g, '&apos;')
fs.mkdirSync(path.join(dist, 'blog'), { recursive: true })
fs.writeFileSync(
  path.join(dist, 'blog', 'rss.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AVRA Blog</title>
    <link>${abs('/blog')}</link>
    <description>${xml(metaFor('/blog').description)}</description>
    <language>en-ca</language>
    <lastBuildDate>${rfc822(newestPost)}</lastBuildDate>
    <atom:link href="${abs('/blog/rss.xml')}" rel="self" type="application/rss+xml" />
${sortedPosts
  .map(
    (p) => `    <item>
      <title>${xml(p.title)}</title>
      <link>${abs(`/blog/${p.slug}`)}</link>
      <guid isPermaLink="true">${abs(`/blog/${p.slug}`)}</guid>
      <pubDate>${rfc822(p.published)}</pubDate>
      <category>${xml(p.category)}</category>
      <description>${xml(plain(p.summary))}</description>
    </item>`,
  )
  .join('\n')}
  </channel>
</rss>
`,
)

/* ---------------------------------------------------------------- llms.txt */
// A plain-text map of the site for AI tools. Not a ranking factor; generated so it never goes stale.
const projectLine = (p) => `- [${p.title}](${abs(`/work/${p.slug}`)}): ${p.summary}`
const postLine = (p) => `- [${p.title}](${abs(`/blog/${p.slug}`)}): ${plain(p.summary)}`
fs.writeFileSync(
  path.join(dist, 'llms.txt'),
  `# ${site.name}

> ${site.description} Based in ${site.city}, ${site.region}, Canada.

AVRA works with small and mid-size businesses on ${services.map((s) => s.title.toLowerCase()).join(', ')}. The people who plan a project are the people who make it.${site.email ? ` Contact: ${site.email}.` : ''}

## Main pages
- [Services](${abs('/services')}): ${services.map((s) => `${s.title}: ${s.body}`).join(' ')}
- [Work](${abs('/work')}): Case studies
- [About](${abs('/about')}): The studio and how it works
- [Blog](${abs('/blog')}): Guides on brand, websites, search and paid marketing
- [Contact](${abs('/contact')}): Enquiries and booking a call

## Case studies
${projects.map(projectLine).join('\n')}

## Blog
${sortedPosts.map(postLine).join('\n')}

## Optional
- [Sitemap](${abs('/sitemap.xml')})
- [RSS feed](${abs('/blog/rss.xml')})
`,
)

/* ---------------------------------------------------------------- robots.txt */
// Everyone may crawl. AI search/assistant crawlers are named so the intent is explicit;
// a named group replaces the * group for that bot, so it repeats the same rules.
const aiBots = [
  'Googlebot',
  'Bingbot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'DuckAssistBot',
]
const rules = 'Allow: /\nDisallow: /api/'
fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  `User-agent: *\n${rules}\n\n${aiBots.map((b) => `User-agent: ${b}`).join('\n')}\n${rules}\n\nSitemap: ${abs('/sitemap.xml')}\n`,
)

fs.rmSync(ssrDir, { recursive: true, force: true })
console.log('sitemap.xml, blog/rss.xml, llms.txt and robots.txt written')
