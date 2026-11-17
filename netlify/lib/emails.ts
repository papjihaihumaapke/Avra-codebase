/**
 * Branded HTML emails for the contact form, set in the website's style:
 * paper and graphite, giant uppercase headlines, italic serif accents, red signal
 * and bordered pill buttons. Table layout + inline styles so Gmail, Outlook and
 * Apple Mail all render it; web fonts load where supported (Apple Mail), with
 * Helvetica/Georgia as the fallback everywhere else.
 */

export type Enquiry = {
  name: string
  email: string
  business: string
  need: string
  budget: string
  message: string
}

const C = {
  paper: '#F2F1EE',
  bone: '#FAFAF8',
  line: '#D9D8D4',
  ink: '#111111',
  stone: '#5F5F5B',
  stoneDark: '#8A8A86',
  signal: '#D9372B',
}
const SANS = `'Inter Tight','Helvetica Neue',Helvetica,Arial,sans-serif`
const SERIF = `'Instrument Serif',Georgia,'Times New Roman',serif`
const MONO = `'Geist Mono',ui-monospace,Menlo,Consolas,monospace`

export const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

const label = (text: string, color = C.stone) =>
  `<p style="margin:0;font-family:${MONO};font-size:11px;line-height:1.4;letter-spacing:.16em;text-transform:uppercase;color:${color}">${text}</p>`

/** Label chip + arrow chip, like the site's pills. */
const pill = (href: string, text: string, dark: boolean) => {
  const bg = dark ? C.ink : C.bone
  const fg = dark ? C.paper : C.ink
  const cell = `white-space:nowrap;border:1px solid ${C.ink};border-radius:7px;background:${bg};font-family:${SANS};font-weight:600;font-size:15px;line-height:1;letter-spacing:-.02em;text-transform:uppercase`
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate"><tr>
    <td style="${cell};padding:10px 12px"><a href="${href}" style="color:${fg};text-decoration:none">${text}</a></td>
    <td style="width:3px"></td>
    <td style="${cell};padding:10px 10px"><a href="${href}" style="color:${fg};text-decoration:none">&rarr;</a></td>
  </tr></table>`
}

function layout({
  preheader,
  hero,
  body,
  siteUrl,
  contactEmail,
}: {
  preheader: string
  hero: string
  body: string
  siteUrl: string
  contactEmail: string
}) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light">
<title>AVRA</title>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<style>
  @media (max-width:620px){
    .px{padding-left:24px!important;padding-right:24px!important}
    .h1{font-size:44px!important}
    .stack>td{display:block!important;width:auto!important;padding-right:0!important}
    .stack>td.v{border-top:0!important;padding-top:0!important;padding-bottom:16px!important}
    .stack>td.gap{height:10px!important}
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.paper};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.paper}">
<tr><td align="center" style="padding:32px 12px">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px">
    <tr><td style="background:${C.ink};border-radius:4px 4px 0 0">${hero}</td></tr>
    <tr><td class="px" style="background:${C.paper};padding:40px 48px 8px">${body}</td></tr>
    <tr><td class="px" style="padding:40px 48px 8px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${C.ink}">
        <tr>
          <td style="padding-top:16px">${label('AVRA · Vancouver, BC')}</td>
          <td align="right" style="padding-top:16px">
            <a href="${siteUrl}" style="font-family:${MONO};font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:${C.stone};text-decoration:none">${siteUrl.replace(/^https?:\/\//, '')}</a>
          </td>
        </tr>
        <tr><td colspan="2" style="padding-top:10px">
          <a href="mailto:${contactEmail}" style="font-family:${SANS};font-size:13px;color:${C.stone};text-decoration:none">${contactEmail}</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`
}

