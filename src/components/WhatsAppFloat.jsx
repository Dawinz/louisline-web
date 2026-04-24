import { WHATSAPP_LINK } from '../data/routes'

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Louisline on WhatsApp"
      className="fixed bottom-5 right-5 z-50 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-emerald-600"
    >
      WhatsApp
    </a>
  )
}
