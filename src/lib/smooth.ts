/**
 * Smooth scrolling (Lenis) driven by GSAP's ticker, so scroll position, ScrollTrigger
 * and every scrubbed animation update in the same frame. Disabled for reduced motion.
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

export function startSmoothScroll(): () => void {
  if (lenis) return () => {}
  lenis = new Lenis({ lerp: 0.12, smoothWheel: true, wheelMultiplier: 1 })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

/** Scroll to a y position or element. Falls back to native scrolling without Lenis. */
export function scrollToTarget(target: number | HTMLElement, opts: { immediate?: boolean } = {}) {
  const offset = typeof target === 'number' ? 0 : -72
  if (lenis) {
    lenis.scrollTo(target, { offset, immediate: opts.immediate, duration: 1.1, force: true })
    return
  }
  const y = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top: y, behavior: opts.immediate ? 'auto' : 'smooth' })
}

export function lockScroll(locked: boolean) {
  if (locked) lenis?.stop()
  else lenis?.start()
}
