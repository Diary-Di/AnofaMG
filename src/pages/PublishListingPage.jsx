import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, BedDouble, Bath, UploadCloud, X } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PROPERTY_TYPES = ["Appartement", "Maison", "Studio", "Loft", "Duplex"];
const CONTRACT_TYPES = ["Location", "Vente"];

function StepBadge({ number }) {
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-blue text-base font-bold text-white">
      {number}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="px-1 text-sm font-medium text-neutral-500">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClasses =
  "w-full rounded-[10px] border border-neutral-300 bg-white px-5 py-4 text-base text-black placeholder:text-neutral-400 focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue";

export default function PublishListingPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "",
    propertyType: PROPERTY_TYPES[0],
    contractType: CONTRACT_TYPES[0],
    description: "",
    address: "",
    city: "",
    district: "",
    price: "",
    surface: "",
    bedrooms: "",
    bathrooms: "",
  });
  const [photos, setPhotos] = useState([]);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleFiles(e) {
    const files = Array.from(e.target.files || []).slice(0, 6 - photos.length);
    const withPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPhotos((p) => [...p, ...withPreviews]);
  }

  function removePhoto(index) {
    setPhotos((p) => p.filter((_, i) => i !== index));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => navigate("/recherche"), 1400);
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <section className="flex flex-col items-center gap-3 bg-brand-mint px-6 py-12 text-center sm:px-10">
        <h1 className="text-3xl font-bold text-black sm:text-4xl">
          Publiez votre annonce
        </h1>
        <p className="max-w-[680px] text-base text-neutral-700 sm:text-lg">
          Vendez ou louez votre bien immobilier rapidement en touchant des
          milliers de locataires et acheteurs potentiels.
        </p>
      </section>

      <main className="flex flex-col items-center px-4 py-12 sm:px-6">
        {submitted ? (
          <div className="flex w-full max-w-[700px] flex-col items-center gap-3 rounded-[20px] border border-neutral-100 bg-white p-12 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-black">
              Annonce publiée !
            </h2>
            <p className="text-neutral-600">
              Votre annonce a bien été enregistrée. Redirection vers les
              résultats de recherche...
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-[960px] flex-col gap-6"
          >
            {/* Step 1 */}
            <div className="flex flex-col gap-6 rounded-[16px] border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <StepBadge number={1} />
                <h2 className="text-2xl font-bold text-black">
                  Informations de base
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field label="Titre de l'annonce">
                    <input
                      required
                      className={inputClasses}
                      placeholder="Ex: Bel appartement T3 au coeur de Paris"
                      value={form.title}
                      onChange={update("title")}
                    />
                  </Field>
                </div>

                <Field label="Type de bien">
                  <select
                    className={inputClasses}
                    value={form.propertyType}
                    onChange={update("propertyType")}
                  >
                    {PROPERTY_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Type de contrat">
                  <select
                    className={inputClasses}
                    value={form.contractType}
                    onChange={update("contractType")}
                  >
                    {CONTRACT_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Description">
                    <textarea
                      rows={5}
                      className={`${inputClasses} resize-none`}
                      placeholder="Décrivez votre bien en détail..."
                      value={form.description}
                      onChange={update("description")}
                    />
                  </Field>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col gap-6 rounded-[16px] border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <StepBadge number={2} />
                <h2 className="text-2xl font-bold text-black">
                  Localisation
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="relative sm:col-span-2">
                  <Field label="Adresse complète">
                    <div className="relative">
                      <Search
                        size={20}
                        className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400"
                      />
                      <input
                        required
                        className={`${inputClasses} pl-12`}
                        placeholder="Entrez l'adresse du bien"
                        value={form.address}
                        onChange={update("address")}
                      />
                    </div>
                  </Field>
                </div>

                <Field label="Ville">
                  <input
                    required
                    className={inputClasses}
                    placeholder="Ex: Paris"
                    value={form.city}
                    onChange={update("city")}
                  />
                </Field>

                <Field label="Quartier">
                  <input
                    className={inputClasses}
                    placeholder="Ex: 8ème Arrondissement"
                    value={form.district}
                    onChange={update("district")}
                  />
                </Field>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col gap-6 rounded-[16px] border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <StepBadge number={3} />
                <h2 className="text-2xl font-bold text-black">
                  Prix et caractéristiques
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field label="Prix (€ / mois)">
                  <input
                    required
                    type="number"
                    min="0"
                    className={inputClasses}
                    placeholder="0.00"
                    value={form.price}
                    onChange={update("price")}
                  />
                </Field>

                <Field label="Surface (m²)">
                  <input
                    required
                    type="number"
                    min="0"
                    className={inputClasses}
                    placeholder="0"
                    value={form.surface}
                    onChange={update("surface")}
                  />
                </Field>

                <Field label="Chambres">
                  <div className="relative">
                    <BedDouble
                      size={20}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                    <input
                      type="number"
                      min="0"
                      className={`${inputClasses} pl-11`}
                      placeholder="0"
                      value={form.bedrooms}
                      onChange={update("bedrooms")}
                    />
                  </div>
                </Field>

                <Field label="Salles de bain">
                  <div className="relative">
                    <Bath
                      size={20}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    />
                    <input
                      type="number"
                      min="0"
                      className={`${inputClasses} pl-11`}
                      placeholder="0"
                      value={form.bathrooms}
                      onChange={update("bathrooms")}
                    />
                  </div>
                </Field>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col gap-5 rounded-[16px] border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <StepBadge number={4} />
                <h2 className="text-2xl font-bold text-black">
                  Photos du bien
                </h2>
              </div>

              <label
                htmlFor="photo-upload"
                className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-[15px] border-2 border-dashed border-neutral-300 bg-neutral-50 py-10 text-center transition-colors hover:border-brand-blue"
              >
                <div className="flex size-16 items-center justify-center rounded-full bg-brand-mint">
                  <UploadCloud size={28} className="text-black" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-black">
                    Cliquez pour télécharger ou glissez-déposez
                  </p>
                  <p className="text-sm text-neutral-500">
                    PNG, JPG (max. 10MB par photo)
                  </p>
                </div>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/png,image/jpeg"
                  multiple
                  className="hidden"
                  onChange={handleFiles}
                />
              </label>

              {photos.length > 0 && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {photos.map((photo, i) => (
                    <div
                      key={photo.url}
                      className="group relative h-[120px] overflow-hidden rounded-[10px] bg-neutral-200"
                    >
                      <img
                        src={photo.url}
                        alt={`Photo ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        aria-label="Retirer la photo"
                        className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="w-full rounded-[10px] bg-brand-blue px-4 py-4 text-base font-bold text-white transition-colors hover:bg-sky-600 sm:w-[240px]"
              >
                Publier l'annonce
              </button>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
