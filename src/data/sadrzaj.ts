/**
 * Copy and content that is not the catalogue. Kept out of the components so the
 * wording can be edited without touching layout.
 *
 * All figures here are mock demo data. See PLACEHOLDERS.md.
 */

export const DISCORD_URL = 'https://discord.gg/axisroleplay'
export const TIKTOK_URL = 'https://www.tiktok.com/@axisroleplay'
export const INSTAGRAM_URL = 'https://www.instagram.com/axisroleplay'

export const POCETNI_CREDITI = 2500

/**
 * The single marquee on the site. This is in-world content: an RP server is its
 * incidents, and a feature list cannot say that. Not a decorative locale strip.
 */
export const DISPATCH: string[] = [
  '22:04  Prijava krađe vozila, Sjeverni bulevar',
  '22:11  Zahtjev za vučnom službom, Tunel Lisica',
  '22:19  Otvorena smjena, Hitna pomoć, 4 vozila',
  '22:26  Prekinuta utrka, Industrijska zona',
  '22:38  Prijavljen požar, Skladište 12',
  '22:47  Nova organizacija registrirana pod imenom Kolodvor',
  '22:53  Zatvorena cesta zbog nesreće, Obala',
  '23:02  Traži se svjedok pucnjave, Stara luka',
  '23:15  Prodano vozilo na dražbi, konačna cijena 3 100 credita',
  '23:24  Prijava otmice, prekinuta intervencijom policije',
]

export interface Prednost {
  naslov: string
  tekst: string
}

/** Four reasons. Not three, and not rendered as identical cards. */
export const PREDNOSTI: Prednost[] = [
  {
    naslov: 'Whitelist s pravim razgovorom',
    tekst:
      'Prijava se čita, a ne broji. Razgovor traje deset minuta i vodi ga član tima, ne bot. Zbog toga u gradu nema ljudi koji ne znaju zašto su tu.',
  },
  {
    naslov: 'Administracija koja odgovara isti dan',
    tekst:
      'Prijave se rješavaju u smjenama, a svaka odluka ima obrazloženje koje možeš pročitati. Ako mislimo da smo pogriješili, kažemo to i vratimo stvari na staro.',
  },
  {
    naslov: 'Ekonomija koja nije resetirana svaki mjesec',
    tekst:
      'Novac ima težinu jer ga ne dijelimo. Poslovi, dražbe i tržište vozila drže cijene stvarnima, pa se trud isplati i tri mjeseca poslije.',
  },
  {
    naslov: 'Server koji radi kad se spojiš',
    tekst:
      'Vlastiti hardver, planirano održavanje najavljeno unaprijed i restart koji ne pada usred tvoje večeri.',
  },
]

export interface Recenzija {
  citat: string
  ime: string
  uloga: string
}

/** Mock testimonials written for the demo. Names are Croatian, not placeholders. */
export const RECENZIJE: Recenzija[] = [
  {
    citat:
      'Došao sam na tjedan dana iz radoznalosti. Ostao sam jer me netko na drugi dan pozvao na kavu u igri i ispalo je da vodi prijevoznika kojem je trebao vozač.',
    ime: 'Marin Kovačević',
    uloga: 'vozač, 7 mjeseci u gradu',
  },
  {
    citat:
      'Prvi server na kojem me admin pitao za moju stranu priče prije nego što je bilo što odlučio.',
    ime: 'Petra Novosel',
    uloga: 'medicinska sestra, Hitna pomoć',
  },
  {
    citat:
      'Ekonomija je stroga i to je poanta. Auto koji vozim sam plaćao dva mjeseca i zato ga ne zabijam u prvi zid.',
    ime: 'Dino Šarić',
    uloga: 'vlasnik autosalona',
  },
]

export interface Korak {
  naslov: string
  tekst: string
}

/**
 * How the loop works. Deliberately not labelled "Korak 1 / 2 / 3": the verb is
 * the label.
 */
export const KORACI: Korak[] = [
  {
    naslov: 'Nabavi credite',
    tekst:
      'Credite ćeš nadoplaćivati isključivo preko Tebex-a, službene platforme za FiveM servere. Tebex vodi plaćanje, račun i povrat. Axis nikad ne vidi tvoje podatke o kartici i ne postoji nijedan drugi način plaćanja.',
  },
  {
    naslov: 'Odaberi u trgovini',
    tekst:
      'Credite trošiš u trgovini na ovoj stranici. Cijene su fiksne i javne, a ono što kupiš vezano je uz tvoj lik, ne uz sesiju.',
  },
  {
    naslov: 'Preuzmi u igri',
    tekst:
      'Kad se sljedeći put spojiš, vozilo je u garaži, ključ nekretnine u inventaru, a organizacija upisana. Ako se nešto ne pojavi, prijava na Discordu rješava se isti dan.',
  },
]

