import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/routes', label: 'Routes' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
  { to: '/book', label: 'Book' },
]

function InfoBlock({ icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-amber-400 to-orange-500 text-lg text-white shadow-md">
        {icon}
      </div>
      <div className="leading-tight text-white">
        <p className="text-xs font-bold uppercase tracking-wide text-white/90">{title}</p>
        <p className="text-sm font-semibold text-white">{subtitle}</p>
      </div>
    </div>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-[#4c1d95] via-[#5b21b6] to-[#312e81] shadow-lg">
      <div className="relative mx-auto max-w-7xl px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-3 lg:gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex shrink-0 items-center gap-3 rounded-xl bg-gradient-to-r from-white via-white/95 to-white/75 px-2.5 py-1.5 shadow-lg ring-1 ring-white/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src="/louisline-logo.png"
              alt="Louisline"
              className="h-10 w-auto drop-shadow-sm md:h-12"
            />
            <span className="hidden text-lg font-extrabold tracking-wide text-[#29388d] sm:inline">
              LOUISLINE
            </span>
          </Link>

          {/* Desktop nav — centered */}
          <nav className="hidden flex-1 justify-center md:flex">
            <ul className="flex items-center gap-0.5 lg:gap-1.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `rounded-md px-2.5 py-2 text-xs font-bold uppercase tracking-wide transition lg:px-3 lg:text-sm ${
                        isActive
                          ? 'text-amber-400'
                          : 'text-white/90 hover:text-amber-300'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right info + mobile toggle */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden items-center gap-3 xl:flex">
              <InfoBlock
                icon="🕐"
                title="Working hours"
                subtitle="Mon–Sun : 6am–10pm"
              />
              <InfoBlock
                icon="📞"
                title="Call center"
                subtitle="0683 300 100"
              />
            </div>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white md:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen ? (
          <div className="mt-3 rounded-xl border border-white/15 bg-black/25 p-4 backdrop-blur-md md:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-bold uppercase tracking-wide ${
                      isActive
                        ? 'bg-white/10 text-amber-400'
                        : 'text-white hover:bg-white/10'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
              <InfoBlock
                icon="🕐"
                title="Working hours"
                subtitle="Mon–Sun : 6am–10pm"
              />
              <InfoBlock
                icon="📞"
                title="Call center"
                subtitle="0683 300 100"
              />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}
