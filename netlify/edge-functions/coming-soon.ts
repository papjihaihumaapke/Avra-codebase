/**
 * Pre-launch gate. Until launch, every page shows a branded "Coming soon" screen;
 * the team gets through with a password, which sets a cookie for 30 days.
 *
 * To launch: delete this file (or set SITE_LIVE=true in Netlify and redeploy).
 *
 * The repo is public, so the password is never stored here. The cookie holds
 * sha256(password + SALT); this file holds only sha256 of that cookie value, so
 * neither the password nor a valid cookie can be derived from the code.
 */
import type { Config, Context } from '@netlify/edge-functions'

const SALT = ':avra-preview'
const COOKIE = 'avra_preview'
const VERIFIER = '6fbe34a26318313c6842904b606312d004d68e9bf7080ec238769f165c036445'
const MAX_AGE = 60 * 60 * 24 * 30

async function sha256(text: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

const isValidToken = async (token: string | undefined) => !!token && (await sha256(token)) === VERIFIER

function readCookie(req: Request, name: string) {
  const match = (req.headers.get('cookie') ?? '').match(new RegExp(`(?:^|;\\s*)${name}=([a-f0-9]{64})`))
  return match?.[1]
}

/** Only same-site paths, so the form can't be used to redirect elsewhere. */
const safeNext = (value: FormDataEntryValue | null) => {
  const next = typeof value === 'string' ? value : '/'
  return next.startsWith('/') && !next.startsWith('//') ? next : '/'
}

export default async (req: Request, context: Context) => {
  if (Netlify.env.get('SITE_LIVE') === 'true') return context.next()

  const url = new URL(req.url)

  if (url.pathname === '/__unlock' && req.method === 'POST') {
    const form = await req.formData()
    const token = await sha256(String(form.get('password') ?? '') + SALT)
    if (await isValidToken(token)) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: safeNext(form.get('next')),
          'Set-Cookie': `${COOKIE}=${token}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
          'Cache-Control': 'no-store',
        },
      })
    }
    return page(safeNext(form.get('next')), true)
  }

  if (await isValidToken(readCookie(req, COOKIE))) return context.next()

  // Assets and the contact API answer normally only for the team; everyone else gets the page.
  return page(url.pathname, false)
}

/** The homepage hero's own ingredients: blurred work imagery and the staggered headline. */
const BACKDROPS = [
  '/work/dunes-and-scents/art-blur.webp',
  '/work/fit-and-flex/art-blur.webp',
  '/work/little-anna/art-blur.webp',
  '/work/wall-canvas/art-blur.webp',
  '/work/go-green-mowing/art-blur.webp',
]
const WORDS: { text: string; x: string; row: number }[] = [
  { text: 'Growth', x: '22%', row: 0 },
  { text: 'that', x: '4%', row: 1 },
  { text: 'flows', x: '50%', row: 1 },
  { text: 'without', x: '12%', row: 2 },
  { text: 'noise', x: '62%', row: 2 },
]

function page(next: string, wrong: boolean) {
  const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
  // Deterministic "random" stagger, like the site's SplitText from: 'random'.
  let seed = 7
  const rand = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280)
  const rows = [0, 1, 2]
    .map((row) => {
      const words = WORDS.filter((w) => w.row === row)
        .map((w) => {
          const chars = [...w.text]
            .map((c) => `<span class="mask"><span class="ch" style="--d:${(0.35 + rand() * 0.55).toFixed(2)}s">${c}</span></span>`)
            .join('')
          return `<span class="word" style="--x:${w.x}">${chars}</span>`
        })
        .join('')
      return `<span class="row" aria-hidden="true">${words}</span>`
    })
    .join('')
  const layers = BACKDROPS.map((src, i) => `<div class="bg${i === 0 ? ' is-on' : ''}" style="background-image:url(${src})"></div>`).join('')

  const html = `<!doctype html>
<html lang="en-CA">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>AVRA — Opening 19 November</title>
<meta name="description" content="AVRA is a marketing studio in Vancouver, BC. Brand, websites and performance marketing. The new site opens 19 November 2026." />
<meta name="robots" content="noindex" />
<meta name="theme-color" content="#111111" />
<link rel="icon" href="/favicon.ico" sizes="48x48" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="AVRA" />
<meta property="og:title" content="AVRA — Growth that flows. Opening 19 November." />
<meta property="og:description" content="A Vancouver marketing studio for brands ready to rise. Brand, websites and performance marketing, without the noise." />
<meta property="og:url" content="https://thinkavra.com/" />
<meta property="og:image" content="https://thinkavra.com/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
${BACKDROPS.slice(0, 2).map((s) => `<link rel="preload" as="image" href="${s}" />`).join('\n')}
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600&family=Instrument+Serif:ital@1&family=Geist+Mono:wght@500&display=swap" rel="stylesheet" />
<style>
  :root {
    --graphite: #111111; --paper: #f2f1ee; --signal: #d9372b;
    --gutter: clamp(1rem, 4vw, 3.5rem); --nav-height: 4.5rem;
    --ease-reveal: cubic-bezier(0.16, 1, 0.3, 1); --ease-move: cubic-bezier(0.65, 0, 0.35, 1);
    --sans: "Inter Tight", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    --mono: "Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
    --serif: "Instrument Serif", ui-serif, Georgia, serif;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; background: var(--graphite); }
  body { color: var(--paper); font-family: var(--sans); -webkit-font-smoothing: antialiased; overflow: hidden; }
  a, button { color: inherit; font: inherit; }
  .label { font-family: var(--mono); font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase; line-height: 1.4; font-weight: 500; }
  @media (min-width: 768px) { .label { font-size: 0.875rem; } }

  /* Hero: blurred moving colour, staggered giant words (same as the homepage) */
  .hero { position: relative; isolation: isolate; height: 100svh; min-height: 560px; overflow: hidden; }
  .bgwrap { position: absolute; inset: -10% 0; z-index: -1; }
  .bg { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: 0; transform: scale(1.15);
        transition: opacity 1.6s ease-in-out, transform 6.5s linear; will-change: transform, opacity; }
  .bg.is-on { opacity: 1; transform: scale(1.35); }
  .shade { position: absolute; inset: 0; background: linear-gradient(to bottom, rgb(17 17 17 / 0.1) 0%, rgb(17 17 17 / 0) 35%, rgb(17 17 17 / 0.55) 100%); }

  .words { position: absolute; inset: auto 0 clamp(4.5rem, 12vh, 7.5rem) 0; font-weight: 600; text-transform: uppercase;
           letter-spacing: -0.055em; line-height: 0.84; font-size: min(10.5vw, 17svh); }
  .row { display: block; position: relative; height: 0.9em; }
  .word { position: absolute; left: var(--x); top: 0; white-space: nowrap; color: rgb(242 241 238 / 0.94); will-change: transform; }
  .mask { display: inline-block; overflow: hidden; vertical-align: top; padding-top: 0.04em; }
  .ch { display: inline-block; transform: translateY(115%); animation: rise 1.3s var(--ease-reveal) var(--d) forwards; }
  @keyframes rise { to { transform: none; } }

  .note { position: absolute; left: var(--gutter); top: calc(var(--nav-height) + clamp(1.5rem, 8vh, 5rem)); max-width: 15ch;
          font-family: var(--serif); font-style: italic; font-size: clamp(1.75rem, 3.4vw, 3.25rem); line-height: 1; letter-spacing: -0.02em;
          opacity: 0; animation: fade 1s var(--ease-reveal) 1.1s forwards; }
  .note em { color: var(--signal); font-style: italic; }

  .foot { position: absolute; inset: auto var(--gutter) 1.5rem var(--gutter); display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
  .foot .label { opacity: 0; animation: fade 1s var(--ease-reveal) forwards; }
  .foot .label:nth-child(1) { animation-delay: 1.2s; } .foot .label:nth-child(2) { animation-delay: 1.28s; } .foot .label:nth-child(3) { animation-delay: 1.36s; }
  @keyframes fade { from { opacity: 0; transform: translateY(16px); } to { opacity: 0.8; transform: none; } }
  .dot { display: inline-block; width: 0.45rem; height: 0.45rem; margin-right: 0.55rem; border-radius: 50%; background: var(--signal); vertical-align: 0.05rem; animation: pulse 1.8s var(--ease-move) infinite; }
  @keyframes pulse { 50% { opacity: 0.3; transform: scale(0.65); } }

  /* Nav: logo with difference blend, paper pills */
  .logo { position: fixed; z-index: 61; top: calc((var(--nav-height) - 27px) / 2); left: var(--gutter); mix-blend-mode: difference; }
  .logo img { display: block; height: 27px; width: auto; }
  .nav { position: fixed; z-index: 60; top: calc((var(--nav-height) - 2rem) / 2); right: var(--gutter); display: flex; gap: 0.375rem; align-items: center; }
  .pill { display: inline-flex; align-items: center; height: 2rem; padding: 0.3rem 0.55rem 0.25rem; border: 1px solid var(--graphite); border-radius: 7px;
          background: rgb(250 250 248 / 0.94); color: var(--graphite); font-size: 1.0625rem; font-weight: 600; letter-spacing: -0.03em;
          text-transform: uppercase; line-height: 1; text-decoration: none; cursor: pointer;
          transition: background-color 300ms var(--ease-reveal), color 300ms var(--ease-reveal), border-color 300ms var(--ease-reveal); }
  .pill:hover, .pill[aria-expanded="true"] { background: var(--signal); border-color: var(--signal); color: #fff; }
  @media (min-width: 768px) { .logo { top: calc((var(--nav-height) - 32px) / 2); } .logo img { height: 32px; } }

  /* Team access: underline field and ink pill, as on the contact page */
  .access { position: fixed; z-index: 60; top: calc(var(--nav-height) + 0.25rem); right: var(--gutter); width: min(20rem, calc(100vw - 2 * var(--gutter)));
            padding: 1rem 1.1rem 1.1rem; border-radius: 10px; background: rgb(250 250 248 / 0.96); color: var(--graphite);
            transform-origin: top right; transition: opacity 400ms var(--ease-reveal), transform 400ms var(--ease-reveal); }
  .access[hidden] { display: block; opacity: 0; transform: translateY(-6px) scale(0.98); pointer-events: none; visibility: hidden; }
  .access .label { opacity: 0.55; font-size: 0.7rem; }
  .access .err { color: var(--signal); opacity: 1; }
  .field { display: flex; align-items: end; gap: 0.75rem; margin-top: 0.6rem; }
  .field input { flex: 1; min-width: 0; padding: 0.4rem 0; border: 0; border-bottom: 1px solid var(--graphite); background: transparent;
                 color: var(--graphite); font-size: 1.125rem; letter-spacing: -0.01em; border-radius: 0; }
  .field input:focus { outline: none; border-bottom-color: var(--signal); }
  .ink { height: 2rem; padding: 0 0.8rem; border: 1px solid var(--graphite); border-radius: 7px; background: var(--graphite); color: var(--paper);
         font-size: 0.95rem; font-weight: 600; letter-spacing: -0.03em; text-transform: uppercase; cursor: pointer; }
  .ink:hover { background: var(--signal); border-color: var(--signal); }

  .grain { position: fixed; inset: 0; z-index: 70; pointer-events: none; opacity: 0.045; background-image: url("/grain.png"); background-size: 160px; }
  .cursor { position: fixed; left: 0; top: 0; z-index: 96; width: 10px; height: 10px; margin: -5px 0 0 -5px; border-radius: 999px; background: var(--signal);
            pointer-events: none; opacity: 0; transition: width 450ms var(--ease-reveal), height 450ms var(--ease-reveal), margin 450ms var(--ease-reveal), opacity 300ms; }
  .cursor.is-on { opacity: 1; } .cursor.is-big { width: 28px; height: 28px; margin: -14px 0 0 -14px; }
  .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

  /* Phones: one word per line, alternating indents (as on the homepage) */
  @media (max-width: 767.98px) {
    .words { font-size: 19vw; bottom: 5.5rem; }
    .row { height: auto; }
    .word { position: relative; display: block; left: auto; padding-left: var(--gutter); height: 0.9em; }
    .row:nth-child(2) .word { padding-left: 18%; }
    .row:nth-child(3) .word:last-child { padding-left: 30%; }
    .row:nth-child(4) .word:last-child { padding-left: 40%; }
    .foot .mid { display: none; }
    .hide-m { display: none; }
    .foot .label { white-space: nowrap; }
    .pill { font-size: 0.95rem; }
  }
  @media (pointer: coarse) { .grain, .cursor { display: none; } }
  @media (prefers-reduced-motion: reduce) {
    .ch { animation: none; transform: none; } .note, .foot .label { animation: none; opacity: 0.8; }
    .bg { transition: opacity 1.6s; transform: scale(1.2); } .dot { animation: none; }
  }
</style>
</head>
<body>
  <a class="logo" href="/" aria-label="AVRA"><img src="/brand/avra-wordmark-paper.svg" alt="AVRA" width="542" height="138" /></a>
  <nav class="nav" aria-label="Studio">
    <a class="pill" href="https://www.instagram.com/think.avra/" target="_blank" rel="noopener">Instagram</a>
    <a class="pill hide-m" href="https://www.linkedin.com/company/think-avra" target="_blank" rel="noopener">LinkedIn</a>
    <a class="pill hide-m" href="mailto:hello@thinkavra.com">Email us</a>
    <button class="pill" type="button" aria-expanded="${wrong}" aria-controls="access">Team access</button>
  </nav>
  <form id="access" class="access" method="post" action="/__unlock"${wrong ? '' : ' hidden'}>
    <input type="hidden" name="next" value="${esc(next)}" />
    <label class="label${wrong ? ' err' : ''}" for="pw">${wrong ? 'Wrong password, try again' : 'Team password'}</label>
    <div class="field">
      <input id="pw" name="password" type="password" autocomplete="current-password" required${wrong ? ' autofocus' : ''} />
      <button class="ink" type="submit">Enter</button>
    </div>
  </form>

  <main class="hero">
    <div class="bgwrap" aria-hidden="true">${layers}<div class="shade"></div></div>
    <p class="note">The new site opens <em>19&nbsp;November</em></p>
    <h1 class="words"><span class="sr">Growth that flows, without noise. AVRA is a marketing studio in Vancouver, BC. The new site opens 19 November 2026.</span>${rows}</h1>
    <div class="foot">
      <p class="label"><span class="hide-m">Marketing studio · </span>Vancouver, BC</p>
      <p class="label mid">Brand · Websites · Performance</p>
      <p class="label"><span class="dot" aria-hidden="true"></span>Opening 19.11.2026</p>
    </div>
  </main>
  <div class="grain" aria-hidden="true"></div>
  <div class="cursor" aria-hidden="true"></div>

<script>
(() => {
  const btn = document.querySelector('.nav button'), form = document.getElementById('access')
  btn.addEventListener('click', () => {
    const open = form.hidden
    form.hidden = !open
    btn.setAttribute('aria-expanded', String(open))
    if (open) setTimeout(() => form.querySelector('#pw').focus(), 50)
  })
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !form.hidden) { form.hidden = true; btn.setAttribute('aria-expanded', 'false') } })

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  // Backdrop crossfade, one project every 4.5s.
  const layers = [...document.querySelectorAll('.bg')]
  let i = 0
  setInterval(() => {
    const prev = layers[i]; i = (i + 1) % layers.length
    const next = layers[i]
    next.style.transition = 'none'; next.style.transform = 'scale(1.15)'; next.offsetWidth; next.style.transition = ''; next.style.transform = ''
    next.classList.add('is-on')
    setTimeout(() => prev.classList.remove('is-on'), 1700)
  }, 4500)

  if (!matchMedia('(pointer: fine)').matches) return
  // Gentle depth parallax per word, and the site's red cursor.
  const words = [...document.querySelectorAll('.word')].map((el, k) => ({ el, d: 10 + (k % 3) * 12, x: 0, y: 0 }))
  const cursor = document.querySelector('.cursor')
  let nx = 0, ny = 0, cx = -100, cy = -100, tx = -100, ty = -100
  addEventListener('pointermove', (e) => {
    nx = e.clientX / innerWidth - 0.5; ny = e.clientY / innerHeight - 0.5; tx = e.clientX; ty = e.clientY
    cursor.classList.add('is-on')
    cursor.classList.toggle('is-big', !!e.target.closest('a, button, input'))
  }, { passive: true })
  document.addEventListener('pointerleave', () => cursor.classList.remove('is-on'))
  const tick = () => {
    for (const w of words) { w.x += (nx * w.d * 2 - w.x) * 0.06; w.y += (ny * w.d - w.y) * 0.06; w.el.style.transform = 'translate3d(' + w.x.toFixed(2) + 'px,' + w.y.toFixed(2) + 'px,0)' }
    cx += (tx - cx) * 0.25; cy += (ty - cy) * 0.25; cursor.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)'
    requestAnimationFrame(tick)
  }
  tick()
})()
</script>
</body>
</html>`
  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex',
    },
  })
}

export const config: Config = {
  path: '/*',
  // Files the gate page itself needs, plus link-preview images for the reel.
  excludedPath: [
    '/brand/*',
    '/favicon.ico',
    '/favicon.svg',
    '/apple-touch-icon.png',
    '/og-image.png',
    '/android-chrome-*.png',
    '/grain.png',
    '/work/dunes-and-scents/art-blur.webp',
    '/work/fit-and-flex/art-blur.webp',
    '/work/little-anna/art-blur.webp',
    '/work/wall-canvas/art-blur.webp',
    '/work/go-green-mowing/art-blur.webp',
  ],
}
