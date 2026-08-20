import { Check } from 'lucide-react'
import type { Oznaka, Proizvod } from '../../types'
import { Media, MediaOkvir } from '../ui/Media'
import { Cijena } from '../ui/Cijena'
import { formatirajBroj } from '../../lib/format'
import { DodajGumb } from './DodajGumb'
import { useStore } from '../../context/StoreContext'

const OZNAKE: Record<Oznaka, string> = {
  novo: 'Novo',
  ograniceno: 'Ograničeno',
  popularno: 'Najtraženije',
}

interface Props {
  proizvod: Proizvod
  onOtvori: (p: Proizvod) => void
}

export function ProizvodCard({ proizvod, onOtvori }: Props) {
  const { kupljeno, crediti } = useStore()
  const vecKupljeno = kupljeno.includes(proizvod.id)
  const preskupo = proizvod.cijena > crediti

  return (
    <article className="u-lift group flex h-full flex-col border border-line bg-ink-010 hover:border-line-strong">
      <button
        type="button"
        onClick={() => onOtvori(proizvod)}
        className="block cursor-pointer text-left"
        aria-label={`Detalji: ${proizvod.naziv}`}
      >
        <MediaOkvir intenzitet="lagano" className="aspect-[16/10]">
          <Media
            id={proizvod.slika}
            alt={proizvod.alt}
            sirina={640}
            visina={400}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
            className="transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
          />

          {/* Status labels only. There is no decorative badge on any card. */}
          <div className="pointer-events-none absolute top-0 left-0 z-10 flex flex-col items-start">
            {proizvod.oznaka && (
              <span className="u-label bg-red px-2.5 py-1.5 text-ink-000">
                {OZNAKE[proizvod.oznaka]}
              </span>
            )}
            {vecKupljeno && (
              <span className="u-label flex items-center gap-1.5 bg-ink-000/90 px-2.5 py-1.5 text-dim">
                <Check aria-hidden="true" strokeWidth={2} className="size-3" />
                Kupljeno
              </span>
            )}
          </div>
        </MediaOkvir>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <p className="u-num text-[0.6875rem] text-muted">{proizvod.id}</p>

        <h3 className="mt-2 text-[1.0625rem] leading-tight normal-case tracking-normal">
          <button
            type="button"
            onClick={() => onOtvori(proizvod)}
            className="cursor-pointer text-left transition-colors duration-200 hover:text-red"
          >
            {proizvod.naziv}
          </button>
        </h3>

        <p className="mt-2 text-[0.875rem] leading-relaxed text-dim">{proizvod.opis}</p>

        <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4">
          {proizvod.specifikacije.map((s) => (
            <div key={s.labela} className="flex items-baseline gap-1.5">
              <dt className="u-label text-muted">{s.labela}</dt>
              <dd className="u-num text-[0.75rem] text-dim">{s.vrijednost}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto pt-6">
          <div className="flex items-end justify-between gap-4">
            <Cijena iznos={proizvod.cijena} velicina="lg" />
            <DodajGumb proizvod={proizvod} />
          </div>

          {/* Its own row, and it names the gap. A wrapping label beside the
              price crowded the button and said less. */}
          {preskupo && (
            <p className="u-label mt-3 text-muted">
              Nedostaje {formatirajBroj(proizvod.cijena - crediti)}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
