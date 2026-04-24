import BookingForm from '../components/BookingForm'

export default function BookPage() {
  return (
    <section className="space-y-5">
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 to-slate-900 p-6 text-white">
        <h1 className="text-3xl font-bold">Book Your Journey</h1>
        <p className="mt-2 text-blue-100">
          Reserve seats instantly with the Louisline Safari Yetu booking flow.
        </p>
      </div>
      <BookingForm title="Complete your trip booking" />
    </section>
  )
}
