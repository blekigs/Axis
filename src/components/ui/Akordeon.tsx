import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import type { FaqStavka } from '../../data/sadrzaj'

/**
 * FAQ accordion.
 *
 * The panel animates on `grid-template-rows: 0fr -> 1fr`, which is the one way
 * to transition to auto height without measuring anything in JS. It also means
 * the answer text is always in the DOM for search and for find-in-page.
 */
export function Akordeon({ stavke }: { stavke: FaqStavka[] }) {
  const [otvoren, setOtvoren] = useState<number | null>(0)
  const osnovaId = useId()

  return (
    <div className="border-t border-line">
      {stavke.map((s, i) => {
        const jeOtvoren = otvoren === i
        const gumbId = `${osnovaId}-gumb-${i}`
        const panelId = `${osnovaId}-panel-${i}`

        return (
          <div key={s.pitanje} className="border-b border-line">
            <h3>
              <button
                id={gumbId}
                type="button"
                aria-expanded={jeOtvoren}
                aria-controls={panelId}
                onClick={() => setOtvoren(jeOtvoren ? null : i)}
                className="group flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left"
              >
                <span
                  className={`text-[0.9375rem] font-medium transition-colors duration-200 sm:text-base ${
                    jeOtvoren ? 'text-text' : 'text-dim group-hover:text-text'
                  }`}
                >
                  {s.pitanje}
                </span>
                <Plus
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className={`mt-0.5 size-5 shrink-0 transition-[transform,color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    jeOtvoren ? 'rotate-45 text-red' : 'text-muted group-hover:text-text'
                  }`}
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={gumbId}
              className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ gridTemplateRows: jeOtvoren ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p
                  className={`max-w-[68ch] pb-6 text-[0.9375rem] leading-relaxed text-dim transition-opacity duration-200 ${
                    jeOtvoren ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {s.odgovor}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