export interface FaqStavka {
  pitanje: string
  odgovor: string
}

export const FAQ: FaqStavka[] = [
  {
    pitanje: 'Je li ovo pay to win?',
    odgovor:
      'Ne. U trgovini se kupuju vozila, prostori i administrativne stvari. Ugled, teritorij, čin u policiji i mjesto u priči ne mogu se kupiti ni za jedan credit. Nitko ti neće ustupiti mjesto zato što si potrošio novac.',
  },
  {
    pitanje: 'Kako se plaća i zašto samo Tebex?',
    odgovor:
      'Tebex je službena platforma za plaćanja na FiveM serverima. On obrađuje transakciju, izdaje račun i rješava povrat. Axis time nikad ne rukuje tvojim podacima o plaćanju. Ni jedan drugi način uplate nije valjan, pa ako ti netko nudi credite izvan Tebex-a, to je prijevara.',
  },
  {
    pitanje: 'Trebam li račun na stranici?',
    odgovor:
      'Zasad ne. Ova verzija stranice je demo i sve što ovdje odabereš briše se kad osvježiš stranicu. Prijava i povezivanje s likom u igri dolaze u sljedećoj verziji.',
  },
  {
    pitanje: 'Što ako kupim nešto i ne pojavi se u igri?',
    odgovor:
      'Otvori prijavu na Discordu i navedi šifru proizvoda, primjerice AX-V-104. Prijave oko trgovine imaju prednost i rješavaju se isti dan.',
  },
  {
    pitanje: 'Mogu li vratiti ono što sam kupio?',
    odgovor:
      'Povrat ide preko Tebex-a i moguć je ako stavka nije preuzeta u igri. Nakon preuzimanja vozilo ili nekretnina mogu se prodati unutar igre, po tržišnoj cijeni.',
  },
  {
    pitanje: 'Koliko godina moram imati?',
    odgovor:
      'Šesnaest. Prijava se odbija ako se na razgovoru pokaže da to ne stoji. Nije stvar u broju nego u tome što se od igrača očekuje da ostane u liku i kad situacija ne ide njemu u korist.',
  },
  {
    pitanje: 'Igra li se na hrvatskom?',
    odgovor:
      'Da. Cijela zajednica, administracija i pravila su na hrvatskom. Engleski se koristi samo kad netko iz susjedstva svrati u posjet.',
  },
]

export interface Slika {
  id: string
  alt: string
}

/** Gallery for /o-serveru. Ten photographs, each reviewed before it was added. */
export const GALERIJA: Slika[] = [
  { id: '1603793510575-a8cf24361baa', alt: 'Silueta grada noću s tek nekoliko osvijetljenih tornjeva' },
  { id: '1602166862596-b456047ca787', alt: 'Automobil s upaljenim svjetlima u gustoj noćnoj magli' },
  { id: '1560307002-306085d5ca4e', alt: 'Uska ulica s neonskim natpisima nakon kiše' },
  { id: '1611416457332-946853cc75d6', alt: 'Poslovni toranj iznad grada u kasnim noćnim satima' },
  { id: '1653439238934-8a2f6a882790', alt: 'Osvijetljeni znak parkirališta na mračnom raskrižju' },
  { id: '1536286144513-881bfbd3f292', alt: 'Pogled iz zraka na gusto osvijetljeni centar grada' },
  { id: '1613713568305-8da2fc04f168', alt: 'Svjetlosni tragovi automobila u dugoj ekspoziciji' },
  { id: '1569169507605-f91e088ce91a', alt: 'Neboderi uz obalu odraženi u mirnoj vodi noću' },
  { id: '1571366657764-16ca342d3284', alt: 'Prolaznici s kišobranima na mokrom pločniku pod uličnom rasvjetom' },
  { id: '1552750866-bf6c618921eb', alt: 'Osvijetljeni ulični natpis iznad prolaza u mračnoj ulici' },
]

/** Hero and section photography. */
export const SLIKA_HERO: Slika = {
  id: '1623346483743-b968a27ed34c',
  alt: 'Automobil na gradskoj ulici noću, okružen svjetlosnim tragovima prometa',
}

export const SLIKA_TRAKA: Slika = {
  id: '1492086517200-9393d4eb53bf',
  alt: 'Svjetla grada snimljena iz zraka u kasnim noćnim satima',
}

export const SLIKA_ZAJEDNICA: Slika = {
  id: '1523374228107-6e44bd2b524e',
  alt: 'Poluotok prekriven svjetlima grada, snimljen iz zraka noću',
}
