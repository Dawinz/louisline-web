import BookingForm from '../components/BookingForm'

export default function BookPage() {
  return (
    <section>
      <h1 className="mb-4 text-3xl font-bold text-slate-900">Book Your Journey</h1>
      <BookingForm title="Complete your trip booking" />
    </section>
  )
}
