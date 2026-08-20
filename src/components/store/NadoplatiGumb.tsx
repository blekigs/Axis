import { useId, useState } from 'react'
import { Button } from '../ui/Button'

/**
 * The Tebex placeholder.
 *
 * Deliberately a real `<button>` with `aria-disabled` rather than a dead link:
 * it stays in the tab order, so a keyboard or screen reader user gets the same
 * "not yet" explanation a mouse user gets from the tooltip. A disabled button
 * would be silently skipped instead.
 */
export function NadoplatiGumb({ className = '' }: { className?: string }) {
  const [vidljiv, setVidljiv] = useState(false)
  const id = useId()

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setVidljiv(true)}
      onMouseLeave={() => setVidljiv(false)}
    >
      <Button
        varijanta="sekundarno"
        aria-disabled="true"
        aria-describedby={id}
        onFocus={() => setVidljiv(true)}
        onBlur={() => setVidljiv(false)}
        onClick={(e) => e.preventDefault()}
        className={`w-full text-dim ${className}`}
      >
        Nadoplati credite
      </Button>

      <span
        id={id}
        role="tooltip"
        className={`pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 w-max max-w-[18rem] -translate-x-1/2 border border-line-strong bg-ink-020 px-3 py-2 text-[0.75rem] text-dim transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          vidljiv ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
        }`}
        // Origin at the bottom centre, so it scales out of the button it belongs to.
        style={{ transformOrigin: 'bottom center' }}
      >
        Uskoro, putem Tebex-a
      </span>
    </span>
  )
}
