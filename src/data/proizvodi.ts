import type { KategorijaMeta, Proizvod } from '../types'

/**
 * The whole catalogue lives here. To change what the store sells, edit this file
 * and nothing else. Prices are whole credits.
 *
 * `slika` is an Unsplash photo id standing in for a future in-game screenshot.
 * Every id was fetched and visually reviewed before it was assigned, so the alt
 * text describes the photo that actually loads. See PLACEHOLDERS.md.
 */

export const KATEGORIJE: KategorijaMeta[] = [
  {
    id: 'sve',
    naziv: 'Sve',
    opis: 'Cijeli katalog, po kategorijama, a unutar svake od najjeftinijeg.',
  },
  {
    id: 'vozila',
    naziv: 'Vozila',
    opis: 'Registrirano na tvoje ime i parkirano u tvojoj garaži čim se sljedeći put spojiš.',
  },
  {
    id: 'bande',
    naziv: 'Bande i mafija',
    opis: 'Struktura, teritorij i alati. Ugled se i dalje zarađuje u gradu, ne ovdje.',
  },
  {
    id: 'nekretnine',
    naziv: 'Nekretnine',
    opis: 'Adresa koju možeš zaključati, opremiti i kome god želiš dati ključ.',
  },
  {
    id: 'ostalo',
    naziv: 'Ostalo',
    opis: 'Sitnice koje ti skrate prvih nekoliko sati u gradu.',
  },
]

