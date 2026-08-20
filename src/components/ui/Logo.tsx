interface Props {
  className?: string
  /** Hide the "ROLEPLAY" line where horizontal room is tight. */
  kompaktno?: boolean
}

/**
 * The wordmark.
 *
 * The mark is the letter A with a red rule driven straight through it and out
 * past both sides: an axis line crossing a form. It is the one hand-drawn vector
 * on the site, which is the exception a logo earns.
 */
export function Logo({ className = '', kompaktno = false }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 32 32"
        width="26"
        height="26"
        aria-hidden="true"
        focusable="false"
        className="shrink-0"
      >
        <path
          d="M5.5 27 L16 5 L26.5 27"
          fill="none"
          stroke="currentColor"
          strokeWidth="4.2"
          strokeLinejoin="miter"
        />
        <rect x="1" y="18.2" width="30" height="3.4" fill="var(--color-red)" />
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className="u-display text-[1.05rem] leading-none"
          style={{ letterSpacing: '-0.015em' }}
        >
          Axis
        </span>
        {!kompaktno && (
          <span className="u-label mt-[3px] text-[0.5625rem] text-muted">Roleplay</span>
        )}
      </span>
    </span>
  )
}
