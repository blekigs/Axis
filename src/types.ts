/** Domain types for the Axis RolePlay demo storefront. */

export type Kategorija = 'vozila' | 'bande' | 'nekretnine' | 'ostalo'

export type Oznaka = 'novo' | 'ograniceno' | 'popularno'

export interface Specifikacija {
  labela: string
  vrijednost: string
}

export interface Proizvod {
  /** Stable code, rendered in mono on the card. Also the cart key. */
  id: string
  naziv: string
  kategorija: Kategorija
  /** One line. Card copy. */
  opis: string
  /** One paragraph. Detail dialog. */
  detalj: string
  /** Whole credits. */
  cijena: number
  /** Unsplash photo id, without the `photo-` prefix. All verified to resolve. */
  slika: string
  alt: string
  oznaka?: Oznaka
  specifikacije: Specifikacija[]
}

export interface StavkaKosarice {
  proizvod: Proizvod
  kolicina: number
}

export interface KategorijaMeta {
  id: Kategorija | 'sve'
  naziv: string
  /** Shown under the tab row when the tab is active. */
  opis: string
}
