import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/20 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <section>
          <h3 className="text-xl font-bold text-white">Louisline</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Reliable travel across Tanzania with comfort, safety, and simple online booking.
          </p>
        </section>
        <section>
          <h3 className="text-base font-semibold text-white">Quick Links</h3>
          <div className="mt-2 flex flex-col gap-2 text-sm">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/routes" className="hover:text-white">Routes</Link>
            <Link to="/gallery" className="hover:text-white">Gallery</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </section>
        <section>
          <h3 className="text-base font-semibold text-white">Contact</h3>
          <p className="mt-2 text-sm leading-relaxed">Urafiki, Dar es Salaam, Tanzania</p>
          <p className="mt-1 text-sm">0683 300 100 | 0798 700 700</p>
          <p className="mt-1 text-sm">WhatsApp: 0683 300 100</p>
        </section>
      </div>
    </footer>
  )
}
