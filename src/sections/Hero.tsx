import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Arrow, BookButton, MaskLines } from '../components/ui'
import { TLink } from '../components/Transition'
import { site } from '../content/site'
import { motionEnabled, prefersReducedMotion } from '../lib/motion'

gsap.registerPlugin(ScrollTrigger)

/** Static architectural fallback: shown instantly, and kept if WebGL is unavailable. */
function FallbackArt() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="1600" height="1000" fill="var(--color-paper)" />
      {/* long diagonal window shadows */}
      <g fill="var(--color-graphite)" opacity="0.05">
        <polygon points="560,0 700,0 1180,1000 1040,1000" />
        <polygon points="820,0 900,0 1380,1000 1300,1000" />
        <polygon points="1040,0 1180,0 1660,1000 1520,1000" />
      </g>
      {/* floating steps + their cast shadows */}
      {Array.from({ length: 9 }).map((_, i) => {
        const x = 880 + i * 72
        const y = 760 - i * 62
        return (
          <g key={i}>
            <polygon
              points={`${x + 10},${y + 14} ${x + 96},${y + 14} ${x + 166},${y + 104} ${x + 80},${y + 104}`}
              fill="var(--color-graphite)"
              opacity="0.06"
            />
            <rect x={x} y={y} width="92" height="14" fill="var(--color-bone)" />
            <rect x={x} y={y + 14} width="92" height="3" fill="var(--color-shadow)" />
          </g>
        )
      })}
    </svg>
  )
}

function HeroBackdrop() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const useVideo = Boolean(site.heroVideo.mp4)

  useEffect(() => {
    if (useVideo) {
      const v = videoRef.current
      if (v && !prefersReducedMotion()) v.play().catch(() => {})
      return
    }
    let dispose: (() => void) | undefined
    let cancelled = false
    const start = async () => {
      if (cancelled || !sceneRef.current) return
      const mod = await import('./HeroScene')
      if (cancelled || !sceneRef.current || !mod.webglAvailable()) return
      dispose = mod.mountHeroScene(sceneRef.current, {
        reduced: prefersReducedMotion(),
        onReady: () => setReady(true),
      })
    }
    const ric =
      (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
        .requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200))
    const boot = () => ric(() => void start().catch(() => {}), { timeout: 2500 })

    // Desktop: load on idle after the page loads. Phones/tablets: wait for the first
    // interaction so the 3D scene never competes with first paint and input.
    const desktop = window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches
    const events = ['pointerdown', 'touchstart', 'scroll', 'keydown', 'wheel'] as const
    let kicked = false
    const kick = () => {
      if (kicked) return
      kicked = true
      events.forEach((e) => window.removeEventListener(e, kick))
      boot()
    }
    const onLoad = () => (desktop ? kick() : events.forEach((e) => window.addEventListener(e, kick, { once: true, passive: true })))
    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad, { once: true })
    return () => {
      cancelled = true
      window.removeEventListener('load', onLoad)
      events.forEach((e) => window.removeEventListener(e, kick))
      dispose?.()
    }
  }, [useVideo])

  return (
    <div className="hero-backdrop absolute inset-0 overflow-hidden" aria-hidden="true">
      <FallbackArt />
      {useVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          poster={site.heroVideo.poster || undefined}
        >
          {site.heroVideo.webm && <source src={site.heroVideo.webm} type="video/webm" />}
          <source src={site.heroVideo.mp4} type="video/mp4" />
        </video>
      ) : (
        <div
          ref={sceneRef}
          className="absolute inset-0 transition-opacity duration-[1600ms] ease-reveal"
          style={{ opacity: ready ? 1 : 0 }}
        />
      )}
    </div>
  )
}

export function Hero() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!motionEnabled() || !rootRef.current) return
    const ctx = gsap.context(() => {
      const st = { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to('.hero-backdrop', { yPercent: 14, ease: 'none', scrollTrigger: st })
      gsap.to('.hero-content', { yPercent: -10, ease: 'none', scrollTrigger: st })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <HeroBackdrop />
      <div className="hero-content shell relative z-10 flex min-h-[100svh] flex-col justify-end pb-[clamp(2.5rem,8vh,5.5rem)] pt-[calc(var(--nav-height)+3rem)]">
        <p className="label muted hero-fade mb-6 md:mb-8" style={{ '--d': '80ms' } as CSSProperties}>
          Marketing studio — Vancouver, BC
        </p>
        <MaskLines
          as="h1"
          id="hero-title"
          hero
          className="t-mega max-w-[11ch]"
          lines={[
            'Growth that',
            <>
              flows<span className="text-signal">.</span>
            </>,
          ]}
        />
        <div className="grid-12 mt-8 items-end gap-y-8 md:mt-12">
          <p
            className="t-lead hero-fade col-span-12 max-w-[34rem] text-graphite md:col-span-6 lg:col-span-5"
            style={{ '--d': '420ms' } as CSSProperties}
          >
            A Vancouver marketing studio for brands ready to rise. Brand, websites and performance marketing, without
            the noise.
          </p>
          <div
            className="hero-fade col-span-12 flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-6 md:justify-end lg:col-span-7"
            style={{ '--d': '540ms' } as CSSProperties}
          >
            <BookButton className="btn-lg" />
            <TLink to="/#work" className="link-arrow text-[1.0625rem]">
              See our work <Arrow />
            </TLink>
          </div>
        </div>
      </div>
    </section>
  )
}