/** Dark hero band: wordmark, label, giant uppercase line, italic serif line. */
function hero({ siteUrl, tag, big, italic, accent = false }: { siteUrl: string; tag: string; big: string; italic: string; accent?: boolean }) {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td class="px" style="padding:28px 48px 0">
        <a href="${siteUrl}"><img src="${siteUrl}/email/avra-wordmark-paper.png" width="96" height="24" alt="AVRA" style="display:block;border:0;width:96px;height:auto"></a>
      </td>
      <td class="px" align="right" style="padding:28px 48px 0">${label(tag, C.stoneDark)}</td>
    </tr>
    <tr><td colspan="2" class="px" style="padding:64px 48px 0">
      <h1 class="h1" style="margin:0;font-family:${SANS};font-weight:600;font-size:60px;line-height:.9;letter-spacing:-.05em;text-transform:uppercase;color:${accent ? C.signal : C.paper}">${big}</h1>
    </td></tr>
    <tr><td colspan="2" class="px" style="padding:14px 48px 44px">
      <p style="margin:0;font-family:${SERIF};font-style:italic;font-size:28px;line-height:1.1;letter-spacing:-.01em;color:${C.paper}">${italic}</p>
    </td></tr>
    <tr><td colspan="2" style="height:4px;background:${C.signal};font-size:0;line-height:0">&nbsp;</td></tr>
  </table>`
}

/** Hairline rows: LABEL ........ value */
const rows = (items: [string, string][]) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    ${items
      .map(
        ([k, v]) => `<tr class="stack">
      <td style="width:140px;padding:14px 16px 14px 0;border-top:1px solid ${C.line};vertical-align:top">${label(k)}</td>
      <td class="v" style="padding:13px 0;border-top:1px solid ${C.line};font-family:${SANS};font-weight:500;font-size:17px;line-height:1.35;letter-spacing:-.02em;color:${C.ink}">${v}</td>
    </tr>`,
      )
      .join('')}
    <tr><td colspan="2" style="border-top:1px solid ${C.line};font-size:0;line-height:0">&nbsp;</td></tr>
  </table>`

/* ------------------------------------------------------------------ To AVRA */

export function studioEmail(e: Enquiry, opts: { siteUrl: string; contactEmail: string }) {
  const first = e.name.split(/\s+/)[0]
  const html = layout({
    ...opts,
    preheader: escape(`${e.name} · ${e.need}${e.budget ? ` · ${e.budget}` : ''}: ${e.message.slice(0, 90)}`),
    hero: hero({
      siteUrl: opts.siteUrl,
      tag: 'New enquiry',
      big: escape(e.name),
      italic: `wants help with <span style="color:${C.signal}">${escape(e.need.toLowerCase())}</span>.`,
    }),
    body: `
      ${rows([
        ['Email', `<a href="mailto:${escape(e.email)}" style="color:${C.ink}">${escape(e.email)}</a>`],
        ['Business', escape(e.business) || '<span style="color:#8A8A86">Not given</span>'],
        ['Needs', escape(e.need)],
        ['Budget', escape(e.budget) || '<span style="color:#8A8A86">Not given</span>'],
      ])}
      <div style="height:36px"></div>
      ${label('Message')}
      <div style="margin-top:12px;background:${C.bone};border:1px solid ${C.line};padding:24px 24px 22px">
        <p style="margin:0;font-family:${SERIF};font-size:22px;line-height:1.3;color:${C.ink};white-space:pre-wrap">${escape(e.message)}</p>
      </div>
      <div style="height:32px"></div>
      ${pill(`mailto:${escape(e.email)}?subject=${encodeURIComponent('Re: your enquiry to AVRA')}`, `Reply to ${escape(first)}`, true)}
      <p style="margin:18px 0 0;font-family:${SANS};font-size:13px;color:${C.stone}">Or just hit reply: it goes straight to ${escape(e.email)}.</p>`,
  })
  const text = [
    `NEW ENQUIRY: ${e.name}`,
    '',
    `Email:    ${e.email}`,
    `Business: ${e.business || '-'}`,
    `Needs:    ${e.need}`,
    `Budget:   ${e.budget || '-'}`,
    '',
    'Message:',
    e.message,
  ].join('\n')
  return {
    subject: `New enquiry: ${e.name}${e.business ? ` (${e.business})` : ''} · ${e.need}`,
    html,
    text,
  }
}

/* ------------------------------------------------------------- To the sender */

/**
 * Confirmation to the person who wrote in. Deliberately does NOT repeat their
 * message (so the form can't be used to send arbitrary text to anyone), and only
 * uses a cleaned-up first name.
 */
export function confirmationEmail(e: Enquiry, opts: { siteUrl: string; contactEmail: string; bookUrl: string }) {
  const first = safeFirstName(e.name)
  const html = layout({
    ...opts,
    preheader: 'We have your message and will reply within two working days.',
    hero: hero({
      siteUrl: opts.siteUrl,
      tag: 'Message received',
      big: first ? `Thanks,<br>${escape(first)}.` : 'Thank you.',
      italic: 'We’ve got your message.',
    }),
    body: `
      <p style="margin:0;font-family:${SERIF};font-style:italic;font-size:26px;line-height:1.15;letter-spacing:-.01em;color:${C.ink}">
        A real person at the studio will read it and reply within <span style="color:${C.signal}">two working days</span>.
      </p>
      <div style="height:36px"></div>
      ${label('What you told us')}
      <div style="height:10px"></div>
      ${rows([
        ['Needs', escape(e.need)],
        ['Budget', escape(e.budget) || 'Not given yet'],
      ])}
      <div style="height:40px"></div>
      <h2 style="margin:0;font-family:${SANS};font-weight:600;font-size:34px;line-height:.92;letter-spacing:-.045em;text-transform:uppercase;color:${C.ink}">Want to talk<br>sooner?</h2>
      <p style="margin:12px 0 22px;font-family:${SANS};font-size:15px;line-height:1.5;color:${C.stone}">Book a short, no-pressure call, or have a look at recent work while you wait.</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr class="stack">
        <td>${pill(opts.bookUrl, 'Book a call', true)}</td>
        <td class="gap" style="width:10px"></td>
        <td>${pill(`${opts.siteUrl}/work`, 'See our work', false)}</td>
      </tr></table>
      <p style="margin:28px 0 0;font-family:${SANS};font-size:13px;line-height:1.5;color:${C.stone}">
        Didn’t send this? You can ignore this email; nothing else will be sent.
      </p>`,
  })
  const text = [
    first ? `Thanks, ${first}.` : 'Thank you.',
    '',
    'We’ve got your message. A real person at the studio will reply within two working days.',
    '',
    `Needs: ${e.need}`,
    `Budget: ${e.budget || 'Not given yet'}`,
    '',
    `Want to talk sooner? Book a call: ${opts.bookUrl}`,
    `See our work: ${opts.siteUrl}/work`,
    '',
    `AVRA · Vancouver, BC · ${opts.contactEmail}`,
    '',
    'Didn’t send this? You can ignore this email; nothing else will be sent.',
  ].join('\n')
  return { subject: 'Thanks, we’ve got your message · AVRA', html, text }
}

/** First word of the name, letters only, max 24 chars; empty if it looks like a link or junk. */
function safeFirstName(name: string) {
  if (/https?:|www\.|\.[a-z]{2,}\b|@/i.test(name)) return ''
  const first = name.trim().split(/\s+/)[0] ?? ''
  const clean = first.replace(/[^\p{L}'’-]/gu, '').slice(0, 24)
  return clean.length >= 2 ? clean : ''
}
