/**
 * Film grain.
 *
 * One fixed, pointer-events-none layer for the whole document. Deliberately not
 * attached to any scrolling container: grain over a scroller forces a full
 * repaint every frame and costs more on mobile than the texture is worth.
 *
 * The noise is an inline SVG turbulence, so it costs no request and no raster.
 */
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.42'/%3E%3C/svg%3E\")"

export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 opacity-[0.05] mix-blend-soft-light"
      style={{ zIndex: 'var(--z-grain)', backgroundImage: NOISE, backgroundRepeat: 'repeat' }}
    />
  )
}
