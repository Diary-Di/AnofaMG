import { MapPin, BedDouble, Bath } from "lucide-react";

export default function PropertyCard({ listing, onViewDetails }) {
  const { image, type, price, title, location, bedrooms, bathrooms } =
    listing;

  return (
    <div className="flex flex-col overflow-hidden rounded-[14px] border border-neutral-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="h-[190px] w-full overflow-hidden sm:h-[210px]">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
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
