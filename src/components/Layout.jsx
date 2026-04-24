import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import WhatsAppFloat from './WhatsAppFloat'

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
