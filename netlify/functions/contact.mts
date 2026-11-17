/**
 * Contact form → email, via Resend. Served at POST /api/contact.
 *
 * Environment variables (Netlify → Site configuration → Environment variables):
 *   RESEND_API_KEY  Resend API key (re_…). Secret: never put it in front-end code.
 *   CONTACT_FROM    Optional. Sender on the verified domain (default "AVRA Website <website@thinkavra.com>")
 *   CONTACT_TO      Optional. Inbox(es) for enquiries, comma-separated (default mohammadhilalmalik@gmail.com)
 */
import type { Config } from '@netlify/functions'
import { Resend } from 'resend'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const LIMITS = { name: 120, email: 200, business: 160, need: 60, budget: 60, message: 5000 } as const
type Field = keyof typeof LIMITS

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export default async (req: Request) => {
  if (req.method !== 'POST') return json(405, { ok: false, error: 'Method not allowed' })

  const { RESEND_API_KEY } = process.env
  const CONTACT_TO = process.env.CONTACT_TO || 'mohammadhilalmalik@gmail.com'
  // Any address on the verified thinkavra.com domain works as a sender; it needs no mailbox.
  const CONTACT_FROM = process.env.CONTACT_FROM || 'AVRA Website <website@thinkavra.com>'
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

  // Honeypot filled in: pretend success so bots learn nothing.
  if (typeof raw.company_website === 'string' && raw.company_website.trim()) return json(200, { ok: true })

  const data = {} as Record<Field, string>
  for (const key of Object.keys(LIMITS) as Field[]) {
    const v = typeof raw[key] === 'string' ? (raw[key] as string).trim() : ''
    data[key] = v.slice(0, LIMITS[key])
  }

  const errors: string[] = []
  if (!data.name) errors.push('name')
  if (!EMAIL_RE.test(data.email)) errors.push('email')
  if (!data.need) errors.push('need')
  if (!data.message) errors.push('message')
  if (errors.length) return json(400, { ok: false, error: 'Missing or invalid fields', fields: errors })

  const rows: [string, string][] = [
    ['Name', data.name],
    ['Email', data.email],
    ['Business', data.business || '—'],
    ['Needs', data.need],
    ['Budget', data.budget || '—'],
  ]

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#111;max-width:560px">
      <p style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#5f5f5b;margin:0 0 16px">New enquiry · avra website</p>
      <table style="border-collapse:collapse;width:100%;font-size:15px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 16px 8px 0;border-top:1px solid #d9d8d4;color:#5f5f5b;width:110px">${k}</td><td style="padding:8px 0;border-top:1px solid #d9d8d4">${escape(v)}</td></tr>`,
          )
          .join('')}
      </table>
      <p style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#5f5f5b;margin:24px 0 8px">Message</p>
      <p style="font-size:15px;line-height:1.55;white-space:pre-wrap;margin:0">${escape(data.message)}</p>
    </div>`
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nMessage:\n${data.message}`

  const resend = new Resend(RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: CONTACT_FROM,
    to: CONTACT_TO.split(',').map((s) => s.trim()).filter(Boolean),
    replyTo: data.email,
    subject: `New enquiry: ${data.name}${data.business ? ` (${data.business})` : ''} · ${data.need}`,
    html,
    text,
  })

  if (error) {
    console.error('[contact] Resend error', error)
    return json(502, { ok: false, error: 'Could not send right now' })
  }
  return json(200, { ok: true })
}

export const config: Config = { path: '/api/contact' }
