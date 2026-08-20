import { DISPATCH } from '../../data/sadrzaj'

/**
 * The one marquee on the site.
 *
 * It carries in-world content: a roleplay server IS its incidents, and a bullet
 * list of features cannot communicate that a city was busy last night. Paused on
 * hover and on focus, and frozen entirely under reduced motion.
 *
 * The list is duplicated so the -50% translate loops without a seam. The copy is
 * aria-hidden so a screen reader reads the log once, not twice.
 */
export function Dispatch() {
  return (
    <section aria-label="Zapisi iz grada" className="border-b border-line bg-ink-010">
      <div className="u-marquee relative flex overflow-hidden py-3.5">
        <ul className="u-marquee-track flex shrink-0 items-center gap-10 pr-10">
          {DISPATCH.map((red) => (
            <li key={red} className="u-num flex shrink-0 items-center gap-3 text-[0.75rem] text-muted">
              <span aria-hidden="true" className="h-3 w-px bg-red" />
              {red}
            </li>
          ))}
        </ul>

        <ul aria-hidden="true" className="u-marquee-track flex shrink-0 items-center gap-10 pr-10">
          {DISPATCH.map((red) => (
            <li key={red} className="u-num flex shrink-0 items-center gap-3 text-[0.75rem] text-muted">
              <span className="h-3 w-px bg-red" />
              {red}
            </li>
          ))}
        </ul>

        {/* Edges fade into the page instead of being clipped by a hard cut. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink-010 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink-010 to-transparent"
        />
      </div>
    </section>
  )
}