export const PROIZVODI: Proizvod[] = [
  // --- Vozila ----------------------------------------------------------------
  {
    id: 'AX-V-104',
    naziv: 'Kessler K90 Coupe',
    kategorija: 'vozila',
    opis: 'Tvrdi coupe za ljude koji voze brzo i parkiraju loše.',
    detalj:
      'Kessler K90 je najbrži način da te grad primijeti. Dolazi registriran na tvoje ime, s ključem u inventaru i s mjestom u garaži. Boju, felge i unutrašnjost mijenjaš kod bilo kojeg tunera u gradu.',
    cijena: 2400,
    slika: '1610374634235-b51ef357f905',
    alt: 'Tamni sportski coupe s upaljenim stražnjim svjetlima, snimljen u sumrak',
    oznaka: 'popularno',
    specifikacije: [
      { labela: 'Klasa', vrijednost: 'Sport' },
      { labela: 'Mjesta', vrijednost: '2' },
      { labela: 'Garaža', vrijednost: 'Trajno' },
    ],
  },
  {
    id: 'AX-V-118',
    naziv: 'Torrent RS Widebody',
    kategorija: 'vozila',
    opis: 'Široki kit, ojačan pogon i račun koji boli.',
    detalj:
      'Torrent RS je vrh liste. Widebody paket, ojačan pogon i zvuk po kojem te prepoznaju dva bloka dalje. Ograničena serija: kad se rasproda, vraća se tek sljedeću sezonu.',
    cijena: 4250,
    slika: '1611493761903-df1720dcbf8b',
    alt: 'Sportski coupe sa širokim blatobranima ispred industrijske zgrade noću',
    oznaka: 'ograniceno',
    specifikacije: [
      { labela: 'Klasa', vrijednost: 'Super' },
      { labela: 'Mjesta', vrijednost: '2' },
      { labela: 'Serija', vrijednost: '25 kom' },
    ],
  },
  {
    id: 'AX-V-131',
    naziv: 'Vasco Corsa Turbo',
    kategorija: 'vozila',
    opis: 'Lagan, glasan i dovoljno jeftin da ga ne žališ.',
    detalj:
      'Corsa Turbo je prvi auto koji ima smisla kupiti. Dovoljno brz za bijeg, dovoljno neupadljiv da ga policija ne pamti. Većina vozača u gradu je počela s ovim.',
    cijena: 1850,
    slika: '1532115345388-6d3d2021f188',
    alt: 'Silueta sportskog automobila s otvorenim vratima na otvorenom u sumrak',
    specifikacije: [
      { labela: 'Klasa', vrijednost: 'Compact' },
      { labela: 'Mjesta', vrijednost: '4' },
      { labela: 'Garaža', vrijednost: 'Trajno' },
    ],
  },
  {
    id: 'AX-V-142',
    naziv: 'Halden Ranger 4x4',
    kategorija: 'vozila',
    opis: 'Ide tamo gdje asfalt prestaje, a signal pada.',
    detalj:
      'Ranger je za poslove izvan grada. Vitlo, krovni nosač i dovoljno prostora za četiri osobe i opremu. Ako radiš na sjeveru mape, isplati ti se već prvi tjedan.',
    cijena: 1250,
    slika: '1608762232687-dee1b4243837',
    alt: 'Terenac čija duga svjetla probijaju mrak izvan grada',
    specifikacije: [
      { labela: 'Klasa', vrijednost: 'Off-road' },
      { labela: 'Mjesta', vrijednost: '4' },
      { labela: 'Prtljažnik', vrijednost: '85 kg' },
    ],
  },
  {
    id: 'AX-V-150',
    naziv: 'Meridian Sprinter',
    kategorija: 'vozila',
    opis: 'Kombi. Neugledan, a zaradi više od većine sportskih auta.',
    detalj:
      'Sprinter je radni alat. Dostave, selidbe, prijevoz robe za organizacije. Nitko ga ne gleda dvaput, a to je često cijela poanta.',
    cijena: 780,
    slika: '1662567430100-d173bdaad866',
    alt: 'Bijeli dostavni kombi s upaljenim svjetlima na gradskoj ulici noću',
    specifikacije: [
      { labela: 'Klasa', vrijednost: 'Komercijalno' },
      { labela: 'Mjesta', vrijednost: '3' },
      { labela: 'Prtljažnik', vrijednost: '300 kg' },
    ],
  },

  // --- Bande i mafija --------------------------------------------------------
  {
    id: 'AX-B-201',
    naziv: 'Osnivanje organizacije',
    kategorija: 'bande',
    opis: 'Ime, znak, hijerarhija i mjesto na karti grada.',
    detalj:
      'Dobivaš registriranu organizaciju: ime, boju, znak, rangove i do dvadeset članova. Uz to ide zajednički sef i interni radio kanal. Teritorij i ugled ne kupuješ, o njima odlučuje grad.',
    cijena: 3600,
    slika: '1572491671626-ca1747c3cc57',
    alt: 'Uska gradska ulica okupana crvenim svjetlom neonskih natpisa',
    oznaka: 'novo',
    specifikacije: [
      { labela: 'Članovi', vrijednost: 'do 20' },
      { labela: 'Rangovi', vrijednost: '5' },
      { labela: 'Sef', vrijednost: 'Zajednički' },
    ],
  },
  {
    id: 'AX-B-214',
    naziv: 'Skladište u luci',
    kategorija: 'bande',
    opis: 'Četiri zida, jedna rolo vrata i nijedno pitanje.',
    detalj:
      'Skladište u lučkoj zoni s kontroliranim pristupom, prostorom za robu i parkingom za dva vozila unutra. Veže se na organizaciju, a pristup dodjeljuješ po rangu.',
    cijena: 2900,
    slika: '1637970067784-927e66e07e36',
    alt: 'Prazna i slabo osvijetljena industrijska hala s betonskim stupovima',
    specifikacije: [
      { labela: 'Kapacitet', vrijednost: '400 jedinica' },
      { labela: 'Parking', vrijednost: '2 vozila' },
      { labela: 'Pristup', vrijednost: 'Po rangu' },
    ],
  },
  {
    id: 'AX-B-222',
    naziv: 'Sigurna kuća',
    kategorija: 'bande',
    opis: 'Mjesto na koje se vraćaš kad stvari krenu po zlu.',
    detalj:
      'Neupisana adresa izvan glavnih patrolnih ruta. Ormar za opremu, prva pomoć i izlaz na dvije strane. Zna za nju samo onaj kome je sam daš.',
    cijena: 1950,
    slika: '1571673638846-2adffccdc689',
    alt: 'Mračna dnevna soba s kaučem i prozorima kroz koje ulazi crveno svjetlo',
    specifikacije: [
      { labela: 'Ormari', vrijednost: '3' },
      { labela: 'Izlazi', vrijednost: '2' },
      { labela: 'Na karti', vrijednost: 'Ne' },
    ],
  },
  {
    id: 'AX-B-230',
    naziv: 'Oružarnica organizacije',
    kategorija: 'bande',
    opis: 'Zaključan ormar s evidencijom tko je što uzeo.',
    detalj:
      'Zajednički spremnik za opremu organizacije, sa zapisom svakog vađenja. Rješava najstariji problem svake bande u gradu: nitko ne zna gdje je oprema nestala.',
    cijena: 1500,
    slika: '1474408886716-087263db7da1',
    alt: 'Dugi hodnik podzemne garaže osvijetljen tek redom stropnih svjetiljki',
    specifikacije: [
      { labela: 'Mjesta', vrijednost: '60' },
      { labela: 'Evidencija', vrijednost: 'Da' },
      { labela: 'Pristup', vrijednost: 'Rang 3 i više' },
    ],
  },

  // --- Nekretnine ------------------------------------------------------------
  {
    id: 'AX-N-301',
    naziv: 'Potkrovlje u centru',
    kategorija: 'nekretnine',
    opis: 'Visoko, tiho i deset sekundi od svega što se događa.',
    detalj:
      'Potkrovlje s pogledom na centar. Namještaj biraš sam, garderoba je odvojena, a lift ide izravno u stan. Adresu možeš podijeliti ili je zadržati za sebe.',
    cijena: 2200,
    slika: '1541194577687-8c63bf9e7ee3',
    alt: 'Zamračen dnevni boravak s kaučem i velikim prozorom',
    oznaka: 'popularno',
    specifikacije: [
      { labela: 'Sobe', vrijednost: '3' },
      { labela: 'Garderoba', vrijednost: 'Da' },
      { labela: 'Ključevi', vrijednost: '4' },
    ],
  },
  {
    id: 'AX-N-312',
    naziv: 'Kuća na brdu',
    kategorija: 'nekretnine',
    opis: 'Bazen, prilaz s kapijom i pogled na cijeli grad.',
    detalj:
      'Najskuplja adresa u ponudi i to se vidi. Zatvoreni prilaz, garaža za četiri vozila, bazen i terasa koja gleda niz padinu. Ako organiziraš nešto veliko, ovdje se to organizira.',
    cijena: 5400,
    slika: '1540882082344-a56ecd70ba96',
    alt: 'Osvijetljena kuća s bazenom i terasom snimljena nakon zalaska sunca',
    specifikacije: [
      { labela: 'Sobe', vrijednost: '6' },
      { labela: 'Garaža', vrijednost: '4 vozila' },
      { labela: 'Ključevi', vrijednost: '8' },
    ],
  },
  {
    id: 'AX-N-320',
    naziv: 'Garaža za šest vozila',
    kategorija: 'nekretnine',
    opis: 'Bez kuće i bez računa. Samo mjesto za aute.',
    detalj:
      'Zatvorena garaža na rubu centra. Šest mjesta, radni stol i pristup za dvije osobe. Najjeftiniji način da prestaneš ostavljati aute na ulici.',
    cijena: 1100,
    slika: '1620726068483-d4d53738ba48',
    alt: 'Podzemna garaža s nizom parkirnih mjesta i obojanim stupovima',
    specifikacije: [
      { labela: 'Mjesta', vrijednost: '6' },
      { labela: 'Radni stol', vrijednost: 'Da' },
      { labela: 'Pristup', vrijednost: '2 osobe' },
    ],
  },

  // --- Ostalo ----------------------------------------------------------------
  {
    id: 'AX-O-401',
    naziv: 'Paket za novi početak',
    kategorija: 'ostalo',
    opis: 'Telefon, odjeća, prva registracija i nešto sitno u džepu.',
    detalj:
      'Za prvi dan u gradu. Telefon s brojem, set odjeće po izboru, plaćena prva registracija i mali početni iznos gotovine. Ne preskače ti nijedan korak priče, samo skrati čekanje.',
    cijena: 450,
    slika: '1610599083971-83a1abb23a56',
    alt: 'Gradska ulica noću s upaljenim izlozima i prometom',
    oznaka: 'novo',
    specifikacije: [
      { labela: 'Telefon', vrijednost: 'Uključen' },
      { labela: 'Odjeća', vrijednost: '1 set' },
      { labela: 'Gotovina', vrijednost: '2 500 kn' },
    ],
  },
  {
    id: 'AX-O-412',
    naziv: 'Prilagođena registarska pločica',
    kategorija: 'ostalo',
    opis: 'Osam znakova koje grad pamti duže od tvog lica.',
    detalj:
      'Biraš vlastitu kombinaciju do osam znakova i vežeš je na jedno vozilo. Pločica ostaje tvoja i ako auto prodaš. Neprikladne kombinacije administracija odbija.',
    cijena: 350,
    slika: '1761316258424-470bb1ab3225',
    alt: 'Stražnji dio prilagođenog automobila s vidljivom registarskom pločicom noću',
    specifikacije: [
      { labela: 'Znakova', vrijednost: 'do 8' },
      { labela: 'Prijenos', vrijednost: 'Da' },
      { labela: 'Odobrenje', vrijednost: 'Ručno' },
    ],
  },
  {
    id: 'AX-O-420',
    naziv: 'Poslovni broj i oglas',
    kategorija: 'ostalo',
    opis: 'Drugi broj i mjesto na gradskoj oglasnoj ploči.',
    detalj:
      'Odvojeni poslovni broj koji ne otkriva tvoj privatni, plus trajni oglas na gradskoj ploči. Ako prodaješ, prevoziš ili nudiš uslugu, ovo ti donosi prve klijente.',
    cijena: 600,
    slika: '1600856209923-34372e319a5d',
    alt: 'Ruka drži upaljeni mobitel u gotovo potpunom mraku',
    specifikacije: [
      { labela: 'Brojevi', vrijednost: '2' },
      { labela: 'Oglas', vrijednost: 'Trajan' },
      { labela: 'Izmjene', vrijednost: 'Neograničeno' },
    ],
  },
]

/** The three products in the home page bento. Order matters: the first fills the tall cell. */
export const ISTAKNUTI_ID = ['AX-V-118', 'AX-B-201', 'AX-N-301'] as const

export function proizvodPoId(id: string): Proizvod | undefined {
  return PROIZVODI.find((p) => p.id === id)
}
