import { ShieldCheck } from 'lucide-react'
import { ButtonLink, ButtonVanjski } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { DISCORD_URL, KORACI } from '../data/sadrzaj'
import { useSeo } from '../hooks/useSeo'

/**
 * The credits loop, as a vertical spine.
 *
 * The steps are labelled by their verb rather than by "Korak 1 / 2 / 3": the
 * action is the label, and the order is already carried by the spine.
 */
export default function KakoFunkcionira() {
  useSeo({
    naslov: 'Kako funkcionira',
    opis:
      'Kako se dolazi do credita i kako se kupljeno preuzima u igri na Axis RolePlay serveru. Plaćanje ide isključivo preko Tebex-a.',
  })

  return (
    <>
      <section className="border-b border-line">
        <div className="u-shell grid gap-10 py-14 lg:grid-cols-12 lg:items-end lg:py-20">
          <div className="lg:col-span-6">
            <h1 className="u-d2 max-w-[16ch]">Kako funkcionira</h1>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-[1.0625rem] leading-relaxed text-dim">
              Tri stvari: kako dolaziš do credita, gdje ih trošiš i kako ono što kupiš stiže do
              tvog lika u igri.
            </p>
          </div>
        </div>
      </section>

      <section className="u-shell py-16 lg:py-24">
        <ol className="relative">
          {/* The spine. It organises real content, so it earns being a line. */}
          <span
            aria-hidden="true"
            className="absolute top-14 bottom-14 left-[7px] w-px bg-line sm:left-[9px]"
          />

          {KORACI.map((k, i) => (
            <Reveal
              key={k.naslov}
              delay={i * 70}
              as="li"
              className="relative block border-b border-line py-10 pl-10 last:border-b-0 sm:pl-14"
            >
              <span
                aria-hidden="true"
                className="absolute top-12 left-0 size-[15px] border border-red bg-ink-000 sm:size-[19px]"
              />

              {/* Two columns so the step reads across the page instead of
                  stacking in the left half with the right half empty. */}
              <div className="grid gap-4 lg:grid-cols-12 lg:gap-8">
                <h2 className="u-d3 normal-case tracking-tight lg:col-span-5">{k.naslov}</h2>
                <p className="max-w-[62ch] leading-relaxed text-dim lg:col-span-6 lg:col-start-7">
                  {k.tekst}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* The payment statement gets its own frame because it is the one thing on
          this page a player can get wrong in a way that costs them money. */}
      <section className="border-y border-line bg-ink-010">
        <div className="u-shell py-16 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-1">
              <ShieldCheck aria-hidden="true" strokeWidth={1.25} className="size-8 text-red" />
            </div>

            <div className="lg:col-span-8">
              <h2 className="u-d3 normal-case tracking-tight">
                Tebex je jedini način plaćanja
              </h2>
              <p className="mt-4 max-w-[62ch] leading-relaxed text-dim">
                Nema uplata na privatne račune, nema plaćanja preko poruka i nema posrednika. Ako
                ti netko nudi credite izvan Tebex-a, to je prijevara i prijavi je na Discordu.
                Trgovina na ovoj stranici trenutno radi kao demo, pa se ništa ne naplaćuje.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink to="/trgovina">Otvori trgovinu</ButtonLink>
                <ButtonVanjski href={DISCORD_URL}>Discord</ButtonVanjski>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
