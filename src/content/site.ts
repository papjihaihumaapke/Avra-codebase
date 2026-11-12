/**
 * Site configuration and copy.
 * Anything wrapped in [brackets] is a placeholder to replace with real content.
 * Leave a URL empty ('') and the site falls back gracefully.
 */
export const site = {
  name: 'AVRA',
  tagline: 'Growth that flows.',
  description:
    'A Vancouver marketing studio for brands ready to rise. Brand, websites and performance marketing, without the noise.',
  city: 'Vancouver',
  region: 'BC',
  country: 'CA',
  /** TODO: production domain, no trailing slash. Used for canonical + Open Graph URLs. */
  url: 'https://www.example.com',
  /** TODO: e.g. 'hello@yourdomain.com'. Empty shows an [Email address] placeholder. */
  email: '',
  /** TODO: Calendly / Cal.com link. Empty makes every "Book a call" go to /contact#book. */
  bookingUrl: '',
  /** TODO: form backend (Formspree, Basin, your API). Receives a JSON POST. */
  formEndpoint: '',
  social: {
    /** TODO */
    instagram: '',
    /** TODO */
    linkedin: '',
  },
  /**
   * Hero background. Set `mp4` (and optionally `webm` + `poster`) to use the brand
   * reel instead of the Three.js scene. Put files in /public/media/.
   */
  heroVideo: {
    mp4: '',
    webm: '',
    poster: '',
  },
} as const

export const bookHref = site.bookingUrl || '/contact#book'
export const bookIsExternal = Boolean(site.bookingUrl)

export const navLinks = [
  { label: 'Services', href: '/#services' },
  { label: 'Process', href: '/#process' },
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
] as const

export const services = [
  {
    index: '01',
    slug: 'brand',
    title: 'Brand',
    body: 'Identity, logo systems, brand guidelines and creative direction.',
  },
  {
    index: '02',
    slug: 'websites',
    title: 'Websites',
    body: 'Design and development of fast, conversion-focused websites.',
  },
  {
    index: '03',
    slug: 'performance',
    title: 'Performance marketing',
    body: 'Paid social and search campaigns, creative testing, lead tracking and reporting.',
  },
] as const

export const processSteps = [
  { index: '01', title: 'Listen', body: 'We learn your business, your customers and what growth means to you.' },
  { index: '02', title: 'Plan', body: 'One clear plan: what we build, in what order, and how we measure it.' },
  { index: '03', title: 'Build', body: 'Brand, site and campaigns, made with care and shipped on schedule.' },
  { index: '04', title: 'Grow', body: 'We test, report plainly and refine, month after month.' },
] as const

/** Selected work. Images live in /public/work. */
export const work = [
  {
    id: 'go-green-mowing',
    title: 'Go Green Mowing',
    clientType: 'Lawn care company',
    services: 'Website · Mascot logo',
    image: '/work/go-green-mowing.webp',
    alt: 'Go Green Mowing website homepage with a green mascot and the headline “Bringing Nature’s Beauty To Your Backyard”',
    w: 1440,
    h: 900,
    url: 'https://gogreenmowing.ca',
  },
  {
    id: 'little-anna',
    title: 'Little Anna',
    clientType: 'Cakes & pastries bakery',
    services: 'Rebrand · Packaging · Website',
    image: '/work/little-anna.webp',
    alt: 'Little Anna bakery website homepage with the headline “A little sweetness for every moment.”',
    w: 1440,
    h: 900,
    url: 'https://littleanna.vercel.app',
  },
  {
    id: 'fashion-ecommerce',
    title: 'Fashion e-commerce',
    clientType: 'Fashion retail',
    services: 'E-commerce website',
    image: '/work/fashion-ecommerce.webp',
    alt: 'Fashion e-commerce product page for a water-repellent hooded windbreaker',
    w: 1440,
    h: 900,
    url: '',
  },
  {
    id: 'desert-fox',
    title: 'Desert Fox',
    clientType: 'Festival desserts',
    services: 'Logo suite · Apparel · Packaging',
    image: '/work/desert-fox.webp',
    alt: 'Desert Fox branded orange t-shirts and cap on sand',
    w: 512,
    h: 512,
    url: '',
  },
  {
    id: 'dunes-and-scents',
    title: 'Dunes & Scents',
    clientType: 'Fragrance house',
    services: 'AI product imagery',
    image: '/work/dunes-and-scents.webp',
    alt: 'Five ornate Dunes & Scents perfume bottles on stone plinths',
    w: 512,
    h: 512,
    url: '',
  },
  {
    id: 'wall-canvas',
    title: 'Wall Canvas',
    clientType: 'Neon wall art',
    services: 'Logo · Social ads',
    image: '/work/wall-canvas.webp',
    alt: 'Wall Canvas social ad: a man holding a “Good Vibes” neon sign, “Light your walls with Wall Canvas.”',
    w: 512,
    h: 512,
    url: '',
  },
] as const

/** Brands we have worked with. Logos live in /public/clients. */
export const clients = [
  { name: 'Noon Minutes', logo: '/clients/noon-minutes.png', w: 70, h: 34 },
  { name: 'Fit & Flex', logo: '/clients/fit-and-flex.png', w: 396, h: 244 },
  { name: 'Go Green Mowing', logo: '/clients/go-green-mowing.png', w: 420, h: 394 },
  { name: 'The Indian Club House', logo: '/clients/indian-club-house.png', w: 319, h: 320 },
  { name: 'EZ Rentalz', logo: '/clients/ez-rentalz.png', w: 520, h: 63 },
] as const

/** Named without logos, shown as "and more". */
export const moreClients = ['Little Anna', 'Desert Fox', 'Dunes & Scents', 'Wall Canvas'] as const

export const whyPoints = [
  {
    title: 'Small senior team',
    body: 'You work directly with the people doing the work. No hand-offs, no junior layers.',
  },
  {
    title: 'Clear reporting',
    body: 'Plain-language reports on what ran, what worked and what we change next.',
  },
  {
    title: 'Built for local businesses',
    body: 'We know the Vancouver market and size the work to small and mid-size budgets.',
  },
] as const

export const contactOptions = {
  needs: ['Brand', 'Websites', 'Performance marketing', 'Not sure'],
  /** TODO: adjust to the ranges you actually quote. */
  budgets: ['Under $5k', '$5k – $15k', '$15k – $40k', '$40k+', 'Not sure yet'],
} as const

export const routeMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'AVRA — Growth that flows. Marketing studio in Vancouver, BC',
    description: site.description,
  },
  '/contact': {
    title: 'Contact — AVRA, Vancouver marketing studio',
    description:
      'Tell us about your business. Brand, websites and performance marketing for small and mid-size businesses in Vancouver, BC.',
  },
}
