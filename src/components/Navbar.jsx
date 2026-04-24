import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/routes', label: 'Routes' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
  { to: '/book', label: 'Book' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-[#29388d]">
          Louisline
        </Link>
        <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-700">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 transition ${
                  isActive
                    ? 'bg-[#29388d] text-white shadow-lg shadow-[#29388d]/30'
                    : 'hover:bg-red-50 hover:text-[#d91d27]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
