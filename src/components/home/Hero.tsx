import { ButtonLink, ButtonVanjski } from '../ui/Button'
import { Media } from '../ui/Media'
import { DISCORD_URL, SLIKA_HERO } from '../../data/sadrzaj'

/**
 * Asymmetric split hero.
 *
 * Two real grid columns rather than a text block with a photograph absolutely
 * positioned behind it: the columns cannot overlap, so the headline can never
 * run under the image no matter how the type scales. The photograph then bleeds
 * from its column out to the right viewport edge.
 *
 * The image is one element positioned differently per breakpoint, not rendered
 * twice, because a second copy hidden with `display: none` still downloads.
 *
 * Four text elements total: headline, subtext, two CTAs. Nothing under the
 * buttons, no trust strip, no scroll cue.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="u-shell">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          <div className="flex flex-col justify-center py-14 lg:min-h-[min(86dvh,44rem)] lg:py-24">
            <h1 className="u-hero">
              Nema respawna
              <br />
              za reputaciju
            </h1>

            <p className="mt-7 max-w-[46ch] text-[1.0625rem] leading-relaxed text-dim">
              Hrvatski FiveM server na kojem se svaka odluka pamti. Izgradi ime u gradu, a opremu
              uzmi creditima.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink to="/trgovina">Otvori trgovinu</ButtonLink>
              <ButtonVanjski href={DISCORD_URL}>Discord</ButtonVanjski>
            </div>
          </div>

          {/* Below lg this is a band under the copy; from lg it is the right
              column, bled out to the viewport edge. */}
          <div className="u-bleed-right relative aspect-[4/3] sm:aspect-[2/1] lg:aspect-auto">
            <Media
              id={SLIKA_HERO.id}
              alt={SLIKA_HERO.alt}
              sirina={1200}
              visina={1000}
              prioritet
              kvaliteta={64}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="lg:absolute lg:inset-0"
            />

            {/* Graded toward the page black on the side the type sits on, so the
                headline never fights the photograph for contrast. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-000 via-ink-000/40 to-ink-000/10 lg:bg-gradient-to-r lg:from-ink-000 lg:via-ink-000/30 lg:to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
