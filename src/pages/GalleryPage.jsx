import { IMAGE_URLS } from '../data/routes'

export default function GalleryPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-r from-[#29388d] to-[#d91d27] p-6 text-white">
        <h1 className="text-3xl font-bold">Louisline Gallery</h1>
        <p className="mt-2 text-blue-100">A look at our buses and travel moments.</p>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {IMAGE_URLS.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`Louisline travel gallery ${index + 1}`}
            className="h-40 w-full rounded-xl border border-slate-200 object-cover shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl md:h-48"
          />
        ))}
      </div>
    </section>
  )
}
