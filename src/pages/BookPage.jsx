import BookingForm from '../components/BookingForm'
import ScrollReveal from '../components/ScrollReveal'
import { useI18n } from '../i18n/I18nContext'

export default function BookPage() {
  const { t } = useI18n()
  return (
    <section className="space-y-5">
      <ScrollReveal>
        <div className="rounded-3xl bg-gradient-to-r from-[#29388d] to-[#d91d27] p-6 text-white">
          <h1 className="text-3xl font-bold">{t('bookJourney')}</h1>
          <p className="mt-2 text-blue-100">
            {t('reserveSeats')}
          </p>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <BookingForm title={t('completeBooking')} />
      </ScrollReveal>
    </section>
  )
}
