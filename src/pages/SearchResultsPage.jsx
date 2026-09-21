import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LoaderCircle, Search } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import { getAnnonces } from "../api/annonces";

const PROPERTY_TYPES = ["Tous les types", "Appartement", "Maison", "Studio", "Loft", "Duplex"];
const BEDROOM_OPTIONS = [1, 2, 3, 4];
const SORT_OPTIONS = ["Ordre par défaut", "Prix croissant", "Prix décroissant"];
const MIN_LOADING_TIME = 900;

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();

  const [provinceQuery, setProvinceQuery] = useState(
    searchParams.get("lieu") || ""
  );
  const [neighborhoodQuery, setNeighborhoodQuery] = useState(
    searchParams.get("quartier") || ""
  );
  const [propertyType, setPropertyType] = useState(PROPERTY_TYPES[0]);
  const [minBudget, setMinBudget] = useState(searchParams.get("min") || "");
  const [maxBudget, setMaxBudget] = useState(searchParams.get("max") || "");
  const [minBedrooms, setMinBedrooms] = useState(null);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const startedAt = Date.now();

    function finishLoading() {
      const remainingTime = Math.max(
        0,
        MIN_LOADING_TIME - (Date.now() - startedAt),
      );

      window.setTimeout(() => {
        if (!controller.signal.aborted) setLoading(false);
      }, remainingTime);
    }

    getAnnonces(controller.signal)
      .then(setAllListings)
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setError(requestError.message);
      })
      .finally(finishLoading);

    return () => controller.abort();
  }, []);

  const filtered = useMemo(() => {
    const hasActiveFilters = Boolean(
      provinceQuery ||
      neighborhoodQuery ||
      propertyType !== PROPERTY_TYPES[0] ||
      minBudget ||
      maxBudget ||
      minBedrooms,
    );

    let results = hasActiveFilters
      ? allListings.filter((listing) => {
        const matchesProvince = provinceQuery
          ? listing.city.toLowerCase().includes(provinceQuery.toLowerCase())
          : true;
        const matchesNeighborhood = neighborhoodQuery
          ? listing.address.toLowerCase().includes(neighborhoodQuery.toLowerCase())
          : true;
        const matchesType =
          propertyType === "Tous les types" || listing.type === propertyType;
        const price = listing.priceValue;
        const matchesMin = minBudget ? price >= Number(minBudget) : true;
        const matchesMax = maxBudget ? price <= Number(maxBudget) : true;
        const matchesBedrooms = minBedrooms
          ? listing.bedrooms >= minBedrooms
          : true;
        return (
          matchesProvince &&
          matchesNeighborhood &&
          matchesType &&
          matchesMin &&
          matchesMax &&
          matchesBedrooms
        );
      })
      : [...allListings];

    if (sortBy === "Prix croissant") {
      results = [...results].sort(
        (a, b) => a.priceValue - b.priceValue
      );
    } else if (sortBy === "Prix décroissant") {
      results = [...results].sort(
        (a, b) => b.priceValue - a.priceValue
      );
    }

    return results;
  }, [allListings, provinceQuery, neighborhoodQuery, propertyType, minBudget, maxBudget, minBedrooms, sortBy]);

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
                Province / ville
              </label>
              <input
                type="text"
                value={provinceQuery}
                onChange={(e) => setProvinceQuery(e.target.value)}
                placeholder="Ex. Antananarivo"
                className="w-full rounded-[10px] border border-neutral-300 px-4 py-3 text-base placeholder:text-neutral-400 focus:border-brand-blue focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-neutral-700">
                Quartier / adresse
              </label>
              <input
                type="text"
                value={neighborhoodQuery}
                onChange={(e) => setNeighborhoodQuery(e.target.value)}
                placeholder="Ex. Rue test, quartier"
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
                Budget (Ar / mois)
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

          </div>
        </aside>

        {/* Results */}
        <section className="flex flex-1 flex-col gap-6 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-black">
                {loading
                  ? "Toutes les annonces"
                  : `${filtered.length} résultat${filtered.length !== 1 ? "s" : ""}`}
                {!loading && (provinceQuery || neighborhoodQuery)
                  ? ` pour "${[provinceQuery, neighborhoodQuery].filter(Boolean).join(", ")}"`
                  : ""}
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

          {loading ? (
            <div className="flex flex-col gap-6" aria-label="Chargement des annonces">
              <div className="flex items-center gap-3 text-sm text-neutral-500">
                <LoaderCircle size={18} className="animate-spin text-brand-blue" />
                <span>Chargement des annonces...</span>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[1, 2, 3, 4].map((placeholder) => (
                  <div key={placeholder} className="animate-pulse overflow-hidden rounded-[14px] border border-neutral-100 bg-white">
                    <div className="h-[190px] bg-neutral-200 sm:h-[210px]" />
                    <div className="space-y-4 p-5">
                      <div className="h-4 w-1/3 rounded bg-neutral-200" />
                      <div className="h-6 w-3/4 rounded bg-neutral-200" />
                      <div className="h-4 w-full rounded bg-neutral-100" />
                      <div className="h-8 w-full rounded bg-neutral-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="rounded-[20px] border border-red-200 bg-red-50 py-12 text-center text-red-700">
              Impossible de charger les annonces : {error}
            </div>
          ) : filtered.length === 0 ? (
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
