import ScrollReveal from '../components/ScrollReveal'
import { WHATSAPP_LINK } from '../data/routes'
import { useI18n } from '../i18n/I18nContext'

export default function ContactPage() {
  const { t } = useI18n()
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <ScrollReveal>
        <section className="soft-card rounded-2xl p-6">
          <h1 className="text-3xl font-bold text-slate-900">{t('contactLouisline')}</h1>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <p>
              <span className="font-semibold text-slate-900">{t('address')}:</span> Urafiki, Dar es Salaam, Tanzania
            </p>
            <p>
              <span className="font-semibold text-slate-900">{t('mobile')}:</span> 0683 300 100, 0798 700 700
            </p>
            <p>
              <span className="font-semibold text-slate-900">{t('whatsapp')}:</span> 0683 300 100
            </p>
          </div>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-xl bg-gradient-to-r from-[#d91d27] to-[#29388d] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#29388d]/30 hover:from-[#b61720] hover:to-[#1e2a6e]"
          >
            {t('chatOnWhatsApp')}
          </a>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <section className="soft-card rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-slate-900">{t('sendMessage')}</h2>
          <p className="mt-2 text-sm text-slate-600">{t('contactFormIntro')}</p>
          <form className="mt-4 space-y-3">
            <input
              type="text"
              placeholder={t('yourName')}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 focus:border-[#29388d] focus:outline-none"
            />
            <input
              type="email"
              placeholder={t('emailAddress')}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 focus:border-[#29388d] focus:outline-none"
            />
            <textarea
              placeholder={t('message')}
              rows="4"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 focus:border-[#29388d] focus:outline-none"
            />
            <button
              type="button"
              className="rounded-xl bg-gradient-to-r from-[#29388d] to-[#d91d27] px-4 py-2.5 text-sm font-semibold text-white hover:from-[#1e2a6e] hover:to-[#b61720]"
            >
              {t('sendMessageBtn')}
            </button>
          </form>
        </section>
      </ScrollReveal>
    </div>
  )
}
