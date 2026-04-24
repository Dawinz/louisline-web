import { Link } from 'react-router-dom'
import { ROUTES, locationLabelByValue } from '../data/routes'

export default function RoutesPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 to-slate-900 p-6 text-white">
        <h1 className="text-3xl font-bold">Available Routes</h1>
        <p className="mt-2 text-blue-100">
        Choose a route and continue directly to booking with pre-filled details.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ROUTES.map((route) => (
          <article key={route.id} className="soft-card rounded-2xl p-6">
            <p className="text-xs font-bold tracking-wide text-blue-700">{route.id}</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              {locationLabelByValue[route.from]} to {locationLabelByValue[route.to]}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Daily departures with easy online booking and reliable service.
            </p>
            <Link
              to={`/?from=${route.from}&to=${route.to}#book`}
              className="mt-4 inline-flex rounded-lg bg-gradient-to-r from-blue-700 to-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:from-blue-800 hover:to-cyan-700"
            >
              Book Now
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
