import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Minus, Plus, X } from 'lucide-react'
import { useStore } from '../../context/StoreContext'
import { useDialog } from '../../hooks/useDialog'
import { Button } from '../ui/Button'
import { Cijena } from '../ui/Cijena'
import { Media } from '../ui/Media'
import { crediti, formatirajBroj } from '../../lib/format'
import { NadoplatiGumb } from './NadoplatiGumb'

function KolicinaKontrola({
  id,
  kolicina,
  naziv,
}: {
  id: string
  kolicina: number
  naziv: string
}) {
  const { postaviKolicinu } = useStore()

  return (
    <div className="flex items-center border border-line">
      {/* Stops at one instead of turning into a second delete. Two controls in
          the same row that both announce "remove this item" is a maze for a
          screen reader; removing is the X button's job alone. */}
      <button
        type="button"
        onClick={() => postaviKolicinu(id, kolicina - 1)}
        disabled={kolicina <= 1}
        aria-label={`Smanji količinu za ${naziv}`}
        className="u-press flex size-9 cursor-pointer items-center justify-center text-dim hover:text-text disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-dim"
      >
        <Minus aria-hidden="true" strokeWidth={1.5} className="size-4" />
      </button>

      <span className="u-num w-8 text-center text-[0.8125rem] text-text" aria-live="polite">
        {kolicina}
      </span>

      <button
        type="button"
        onClick={() => postaviKolicinu(id, kolicina + 1)}
        disabled={kolicina >= 9}
        aria-label={`Povećaj količinu za ${naziv}`}
        className="u-press flex size-9 cursor-pointer items-center justify-center text-dim hover:text-text disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-dim"
      >
        <Plus aria-hidden="true" strokeWidth={1.5} className="size-4" />
      </button>
    </div>
  )
}

