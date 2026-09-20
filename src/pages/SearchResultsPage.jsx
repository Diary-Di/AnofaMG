import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import { listings as allListings } from "../data/listings";

const PROPERTY_TYPES = ["Tous les types", "Appartement", "Maison", "Studio", "Loft", "Duplex"];
const BEDROOM_OPTIONS = [1, 2, 3, 4];
const AMENITIES = ["Parking", "Terrasse / Balcon", "Ascenseur", "Meublé"];
const SORT_OPTIONS = ["Plus récents", "Prix croissant", "Prix décroissant"];

function priceToNumber(price) {
  return Number(price.replace(/[^\d]/g, ""));
}

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();

  const [locationQuery, setLocationQuery] = useState(
    searchParams.get("lieu") || ""
  );
  const [propertyType, setPropertyType] = useState(PROPERTY_TYPES[0]);
  const [minBudget, setMinBudget] = useState(searchParams.get("min") || "");
  const [maxBudget, setMaxBudget] = useState(searchParams.get("max") || "");
  const [minBedrooms, setMinBedrooms] = useState(null);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);

  const filtered = useMemo(() => {
    let results = allListings.filter((listing) => {
      const matchesLocation = locationQuery
        ? listing.location.toLowerCase().includes(locationQuery.toLowerCase())
        : true;
      const matchesType =
        propertyType === "Tous les types" || listing.type === propertyType;
      const price = priceToNumber(listing.price);
      const matchesMin = minBudget ? price >= Number(minBudget) : true;
      const matchesMax = maxBudget ? price <= Number(maxBudget) : true;
      const matchesBedrooms = minBedrooms
        ? listing.bedrooms >= minBedrooms
        : true;
      return (
        matchesLocation &&
        matchesType &&
        matchesMin &&
        matchesMax &&
        matchesBedrooms
      );
    });

    if (sortBy === "Prix croissant") {
      results = [...results].sort(
        (a, b) => priceToNumber(a.price) - priceToNumber(b.price)
      );
    } else if (sortBy === "Prix décroissant") {
      results = [...results].sort(
        (a, b) => priceToNumber(b.price) - priceToNumber(a.price)
      );
    }

    return results;
  }, [locationQuery, propertyType, minBudget, maxBudget, minBedrooms, sortBy]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex flex-1 flex-col bg-neutral-50 lg:flex-row">
        {/* Filters sidebar */}
        <aside className="flex w-full flex-col gap-6 border-b border-neutral-200 bg-white p-6 sm:p-8 lg:w-[320px] lg:border-b-0 lg:border-r">
          <h2 className="text-xl font-bold text-black">Filtres avancés</h2>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-neutral-700">
                Localisation
              </label>
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Ville ou quartier"
                className="w-full rounded-[10px] border border-neutral-300 px-4 py-3 text-base placeholder:text-neutral-400 focus:border-brand-blue focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-neutral-700">
                Type de bien
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full rounded-[10px] border border-neutral-300 px-4 py-3 text-base focus:border-brand-blue focus:outline-none"
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-neutral-700">
                Budget (€ / mois)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  value={minBudget}
                  onChange={(e) => setMinBudget(e.target.value)}
                  placeholder="Min"
                  className="w-full rounded-[10px] border border-neutral-300 px-3 py-3 text-base placeholder:text-neutral-400 focus:border-brand-blue focus:outline-none"
                />
                <span className="text-neutral-300">-</span>
                <input
                  type="number"
                  min="0"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                  placeholder="Max"
                  className="w-full rounded-[10px] border border-neutral-300 px-3 py-3 text-base placeholder:text-neutral-400 focus:border-brand-blue focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-neutral-700">
                Chambres
              </label>
              <div className="flex gap-2">
                {BEDROOM_OPTIONS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() =>
                      setMinBedrooms((current) => (current === n ? null : n))
                    }
                    className={`flex-1 rounded-lg border px-2 py-2 text-sm font-medium transition-colors ${minBedrooms === n
                        ? "border-brand-blue bg-brand-mint font-bold text-brand-blue"
                        : "border-neutral-300 bg-white text-black hover:border-neutral-400"
                      }`}
                  >
                    {n}+
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-neutral-100 pt-4">
              <label className="text-sm font-semibold text-neutral-700">
                Équipements
              </label>
              <div className="flex flex-col gap-2">
                {AMENITIES.map((amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center gap-2.5 text-sm text-neutral-600"
                  >
                    <input
                      type="checkbox"
                      className="size-[18px] rounded-[3px] border-neutral-400 text-brand-blue focus:ring-brand-blue"
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-100 pt-4">
            <button
              type="button"
              className="w-full rounded-[10px] bg-brand-blue py-3 text-sm font-bold text-white transition-colors hover:bg-sky-600"
            >
              Rechercher
            </button>
          </div>
        </aside>

        {/* Results */}
        <section className="flex flex-1 flex-col gap-6 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-black">
                {filtered.length} résultat{filtered.length !== 1 ? "s" : ""}
                {locationQuery ? ` pour "${locationQuery}"` : ""}
              </h1>
              <Search size={24} className="text-neutral-400" />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-neutral-500">Trier par:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-md border-none bg-transparent text-base font-semibold text-black focus:outline-none"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-[20px] border border-dashed border-neutral-200 py-24 text-center">
              <p className="text-lg font-semibold text-black">
                Aucun bien ne correspond à ces critères
              </p>
              <p className="text-neutral-500">
                Essayez d'élargir votre recherche ou vos filtres.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {filtered.map((listing) => (
                <PropertyCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
