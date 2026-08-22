import type { KategorijaMeta, Proizvod } from '../types'

/**
 * The whole catalogue lives here. To change what the store sells, edit this file
 * and nothing else. Prices are whole credits.
 *
 * Every `cijena` below is `null`: credit prices are not decided yet and are
 * added item by item once they are. `organizacije` is the one category with a
 * price already fixed, but it's fixed in euros (`cijenaEur`), not credits — see
 * the `napomena` on that category in `KATEGORIJE`. See PLACEHOLDERS.md.
 *
 * `slika` is an Unsplash photo id standing in for a future in-game screenshot.
 * Every id was fetched and visually reviewed before it was assigned, so the alt
 * text describes the photo that actually loads. A handful of ids repeat across
 * unrelated items — the catalogue outgrew the reviewed photo set, and a repeat
 * mood shot beats an unverified one. See PLACEHOLDERS.md.
 */

export const KATEGORIJE: KategorijaMeta[] = [
  {
    id: 'sve',
    naziv: 'Sve',
    opis: 'Cijeli katalog, po kategorijama, a unutar svake od najjeftinijeg.',
  },
  {
    id: 'automobili',
    naziv: 'Automobili',
    opis: 'Vozila po mjeri, izrađena jednom i registrirana samo na tebe.',
  },
  {
    id: 'custom-organizacije',
    naziv: 'Custom organizacije',
    opis: 'Organizacija izrađena od nule, s mapom ili bez nje, po tvom konceptu.',
  },
  {
    id: 'organizacije',
    naziv: 'Organizacije',
    opis: 'Ulaz u postojeću strukturu grada, donatorsku ili državnu.',
    napomena: 'Sve donatorske mafije = 10 €, sve državne organizacije = 25 €.',
  },
  {
    id: 'dodaci',
    naziv: 'Dodaci za organizaciju',
    opis: 'Nadogradnje za organizaciju koju već vodiš: oprema, slotovi i administracija.',
  },
  {
    id: 'biznis',
    naziv: 'Biznis',
    opis: 'Legalni poslovi u gradu, od kioska do cijele auto pijace.',
  },
  {
    id: 'ostalo',
    naziv: 'Ostalo',
    opis: 'Sitnice po mjeri koje ne staju ni u jednu drugu kategoriju.',
  },
]

