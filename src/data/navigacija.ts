/**
 * Primary navigation, in one place so the header and the footer can never drift
 * apart. Lives in its own module rather than beside a component so the file that
 * exports it stays fast-refreshable.
 */
export const NAVIGACIJA = [
  { to: '/', label: 'Početna' },
  { to: '/trgovina', label: 'Trgovina' },
  { to: '/kako-funkcionira', label: 'Kako funkcionira' },
  { to: '/o-serveru', label: 'O serveru' },
  { to: '/podrska', label: 'Podrška' },
] as const
