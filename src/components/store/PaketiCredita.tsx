import { PAKETI_CREDITA } from '../../data/paketi'
import { creditRijec, formatirajBroj } from '../../lib/format'
import { NadoplatiGumb } from './NadoplatiGumb'

/**
 * The seven top-up bundles. Each is its own card so the euro price and the
 * credit amount it buys sit next to each other — the whole point of this grid
 * is letting someone compare packs before Tebex is wired in.
 */
export function PaketiCredita({ className = '' }: { className?: string }) {
  return (
    <div
      className={`grid gap-4 ${className}`}
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(13rem, 100%), 1fr))' }}
    >
      {PAKETI_CREDITA.map((p) => (
        <div key={p.id} className="flex flex-col border border-line bg-ink-010 p-5">
          <p className="u-num text-[0.6875rem] text-muted">{p.id}</p>
          <p className="u-num mt-3 text-2xl font-medium text-text">{p.eur} €</p>
          <p className="mt-1 text-[0.8125rem] text-dim">
            {formatirajBroj(p.crediti)} {creditRijec(p.crediti)}
          </p>
          <NadoplatiGumb className="mt-5" />
        </div>
      ))}
    </div>
  )
}
