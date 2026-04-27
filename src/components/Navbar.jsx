import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { language, setLanguage, t } = useI18n()
  const navLinks = [
    { to: '/', label: t('navHome') },
    { to: '/routes', label: t('navRoutes') },
    { to: '/gallery', label: t('navGallery') },
    { to: '/contact', label: t('navContact') },
    { to: '/book', label: t('navBook') },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="relative mx-auto max-w-7xl px-3 py-2.5 md:px-4 md:py-3">
        <div className="flex items-center justify-between gap-3 lg:gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex shrink-0 items-center gap-3 rounded-xl bg-white px-3 py-2 ring-1 ring-slate-200"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src="/louisline-logo.png"
              alt="Louisline"
              className="h-9 w-auto drop-shadow-sm md:h-10"
            />
            <span className="hidden text-2xl font-black tracking-tight text-[#29388d] lg:inline">
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
                      `rounded-md px-2.5 py-2 text-xs font-bold tracking-wide transition lg:px-3 lg:text-sm ${
                        isActive
                          ? 'bg-[#eef3ff] text-[#29388d]'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-[#29388d]'
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
            <div className="hidden rounded-lg border border-slate-200 bg-white p-1 md:flex">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`rounded px-2 py-1 text-xs font-semibold ${language === 'en' ? 'bg-[#29388d] text-white' : 'text-slate-600'}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('sw')}
                className={`rounded px-2 py-1 text-xs font-semibold ${language === 'sw' ? 'bg-[#29388d] text-white' : 'text-slate-600'}`}
              >
                SW
              </button>
            </div>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-[#29388d] md:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen ? (
          <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4 md:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 text-sm font-bold tracking-wide ${
                      isActive
                        ? 'bg-[#eef3ff] text-[#29388d]'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-4 space-y-3 border-t border-slate-200 pt-4">
              <div className="mb-3 rounded-lg border border-slate-200 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`rounded px-3 py-1 text-xs font-semibold ${language === 'en' ? 'bg-[#29388d] text-white' : 'text-slate-600'}`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('sw')}
                  className={`ml-1 rounded px-3 py-1 text-xs font-semibold ${language === 'sw' ? 'bg-[#29388d] text-white' : 'text-slate-600'}`}
                >
                  SW
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}
