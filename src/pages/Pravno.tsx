import type { ReactNode } from 'react'
import { useSeo } from '../hooks/useSeo'

/**
 * Shared shell for the two legal pages. Narrow measure, plain hierarchy, no art
 * direction: these pages are for reading, not for impressing anyone.
 */
function PravnaStranica({
  naslov,
  uvod,
  children,
}: {
  naslov: string
  uvod: string
  children: ReactNode
}) {
  return (
    <>
      <section className="border-b border-line">
        <div className="u-shell py-14 lg:py-20">
          <h1 className="u-d2 max-w-[18ch]">{naslov}</h1>
          <p className="mt-5 max-w-[58ch] text-[1.0625rem] leading-relaxed text-dim">{uvod}</p>
        </div>
      </section>

      <section className="u-shell py-16 lg:py-20">
        <div className="max-w-[68ch] space-y-10">
          <div className="border border-red/40 px-5 py-4">
            <p className="text-[0.875rem] leading-relaxed text-text">
              Ovaj tekst je predložak za demo verziju stranice. Prije objave mora ga pregledati
              pravnik i uskladiti s podacima o stvarnom nositelju servera.
            </p>
          </div>

          {children}
        </div>
      </section>
    </>
  )
}

function Odjeljak({ naslov, children }: { naslov: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-[1.125rem] font-medium normal-case tracking-normal text-text">
        {naslov}
      </h2>
      <div className="mt-3 space-y-3 leading-relaxed text-dim">{children}</div>
    </section>
  )
}

export function Uvjeti() {
  useSeo({
    naslov: 'Uvjeti korištenja',
    opis: 'Uvjeti korištenja Axis RolePlay servera i trgovine. Predložak za demo verziju stranice.',
  })

  return (
    <PravnaStranica
      naslov="Uvjeti korištenja"
      uvod="Pravila koja vrijede za korištenje stranice, trgovine i samog servera."
    >
      <Odjeljak naslov="Tko stoji iza servera">
        <p>
          Axis RolePlay je zajednica igrača koja održava FiveM roleplay server. Podaci o nositelju,
          sjedištu i kontaktu upisuju se ovdje prije objave stranice.
        </p>
        <p>
          Axis RolePlay nije povezan s Rockstar Games, Take-Two Interactive ni s Cfx.re. Za igru je
          potrebna vlastita legalna kopija igre Grand Theft Auto V.
        </p>
      </Odjeljak>

      <Odjeljak naslov="Pristup i whitelist">
        <p>
          Pristup serveru odobrava se kroz whitelist. Najmanja dob je šesnaest godina. Prijava se
          može odbiti bez detaljnog obrazloženja, a odobrenje se može povući ako se prekrše pravila
          zajednice.
        </p>
      </Odjeljak>

      <Odjeljak naslov="Crediti i kupnja">
        <p>
          Crediti su interna valuta koja se koristi isključivo unutar Axis RolePlay okruženja. Nisu
          zakonsko sredstvo plaćanja, ne mogu se zamijeniti za novac i ne prenose se na druge
          servere ni platforme.
        </p>
        <p>
          Nadoplata credita obavlja se isključivo preko platforme Tebex. Tebex je trgovac koji
          obrađuje plaćanje, izdaje račun i vodi postupak povrata. Nijedan drugi način uplate nije
          valjan.
        </p>
        <p>
          Kupljene stavke vezane su uz lika u igri. Prodaja, zamjena ili prijenos likova i stavki
          izvan igre nisu dopušteni i mogu dovesti do gubitka pristupa.
        </p>
      </Odjeljak>

      <Odjeljak naslov="Povrat">
        <p>
          Povrat se traži preko Tebex-a i moguć je dok stavka nije preuzeta u igri. Nakon
          preuzimanja stavka se može prodati unutar igre po tržišnim uvjetima.
        </p>
      </Odjeljak>

      <Odjeljak naslov="Ponašanje u igri">
        <p>
          Od igrača se očekuje da ostanu u liku, poštuju priču drugih igrača i ne koriste
          nedopuštene izmjene klijenta. Potpuna pravila objavljena su na Discordu i dio su ovih
          uvjeta.
        </p>
      </Odjeljak>

      <Odjeljak naslov="Dostupnost servera">
        <p>
          Server se održava po najboljoj mogućnosti, ali neprekinuta dostupnost se ne jamči.
          Planirano održavanje najavljuje se unaprijed na Discordu.
        </p>
      </Odjeljak>

      <Odjeljak naslov="Izmjene uvjeta">
        <p>
          Uvjeti se mogu mijenjati. Bitne izmjene najavljuju se na Discordu najmanje sedam dana
          prije stupanja na snagu.
        </p>
      </Odjeljak>
    </PravnaStranica>
  )
}

