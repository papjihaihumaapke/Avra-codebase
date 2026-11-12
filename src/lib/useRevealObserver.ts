import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Observes every [data-reveal] element on the current route and adds `.is-in`
 * when it scrolls into view. CSS handles the actual animation.
 */
export function useRevealObserver() {
  const { pathname } = useLocation()

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])
}
