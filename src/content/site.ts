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
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
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

/** Brands we have worked with (logo marquee). Logos live in /public/clients. */
export const clients = [
  { name: 'ALPS by Annie Ling', logo: '/clients/alps-annie-ling.webp', w: 320, h: 137 },
  { name: 'Noon Minutes', logo: '/clients/noon-minutes.webp', w: 70, h: 34 },
  { name: 'Fit & Flex', logo: '/clients/fit-and-flex.webp', w: 227, h: 140 },
  { name: 'Little Anna', logo: '/clients/little-anna.webp', w: 140, h: 140 },
  { name: 'Go Green Mowing', logo: '/clients/go-green-mowing.webp', w: 149, h: 140 },
  { name: 'The Indian Club House', logo: '/clients/indian-club-house.webp', w: 140, h: 140 },
  { name: 'Kwantlen Pizza 56', logo: '/clients/kwantlen-pizza-56.webp', w: 219, h: 140 },
  { name: 'EZ Rentalz', logo: '/clients/ez-rentalz.webp', w: 320, h: 39 },
  { name: 'Desert Fox', logo: '/clients/desert-fox.webp', w: 128, h: 140 },
] as const

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
  '/work': {
    title: 'Work — AVRA, Vancouver marketing studio',
    description: 'Websites, brand identities, social creative and product design for local businesses and growing brands.',
  },
  '/services': {
    title: 'Services — Brand, websites and performance marketing | AVRA',
    description:
      'Brand identity, conversion-focused websites and performance marketing for small and mid-size businesses in Vancouver, BC.',
  },
  '/about': {
    title: 'About — AVRA, a small studio in Vancouver',
    description: 'A small senior marketing studio in Vancouver. The people who plan your work are the people who make it.',
  },
  '/contact': {
    title: 'Contact — AVRA, Vancouver marketing studio',
    description:
      'Tell us about your business. Brand, websites and performance marketing for small and mid-size businesses in Vancouver, BC.',
  },
}
