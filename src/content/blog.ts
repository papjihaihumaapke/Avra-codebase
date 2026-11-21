/**
 * Blog posts. Each post renders at /blog/<slug>, is prerendered to static HTML,
 * and feeds the sitemap, RSS feed (/blog/rss.xml), llms.txt and JSON-LD.
 *
 * Writing for search and AI answers (SEO / AEO / GEO):
 *  - `summary` is the direct answer, 1–3 sentences. It is shown first and used as
 *    the meta description, so keep it under ~160 characters where possible.
 *  - Word `h2` headings as the questions people actually type.
 *  - Keep each section self-contained (roughly 130–170 words) so it can be quoted alone.
 *  - Only state facts you can back up. No invented numbers or client results.
 *
 * Inline formatting inside text: [link text](/path or https://…) and **bold**.
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string }

export type Post = {
  slug: string
  title: string
  /** Shorter <title> for search results if the headline is long (≤ ~60 chars before " | AVRA"). */
  seoTitle?: string
  summary: string
  category: 'Search & AI' | 'Websites' | 'Performance marketing' | 'Brand'
  /** ISO dates (YYYY-MM-DD). Bump `updated` whenever the content meaningfully changes. */
  published: string
  updated?: string
  takeaways: string[]
  body: Block[]
  faq?: { q: string; a: string }[]
  /** Case study slugs from src/content/work.ts shown under the post. */
  related?: string[]
  /** Share image (absolute path under /public). Falls back to the site OG image. */
  image?: string
}

