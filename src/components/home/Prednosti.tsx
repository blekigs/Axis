import { Media } from '../ui/Media'
import { Reveal } from '../ui/Reveal'
import { PREDNOSTI, SLIKA_TRAKA } from '../../data/sadrzaj'

/**
 * Image band with an offset content block.
 *
 * The photograph is full-bleed and fixed behind the section; the copy sits in an
 * asymmetric block pushed to the right seven columns of twelve. Four points on
 * hairline-divided rows, not four cards, and not an icon above every heading.
 */
export function Prednosti() {
  return (
    <section className="relative border-b border-line">
      <div className="absolute inset-0">
        <Media
          id={SLIKA_TRAKA.id}
          alt={SLIKA_TRAKA.alt}
          sirina={1800}
          visina={1200}
          kvaliteta={58}
          sizes="100vw"
          className="h-full"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink-000/88" />
      </div>

      <div className="u-shell relative py-20 lg:py-28">
        <div className="lg:grid lg:grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <h2 className="u-d2 max-w-[18ch]">Zašto ljudi ostaju duže nego što su planirali</h2>
            </Reveal>

            <dl className="mt-12 border-t border-line">
              {PREDNOSTI.map((p, i) => (
                // One div between the dl and each dt/dd pair, which is all the
                // spec allows. Reveal renders that div rather than adding a
                // second wrapper inside it.
                <Reveal key={p.naslov} delay={i * 60} className="border-b border-line py-6">
                  <dt className="text-[1.0625rem] font-medium text-text">{p.naslov}</dt>
                  <dd className="mt-2.5 max-w-[58ch] text-[0.9375rem] leading-relaxed text-dim">
                    {p.tekst}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
