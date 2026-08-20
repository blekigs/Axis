import { useState, type FormEvent } from 'react'
import { Check } from 'lucide-react'
import { Button, ButtonVanjski } from '../components/ui/Button'
import { Akordeon } from '../components/ui/Akordeon'
import { Reveal } from '../components/ui/Reveal'
import { DISCORD_URL, FAQ } from '../data/sadrzaj'
import { useSeo } from '../hooks/useSeo'

type Polje = 'ime' | 'email' | 'poruka'
type Greske = Partial<Record<Polje, string>>

const PRAZNO = { ime: '', email: '', poruka: '' }

function provjeri(vrijednosti: typeof PRAZNO): Greske {
  const g: Greske = {}

  if (vrijednosti.ime.trim().length < 2) {
    g.ime = 'Upiši ime pod kojim te znaju u gradu, barem dva znaka.'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(vrijednosti.email.trim())) {
    g.email = 'Provjeri email. Nedostaje znak @ ili domena.'
  }
  if (vrijednosti.poruka.trim().length < 12) {
    g.poruka = 'Napiši barem rečenicu. Kratke prijave traju duže jer moramo pitati sve ispočetka.'
  }

  return g
}

/** Label above, helper text present, error below. Never a placeholder as a label. */
function PoljeObrasca({
  id,
  label,
  pomoc,
  greska,
  children,
}: {
  id: string
  label: string
  pomoc?: string
  greska?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.875rem] font-medium text-text">
        {label}
        <span aria-hidden="true" className="ml-1 text-red">
          *
        </span>
      </label>
      {pomoc && (
        <p id={`${id}-pomoc`} className="mt-1.5 text-[0.75rem] text-muted">
          {pomoc}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {greska && (
        <p id={`${id}-greska`} role="alert" className="mt-2 text-[0.8125rem] text-red">
          {greska}
        </p>
      )}
    </div>
  )
}

const UNOS =
  'w-full border border-line-strong bg-ink-000 px-3.5 py-3 text-text placeholder:text-muted ' +
  'transition-colors duration-200 focus:border-red focus:outline-none'

function Obrazac() {
  const [vrijednosti, setVrijednosti] = useState(PRAZNO)
  const [greske, setGreske] = useState<Greske>({})
  const [dodirnuto, setDodirnuto] = useState<Partial<Record<Polje, boolean>>>({})
  const [poslano, setPoslano] = useState(false)

  function promijeni(polje: Polje, v: string) {
    const sljedece = { ...vrijednosti, [polje]: v }
    setVrijednosti(sljedece)
    // Re-validate while typing only after the field has been left once, so the
    // first keystroke is never met with an error.
    if (dodirnuto[polje]) setGreske(provjeri(sljedece))
  }

  function napusti(polje: Polje) {
    setDodirnuto((d) => ({ ...d, [polje]: true }))
    setGreske(provjeri(vrijednosti))
  }

  function posalji(e: FormEvent) {
    e.preventDefault()
    const g = provjeri(vrijednosti)
    setGreske(g)
    setDodirnuto({ ime: true, email: true, poruka: true })

    const prvo = (Object.keys(g) as Polje[])[0]
    if (prvo) {
      document.getElementById(prvo)?.focus()
      return
    }

    // Demo only. There is no backend, and the confirmation says so.
    setPoslano(true)
    setVrijednosti(PRAZNO)
    setDodirnuto({})
  }

  if (poslano) {
    return (
      <div className="border border-line bg-ink-010 p-8">
        <Check aria-hidden="true" strokeWidth={2} className="size-6 text-red" />
        <h3 className="u-d3 mt-4 normal-case tracking-tight">Poruka je zabilježena</h3>
        <p className="mt-3 max-w-[48ch] leading-relaxed text-dim">
          Ovo je demo, pa poruka nije nikamo poslana. Na živoj stranici odgovor stiže na email
          istog dana, a najbrži put je i dalje Discord.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonVanjski href={DISCORD_URL} varijanta="primarno">
            Discord
          </ButtonVanjski>
          <Button varijanta="sekundarno" onClick={() => setPoslano(false)}>
            Pošalji još jednu
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={posalji} noValidate className="space-y-6">
      <PoljeObrasca id="ime" label="Ime" greska={dodirnuto.ime ? greske.ime : undefined}>
        <input
          id="ime"
          name="ime"
          type="text"
          autoComplete="name"
          value={vrijednosti.ime}
          onChange={(e) => promijeni('ime', e.target.value)}
          onBlur={() => napusti('ime')}
          aria-invalid={dodirnuto.ime && Boolean(greske.ime)}
          aria-describedby={dodirnuto.ime && greske.ime ? 'ime-greska' : undefined}
          className={UNOS}
        />
      </PoljeObrasca>

      <PoljeObrasca
        id="email"
        label="Email"
        pomoc="Na ovu adresu stiže odgovor."
        greska={dodirnuto.email ? greske.email : undefined}
      >
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={vrijednosti.email}
          onChange={(e) => promijeni('email', e.target.value)}
          onBlur={() => napusti('email')}
          aria-invalid={dodirnuto.email && Boolean(greske.email)}
          aria-describedby={
            [dodirnuto.email && greske.email ? 'email-greska' : null, 'email-pomoc']
              .filter(Boolean)
              .join(' ') || undefined
          }
          className={UNOS}
        />
      </PoljeObrasca>

      <PoljeObrasca
        id="poruka"
        label="Poruka"
        pomoc="Ako se javljaš zbog trgovine, navedi šifru proizvoda, primjerice AX-V-104."
        greska={dodirnuto.poruka ? greske.poruka : undefined}
      >
        <textarea
          id="poruka"
          name="poruka"
          rows={6}
          value={vrijednosti.poruka}
          onChange={(e) => promijeni('poruka', e.target.value)}
          onBlur={() => napusti('poruka')}
          aria-invalid={dodirnuto.poruka && Boolean(greske.poruka)}
          aria-describedby={
            [dodirnuto.poruka && greske.poruka ? 'poruka-greska' : null, 'poruka-pomoc']
              .filter(Boolean)
              .join(' ') || undefined
          }
          className={`${UNOS} resize-y`}
        />
      </PoljeObrasca>

      <Button type="submit">Pošalji poruku</Button>
    </form>
  )
}

export default function Podrska() {
  useSeo({
    naslov: 'Podrška',
    opis:
      'Kontakt i česta pitanja o Axis RolePlay serveru: whitelist, crediti, Tebex i prijave oko trgovine.',
  })

  return (
    <>
      <section className="border-b border-line">
        <div className="u-shell py-14 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h1 className="u-d2 max-w-[16ch]">Podrška</h1>
              <p className="mt-5 max-w-[56ch] text-[1.0625rem] leading-relaxed text-dim">
                Najbrži odgovor dobiješ na Discordu, gdje tim radi u smjenama. Obrazac ispod je za
                sve što ne želiš pisati javno.
              </p>
            </div>

            {/* The fastest route gets its own panel instead of a lone button
                floating under the paragraph with half the header empty. */}
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="border border-line p-5">
                <p className="u-label text-muted">Najbrži put</p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-dim">
                  Prijave oko trgovine rješavaju se isti dan. Navedi šifru proizvoda i sve ide
                  brže.
                </p>
                <ButtonVanjski href={DISCORD_URL} varijanta="primarno" className="mt-5 w-full">
                  Discord
                </ButtonVanjski>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="u-shell py-16 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="u-d3 normal-case tracking-tight">Pošalji poruku</h2>
              <p className="mt-3 max-w-[42ch] text-[0.9375rem] leading-relaxed text-muted">
                Odgovaramo istog dana, osim nedjeljom.
              </p>
              <div className="mt-8">
                <Obrazac />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={80}>
              <h2 className="u-d3 normal-case tracking-tight">Česta pitanja</h2>
              <div className="mt-8">
                <Akordeon stavke={FAQ} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
