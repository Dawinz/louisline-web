import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { language, setLanguage, t } = useI18n()
  const location = useLocation()
  const navLinks = [
    { to: '/', label: t('navHome') },
    { to: '/routes', label: t('navRoutes') },
    { to: '/gallery', label: t('navGallery') },
    { to: '/contact', label: t('navContact') },
    { to: '/book', label: t('navBook') },
  ]
  const desktopLinks = [
    { to: '/', label: 'Home', active: location.pathname === '/' },
    { to: '/book', label: 'Book Ticket', active: location.pathname === '/book' },
    { to: '/routes', label: 'Routes', active: location.pathname === '/routes' },
    { to: '/#about', label: 'About Us', active: location.pathname === '/' },
    { to: '/contact', label: 'Contact', active: location.pathname === '/contact' },
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
            <div className="hidden flex-col items-start leading-none lg:flex">
              <svg width="38" height="16" viewBox="0 0 38 16" fill="none" aria-hidden>
                <path d="M4 3 L19 10 L34 3" stroke="#E53935" strokeWidth="2.8" strokeLinecap="round" />
                <path d="M8 8 L19 13 L30 8" stroke="#1E3A8A" strokeWidth="2.8" strokeLinecap="round" />
              </svg>
              <div className="mt-1 text-xl font-black tracking-tight">
                <span className="text-[#E53935]">LOUIS</span>{' '}
                <span className="text-[#1E3A8A]">LINE</span>
              </div>
            </div>
            <img src="/louisline-logo.png" alt="Louisline" className="h-9 w-auto drop-shadow-sm lg:hidden" />
          </Link>

          {/* Desktop nav — centered */}
          <nav className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-3">
              {desktopLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`rounded-md px-2 py-1.5 text-sm font-semibold transition ${
                      link.active
                        ? 'bg-[#eef3ff] text-[#1E3A8A] underline underline-offset-4'
                        : 'text-slate-700 hover:text-[#1E3A8A] hover:underline hover:underline-offset-4'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right actions + mobile toggle */}
          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="tel:+255683300100"
              className="hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-[#1E3A8A] shadow-sm transition hover:bg-slate-50 lg:inline-flex"
              aria-label="Call Louis Line"
            >
              📞
            </a>
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-[#29388d] lg:hidden"
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
          <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4 lg:hidden">
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
