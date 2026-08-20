import { DISCORD_URL } from '../../data/sadrzaj'

/**
 * Floating Discord button. Replaces the WhatsApp button from the package spec,
 * because a FiveM community lives on Discord and nowhere else.
 *
 * The label expands on hover at desktop and stays hidden on touch, where there
 * is no hover to expand it and the mark alone is understood.
 */
export function DiscordFab() {
  return (
    <a
      href={DISCORD_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pridruži se Axis RolePlay Discord poslužitelju"
      className="u-press group fixed right-4 bottom-4 flex min-h-14 items-center gap-3 border border-line-strong bg-ink-020 px-4 text-text hover:border-red sm:right-6 sm:bottom-6"
      style={{
        zIndex: 'var(--z-fab)',
        // Keep clear of the iOS home indicator.
        marginBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {/* Official Discord mark, drawn to their proportions. */}
      <svg
        viewBox="0 0 24 18"
        width="22"
        height="17"
        aria-hidden="true"
        focusable="false"
        className="shrink-0 fill-current text-dim transition-colors duration-200 group-hover:text-red"
      >
        <path d="M20.317 1.492A19.79 19.79 0 0 0 15.432 0a13.9 13.9 0 0 0-.617 1.25 18.3 18.3 0 0 0-5.487 0A13 13 0 0 0 8.71 0a19.7 19.7 0 0 0-4.885 1.496C.716 6.093-.13 10.576.292 14.995a19.9 19.9 0 0 0 6.014 3.03 14.6 14.6 0 0 0 1.288-2.077 13 13 0 0 1-2.028-.966c.17-.123.336-.25.496-.38a14.2 14.2 0 0 0 12.087 0c.162.132.328.259.497.38-.647.378-1.328.7-2.033.968a14.4 14.4 0 0 0 1.288 2.075 19.8 19.8 0 0 0 6.017-3.029c.5-5.124-.844-9.566-3.601-13.504M8.02 12.278c-1.183 0-2.157-1.069-2.157-2.38s.955-2.383 2.157-2.383 2.176 1.078 2.156 2.382c0 1.312-.955 2.38-2.156 2.38m7.962 0c-1.183 0-2.157-1.069-2.157-2.38s.955-2.383 2.157-2.383 2.176 1.078 2.156 2.382c0 1.312-.947 2.38-2.156 2.38" />
      </svg>

      <span className="hidden text-[0.8125rem] font-medium sm:inline">Discord</span>
    </a>
  )
}
