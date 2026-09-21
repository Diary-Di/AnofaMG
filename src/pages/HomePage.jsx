import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import { getAnnonces } from "../api/annonces";
import heroVilla from "../assets/images/hero-villa.svg";

export default function HomePage() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [featuredListings, setFeaturedListings] = useState([]);
  const [loadingListings, setLoadingListings] = useState(true);
  const [listingsError, setListingsError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    getAnnonces(controller.signal)
      .then((listings) => setFeaturedListings(listings.slice(0, 3)))
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setListingsError(requestError.message);
      })
      .finally(() => setLoadingListings(false));

    return () => controller.abort();
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("lieu", location);
    if (minBudget) params.set("min", minBudget);
    if (maxBudget) params.set("max", maxBudget);
    navigate(`/recherche?${params.toString()}`);
  }

  function handleViewDetails(listing) {
    navigate(`/recherche?lieu=${encodeURIComponent(listing.location)}`);
  }

  function handleViewAll() {
    navigate("/recherche");
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      {/* Hero */}
      <section className="relative flex min-h-[440px] items-center justify-center overflow-hidden px-4 py-16 sm:min-h-[500px] sm:py-20">
        <img
          src={heroVilla}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 flex w-full max-w-[920px] flex-col items-center gap-5 text-center">
          <h1 className="text-3xl font-bold leading-tight text-white drop-shadow-sm sm:text-5xl lg:text-[50px] lg:leading-[60px]">
            Trouvez la maison de vos rêves
          </h1>
          <p className="max-w-[680px] text-base text-white/90 sm:text-lg lg:text-xl">
            Explorez les meilleures annonces immobilières adaptées à votre
            style de vie et à votre budget.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-3 flex w-full flex-col gap-3 rounded-[12px] bg-white p-4 shadow-2xl sm:flex-row sm:items-center"
          >
            <div className="flex flex-1 flex-col gap-1 text-left">
              <label htmlFor="location" className="px-2 text-center text-sm text-neutral-500 sm:text-left">
                Localisation
              </label>
              <div className="flex items-center gap-2 px-2">
                <Search size={20} className="shrink-0 text-neutral-400" />
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Où voulez-vous habiter ?"
                  className="w-full bg-transparent text-base text-black placeholder:text-neutral-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="hidden h-12 w-px bg-neutral-200 sm:block" />

            <div className="flex flex-1 flex-col gap-1 text-left">
              <label className="px-2 text-center text-sm text-neutral-500 sm:text-left">
                Budget (Min - Max, Ar)
              </label>
              <div className="flex items-center gap-4 px-2">
                <input
                  type="number"
                  value={minBudget}
                  onChange={(e) => setMinBudget(e.target.value)}
                  placeholder="Min"
                  className="w-full bg-transparent text-base text-black placeholder:text-neutral-400 focus:outline-none"
                />
                <span className="text-neutral-300">-</span>
                <input
                  type="number"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                  placeholder="Max"
                  className="w-full bg-transparent text-base text-black placeholder:text-neutral-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="hidden h-12 w-px bg-neutral-200 sm:block" />

            <button
              type="submit"
              className="rounded-[8px] bg-brand-blue px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-sky-600"
            >
              Rechercher
            </button>
          </form>
        </div>
      </section>

      {/* Publier une annonce banner */}
      <section className="flex flex-col items-start justify-between gap-5 bg-brand-mint px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:px-20">
        <div className="flex max-w-[600px] flex-col gap-3">
          <h2 className="text-2xl font-bold text-black sm:text-3xl">
            Vous avez un bien à louer ?
          </h2>
          <p className="text-base text-neutral-700">
            Publiez votre annonce gratuitement sur anofamg et touchez des
            milliers de locataires potentiels dès aujourd'hui.
          </p>
        </div>
        <Link
          to="/publier"
          className="shrink-0 rounded-[8px] bg-black px-7 py-3 text-base font-semibold text-brand-mint transition-colors hover:bg-neutral-800"
        >
          Publier une annonce
        </Link>
      </section>

      {/* Featured properties */}
      <section className="flex flex-col gap-8 px-6 py-12 sm:px-10 lg:px-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-black/60">
              Nos recommandations
            </p>
            <h2 className="text-2xl font-bold text-black sm:text-3xl">
              Propriétés en vedette
            </h2>
          </div>
          <button
            type="button"
            onClick={handleViewAll}
            className="border-b-2 border-black pb-1 text-base font-semibold text-black"
          >
            Voir tout
          </button>
        </div>

        {loadingListings ? (
          <p className="text-neutral-500">Chargement des annonces...</p>
        ) : listingsError ? (
          <p className="text-red-700">Impossible de charger les annonces : {listingsError}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredListings.map((listing) => (
              <PropertyCard
                key={listing.id}
                listing={listing}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
