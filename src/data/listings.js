import apartmentLiving from "../assets/images/apartment-living.svg";
import houseGarden from "../assets/images/house-garden.svg";
import loftIndustrial from "../assets/images/loft-industrial.svg";
import studioParis from "../assets/images/studio-paris.svg";
import villaAlpes from "../assets/images/villa-alpes.svg";
import duplexLille from "../assets/images/duplex-lille.svg";

export const listings = [
  {
    id: "appartement-moderne-centre-ville",
    image: apartmentLiving,
    type: "Appartement",
    price: "1 250 Ar / mois",
    title: "Appartement Moderne - Centre Ville",
    location: "Paris, 8ème Arrondissement",
    bedrooms: 3,
    bathrooms: 2,
    area: "85 m²",
    featured: true,
  },
  {
    id: "maison-familiale-avec-jardin",
    image: houseGarden,
    type: "Maison",
    price: "2 100 Ar / mois",
    title: "Maison Familiale avec Jardin",
    location: "Bordeaux, Quartier Chartrons",
    bedrooms: 4,
    bathrooms: 3,
    area: "140 m²",
    featured: true,
  },
  {
    id: "loft-industriel-renove",
    image: loftIndustrial,
    type: "Loft",
    price: "1 850 Ar / mois",
    title: "Loft Industriel Rénové",
    location: "Lyon, 2ème Arrondissement",
    bedrooms: 2,
    bathrooms: 1,
    area: "110 m²",
    featured: true,
  },
  {
    id: "studio-chic-quartier-latin",
    image: studioParis,
    type: "Studio",
    price: "950 Ar / mois",
    title: "Studio Chic - Quartier Latin",
    location: "Paris, 5ème Arrondissement",
    bedrooms: 1,
    bathrooms: 1,
    area: "35 m²",
  },
  {
    id: "villa-panoramique-alpes",
    image: villaAlpes,
    type: "Maison",
    price: "3 500 Ar / mois",
    title: "Villa Panoramique - Alpes",
    location: "Annecy, Haute-Savoie",
    bedrooms: 5,
    bathrooms: 3,
    area: "220 m²",
  },
  {
    id: "duplex-contemporain-lille",
    image: duplexLille,
    type: "Duplex",
    price: "1 600 Ar / mois",
    title: "Duplex Contemporain - Lille",
    location: "Lille, Centre",
    bedrooms: 2,
    bathrooms: 1,
    area: "95 m²",
  },
];

export const featuredListings = listings.filter((l) => l.featured);
