import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import BookingForm from '../components/BookingForm'
import { IMAGE_URLS } from '../data/routes'

export default function HomePage() {
  const [searchParams] = useSearchParams()
  const prefilled = useMemo(
    () => ({
      from: searchParams.get('from') || '',
      to: searchParams.get('to') || '',
    }),
    [searchParams],
  )

  return (
    <div className="space-y-12">
      <section className="grid gap-8 rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 p-6 text-white md:grid-cols-2 md:p-10">
        <div className="space-y-4">
          <p className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide">
            Premium Intercity Transport
          </p>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            Travel Tanzania with Louisline comfort and confidence.
          </h1>
          <p className="text-sm text-blue-100 md:text-base">
            Book your seat in minutes through our integrated Safari Yetu trip dialog.
          </p>
          <Link
            to="/routes"
            className="inline-flex rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-blue-900 hover:bg-blue-50"
          >
            Explore Routes
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {IMAGE_URLS.slice(0, 4).map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Louisline preview ${index + 1}`}
              className="h-36 w-full rounded-xl object-cover md:h-44"
            />
          ))}
        </div>
      </section>

      <section id="book">
        <BookingForm initialValues={prefilled} title="Search and book your bus" />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ['Safety first', 'Experienced crew and reliable schedules on every route.'],
          ['Comfort buses', 'Clean interiors and convenient boarding points for all trips.'],
          ['Fast booking', 'Instant booking flow via Safari Yetu integration.'],
        ].map((feature) => (
          <article key={feature[0]} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">{feature[0]}</h3>
            <p className="mt-2 text-sm text-slate-600">{feature[1]}</p>
          </article>
        ))}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Gallery Preview</h2>
          <Link to="/gallery" className="text-sm font-semibold text-blue-700 hover:text-blue-900">
            View full gallery
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {IMAGE_URLS.slice(4, 12).map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Louisline bus ${index + 1}`}
              className="h-32 w-full rounded-xl object-cover md:h-40"
            />
          ))}
        </div>
      </section>
    </div>
  )
}
