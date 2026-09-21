import apartmentLiving from "../assets/images/apartment-living.svg";
import houseGarden from "../assets/images/house-garden.svg";
import loftIndustrial from "../assets/images/loft-industrial.svg";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://my-asus.tail1da18b.ts.net/api";
const fallbackImages = [apartmentLiving, houseGarden, loftIndustrial];

async function request(path, options) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            ...options?.headers,
        },
    });

    if (!response.ok) {
        let message = `Erreur ${response.status}`;
        try {
            const body = await response.json();
            message = body.message || body.error || message;
        } catch {
            // The backend may return an empty error response.
        }
        throw new Error(message);
    }

    return response.status === 204 ? null : response.json();
}

export function normalizeAnnonce(annonce, index = 0) {
    const city = annonce.ville?.designation || "Ville inconnue";
    const address = annonce.adresse || "Adresse non renseignée";

    return {
        id: annonce.numId,
        image: annonce.images?.[0] || fallbackImages[index % fallbackImages.length],
        images: annonce.images?.length
            ? annonce.images
            : [fallbackImages[index % fallbackImages.length]],
        type: annonce.typeBatiment || "Bien immobilier",
        price: annonce.prix != null ? `${annonce.prix.toLocaleString("fr-FR")} Ar / mois` : "Prix non renseigné",
        priceValue: annonce.prix || 0,
        title: annonce.titre || "Annonce sans titre",
        location: `${city}, ${address}`,
        bedrooms: annonce.chambre ?? 0,
        bathrooms: annonce.salleDeBain ?? 0,
        city,
        address,
        raw: annonce,
    };
}

export async function getAnnonces(signal) {
    const annonces = await request("/annonces", { signal });
    return annonces.map(normalizeAnnonce);
}

export function getVilles(signal) {
    return request("/villes", { signal });
}

export async function createAnnonce(form, images = []) {
    return request("/annonces", {
        method: "POST",
        body: JSON.stringify({
            titre: form.title,
            typeBatiment: form.propertyType,
            ville: {
                boitePostal: form.postalCode,
                designation: form.city,
            },
            adresse: form.address,
            contact: form.contact,
            prix: Number(form.price),
            chambre: Number(form.bedrooms || 0),
            salleDeBain: Number(form.bathrooms || 0),
            images,
        }),
    });
}
