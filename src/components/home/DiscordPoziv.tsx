import { ButtonVanjski } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { DISCORD_URL } from '../../data/sadrzaj'

/**
 * Single-purpose closing section. One idea, one control, framed by a red
 * hairline rather than filled with red: the accent stays under its budget even
 * where it carries the most weight.
 */
export function DiscordPoziv() {
  return (
    <section className="u-shell py-20 lg:py-28">
      <Reveal>
        <div className="border border-red/40 px-6 py-16 text-center sm:px-12 lg:py-24">
          <h2 className="u-d2 mx-auto max-w-[18ch]">Prijave se čitaju svaki dan</h2>

          <p className="mx-auto mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-dim">
            Whitelist se otvara u valovima. Na Discordu vidiš kad je sljedeći, pročitaš pravila i
            dogovoriš razgovor s nekim iz tima.
          </p>

          <div className="mt-10 flex justify-center">
            <ButtonVanjski href={DISCORD_URL} varijanta="primarno">
              Discord
            </ButtonVanjski>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
