import type { Metadata } from "next"
import PricingPageClient from "./PricingPageClient"
import { client } from "@/sanity/lib/client"
import { PRICING_QUERY } from "@/sanity/lib/queries"

export const metadata: Metadata = {
  title: "Ceník stavebních prací | Orientační ceny | ART DUM Třebíč",
  description:
    "Orientační ceník stavebních služeb v Třebíči. Rekonstrukce, zateplení, zednické práce. Férová kalkulace bez skrytých poplatků. ☎ +420 774 335 592",
  keywords: ["ceník stavební práce Třebíč", "cena rekonstrukce bytu", "cena zateplení domu", "stavební práce ceny"],
  openGraph: {
    title: "Ceník stavebních prací | ART DUM",
    description: "Transparentní ceník našich služeb. Férová kalkulace bez skrytých poplatků.",
    url: "https://artdum.cz/Ceník",
  },
  alternates: {
    canonical: "https://artdum.cz/Ceník",
  },
}

export default async function PricingPage() {
  let categories = []

  try {
    const sanityData = await client.fetch<any[]>(PRICING_QUERY)
    if (sanityData && sanityData.length > 0) {
      categories = sanityData
    }
  } catch (error) {
    console.error("Error fetching pricing data from Sanity:", error)
  }

  const featuredPortfolio = await client.fetch<any[]>(
    `*[_type == "portfolio" && isFeatured == true] | order(order asc) [0...6] {
      _id,
      "mainImage": images[0]{
        asset->{
          _id,
          url
        }
      }
    }`,
  )

  const heroBackgroundImage = featuredPortfolio?.[2]?.mainImage?.asset?.url

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PriceSpecification",
    name: "Ceník stavebních prací ART DUM",
    description: "Orientační ceník stavebních služeb v Třebíči a okolí",
    priceCurrency: "CZK",
    provider: {
      "@type": "GeneralContractor",
      name: "ART DUM",
      telephone: "+420774335592",
    },
  }

  return <PricingPageClient categories={categories} heroBackgroundImage={heroBackgroundImage} />
}
