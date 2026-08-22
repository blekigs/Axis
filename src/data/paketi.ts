import type { KreditPaket } from '../types'

/**
 * Credit top-up bundles. This is the only place their euro price and credit
 * amount are defined — the ratio is not linear, so don't derive one pack from
 * another.
 */
export const PAKETI_CREDITA: KreditPaket[] = [
  { id: 'AX-P-05', eur: 5, crediti: 500 },
  { id: 'AX-P-10', eur: 10, crediti: 1200 },
  { id: 'AX-P-20', eur: 20, crediti: 2500 },
  { id: 'AX-P-30', eur: 30, crediti: 4000 },
  { id: 'AX-P-40', eur: 40, crediti: 5500 },
  { id: 'AX-P-50', eur: 50, crediti: 7100 },
  { id: 'AX-P-100', eur: 100, crediti: 17000 },
]
