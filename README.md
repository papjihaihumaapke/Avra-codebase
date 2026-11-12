# AVRA — Growth that flows.

Marketing site for AVRA, a boutique marketing studio in Vancouver, BC.
React 19 + Vite + TypeScript + Tailwind CSS v4 + GSAP (ScrollTrigger) + Three.js (lazy-loaded hero).

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # typecheck → client build → SSR build → static prerender into dist/
npm run preview   # serve dist/
```

## Where things live

| What | File |
| --- | --- |
| **Design tokens** (colour, type, spacing, radius, motion) | `src/styles/tokens.css` |
| Copy, links, placeholders, config | `src/content/site.ts` |
| Global styles, reveal system, manifesto, stair line, grain/light bands | `src/index.css` |
| Hero 3D scene (floating staircase, low sun, drifting camera) | `src/sections/HeroScene.ts` |
| Kinetic manifesto (GSAP ScrollTrigger) | `src/sections/Manifesto.tsx` |
| Page transition (paper wipe) + internal links | `src/components/Transition.tsx` |
| Prerender, JSON-LD LocalBusiness schema, sitemap, robots | `scripts/prerender.mjs` |

## Before launch — replace placeholders

In `src/content/site.ts`:
- `url`: production domain (canonical, Open Graph, sitemap, schema).
- `email`, `bookingUrl` (Calendly/Cal.com), `social.instagram`, `social.linkedin`.
- `formEndpoint`: the contact form POSTs JSON here (Formspree, Basin, your API). **Until it is set, submissions show the success message but are not sent anywhere** (a console warning says so).
- `heroVideo.mp4` / `webm` / `poster`: set these to use the brand reel instead of the Three.js scene (put files in `public/media/`, compress to roughly 2–4 MB, no audio track).
- `work`, `founders`: real case studies, roles, bios, photos. Bracketed text like `[Result]` is placeholder.
- `contactOptions.budgets`: your real ranges.

Brand files: the full logo kit lives in `brand-assets/AVRA-Logo-Kit` (kept out of `public/` so it isn't deployed).
The site uses copies in `public/brand/` (wordmark, paper wordmark, tagline lockup, submark) plus the kit's
favicon, app icons and Open Graph image in `public/`.

Work images are in `public/work/`, client logos in `public/clients/`, team photos in `public/team/`.

## Notes
- **Static-first.** Every route is prerendered to HTML, so the site (including the Manifesto) reads fully without JavaScript. Motion only switches on when JS runs and `prefers-reduced-motion` is not set (the `.motion-ok` class on `<html>`).
- **Reduced motion.** No hero drift (one still frame), no pinning or scrubbing, no wipes or reveals.
- **Contrast.** Small secondary text on light surfaces uses `#5F5F5B` (stone-ink). Text on the Signal hover state is white (4.6:1), because Paper on Signal is only 4.1:1.
- **Deploy.** Any static host works (Netlify, Vercel, Cloudflare Pages). `dist/contact/index.html`, `dist/contact.html` and `dist/404.html` are generated.
