import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { Logo } from '../ui/Logo'
import { useStore } from '../../context/StoreContext'
import { formatirajBroj } from '../../lib/format'
import { useDialog } from '../../hooks/useDialog'
import { ButtonVanjski } from '../ui/Button'
import { DISCORD_URL } from '../../data/sadrzaj'
import { NAVIGACIJA } from '../../data/navigacija'

/**
 * The credit balance. Tabular mono so the width never changes, and a short red
 * flash when the number moves, because a balance that changes silently is a
 * balance the user does not trust.
 */
function Stanje() {
  const { crediti, zadnjaKupnja } = useStore()
  const [bljesak, setBljesak] = useState(false)
  const prvi = useRef(true)

  useEffect(() => {
    if (prvi.current) {
      prvi.current = false
      return
    }
    setBljesak(true)
    const t = window.setTimeout(() => setBljesak(false), 900)
    return () => window.clearTimeout(t)
  }, [zadnjaKupnja])

  return (
    // The word drops below sm so the balance still fits the single header row.
    // The aria-label carries the meaning the visible label stops carrying.
    <div
      className="flex h-11 items-center gap-2 border border-line px-3"
      aria-label={`Stanje: ${formatirajBroj(crediti)} credita`}
    >
      <span className="u-label hidden text-muted sm:inline">Stanje</span>
      <span
        aria-live="polite"
        className={`u-num text-[0.8125rem] font-medium transition-colors duration-500 ${
          bljesak ? 'text-red' : 'text-text'
        }`}
      >
        {formatirajBroj(crediti)}
      </span>
    </div>
  )
}

function KosaricaGumb() {
  const { brojStavki, otvoriKosaricu } = useStore()

  return (
    <button
      type="button"
      onClick={otvoriKosaricu}
      aria-label={
        brojStavki > 0 ? `Otvori košaricu, ${brojStavki} u košarici` : 'Otvori praznu košaricu'
      }
      className="u-press relative flex size-11 cursor-pointer items-center justify-center border border-line text-dim hover:border-line-strong hover:text-text"
    >
      <ShoppingBag aria-hidden="true" strokeWidth={1.5} className="size-[1.15rem]" />
      {brojStavki > 0 && (
        <span
          aria-hidden="true"
          className="u-num absolute -top-2 -right-2 flex min-w-5 items-center justify-center bg-red px-1 py-0.5 text-[0.625rem] font-bold text-ink-000"
        >
          {brojStavki}
        </span>
      )}
    </button>
  )
}

function MobilniIzbornik({ otvoren, zatvori }: { otvoren: boolean; zatvori: () => void }) {
  const ref = useDialog<HTMLDivElement>(otvoren, zatvori)

  return (
    <>
      <div
        aria-hidden="true"
        onClick={zatvori}
        className={`fixed inset-0 bg-ink-000/80 transition-opacity duration-200 lg:hidden ${
          otvoren ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        style={{ zIndex: 'var(--z-drawer-scrim)' }}
      />

      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Glavna navigacija"
        tabIndex={-1}
        // Exit is faster than entry: the system responds quicker than the user decides.
        className={`fixed inset-x-0 top-0 border-b border-line bg-ink-010 outline-none lg:hidden ${
          otvoren
            ? 'translate-y-0 duration-[280ms] ease-[cubic-bezier(0.32,0.72,0,1)]'
            : 'pointer-events-none -translate-y-full duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]'
        } transition-transform`}
        style={{ zIndex: 'var(--z-drawer)' }}
      >
        <div className="u-shell flex h-16 items-center justify-between">
          <Logo />
          <button
            type="button"
            onClick={zatvori}
            aria-label="Zatvori izbornik"
            className="u-press flex size-11 cursor-pointer items-center justify-center text-dim hover:text-text"
          >
            <X aria-hidden="true" strokeWidth={1.5} className="size-5" />
          </button>
        </div>

        <nav className="u-shell pb-8">
          <ul className="border-t border-line">
            {NAVIGACIJA.map((s) => (
              <li key={s.to} className="border-b border-line">
                <NavLink
                  to={s.to}
                  onClick={zatvori}
                  className={({ isActive }) =>
                    `u-display flex min-h-14 items-center text-[1.35rem] transition-colors duration-200 ${
                      isActive ? 'text-red' : 'text-text hover:text-red'
                    }`
                  }
                >
                  {s.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <ButtonVanjski href={DISCORD_URL} varijanta="sekundarno" className="mt-6 w-full">
            Discord
          </ButtonVanjski>
        </nav>
      </div>
    </>
  )
}

export function Header() {
  const [izbornik, setIzbornik] = useState(false)

  return (
    <>
      <header
        className="sticky top-0 border-b border-line bg-ink-000/92 backdrop-blur-sm"
        style={{ zIndex: 'var(--z-sticky)' }}
      >
        {/* 68px tall. A nav bar that eats the viewport is a nav bar that failed. */}
        <div className="u-shell flex h-[68px] items-center justify-between gap-3 lg:gap-6">
          <Link
            to="/"
            aria-label="Axis RolePlay, početna stranica"
            className="u-press shrink-0 text-text"
          >
            <Logo />
          </Link>

          {/* One line at desktop, always. */}
          <nav aria-label="Glavna navigacija" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {NAVIGACIJA.map((s) => (
                <li key={s.to}>
                  <NavLink
                    to={s.to}
                    className={({ isActive }) =>
                      `relative py-2 text-[0.8125rem] tracking-wide transition-colors duration-200 ${
                        isActive
                          ? 'text-text after:absolute after:inset-x-0 after:-bottom-[9px] after:h-px after:bg-red'
                          : 'text-dim hover:text-text'
                      }`
                    }
                  >
                    {s.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Stanje />
            <KosaricaGumb />
            <button
              type="button"
              onClick={() => setIzbornik(true)}
              aria-label="Otvori izbornik"
              aria-expanded={izbornik}
              className="u-press flex size-11 cursor-pointer items-center justify-center border border-line text-dim hover:text-text lg:hidden"
            >
              <Menu aria-hidden="true" strokeWidth={1.5} className="size-[1.15rem]" />
            </button>
          </div>
        </div>
      </header>

      <MobilniIzbornik otvoren={izbornik} zatvori={() => setIzbornik(false)} />
    </>
  )
}
