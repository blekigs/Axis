import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import type { Proizvod } from '../../types'
import { ISTAKNUTI_ID, proizvodPoId } from '../../data/proizvodi'
import { Media, MediaOkvir } from '../ui/Media'
import { Cijena } from '../ui/Cijena'
import { DodajGumb } from '../store/DodajGumb'
import { ProizvodDialog } from '../store/ProizvodDialog'
import { Reveal } from '../ui/Reveal'
import { ButtonLink } from '../ui/Button'

const ISTAKNUTI = ISTAKNUTI_ID.map((id) => proizvodPoId(id)).filter(
  (p): p is Proizvod => p !== undefined
)

/**
 * Bento. Three products, exactly three cells: one tall on the left, two stacked
 * on the right. No empty tiles, and the cells are not the same size, so this
 * does not become the three-identical-cards row.
 */
function Celija({
  proizvod,
  veliko,
  onOtvori,
}: {
  proizvod: Proizvod
  veliko?: boolean
  onOtvori: (p: Proizvod) => void
}) {
  return (
    <article
      className={`group relative flex h-full flex-col justify-end overflow-hidden border border-line bg-ink-010 transition-colors duration-300 hover:border-line-strong ${
        veliko ? 'min-h-[26rem]' : 'min-h-[15rem]'
      }`}
    >
      <MediaOkvir intenzitet="jako" className="absolute inset-0">
        <Media
          id={proizvod.slika}
          alt={proizvod.alt}
          sirina={veliko ? 900 : 800}
          visina={veliko ? 1100 : 500}
          sizes={veliko ? '(min-width: 1024px) 42vw, 92vw' : '(min-width: 1024px) 46vw, 92vw'}
          className="transition-transform duration-[700ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
        />
      </MediaOkvir>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-000 via-ink-000/55 to-transparent"
      />

      <div className={`relative z-10 ${veliko ? 'p-7 sm:p-9' : 'p-6 sm:p-7'}`}>
        <p className="u-num text-[0.6875rem] text-muted">{proizvod.id}</p>

        <h3
          className={`mt-2 normal-case tracking-tight ${veliko ? 'u-d3' : 'text-[1.125rem] leading-tight'}`}
        >
          <button
            type="button"
            onClick={() => onOtvori(proizvod)}
            className="cursor-pointer text-left transition-colors duration-200 hover:text-red"
          >
            {proizvod.naziv}
          </button>
        </h3>

        <p
          className={`mt-2.5 text-[0.875rem] leading-relaxed text-dim ${veliko ? 'max-w-[42ch]' : 'max-w-[38ch]'}`}
        >
          {proizvod.opis}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <Cijena iznos={proizvod.cijena} velicina={veliko ? 'lg' : 'md'} />
          <DodajGumb proizvod={proizvod} />
        </div>
      </div>
    </article>
  )
}

export function Istaknuto() {
  const [odabrani, setOdabrani] = useState<Proizvod | null>(null)

  return (
    <section className="border-b border-line">
      <div className="u-shell py-20 lg:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="u-d2 max-w-[16ch]">Ovo grad trenutno najviše traži</h2>

            <ButtonLink to="/trgovina" varijanta="tiho" velicina="sm" className="px-0">
              Cijeli katalog
              <ArrowRight aria-hidden="true" strokeWidth={1.5} className="size-4" />
            </ButtonLink>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Reveal className="lg:row-span-2" delay={40}>
            {ISTAKNUTI[0] && <Celija proizvod={ISTAKNUTI[0]} veliko onOtvori={setOdabrani} />}
          </Reveal>

          <Reveal delay={90}>
            {ISTAKNUTI[1] && <Celija proizvod={ISTAKNUTI[1]} onOtvori={setOdabrani} />}
          </Reveal>

          <Reveal delay={140}>
            {ISTAKNUTI[2] && <Celija proizvod={ISTAKNUTI[2]} onOtvori={setOdabrani} />}
          </Reveal>
        </div>
      </div>

      <ProizvodDialog proizvod={odabrani} zatvori={() => setOdabrani(null)} />
    </section>
  )
}
