# AVRA — Growth that flows.

Marketing site for AVRA, a boutique marketing studio in Vancouver, BC.
React 19 + Vite + TypeScript + Tailwind CSS v4 + GSAP (ScrollTrigger, SplitText, CustomEase) + Lenis + Embla Carousel.

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
| Homepage copy (slide taglines, work index names, studio strip, word wall) | `src/content/home.ts` |
| GSAP plugin registration + house eases | `src/lib/gsap.ts` |
| Preloader / custom cursor | `src/components/Preloader.tsx`, `src/components/Cursor.tsx` |
| Page transition (paper wipe) + internal links | `src/components/Transition.tsx` |
| Prerender, JSON-LD LocalBusiness schema, sitemap, robots | `scripts/prerender.mjs` |

## Before launch — replace placeholders

In `src/content/site.ts`:
- `url`: production domain (canonical, Open Graph, sitemap, schema).
- `email`, `bookingUrl` (Calendly/Cal.com), `social.instagram`, `social.linkedin`.
- Contact form: posts to `/api/contact`, a Netlify Function (`netlify/functions/contact.mts`) that emails each enquiry through **Resend**. In Netlify → Site configuration → Environment variables, set:
  - `RESEND_API_KEY`: your Resend API key (keep it secret; it is never sent to the browser)
  - `CONTACT_TO` (optional): inbox(es) for enquiries, comma-separated; defaults to `mohammadhilalmalik@gmail.com`
  - `CONTACT_FROM` (optional): sender on the verified `thinkavra.com` domain; defaults to `AVRA <hello@thinkavra.com>`

  Each enquiry sends two branded emails (templates in `netlify/lib/emails.ts`): the full enquiry to `CONTACT_TO` (reply goes to the visitor) and a confirmation to the visitor (reply goes to hello@thinkavra.com).
  Replies go straight to the person who filled in the form. To test locally, put the same values in `.env` and run `npx netlify dev` (plain `npm run dev` has no `/api`).
- `work`, `founders`: real case studies, roles, bios, photos. Bracketed text like `[Result]` is placeholder.
- `contactOptions.budgets`: your real ranges.

Brand files: the full logo kit lives in `brand-assets/AVRA-Logo-Kit` (kept out of `public/` so it isn't deployed).
The site uses copies in `public/brand/` (wordmark, paper wordmark, tagline lockup, submark) plus the kit's
favicon, app icons and Open Graph image in `public/`.

Work: every project lives in `src/content/work.ts` (copy, categories, images) and gets its own page at
`/work/<slug>`. Images are in `public/work/<slug>/`. Client logos are in `public/clients/`.

Pages: `/` home, `/work` (filterable), `/work/<slug>`, `/services`, `/about`, `/contact`. All are prerendered.

## Notes
- **Static-first.** Every route is prerendered to HTML, so the site (including the Manifesto) reads fully without JavaScript. Motion only switches on when JS runs and `prefers-reduced-motion` is not set (the `.motion-ok` class on `<html>`).
- **Reduced motion.** No hero drift (one still frame), no pinning or scrubbing, no wipes or reveals.
- **Contrast.** Small secondary text on light surfaces uses `#5F5F5B` (stone-ink). Text on the Signal hover state is white (4.6:1), because Paper on Signal is only 4.1:1.
- **Deploy.** Any static host works (Netlify, Vercel, Cloudflare Pages). `dist/contact/index.html`, `dist/contact.html` and `dist/404.html` are generated.
