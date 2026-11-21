import { Fragment, type ReactNode } from 'react'
import { TLink } from './Transition'

/** Renders the tiny inline syntax used in content files: [text](href) and **bold**. */
export function Rich({ text }: { text: string }) {
  const out: ReactNode[] = []
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    if (m[1]) {
      const href = m[2]
      out.push(
        href.startsWith('/') ? (
          <TLink key={k++} to={href} className="prose__link">
            {m[1]}
          </TLink>
        ) : (
          <a key={k++} href={href} target="_blank" rel="noopener noreferrer" className="prose__link">
            {m[1]}
          </a>
        ),
      )
    } else {
      out.push(<strong key={k++}>{m[3]}</strong>)
    }
    last = re.lastIndex
  }
  if (last < text.length) out.push(text.slice(last))
  return <Fragment>{out}</Fragment>
}
