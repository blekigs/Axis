import { useEffect, useRef } from 'react'

const FOKUSIRAJUCI = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * Everything an overlay needs to be keyboard-correct: focus moves in, Tab is
 * trapped, Escape closes, the page behind does not scroll, and focus returns to
 * whatever opened it.
 *
 * Shared by the cart drawer, the mobile menu and the gallery viewer so all three
 * behave identically.
 */
export function useDialog<T extends HTMLElement = HTMLDivElement>(
  otvoren: boolean,
  zatvori: () => void
) {
  const ref = useRef<T>(null)
  const prethodniFokus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!otvoren) return
    const spremnik = ref.current
    if (!spremnik) return

    prethodniFokus.current = document.activeElement as HTMLElement | null

    // Focus the panel itself rather than its first control, so a screen reader
    // reads the dialog label before it reads a button.
    spremnik.focus({ preventScroll: true })

    const sirinaTrake = window.innerWidth - document.documentElement.clientWidth
    const { overflow, paddingRight } = document.body.style
    document.body.style.overflow = 'hidden'
    if (sirinaTrake > 0) document.body.style.paddingRight = `${sirinaTrake}px`

    function naTipku(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.stopPropagation()
        zatvori()
        return
      }
      if (e.key !== 'Tab') return

      const meta = Array.from(spremnik!.querySelectorAll<HTMLElement>(FOKUSIRAJUCI)).filter(
        (el) => el.offsetParent !== null
      )
      if (meta.length === 0) {
        e.preventDefault()
        return
      }

      const prvi = meta[0]
      const zadnji = meta[meta.length - 1]
      const aktivni = document.activeElement

      if (e.shiftKey && (aktivni === prvi || aktivni === spremnik)) {
        e.preventDefault()
        zadnji.focus()
      } else if (!e.shiftKey && aktivni === zadnji) {
        e.preventDefault()
        prvi.focus()
      }
    }

    document.addEventListener('keydown', naTipku)

    return () => {
      document.removeEventListener('keydown', naTipku)
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
      prethodniFokus.current?.focus({ preventScroll: true })
    }
  }, [otvoren, zatvori])

  return ref
}
