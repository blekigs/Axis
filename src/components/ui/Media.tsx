import { slikaSrcSet, slikaUrl } from '../../lib/slike'

interface Props {
  id: string
  alt: string
  sirina: number
  visina: number
  className?: string
  /** The hero is the LCP element and must not be lazy. Everything else is. */
  prioritet?: boolean
  kvaliteta?: number
  sizes?: string
}

/**
 * Every photograph on the site goes through here, which is how the aspect ratio,
 * the dimensions and the scrim stay consistent.
 *
 * The scrim is not decoration: the photography is stock, its exposure varies,
 * and white text has to stay legible on all of it. Grading it toward the page
 * black is what makes a mixed set of photos read as one art direction.
 */
export function Media({
  id,
  alt,
  sirina,
  visina,
  className = '',
  prioritet = false,
  kvaliteta = 70,
  sizes,
}: Props) {
  return (
    <img
      src={slikaUrl(id, { sirina, visina, kvaliteta })}
      srcSet={slikaSrcSet(id, { sirina, visina, kvaliteta })}
      sizes={sizes}
      alt={alt}
      width={sirina}
      height={visina}
      loading={prioritet ? 'eager' : 'lazy'}
      decoding={prioritet ? 'sync' : 'async'}
      fetchPriority={prioritet ? 'high' : 'auto'}
      className={`h-full w-full object-cover ${className}`}
      style={{ aspectRatio: `${sirina} / ${visina}` }}
    />
  )
}

/**
 * Photo plus grading, in one box. `intenzitet` controls how far the image is
 * pushed toward the page black: heavier where type sits on top of it.
 */
export function MediaOkvir({
  intenzitet = 'srednje',
  className = '',
  children,
}: {
  intenzitet?: 'lagano' | 'srednje' | 'jako'
  className?: string
  children: React.ReactNode
}) {
  const scrim = {
    lagano: 'after:bg-ink-000/25',
    srednje: 'after:bg-ink-000/45',
    jako: 'after:bg-ink-000/65',
  }[intenzitet]

  return (
    <div
      className={
        'relative overflow-hidden bg-ink-020 ' +
        'after:pointer-events-none after:absolute after:inset-0 ' +
        `${scrim} ${className}`
      }
    >
      {children}
    </div>
  )
}
