import type { ElementType, ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'

interface Props {
  children: ReactNode
  /** Stagger within a group. Kept in the 40-80ms band; longer reads as slow. */
  delay?: number
  as?: ElementType
  className?: string
}

export function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }: Props) {
  const ref = useReveal<HTMLDivElement>(delay)
  return (
    <Tag ref={ref} className={`u-reveal ${className}`}>
      {children}
    </Tag>
  )
}
