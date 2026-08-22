import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import type { Proizvod } from '../../types'
import { useStore } from '../../context/StoreContext'
import { Button } from '../ui/Button'

/**
 * Add to cart.
 *
 * The label swap runs behind a 2px blur. Without it you see two distinct strings
 * overlapping mid-crossfade, which reads as a glitch; the blur bridges them so
 * the eye perceives one label changing rather than two labels swapping.
 *
 * The button keeps its width across both states so nothing beside it moves.
 */
export function DodajGumb({
  proizvod,
  velicina = 'sm',
  className = '',
}: {
  proizvod: Proizvod
  velicina?: 'sm' | 'md'
  className?: string
}) {
  const { dodaj, uKosarici } = useStore()
  const [potvrda, setPotvrda] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const kolicina = uKosarici(proizvod.id)
  const bezCijene = proizvod.cijena === null

  function naKlik() {
    if (bezCijene) return
    dodaj(proizvod)
    setPotvrda(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setPotvrda(false), 1400)
  }

  if (bezCijene) {
    return (
      <Button
        aria-disabled="true"
        onClick={(e) => e.preventDefault()}
        velicina={velicina}
        varijanta="sekundarno"
        className={`text-dim ${className}`}
      >
        Cijena uskoro
      </Button>
    )
  }

  return (
    <Button
      onClick={naKlik}
      velicina={velicina}
      varijanta="sekundarno"
      className={`relative overflow-hidden ${className}`}
      aria-label={
        kolicina > 0
          ? `Dodaj još jedan ${proizvod.naziv} u košaricu, trenutno ${kolicina} u košarici`
          : `Dodaj ${proizvod.naziv} u košaricu`
      }
    >
      {/* Both labels occupy the same box, so the button never resizes. */}
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        Dodaj u košaricu
      </span>

      <span
        aria-hidden="true"
        className={`absolute inset-0 flex items-center justify-center whitespace-nowrap transition-[opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          potvrda ? 'opacity-0 blur-[2px]' : 'opacity-100 blur-0'
        }`}
      >
        {kolicina > 0 ? `U košarici (${kolicina})` : 'Dodaj u košaricu'}
      </span>

      <span
        aria-hidden="true"
        className={`absolute inset-0 flex items-center justify-center gap-1.5 whitespace-nowrap text-red transition-[opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          potvrda ? 'opacity-100 blur-0' : 'opacity-0 blur-[2px]'
        }`}
      >
        <Check strokeWidth={2} className="size-4" />
        Dodano
      </span>
    </Button>
  )
}
