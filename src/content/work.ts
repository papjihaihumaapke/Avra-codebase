/**
 * Portfolio. Images live in /public/work/<slug>/.
 * Client work only.
 * Results are only stated where they are documented. Nothing here is invented.
 */

export type Img = { src: string; w: number; h: number; alt: string }
export type Section = {
  heading: string
  body: string[]
  list?: string[]
  groups?: { title: string; items: string[] }[]
  table?: { head: string[]; rows: string[][] }
  images?: Img[]
}
export type Category = 'Websites' | 'Brand identity' | 'Social & ads' | 'Product & UX'

export type Project = {
  slug: string
  title: string
  client: string
  category: Category
  type: 'Client' | 'Concept'
  summary: string
  services: string
  year?: string
  tools?: string
  status?: string
  url?: string
  /** Overrides the auto-generated facts row on the project page. */
  facts?: { k: string; v: string }[]
  cover: Img
  sections: Section[]
  gallery?: Img[]
  featured?: boolean
}

const img = (slug: string, file: string, w: number, h: number, alt: string): Img => ({
  src: `/work/${slug}/${file}.webp`,
  w,
  h,
  alt,
})
const sq = (slug: string, file: string, alt: string) => img(slug, file, 512, 512, alt)

export const categories: Category[] = ['Websites', 'Brand identity', 'Social & ads', 'Product & UX']

