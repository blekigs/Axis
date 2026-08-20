/**
 * Image URL construction for the photography standing in for future in-game
 * screenshots. Every id in the data files was fetched and reviewed before use.
 */

const BASE = 'https://images.unsplash.com/photo-'

interface Opcije {
  sirina: number
  visina: number
  /** Lower for large background art, higher for small detail crops. */
  kvaliteta?: number
}

export function slikaUrl(id: string, { sirina, visina, kvaliteta = 70 }: Opcije): string {
  // crop=entropy picks the busiest region instead of the geometric centre. It
  // matters here because several cells ask for a tall crop of a landscape photo,
  // and a centre crop of a night shot lands on empty sky.
  return `${BASE}${id}?auto=format&fit=crop&crop=entropy&w=${sirina}&h=${visina}&q=${kvaliteta}`
}

/**
 * A 1x/2x srcset. Retina is capped at 2x because a 3x crop of a dark photograph
 * costs bandwidth for detail nobody can see.
 */
export function slikaSrcSet(id: string, opts: Opcije): string {
  return [
    `${slikaUrl(id, opts)} 1x`,
    `${slikaUrl(id, { ...opts, sirina: opts.sirina * 2, visina: opts.visina * 2, kvaliteta: (opts.kvaliteta ?? 70) - 12 })} 2x`,
  ].join(', ')
}