export const posts: Post[] = [
  {
    slug: 'get-found-in-google-and-ai-search',
    title: 'How to get your business found in Google and AI search',
    seoTitle: 'How to get found in Google and AI search',
    summary:
      'AI answers in Google, ChatGPT and Perplexity are built on ordinary search. Be indexable, answer real questions plainly, and get other sites to mention you.',
    category: 'Search & AI',
    published: '2026-11-20',
    takeaways: [
      'There is no separate “AI index”. If Google can’t crawl and index a page, AI Overviews can’t quote it.',
      'Pages get quoted when a short passage answers one question on its own.',
      'AI tools lean on third-party sources: business profiles, directories, reviews and press.',
      'Structured data helps machines understand who you are, but it does not replace good content.',
    ],
    body: [
      { type: 'h2', text: 'Is optimizing for AI search different from SEO?' },
      {
        type: 'p',
        text: 'Mostly, no. Google’s own guidance says the best practices for appearing in AI Overviews and AI Mode are the same as for regular search: the page must be indexed and eligible to show a snippet. There is no special markup or file that unlocks AI answers. ChatGPT search and Bing Copilot draw on Bing’s index, and Perplexity runs its own crawler, so the same rule holds everywhere: if crawlers can’t reach and read your page, no AI system can cite it.',
      },
      {
        type: 'p',
        text: 'What changes is **which** pages get used. AI answers pull short passages from many sources and stitch them together, so a page that answers one question clearly, in plain words, has a better chance of being quoted than a page that hides its point under slogans.',
      },
      { type: 'h2', text: 'Step 1: Make sure search engines can read your site' },
      {
        type: 'ul',
        items: [
          '**Server-rendered HTML.** If your text only appears after JavaScript runs, some crawlers will see an empty page. Static or server-rendered pages are the safest choice.',
          '**No accidental “noindex”.** A leftover noindex tag from a coming-soon page or staging site blocks indexing completely. Check with URL Inspection in Google Search Console.',
          '**A sitemap and a robots.txt that allows crawling.** Submit the sitemap in Google Search Console and Bing Webmaster Tools.',
          '**One canonical URL per page**, so search engines don’t split signals between duplicates.',
        ],
      },
      { type: 'h2', text: 'Step 2: Answer the questions your customers actually ask' },
      {
        type: 'p',
        text: 'Write down the questions you hear on sales calls: what does it cost, how long does it take, do you work in my area, what’s included. Give each one a heading worded as that question and answer it in the first sentence underneath. Then add the detail. A self-contained answer of roughly 130 to 170 words is easy for both people and AI systems to lift and quote.',
      },
      {
        type: 'p',
        text: 'Be specific. “We build fast, conversion-focused websites” says little. “A typical small business site includes a content plan, design, development, analytics and training, and you own the site and domain at the end” answers a real question.',
      },
      { type: 'h2', text: 'Step 3: Show who is behind the business' },
      {
        type: 'p',
        text: 'Search engines and AI tools look for signs that real, accountable people stand behind a page. Put names, roles and a short background on your About page, date your articles, and link to your LinkedIn and other profiles. Case studies with concrete details (what the client needed, what you did, what happened) are some of the most quotable content a small business can publish. See our [case studies](/work) for the format we use.',
      },
      { type: 'h2', text: 'Step 4: Get mentioned on other sites' },
      {
        type: 'p',
        text: 'When someone asks an AI tool for “the best marketing studio in Vancouver”, the answer is usually built from directories, review sites, local press and discussion forums, not from the businesses’ own websites. That makes off-site presence the biggest lever for most small businesses:',
      },
      {
        type: 'ol',
        items: [
          'Create and complete a **Google Business Profile** with accurate categories, hours, service area and photos.',
          'Keep your name, address and phone number identical everywhere they appear.',
          'List the business in the directories your industry uses, and ask happy clients for reviews there.',
          'Add a credit link (“Website by …”) on client sites you built, where the client agrees.',
          'Contribute useful answers in communities your customers already use.',
        ],
      },
      { type: 'h2', text: 'Step 5: Add structured data' },
      {
        type: 'p',
        text: 'Structured data (JSON-LD using Schema.org) tells machines, in a fixed format, what a page is about: your business name, location, services, articles and authors. It doesn’t guarantee a rich result or an AI citation, but it removes guesswork. At minimum, mark up your organization, your services, your articles and your breadcrumbs, and make sure the markup matches what’s visible on the page.',
      },
      { type: 'h2', text: 'Does llms.txt help?' },
      {
        type: 'p',
        text: 'An llms.txt file is a plain-text summary of your site for AI tools. Google has said it doesn’t use it, and it isn’t a ranking factor anywhere we know of. It’s harmless and quick to add, so we include one on the sites we build, but treat it as a nice extra, not a strategy.',
      },
    ],
    faq: [
      {
        q: 'How long does it take to show up in AI answers?',
        a: 'There is no fixed timeline. A page first has to be crawled and indexed, which can take days to weeks for a new site. Being cited in AI answers usually follows ranking well and being mentioned by other sites, which takes months of steady work.',
      },
      {
        q: 'Should I block AI crawlers?',
        a: 'If you want to appear in AI search, no. Crawlers like OAI-SearchBot, PerplexityBot and Googlebot need access to cite you. Some businesses choose to block crawlers used only for model training, which is a separate decision from search visibility.',
      },
      {
        q: 'Do I need FAQ schema to appear in AI answers?',
        a: 'No. Google limits FAQ rich results to a small set of authoritative sites, and AI systems read the visible text. Clear question headings with direct answers matter more than the markup.',
      },
    ],
    related: ['alps-annie-ling'],
  },

  {
    slug: 'small-business-website-launch-checklist',
    title: 'What a small business website needs before it launches',
    seoTitle: 'Small business website launch checklist',
    summary:
      'Before launch, a small business site needs clear answers above the fold, fast mobile pages, working forms and tracking, basic SEO, and an owner who can edit it.',
    category: 'Websites',
    published: '2026-11-20',
    takeaways: [
      'Visitors should know what you do, where, and how to contact you within a few seconds.',
      'Test every form and phone link on a real phone before launch.',
      'Set up analytics and conversion tracking on day one, or you lose the data for good.',
      'You should own the domain, the hosting account and the content.',
    ],
    body: [
      { type: 'h2', text: 'What should the homepage say first?' },
      {
        type: 'p',
        text: 'The top of the homepage has one job: tell a stranger what you do, who it’s for, where you work and what to do next. A headline that states your service and location, one supporting sentence and a single clear action (“Book a call”, “Get a quote”) beat a clever slogan every time. Keep the phone number and booking link easy to find on mobile, where most local searches happen.',
      },
      { type: 'h2', text: 'How fast does a small business website need to be?' },
      {
        type: 'p',
        text: 'Google measures real-world speed with Core Web Vitals. The targets for a “good” score are: the main content loads within **2.5 seconds** (Largest Contentful Paint), the page responds to taps within **200 milliseconds** (Interaction to Next Paint), and the layout doesn’t jump around (Cumulative Layout Shift under **0.1**). The usual fixes are compressed images in modern formats like WebP, fewer third-party scripts, and fonts that load without blocking the page.',
      },
      { type: 'h2', text: 'The pre-launch checklist' },
      { type: 'h3', text: 'Content' },
      {
        type: 'ul',
        items: [
          'Each service has its own section or page that says what’s included, who it suits and how to start.',
          'Real photos and real names where you can. Stock photos rarely build trust.',
          'Contact details, service area and hours match your Google Business Profile exactly.',
          'Privacy policy in place if you collect any personal information, including through forms.',
        ],
      },
      { type: 'h3', text: 'Technical SEO' },
      {
        type: 'ul',
        items: [
          'A unique title and meta description on every page.',
          'One H1 per page, with H2s that read like a table of contents.',
          'Descriptive alt text on meaningful images.',
          'No “noindex” left over from staging, a sitemap submitted to Google Search Console, and redirects from any old URLs.',
          'Structured data for your business, services and articles.',
        ],
      },
      { type: 'h3', text: 'Forms and tracking' },
      {
        type: 'ul',
        items: [
          'Submit every form yourself and confirm the email arrives, including on mobile.',
          'Analytics installed, with form submissions, calls and bookings tracked as conversions.',
          'If you plan to run ads, the Meta Pixel and Google tag are installed before the first campaign.',
        ],
      },
      { type: 'h3', text: 'Accessibility' },
      {
        type: 'ul',
        items: [
          'Text contrast is readable and the site works with a keyboard alone.',
          'Motion respects the visitor’s “reduce motion” setting.',
          'Form fields have visible labels and clear error messages.',
        ],
      },
      { type: 'h2', text: 'Who should own the website?' },
      {
        type: 'p',
        text: 'You should. Register the domain in your business’s name, keep the hosting and analytics accounts under your own login, and give your designer or agency access rather than the other way around. Ask for the source files and a short handover so you or someone else can make changes later. When we built [ALPS by Annie Ling](/work/alps-annie-ling), that meant a custom admin panel the founder runs herself.',
      },
      { type: 'h2', text: 'What happens after launch?' },
      {
        type: 'p',
        text: 'A website is never finished. In the first month, check Search Console for indexing errors, watch which pages visitors land on, and fix anything that confuses people. After that, add content that answers new customer questions, such as case studies and short guides, so the site keeps earning search traffic.',
      },
    ],
    faq: [
      {
        q: 'Do I need a custom website or is a template enough?',
        a: 'A good template is enough for many small businesses. A custom build makes sense when you need specific features, such as a custom admin panel, unusual booking flows or integrations, or when the brand needs to stand apart.',
      },
      {
        q: 'How many pages does a small business website need?',
        a: 'Usually a homepage, one page per main service, an about page, a contact page and a place for case studies or articles. More pages only help if each one answers a distinct question.',
      },
      {
        q: 'Can I edit the website myself after launch?',
        a: 'You should be able to. Agree on how content will be edited before the build starts, and ask for a short training session at handover.',
      },
    ],
    related: ['alps-annie-ling', 'go-green-mowing', 'little-anna'],
  },

  {
    slug: 'meta-ads-for-local-businesses',
    title: 'Meta ads for local businesses: a plain-language setup guide',
    seoTitle: 'Meta ads for local businesses: setup guide',
    summary:
      'Track real leads first, pick one clear objective, give campaigns enough budget to learn, test creative rather than audiences, and judge results by cost per lead.',
    category: 'Performance marketing',
    published: '2026-11-20',
    takeaways: [
      'Without the Meta Pixel and Conversions API, Meta optimizes for the wrong thing.',
      'Choose the objective that matches the action you want: leads, bookings or sales.',
      'Creative is now the main targeting lever. Test several ad ideas, not dozens of audiences.',
      'Judge campaigns on cost per lead and lead quality, not likes or reach.',
    ],
    body: [
      { type: 'h2', text: 'Are Meta ads worth it for a local business?' },
      {
        type: 'p',
        text: 'They can be, when the offer is clear and you can measure what happens after the click. Facebook and Instagram are good at putting a service in front of nearby people who weren’t searching for it yet, which suits businesses like restaurants, salons, home services and local retail. They work less well when the offer is vague, the landing page is slow, or nobody follows up on the leads.',
      },
      { type: 'h2', text: 'What do you need before the first campaign?' },
      {
        type: 'ol',
        items: [
          '**A Business Manager (Meta Business Suite) you own**, with your Facebook Page and Instagram account connected.',
          '**The Meta Pixel on your website**, plus the Conversions API so events still reach Meta when browsers block tracking.',
          '**A defined conversion**: a form submission, booking, call or purchase. Set it up as a standard event and test that it fires.',
          '**A landing page that matches the ad.** If the ad promises a price or offer, the page should show it straight away.',
        ],
      },
      { type: 'h2', text: 'Which campaign objective should you choose?' },
      {
        type: 'p',
        text: 'Pick the objective that matches the action you want, because Meta will find people likely to take exactly that action. Use **Leads** for enquiries (either an instant form inside Facebook or your website form), **Sales** for online purchases, and **Engagement** only if you truly want messages or interactions. Reach and traffic objectives are cheap per impression but often bring visitors who don’t convert.',
      },
      { type: 'h2', text: 'How should you target a local audience?' },
      {
        type: 'p',
        text: 'Set a location radius around where you actually serve, then keep targeting broad and let the algorithm work. Meta’s delivery system now relies heavily on the ad itself to find the right people, so the words and images do much of the targeting. Narrow interest stacks tend to raise costs without improving results. If your business is in housing, employment, credit or social issues, Meta requires a Special Ad Category, which limits targeting options.',
      },
      { type: 'h2', text: 'What makes a good local ad?' },
      {
        type: 'ul',
        items: [
          'A hook in the first line or first second of video that names the customer’s problem.',
          'A clear offer and a reason to act now.',
          'Real photos or short videos of your work, team or product, made for vertical placements.',
          'Proof: a review, a before-and-after, or a recognizable local detail.',
          'If you serve more than one language community, ads written natively in each language rather than translated word for word.',
        ],
      },
      {
        type: 'p',
        text: 'For [Fit & Flex](/work/fit-and-flex), a brand new to its market, that meant bilingual Arabic and English creative where every ad had to introduce the brand and sell the product at the same time.',
      },
      { type: 'h2', text: 'How much budget does a campaign need?' },
      {
        type: 'p',
        text: 'Each ad set goes through a learning phase. Meta’s guidance is that delivery stabilizes after about **50 optimization events in a week**. If your budget can’t produce that many leads, combine ad sets, optimize for an earlier step, or accept slower learning. Avoid editing a campaign every day, because significant changes restart learning.',
      },
      { type: 'h2', text: 'How do you know if it’s working?' },
      {
        type: 'p',
        text: 'Track cost per lead, the share of leads that become customers, and revenue per customer. Those three numbers tell you what a lead is worth and how much you can afford to pay for one. Review weekly, change one thing at a time, and write down what you tested so you don’t repeat it. A plain monthly report should say what ran, what it cost, what it brought in and what changes next.',
      },
    ],
    faq: [
      {
        q: 'Should I boost posts or use Ads Manager?',
        a: 'Use Ads Manager for anything you want to measure as leads or sales. Boosting is quick, but it offers fewer objectives and less control over optimization and tracking.',
      },
      {
        q: 'Are instant forms or website forms better?',
        a: 'Instant forms usually bring more leads at a lower cost, but the leads can be lower intent. Website forms bring fewer, often better-qualified leads. Test both, and follow up on instant-form leads quickly.',
      },
      {
        q: 'How long should I run a test before judging it?',
        a: 'Long enough to exit the learning phase and gather a meaningful number of leads, typically at least one to two weeks for a local budget. Judging after a day or two usually leads to wrong decisions.',
      },
    ],
    related: ['fit-and-flex', 'social-creative'],
  },
]

/** Newest first. */
export const sortedPosts = [...posts].sort((a, b) => (a.published < b.published ? 1 : -1))

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug)

export const postModified = (p: Post) => p.updated ?? p.published

/** Stable anchor id for a heading. */
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/\*\*|\[|\]\([^)]*\)/g, '')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const words = (p: Post) =>
  [p.summary, ...p.takeaways, ...p.body.flatMap((b) => ('items' in b ? b.items : [b.text])), ...(p.faq ?? []).flatMap((f) => [f.q, f.a])]
    .join(' ')
    .split(/\s+/).length

export const wordCount = words
/** Minutes at ~230 words per minute. */
export const readingTime = (p: Post) => Math.max(1, Math.round(words(p) / 230))

/** Plain text (no inline markup) for meta tags, schema and feeds. */
export const plain = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '')

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
