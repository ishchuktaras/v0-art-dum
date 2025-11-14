import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/fetch"
import { HOMEPAGE_QUERY, SERVICES_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ART DUM - Stavební firma Třebíč | 23 let zkušeností | Rekonstrukce a stavby na klíč",
  description:
    "Profesionální stavební služby v Třebíči a okolí. Rekonstrukce bytů a domů, stavby na klíč, zateplení, opravy. 23 let zkušeností. Férová cena, kvalita, rychlost. ☎ +420 774 335 592",
  keywords: [
    "stavební firma Třebíč",
    "rekonstrukce Třebíč",
    "stavba na klíč Třebíč",
    "zateplení Třebíč",
    "zednické práce Třebíč",
    "stavební práce Vysočina",
    "rekonstrukce bytů",
    "opravy domů",
    "ART DUM",
  ],
  authors: [{ name: "ART DUM", url: "https://artdum.cz" }],
  openGraph: {
    title: "ART DUM - Stavební firma Třebíč | 23 let zkušeností",
    description:
      "Profesionální stavební služby v Třebíči a okolí. Rekonstrukce, stavby na klíč, zateplení. Férová cena a kvalita.",
    url: "https://artdum.cz",
    siteName: "ART DUM",
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: "https://artdum.cz/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ART DUM - Stavební firma Třebíč",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ART DUM - Stavební firma Třebíč",
    description: "23 let zkušeností ve stavebnictví. Rekonstrukce, stavby na klíč, opravy.",
  },
  alternates: {
    canonical: "https://artdum.cz",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default async function HomePage() {
  // Fetch homepage and services data from Sanity
  const homepage = await sanityFetch<any>({
    query: HOMEPAGE_QUERY,
    tags: ["homepage"],
  })

  const services = await sanityFetch<any[]>({
    query: SERVICES_QUERY,
    tags: ["service"],
  })

  // Use fallback data if Sanity data is not available
  const heroHeading = homepage?.heroHeading || "Profesionální stavební práce s 23 lety zkušeností"
  const heroSubheading =
    homepage?.heroSubheading ||
    "Rekonstrukce, stavby na klíč a opravy v regionu Třebíč a okolí. Kvalita, rychlost a férová cena."
  const ctaText = homepage?.ctaButtonText || "Nezávazná poptávka"
  const yearsExperience = homepage?.statYearsExperience || 23

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: "ART DUM",
    image: "https://artdum.cz/logo.png",
    "@id": "https://artdum.cz",
    url: "https://artdum.cz",
    telephone: "+420774335592",
    email: "firma@artdum.cz",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Karlovo nám 44/33",
      addressLocality: "Třebíč",
      postalCode: "674 01",
      addressCountry: "CZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 49.2151,
      longitude: 15.8819,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
    sameAs: ["https://www.facebook.com/artdum"],
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 49.2151,
        longitude: 15.8819,
      },
      geoRadius: "50000",
    },
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "47",
    },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary-dark text-primary-foreground py-12 sm:py-16 md:py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 leading-tight">
                {heroHeading.split("23 lety zkušeností")[0]}
                <span className="text-gold">{yearsExperience} lety zkušeností</span>
                {heroHeading.split("23 lety zkušeností")[1]}
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-muted-foreground leading-relaxed">
                {heroSubheading}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link href="/kontakt" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-gold text-primary-dark hover:bg-gold/90 font-bold">
                    {ctaText}
                  </Button>
                </Link>
                <Link href="/portfolio" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-gold text-gold hover:bg-gold/10 bg-transparent"
                  >
                    Naše práce
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* USP Section */}
        <section className="py-12 md:py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Férová cena</h3>
                <p className="text-muted-foreground">Transparentní kalkulace bez skrytých poplatků</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Rychlost</h3>
                <p className="text-muted-foreground">Dodržování termínů a efektivní realizace</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Kvalita</h3>
                <p className="text-muted-foreground">Precizní práce a dlouhá záruka</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Naše služby</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Komplexní stavební služby pro vaše projekty
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {services && services.length > 0 ? (
                services.slice(0, 6).map((service: any) => (
                  <div key={service._id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                    {service.image && (
                      <img
                        src={urlFor(service.image).width(400).height(250).url() || "/placeholder.svg"}
                        alt={service.image.alt || service.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.shortDescription}</p>
                    {service.price && <p className="text-gold font-semibold mb-3">{service.price}</p>}
                    <Link href="/sluzby" className="text-gold font-semibold hover:underline">
                      Zjistit více →
                    </Link>
                  </div>
                ))
              ) : (
                <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-3">Rekonstrukce</h3>
                  <p className="text-muted-foreground mb-4">Kompletní rekonstrukce bytů, domů a komerčních prostor</p>
                  <Link href="/sluzby" className="text-gold font-semibold hover:underline">
                    Zjistit více →
                  </Link>
                </div>
              )}
            </div>

            <div className="text-center mt-6 md:mt-8">
              <Link href="/sluzby">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  Zobrazit všechny služby
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-primary-dark text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Máte projekt? Kontaktujte nás!</h2>
            <p className="text-base md:text-lg mb-6 md:mb-8 text-muted-foreground max-w-2xl mx-auto px-4">
              Rádi vám připravíme cenovou nabídku na míru
            </p>
            <Link href="/kontakt">
              <Button size="lg" className="w-full sm:w-auto bg-gold text-primary-dark hover:bg-gold/90 font-bold">
                {ctaText}
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
