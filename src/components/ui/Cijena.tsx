import { creditRijec, formatirajBroj } from '../../lib/format'

interface Props {
  iznos: number
  velicina?: 'sm' | 'md' | 'lg'
  className?: string
}

const VELICINE = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
} as const

/**
 * Prices and balances are tabular mono so a column of numbers lines up and a
 * changing balance does not shift the layout around it.
 */
export function Cijena({ iznos, velicina = 'md', className = '' }: Props) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 ${className}`}>
      <span className={`u-num font-medium text-text ${VELICINE[velicina]}`}>
        {formatirajBroj(iznos)}
      </span>
      <span className="u-label text-muted">{creditRijec(iznos)}</span>
    </span>
  )
}

interface CijenaProizvodaProps {
  /** Whole credits, or `null` when the credit price isn't set yet. */
  cijena: number | null
  /** Fixed euro reference price. Wins over `cijena` when present. */
  cijenaEur?: number
  velicina?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * The price a product card or dialog actually shows: a credit amount when one
 * is set, a euro reference for the fixed-price categories (organizacije), or
 * "Cijena uskoro" while neither exists yet. One place to decide that order so
 * every place a price appears agrees.
 */
export function CijenaProizvoda({
  cijena,
  cijenaEur,
  velicina = 'md',
  className = '',
}: CijenaProizvodaProps) {
  if (cijenaEur !== undefined) {
    return (
      <span className={`inline-flex flex-col gap-0.5 ${className}`}>
        <span className={`u-num font-medium text-text ${VELICINE[velicina]}`}>{cijenaEur} €</span>
        <span className="u-label text-muted">Cijena u creditima uskoro</span>
      </span>
    )
  }

  if (cijena === null) {
    return <span className={`u-label text-muted ${className}`}>Cijena uskoro</span>
  }

  return <Cijena iznos={cijena} velicina={velicina} className={className} />
}
