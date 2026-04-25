import { useState } from 'react'
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

export default function BookingForm({ initialValues = {}, title = 'Book a trip' }) {
  const { t } = useI18n()
  const [form, setForm] = useState(() => ({ ...baseForm, ...initialValues }))
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isLaunching, setIsLaunching] = useState(false)
  const { isReady, error, ensureScript, checkReady } = useSafariPlus()

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setFieldErrors((prev) => ({ ...prev, [name]: '' }))
    setSubmitError('')
  }

  const swapRoute = () => {
    setForm((prev) => ({ ...prev, from: prev.to, to: prev.from }))
    setFieldErrors((prev) => ({ ...prev, from: '', to: '' }))
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
      document.body.style.overflow = 'hidden'
      document.body.classList.add('safari-dialog-open')
      window.safariplus.newTripDialog({
        operatorId: OPERATOR_ID,
        origin: form.from,
        destination: form.to,
        departureDate: form.date,
        passengersCount: Number(form.passengers),
      })
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
      setSubmitError(
        err?.message || t('errCouldNotOpen'),
      )
    }
  }

  return (
    <section className="rounded-3xl border border-white/20 bg-white/95 p-3 shadow-2xl md:p-4">
      <h3 className="px-2 pt-1 text-xl font-bold text-slate-900">{title}</h3>
      <p className="px-2 text-sm text-slate-600">{t('bookingFindTrips')}</p>

      <form className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white" onSubmit={launchBooking}>
        <div className="grid md:grid-cols-[1fr_auto_1fr_1fr_1fr_190px]">
          <div className="border-b border-slate-200 p-4 md:border-b-0 md:border-r">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="from">
              {t('from')}
            </label>
            <select
              id="from"
              name="from"
              value={form.from}
              onChange={onChange}
              className="w-full bg-transparent text-lg font-semibold text-slate-900 focus:outline-none"
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

          <div className="flex items-center justify-center border-b border-slate-200 p-2 md:border-b-0 md:border-r">
            <button
              type="button"
              onClick={swapRoute}
              className="rounded-full bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200"
              aria-label={t('swapRoute')}
            >
              ↔
            </button>
          </div>

          <div className="border-b border-slate-200 p-4 md:border-b-0 md:border-r">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="to">
              {t('to')}
            </label>
            <select
              id="to"
              name="to"
              value={form.to}
              onChange={onChange}
              className="w-full bg-transparent text-lg font-semibold text-slate-900 focus:outline-none"
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

          <div className="border-b border-slate-200 p-4 md:border-b-0 md:border-r">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="date">
              {t('date')}
            </label>
            <input
              id="date"
              name="date"
              type="date"
              min={today}
              value={form.date}
              onChange={onChange}
              className="w-full bg-transparent text-lg font-semibold text-slate-900 focus:outline-none"
            />
            {fieldErrors.date ? <p className="mt-1 text-xs text-red-600">{fieldErrors.date}</p> : null}
          </div>

          <div className="border-b border-slate-200 p-4 md:border-b-0 md:border-r">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="passengers">
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
              className="w-full bg-transparent text-lg font-semibold text-slate-900 focus:outline-none"
            />
            {fieldErrors.passengers ? (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.passengers}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isLaunching}
            className="bg-[#c6b56a] px-6 py-5 text-base font-extrabold uppercase tracking-wide text-slate-900 transition hover:bg-[#b7a45a] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLaunching ? t('launching') : t('search')}
          </button>
        </div>
      </form>

      <p className="mt-3 text-sm text-slate-600">
        {t('selectedRoute')}:{' '}
        <span className="font-medium text-slate-900">
          {form.from && form.to
            ? `${locationLabelByValue[form.from]} ${t('routeTo')} ${locationLabelByValue[form.to]}`
            : t('chooseOriginDestination')}
        </span>
      </p>
      {!isReady ? (
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
      {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
      {submitError ? <p className="mt-2 text-xs text-red-600">{submitError}</p> : null}
    </section>
  )
}
