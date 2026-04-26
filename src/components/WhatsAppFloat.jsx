import { WHATSAPP_LINK } from '../data/routes'
import { useI18n } from '../i18n/I18nContext'

export default function WhatsAppFloat() {
  const { t } = useI18n()
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label={t('waAria')}
      className="fixed bottom-4 right-4 z-50 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-3 py-3 text-sm font-bold text-white shadow-2xl shadow-emerald-600/35 transition hover:scale-105 hover:bg-[#20bd5c]"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M19.11 17.31c-.27-.14-1.58-.78-1.83-.87-.24-.09-.42-.14-.6.14-.18.27-.69.87-.85 1.05-.15.18-.31.2-.58.07-.27-.14-1.13-.42-2.15-1.33-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.41.12-.54.12-.12.27-.31.4-.47.13-.15.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.14-.6-1.45-.82-1.99-.22-.53-.44-.46-.6-.47h-.51c-.18 0-.47.07-.72.34s-.95.93-.95 2.26.98 2.63 1.12 2.81c.13.18 1.9 2.9 4.59 4.06.64.28 1.13.45 1.52.58.64.2 1.23.17 1.69.1.52-.08 1.58-.65 1.8-1.28.22-.63.22-1.17.15-1.28-.06-.11-.24-.18-.51-.32Z" />
        <path d="M16 3.2c-7.05 0-12.8 5.74-12.8 12.8 0 2.26.59 4.47 1.72 6.41L3.2 28.8l6.57-1.69a12.73 12.73 0 0 0 6.23 1.69h.01c7.05 0 12.79-5.74 12.79-12.8 0-3.42-1.33-6.63-3.75-9.05A12.7 12.7 0 0 0 16 3.2Zm0 23.44h-.01a10.6 10.6 0 0 1-5.39-1.48l-.39-.23-3.9 1 1.04-3.8-.25-.39a10.58 10.58 0 0 1-1.62-5.64c0-5.86 4.77-10.63 10.64-10.63 2.84 0 5.5 1.1 7.51 3.11a10.57 10.57 0 0 1 3.1 7.51c0 5.87-4.77 10.64-10.63 10.64Z" />
      </svg>
      <span className="hidden sm:inline">{t('whatsappBtn')}</span>
    </a>
  )
}
