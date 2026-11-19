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

function page(next: string, wrong: boolean) {
  const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
  const html = `<!doctype html>
<html lang="en-CA">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>AVRA — Coming soon</title>
<meta name="description" content="AVRA, a marketing studio in Vancouver, BC. Brand, websites and performance marketing. Launching 19 November 2026." />
<meta name="robots" content="noindex" />
<meta name="theme-color" content="#111111" />
<link rel="icon" href="/favicon.ico" sizes="48x48" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="AVRA" />
<meta property="og:title" content="AVRA — Coming soon" />
<meta property="og:description" content="A Vancouver marketing studio for brands ready to rise. Launching 19 November 2026." />
<meta property="og:url" content="https://thinkavra.com/" />
<meta property="og:image" content="https://thinkavra.com/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;800&family=Instrument+Serif:ital@1&family=Geist+Mono&display=swap" rel="stylesheet" />
<style>
  :root { --ink: #111; --paper: #f2f1ee; --signal: #d9372b; --muted: rgb(242 241 238 / 0.55); --gutter: clamp(1rem, 4vw, 3.5rem); }
  * { box-sizing: border-box; margin: 0; }
  html, body { height: 100%; }
  body {
    min-height: 100svh; display: grid; grid-template-rows: auto 1fr auto; gap: 2rem;
    padding: calc(var(--gutter) * 0.75) var(--gutter); background: var(--ink); color: var(--paper);
    font-family: 'Inter Tight', system-ui, sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden;
  }
  body::before {
    content: ''; position: fixed; inset: -20%; z-index: -1; pointer-events: none;
    background: radial-gradient(40% 35% at 70% 30%, rgb(217 55 43 / 0.28), transparent 70%),
                radial-gradient(45% 40% at 20% 80%, rgb(242 241 238 / 0.07), transparent 70%);
    animation: drift 18s ease-in-out infinite alternate;
  }
  @keyframes drift { to { transform: translate3d(-6%, 4%, 0) scale(1.08); } }
  .label { font-family: 'Geist Mono', ui-monospace, monospace; font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; }
  header { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
  header img { height: clamp(1.25rem, 2.4vw, 1.75rem); width: auto; display: block; }
  .live { display: inline-flex; align-items: center; gap: 0.6rem; color: var(--muted); }
  .live::before { content: ''; width: 0.5rem; height: 0.5rem; border-radius: 50%; background: var(--signal); animation: pulse 1.6s ease-in-out infinite; }
  @keyframes pulse { 50% { opacity: 0.25; transform: scale(0.7); } }
  main { align-self: center; }
  h1 {
    font-weight: 800; text-transform: uppercase; letter-spacing: -0.045em; line-height: 0.84;
    font-size: clamp(4rem, 17vw, 17rem); color: rgb(252 236 232 / 0.96);
  }
  h1 span { display: block; }
  h1 span:last-child { color: var(--signal); }
  .line { margin-top: clamp(1.25rem, 3vw, 2.25rem); font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-size: clamp(1.6rem, 3.6vw, 3.25rem); line-height: 1.05; max-width: 22ch; }
  .meta { margin-top: 1.5rem; color: var(--muted); }
  footer { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: end; gap: 1.5rem; }
  footer a { color: var(--paper); text-decoration: none; border-bottom: 1px solid rgb(242 241 238 / 0.35); padding-bottom: 2px; }
  footer a:hover { color: var(--signal); border-color: var(--signal); }
  form { display: flex; align-items: center; gap: 0.5rem; }
  input {
    width: 11rem; padding: 0.55rem 0.9rem; border-radius: 999px; border: 1px solid rgb(242 241 238 / 0.3);
    background: transparent; color: var(--paper); font: inherit; font-size: 0.875rem;
  }
  input::placeholder { color: rgb(242 241 238 / 0.4); }
  input:focus { outline: none; border-color: var(--paper); }
  button {
    padding: 0.55rem 1rem; border-radius: 999px; border: 0; background: var(--paper); color: var(--ink);
    font: inherit; font-size: 0.8125rem; font-weight: 800; text-transform: uppercase; letter-spacing: -0.01em; cursor: pointer;
  }
  button:hover { background: var(--signal); color: var(--paper); }
  .err { color: var(--signal); }
  .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
  @media (prefers-reduced-motion: reduce) { body::before, .live::before { animation: none; } }
</style>
</head>
<body>
  <header>
    <img src="/brand/avra-wordmark-paper.svg" alt="AVRA" width="542" height="138" />
    <span class="label live">Launching 19.11.2026</span>
  </header>
  <main>
    <h1><span>Coming</span><span>soon</span></h1>
    <p class="line">Growth that flows, without noise.</p>
    <p class="label meta">Marketing studio · Vancouver, BC · Brand · Websites · Performance</p>
  </main>
  <footer>
    <p class="label"><a href="mailto:hello@thinkavra.com">hello@thinkavra.com</a></p>
    <form method="post" action="/__unlock">
      <input type="hidden" name="next" value="${esc(next)}" />
      <label class="sr" for="pw">Team password</label>
      ${wrong ? '<span class="label err" role="alert">Wrong password</span>' : ''}
      <input id="pw" name="password" type="password" placeholder="Team access" autocomplete="current-password" required />
      <button type="submit">Enter</button>
    </form>
  </footer>
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
  excludedPath: ['/brand/*', '/favicon.ico', '/favicon.svg', '/apple-touch-icon.png', '/og-image.png', '/android-chrome-*.png'],
}
