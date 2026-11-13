import { useEffect } from 'react'

/**
 * Adds `.is-in` to every [data-reveal] element when it scrolls into view.
 * A MutationObserver picks up elements added later (route changes, filters).
 */
export function useRevealObserver() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'))
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
      { rootMargin: '0px 0px -10% 0px', threshold: 0.01 },
    )
    // Anything already on screen at boot is shown immediately (no hide/flash), so first-screen
    // content paints straight from the prerendered HTML. Hidden states switch on afterwards.
    const vh = window.innerHeight
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.getBoundingClientRect().top < vh) el.classList.add('is-in')
    })
    document.documentElement.classList.add('reveal-on')

    const scan = (root: ParentNode) =>
      root.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el))
    scan(document)

    let queued = false
    const mo = new MutationObserver(() => {
      if (queued) return
      queued = true
      requestAnimationFrame(() => {
        queued = false
        scan(document)
      })
    })
    mo.observe(document.getElementById('main') ?? document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}