export function Kosarica() {
  const {
    stavke,
    ukupno,
    crediti: stanje,
    dovoljnoCredita,
    nedostaje,
    kosaricaOtvorena,
    zatvoriKosaricu,
    ukloni,
    kupi,
  } = useStore()

  const [uspjeh, setUspjeh] = useState(false)

  // Closing clears the confirmation here, in the event that causes it, rather
  // than in an effect watching the open flag. One handler, so the scrim, the
  // close button and Escape all behave the same.
  const zatvori = useCallback(() => {
    setUspjeh(false)
    zatvoriKosaricu()
  }, [zatvoriKosaricu])

  const ref = useDialog<HTMLDivElement>(kosaricaOtvorena, zatvori)

  // The confirmation is a state of the drawer, not a toast that steals focus.
  // A timer is genuinely external, so this one stays an effect.
  useEffect(() => {
    if (!uspjeh) return
    const t = window.setTimeout(() => setUspjeh(false), 4200)
    return () => window.clearTimeout(t)
  }, [uspjeh])

  function naKupnju() {
    if (!dovoljnoCredita || stavke.length === 0) return
    kupi()
    setUspjeh(true)
  }

  return (
    <>
      <div
        aria-hidden="true"
        onClick={zatvori}
        className={`fixed inset-0 bg-ink-000/80 transition-opacity duration-200 ${
          kosaricaOtvorena ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        style={{ zIndex: 'var(--z-drawer-scrim)' }}
      />

      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Košarica"
        tabIndex={-1}
        className={`fixed inset-y-0 right-0 flex w-full max-w-[27rem] flex-col border-l border-line bg-ink-010 outline-none transition-transform ${
          kosaricaOtvorena
            ? 'translate-x-0 duration-[280ms] ease-[cubic-bezier(0.32,0.72,0,1)]'
            : 'pointer-events-none translate-x-full duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]'
        }`}
        style={{ zIndex: 'var(--z-drawer)' }}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="u-display text-lg">Košarica</h2>
          <button
            type="button"
            onClick={zatvori}
            aria-label="Zatvori košaricu"
            className="u-press flex size-10 cursor-pointer items-center justify-center text-dim hover:text-text"
          >
            <X aria-hidden="true" strokeWidth={1.5} className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          {uspjeh && (
            <div className="flex items-start gap-3 border-b border-line bg-ink-020 px-5 py-4">
              <Check aria-hidden="true" strokeWidth={2} className="mt-0.5 size-4 shrink-0 text-red" />
              <p className="text-[0.8125rem] leading-relaxed text-dim">
                Kupnja zabilježena. Sve te stavke čekaju te u igri čim se sljedeći put spojiš.
              </p>
            </div>
          )}

          {stavke.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <p className="u-display text-xl text-text">Košarica je prazna</p>
              <p className="mx-auto mt-3 max-w-[34ch] text-[0.875rem] leading-relaxed text-muted">
                Imaš {crediti(stanje)} za potrošiti. Trgovina je otvorena.
              </p>
              <Link
                to="/trgovina"
                onClick={zatvori}
                className="u-press mt-6 inline-flex min-h-11 cursor-pointer items-center border-b border-red pb-1 text-sm text-red hover:border-text hover:text-text"
              >
                Otvori trgovinu
              </Link>
            </div>
          ) : (
            <ul>
              {stavke.map((s) => (
                <li
                  key={s.proizvod.id}
                  className="flex gap-4 border-b border-line px-5 py-4"
                >
                  <div className="relative w-20 shrink-0 overflow-hidden bg-ink-020">
                    <Media
                      id={s.proizvod.slika}
                      alt={s.proizvod.alt}
                      sirina={160}
                      visina={120}
                      kvaliteta={62}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-text">
                          {s.proizvod.naziv}
                        </p>
                        <p className="u-num mt-1 text-[0.6875rem] text-muted">{s.proizvod.id}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => ukloni(s.proizvod.id)}
                        aria-label={`Ukloni ${s.proizvod.naziv} iz košarice`}
                        className="u-press shrink-0 cursor-pointer p-1 text-muted hover:text-red"
                      >
                        <X aria-hidden="true" strokeWidth={1.5} className="size-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <KolicinaKontrola
                        id={s.proizvod.id}
                        kolicina={s.kolicina}
                        naziv={s.proizvod.naziv}
                      />
                      <Cijena iznos={s.proizvod.cijena * s.kolicina} velicina="sm" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {stavke.length > 0 && (
          <div className="border-t border-line px-5 py-5">
            <dl className="space-y-2 text-[0.8125rem]">
              <div className="flex items-baseline justify-between">
                <dt className="text-muted">Ukupno</dt>
                <dd>
                  <Cijena iznos={ukupno} />
                </dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-muted">Stanje nakon kupnje</dt>
                <dd
                  className={`u-num text-sm ${dovoljnoCredita ? 'text-dim' : 'text-red'}`}
                >
                  {formatirajBroj(stanje - ukupno)}
                </dd>
              </div>
            </dl>

            {!dovoljnoCredita && (
              // Says what is wrong and by how much, then offers the way out.
              <p
                role="alert"
                className="mt-4 border border-red/35 bg-red/[0.07] px-3 py-2.5 text-[0.8125rem] leading-relaxed text-text"
              >
                Nedostaje ti {crediti(nedostaje)}. Ukloni nešto iz košarice ili nadoplati stanje.
              </p>
            )}

            <div className="mt-4 space-y-2">
              <Button
                onClick={naKupnju}
                disabled={!dovoljnoCredita}
                className="w-full"
                aria-describedby={!dovoljnoCredita ? undefined : undefined}
              >
                Kupi za credite
              </Button>
              <NadoplatiGumb className="w-full" />
            </div>

            <p className="mt-4 text-[0.6875rem] leading-relaxed text-muted">
              Ovo je demo. Stanje i košarica vraćaju se na početno kad osvježiš stranicu.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
