import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { Grain } from './Grain'
import { DiscordFab } from './DiscordFab'
import { Kosarica } from '../store/Kosarica'

/**
 * On route change, reset the scroll position and move focus to the main region.
 * Without the focus move a screen reader stays parked wherever the last link
 * was and never announces that the page changed.
 */
function NaPromjenuRute() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    const glavni = document.getElementById('sadrzaj')
    glavni?.focus({ preventScroll: true })
  }, [pathname])

  return null
}

export function Layout() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <a
        href="#sadrzaj"
        className="u-press sr-only left-4 top-4 border border-red bg-ink-000 px-4 py-3 text-sm text-text focus:not-sr-only focus:fixed"
        style={{ zIndex: 'var(--z-skip)' }}
      >
        Preskoči na sadržaj
      </a>

      <NaPromjenuRute />
      <Header />

      <main id="sadrzaj" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>

      <Footer />
      <Kosarica />
      <DiscordFab />
      <Grain />
    </div>
  )
}
