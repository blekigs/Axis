import { RECENZIJE } from '../../data/sadrzaj'
import { Reveal } from '../ui/Reveal'

/**
 * Staggered quotes.
 *
 * Three quotes at three different widths and three different vertical offsets,
 * separated by red hairlines rather than boxed into equal cards. Each quote is
 * short enough to read in a glance, and every attribution carries a name and a
 * role.
 */
const RASPORED = [
  'lg:col-span-5 lg:col-start-1',
  'lg:col-span-4 lg:col-start-7 lg:mt-16',
  'lg:col-span-5 lg:col-start-3 lg:mt-4',
]

export function Recenzije() {
  return (
    <section className="border-b border-line">
      <div className="u-shell py-20 lg:py-28">
        <Reveal>
          <h2 className="u-d2 max-w-[14ch]">Što kažu ljudi u gradu</h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-4">
          {RECENZIJE.map((r, i) => (
            <Reveal key={r.ime} delay={i * 70} className={RASPORED[i]}>
              <figure className="border-t border-red pt-6">
                <blockquote>
                  <p className="text-[1.0625rem] leading-relaxed text-text">{r.citat}</p>
                </blockquote>
                <figcaption className="mt-5">
                  <span className="block text-[0.875rem] font-medium text-text">{r.ime}</span>
                  <span className="u-label mt-1.5 block text-muted">{r.uloga}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
