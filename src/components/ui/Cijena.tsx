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
