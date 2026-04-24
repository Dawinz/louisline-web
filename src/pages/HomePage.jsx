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
    <div className="space-y-14">
      <section className="dark-gradient relative overflow-hidden rounded-3xl p-6 text-white md:p-10">
        <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-red-300/20 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-2">
          <div className="space-y-5">
            <p className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide">
            Premium Intercity Transport
            </p>
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">
              Executive bus travel designed for comfort and confidence.
            </h1>
            <p className="text-sm text-blue-100 md:text-base">
              Louisline delivers dependable routes, modern coaches, and seamless online booking.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/routes"
                className="inline-flex rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-blue-900 hover:bg-blue-50"
              >
                Explore Routes
              </Link>
              <Link
                to="/book"
                className="inline-flex rounded-xl border border-red-300/70 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-500/20"
              >
                Start Booking
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {IMAGE_URLS.slice(0, 4).map((image, index) => (
              <img
                key={image}
                src={image}
                alt={`Louisline preview ${index + 1}`}
                className="h-36 w-full rounded-xl border border-white/20 object-cover md:h-44"
              />
            ))}
          </div>
        </div>
      </section>

      <section id="book">
        <BookingForm initialValues={prefilled} title="Search and book your bus" />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ['Safety first', 'Experienced crew, strict checks, and reliable schedules.'],
          ['Premium comfort', 'Spacious seating and smooth intercity travel experience.'],
          ['Digital booking', 'Instant Safari Yetu booking flow without long queues.'],
        ].map((feature) => (
          <article key={feature[0]} className="soft-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-slate-900">{feature[0]}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature[1]}</p>
          </article>
        ))}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Gallery Preview</h2>
          <Link to="/gallery" className="text-sm font-semibold text-[#29388d] hover:text-[#d91d27]">
            View full gallery
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {IMAGE_URLS.slice(4, 12).map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Louisline bus ${index + 1}`}
              className="h-32 w-full rounded-xl border border-slate-200 object-cover shadow-md md:h-40"
            />
          ))}
        </div>
      </section>
    </div>
  )
}
