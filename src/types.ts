/** Domain types for the Axis RolePlay demo storefront. */

export type Kategorija =
  | 'automobili'
  | 'custom-organizacije'
  | 'organizacije'
  | 'dodaci'
  | 'biznis'
  | 'ostalo'

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
  /**
   * Whole credits, or `null` when the credit price is not set yet. Every
   * item ships with `null` for now — credit prices are added per item once
   * they're decided. See PLACEHOLDERS.md.
   */
  cijena: number | null
  /**
   * Reference euro price, shown alongside the credit price. Only set for
   * items that follow a fixed euro rule (organizacije).
   */
  cijenaEur?: number
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
  /** Optional pricing rule or note, shown as a small badge under the description. */
  napomena?: string
}

export interface KreditPaket {
  id: string
  eur: number
  crediti: number
}
