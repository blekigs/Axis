import { Hero } from '../components/home/Hero'
import { Dispatch } from '../components/home/Dispatch'
import { Istaknuto } from '../components/home/Istaknuto'
import { Prednosti } from '../components/home/Prednosti'
import { Recenzije } from '../components/home/Recenzije'
import { DiscordPoziv } from '../components/home/DiscordPoziv'
import { useSeo } from '../hooks/useSeo'

/**
 * Six sections, six different layout families:
 * asymmetric split hero, marquee, bento, image band, staggered quotes, closing
 * call to action. No two sections repeat a shape, and there are no eyebrows.
 */
export default function Pocetna() {
  useSeo({
    naslov: 'Axis RolePlay',
    opis:
      'Axis RolePlay je hrvatski FiveM roleplay server. Pregledaj trgovinu, uzmi vozila, organizacije i nekretnine za credite i preuzmi ih odmah u igri.',
  })

  return (
    <>
      <Hero />
      <Dispatch />
      <Istaknuto />
      <Prednosti />
      <Recenzije />
      <DiscordPoziv />
    </>
  )
}
