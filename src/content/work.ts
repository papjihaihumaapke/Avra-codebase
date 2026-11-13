/**
 * Portfolio. Images live in /public/work/<slug>/.
 * Client work is marked `type: 'Client'`; self-initiated studies are `type: 'Concept'`.
 * Results are only stated where they are documented. Nothing here is invented.
 */

export type Img = { src: string; w: number; h: number; alt: string }
export type Section = { heading: string; body: string[]; images?: Img[] }
export type Category = 'Websites' | 'Brand identity' | 'Social & ads' | 'Product & UX' | 'Concepts'

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

export const categories: Category[] = ['Websites', 'Brand identity', 'Social & ads', 'Product & UX', 'Concepts']

export const projects: Project[] = [
  /* ------------------------------------------------------------------ Websites */
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
  {
    slug: 'fashion-ecommerce',
    title: 'Fashion e-commerce',
    client: 'Fashion retailer (confidential)',
    category: 'Websites',
    type: 'Client',
    featured: true,
    summary: 'An e-commerce website for a fashion retailer, built around clean product pages and a simple path to checkout.',
    services: 'E-commerce website',
    cover: img('fashion-ecommerce', 'site-desktop', 1440, 900, 'Product page for a water-repellent hooded windbreaker'),
    sections: [
      {
        heading: 'What we made',
        body: [
          'Product pages that put the photography first, with colour and size options, clear pricing and a single add-to-bag action.',
          'The client site is not public, so it is shown here with screenshots only.',
        ],
      },
    ],
    gallery: [img('fashion-ecommerce', 'site-mobile', 780, 1688, 'Product page on mobile')],
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

  /* ------------------------------------------------------------------ Concepts */
  {
    slug: 'zara-redesign',
    title: 'Zara redesign',
    client: 'Concept project',
    category: 'Concepts',
    type: 'Concept',
    year: '2025',
    tools: 'Figma, Illustrator, Photoshop',
    summary: 'A redesign of the Zara web experience focused on accessibility, intuitive navigation and a refined visual hierarchy.',
    services: 'Web redesign · Accessibility',
    cover: img('zara-redesign', 'cover', 1600, 833, 'Mid-fidelity wireframes for laptop and tablet'),
    sections: [
      {
        heading: 'The problem',
        body: [
          'Complex navigation and an inconsistent experience across devices, plus accessibility hurdles such as poor keyboard support and low contrast.',
        ],
      },
      {
        heading: 'Process',
        body: [
          'Analysis of the existing site revealed the friction points: overwhelming choices and a lack of clear visual organisation. Accessibility audits found contrast and navigation gaps.',
          'From Miller’s Law for chunking information to Gestalt principles for visual hierarchy, each decision aimed to reduce cognitive load and improve the shopping journey.',
        ],
        images: [
          img('zara-redesign', 'img-1', 1600, 833, 'Key findings: usability issues and accessibility challenges'),
          img('zara-redesign', 'img-2', 1600, 833, 'Mid-fidelity mobile wireframes'),
        ],
      },
      {
        heading: 'The solution',
        body: [
          'A minimalist, functional redesign that prioritises accessibility and responsiveness, with easier product discovery and a smoother checkout flow.',
        ],
        images: [img('zara-redesign', 'img-3', 1600, 833, 'Mobile wireframes with product imagery for the redesigned shopping flow')],
      },
      {
        heading: 'What we learned',
        body: [
          'Balancing a high-fashion, minimalist brand with the needs of a high-volume store comes down to visual hierarchy and small interactions; they are what make the experience feel premium.',
        ],
      },
    ],
  },
  {
    slug: 'healthy-city-dashboard',
    title: 'Healthy City Dashboard',
    client: 'Concept project on City of Vancouver open data',
    category: 'Concepts',
    type: 'Concept',
    year: '2025',
    tools: 'Figma, Chart.js, HTML, CSS, JS',
    summary: 'An accessibility-driven redesign of the Mode Share indicator, from static tables to an interactive dashboard.',
    services: 'Data visualisation · Accessibility',
    cover: img('healthy-city-dashboard', 'cover', 1159, 1500, 'Project overview: content audit, lo-fi and hi-fi'),
    sections: [
      {
        heading: 'The problem',
        body: [
          'The Mode Share indicator (how residents bike, walk and take transit) shipped as static tables with weak hierarchy, limited filtering and inconsistent accessibility.',
        ],
      },
      {
        heading: 'Our role',
        body: [
          'Design lead in a two-person team, running the redesign from content audit to coded dashboard and owning the visual system and accessibility pass, while staying aligned with the existing city look.',
        ],
      },
      {
        heading: 'Process',
        body: [
          'A 12-week plan with a roadmap, work breakdown and risk log: content audit, lo-fi wireframes, hi-fi prototype, then a build wiring JSON data to Chart.js. Accessibility checks ran before integration, not after it.',
        ],
        images: [
          img('healthy-city-dashboard', 'img-1', 1159, 1500, '12-week roadmap and schedule'),
          img('healthy-city-dashboard', 'img-2', 1159, 1500, 'Work breakdown structure across five phases'),
        ],
      },
      {
        heading: 'What we learned',
        body: [
          'Treating accessibility as a build-time gate kept it from becoming an afterthought, and made the visual system stronger: contrast and hierarchy are the same problem.',
        ],
      },
    ],
  },
  {
    slug: 'youtube-trending-dashboard',
    title: 'YouTube Trending Dashboard',
    client: 'Concept project',
    category: 'Concepts',
    type: 'Concept',
    year: '2026',
    tools: 'Figma, D3.js, Chart.js',
    summary: 'An interactive three-page analytics dashboard over 40,000+ rows of trending video data across 10 countries.',
    services: 'Dashboard design · Build',
    cover: img('youtube-trending-dashboard', 'cover', 1440, 900, 'Trending video analytics dashboard with charts comparing countries'),
    sections: [
      {
        heading: 'The problem',
        body: ['Trending video data across 10 countries runs to 40,000+ rows. The goal was to make the patterns in it readable.'],
      },
      {
        heading: 'The solution',
        body: ['A three-page interactive dashboard designed in Figma and built with D3.js and Chart.js.'],
      },
    ],
  },
  {
    slug: 'acminder',
    title: 'Acminder',
    client: 'Concept project',
    category: 'Concepts',
    type: 'Concept',
    year: '2025',
    tools: 'Figma, Miro, Google Forms, React',
    summary: 'Proactive schedule management for international students, research-led from goals and personas to a hi-fi mobile system.',
    services: 'UX research · Mobile app',
    cover: img('acminder', 'img-1', 1500, 843, 'International student persona'),
    sections: [
      {
        heading: 'The problem',
        body: [
          'International students juggle 20+ hours of work a week against a full course load, LMS deadlines and visa work-hour limits. Existing calendar and LMS tools each track one world and never warn before a conflict.',
        ],
      },
      {
        heading: 'Our role',
        body: [
          'The full UX process: research goals, competitive analysis, personas, flows, wireframes, usability metrics and a hi-fi prototype, documented in a technical requirements document.',
        ],
      },
      {
        heading: 'Process',
        body: [
          'Comparative analysis showed the gap: manual entry, visual-only conflict detection and no work-hour context. We mapped onboarding, task add, edit and delete, calendar and settings flows, with annotated wireframes for each screen.',
        ],
        images: [
          img('acminder', 'img-2', 1500, 843, 'Comparison against calendar and LMS tools'),
          img('acminder', 'img-3', 1062, 1500, 'Hi-fi sign-up screen with annotations'),
          img('acminder', 'img-4', 1062, 1500, 'Task management flow for add, edit and delete'),
        ],
      },
      {
        heading: 'The solution',
        body: ['A unified dashboard that merges academic, work and personal schedules, detects conflicts and nudges before problems happen.'],
      },
      {
        heading: 'What we learned',
        body: [
          'Because the persona’s constraints were hard requirements, every screen decision had a reason. Research is the argument every pixel has to answer to.',
        ],
      },
    ],
  },
  {
    slug: 'mini-minds',
    title: 'Mini Minds',
    client: 'Concept project',
    category: 'Concepts',
    type: 'Concept',
    year: '2024',
    tools: 'Figma, Illustrator, Canva',
    summary: 'An interactive learning app for children aged 5 to 10, built around gamified learning and creative skill development.',
    services: 'Mobile app · UX',
    cover: img('mini-minds', 'cover', 1440, 1024, 'Mini Minds app shown on two phones'),
    sections: [
      {
        heading: 'The problem',
        body: [
          'Traditional learning platforms are often rigid and fail to engage young learners. Children need something that matches their energy and different learning styles.',
        ],
      },
      {
        heading: 'Process',
        body: [
          'Research showed that children respond best to play-based discovery. We reviewed existing EdTech apps for gaps in creative engagement and the balance of sound and visuals.',
          'From empathy mapping to heuristic evaluation, we iterated on navigation and the reward system so the app feels like a game rather than a chore.',
        ],
        images: [
          img('mini-minds', 'img-1', 1440, 1024, 'Empathy map from the parent’s point of view'),
          img('mini-minds', 'img-2', 1440, 1024, 'Heuristic evaluation notes'),
        ],
      },
      {
        heading: 'The solution',
        body: ['A mobile app that uses gamification to nurture creativity and critical thinking, with a vibrant identity made for the 5 to 10 age group.'],
        images: [img('mini-minds', 'img-3', 1440, 1024, 'Nine high-fidelity Mini Minds screens from splash to quiz')],
      },
      {
        heading: 'What we learned',
        body: ['Designing for children means different constraints: larger touch targets, vibrant feedback and extremely simple navigation.'],
      },
    ],
  },
  {
    slug: 'musify-motion-system',
    title: 'Musify',
    client: 'Concept project',
    category: 'Concepts',
    type: 'Concept',
    year: '2025',
    tools: 'Figma, GSAP, ScrollTrigger, Lenis',
    summary: 'A brand identity and motion system for a live-music platform, built on a “live stage” metaphor with five signature interactions.',
    services: 'Brand · Motion system',
    cover: img('musify-motion-system', 'cover', 1500, 843, 'Musify live stage identity'),
    sections: [
      {
        heading: 'The problem',
        body: [
          'Flat screens don’t capture the energy of a live venue. The brief: a brand identity and a motion language that make a dark UI feel alive.',
        ],
      },
      {
        heading: 'Our role',
        body: [
          'The identity and the motion system: colour, type, a three-rule “motion recipe”, and five signature interactions coded in GSAP, all documented as a style guide.',
        ],
        images: [
          img('musify-motion-system', 'img-1', 1500, 843, 'The Musify motion recipe: three governing principles'),
          img('musify-motion-system', 'img-2', 1500, 843, 'Curtain-reveal preloader frames'),
        ],
      },
      {
        heading: 'What we learned',
        body: [
          'A motion system is only as good as its constraints. Writing timing and easing rules down first is what made five interactions feel like one brand.',
        ],
      },
    ],
  },
  {
    slug: 'motion-component-library',
    title: 'Purposeful Motion',
    client: 'Concept project',
    category: 'Concepts',
    type: 'Concept',
    year: '2025',
    tools: 'HTML, CSS, JavaScript, Figma',
    summary: 'A documented library of eight functional micro-interactions: motion for clarity, feedback and delight, not decoration.',
    services: 'Interaction · Motion',
    cover: img('motion-component-library', 'cover', 1500, 843, 'Purposeful Motion library overview'),
    sections: [
      {
        heading: 'The problem',
        body: ['Motion is usually treated as the last polish pass. This library argues it is a functional tool that adds clarity and feedback and reduces uncertainty.'],
      },
      {
        heading: 'Process',
        body: [
          'Eight components, each mapped to a design principle and a real UX concern, and specified like a design token: loader, success, error shake, toggle, floating input, expandable card, modal and drag and drop.',
        ],
        images: [
          img('motion-component-library', 'img-1', 1500, 843, 'Eight motion components with timing, easing and scenario'),
          img('motion-component-library', 'img-2', 1500, 843, 'Storyboard of a form validation error and floating input'),
        ],
      },
      {
        heading: 'What we learned',
        body: ['Documenting the “why” beside the “how” turns a pile of effects into a system a team can reuse.'],
      },
    ],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)
