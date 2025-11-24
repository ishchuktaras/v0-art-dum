import { sanityFetch } from "@/sanity/lib/fetch"
import { SERVICES_QUERY, FEATURED_PORTFOLIO_QUERY } from "@/sanity/lib/queries"
import ServicesPageClient from "./page"
import { urlForHeroImage } from "@/sanity/lib/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Služby | Rekonstrukce, stavby na klíč, opravy | Oleh Kulish, OSVČ - ART DUM | Třebíč",
  description:
    "Komplexní stavební služby v Třebíči a okolí: rekonstrukce bytů a domů, stavby na klíč, zateplení fasád, malování, elektroinstalace. Profesionální realizace s 23 lety zkušeností.",
  openGraph: {
    title: "Služby | Oleh Kulish, OSVČ - ART DUM",
    description: "Komplexní stavební služby v Třebíči a okolí.",
    url: "https://artdum.cz/sluzby",
    siteName: "Oleh Kulish, OSVČ - ART DUM",
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: "https://artdum.cz/og-image-main.jpg",
        width: 1200,
        height: 630,
        alt: "Stavební služby - Oleh Kulish, OSVČ - ART DUM | Třebíč",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Služby | Oleh Kulish, OSVČ - ART DUM",
    description: "Komplexní stavební služby v Třebíči a okolí.",
    images: ["https://artdum.cz/og-image-main.jpg"],
  },
}

const fallbackServices = [
  {
    title: "Zednické a stavební práce",
    shortDescription:
      "Kompletní zednické služby od oklepání staré omítky až po finální úpravy. Pracujeme s ekologickými materiály KEIM a dekorativními stěrkami renomovaných evropských značek.",
    features: [
      "Oklepání a odstranění staré omítky",
      "Ruční omítky (sádrová, jádrová, Rotband)",
      "Ekologické omítky KEIM",
      "Dekorativní stěrky",
      "Stěrkování a příprava povrchů",
      "Malování interiérů a exteriérů",
      "Montáž elektroinstalace",
      "Montáž sanitárních rozvodů včetně kanalizace",
    ],
    price: "Dle domluvy",
    icon: "hammer",
  },
  {
    title: "Podlahy",
    shortDescription:
      "Kompletní pokládka všech typů podlah včetně montáže podlahového topení a přípravy podkladu. Od samonivelačních podlah až po keramiku a dřevo.",
    features: [
      "Montáž podlahového topení",
      "Betonový potěr pro podlahové topení",
      "Samonivelační podlahy",
      "Laminátová podlaha",
      "Vinylová podlaha",
      "Keramická dlažba",
      "Dřevěná podlaha",
      "Linoleová podlaha",
    ],
    price: "Od 500 Kč/m²",
    icon: "square",
  },
  // ... existing fallback services ...
]

export default async function ServicesPageWrapper() {
  const sanityServices = await sanityFetch<any[]>({
    query: SERVICES_QUERY,
    tags: ["service"],
  })

  const featuredPortfolio = await sanityFetch<any[]>({
    query: FEATURED_PORTFOLIO_QUERY,
    tags: ["portfolio"],
  })

  const services = sanityServices && sanityServices.length > 0 ? sanityServices : fallbackServices

  const heroBackgroundImage = featuredPortfolio?.[1]?.mainImage ? urlForHeroImage(featuredPortfolio[1].mainImage) : null

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.shortDescription,
        provider: {
          "@type": "GeneralContractor",
          name: "ART DUM",
          telephone: "+420774335592",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Třebíč",
            addressCountry: "CZ",
          },
        },
      },
    })),
  }

  return <ServicesPageClient services={services} heroBackgroundImage={heroBackgroundImage} jsonLd={jsonLd} />
}
