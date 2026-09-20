import { MapPin, BedDouble, Bath, Ruler } from "lucide-react";

export default function PropertyCard({ listing, onViewDetails }) {
  const { image, type, price, title, location, bedrooms, bathrooms, area } =
    listing;

  return (
    <div className="flex flex-col overflow-hidden rounded-[20px] border border-neutral-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="h-[220px] w-full overflow-hidden sm:h-[240px]">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-brand-mint px-3 py-1 text-sm font-medium text-black">
            {type}
          </span>
          <span className="text-lg font-bold text-black">{price}</span>
        </div>

        <h3 className="text-[22px] font-semibold leading-snug text-black">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-[15px] text-neutral-500">
          <MapPin size={16} className="shrink-0" />
          <span>{location}</span>
        </div>

        <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
          <div className="flex items-center gap-4 text-[15px] text-neutral-600">
            <span className="flex items-center gap-1.5">
              <BedDouble size={16} /> {bedrooms} Ch
            </span>
            <span className="flex items-center gap-1.5">
              <Bath size={15} /> {bathrooms} Sdb
            </span>
            <span className="flex items-center gap-1.5">
              <Ruler size={15} /> {area}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onViewDetails?.(listing)}
            className="rounded-[10px] bg-brand-blue px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-sky-600"
          >
            Voir détails
          </button>
        </div>
      </div>
    </div>
  );
}
