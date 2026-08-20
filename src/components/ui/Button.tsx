import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Varijanta = 'primarno' | 'sekundarno' | 'tiho'
type Velicina = 'sm' | 'md'

const OSNOVA =
  'u-press inline-flex items-center justify-center gap-2 rounded-[2px] font-medium whitespace-nowrap ' +
  'disabled:cursor-not-allowed disabled:opacity-45 cursor-pointer select-none'

const VARIJANTE: Record<Varijanta, string> = {
  // Red fill with near-black label measures 5.44:1. White on this red is 3.68:1
  // and is never used.
  primarno: 'bg-red text-ink-000 hover:bg-[#ff4757] disabled:hover:bg-red',
  sekundarno:
    'border border-line-strong bg-transparent text-text hover:border-red hover:text-red disabled:hover:border-line-strong disabled:hover:text-text',
  tiho: 'text-dim hover:text-text',
}

const VELICINE: Record<Velicina, string> = {
  // 44px min height on the small size too: it is still a touch target.
  sm: 'min-h-11 px-4 text-[0.8125rem] tracking-wide',
  md: 'min-h-12 px-6 text-sm tracking-wide',
}

interface Zajednicko {
  varijanta?: Varijanta
  velicina?: Velicina
  className?: string
  children: ReactNode
}

type ButtonProps = Zajednicko & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { varijanta = 'primarno', velicina = 'md', className = '', children, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      className={`${OSNOVA} ${VARIJANTE[varijanta]} ${VELICINE[velicina]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
})

interface LinkProps extends Zajednicko {
  to: string
  'aria-label'?: string
}

/** Same visual language for router links, so a link never looks like a button that lost. */
export function ButtonLink({
  to,
  varijanta = 'primarno',
  velicina = 'md',
  className = '',
  children,
  ...rest
}: LinkProps) {
  return (
    <Link
      to={to}
      className={`${OSNOVA} ${VARIJANTE[varijanta]} ${VELICINE[velicina]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  )
}

interface VanjskiProps extends Zajednicko {
  href: string
}

export function ButtonVanjski({
  href,
  varijanta = 'sekundarno',
  velicina = 'md',
  className = '',
  children,
}: VanjskiProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${OSNOVA} ${VARIJANTE[varijanta]} ${VELICINE[velicina]} ${className}`}
    >
      {children}
    </a>
  )
}
