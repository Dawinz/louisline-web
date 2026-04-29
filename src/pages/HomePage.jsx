import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import BookingForm from '../components/BookingForm'
import ScrollReveal from '../components/ScrollReveal'
import { IMAGE_URLS } from '../data/routes'
import { useI18n } from '../i18n/I18nContext'

function HeroFeatureIcon({ type, className = 'h-4 w-4' }) {
  if (type === 'comfort') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M6 12V9a2 2 0 0 1 2-2h4a3 3 0 0 1 3 3v2" />
        <path d="M4 12h13a3 3 0 0 1 3 3v1H4v-4Z" />
        <path d="M6 16v2M18 16v2" />
      </svg>
    )
  }
  if (type === 'wifi') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M3 9a14 14 0 0 1 18 0" />
        <path d="M6 12a9 9 0 0 1 12 0" />
        <path d="M9 15a4 4 0 0 1 6 0" />
        <circle cx="12" cy="18" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-3z" />
      <path d="M9.5 12.2l1.8 1.8 3.2-3.4" />
    </svg>
  )
}

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
      [t('featureComfortTitle'), t('featureComfortDesc'), 'comfort', 'bg-[#eef3ff]'],
      [t('featureWifiTitle'), t('featureWifiDesc'), 'wifi', 'bg-red-50'],
      [t('featureSafetyTitle'), t('featureSafetyDesc'), 'safety', 'bg-[#eef3ff]'],
      [t('featurePunctualTitle'), t('featurePunctualDesc'), 'clock', 'bg-red-50'],
    ],
    [t],
  )

  const FeatureCardIcon = ({ type }) => {
    if (type === 'clock') {
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v5l3 2" />
        </svg>
      )
    }
    return <HeroFeatureIcon type={type} className="h-5 w-5" />
  }

  return (
    <div className="space-y-14">
      <section className="relative -mx-[calc(50vw-50%)] w-screen overflow-hidden text-white md:max-h-[600px]">
        <div
          className="hero-bg-layer absolute inset-0 md:hidden"
          style={{
            backgroundImage: "url('/hero-mobile-bus.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 38%',
          }}
        />
        <div
          className="hero-bg-layer absolute inset-0 hidden md:block"
          style={{
            backgroundImage: "url('/louisline-header-desktop.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/45 to-black/20 md:from-black/80 md:via-black/36 md:to-transparent" />
        <div className="relative mx-auto h-[46vh] max-w-6xl px-4 pb-10 pt-16 md:h-auto md:px-8 md:pb-14 md:pt-20">
          <ScrollReveal>
            <div className="md:grid md:grid-cols-[1fr_1.05fr] md:items-end md:gap-6">
              <div className="hidden max-w-2xl md:block">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white/95">
                    <HeroFeatureIcon type="safety" />
                  </span>
                  <span>
                    {t('heroChipSafety')}
                    <span className="ml-2 text-[11px] font-medium text-white/85">{t('heroChipSafetySub')}</span>
                  </span>
                </span>
                <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight md:text-6xl">
                  <span className="text-white">{t('heroTaglineStart')}</span>{' '}
                  <span className="text-[#E53935]">{t('heroTaglineAccent')}</span>
                </h1>
                <p className="mt-4 max-w-xl text-base text-slate-100 md:text-[22px] md:leading-snug">
                  {t('heroLead')}
                </p>
                <div className="mt-7 grid grid-cols-1 gap-2 text-sm text-white/95 sm:grid-cols-3">
                  {[
                    [t('heroChipComfort'), t('heroChipComfortSub'), 'comfort'],
                    [t('heroChipWifi'), t('heroChipWifiSub'), 'wifi'],
                    [t('heroChipSafety'), t('heroChipSafetySub'), 'safety'],
                  ].map(([label, desc, iconType]) => (
                    <div key={label} className="rounded-lg border border-white/20 bg-[#0f1f50]/55 px-3 py-2">
                      <p className="flex items-center gap-1.5 font-semibold">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white/95">
                          <HeroFeatureIcon type={iconType} />
                        </span>
                        {label}
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
        className="booking-emerge relative z-20 -mt-16 grid gap-3 sm:-mt-20 md:-mt-20"
      >
        <ScrollReveal delay={80}>
          <div className="mx-auto w-full max-w-5xl rounded-2xl border border-[#d7deee] bg-white p-2 shadow-[0_24px_50px_-24px_rgba(15,23,42,0.35)] md:p-3">
            <BookingForm
              initialValues={prefilled}
              title={t('searchAndBookBus')}
            />
          </div>
        </ScrollReveal>
      </section>

      <section className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-white p-3 md:grid-cols-4 md:p-4">
        {[
          ['10,000+', t('statCustomers')],
          ['100%', t('statSafety')],
          ['20+', t('statCities')],
          ['4.8/5', t('statReviews')],
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
            {t('whyChooseTitle')}
          </h2>
          <div className="mx-auto mt-2 flex justify-center gap-1" aria-hidden>
            <span className="h-1 w-10 rounded-full bg-[#E53935]" />
            <span className="h-1 w-10 rounded-full bg-[#1E3A8A]" />
          </div>
        </ScrollReveal>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {featureTiles.map((feature, index) => (
            <ScrollReveal key={feature[0]} delay={index * 70}>
              <article className="rounded-2xl border border-[#dbe4f5] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div
                  className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full text-lg ${feature[3]}`}
                >
                  <FeatureCardIcon type={feature[2]} />
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
