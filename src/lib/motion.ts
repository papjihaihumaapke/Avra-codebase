/** Motion helpers. Values come from CSS tokens (src/styles/tokens.css). */

const isBrowser = typeof window !== 'undefined'

export function prefersReducedMotion(): boolean {
  if (!isBrowser) return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** True when the inline boot script enabled motion (JS on, no reduced-motion). */
export function motionEnabled(): boolean {
  if (!isBrowser) return false
  return document.documentElement.classList.contains('motion-ok') && !prefersReducedMotion()
}

function readVar(name: string, fallback: string): string {
  if (!isBrowser) return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

function ms(name: string, fallback: number): number {
  const v = readVar(name, '')
  const n = parseFloat(v)
  return Number.isFinite(n) ? n : fallback
}

export const motion = {
  get easeReveal() {
    return readVar('--gsap-ease-reveal', 'expo.out')
  },
  get easeMove() {
    return readVar('--gsap-ease-move', 'power3.inOut')
  },
  /** seconds */
  get durReveal() {
    return ms('--dur-reveal', 1100) / 1000
  },
  get durWipe() {
    return ms('--dur-wipe', 520) / 1000
  },
  get stagger() {
    return ms('--stagger', 50) / 1000
  },
}
