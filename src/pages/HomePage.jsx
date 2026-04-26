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
  const heroMixedImages = useMemo(
    () => [IMAGE_URLS[0], IMAGE_URLS[4]].filter(Boolean),
    [],
  )

  return (
    <div className="space-y-14">
      <section className="relative -mx-[calc(50vw-50%)] w-screen overflow-hidden text-white">
        <div
          className="hero-bg-layer absolute inset-0"
          style={{
            backgroundImage: `url('${IMAGE_URLS[0]}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 12%',
          }}
        />
        <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-red-300/20 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-0 md:flex md:min-h-[66dvh] md:flex-col md:justify-center md:px-6 md:py-14">
          <div className="w-full">
            <ScrollReveal>
              <div className="translate-y-3 grid grid-cols-1 gap-3 md:translate-y-0 md:grid-cols-2 md:gap-4">
                {heroMixedImages.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt={`Louisline preview ${index + 1}`}
                    className={`h-[34dvh] w-full rounded-xl border border-white/20 object-cover shadow-xl md:h-[46dvh] lg:h-[52dvh] ${
                      index > 0 ? 'hidden md:block' : 'invisible md:visible'
                    }`}
                  />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section
        id="book"
        className="booking-emerge relative z-20 -mt-20 grid gap-3 sm:-mt-20 md:-mt-16 md:grid-cols-[180px_1fr] lg:-mt-16 lg:grid-cols-[200px_1fr]"
      >
        <ScrollReveal>
          <aside className="hidden rounded-2xl bg-gradient-to-b from-[#26118a] to-[#4b16a8] p-4 text-white shadow-xl md:block">
            <p className="text-lg font-extrabold leading-tight">{t('callNow')}</p>
            <p className="mt-2 text-xs text-indigo-100">{t('needQuickHelp')}</p>
            <p className="mt-4 text-xl font-black tracking-wide">0683 300 100</p>
            <p className="mt-1 text-xs text-indigo-200">{t('supportAvailableDaily')}</p>
          </aside>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <BookingForm initialValues={prefilled} title={t('searchAndBookBus')} />
        </ScrollReveal>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          [t('featureSafetyTitle'), t('featureSafetyDesc')],
          [t('featureComfortTitle'), t('featureComfortDesc')],
          [t('featureDigitalTitle'), t('featureDigitalDesc')],
        ].map((feature, index) => (
          <ScrollReveal key={feature[0]} delay={index * 90}>
            <article className="soft-card glow-on-hover rounded-2xl border-2 border-[#29388d]/60 p-6">
              <h3 className="text-lg font-bold text-[#29388d]">{feature[0]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature[1]}</p>
            </article>
          </ScrollReveal>
        ))}
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
