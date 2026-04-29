import { useMemo, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { language, setLanguage, t } = useI18n()
  const location = useLocation()
  const isHome = location.pathname === '/'

  const navLinks = [
    { to: '/', label: t('navHome') },
    { to: '/routes', label: t('navRoutes') },
    { to: '/gallery', label: t('navGallery') },
    { to: '/contact', label: t('navContact') },
    { to: '/book', label: t('navBook') },
  ]

  const desktopLinks = useMemo(
    () => [
      { to: '/', label: t('navHome'), active: location.pathname === '/' },
      { to: '/book', label: t('navBookTicket'), active: location.pathname === '/book' },
      { to: '/routes', label: t('navRoutes'), active: location.pathname === '/routes' },
      { to: '/#about', label: t('navAbout'), active: location.pathname === '/' },
      { to: '/contact', label: t('navContact'), active: location.pathname === '/contact' },
    ],
    [location.pathname, t],
  )

  const headerClass = isHome
    ? 'sticky top-0 z-50 border-b border-white/10 bg-gradient-to-b from-black/55 via-black/25 to-transparent shadow-none backdrop-blur-md'
    : 'sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur'

  const logoWrapClass = isHome
    ? 'flex shrink-0 items-center gap-3 rounded-xl bg-white/95 px-3 py-2 shadow-sm ring-1 ring-white/50'
    : 'flex shrink-0 items-center gap-3 rounded-xl bg-white px-3 py-2 ring-1 ring-slate-200'

  const linkBase = isHome
    ? 'rounded-md px-2 py-1.5 text-sm font-semibold text-white/95 transition hover:bg-white/15 hover:text-white'
    : 'rounded-md px-2 py-1.5 text-sm font-semibold text-slate-700 transition hover:text-[#1E3A8A] hover:underline hover:underline-offset-4'

  const linkActive = isHome
    ? 'bg-white/20 text-white underline decoration-white underline-offset-4'
    : 'bg-[#eef3ff] text-[#1E3A8A] underline underline-offset-4'

  const phoneBtnClass = isHome
    ? 'hidden h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white shadow-sm transition hover:bg-white/20 lg:inline-flex'
    : 'hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-[#1E3A8A] shadow-sm transition hover:bg-slate-50 lg:inline-flex'

  const langWrapClass = isHome
    ? 'hidden rounded-lg border border-white/25 bg-white/10 p-0.5 backdrop-blur-sm md:flex lg:hidden'
    : 'hidden rounded-lg border border-slate-200 bg-white p-1 md:flex lg:hidden'

  const menuBtnClass = isHome
    ? 'inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/25 bg-[#1e2a6e] text-white shadow-sm lg:hidden'
    : 'inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-[#29388d] lg:hidden'

  const desktopLangClass = isHome
    ? 'hidden items-center gap-1 rounded-lg border border-white/20 bg-white/10 px-2 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm lg:flex'
    : 'hidden items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 lg:flex'

  return (
    <header className={headerClass}>
      <div className="relative mx-auto max-w-7xl px-3 py-2.5 md:px-4 md:py-3">
        <div className="flex items-center justify-between gap-3 lg:gap-6">
          <Link to="/" className={logoWrapClass} onClick={() => setMenuOpen(false)}>
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
            <img
              src="/louisline-logo.png"
              alt="Louisline"
              className={`h-9 w-auto drop-shadow-sm lg:hidden ${isHome ? 'drop-shadow-md' : ''}`}
            />
          </Link>

          <nav className="hidden flex-1 justify-center lg:flex">
            <ul className="flex items-center gap-2 xl:gap-3">
              {desktopLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`${linkBase} ${link.active ? linkActive : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <a href="tel:+255683300100" className={phoneBtnClass} aria-label={t('callNow')}>
              <span aria-hidden className="text-base">
                📞
              </span>
            </a>

            <div className={langWrapClass}>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`rounded px-2 py-1 text-xs font-semibold ${
                  language === 'en'
                    ? isHome
                      ? 'bg-white text-[#1e2a6e]'
                      : 'bg-[#29388d] text-white'
                    : isHome
                      ? 'text-white/85'
                      : 'text-slate-600'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('sw')}
                className={`rounded px-2 py-1 text-xs font-semibold ${
                  language === 'sw'
                    ? isHome
                      ? 'bg-white text-[#1e2a6e]'
                      : 'bg-[#29388d] text-white'
                    : isHome
                      ? 'text-white/85'
                      : 'text-slate-600'
                }`}
              >
                SW
              </button>
            </div>

            <div className={desktopLangClass}>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`rounded px-1.5 py-0.5 ${language === 'en' ? 'bg-white/25 text-white' : 'text-white/75 hover:text-white'}`}
              >
                EN
              </button>
              <span className="text-white/40" aria-hidden>
                |
              </span>
              <button
                type="button"
                onClick={() => setLanguage('sw')}
                className={`rounded px-1.5 py-0.5 ${language === 'sw' ? 'bg-white/25 text-white' : 'text-white/75 hover:text-white'}`}
              >
                SW
              </button>
            </div>

            <button
              type="button"
              className={`${menuBtnClass} lg:hidden`}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

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
                      isActive ? 'bg-[#eef3ff] text-[#29388d]' : 'text-slate-700 hover:bg-slate-100'
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
