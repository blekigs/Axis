import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react'
import type { Proizvod, StavkaKosarice } from '../types'
import { POCETNI_CREDITI } from '../data/sadrzaj'

/**
 * The whole credits demo. There is no backend and no persistence on purpose:
 * refreshing resets the balance, and the site says so out loud.
 */

interface Stanje {
  crediti: number
  stavke: StavkaKosarice[]
  /** Product ids bought this session, so the store can mark them. */
  kupljeno: string[]
}

type Akcija =
  | { tip: 'dodaj'; proizvod: Proizvod }
  | { tip: 'ukloni'; id: string }
  | { tip: 'postavi-kolicinu'; id: string; kolicina: number }
  | { tip: 'kupi' }
  | { tip: 'isprazni' }

const pocetno: Stanje = { crediti: POCETNI_CREDITI, stavke: [], kupljeno: [] }

function zbroj(stavke: StavkaKosarice[]): number {
  return stavke.reduce((s, x) => s + (x.proizvod.cijena ?? 0) * x.kolicina, 0)
}

function reducer(stanje: Stanje, akcija: Akcija): Stanje {
  switch (akcija.tip) {
    case 'dodaj': {
      // Nothing without a credit price yet can enter the cart.
      if (akcija.proizvod.cijena === null) return stanje
      const postoji = stanje.stavke.find((s) => s.proizvod.id === akcija.proizvod.id)
      if (postoji) {
        return {
          ...stanje,
          stavke: stanje.stavke.map((s) =>
            s.proizvod.id === akcija.proizvod.id ? { ...s, kolicina: s.kolicina + 1 } : s
          ),
        }
      }
      return { ...stanje, stavke: [...stanje.stavke, { proizvod: akcija.proizvod, kolicina: 1 }] }
    }

    case 'ukloni':
      return { ...stanje, stavke: stanje.stavke.filter((s) => s.proizvod.id !== akcija.id) }

    case 'postavi-kolicinu': {
      if (akcija.kolicina < 1) {
        return { ...stanje, stavke: stanje.stavke.filter((s) => s.proizvod.id !== akcija.id) }
      }
      return {
        ...stanje,
        stavke: stanje.stavke.map((s) =>
          s.proizvod.id === akcija.id ? { ...s, kolicina: Math.min(akcija.kolicina, 9) } : s
        ),
      }
    }

    case 'kupi': {
      const ukupno = zbroj(stanje.stavke)
      // Guarded here as well as in the UI: a disabled button is a hint, not a rule.
      if (ukupno === 0 || ukupno > stanje.crediti) return stanje
      return {
        crediti: stanje.crediti - ukupno,
        stavke: [],
        kupljeno: [...new Set([...stanje.kupljeno, ...stanje.stavke.map((s) => s.proizvod.id)])],
      }
    }

    case 'isprazni':
      return { ...stanje, stavke: [] }

    default:
      return stanje
  }
}

interface StoreVrijednost extends Stanje {
  ukupno: number
  brojStavki: number
  dovoljnoCredita: boolean
  nedostaje: number
  /** Bumped on every successful purchase so the header can announce the change. */
  zadnjaKupnja: string | null
  kosaricaOtvorena: boolean
  dodaj: (p: Proizvod) => void
  ukloni: (id: string) => void
  postaviKolicinu: (id: string, kolicina: number) => void
  kupi: () => void
  isprazni: () => void
  otvoriKosaricu: () => void
  zatvoriKosaricu: () => void
  uKosarici: (id: string) => number
}

const StoreContext = createContext<StoreVrijednost | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [stanje, dispatch] = useReducer(reducer, pocetno)
  const [kosaricaOtvorena, setKosaricaOtvorena] = useState(false)
  const [zadnjaKupnja, setZadnjaKupnja] = useState<string | null>(null)

  const ukupno = useMemo(() => zbroj(stanje.stavke), [stanje.stavke])
  const brojStavki = useMemo(
    () => stanje.stavke.reduce((n, s) => n + s.kolicina, 0),
    [stanje.stavke]
  )

  const dodaj = useCallback((p: Proizvod) => dispatch({ tip: 'dodaj', proizvod: p }), [])
  const ukloni = useCallback((id: string) => dispatch({ tip: 'ukloni', id }), [])
  const postaviKolicinu = useCallback(
    (id: string, kolicina: number) => dispatch({ tip: 'postavi-kolicinu', id, kolicina }),
    []
  )
  const isprazni = useCallback(() => dispatch({ tip: 'isprazni' }), [])
  const otvoriKosaricu = useCallback(() => setKosaricaOtvorena(true), [])
  const zatvoriKosaricu = useCallback(() => setKosaricaOtvorena(false), [])

  const kupi = useCallback(() => {
    if (ukupno === 0 || ukupno > stanje.crediti) return
    dispatch({ tip: 'kupi' })
    setZadnjaKupnja(`${Date.now()}`)
  }, [ukupno, stanje.crediti])

  const uKosarici = useCallback(
    (id: string) => stanje.stavke.find((s) => s.proizvod.id === id)?.kolicina ?? 0,
    [stanje.stavke]
  )

  const vrijednost = useMemo<StoreVrijednost>(
    () => ({
      ...stanje,
      ukupno,
      brojStavki,
      dovoljnoCredita: ukupno <= stanje.crediti,
      nedostaje: Math.max(0, ukupno - stanje.crediti),
      zadnjaKupnja,
      kosaricaOtvorena,
      dodaj,
      ukloni,
      postaviKolicinu,
      kupi,
      isprazni,
      otvoriKosaricu,
      zatvoriKosaricu,
      uKosarici,
    }),
    [
      stanje,
      ukupno,
      brojStavki,
      zadnjaKupnja,
      kosaricaOtvorena,
      dodaj,
      ukloni,
      postaviKolicinu,
      kupi,
      isprazni,
      otvoriKosaricu,
      zatvoriKosaricu,
      uKosarici,
    ]
  )

  return <StoreContext.Provider value={vrijednost}>{children}</StoreContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore(): StoreVrijednost {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore mora biti unutar StoreProvider komponente.')
  return ctx
}
