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
  /** Art-directed 3:4 cover (homepage, work index, case study hero). Falls back to `cover`. */
  art?: Img
  /** Two-part italic line shown with the title, e.g. ['Couture,', 'online']. */
  tagline?: [string, string]
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

const ff = (file: string, alt: string) => img('fit-and-flex', file, 1086, 1448, alt)

export const projects: Project[] = [
  /* ----------------------------------------------------------------- Highlight */
  {
    slug: 'fit-and-flex',
    title: 'Fit & Flex',
    client: 'Fit & Flex, a granola, oats and muesli brand by Niva Nutrifood',
    category: 'Social & ads',
    type: 'Client',
    featured: true,
    year: '2026',
    summary:
      'Bilingual launch creative and a quick-commerce ads strategy for a granola brand arriving in Saudi Arabia, where almost nobody knew its name yet.',
    services: 'Launch creative · Arabic & English ads · noon Minutes ads strategy',
    facts: [
      { k: 'Client', v: 'Fit & Flex by Niva Nutrifood' },
      { k: 'Services', v: 'Launch campaign creative, bilingual social and marketplace ads, noon Minutes ads audit and strategy' },
      { k: 'Market', v: 'Saudi Arabia, on noon Minutes quick commerce' },
      { k: 'Languages', v: 'English and Arabic' },
    ],
    cover: ff('launch', 'Fit & Flex Mixed Fruit and Mango Coconut granola packs with the Riyadh skyline: “Now in Saudi Arabia”'),
    sections: [
      {
        heading: 'The brief',
        body: [
          'Fit & Flex makes baked granola, power oats and muesli: oat-rich, low in sugar, with real fruit and nuts. The brand was new to Saudi Arabia and sold on noon Minutes, where shoppers order on their phones and expect delivery in minutes.',
          'On the shelf it sat beside Nestlé Fitness, Kellogg’s and local favourite Hanaa at the same price, with none of their name recognition. Few searches used the brand name, so every ad had to introduce the brand and sell the bag in the same moment.',
        ],
        images: [ff('range', 'The full Fit & Flex range on stone plinths: oats, granolas, puffs and chips')],
      },
      {
        heading: 'A better start, in two languages',
        body: [
          'We built a bilingual creative system around the moment people actually eat granola: breakfast. Every piece pairs one short English line with its Arabic counterpart, puts the pack front and centre, and sets it in warm Saudi morning light.',
          'Each ad carries one claim from the pack (a better start, whole grains, real nuts, two flavours) so it still reads at thumbnail size on a phone.',
        ],
        images: [
          ff('better-start', 'A man in a shemagh eating granola at a sunlit kitchen counter: “A better start, every morning”'),
          ff('breakfast', 'Granola bowl with berries beside a Happy Berries pack: “Breakfast that keeps up with you”'),
          ff('two-flavours', 'Happy Berries and Mango Coconut granola with fresh fruit: “Two flavours. One healthy start.”'),
          ff('whole-grains', 'Close-up of granola clusters, almonds and berries: “Whole grains. Real nuts.”'),
        ],
      },
      {
        heading: 'Fuel for the gym crowd',
        body: [
          'The high-protein range (power oats, protein muesli, chips and puffs) needed a different audience: people who train. This set moves from the kitchen to the gym, leads with the protein number in both languages, and shows the snack where it gets eaten: in the gym bag.',
        ],
        images: [
          ff('workouts', 'A smiling man holding granola and high-protein muesli on yellow: “Fuel up for powerful workouts!”'),
          ff('power-oats', 'A man in a gym holding Power Oats: “Fuel your performance”'),
          ff('lift', 'High Protein Muesli with a bowl and gym bag: “Fuel before you lift”, 22g protein'),
          ff('gym-bag', 'Protein chips and puffs in an open gym bag: “Your gym bag snack”, 12g protein'),
        ],
      },
      {
        heading: 'Built for quick commerce',
        body: [
          'noon Minutes is noon’s quick-commerce service in Saudi Arabia, delivering from local dark stores. Shoppers search in a hurry, in Arabic and English, with a lot of misspellings: we counted at least 15 Arabic spellings of “granola”, and they convert very differently.',
          'We audited the first month of ads and rebuilt the account around what the search data already showed, so each search meets the right product at a bid it can afford.',
        ],
        list: [
          'One catch-all auto campaign split into four: proven granola searches, high-volume Arabic spellings, oats and muesli, and an auto campaign that keeps finding new searches',
          'Oats and muesli shoppers shown oats and muesli, not granola',
          'Arabic product titles rewritten to match how people search, each with the product, flavour and one claim',
          'A first product image that sells on a phone: the pack plus two or three claims in Arabic',
          'A two-pack bundle to raise the order value against the same cost per click',
          'A weekly routine: move searches that sell into their own campaign, block the ones that don’t',
        ],
        images: [ff('noon-minutes', 'Two Fit & Flex packs beside a delivery bag: “Delivered in minutes”, available on noon Minutes')],
      },
      {
        heading: 'Where it stands',
        body: [
          'The new campaign structure and creative rolled out in November 2026. We will add results here once the first full month is in.',
        ],
      },
    ],
  },

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
        images: [
          img('alps-annie-ling', 'shot-innovation', 1600, 1000, 'ALPS website: the “alps fashion innovation” section beside a red technical fabric'),
          img('alps-annie-ling', 'shot-milestones', 1600, 1000, 'ALPS website: the Milestones page, Annie’s own writing beside a photo of a travel jacket and bag'),
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
          img('alps-annie-ling', 'shot-shop', 1600, 1000, 'ALPS Innovation category page with colour, size, feature, season, gender and garment filters'),
          img('alps-annie-ling', 'shot-product', 1600, 1000, 'ALPS product page for a graphene heating jacket: design features, colour and size pickers, and prices in CAD and HKD'),
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
        images: [
          img('alps-annie-ling', 'shot-m-shop', 780, 1688, 'ALPS category page on mobile with filter chips'),
          img('alps-annie-ling', 'shot-m-product', 780, 1688, 'ALPS product page on mobile: graphene heating jacket with photo gallery'),
          img('alps-annie-ling', 'shot-m-designer', 780, 1688, 'ALPS designer bio page on mobile'),
        ],
      },
    ],
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
    client: 'Selected clients in food, fragrance, home decor and lawn care',
    category: 'Social & ads',
    type: 'Client',
    summary: 'Social posts and paid ads from across our clients, each made to stop the scroll and say one thing clearly.',
    services: 'Social posts · Paid social ads · Launch creative',
    cover: img('social-creative', 'dunes-post', 1122, 1402, 'Dunes & Scents Instagram post: a gold perfume bottle among red roses and agarwood'),
    sections: [
      {
        heading: 'What we made',
        body: [
          'One idea per post, with type and imagery doing the work. Each piece is built for the feed it runs in, from a fragrance launch to bilingual snack ads in Saudi Arabia.',
        ],
        images: [
          img('social-creative', 'fit-flex-launch', 1086, 1448, 'Fit & Flex launch ad: granola and muesli packs with the Riyadh skyline, “Now in Saudi Arabia”'),
          img('social-creative', 'fit-flex-workout', 1086, 1448, 'Fit & Flex ad on yellow: a man holding granola and muesli, “Fuel up for powerful workouts!”'),
          img('fit-and-flex', 'gym-bag', 1086, 1448, 'Fit & Flex ad: protein chips and puffs in an open gym bag, “Your gym bag snack”'),
          sq('wall-canvas', 'g-2', 'Wall Canvas ad: a man holding a “Good Vibes” neon sign'),
          sq('wall-canvas', 'g-3', 'Wall Canvas ad: “Even the non living can’t resist”'),
          sq('go-green-mowing', 'g-2', 'Go Green Mowing “Our Services” social post'),
        ],
      },
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

/* Art-directed covers (public/work/<slug>/art.webp, 1086×1448) and taglines. */
const art = (slug: string, alt: string): Img => img(slug, 'art', 1086, 1448, alt)
const extras: Record<string, Pick<Project, 'art' | 'tagline'>> = {
  'fit-and-flex': {
    art: art('fit-and-flex', 'A navy granola pouch beside a bowl of granola, berries and dates on travertine in warm morning light'),
    tagline: ['A better', 'start'],
  },
  'alps-annie-ling': {
    art: art('alps-annie-ling', 'A black zip-neck jacket draped over a brushed-steel chair in a concrete studio'),
    tagline: ['Couture,', 'online'],
  },
  'go-green-mowing': {
    art: art('go-green-mowing', 'A green ride-on mower on a freshly striped lawn at golden hour'),
    tagline: ['Friendly by', 'nature'],
  },
  'little-anna': {
    art: art('little-anna', 'Patterned pastry box with strawberry tarts and cream puffs on cobalt blue'),
    tagline: ['A little', 'sweetness'],
  },
  'dunes-and-scents': {
    art: art('dunes-and-scents', 'Five jewel-toned perfume bottles on travertine steps in front of desert dunes'),
    tagline: ['Five scents,', 'one wardrobe'],
  },
  'wall-canvas': {
    art: art('wall-canvas', 'A pink neon line sculpture glowing on a dark brick wall above a sofa'),
    tagline: ['Good vibes,', 'lit up'],
  },
  'social-creative': {
    art: art('social-creative', 'Three phones showing bold colour-block posts, with matching printed proofs, on glossy red lacquer'),
    tagline: ['Stop the', 'scroll'],
  },
  sitetask: {
    art: art('sitetask', 'A hand holding a phone with a checked-off task list at a fuel station at dusk'),
    tagline: ['Eleven stations,', 'one list'],
  },
  tuniff: {
    art: art('tuniff', 'A woman in a salon chair with three translucent hairstyles floating around her'),
    tagline: ['Try it before', 'the cut'],
  },
}
for (const p of projects) Object.assign(p, extras[p.slug])

/** The image to lead with for a project: its art-directed cover, else its first image. */
export const coverOf = (p: Project): Img => p.art ?? p.cover

/**
 * Tiny pre-blurred copy of an image (generated next to it as *-blur.webp, ~300 bytes).
 * Used for blurred backgrounds instead of CSS blur, which is very slow on phones.
 */
export const blurOf = (src: string) => src.replace(/\.webp$/, '-blur.webp')

export const featuredProjects = projects.filter((p) => p.featured)
export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)
