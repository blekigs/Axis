import { ButtonLink } from '../components/ui/Button'
import { useSeo } from '../hooks/useSeo'

export default function NijePronadeno() {
  useSeo({
    naslov: 'Stranica ne postoji',
    opis: 'Tražena stranica ne postoji na Axis RolePlay stranici.',
  })

  return (
    <section className="u-shell flex min-h-[60dvh] flex-col justify-center py-20">
      <p className="u-num text-sm text-red">404</p>
      <h1 className="u-d2 mt-4 max-w-[16ch]">Ova adresa nije upisana u grad</h1>
      <p className="mt-5 max-w-[48ch] text-[1.0625rem] leading-relaxed text-dim">
        Stranice koju tražiš nema. Trgovina je i dalje otvorena.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <ButtonLink to="/trgovina">Otvori trgovinu</ButtonLink>
        <ButtonLink to="/" varijanta="sekundarno">
          Natrag na početnu
        </ButtonLink>
      </div>
    </section>
  )
}
