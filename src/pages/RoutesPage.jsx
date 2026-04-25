import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import { ROUTES, locationLabelByValue } from '../data/routes'
import { useI18n } from '../i18n/I18nContext'

export default function RoutesPage() {
  const { language, t } = useI18n()
  const routeHighlights =
    language === 'sw'
      ? [
          'Safari za asubuhi zinazofaa kwa shughuli za mapema na miunganiko ya safari.',
          'Usafiri wa moja kwa moja wenye faraja na uhifadhi rahisi mtandaoni.',
          'Huduma ya safari ndefu ya kuaminika pamoja na msaada wa wateja.',
          'Ratiba rahisi ya kurudi yenye upatikanaji wa kila siku.',
          'Utaratibu wa kupanda haraka na muda wa safari wa uhakika.',
          'Uzoefu wa basi la kiwango cha juu lenye nafasi rafiki kwa mizigo.',
        ]
      : [
          'Morning departures ideal for business and early connections.',
          'Comfortable direct travel with smooth online reservation.',
          'Reliable long-distance service with customer support on standby.',
          'Convenient return schedule with consistent daily availability.',
          'Fast boarding process and dependable intercity timing.',
          'Premium coach experience with luggage-friendly space.',
        ]
  return (
    <section className="space-y-6">
      <ScrollReveal>
        <div className="rounded-3xl bg-gradient-to-r from-[#29388d] to-[#d91d27] p-6 text-white">
          <h1 className="text-3xl font-bold">{t('availableRoutes')}</h1>
          <p className="mt-2 text-blue-100">
            {t('chooseRoutePrefill')}
          </p>
        </div>
      </ScrollReveal>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ROUTES.map((route, index) => (
          <ScrollReveal key={route.id} delay={(index % 6) * 70}>
            <article className="soft-card glow-on-hover rounded-2xl p-6">
              <p className="text-xs font-bold tracking-wide text-[#29388d]">{route.id}</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                {locationLabelByValue[route.from]} to {locationLabelByValue[route.to]}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {routeHighlights[index % routeHighlights.length]}
              </p>
              <Link
                to={`/?from=${route.from}&to=${route.to}#book`}
                className="mt-4 inline-flex rounded-lg bg-gradient-to-r from-[#d91d27] to-[#29388d] px-4 py-2 text-sm font-semibold text-white shadow-md hover:from-[#b61720] hover:to-[#1e2a6e]"
              >
                {t('bookNow')}
              </Link>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
