const nf = new Intl.NumberFormat('hr-HR')

/** 2500 becomes "2.500", which is how Croatian writes thousands. */
export function formatirajBroj(n: number): string {
  return nf.format(n)
}

/**
 * Croatian only changes the noun for exactly one: 1 credit, 2 credita, 11 credita.
 * The "not eleven" exception matters, otherwise 21 and 11 get the same form.
 */
export function creditRijec(n: number): string {
  const abs = Math.abs(n)
  const zadnja = abs % 10
  const zadnjeDvije = abs % 100
  return zadnja === 1 && zadnjeDvije !== 11 ? 'credit' : 'credita'
}

export function crediti(n: number): string {
  return `${formatirajBroj(n)} ${creditRijec(n)}`
}
