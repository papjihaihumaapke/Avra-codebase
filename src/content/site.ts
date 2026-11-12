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

/** Placeholders only. Replace with real, approved case studies. */
export const work = [
  { id: 'a', clientType: '[Client type]', title: '[Project title]', result: '[Result]', art: 1 },
  { id: 'b', clientType: '[Client type]', title: '[Project title]', result: '[Result]', art: 2 },
  { id: 'c', clientType: '[Client type]', title: '[Project title]', result: '[Result]', art: 3 },
  { id: 'd', clientType: '[Client type]', title: '[Project title]', result: '[Result]', art: 4 },
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

export const founders = [
  { name: 'Hilal', role: '[Role]', bio: '[One-line bio]' },
  { name: 'Arshil', role: '[Role]', bio: '[One-line bio]' },
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
