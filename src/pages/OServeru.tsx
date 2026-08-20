import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Media, MediaOkvir } from '../components/ui/Media'
import { Reveal } from '../components/ui/Reveal'
import { ButtonVanjski } from '../components/ui/Button'
import { useDialog } from '../hooks/useDialog'
import { DISCORD_URL, GALERIJA, SLIKA_ZAJEDNICA } from '../data/sadrzaj'
import { useSeo } from '../hooks/useSeo'

/**
 * Gallery viewer. Same dialog behaviour as the cart and the product detail:
 * focus trapped, Escape closes, focus restored. Arrow keys move between images.
 */
function Preglednik({
  indeks,
  zatvori,
  pomakni,
}: {
  indeks: number | null
  zatvori: () => void
  pomakni: (smjer: 1 | -1) => void
}) {
  const otvoren = indeks !== null
  const ref = useDialog<HTMLDivElement>(otvoren, zatvori)

  useEffect(() => {
    if (!otvoren) return
    function naTipku(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') pomakni(1)
      if (e.key === 'ArrowLeft') pomakni(-1)
    }
    document.addEventListener('keydown', naTipku)
    return () => document.removeEventListener('keydown', naTipku)
  }, [otvoren, pomakni])

  const slika = indeks !== null ? GALERIJA[indeks] : null

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-ink-000/95 p-4 transition-opacity duration-200 ${
        otvoren ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      style={{ zIndex: 'var(--z-drawer)' }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Pregled slike"
        tabIndex={-1}
        className="relative w-full max-w-5xl outline-none"
      >
        {slika && (
          <>
            <Media
              id={slika.id}
              alt={slika.alt}
              sirina={1400}
              visina={933}
              prioritet
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="max-h-[78dvh] object-contain"
            />

            <p className="mt-4 text-center text-[0.8125rem] text-muted">{slika.alt}</p>

            <button
              type="button"
              onClick={zatvori}
              aria-label="Zatvori pregled"
              className="u-press absolute -top-2 right-0 flex size-11 -translate-y-full cursor-pointer items-center justify-center text-dim hover:text-text"
            >
              <X aria-hidden="true" strokeWidth={1.5} className="size-6" />
            </button>

            <button
              type="button"
              onClick={() => pomakni(-1)}
              aria-label="Prethodna slika"
              className="u-press absolute top-1/2 left-2 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center border border-line-strong bg-ink-000/70 text-dim hover:text-text"
            >
              <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-5" />
            </button>

            <button
              type="button"
              onClick={() => pomakni(1)}
              aria-label="Sljedeća slika"
              className="u-press absolute top-1/2 right-2 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center border border-line-strong bg-ink-000/70 text-dim hover:text-text"
            >
              <ChevronRight aria-hidden="true" strokeWidth={1.5} className="size-5" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

/**
 * Varied tile sizes so the gallery reads as a composition rather than a
 * ten-cell contact sheet. Index 0 and 5 take two columns.
 */
function raspored(i: number): string {
  if (i === 0) return 'sm:col-span-2 aspect-[16/10]'
  if (i === 5) return 'sm:col-span-2 aspect-[16/10]'
  return 'aspect-[4/3]'
}

export default function OServeru() {
  useSeo({
    naslov: 'O serveru',
    opis:
      'Priča iza Axis RolePlay servera, kako je grad postavljen i kako zajednica funkcionira. Galerija prizora iz grada.',
  })

  const [indeks, setIndeks] = useState<number | null>(null)

  const pomakni = useCallback((smjer: 1 | -1) => {
    setIndeks((tren) => {
      if (tren === null) return tren
      return (tren + smjer + GALERIJA.length) % GALERIJA.length
    })
  }, [])

  return (
    <>
      <section className="border-b border-line">
        <div className="u-shell grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-6">
            <h1 className="u-d2 max-w-[14ch]">Grad koji je netko morao izgraditi</h1>

            {/* Real facts rather than an empty half-column under the headline. */}
            <dl className="mt-10 max-w-sm border-t border-line">
              {[
                ['Osnovan', '2023.'],
                ['Jezik', 'Hrvatski'],
                ['Pristup', 'Whitelist'],
                ['Najmanja dob', '16'],
              ].map(([labela, vrijednost]) => (
                <div
                  key={labela}
                  className="flex items-baseline justify-between border-b border-line py-3"
                >
                  <dt className="u-label text-muted">{labela}</dt>
                  <dd className="u-num text-[0.8125rem] text-text">{vrijednost}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="space-y-5 text-[1.0625rem] leading-relaxed text-dim">
              <p>
                Axis je počeo 2023. kao mali server za dvadesetak ljudi koji su se umorili od
                gradova u kojima se pucalo prije nego što bi se itko predstavio.
              </p>
              <p>
                Pravila su od tada pisana na jedan način: ako nešto kvari priču drugima, ne ide.
                Zbog toga imamo whitelist, zbog toga administracija obrazlaže svaku odluku i zbog
                toga ekonomija nije resetirana ni jednom.
              </p>
              <p>
                Danas grad radi svaki dan, s vlastitim poslovima, sudom, bolnicom, policijom i s
                organizacijama koje su nastale same od sebe.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="u-shell py-16 lg:py-24">
        <Reveal>
          <h2 className="u-d3 normal-case tracking-tight">Prizori iz grada</h2>
          <p className="mt-3 max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted">
            Fotografije stoje umjesto snimaka iz igre dok se ne posloži nova galerija.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {GALERIJA.map((s, i) => (
            <Reveal key={s.id} delay={Math.min(i, 6) * 40} className={raspored(i)}>
              <button
                type="button"
                onClick={() => setIndeks(i)}
                aria-label={`Otvori sliku: ${s.alt}`}
                className="group block h-full w-full cursor-pointer"
              >
                <MediaOkvir intenzitet="lagano" className="h-full border border-line group-hover:border-line-strong">
                  <Media
                    id={s.id}
                    alt={s.alt}
                    sirina={600}
                    visina={450}
                    kvaliteta={64}
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 48vw"
                    className="transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
                  />
                </MediaOkvir>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative border-t border-line">
        <div className="absolute inset-0">
          <Media
            id={SLIKA_ZAJEDNICA.id}
            alt={SLIKA_ZAJEDNICA.alt}
            sirina={1800}
            visina={900}
            kvaliteta={58}
            sizes="100vw"
            className="h-full"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-ink-000/85" />
        </div>

        <div className="u-shell relative py-20 lg:py-28">
          <div className="max-w-[46ch]">
            <h2 className="u-d2">Zajednica živi na Discordu</h2>
            <p className="mt-5 leading-relaxed text-dim">
              Prijave, najave, dražbe vozila i dogovori oko priče idu preko Discorda. Ondje se
              otvara i whitelist.
            </p>
            <div className="mt-8">
              <ButtonVanjski href={DISCORD_URL} varijanta="primarno">
                Discord
              </ButtonVanjski>
            </div>
          </div>
        </div>
      </section>

      <Preglednik indeks={indeks} zatvori={() => setIndeks(null)} pomakni={pomakni} />
    </>
  )
}
