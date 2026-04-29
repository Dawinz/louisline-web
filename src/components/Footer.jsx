import { Link } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'
import { WHATSAPP_LINK } from '../data/routes'
import { useI18n } from '../i18n/I18nContext'

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-sm text-slate-300 transition hover:translate-x-0.5 hover:text-amber-400"
    >
      {children}
    </Link>
  )
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-amber-400 transition hover:border-amber-400/60 hover:bg-amber-400/10 hover:text-amber-300"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-white/10 bg-gradient-to-br from-[#0b1224] via-[#111b36] to-[#1a0f3d] text-slate-200">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #fbbf24 0, transparent 40%), radial-gradient(circle at 80% 0%, #60a5fa 0, transparent 35%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-10 bottom-0 text-[180px] font-black uppercase leading-none text-white/[0.04] sm:text-[240px]"
        aria-hidden
      >
        BUS
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <ScrollReveal>
            <div className="space-y-4">
              <img src="/louisline-logo.png" alt="Louisline" className="h-12 w-auto" />
              <p className="text-sm leading-relaxed text-slate-300">
                {t('footerCompanyDesc')}
              </p>
              <a
                href="tel:+255683300100"
                className="inline-flex items-center gap-2 rounded-lg bg-[#29388d] px-4 py-3 text-sm font-bold text-white shadow-md shadow-[#29388d]/25 transition hover:bg-[#1e2a6e]"
              >
                <span aria-hidden>📞</span>
                0683 300 100
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={90}>
            <div>
              <h3 className="text-base font-bold uppercase tracking-wide text-white">{t('company')}</h3>
              <div className="mt-4 flex flex-col gap-2">
                <FooterLink to="/routes">{t('navRoutes')}</FooterLink>
                <FooterLink to="/gallery">{t('navGallery')}</FooterLink>
                <FooterLink to="/contact">{t('navContact')}</FooterLink>
                <FooterLink to="/book">{t('navBook')}</FooterLink>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <div>
              <h3 className="text-base font-bold uppercase tracking-wide text-white">{t('services')}</h3>
              <div className="mt-4 flex flex-col gap-2">
                <span className="text-sm text-slate-300">{t('serviceComfort')}</span>
                <span className="text-sm text-slate-300">{t('serviceOnTime')}</span>
                <span className="text-sm text-slate-300">{t('serviceOnlineBooking')}</span>
                <span className="text-sm text-slate-300">{t('serviceSupport')}</span>
                <span className="text-sm text-slate-300">{t('serviceLuggage')}</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={230}>
            <div>
              <h3 className="text-base font-bold uppercase tracking-wide text-white">{t('getInTouch')}</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li className="flex gap-3">
                  <span className="text-amber-400" aria-hidden>
                    📍
                  </span>
                  <span>Urafiki, Dar es Salaam, Tanzania</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-400" aria-hidden>
                    ✉️
                  </span>
                  <a className="transition hover:text-amber-400" href="mailto:info@louisline.co.tz">
                    info@louisline.co.tz
                  </a>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-400" aria-hidden>
                    📞
                  </span>
                  <span>0683 300 100 · 0798 700 700</span>
                </li>
              </ul>
              <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-slate-400">{t('followUs')}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <SocialLink href={WHATSAPP_LINK} label="WhatsApp">
                  <span className="text-base">W</span>
                </SocialLink>
                <SocialLink href="https://www.facebook.com" label="Facebook">
                  <span className="text-base">f</span>
                </SocialLink>
                <SocialLink href="https://www.instagram.com" label="Instagram">
                  <span className="text-base">◎</span>
                </SocialLink>
                <SocialLink href="https://www.youtube.com" label="YouTube">
                  <span className="text-base">▶</span>
                </SocialLink>
                <SocialLink href="https://www.tiktok.com" label={t('socialTiktok')}>
                  <span className="text-base">♪</span>
                </SocialLink>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>{t('copyright')}</p>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <p className="flex items-center gap-2 text-slate-300">
                <span aria-hidden>🇹🇿</span>
                <span>{t('madeInTanzania')}</span>
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                <span className="cursor-default">{t('terms')}</span>
                <span className="text-slate-600">|</span>
                <span className="cursor-default">{t('privacy')}</span>
                <span className="text-slate-600">|</span>
                <span className="cursor-default">{t('cookies')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
