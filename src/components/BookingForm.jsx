import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOCATIONS, OPERATOR_ID, locationLabelByValue } from '../data/routes'
import { useSafariPlus } from '../hooks/useSafariPlus'
import { useI18n } from '../i18n/I18nContext'

const today = new Date().toISOString().split('T')[0]

const baseForm = {
  from: '',
  to: '',
  date: today,
  passengers: '1',
}

export default function BookingForm({ initialValues = {}, title = 'Book a trip', showTripTabs = false }) {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [tripType, setTripType] = useState('oneway')
  const [form, setForm] = useState(() => ({ ...baseForm, ...initialValues }))
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isLaunching, setIsLaunching] = useState(false)
  const [bookingOpened, setBookingOpened] = useState(false)
  const { isReady, error, ensureScript, checkReady } = useSafariPlus()

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setFieldErrors((prev) => ({ ...prev, [name]: '' }))
    setSubmitError('')
  }

  const validate = () => {
    const nextErrors = {}
    if (!form.from) nextErrors.from = t('errSelectDeparture')
    if (!form.to) nextErrors.to = t('errSelectDestination')
    if (form.from && form.to && form.from === form.to) {
      nextErrors.to = t('errDestinationDifferent')
    }
    if (!form.date) nextErrors.date = t('errPickDate')
    if (!form.passengers || Number(form.passengers) < 1) {
      nextErrors.passengers = t('errPassengersMin')
    }

    setFieldErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const launchBooking = (event) => {
    event.preventDefault()
    setSubmitError('')

    if (!validate()) return

    ensureScript()
    if (!checkReady()) {
      setSubmitError(t('errLoadingService'))
      return
    }

    try {
      setIsLaunching(true)
      setBookingOpened(false)
      document.body.style.overflow = 'hidden'
      document.body.classList.add('safari-dialog-open')
      window.safariplus.newTripDialog({
        operatorId: OPERATOR_ID,
        origin: form.from,
        destination: form.to,
        departureDate: form.date,
        passengersCount: Number(form.passengers),
      })
      setBookingOpened(true)
      const cleanupAfterDialog = () => {
        document.body.style.overflow = ''
        document.body.classList.remove('safari-dialog-open')
        setIsLaunching(false)
        window.removeEventListener('focus', cleanupAfterDialog)
      }
      // Keep app chrome hidden while SafariYetu results are open.
      window.addEventListener('focus', cleanupAfterDialog)
    } catch (err) {
      document.body.style.overflow = ''
      document.body.classList.remove('safari-dialog-open')
      setIsLaunching(false)
      setSubmitError(err?.message || t('errCouldNotOpen'))
    }
  }

  if (bookingOpened) {
    return null
  }

  return (
    <section className="rounded-2xl border border-[#d91d27]/70 bg-[#d91d27] p-2 shadow-[0_24px_56px_-20px_rgba(217,29,39,0.65)] md:rounded-2xl md:border-[#dbe4f5] md:bg-white md:shadow-none md:p-0">
      <h3 className="px-1 pt-1 text-base font-bold text-white md:px-2 md:pt-0 md:text-lg md:text-[#22307a]">{title}</h3>
      <p className="px-1 text-xs text-white/90 md:px-2 md:text-sm md:text-slate-500">{t('bookingFindTrips')}</p>

      {showTripTabs ? (
        <div className="mt-2 rounded-xl border border-slate-200 bg-white p-1">
          <div className="grid grid-cols-3 gap-1 text-[11px] font-bold sm:text-xs">
            {[
              { id: 'oneway', label: t('tripOneWay'), icon: '↔' },
              { id: 'round', label: t('navGallery'), icon: '⇄' },
              { id: 'multi', label: t('navContact'), icon: '↪' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  if (tab.id === 'round') {
                    navigate('/gallery')
                    return
                  }
                  if (tab.id === 'multi') {
                    navigate('/contact')
                    return
                  }
                  setTripType(tab.id)
                }}
                className={`flex items-center justify-center gap-1 rounded-lg px-1.5 py-1.5 transition ${
                  tripType === tab.id ? 'bg-[#1f3b8f] text-white' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className={tripType === tab.id ? 'text-[#ffb3b9]' : 'text-[#d91d27]'} aria-hidden>
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {!bookingOpened ? (
        <form className="mt-2 overflow-hidden rounded-2xl border border-[#29388d]/20 bg-white shadow-sm md:mt-3 md:rounded-xl md:border-[#e2e8f0]" onSubmit={launchBooking}>
        <div className="grid grid-cols-2 md:grid-cols-[142px_52px_142px_96px_86px_104px] lg:grid-cols-[1.4fr_auto_1.4fr_0.95fr_0.8fr_132px]">
          <div className="order-1 border-b border-[#29388d]/10 p-2.5 md:order-1 md:border-b-0 md:border-r md:p-4">
            <label className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wide text-[#29388d] md:mb-1 md:text-xs" htmlFor="from">
              {t('from')}
            </label>
            <select
              id="from"
              name="from"
              value={form.from}
              onChange={onChange}
              className="w-full rounded-lg border border-[#29388d]/55 bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#29388d] shadow-sm focus:border-[#29388d] focus:outline-none focus:ring-2 focus:ring-[#29388d]/20 md:py-2 md:text-sm"
            >
              <option value="">{t('selectLocation')}</option>
              {LOCATIONS.map((location) => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
            {fieldErrors.from ? <p className="mt-1 text-xs text-red-600">{fieldErrors.from}</p> : null}
          </div>

          <div className="order-2 border-b border-[#29388d]/10 p-2.5 md:order-3 md:border-b-0 md:border-r md:p-4">
            <label className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wide text-[#29388d] md:mb-1 md:text-xs" htmlFor="to">
              {t('to')}
            </label>
            <select
              id="to"
              name="to"
              value={form.to}
              onChange={onChange}
              className="w-full rounded-lg border border-[#29388d]/55 bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#29388d] shadow-sm focus:border-[#29388d] focus:outline-none focus:ring-2 focus:ring-[#29388d]/20 md:py-2 md:text-sm"
            >
              <option value="">{t('selectDestination')}</option>
              {LOCATIONS.map((location) => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
            {fieldErrors.to ? <p className="mt-1 text-xs text-red-600">{fieldErrors.to}</p> : null}
          </div>

          <div className="order-4 border-b border-[#29388d]/10 p-2.5 md:order-4 md:border-b-0 md:border-r md:p-4">
            <label className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wide text-[#29388d] md:mb-1 md:text-xs" htmlFor="date">
              {t('date')}
            </label>
            <input
              id="date"
              name="date"
              type="date"
              min={today}
              value={form.date}
              onChange={onChange}
              className="w-full rounded-lg border border-[#29388d]/55 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#29388d] shadow-sm focus:border-[#29388d] focus:outline-none focus:ring-2 focus:ring-[#29388d]/20 md:py-2 md:text-sm"
            />
            {fieldErrors.date ? <p className="mt-1 text-xs text-red-600">{fieldErrors.date}</p> : null}
          </div>

          <div className="order-5 border-b border-[#29388d]/10 p-2.5 md:order-5 md:border-b-0 md:border-r md:p-4">
            <label className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wide text-[#29388d] md:mb-1 md:text-xs" htmlFor="passengers">
              {t('passengers')}
            </label>
            <input
              id="passengers"
              name="passengers"
              type="number"
              min="1"
              max="8"
              value={form.passengers}
              onChange={onChange}
              className="w-full rounded-lg border border-[#29388d]/55 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#29388d] shadow-sm focus:border-[#29388d] focus:outline-none focus:ring-2 focus:ring-[#29388d]/20 md:py-2 md:text-sm"
            />
            {fieldErrors.passengers ? (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.passengers}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isLaunching}
            className="btn-press order-6 col-span-2 bg-[#29388d] px-3 py-2.5 text-[11px] font-extrabold uppercase tracking-wide text-white transition hover:bg-[#1e2a6e] disabled:cursor-not-allowed disabled:opacity-70 md:col-span-1 md:bg-[#10a04a] md:py-5 md:text-sm md:hover:bg-[#0b8b3f]"
          >
            {isLaunching ? t('launching') : t('search')}
          </button>
        </div>
        </form>
      ) : null}

      {!bookingOpened ? (
      <p className="mt-2 text-xs text-white/90 md:mt-3 md:text-sm md:text-slate-500">
        {t('selectedRoute')}:{' '}
        <span className="font-semibold text-white md:text-[#22307a]">
          {form.from && form.to
            ? `${locationLabelByValue[form.from]} ${t('routeTo')} ${locationLabelByValue[form.to]}`
            : t('chooseOriginDestination')}
        </span>
      </p>
      ) : null}
      {!bookingOpened && !isReady ? (
        <div className="mt-2 flex items-center gap-2 text-xs text-amber-700">
          <span>{t('bookingServiceNotReady')}</span>
          <button
            type="button"
            onClick={() => {
              ensureScript()
              checkReady()
            }}
            className="rounded-md border border-amber-300 px-2 py-1 font-semibold hover:bg-amber-50"
          >
            {t('retryCheck')}
          </button>
        </div>
      ) : null}
      {!bookingOpened && error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
      {!bookingOpened && submitError ? <p className="mt-2 text-xs text-red-600">{submitError}</p> : null}
    </section>
  )
}
