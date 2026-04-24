import { useState } from 'react'
import { LOCATIONS, OPERATOR_ID, locationLabelByValue } from '../data/routes'
import { useSafariPlus } from '../hooks/useSafariPlus'

const today = new Date().toISOString().split('T')[0]

const baseForm = {
  from: '',
  to: '',
  date: today,
  passengers: '1',
}

export default function BookingForm({ initialValues = {}, title = 'Book a trip' }) {
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

  const validate = () => {
    const nextErrors = {}
    if (!form.from) nextErrors.from = 'Select departure location.'
    if (!form.to) nextErrors.to = 'Select destination.'
    if (form.from && form.to && form.from === form.to) {
      nextErrors.to = 'Destination must be different from origin.'
    }
    if (!form.date) nextErrors.date = 'Pick a travel date.'
    if (!form.passengers || Number(form.passengers) < 1) {
      nextErrors.passengers = 'Passengers must be at least 1.'
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
      setSubmitError('Booking service is still loading. Please try again in a moment.')
      return
    }

    try {
      setIsLaunching(true)
      document.body.style.overflow = 'hidden'
      window.safariplus.newTripDialog({
        operatorId: OPERATOR_ID,
        origin: form.from,
        destination: form.to,
        departureDate: form.date,
        passengersCount: Number(form.passengers),
      })
      const cleanupAfterDialog = () => {
        document.body.style.overflow = ''
        setIsLaunching(false)
        window.removeEventListener('focus', cleanupAfterDialog)
      }
      window.addEventListener('focus', cleanupAfterDialog)
      setTimeout(cleanupAfterDialog, 1500)
    } catch (err) {
      document.body.style.overflow = ''
      setIsLaunching(false)
      setSubmitError(
        err?.message || 'Could not open booking right now. Please retry.',
      )
    }
  }

  return (
    <section className="rounded-2xl bg-white/95 p-5 shadow-xl ring-1 ring-slate-200 md:p-7">
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">
        Fast digital booking powered by Safari Yetu.
      </p>

      <form className="mt-5 grid gap-4 md:grid-cols-2" onSubmit={launchBooking}>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="from">
            From
          </label>
          <select
            id="from"
            name="from"
            value={form.from}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-blue-600 focus:outline-none"
          >
            <option value="">Select origin</option>
            {LOCATIONS.map((location) => (
              <option key={location.value} value={location.value}>
                {location.label}
              </option>
            ))}
          </select>
          {fieldErrors.from ? <p className="mt-1 text-xs text-red-600">{fieldErrors.from}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="to">
            To
          </label>
          <select
            id="to"
            name="to"
            value={form.to}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-blue-600 focus:outline-none"
          >
            <option value="">Select destination</option>
            {LOCATIONS.map((location) => (
              <option key={location.value} value={location.value}>
                {location.label}
              </option>
            ))}
          </select>
          {fieldErrors.to ? <p className="mt-1 text-xs text-red-600">{fieldErrors.to}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="date">
            Departure date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            min={today}
            value={form.date}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-blue-600 focus:outline-none"
          />
          {fieldErrors.date ? <p className="mt-1 text-xs text-red-600">{fieldErrors.date}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="passengers">
            Passengers
          </label>
          <input
            id="passengers"
            name="passengers"
            type="number"
            min="1"
            max="8"
            value={form.passengers}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-blue-600 focus:outline-none"
          />
          {fieldErrors.passengers ? (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.passengers}</p>
          ) : null}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isLaunching}
            className="w-full rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLaunching ? 'Launching booking...' : 'Book with Safari Yetu'}
          </button>
        </div>
      </form>

      <p className="mt-3 text-sm text-slate-600">
        Selected route:{' '}
        <span className="font-medium text-slate-900">
          {form.from && form.to
            ? `${locationLabelByValue[form.from]} to ${locationLabelByValue[form.to]}`
            : 'Choose origin and destination'}
        </span>
      </p>
      {!isReady ? (
        <div className="mt-2 flex items-center gap-2 text-xs text-amber-700">
          <span>Booking service not ready.</span>
          <button
            type="button"
            onClick={() => {
              ensureScript()
              checkReady()
            }}
            className="rounded-md border border-amber-300 px-2 py-1 font-semibold hover:bg-amber-50"
          >
            Retry check
          </button>
        </div>
      ) : null}
      {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
      {submitError ? <p className="mt-2 text-xs text-red-600">{submitError}</p> : null}
    </section>
  )
}