export const PROIZVODI: Proizvod[] = [
  // --- Automobili --------------------------------------------------------
  {
    id: 'AX-V-101',
    naziv: 'Custom Handling Vozilo',
    kategorija: 'automobili',
    opis: 'Izrađeno jednom, po tvojoj specifikaciji, i nikad ponovljeno.',
    detalj:
      'Vozilo po mjeri: model, handling, zvuk motora i vizualni paket dogovaraju se izravno s timom prije izrade. Radi se u jednom primjerku (1/1) i registrira se samo na tebe. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1610374634235-b51ef357f905',
    alt: 'Tamni sportski coupe s upaljenim stražnjim svjetlima, snimljen u sumrak',
    oznaka: 'ograniceno',
    specifikacije: [
      { labela: 'Serija', vrijednost: '1/1' },
      { labela: 'Handling', vrijednost: 'Po dogovoru' },
      { labela: 'Registracija', vrijednost: 'Trajna' },
    ],
  },

  // --- Custom organizacije ------------------------------------------------
  {
    id: 'AX-C-201',
    naziv: 'Custom organizacija (ilegalna, bez mape)',
    kategorija: 'custom-organizacije',
    opis: 'Ime, znak i hijerarhija za ilegalnu organizaciju bez posebne mape.',
    detalj:
      'Ilegalna organizacija izrađena od nule: ime, boja, znak i rangovi po tvom konceptu, bez dodatne mape ili baze izrađene za nju. Teritorij i ugled se i dalje zarađuju u gradu. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1637970067784-927e66e07e36',
    alt: 'Prazna i slabo osvijetljena industrijska hala s betonskim stupovima',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Ilegalna' },
      { labela: 'Mapa', vrijednost: 'Ne' },
      { labela: 'Izrada', vrijednost: 'Po konceptu' },
    ],
  },
  {
    id: 'AX-C-202',
    naziv: 'Custom organizacija (ilegalna, sa mapom)',
    kategorija: 'custom-organizacije',
    opis: 'Isto, uz posebno izrađenu mapu i bazu za organizaciju.',
    detalj:
      'Ilegalna organizacija izrađena od nule, uz mapu i bazu napravljenu posebno za nju: raspored, skrivena mjesta i pristupne točke dogovaraju se s timom. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1474408886716-087263db7da1',
    alt: 'Dugi hodnik podzemne garaže osvijetljen tek redom stropnih svjetiljki',
    oznaka: 'popularno',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Ilegalna' },
      { labela: 'Mapa', vrijednost: 'Da' },
      { labela: 'Izrada', vrijednost: 'Po konceptu' },
    ],
  },
  {
    id: 'AX-C-210',
    naziv: 'Održavanje državne organizacije',
    kategorija: 'custom-organizacije',
    opis: 'Mjesečna nadogradnja i podrška za postojeću državnu organizaciju.',
    detalj:
      'Za organizacije koje već postoje: dorade opreme, ispravke i manje izmjene koje državna organizacija zatraži tijekom rada. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1611416457332-946853cc75d6',
    alt: 'Poslovni toranj iznad grada u kasnim noćnim satima',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Državna' },
      { labela: 'Trajanje', vrijednost: 'Tekuće' },
      { labela: 'Podrška', vrijednost: 'Uključena' },
    ],
  },

  // --- Organizacije --------------------------------------------------------
  {
    id: 'AX-G-301',
    naziv: 'Donatorska mafija',
    kategorija: 'organizacije',
    opis: 'Ulaz u postojeću donatorsku mafiju, po fiksnoj cijeni od 10 €.',
    detalj:
      'Referentna stavka za sve donatorske mafije na serveru: fiksno 10 €, bez obzira koja organizacija. Cijena u creditima dolazi naknadno; euro cijena je fiksna i konačno plaćanje ide preko Tebex-a po njoj.',
    cijena: null,
    cijenaEur: 10,
    slika: '1572491671626-ca1747c3cc57',
    alt: 'Uska gradska ulica okupana crvenim svjetlom neonskih natpisa',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Donatorska' },
      { labela: 'Cijena', vrijednost: '10 € fiksno' },
      { labela: 'Plaćanje', vrijednost: 'Tebex' },
    ],
  },
  {
    id: 'AX-G-302',
    naziv: 'Državna organizacija',
    kategorija: 'organizacije',
    opis: 'Ulaz u postojeću državnu organizaciju, po fiksnoj cijeni od 25 €.',
    detalj:
      'Referentna stavka za sve državne organizacije na serveru: fiksno 25 €, bez obzira koja organizacija. Cijena u creditima dolazi naknadno; euro cijena je fiksna i konačno plaćanje ide preko Tebex-a po njoj.',
    cijena: null,
    cijenaEur: 25,
    slika: '1569169507605-f91e088ce91a',
    alt: 'Neboderi uz obalu odraženi u mirnoj vodi noću',
    oznaka: 'popularno',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Državna' },
      { labela: 'Cijena', vrijednost: '25 € fiksno' },
      { labela: 'Plaćanje', vrijednost: 'Tebex' },
    ],
  },

  // --- Dodaci za organizaciju ------------------------------------------------
  {
    id: 'AX-D-401',
    naziv: 'Panciri',
    kategorija: 'dodaci',
    opis: 'Standardna oprema za članove organizacije, spremna za podjelu.',
    detalj: 'Set panciri za organizaciju, dostupan za podjelu članovima po rangu. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1571673638846-2adffccdc689',
    alt: 'Mračna dnevna soba s kaučem i prozorima kroz koje ulazi crveno svjetlo',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Oprema' },
      { labela: 'Podjela', vrijednost: 'Po rangu' },
    ],
  },
  {
    id: 'AX-D-402',
    naziv: 'Auto Mafija',
    kategorija: 'dodaci',
    opis: 'Dodatno vozilo dostupno cijeloj organizaciji, ne pojedincu.',
    detalj: 'Vozilo vezano uz organizaciju umjesto uz jednog člana, dostupno svima s pristupom. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1611493761903-df1720dcbf8b',
    alt: 'Sportski coupe sa širokim blatobranima ispred industrijske zgrade noću',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Vozilo' },
      { labela: 'Pristup', vrijednost: 'Organizacija' },
    ],
  },
  {
    id: 'AX-D-403',
    naziv: 'Hitman',
    kategorija: 'dodaci',
    opis: 'Otvara hitman mehaniku za organizaciju.',
    detalj: 'Aktivacija hitman sustava za organizaciju, uključujući pravila i ograničenja koja tim postavi. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1602166862596-b456047ca787',
    alt: 'Automobil s upaljenim svjetlima u gustoj noćnoj magli',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Mehanika' },
      { labela: 'Aktivacija', vrijednost: 'Trajna' },
    ],
  },
  {
    id: 'AX-D-404',
    naziv: 'Pranje para',
    kategorija: 'dodaci',
    opis: 'Otvara mehaniku pranja novca za organizaciju.',
    detalj: 'Sustav za pranje novca vezan uz bazu organizacije, s limitom po danu koji tim postavlja. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1610599083971-83a1abb23a56',
    alt: 'Gradska ulica noću s upaljenim izlozima i prometom',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Mehanika' },
      { labela: 'Limit', vrijednost: 'Dnevni' },
    ],
  },
  {
    id: 'AX-D-405',
    naziv: 'Custom enterijer',
    kategorija: 'dodaci',
    opis: 'Prilagođena unutrašnjost baze organizacije.',
    detalj: 'Izrada unutrašnjosti baze po konceptu organizacije: raspored, namještaj i osvjetljenje. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1541194577687-8c63bf9e7ee3',
    alt: 'Zamračen dnevni boravak s kaučem i velikim prozorom',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Izrada' },
      { labela: 'Prostor', vrijednost: 'Baza' },
    ],
  },
  {
    id: 'AX-D-406',
    naziv: 'Helikopter',
    kategorija: 'dodaci',
    opis: 'Zračno vozilo dostupno organizaciji.',
    detalj: 'Helikopter vezan uz bazu organizacije, s pristupom po rangu koji tim odredi. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1492086517200-9393d4eb53bf',
    alt: 'Svjetla grada snimljena iz zraka u kasnim noćnim satima',
    oznaka: 'popularno',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Zračno vozilo' },
      { labela: 'Pristup', vrijednost: 'Po rangu' },
    ],
  },
  {
    id: 'AX-D-407',
    naziv: 'Dodatni auto u organizaciji iz salona',
    kategorija: 'dodaci',
    opis: 'Još jedno vozilo iz salona, dodano na popis organizacije.',
    detalj: 'Standardno vozilo iz salona dodano na popis vozila dostupnih organizaciji. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1532115345388-6d3d2021f188',
    alt: 'Silueta sportskog automobila s otvorenim vratima na otvorenom u sumrak',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Iz salona' },
      { labela: 'Pristup', vrijednost: 'Organizacija' },
    ],
  },
  {
    id: 'AX-D-408',
    naziv: 'Dodatni auto u organizaciji custom',
    kategorija: 'dodaci',
    opis: 'Dodatno custom vozilo, dodano na popis organizacije.',
    detalj: 'Custom vozilo dodano na popis vozila organizacije, izrađeno po istim pravilima kao pojedinačni custom automobili. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1608762232687-dee1b4243837',
    alt: 'Terenac čija duga svjetla probijaju mrak izvan grada',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Custom' },
      { labela: 'Pristup', vrijednost: 'Organizacija' },
    ],
  },
  {
    id: 'AX-D-409',
    naziv: 'Promena lokacije baze',
    kategorija: 'dodaci',
    opis: 'Premještanje baze organizacije na novu lokaciju.',
    detalj: 'Baza organizacije se premješta na novu, dogovorenu lokaciju uz zadržavanje postojeće opreme. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1560307002-306085d5ca4e',
    alt: 'Uska ulica s neonskim natpisima nakon kiše',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Administrativno' },
      { labela: 'Oprema', vrijednost: 'Zadržana' },
    ],
  },
  {
    id: 'AX-D-410',
    naziv: 'Menjanje imena organizacije',
    kategorija: 'dodaci',
    opis: 'Promjena registriranog imena organizacije.',
    detalj: 'Ime organizacije se mijenja na svim mjestima gdje je vezano: rangovi, radio kanal i evidencija. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1653439238934-8a2f6a882790',
    alt: 'Osvijetljeni znak parkirališta na mračnom raskrižju',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Administrativno' },
      { labela: 'Izmjene', vrijednost: 'Sve reference' },
    ],
  },
  {
    id: 'AX-D-411',
    naziv: '+5 Slotova Za Mafiju',
    kategorija: 'dodaci',
    opis: 'Pet dodatnih mjesta za članove organizacije.',
    detalj: 'Trajno povećanje kapaciteta organizacije za pet članova. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1536286144513-881bfbd3f292',
    alt: 'Pogled iz zraka na gusto osvijetljeni centar grada',
    specifikacije: [
      { labela: 'Slotova', vrijednost: '+5' },
      { labela: 'Trajanje', vrijednost: 'Trajno' },
    ],
  },
  {
    id: 'AX-D-412',
    naziv: '+10 Slotova Za Mafiju',
    kategorija: 'dodaci',
    opis: 'Deset dodatnih mjesta za članove organizacije.',
    detalj: 'Trajno povećanje kapaciteta organizacije za deset članova. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1613713568305-8da2fc04f168',
    alt: 'Svjetlosni tragovi automobila u dugoj ekspoziciji',
    specifikacije: [
      { labela: 'Slotova', vrijednost: '+10' },
      { labela: 'Trajanje', vrijednost: 'Trajno' },
    ],
  },
  {
    id: 'AX-D-413',
    naziv: 'Prebacivanje Lidera',
    kategorija: 'dodaci',
    opis: 'Prijenos vodstva organizacije na drugog člana.',
    detalj: 'Uloga lidera organizacije se prenosi na odabranog člana, uz potvrdu obje strane pred timom. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1571366657764-16ca342d3284',
    alt: 'Prolaznici s kišobranima na mokrom pločniku pod uličnom rasvjetom',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Administrativno' },
      { labela: 'Potvrda', vrijednost: 'Obje strane' },
    ],
  },
  {
    id: 'AX-D-414',
    naziv: 'Privatna garaža',
    kategorija: 'dodaci',
    opis: 'Zasebna garaža vezana uz organizaciju, odvojena od javnih.',
    detalj: 'Garaža dostupna samo članovima organizacije, s pristupom po rangu. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1620726068483-d4d53738ba48',
    alt: 'Podzemna garaža s nizom parkirnih mjesta i obojanim stupovima',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Garaža' },
      { labela: 'Pristup', vrijednost: 'Po rangu' },
    ],
  },
  {
    id: 'AX-D-415',
    naziv: 'Bankomat u bazi',
    kategorija: 'dodaci',
    opis: 'Bankomat postavljen unutar baze organizacije.',
    detalj: 'Bankomat instaliran u bazi, s pristupom ograničenim na članove organizacije. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1552750866-bf6c618921eb',
    alt: 'Osvijetljeni ulični natpis iznad prolaza u mračnoj ulici',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Oprema' },
      { labela: 'Pristup', vrijednost: 'Članovi' },
    ],
  },

  // --- Biznis ------------------------------------------------------------
  {
    id: 'AX-B-501',
    naziv: 'Prodavnice',
    kategorija: 'biznis',
    opis: 'Mreža prodavnica u gradu, tvoja za vođenje i zapošljavanje.',
    detalj: 'Prodavnica s vlastitom evidencijom robe i mogućnošću zapošljavanja drugih igrača. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1603793510575-a8cf24361baa',
    alt: 'Silueta grada noću s tek nekoliko osvijetljenih tornjeva',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Trgovina' },
      { labela: 'Zapošljavanje', vrijednost: 'Da' },
    ],
  },
  {
    id: 'AX-B-502',
    naziv: 'Restorani',
    kategorija: 'biznis',
    opis: 'Restoran s vlastitom kuhinjom, cjenikom i osobljem.',
    detalj: 'Restoran koji vodiš od cjenika do osoblja, s prostorom za goste unutar i vani. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1540882082344-a56ecd70ba96',
    alt: 'Osvijetljena kuća s bazenom i terasom snimljena nakon zalaska sunca',
    oznaka: 'popularno',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Ugostiteljstvo' },
      { labela: 'Osoblje', vrijednost: 'Da' },
    ],
  },
  {
    id: 'AX-B-503',
    naziv: 'Pumpe',
    kategorija: 'biznis',
    opis: 'Benzinska postaja s vlastitom cijenom goriva.',
    detalj: 'Pumpa koju vodiš, s cijenom goriva koju sam postavljaš unutar dopuštenog raspona. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1523374228107-6e44bd2b524e',
    alt: 'Poluotok prekriven svjetlima grada, snimljen iz zraka noću',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Pumpa' },
      { labela: 'Cijena goriva', vrijednost: 'Podesiva' },
    ],
  },
  {
    id: 'AX-B-504',
    naziv: 'Perionice',
    kategorija: 'biznis',
    opis: 'Autopraonica s redovnim prometom mušterija.',
    detalj: 'Perionica vozila s vlastitim cjenikom usluga i prostorom za dodatnu opremu. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1761316258424-470bb1ab3225',
    alt: 'Stražnji dio prilagođenog automobila s vidljivom registarskom pločicom noću',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Usluga' },
      { labela: 'Cjenik', vrijednost: 'Vlastiti' },
    ],
  },
  {
    id: 'AX-B-505',
    naziv: 'Impound',
    kategorija: 'biznis',
    opis: 'Vođenje impound službe i naplata preuzimanja vozila.',
    detalj: 'Impound biznis s pravom naplate preuzimanja vozila, po cjeniku koji sam postavljaš. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1662567430100-d173bdaad866',
    alt: 'Bijeli dostavni kombi s upaljenim svjetlima na gradskoj ulici noću',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Usluga' },
      { labela: 'Naplata', vrijednost: 'Vlastita' },
    ],
  },
  {
    id: 'AX-B-506',
    naziv: 'Custom biznis',
    kategorija: 'biznis',
    opis: 'Biznis izrađen po tvom konceptu, izvan standardne ponude.',
    detalj: 'Za ideje koje ne staju u standardnu ponudu: koncept, lokaciju i mehanike dogovaraš izravno s timom. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1600856209923-34372e319a5d',
    alt: 'Ruka drži upaljeni mobitel u gotovo potpunom mraku',
    oznaka: 'novo',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Po konceptu' },
      { labela: 'Izrada', vrijednost: 'Na dogovor' },
    ],
  },
  {
    id: 'AX-B-507',
    naziv: 'Auto Pijaca',
    kategorija: 'biznis',
    opis: 'Vlastita auto pijaca, s prometom vozila koji sam vodiš.',
    detalj: 'Auto pijaca kao biznis: kupnja, prodaja i izlaganje vozila pod tvojim vodstvom. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1623346483743-b968a27ed34c',
    alt: 'Automobil na gradskoj ulici noću, okružen svjetlosnim tragovima prometa',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Trgovina vozilima' },
      { labela: 'Vođenje', vrijednost: 'Samostalno' },
    ],
  },

  // --- Ostalo ----------------------------------------------------------------
  {
    id: 'AX-X-601',
    naziv: 'Custom ped na serveru',
    kategorija: 'ostalo',
    opis: 'Prilagođen izgled lika, izrađen posebno za tebe.',
    detalj: 'Model lika (ped) izrađen po tvojoj specifikaciji i dodan na server, umjesto standardnih izgleda. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1610599083971-83a1abb23a56',
    alt: 'Gradska ulica noću s upaljenim izlozima i prometom',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Izgled lika' },
      { labela: 'Izrada', vrijednost: 'Po specifikaciji' },
    ],
  },
  {
    id: 'AX-X-602',
    naziv: 'Custom broj telefona',
    kategorija: 'ostalo',
    opis: 'Biraš vlastitu kombinaciju za broj telefona u igri.',
    detalj: 'Odabrana kombinacija znamenki dodijeljena tvom telefonu u igri, u granicama koje sustav dopušta. Cijena u creditima dolazi naknadno.',
    cijena: null,
    slika: '1600856209923-34372e319a5d',
    alt: 'Ruka drži upaljeni mobitel u gotovo potpunom mraku',
    specifikacije: [
      { labela: 'Tip', vrijednost: 'Broj telefona' },
      { labela: 'Odabir', vrijednost: 'Vlastiti' },
    ],
  },
]

/** The three products in the home page bento. Order matters: the first fills the tall cell. */
export const ISTAKNUTI_ID = ['AX-V-101', 'AX-G-302', 'AX-B-506'] as const

export function proizvodPoId(id: string): Proizvod | undefined {
  return PROIZVODI.find((p) => p.id === id)
}
