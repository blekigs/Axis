import { Link } from 'react-router-dom'
import { Logo } from '../ui/Logo'
import { NAVIGACIJA } from '../../data/navigacija'
import { DISCORD_URL, INSTAGRAM_URL, TIKTOK_URL } from '../../data/sadrzaj'

const PRAVNO = [
  { to: '/uvjeti-koristenja', label: 'Uvjeti korištenja' },
  { to: '/pravila-privatnosti', label: 'Pravila privatnosti' },
]

const DRUSTVENE = [
  { href: DISCORD_URL, label: 'Discord' },
  { href: TIKTOK_URL, label: 'TikTok' },
  { href: INSTAGRAM_URL, label: 'Instagram' },
]

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-010">
      <div className="u-shell py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" aria-label="Axis RolePlay, početna stranica" className="text-text">
              <Logo />
            </Link>
            <p className="mt-5 max-w-[36ch] text-[0.875rem] leading-relaxed text-muted">
              Hrvatski FiveM roleplay server. Grad radi svaki dan, a ono što u njemu napraviš ostaje
              zapisano.
            </p>
          </div>

          <nav aria-label="Stranice">
            <h2 className="u-label text-muted">Stranice</h2>
            <ul className="mt-4 space-y-2.5">
              {NAVIGACIJA.map((s) => (
                <li key={s.to}>
                  <Link
                    to={s.to}
                    className="text-[0.875rem] text-dim transition-colors duration-200 hover:text-text"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Zajednica">
            <h2 className="u-label text-muted">Zajednica</h2>
            <ul className="mt-4 space-y-2.5">
              {DRUSTVENE.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.875rem] text-dim transition-colors duration-200 hover:text-text"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Pravno">
            <h2 className="u-label text-muted">Pravno</h2>
            <ul className="mt-4 space-y-2.5">
              {PRAVNO.map((s) => (
                <li key={s.to}>
                  <Link
                    to={s.to}
                    className="text-[0.875rem] text-dim transition-colors duration-200 hover:text-text"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.75rem] text-muted">
            Axis RolePlay. Nije povezano s Rockstar Games ni s Take-Two Interactive.
          </p>
          <p className="text-[0.75rem] text-muted">
            Demo verzija stranice. Plaćanje će ići isključivo preko Tebex-a.
          </p>
        </div>
      </div>
    </footer>
  )
}
