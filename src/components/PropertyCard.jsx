import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, MapPin, BedDouble, Bath } from "lucide-react";

export default function PropertyCard({ listing, onViewDetails }) {
  const { images = [listing.image], type, price, title, location, bedrooms, bathrooms } =
    listing;
  const [activeImage, setActiveImage] = useState(0);
  const hasCarousel = images.length > 1;

  useEffect(() => {
    if (!hasCarousel) return undefined;

    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [hasCarousel, images.length]);

  function showImage(direction) {
    setActiveImage((current) =>
      (current + direction + images.length) % images.length,
    );
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-[14px] border border-neutral-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="group relative h-[190px] w-full overflow-hidden bg-neutral-100 sm:h-[210px]">
        <div
          className="flex h-full will-change-transform"
          style={{
            width: `${images.length * 100}%`,
            transform: `translate3d(-${activeImage * (100 / images.length)}%, 0, 0)`,
            transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {images.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="h-full shrink-0"
              style={{ width: `${100 / images.length}%` }}
            >
              <img
                src={image}
                alt={`${title}, image ${index + 1}`}
                className="h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
        {hasCarousel && (
          <>
            <button
              type="button"
              aria-label="Image précédente"
              onClick={() => showImage(-1)}
              className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white opacity-0 transition-opacity hover:bg-black/75 group-hover:opacity-100 focus:opacity-100"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="Image suivante"
              onClick={() => showImage(1)}
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white opacity-0 transition-opacity hover:bg-black/75 group-hover:opacity-100 focus:opacity-100"
            >
              <ArrowRight size={16} />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/45 px-2 py-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Afficher l'image ${index + 1}`}
                  onClick={() => setActiveImage(index)}
                  className={`h-1.5 rounded-full transition-all ${activeImage === index ? "w-4 bg-white" : "w-1.5 bg-white/60"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-brand-mint px-2.5 py-1 text-xs font-medium text-black">
            {type}
          </span>
          <span className="text-base font-bold text-black">{price}</span>
        </div>

        <h3 className="text-xl font-semibold leading-snug text-black">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-[15px] text-neutral-500">
          <MapPin size={16} className="shrink-0" />
          <span>{location}</span>
        </div>

        <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
          <div className="flex items-center gap-3 text-sm text-neutral-600">
            <span className="flex items-center gap-1.5">
              <BedDouble size={16} /> {bedrooms} Ch
            </span>
            <span className="flex items-center gap-1.5">
              <Bath size={15} /> {bathrooms} Sdb
            </span>
          </div>
          <button
            type="button"
            onClick={() => onViewDetails?.(listing)}
            className="rounded-[8px] bg-brand-blue px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-sky-600"
          >
            Voir détails
          </button>
        </div>
      </div>
    </div>
  );
}
