import { Link } from 'react-router-dom'
import { ROUTES, locationLabelByValue } from '../data/routes'

export default function RoutesPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold text-slate-900">Available Routes</h1>
      <p className="mt-2 text-slate-600">
        Choose a route and continue directly to booking with pre-filled details.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ROUTES.map((route) => (
          <article key={route.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-xs font-semibold tracking-wide text-blue-700">{route.id}</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              {locationLabelByValue[route.from]} to {locationLabelByValue[route.to]}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Daily departures with easy online booking and reliable service.
            </p>
            <Link
              to={`/?from=${route.from}&to=${route.to}#book`}
              className="mt-4 inline-flex rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Book Now
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
