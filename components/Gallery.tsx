import { site } from '@/lib/site';

// Shows only once photos are listed in site.photos.gallery.
export default function Gallery() {
  const pics = site.photos.gallery;
  if (pics.length === 0) return null;
  return (
    <section className="wrap pt-24">
      <p data-reveal className="eyebrow">In store</p>
      <h2 data-reveal className="h-section mt-2">Take a look inside</h2>
      <ul className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[240px] sm:gap-4 lg:grid-cols-4">
        {pics.slice(0, 7).map((p, i) => (
          <li
            key={p.src}
            data-reveal
            style={{ ['--d' as string]: `${(i % 4) * 70}ms` }}
            className={`group overflow-hidden rounded-[24px] bg-paper-warm ${i === 0 ? 'col-span-2 row-span-2' : ''} ${i === 3 ? 'lg:col-span-2' : ''}`}
          >
            <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </li>
        ))}
      </ul>
    </section>
  );
}
