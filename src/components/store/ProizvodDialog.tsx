import { X } from 'lucide-react'
import type { Proizvod } from '../../types'
import { useDialog } from '../../hooks/useDialog'
import { Media, MediaOkvir } from '../ui/Media'
import { Cijena } from '../ui/Cijena'
import { DodajGumb } from './DodajGumb'
import { useStore } from '../../context/StoreContext'
import { crediti } from '../../lib/format'

interface Props {
  proizvod: Proizvod | null
  zatvori: () => void
}

export function ProizvodDialog({ proizvod, zatvori }: Props) {
  const otvoren = proizvod !== null
  const ref = useDialog<HTMLDivElement>(otvoren, zatvori)
  const { crediti: stanje } = useStore()

  return (
    <>
      <div
        aria-hidden="true"
        onClick={zatvori}
        className={`fixed inset-0 bg-ink-000/85 transition-opacity duration-200 ${
          otvoren ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        style={{ zIndex: 'var(--z-drawer-scrim)' }}
      />

      <div
        className="pointer-events-none fixed inset-0 flex items-end justify-center p-0 sm:items-center sm:p-6"
        style={{ zIndex: 'var(--z-drawer)' }}
      >
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label={proizvod ? `Detalji: ${proizvod.naziv}` : 'Detalji proizvoda'}
          tabIndex={-1}
          // A modal is not anchored to a trigger, so it scales from its own
          // centre. Never from scale(0): nothing appears out of nothing.
          className={`pointer-events-auto max-h-[92dvh] w-full max-w-3xl overflow-y-auto overscroll-contain border border-line bg-ink-010 outline-none transition-[opacity,transform] ${
            otvoren
              ? 'translate-y-0 scale-100 opacity-100 duration-[280ms] ease-[cubic-bezier(0.32,0.72,0,1)]'
              : 'pointer-events-none translate-y-4 scale-[0.98] opacity-0 duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]'
          }`}
          style={{ transformOrigin: 'center' }}
        >
          {proizvod && (
            <>
              <div className="relative">
                <MediaOkvir intenzitet="srednje" className="aspect-[2/1]">
                  <Media
                    id={proizvod.slika}
                    alt={proizvod.alt}
                    sirina={960}
                    visina={480}
                    sizes="(min-width: 768px) 48rem, 100vw"
                  />
                </MediaOkvir>

                <button
                  type="button"
                  onClick={zatvori}
                  aria-label="Zatvori detalje"
                  className="u-press absolute top-3 right-3 z-10 flex size-11 cursor-pointer items-center justify-center border border-line-strong bg-ink-000/80 text-dim hover:text-text"
                >
                  <X aria-hidden="true" strokeWidth={1.5} className="size-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <p className="u-num text-[0.6875rem] text-muted">{proizvod.id}</p>
                <h2 className="u-d3 mt-2 normal-case tracking-tight">{proizvod.naziv}</h2>

                <p className="mt-4 max-w-[62ch] leading-relaxed text-dim">{proizvod.detalj}</p>

                <dl className="mt-7 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
                  {proizvod.specifikacije.map((s) => (
                    <div key={s.labela} className="bg-ink-010 px-4 py-3.5">
                      <dt className="u-label text-muted">{s.labela}</dt>
                      <dd className="u-num mt-1.5 text-sm text-text">{s.vrijednost}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-7 flex flex-wrap items-end justify-between gap-5 border-t border-line pt-6">
                  <div>
                    <p className="u-label text-muted">Cijena</p>
                    <div className="mt-1.5">
                      <Cijena iznos={proizvod.cijena} velicina="lg" />
                    </div>
                    <p className="mt-2 text-[0.75rem] text-muted">
                      {proizvod.cijena > stanje
                        ? `Nedostaje ti ${crediti(proizvod.cijena - stanje)}.`
                        : `Nakon kupnje ostaje ti ${crediti(stanje - proizvod.cijena)}.`}
                    </p>
                  </div>

                  <DodajGumb proizvod={proizvod} velicina="md" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
