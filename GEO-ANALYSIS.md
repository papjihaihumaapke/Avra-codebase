# GEO Analysis — thinkavra.com

Audited 17 Nov 2026 against the live site (Netlify, commit `dddf5fe`). Pages fetched as a crawler sees them (no JavaScript): `/`, `/work`, `/services`, `/about`, `/contact`, `/work/fit-and-flex`, `/work/alps-annie-ling`, `/work/sitetask`.

> Framing: Google's AI optimization guide says optimizing for AI Overviews and AI Mode **is still SEO**. There is no separate AI index; a page must be indexed and snippet-eligible first. Everything below is SEO fundamentals applied to AI answers, not a separate discipline.

Not verified: indexing status, rankings and AI citations. That needs Google Search Console access (not connected).

---

## 1. GEO Readiness Score: **52 / 100**

| Area | Weight | Score | Weighted | Why |
|---|---|---|---|---|
| Citability | 25% | 45 | 11.3 | Case studies are specific and factual; core pages are short (107–319 words) and lead with slogans, not answers |
| Structural readability | 20% | 60 | 12.0 | Clean H1→H2→H3, lists, one table. Heading text extracts with words joined ("Selectedwork"). No question headings or FAQ |
| Multi-modal | 15% | 70 | 10.5 | Strong imagery with descriptive alt text on every case study. No video |
| Authority & brand | 20% | 15 | 3.0 | No named people, no dates, `sameAs` empty, no third-party mentions found |
| Technical accessibility | 20% | 80 | 16.0 | Fully prerendered HTML, all crawlers allowed, sitemap, canonicals. Schema only on the homepage |
| **Total** | | | **52.8** | |

## 2. Platform breakdown

| Platform | Score | Main blocker |
|---|---|---|
| Google AI Overviews | 45 | Cites pages that already rank. A new domain with thin service pages and no reviews will rank poorly for "Vancouver marketing agency" type queries |
| Google AI Mode | 40 | Wider citation pool, but leans on entity signals: business profile, reviews, consistent mentions. AVRA has none yet |
| ChatGPT search | 25 | Leans on Wikipedia, directories and review sites. A web search for "thinkavra" / "AVRA marketing studio Vancouver" returns only competitor directory listings (Clutch, DesignRush, Semrush) |
| Perplexity | 20 | Leans heavily on Reddit and community discussion. No presence |
| Bing Copilot | 35 | Uses Bing's index. Not verified in Bing Webmaster Tools; no IndexNow |

## 3. AI crawler access

`robots.txt` is `User-agent: * / Allow: /` with the sitemap declared.

| Crawler | Status |
|---|---|
| GPTBot, OAI-SearchBot, ChatGPT-User | Allowed |
| ClaudeBot, anthropic-ai | Allowed |
| PerplexityBot | Allowed |
| Google-Extended, Googlebot | Allowed |
| CCBot, Bytespider, cohere-ai (training) | Allowed |

Nothing to fix for visibility. If you'd rather keep the site out of model training while staying in AI search, add:

```
User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /
```

## 4. llms.txt

