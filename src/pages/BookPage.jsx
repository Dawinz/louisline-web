import BookingForm from '../components/BookingForm'
import ScrollReveal from '../components/ScrollReveal'

export default function BookPage() {
  return (
    <section className="space-y-5">
      <ScrollReveal>
        <div className="rounded-3xl bg-gradient-to-r from-[#29388d] to-[#d91d27] p-6 text-white">
          <h1 className="text-3xl font-bold">Book Your Journey</h1>
          <p className="mt-2 text-blue-100">
            Reserve seats instantly with the Louisline Safari Yetu booking flow.
          </p>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <BookingForm title="Complete your trip booking" />
      </ScrollReveal>
    </section>
  )
}
