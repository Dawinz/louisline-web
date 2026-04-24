import { WHATSAPP_LINK } from '../data/routes'

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Louisline on WhatsApp"
      className="fixed bottom-5 right-5 z-50 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 px-5 py-3 text-sm font-bold text-white shadow-2xl shadow-emerald-600/30 transition hover:scale-105 hover:from-emerald-600 hover:to-green-600"
    >
      WhatsApp
    </a>
  )
}