Missing (`/llms.txt` returns 404 with the site's 404 page). Google says it is not needed, and server-log studies show major AI crawlers rarely request it, so **it carries no ranking weight here**. It is harmless and takes two minutes, so a ready file is in §10.

## 5. Brand mention analysis

| Source | Presence |
|---|---|
| Wikipedia / Wikidata | None (not realistic yet; needs independent press coverage) |
| Google Business Profile | Not found |
| LinkedIn company page | ✅ [think-avra](https://www.linkedin.com/company/think-avra), linked in footer and `sameAs` (added 18 Nov) |
| Instagram | ✅ [@think.avra](https://www.instagram.com/think.avra/), linked in footer and `sameAs` (added 18 Nov) |
| Clutch / DesignRush / agency directories | Not listed. These are exactly the pages AI answers cite for "best marketing agency in Vancouver" |
| Reddit / YouTube | None |
| Client sites crediting AVRA | Not checked; worth adding "Site by AVRA" footer links on annieling.com, gogreenmowing.ca, etc. |

This is the biggest gap. AI answers about agencies are built from third-party sources, and right now no third party says AVRA exists.

## 6. Passage-level citability

AI systems quote self-contained passages of roughly 130–170 words that answer one question. Where the site stands:

**Already citable (keep):**
- `/work/alps-annie-ling`, "The problem" and "How we helped" — specific, factual, self-contained (899-word page, timeline table).
- `/work/fit-and-flex`, "Built for quick commerce" — a clear explanation of noon Minutes plus a concrete list of what changed.
- `/work/sitetask`, "The problem" — concrete numbers (11 stations, two managers, 5 and 6 sites).

**Not citable (rewrite):**
- Homepage: "Small studio. Senior craft. Real growth." is a slogan. The only sentence that says *what AVRA is* ("AVRA is a marketing studio in Vancouver, BC.") is hidden screen-reader text inside the H1.
- `/services`: each service is a one-line summary. There is no passage that answers "what does a website project with AVRA include, how long does it take, who is it for".
- `/about`: no names, no founding year, no team size, no story of who does the work, although the whole pitch is "the people you actually talk to".
- `/contact` (107 words): no hours, response time or service area statement.

## 7. Server-side rendering check

**Pass.** All 28 routes are prerendered to static HTML (`scripts/prerender.mjs`), so every heading, paragraph, list and image alt is in the HTML a crawler receives. Motion runs on top of that markup and never hides it from crawlers.

**Two markup bugs affect how that text reads when extracted:**

1. **Multi-line headings lose their spaces.** `PageHeader` renders each line as `<span class="block">Selected</span><span class="block">work</span>`, so the text is "Selectedwork". Same for `<br/>`-split titles ("Ready to grow<br/>without the noise?" → "growwithout"). Affects the H1 on every inner page and the CTA H2 on every page.
2. **Slider titles are spelled out letter by letter.** Each homepage slide's `<h3>` is built from one span per character, with the real name in an `aria-label` on a plain `<span>`. Many parsers ignore that, so "Little Anna" extracts as "LittleAnna".

Fix: add a space between line spans (`{' '}`) and before every `<br/>`, and replace the slide `aria-label` with a visually hidden text copy of the title (`<span class="sr-only">Little Anna</span>` next to an `aria-hidden` animated copy).

## 8. Top 5 highest-impact changes

1. **Get AVRA mentioned off-site (highest impact, ongoing).** Create a Google Business Profile (Vancouver, service-area business), a LinkedIn company page and an Instagram, and fill `site.social` so `sameAs` is populated. List on Clutch and DesignRush and ask ALPS, Go Green and Little Anna for reviews there. Add a "Website by AVRA" credit link on client sites you built.
2. **Put names on the work (Google's "Who" test).** Add the founder's name, photo, background and LinkedIn to `/about`, with a short "who does what" for anyone else on the team. Mark it up as `Person` (`worksFor` → AVRA). For a studio that sells "senior hands on every job", anonymous is the weakest possible signal.
3. **Fix the heading text bugs in §7.** About 15 minutes of work. It makes every H1 and CTA read correctly to crawlers and screen readers.
4. **Make `/services` answer real questions.** For each service, add one 130–170-word block: what's included, typical timeline, who it suits, and a proof link to the matching case study. Then add a short FAQ of questions clients actually ask (cost range, timelines, whether you work outside Vancouver, who owns the site after launch). Plain HTML; skip FAQ schema, since Google limits FAQ rich results to authority sites.
5. **Structured data on every page, plus dates.** Today only the homepage has schema. Add `Organization` to all pages, a `CreativeWork` per case study (name, description, image, `creator` → AVRA, `about` → client, `dateModified`), `Service` items on `/services`, and `BreadcrumbList` on case studies. Add `<lastmod>` to the sitemap so AI Mode's freshness signals have something to read.

## 9. Schema recommendations

Generate these in `scripts/prerender.mjs`, where the current homepage schema is built.

**Every page** — the existing `ProfessionalService`, plus:
```json
"sameAs": ["https://www.instagram.com/<handle>", "https://www.linkedin.com/company/<handle>"],
"founder": { "@type": "Person", "name": "<Founder name>", "url": "https://thinkavra.com/about" },
"foundingDate": "<YYYY>",
"priceRange": "$$"
```

**Case studies (`/work/:slug`):**
```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Fit & Flex",
  "headline": "Bilingual launch creative and a quick-commerce ads strategy for a granola brand arriving in Saudi Arabia",
  "url": "https://thinkavra.com/work/fit-and-flex",
  "image": "https://thinkavra.com/work/fit-and-flex/art.webp",
  "creator": { "@id": "https://thinkavra.com/#business" },
  "about": { "@type": "Organization", "name": "Fit & Flex" },
  "dateModified": "2026-11-17"
}
```
Plus `BreadcrumbList`: Home → Work → project.

**`/services`:** an `OfferCatalog` on the business, with one `Service` per offering (Brand, Websites, Performance marketing), each with `areaServed` Vancouver / British Columbia.

**`/about`:** `AboutPage` with the founder as a `Person` (`jobTitle`, `sameAs` → LinkedIn).

## 10. Content reformatting suggestions

**Homepage, under the hero:** add one visible plain-language paragraph, the answer AI should quote when asked "what is AVRA":

> AVRA is a marketing studio in Vancouver, British Columbia, for small and mid-size businesses. We do three things: brand identity, websites and e-commerce, and performance marketing (paid social, search and reporting). The people who plan your project are the people who make it. Recent work includes an e-commerce site and custom admin panel for fashion label ALPS by Annie Ling, a rebrand for Little Anna bakery, and launch ads and a noon Minutes ads strategy for Fit & Flex in Saudi Arabia.

**`/about`:** replace the anonymous studio intro with a 130–170-word founder block: name, background, how long they've been doing this, what they personally do on projects, where they're based, and a link to LinkedIn. *(Needs your real details; nothing here should be invented.)*

**`/services`, each service:** replace the one-liner with a block shaped like this (Websites example; fill in your real numbers):

> **What's in a website project?** Discovery and content plan, design in Figma, build (custom React or Shopify, depending on what you need to edit yourself), launch, and training so you can run it. Most small business sites take <X–Y> weeks. You own the site and the domain. Example: ALPS by Annie Ling, an e-commerce store selling in Canada and Hong Kong with an admin panel the founder runs herself.

**Question headings:** where a section answers a real question, word the heading as that question ("How long does a website take?", "What does performance marketing include?"), not as a slogan ("Three ways we help you grow").

**Case studies, "Where it stands" / "Outcome":** when results exist, lead with the number and the period ("Return on ad spend rose from X to Y between November and December 2026") and the source of the figure. These are the most quotable sentences on the site. Get client approval before publishing spend or revenue.

### Optional: `/public/llms.txt`

```
# AVRA
> A marketing studio in Vancouver, BC. Brand identity, websites and performance marketing for small and mid-size businesses.

## Main pages
- [Services](https://thinkavra.com/services): Brand, websites and performance marketing
- [Work](https://thinkavra.com/work): Case studies
- [About](https://thinkavra.com/about): The studio and how we work
- [Contact](https://thinkavra.com/contact): hello@thinkavra.com, book a 30-minute call

## Case studies
- [Fit & Flex](https://thinkavra.com/work/fit-and-flex): Bilingual launch ads and a noon Minutes ads strategy, Saudi Arabia
- [ALPS by Annie Ling](https://thinkavra.com/work/alps-annie-ling): E-commerce site and custom admin panel for a fashion label
- [Little Anna](https://thinkavra.com/work/little-anna): Bakery rebrand, packaging and website
- [Go Green Mowing](https://thinkavra.com/work/go-green-mowing): Website and mascot logo for a lawn care company
- [SiteTask](https://thinkavra.com/work/sitetask): Task app for an 11-station fuel retailer
- [Tuniff](https://thinkavra.com/work/tuniff): AI hairstyle try-on app, end-to-end UX
```