export function Privatnost() {
  useSeo({
    naslov: 'Pravila privatnosti',
    opis:
      'Kako Axis RolePlay postupa s podacima igrača. Predložak pravila privatnosti za demo verziju stranice.',
  })

  return (
    <PravnaStranica
      naslov="Pravila privatnosti"
      uvod="Koje podatke prikupljamo, zašto ih prikupljamo i koliko dugo ih čuvamo."
    >
      <Odjeljak naslov="Podaci koje prikupljamo">
        <p>
          Za prijavu na whitelist prikupljamo ime ili nadimak, Discord oznaku, dob i sadržaj
          prijave. Za rad servera bilježimo identifikatore igre, kao što su Steam, Rockstar ili
          licenčni identifikator, te zapise igre koji služe za rješavanje prijava.
        </p>
        <p>
          Ako se javiš preko obrasca na ovoj stranici, obrađujemo ime, email i sadržaj poruke. U
          ovoj demo verziji obrazac ne šalje ništa i podaci se nigdje ne spremaju.
        </p>
      </Odjeljak>

      <Odjeljak naslov="Podaci o plaćanju">
        <p>
          Podatke o plaćanju obrađuje Tebex kao samostalni voditelj obrade. Axis RolePlay nikad ne
          vidi ni ne pohranjuje brojeve kartica. Od Tebex-a primamo samo potvrdu da je transakcija
          izvršena i podatak koje credite treba dodijeliti.
        </p>
      </Odjeljak>

      <Odjeljak naslov="Zašto obrađujemo podatke">
        <p>
          Podatke obrađujemo kako bismo omogućili pristup serveru, riješili prijave, spriječili
          zloupotrebe i ispunili obveze prema kupcima. Pravna osnova je izvršenje ugovora i naš
          legitimni interes za sigurnost zajednice.
        </p>
      </Odjeljak>

      <Odjeljak naslov="Koliko dugo čuvamo podatke">
        <p>
          Zapisi igre čuvaju se do devedeset dana. Prijave na whitelist čuvaju se dok je račun
          aktivan i godinu dana nakon toga. Podaci o kupnjama čuvaju se koliko nalažu propisi o
          računovodstvu.
        </p>
      </Odjeljak>

      <Odjeljak naslov="Tvoja prava">
        <p>
          Imaš pravo na pristup svojim podacima, ispravak, brisanje, ograničenje obrade i prigovor.
          Zahtjev se šalje na kontakt adresu navedenu u uvjetima korištenja, a odgovaramo u roku od
          trideset dana.
        </p>
        <p>
          Ako smatraš da podatke obrađujemo protivno propisima, možeš se obratiti Agenciji za
          zaštitu osobnih podataka.
        </p>
      </Odjeljak>

      <Odjeljak naslov="Kolačići">
        <p>
          Ova stranica ne koristi kolačiće za praćenje ni analitiku. Sve što odabereš u trgovini
          drži se samo u memoriji preglednika i nestaje kad zatvoriš ili osvježiš stranicu.
        </p>
      </Odjeljak>
    </PravnaStranica>
  )
}
