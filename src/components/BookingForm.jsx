import { useCallback, useEffect, useState } from 'react'
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

export default function BookingForm({
  initialValues = {},
  title = 'Book a trip',
  variant = 'standalone',
  showHeader = true,
  showTripTypeTabs = false,
  submitLabel = null,
}) {
  const { t } = useI18n()
  const embedded = variant === 'embedded'
  const [tripType, setTripType] = useState('oneway')
  const [form, setForm] = useState(() => ({ ...baseForm, ...initialValues }))
  const [returnDate, setReturnDate] = useState(today)
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isLaunching, setIsLaunching] = useState(false)
  const [bookingOpened, setBookingOpened] = useState(false)
  const { isReady, error, ensureScript, checkReady } = useSafariPlus()

  useEffect(() => {
    if (tripType !== 'round') return
    if (returnDate && form.date && returnDate < form.date) {
      setReturnDate(form.date)
    }
  }, [form.date, returnDate, tripType])

  const swapEnds = useCallback(() => {
    setForm((prev) => ({ ...prev, from: prev.to, to: prev.from }))
    setFieldErrors((prev) => ({ ...prev, from: '', to: '' }))
    setSubmitError('')
  }, [])

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
    if (tripType === 'round' && returnDate && returnDate < form.date) {
      nextErrors.returnDate = t('errReturnBeforeOutbound')
    }
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
      window.addEventListener('focus', cleanupAfterDialog)
      setTimeout(cleanupAfterDialog, 1500)
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

  const tripTabs = showTripTypeTabs ? (
    <div className="grid grid-cols-3 gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 text-[11px] font-bold sm:text-xs md:text-sm">
      {[
        { id: 'oneway', label: t('tripOneWay'), icon: '→' },
        { id: 'round', label: t('tripRoundTrip'), icon: '⇄' },
        { id: 'multi', label: t('tripMultiple'), icon: '＋' },
      ].map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setTripType(tab.id)}
          className={`flex items-center justify-center gap-1 rounded-lg px-1.5 py-2 transition sm:px-2 ${
            tripType === tab.id ? 'bg-[#29388d] text-white shadow-sm' : 'text-slate-600 hover:bg-white'
          }`}
        >
          <span className={tripType === tab.id ? 'text-[#ffb4b9]' : 'text-[#d91d27]'} aria-hidden>
            {tab.icon}
          </span>
          <span className="truncate">{tab.label}</span>
        </button>
      ))}
    </div>
  ) : null

  const innerForm = (
    <form className="mt-0 overflow-hidden rounded-2xl border border-[#29388d]/20 bg-white shadow-sm md:rounded-xl md:border-[#e2e8f0]" onSubmit={launchBooking}>
      {tripTabs ? <div className="border-b border-slate-100 p-2 md:p-3">{tripTabs}</div> : null}

      {tripType === 'round' ? (
        <p className="border-b border-slate-100 px-3 py-2 text-[11px] text-slate-500 md:px-4 md:text-xs">
          {t('tripRoundTripHint')}
        </p>
      ) : null}

      <div className="grid grid-cols-2 gap-0 md:grid-cols-12 md:items-stretch">
        <div className="col-span-2 border-b border-[#29388d]/10 p-3 md:col-span-3 md:border-b-0 md:border-r md:p-4">
          <label className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#29388d]" htmlFor="from">
            <span aria-hidden>📍</span>
            {t('from')}
          </label>
          <select
            id="from"
            name="from"
            value={form.from}
            onChange={onChange}
            className="w-full rounded-lg border border-[#29388d]/55 bg-white px-2.5 py-2 text-xs font-medium text-[#29388d] shadow-sm focus:border-[#29388d] focus:outline-none focus:ring-2 focus:ring-[#29388d]/20 md:text-sm"
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

        <div className="flex items-end justify-center border-b border-[#29388d]/10 px-1 pb-3 pt-6 md:col-span-1 md:border-b-0 md:border-r md:px-0 md:pb-4 md:pt-0">
          <button
            type="button"
            onClick={swapEnds}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#10a04a]/40 bg-[#ecfdf3] text-lg text-[#10a04a] shadow-sm transition hover:bg-[#d1fae5]"
            aria-label={t('swapRoute')}
          >
            ⇅
          </button>
        </div>

        <div className="col-span-2 border-b border-[#29388d]/10 p-3 md:col-span-3 md:border-b-0 md:border-r md:p-4">
          <label className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#29388d]" htmlFor="to">
            <span aria-hidden>📍</span>
            {t('to')}
          </label>
          <select
            id="to"
            name="to"
            value={form.to}
            onChange={onChange}
            className="w-full rounded-lg border border-[#29388d]/55 bg-white px-2.5 py-2 text-xs font-medium text-[#29388d] shadow-sm focus:border-[#29388d] focus:outline-none focus:ring-2 focus:ring-[#29388d]/20 md:text-sm"
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

        <div className="col-span-1 border-b border-[#29388d]/10 p-3 md:col-span-3 md:border-b-0 md:border-r md:p-4">
          <label className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#29388d]" htmlFor="date">
            <span aria-hidden>📅</span>
            {t('date')}
          </label>
          <input
            id="date"
            name="date"
            type="date"
            min={today}
            value={form.date}
            onChange={onChange}
            className="w-full rounded-lg border border-[#29388d]/55 bg-white px-2 py-2 text-xs font-semibold text-[#29388d] shadow-sm focus:border-[#29388d] focus:outline-none focus:ring-2 focus:ring-[#29388d]/20 md:text-sm"
          />
          {fieldErrors.date ? <p className="mt-1 text-xs text-red-600">{fieldErrors.date}</p> : null}
        </div>

        <div className="col-span-1 border-b border-[#29388d]/10 p-3 md:col-span-2 md:border-b-0 md:border-r md:p-4">
          <label className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#29388d]" htmlFor="passengers">
            <span aria-hidden>👤</span>
            {t('passengers')}
          </label>
          <select
            id="passengers"
            name="passengers"
            value={form.passengers}
            onChange={onChange}
            className="w-full rounded-lg border border-[#29388d]/55 bg-white px-2.5 py-2 text-xs font-semibold text-[#29388d] shadow-sm focus:border-[#29388d] focus:outline-none focus:ring-2 focus:ring-[#29388d]/20 md:text-sm"
          >
            {['1', '2', '3', '4', '5', '6', '7', '8'].map((n) => (
              <option key={n} value={n}>
                {n === '1' ? t('onePassenger') : t('passengersN', { n })}
              </option>
            ))}
          </select>
          {fieldErrors.passengers ? <p className="mt-1 text-xs text-red-600">{fieldErrors.passengers}</p> : null}
        </div>

      </div>

      {tripType === 'round' ? (
        <div className="border-b border-[#29388d]/10 p-3 md:p-4">
          <label className="mb-1 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#29388d]" htmlFor="returnDate">
            <span aria-hidden>📅</span>
            {t('returnDate')}
          </label>
          <input
            id="returnDate"
            name="returnDate"
            type="date"
            min={form.date || today}
            value={returnDate}
            onChange={(e) => {
              setReturnDate(e.target.value)
              setFieldErrors((prev) => ({ ...prev, returnDate: '' }))
            }}
            className="w-full max-w-xs rounded-lg border border-[#29388d]/55 bg-white px-2 py-2 text-xs font-semibold text-[#29388d] shadow-sm focus:border-[#29388d] focus:outline-none focus:ring-2 focus:ring-[#29388d]/20 md:text-sm"
          />
          {fieldErrors.returnDate ? <p className="mt-1 text-xs text-red-600">{fieldErrors.returnDate}</p> : null}
        </div>
      ) : null}

      <div className="border-t border-slate-100 p-3 md:p-4">
        <button
          type="submit"
          disabled={isLaunching}
          className="btn-press flex w-full items-center justify-center gap-2 rounded-xl bg-[#10a04a] px-4 py-3.5 text-sm font-extrabold tracking-wide text-white shadow-md transition hover:bg-[#0b8b3f] disabled:cursor-not-allowed disabled:opacity-70 md:py-4"
        >
          <span aria-hidden>🔍</span>
          {isLaunching ? t('launching') : submitLabel || t('search')}
        </button>
      </div>
    </form>
  )

  const footer = (
    <>
      <p
        className={`mt-2 text-xs md:mt-3 md:text-sm ${
          embedded ? 'text-slate-600' : 'text-white/90 md:text-slate-500'
        }`}
      >
        {t('selectedRoute')}:{' '}
        <span className={`font-semibold ${embedded ? 'text-[#22307a]' : 'text-white md:text-[#22307a]'}`}>
          {form.from && form.to
            ? `${locationLabelByValue[form.from]} ${t('routeTo')} ${locationLabelByValue[form.to]}`
            : t('chooseOriginDestination')}
        </span>
      </p>
      {!isReady ? (
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-amber-700">
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
      {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
      {submitError ? <p className="mt-2 text-xs text-red-600">{submitError}</p> : null}
    </>
  )

  if (embedded) {
    return (
      <div className="contents">
        {innerForm}
        {footer}
      </div>
    )
  }

  return (
    <section className="rounded-2xl border border-[#d91d27]/70 bg-[#d91d27] p-2.5 shadow-[0_24px_56px_-20px_rgba(217,29,39,0.65)] md:rounded-2xl md:border-[#dbe4f5] md:bg-white md:shadow-none md:p-0">
      {showHeader ? (
        <>
          <h3 className="px-1 pt-1 text-lg font-bold text-white md:px-2 md:pt-0 md:text-lg md:text-[#22307a]">{title}</h3>
          <p className="px-1 text-xs text-white/90 md:px-2 md:text-sm md:text-slate-500">{t('bookingFindTrips')}</p>
        </>
      ) : null}

      {!bookingOpened ? <div className={showHeader ? 'mt-3' : 'mt-0'}>{innerForm}</div> : null}
      {!bookingOpened ? <div className={showHeader ? 'px-1 md:px-2' : ''}>{footer}</div> : null}
    </section>
  )
}
