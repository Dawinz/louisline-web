import { WHATSAPP_LINK } from '../data/routes'

export default function ContactPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="soft-card reveal-up rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-slate-900">Contact Louisline</h1>
        <div className="mt-4 space-y-3 text-sm text-slate-700">
          <p>
            <span className="font-semibold text-slate-900">Address:</span> Urafiki, Dar es Salaam, Tanzania
          </p>
          <p>
            <span className="font-semibold text-slate-900">Mobile:</span> 0683 300 100, 0798 700 700
          </p>
          <p>
            <span className="font-semibold text-slate-900">WhatsApp:</span> 0683 300 100
          </p>
        </div>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex rounded-xl bg-gradient-to-r from-[#d91d27] to-[#29388d] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#29388d]/30 hover:from-[#b61720] hover:to-[#1e2a6e]"
        >
          Chat on WhatsApp
        </a>
      </section>

      <section className="soft-card reveal-up reveal-delay-1 rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-slate-900">Send us a message</h2>
        <p className="mt-2 text-sm text-slate-600">
          Frontend-only contact form for quick inquiries.
        </p>
        <form className="mt-4 space-y-3">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 focus:border-[#29388d] focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 focus:border-[#29388d] focus:outline-none"
          />
          <textarea
            placeholder="Message"
            rows="4"
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 focus:border-[#29388d] focus:outline-none"
          />
          <button
            type="button"
            className="rounded-xl bg-gradient-to-r from-[#29388d] to-[#d91d27] px-4 py-2.5 text-sm font-semibold text-white hover:from-[#1e2a6e] hover:to-[#b61720]"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  )
}
