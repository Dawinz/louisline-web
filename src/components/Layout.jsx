import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import WhatsAppFloat from './WhatsAppFloat'

export default function Layout() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-64 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />
      <Navbar />
      <main className="relative mx-auto max-w-6xl px-4 py-8 md:py-10">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
