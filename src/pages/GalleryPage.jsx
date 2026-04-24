import { IMAGE_URLS } from '../data/routes'

export default function GalleryPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold text-slate-900">Louisline Gallery</h1>
      <p className="mt-2 text-slate-600">A look at our buses and travel moments.</p>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {IMAGE_URLS.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`Louisline travel gallery ${index + 1}`}
            className="h-40 w-full rounded-xl object-cover shadow-sm ring-1 ring-slate-200 md:h-48"
          />
        ))}
      </div>
    </section>
  )
}
