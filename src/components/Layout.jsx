import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import WhatsAppFloat from './WhatsAppFloat'

export default function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-64 h-80 w-80 rounded-full bg-red-200/40 blur-3xl" />
      <Navbar />
      <main
        className={`relative mx-auto max-w-6xl px-4 ${isHome ? 'pb-8 pt-0 md:pb-10 md:pt-0' : 'py-8 md:py-10'}`}
      >
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