export const projects: Project[] = [
  /* ------------------------------------------------------------------ Websites */
  {
    slug: 'alps-annie-ling',
    title: 'ALPS by Annie Ling',
    client: 'ALPS, an independent fashion label by designer Annie Ling',
    category: 'Websites',
    type: 'Client',
    featured: true,
    summary:
      'E-commerce website design and development for a designer fashion label selling in Canada and Hong Kong, with a custom admin panel the founder runs herself.',
    services: 'Web design · E-commerce · Custom CMS',
    url: 'https://annieling.com',
    facts: [
      { k: 'Client', v: 'ALPS, an independent fashion label by designer Annie Ling' },
      { k: 'Services', v: 'Web design, e-commerce development, custom admin panel (CMS), content structure, client training' },
      { k: 'Markets', v: 'Canada and Hong Kong' },
      { k: 'Timeline', v: 'June to November 2026' },
    ],
    cover: img('alps-annie-ling', 'cover', 1600, 804, 'ALPS website: the designer page with Annie Ling’s story beside a black-and-white portrait'),
    sections: [
      {
        heading: 'The brand',
        body: [
          'ALPS is a designer fashion label built around innovation. Its fabrics and finishes come with technical benefits, and every piece shows them.',
          'The range covers five worlds: Innovation, Contemporary, Accessories, Collaborations (including a collection with The Little Prince) and Vegan Skin & Personal Care. Annie has spent her career working with international brands, and she wanted a site that tells her story as a designer as well as selling her work.',
        ],
      },
      {
        heading: 'The problem',
        body: [
          'ALPS had a catalogue that a standard store template could not handle. Each style carries a lot of detail: a style description, design features, composition, care instructions, sizes, colours, a set of technology icons and sometimes a video. On top of that, the brand sells in two countries with different stock and tax rules.',
          'Annie also needed to run the site herself. She wanted to add products, publish her own stories and set up new brand collaborations without calling a developer each time. And there was a hard deadline: the site had to be live before her November market booth and the holiday shopping season.',
        ],
      },
      {
        heading: 'How we helped',
        body: [
          'We designed and built a custom e-commerce site and a simple admin panel around the way Annie already works.',
          'Her product information lives in spreadsheets and Google Drive folders, so we shaped the site’s data to match those files instead of making her learn a new system. Over regular video calls we walked her through each part of the admin and kept refining it from her feedback until she could manage the site on her own.',
        ],
      },
      {
        heading: 'What we did',
        body: [],
        groups: [
          {
            title: 'Storefront and product experience',
            items: [
              'A landing page leading into five product categories, each with its own filters',
              'Filters by season (all season, spring/summer, fall/winter), by who it’s for (women, men, unisex, kids) and by garment type (overcoats and jackets, tops, skirts, shorts, pants, one-pieces)',
              'Product pages with a clear layout: photos, style name and price on one side, with buying options and details on the other',
              'Colour dots that switch the gallery to show only that colour’s photos',
              'Technology icons on each style that open a popup explaining the innovation behind it',
              'Image galleries with arrows, consistent frame sizes and hover-to-zoom, plus up to two videos per product',
              'Bigger, easier-to-read text across the site',
            ],
          },
          {
            title: 'Commerce',
            items: [
              'Cart and checkout with Stripe payments',
              'Shipping estimates based on each product’s weight',
              'Separate tax rules for Canada and Hong Kong',
              'Promo codes, plus a pre-order and membership signup with a customer list that exports to Excel',
            ],
          },
          {
            title: 'Admin panel built for the owner',
            items: [
              'Add and edit products with stock for each colour and size, tracked separately for Hong Kong and Canada',
              'Quick size presets (0/1/2/3, XS to L, one size), and sizes, tags and hashtags can be pasted in the same format as her own files',
              'A “collection” field that mirrors her Google Drive folders, so she can filter products by season and collection',
              'Several photos per colour, with each one removable on its own',
            ],
          },
          {
            title: 'Brand storytelling',
            items: [
              'Design Path: a blog-style timeline of Annie’s journey as a designer. Each post can hold several photos, and the newest post shows first.',
              'Milestones: her writing at the top, with awards and press links below, plus room for moments like shop openings, so it reads as a story rather than a trophy shelf.',
              'The Science Behind: an editorial section in Personal Care for sharing skincare technology news, with no prices or buy buttons.',
              'Collaborations: each partner brand gets its own clickable circle that shows only that brand’s pieces. A new partner can be added from the admin and appears on the page automatically.',
            ],
          },
        ],
        images: [
          img('alps-annie-ling', 'site-desktop', 1440, 900, 'ALPS product page for a water-repellent hooded windbreaker'),
        ],
      },
      {
        heading: 'Project timeline',
        body: [],
        table: {
          head: ['Phase', 'When', 'What happened'],
          rows: [
            ['Discovery and scope', 'June 2026', 'Mapped the catalogue, the five categories, the two-market rules and the admin needs'],
            ['Core build', 'June to August', 'Storefront, product pages, cart, checkout, Stripe payments and the first admin panel'],
            ['Storytelling sections', 'August to September', 'Built Design Path and Milestones, renamed sections with Annie and trained her on publishing'],
            ['Catalogue and product pages', 'September to October', 'Season, gender and garment filters; product page redesign; colour galleries; tech icon popups; per-colour, per-size inventory'],
            ['Refinement', 'October to early November', 'Layout and readability updates from Annie’s reviews, new Personal Care icons, the collaborations system and The Science Behind'],
            ['Launch', 'November 8, 2026', 'Went live on annieling.com ahead of the November market season'],
            ['Post-launch support', 'November 2026', 'Fixed issues found after launch and trained Annie on adding products, brands and stories'],
          ],
        },
      },
      {
        heading: 'The result',
        body: [
          'ALPS now has a live store that fits its brand, launched in time for the market season and the holidays. Annie can add products, post stories, set up new collaborations and change prices herself.',
        ],
      },
    ],
    gallery: [img('alps-annie-ling', 'site-mobile', 780, 1688, 'ALPS product page on mobile')],
  },
  {
    slug: 'go-green-mowing',
    title: 'Go Green Mowing',
    client: 'Eco-friendly lawn care, South Surrey and Metro Vancouver',
    category: 'Websites',
    type: 'Client',
    featured: true,
    summary: 'A website and mascot logo for a lawn care company that wanted to look as friendly and reliable as its crews.',
    services: 'Website · Mascot logo · Social post',
    url: 'https://gogreenmowing.ca',
    cover: img('go-green-mowing', 'site-desktop', 1440, 900, 'Go Green Mowing homepage: “Bringing Nature’s Beauty To Your Backyard” with the green mascot'),
    sections: [
      {
        heading: 'What we made',
        body: [
          'A mascot-led identity and a website built to turn visits into quote requests: clear services, a direct call button and an easy path to a free quote.',
          'The mascot carries across the logo, the website and social posts, so the brand reads the same everywhere a customer meets it.',
        ],
      },
    ],
    gallery: [
      img('go-green-mowing', 'site-mobile', 780, 1688, 'Go Green Mowing homepage on mobile'),
      sq('go-green-mowing', 'g-1', 'Go Green Mowing circular badge logo with mascot on a mower'),
      sq('go-green-mowing', 'g-2', 'Go Green Mowing “Our Services” social post'),
    ],
  },
  {
    slug: 'little-anna',
    title: 'Little Anna',
    client: 'Cakes and pastries bakery',
    category: 'Websites',
    type: 'Client',
    featured: true,
    summary: 'A full rebrand for a bakery: mascot logo, pattern packaging, cup sleeve, apparel, delivery boxes and a new website.',
    services: 'Rebrand · Packaging · Website',
    url: 'https://littleanna.vercel.app',
    cover: img('little-anna', 'site-desktop', 1440, 900, 'Little Anna homepage: “A little sweetness for every moment.”'),
    sections: [
      {
        heading: 'What we made',
        body: [
          'A warm mascot logo and a navy-and-cream system that works on everything the bakery touches, from cup sleeves and staff tees to delivery boxes.',
          'The website carries the same identity online, with the menu, pre-orders and the story of the bakery up front.',
        ],
      },
    ],
    gallery: [
      img('little-anna', 'site-mobile', 780, 1688, 'Little Anna homepage on mobile'),
      sq('little-anna', 'g-1', 'Little Anna mascot logo'),
      sq('little-anna', 'g-2', 'Little Anna apron and cake'),
      sq('little-anna', 'g-3', 'Little Anna pattern packaging'),
      sq('little-anna', 'g-4', 'Little Anna coffee cup sleeve'),
      sq('little-anna', 'g-5', 'Little Anna staff tee'),
      sq('little-anna', 'g-6', 'Little Anna delivery boxes'),
    ],
  },

  /* ------------------------------------------------------------ Brand identity */
  {
    slug: 'desert-fox',
    title: 'Desert Fox',
    client: 'Sweet festival desserts',
    category: 'Brand identity',
    type: 'Client',
    featured: true,
    summary: 'A playful identity for a festival dessert stand: logo suite, apparel, stickers, packaging, the stall itself and the Instagram profile.',
    services: 'Logo suite · Apparel · Packaging',
    cover: sq('desert-fox', 'g-5', 'Desert Fox orange tees and cap on sand'),
    sections: [
      {
        heading: 'What we made',
        body: [
          'A fox character and hand-drawn wordmark in one warm orange, built as a full logo suite: primary logo, wordmark, badge and horizontal lockup.',
          'The system rolls out across apparel, stickers and cups, churro packaging, the festival stall and the Instagram profile.',
        ],
      },
    ],
    gallery: [
      sq('desert-fox', 'g-1', 'Desert Fox primary logo'),
      sq('desert-fox', 'g-2', 'Desert Fox wordmark'),
      sq('desert-fox', 'g-3', 'Desert Fox badge mark'),
      sq('desert-fox', 'g-4', 'Desert Fox horizontal lockup'),
      sq('desert-fox', 'g-6', 'Desert Fox stickers and cup'),
      sq('desert-fox', 'g-7', 'Desert Fox churro packaging'),
      sq('desert-fox', 'g-8', 'Desert Fox festival stall'),
      sq('desert-fox', 'g-9', 'Desert Fox Instagram profile'),
    ],
  },
  {
    slug: 'dunes-and-scents',
    title: 'Dunes & Scents',
    client: 'Fragrance house',
    category: 'Brand identity',
    type: 'Client',
    featured: true,
    summary: 'AI product imagery for a five-scent fragrance line, from studio line-ups to cinematic single-bottle scenes.',
    services: 'AI product imagery',
    cover: sq('dunes-and-scents', 'g-2', 'Five Dunes & Scents bottles on stone plinths: the fragrance wardrobe'),
    sections: [
      {
        heading: 'What we made',
        body: [
          'A consistent set of product images for the full line, with each scent given its own setting and mood while the bottles stay true to the product.',
        ],
      },
    ],
    gallery: [
      sq('dunes-and-scents', 'g-1', 'Dunes & Scents five signature scents'),
      sq('dunes-and-scents', 'g-3', 'Dune Oud'),
      sq('dunes-and-scents', 'g-4', 'Jazeerah'),
      sq('dunes-and-scents', 'g-5', 'Jazeerah in the jungle'),
      sq('dunes-and-scents', 'g-6', 'Rihla with vanilla'),
      sq('dunes-and-scents', 'g-7', 'Rihla with blood orange'),
    ],
  },
  {
    slug: 'wall-canvas',
    title: 'Wall Canvas',
    client: 'Neon wall art',
    category: 'Brand identity',
    type: 'Client',
    featured: true,
    summary: 'A logo and social ads for a neon wall art brand.',
    services: 'Logo · Social ads',
    cover: sq('wall-canvas', 'g-2', 'Wall Canvas ad: a man holding a “Good Vibes” neon sign'),
    sections: [
      {
        heading: 'What we made',
        body: ['A confident script logo on electric blue, and social ads that show the product glowing in real settings.'],
      },
    ],
    gallery: [
      sq('wall-canvas', 'g-1', 'Wall Canvas logo'),
      sq('wall-canvas', 'g-3', 'Wall Canvas ad: “Even the non living can’t resist”'),
    ],
  },

  /* -------------------------------------------------------------- Social & ads */
  {
    slug: 'social-creative',
    title: 'Social & ad creative',
    client: 'Restaurant, creative agency and dessert brand',
    category: 'Social & ads',
    type: 'Client',
    summary: 'Social posts, carousel covers and promo ads made to stop the scroll and say one thing clearly.',
    services: 'Social posts · Carousels · Promo ads',
    cover: sq('social-creative', 'g-1', 'Butter chicken $5.99 promo'),
    sections: [
      {
        heading: 'What we made',
        body: ['Bold, single-message creative for feeds: one offer or idea per post, with type and imagery doing the work.'],
      },
    ],
    gallery: [
      sq('social-creative', 'g-2', '“What is on the menu?” agency post'),
      sq('social-creative', 'g-3', 'Behind the scenes carousel cover'),
      sq('social-creative', 'g-4', 'Brownie brand ad: “Gone in 20 minutes”'),
    ],
  },

  /* -------------------------------------------------------------- Product & UX */
  {
    slug: 'sitetask',
    title: 'SiteTask',
    client: 'Fuel and convenience retailer with 11 stations (confidential)',
    category: 'Product & UX',
    type: 'Client',
    status: 'In progress',
    year: '2026',
    tools: 'Figma',
    summary:
      'A web app where a multi-site owner assigns work to managers and staff, sees it done with photo proof, and knows what is overdue across every station.',
    services: 'Product & UX design',
    cover: img('sitetask', 'cover', 1600, 1200, 'Diagram of one owner, two managers and 11 stations, with one task checked off'),
    sections: [
      {
        heading: 'The problem',
        body: [
          'The owner runs 11 stations through two managers, one running 5 sites and the other 6, each with their own staff. There was no single place to assign work, confirm it was done, or see what was overdue.',
        ],
      },
      {
        heading: 'Our role',
        body: [
          'We are designing the product end to end. Three roles need different views of the same work: the owner sees every site, managers see their own sites, and staff see their own tasks.',
        ],
      },
      {
        heading: 'Process',
        body: [
          'We started from the chain of responsibility (owner to managers to staff) and designed role-based access around it, then the proof loop: a task is not done until the manager can see a photo of it.',
        ],
      },
      {
        heading: 'The solution',
        body: [
          'Screens designed: sign-in; owner dashboard (tasks completed, overdue, station health, today’s schedule, recent activity); task board in kanban and list views; task detail; create task; sites and team; team messages; reports and analytics; notification settings; and the manager dashboard.',
        ],
      },
      {
        heading: 'Outcome',
        body: ['In progress. Results will be added once SiteTask is in use at the stations.'],
      },
    ],
  },
  {
    slug: 'tuniff',
    title: 'Tuniff',
    client: 'Quackly Private Limited',
    category: 'Product & UX',
    type: 'Client',
    year: '2023 – 2024',
    tools: 'Figma, Google Forms',
    summary: 'An AI-powered mobile app that helps people choose a hairstyle that suits them, with a virtual try-on.',
    services: 'End-to-end UX · Mobile app',
    cover: img('tuniff', 'img-1', 1512, 1542, 'Tuniff research summary with survey findings and persona'),
    sections: [
      {
        heading: 'The problem',
        body: [
          'Choosing a hairstyle lacks personalisation. People struggle to picture how a style will suit their face shape before committing at the barber.',
        ],
      },
      {
        heading: 'Our role',
        body: [
          'End-to-end UX with Quackly, from survey research and personas to information architecture and high-fidelity screens. Facial data is sensitive, so privacy and permissions had to be designed in, not added later.',
        ],
      },
      {
        heading: 'Process',
        body: [
          'Survey research with 10 users: 8 of 10 wanted AI personalisation, and 7 of 10 had privacy concerns about facial data.',
          'Discover (research and competitive analysis), define (personas and MoSCoW), ideate (information architecture and user flows), then design (style guide and type).',
        ],
        images: [img('tuniff', 'img-2', 1512, 2503, 'Tuniff information architecture and user flow diagram')],
      },
      {
        heading: 'The solution',
        body: [
          'A high-fidelity mobile prototype with guided onboarding, filtering, a 2D virtual try-on based on facial feature scanning, and clear privacy and permission controls.',
        ],
        images: [img('tuniff', 'img-3', 1514, 4945, 'Tuniff high-fidelity screens for onboarding, recommendations and try-on')],
      },
      {
        heading: 'What we learned',
        body: [
          'Biometric data needs radical transparency in privacy settings, and a minimal UI keeps complex AI output from overwhelming people.',
        ],
      },
    ],
  },

]

export const featuredProjects = projects.filter((p) => p.featured)
export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)
