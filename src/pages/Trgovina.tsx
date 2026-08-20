import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import type { Kategorija, Proizvod } from '../types'
import { KATEGORIJE, PROIZVODI } from '../data/proizvodi'
import { ProizvodCard } from '../components/store/ProizvodCard'
import { ProizvodDialog } from '../components/store/ProizvodDialog'
import { NadoplatiGumb } from '../components/store/NadoplatiGumb'
import { Reveal } from '../components/ui/Reveal'
import { useStore } from '../context/StoreContext'
import { crediti, formatirajBroj } from '../lib/format'
import { useSeo } from '../hooks/useSeo'

type Filter = Kategorija | 'sve'

function jeFilter(v: string | null): v is Filter {
  return v !== null && KATEGORIJE.some((k) => k.id === v)
}

/**
 * Category order first, price second. Sorting the whole catalogue by price alone
 * opens the store on a 350 credit number plate: the cheapest thing here and the
 * least representative of what anyone comes to buy.
 */
const REDOSLIJED: Kategorija[] = ['vozila', 'bande', 'nekretnine', 'ostalo']

export default function Trgovina() {
  useSeo({
    naslov: 'Trgovina',
    opis:
      'Vozila, organizacije, nekretnine i oprema za Axis RolePlay. Cijene su u creditima, a sve kupljeno čeka te u igri kod sljedećeg spajanja.',
  })

  // The filter lives in the URL, so a category can be linked and shared.
  const [params, setParams] = useSearchParams()
  const izParams = params.get('kategorija')
  const aktivna: Filter = jeFilter(izParams) ? izParams : 'sve'

  const [odabrani, setOdabrani] = useState<Proizvod | null>(null)
  const { crediti: stanje } = useStore()

  const vidljivi = useMemo(() => {
    const lista = aktivna === 'sve' ? PROIZVODI : PROIZVODI.filter((p) => p.kategorija === aktivna)
    return [...lista].sort((a, b) => {
      const razlika = REDOSLIJED.indexOf(a.kategorija) - REDOSLIJED.indexOf(b.kategorija)
      return razlika !== 0 ? razlika : a.cijena - b.cijena
    })
  }, [aktivna])

  const meta = KATEGORIJE.find((k) => k.id === aktivna)!

  function postaviFilter(id: Filter) {
    if (id === 'sve') setParams({}, { replace: true })
    else setParams({ kategorija: id }, { replace: true })
  }

  return (
    <>
      <section className="border-b border-line">
        <div className="u-shell py-14 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h1 className="u-d2 max-w-[16ch]">Trgovina</h1>
              <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed text-dim">
                Cijene su fiksne i javne. Ono što kupiš vezano je uz tvog lika i čeka te u igri,
                bez obzira kad se sljedeći put spojiš.
              </p>
            </div>

            {/* Balance panel. Sits with the store, not floating in the hero. */}
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="border border-line p-5">
                <p className="u-label text-muted">Tvoje stanje</p>
                <p className="u-num mt-2 text-3xl font-medium text-text">
                  {formatirajBroj(stanje)}
                </p>
                <p className="mt-1 text-[0.75rem] text-muted">
                  Demo stanje. Vraća se na početno kad osvježiš stranicu.
                </p>
                <NadoplatiGumb className="mt-4 w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-ink-010">
        <div className="u-shell py-5">
          {/* Toggle buttons, not a tablist: there is one result region, and
              role="tab" without a matching tabpanel lies to a screen reader. */}
          <div
            role="group"
            aria-label="Filtriraj po kategoriji"
            className="-mx-1 flex gap-1 overflow-x-auto pb-1"
          >
            {KATEGORIJE.map((k) => {
              const jeAktivna = k.id === aktivna
              const broj =
                k.id === 'sve'
                  ? PROIZVODI.length
                  : PROIZVODI.filter((p) => p.kategorija === k.id).length

              return (
                <button
                  key={k.id}
                  type="button"
                  aria-pressed={jeAktivna}
                  onClick={() => postaviFilter(k.id)}
                  className={`u-press mx-1 flex min-h-11 shrink-0 cursor-pointer items-center gap-2 border px-4 text-[0.8125rem] ${
                    jeAktivna
                      ? 'border-red bg-red text-ink-000'
                      : 'border-line text-dim hover:border-line-strong hover:text-text'
                  }`}
                >
                  {k.naziv}
                  {/* Full opacity, not ink-000/70: knocking the label back to
                      70% over the red fill measured 3.9:1. Weight carries the
                      hierarchy instead. */}
                  <span
                    className={`u-num text-[0.6875rem] ${
                      jeAktivna ? 'font-normal text-ink-000' : 'text-muted'
                    }`}
                  >
                    {broj}
                  </span>
                </button>
              )
            })}
          </div>

          <p className="mt-4 max-w-[62ch] text-[0.875rem] leading-relaxed text-muted">
            {meta.opis}
          </p>
        </div>
      </section>

      <section className="u-shell py-14 lg:py-20">
        {vidljivi.length === 0 ? (
          <div className="border border-line py-24 text-center">
            <SlidersHorizontal
              aria-hidden="true"
              strokeWidth={1.25}
              className="mx-auto size-7 text-muted"
            />
            <p className="u-display mt-5 text-xl">Ovdje još nema ničega</p>
            <p className="mx-auto mt-3 max-w-[42ch] text-[0.9375rem] leading-relaxed text-muted">
              Ova kategorija se puni. Pogledaj cijeli katalog ili se javi na Discordu ako ti nešto
              konkretno treba.
            </p>
            <button
              type="button"
              onClick={() => postaviFilter('sve')}
              className="u-press mt-6 inline-flex min-h-11 cursor-pointer items-center border-b border-red pb-1 text-sm text-red hover:border-text hover:text-text"
            >
              Prikaži sve
            </button>
          </div>
        ) : (
          <>
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(19rem, 100%), 1fr))' }}
            >
              {vidljivi.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i, 5) * 45} className="h-full">
                  <ProizvodCard proizvod={p} onOtvori={setOdabrani} />
                </Reveal>
              ))}
            </div>

            <p className="mt-10 text-[0.8125rem] text-muted">
              Prikazano {vidljivi.length} od {PROIZVODI.length}. Stanje ti je {crediti(stanje)}.
            </p>
          </>
        )}
      </section>

      <ProizvodDialog proizvod={odabrani} zatvori={() => setOdabrani(null)} />
    </>
  )
}
