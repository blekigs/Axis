import { useEffect, useRef } from 'react'

/**
 * Scroll reveal that cannot ship a blank page.
 *
 * The element is visible in markup. The hidden state is applied here, in an
 * effect, and only when an IntersectionObserver is actually available and the
 * user has not asked for reduced motion. If JS never runs, if the tab is
 * backgrounded, or if a headless renderer takes a snapshot, the content is
 * simply there.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') return

    // Already on screen at mount: leave it alone rather than flashing it out and back.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.9) return

    el.style.setProperty('--reveal-delay', `${delay}ms`)
    el.dataset.reveal = 'hidden'

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.reveal = 'shown'
            io.unobserve(el)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return ref
}
