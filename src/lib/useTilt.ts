import { gsap } from 'gsap'
import { useEffect, type RefObject } from 'react'
import { motionEnabled } from './motion'

/**
 * Subtle 3D tilt that follows the pointer. Mouse/trackpad only (no touch),
 * and off for reduced motion. `max` is the tilt in degrees.
 */
export function useTilt(ref: RefObject<HTMLElement | null>, max = 6) {
  useEffect(() => {
    const el = ref.current
    if (!el || !motionEnabled() || !window.matchMedia('(pointer: fine)').matches) return
    gsap.set(el, { transformPerspective: 900, transformStyle: 'preserve-3d' })
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' })
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      rx(-py * max)
      ry(px * max)
    }
    const leave = () => {
      rx(0)
      ry(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [ref, max])
}
