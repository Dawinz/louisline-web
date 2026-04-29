import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import BookingForm from '../components/BookingForm'
import ScrollReveal from '../components/ScrollReveal'
import { IMAGE_URLS } from '../data/routes'
import { useI18n } from '../i18n/I18nContext'

export default function HomePage() {
  const { t } = useI18n()
  const [searchParams] = useSearchParams()
  const prefilled = useMemo(
    () => ({
      from: searchParams.get('from') || '',
      to: searchParams.get('to') || '',
    }),
    [searchParams],
  )
  const featureTiles = useMemo(
    () => [
      [t('featureSafetyTitle'), t('featureSafetyDesc'), '🛡️'],
      [t('featureComfortTitle'), t('featureComfortDesc'), '🛋️'],
      [t('featureDigitalTitle'), t('featureDigitalDesc'), '🎟️'],
      [t('serviceOnTime'), t('routesCardDesc'), '⏱️'],
    ],
    [t],
  )

  return (
    <div className="space-y-14">
      <section className="relative -mx-[calc(50vw-50%)] w-screen overflow-hidden text-white md:max-h-[600px]">
        <div
          className="hero-bg-layer absolute inset-0"
          style={{
            backgroundImage: "url('/louisline-header-desktop.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-black/20" />
        <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-7 md:px-8 md:pb-14 md:pt-10">
          <ScrollReveal>
            <div className="md:grid md:grid-cols-[1fr_1.05fr] md:items-end md:gap-6">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                  <span aria-hidden>🛡️</span>
                  <span>
                    Usalama Kwanza
                    <span className="ml-2 text-[11px] font-medium text-white/85">Safari salama, kila siku</span>
                  </span>
                </span>
                <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight md:text-6xl">
                  <span className="text-white">Safari yako,</span> <span className="text-[#E53935]">mwendo wetu</span>
                </h1>
                <p className="mt-4 max-w-xl text-base text-slate-100 md:text-[22px] md:leading-snug">
                  Book ticket haraka na salama ndani ya sekunde chache.
                </p>
                <div className="mt-7 grid grid-cols-1 gap-2 text-sm text-white/95 sm:grid-cols-3">
                  {[
                    ['Viti vya starehe', 'Safari tulivu kila wakati', '🛋️'],
                    ['WiFi Bure', 'Unganisha papo hapo', '📶'],
                    ['Usalama Kwanza', 'Safari salama kila siku', '🛡️'],
                  ].map(([label, desc, icon]) => (
                    <div key={label} className="rounded-lg border border-white/20 bg-[#0f1f50]/55 px-3 py-2">
                      <p className="font-semibold">
                        <span aria-hidden>{icon}</span> {label}
                      </p>
                      <p className="mt-0.5 text-[11px] text-white/85">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section
        id="book"
        className="booking-emerge relative z-20 -mt-14 grid gap-3 sm:-mt-14 md:-mt-20"
      >
        <ScrollReveal delay={80}>
          <div className="mx-auto w-full max-w-5xl rounded-2xl border border-[#d7deee] bg-white p-2 shadow-[0_24px_50px_-24px_rgba(15,23,42,0.35)] md:p-3">
            <div className="grid grid-cols-3 gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 text-xs font-semibold md:text-sm">
              <button type="button" className="rounded-md bg-[#29388d] px-2 py-2 text-white">{t('navBook')}</button>
              <button type="button" className="rounded-md px-2 py-2 text-slate-500">{t('bookJourney')}</button>
              <button type="button" className="rounded-md px-2 py-2 text-slate-500">{t('galleryPreview')}</button>
            </div>
            <BookingForm initialValues={prefilled} title={t('searchAndBookBus')} />
          </div>
        </ScrollReveal>
      </section>

      <section className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-white p-3 md:grid-cols-4 md:p-4">
        {[
          ['10,000+', t('serviceComfort')],
          ['100%', t('featureSafetyTitle')],
          ['20+', t('navRoutes')],
          ['4.8/5', t('followUs')],
        ].map((stat) => (
          <div key={stat[0]} className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 text-center">
            <p className="text-xl font-black text-[#29388d] md:text-2xl">{stat[0]}</p>
            <p className="mt-1 text-xs font-semibold text-slate-500 md:text-sm">{stat[1]}</p>
          </div>
        ))}
      </section>

      <section id="about">
        <ScrollReveal>
          <h2 className="text-center text-2xl font-black tracking-tight text-[#1e2a6e] md:text-3xl">
            Kwa nini uchague Louis Line?
          </h2>
        </ScrollReveal>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {featureTiles.map((feature, index) => (
            <ScrollReveal key={feature[0]} delay={index * 70}>
              <article className="rounded-2xl border border-[#dbe4f5] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#eef3ff] text-lg">
                  {feature[2]}
                </div>
                <h3 className="text-base font-bold text-[#22307a]">{feature[0]}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{feature[1]}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section>
        <ScrollReveal>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">{t('galleryPreview')}</h2>
            <Link to="/gallery" className="text-sm font-semibold text-[#29388d] hover:text-[#d91d27]">
              {t('viewFullGallery')}
            </Link>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {IMAGE_URLS.slice(4, 12).map((image, index) => (
            <ScrollReveal key={image} delay={(index % 6) * 70}>
              <img
                src={image}
                alt={`Louisline bus ${index + 1}`}
                className="floating-soft h-32 w-full rounded-xl border border-slate-200 object-cover shadow-md md:h-40"
              />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  )
}
