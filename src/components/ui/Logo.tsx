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
        viewBox="0 0 1024 1024"
        width="26"
        height="26"
        aria-hidden="true"
        focusable="false"
        className="shrink-0"
      >
        <path fill="var(--color-red)" d="M88 138 L482 432 L486 464 L485 824 L477 825 L375 678 L375 545 Z" />
        <path fill="var(--color-red)" d="M933 139 L542 433 L542 825 L561 808 L648 683 L648 544 L800 427 Z" />
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
