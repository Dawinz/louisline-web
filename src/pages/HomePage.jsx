import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import BookingForm from '../components/BookingForm'
import ScrollReveal from '../components/ScrollReveal'
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
  const heroMixedImages = useMemo(
    () => [IMAGE_URLS[0], IMAGE_URLS[4], IMAGE_URLS[8], IMAGE_URLS[12]].filter(Boolean),
    [],
  )

  return (
    <div className="space-y-14">
      <section
        className="relative -mx-[calc(50vw-50%)] w-screen overflow-hidden text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(15,23,42,0.76),rgba(15,23,42,0.82)), url('${IMAGE_URLS[0]}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-red-300/20 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="relative mx-auto flex min-h-[calc(100dvh-4.75rem)] max-w-6xl flex-col justify-center px-4 py-14 md:px-6 md:py-20">
          <div className="grid gap-8 md:grid-cols-2">
            <ScrollReveal>
              <div className="space-y-5">
                <p className="inline-block rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide">
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
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div className="grid grid-cols-2 gap-3">
                {heroMixedImages.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt={`Louisline preview ${index + 1}`}
                    className="h-36 w-full rounded-xl border border-white/20 object-cover shadow-xl md:h-44"
                  />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section
        id="book"
        className="booking-emerge relative z-20 -mt-16 grid gap-4 sm:-mt-20 md:-mt-24 md:grid-cols-[250px_1fr] lg:-mt-28 lg:grid-cols-[280px_1fr]"
      >
        <ScrollReveal>
          <aside className="hidden rounded-3xl bg-gradient-to-b from-[#26118a] to-[#4b16a8] p-6 text-white shadow-2xl md:block">
            <p className="text-3xl font-extrabold">Call Now</p>
            <p className="mt-3 text-sm text-indigo-100">Need quick help with booking?</p>
            <p className="mt-6 text-4xl font-black tracking-wide">0683 300 100</p>
            <p className="mt-2 text-sm text-indigo-200">Support available daily</p>
          </aside>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <BookingForm initialValues={prefilled} title="Search and book your bus" />
        </ScrollReveal>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ['Safety first', 'Experienced crew, strict checks, and reliable schedules.'],
          ['Premium comfort', 'Spacious seating and smooth intercity travel experience.'],
          ['Digital booking', 'Instant Safari Yetu booking flow without long queues.'],
        ].map((feature, index) => (
          <ScrollReveal key={feature[0]} delay={index * 90}>
            <article className="soft-card glow-on-hover rounded-2xl p-6">
              <h3 className="text-lg font-bold text-slate-900">{feature[0]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature[1]}</p>
            </article>
          </ScrollReveal>
        ))}
      </section>

      <section>
        <ScrollReveal>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Gallery Preview</h2>
            <Link to="/gallery" className="text-sm font-semibold text-[#29388d] hover:text-[#d91d27]">
              View full gallery
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
