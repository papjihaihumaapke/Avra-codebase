import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { finishIntro } from '../lib/intro'
import { motionEnabled } from '../lib/motion'
import { lockScroll } from '../lib/smooth'

/**
 * First-visit preloader: a counter runs to 100 while the wordmark letters rise,
 * then the panel lifts away. Shown once per session, never with reduced motion.
 * Visibility is decided before paint by the inline script in index.html (.no-preload).
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const skip = !el || !motionEnabled() || document.documentElement.classList.contains('no-preload')
    if (skip) {
      if (el) el.style.display = 'none'
      finishIntro()
      return
    }
    try {
      sessionStorage.setItem('avra-seen', '1')
    } catch {
      /* private mode: show it again next time, that's fine */
    }
    lockScroll(true)
    const count = el.querySelector<HTMLElement>('.preloader__count')!
    const counter = { v: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        el.style.display = 'none'
        document.documentElement.classList.add('no-preload')
      },
    })
    tl.from(el.querySelectorAll('.preloader__letter'), {
      yPercent: 110,
      duration: 0.9,
      ease: 'avra',
      stagger: 0.07,
    })
      .to(
        counter,
        {
          v: 100,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: () => (count.textContent = String(Math.round(counter.v)).padStart(3, '0')),
        },
        0,
      )
      .to(el.querySelector('.preloader__bar'), { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0)
      .to(el.querySelectorAll('.preloader__letter'), { yPercent: -110, duration: 0.6, ease: 'power3.in', stagger: 0.04 })
      .add(() => {
        lockScroll(false)
        finishIntro()
      })
      .to(el, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'avraInOut' }, '<0.1')
    return () => {
      tl.kill()
      lockScroll(false)
    }
  }, [])

  return (
    <div ref={ref} className="preloader" aria-hidden="true">
      <div className="preloader__word">
        {'AVRA'.split('').map((l, i) => (
          <span key={i} className="mask">
            <span className="preloader__letter">{l}</span>
          </span>
        ))}
      </div>
      <div className="preloader__foot">
        <span className="label">Growth that flows</span>
        <span className="preloader__count">000</span>
      </div>
      <div className="preloader__bar" />
    </div>
  )
}
