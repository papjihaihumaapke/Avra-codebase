/**
 * Contact form → two branded emails via Resend. Served at POST /api/contact.
 *  1. To the studio: the full enquiry, reply-to the sender.
 *  2. To the sender: a confirmation (no copy of their message; see netlify/lib/emails.ts).
 *
 * Environment variables (Netlify → Site configuration → Environment variables):
 *   RESEND_API_KEY  Required. Resend API key (re_…). Secret: never put it in front-end code.
 *   CONTACT_TO      Optional. Inbox(es) for enquiries, comma-separated (default thinkavra.ca@gmail.com)
 *   CONTACT_FROM    Optional. Sender on the verified domain (default "AVRA <hello@thinkavra.com>")
 */
import type { Config } from '@netlify/functions'
import { Resend } from 'resend'
import { contactOptions, site } from '../../src/content/site.ts'
import { confirmationEmail, studioEmail, type Enquiry } from '../lib/emails.ts'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const LIMITS = { name: 120, email: 200, business: 160, need: 60, budget: 60, message: 5000 } as const
type Field = keyof typeof LIMITS
/** Humans take longer than this to fill the form; faster submissions are bots. */
const MIN_FILL_MS = 2500

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

export default async (req: Request) => {
  if (req.method !== 'POST') return json(405, { ok: false, error: 'Method not allowed' })

  const { RESEND_API_KEY } = process.env
  const CONTACT_TO = process.env.CONTACT_TO || 'thinkavra.ca@gmail.com'
  // Any address on the verified thinkavra.com domain works as a sender.
  const CONTACT_FROM = process.env.CONTACT_FROM || `AVRA <${site.email}>`
  if (!RESEND_API_KEY) {
    console.error('[contact] Missing RESEND_API_KEY')
    return json(500, { ok: false, error: 'Email is not configured' })
  }

  let raw: Record<string, unknown>
  try {
    raw = await req.json()
  } catch {
    return json(400, { ok: false, error: 'Invalid request' })
  }

  // Bot traps: honeypot filled, or submitted impossibly fast. Pretend success so bots learn nothing.
  const elapsed = Number(raw._elapsed)
  if (typeof raw.company_website === 'string' && raw.company_website.trim()) return json(200, { ok: true })
  if (Number.isFinite(elapsed) && elapsed < MIN_FILL_MS) return json(200, { ok: true })

  const data = {} as Record<Field, string>
  for (const key of Object.keys(LIMITS) as Field[]) {
    const v = typeof raw[key] === 'string' ? (raw[key] as string).trim() : ''
    data[key] = v.slice(0, LIMITS[key])
  }

  const errors: string[] = []
  if (!data.name) errors.push('name')
  if (!EMAIL_RE.test(data.email)) errors.push('email')
  if (!(contactOptions.needs as readonly string[]).includes(data.need)) errors.push('need')
  if (data.budget && !(contactOptions.budgets as readonly string[]).includes(data.budget)) errors.push('budget')
  if (!data.message) errors.push('message')
  if (errors.length) return json(400, { ok: false, error: 'Missing or invalid fields', fields: errors })

  const enquiry: Enquiry = data
  const links = {
    siteUrl: site.url,
    contactEmail: site.email,
    bookUrl: site.bookingUrl || `${site.url}/contact#book`,
  }
  const toStudio = studioEmail(enquiry, links)
  const toSender = confirmationEmail(enquiry, links)

  const resend = new Resend(RESEND_API_KEY)
  const { error } = await resend.batch.send([
    {
      from: CONTACT_FROM,
      to: CONTACT_TO.split(',').map((s) => s.trim()).filter(Boolean),
      replyTo: data.email,
      ...toStudio,
    },
    {
      from: CONTACT_FROM,
      to: [data.email],
      replyTo: site.email,
      ...toSender,
    },
  ])

  if (error) {
    console.error('[contact] Resend error', error)
    return json(502, { ok: false, error: 'Could not send right now' })
  }
  return json(200, { ok: true })
}

export const config: Config = { path: '/api/contact' }
