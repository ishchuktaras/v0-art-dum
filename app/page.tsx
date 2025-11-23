import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { sanityFetch } from "@/sanity/lib/fetch"
import { HOMEPAGE_QUERY, SERVICES_QUERY, FEATURED_PORTFOLIO_QUERY } from "@/sanity/lib/queries"
import { urlFor, urlForHeroImage } from "@/sanity/lib/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Oleh Kulish, OSVČ - ART DUM | Stavební firma Třebíč | 23 let zkušeností | Rekonstrukce a stavby na klíč",
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
    "Oleh Kulish",
    "ART DUM",
  ],
  authors: [{ name: "Oleh Kulish, OSVČ - ART DUM", url: "https://artdum.cz" }],
  openGraph: {
    title: "Oleh Kulish, OSVČ - ART DUM | Stavební firma Třebíč | 23 let zkušeností",
    description:
      "Profesionální stavební služby v Třebíči a okolí. Rekonstrukce, stavby na klíč a opravy. Férová cena a kvalita.",
    url: "https://artdum.cz",
    siteName: "Oleh Kulish, OSVČ - ART DUM",
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: "https://artdum.cz/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Oleh Kulish, OSVČ - ART DUM | Stavební firma Třebíč",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oleh Kulish, OSVČ - ART DUM | Stavební firma Třebíč",
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

  const featuredPortfolio = await sanityFetch<any[]>({
    query: FEATURED_PORTFOLIO_QUERY,
    tags: ["portfolio"],
  })

  // Use fallback data if Sanity data is not available
  const heroHeading = homepage?.heroHeading || "Profesionální stavební práce v Třebíči a okolí"
  const heroSubheading =
    homepage?.heroSubheading ||
    "23 let zkušeností, stovky spokojených klientů. Specializujeme se na rekonstrukce bytů, domů a zateplení fasád."
  const ctaText = homepage?.ctaButtonText || "Nezávazná poptávka"
  const yearsExperience = homepage?.statYearsExperience || 23

  const heroBackgroundImage = featuredPortfolio?.[0]?.mainImage ? urlForHeroImage(featuredPortfolio[0].mainImage) : null

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: "Oleh Kulish, OSVČ - ART DUM",
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
        closes: "18:00",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-20 md:py-32 overflow-hidden">
          {/* Background image with overlay */}
          {heroBackgroundImage && (
            <div className="absolute inset-0">
              <Image
                src={heroBackgroundImage || "/placeholder.svg"}
                alt="ART DUM stavební práce"
                fill
                className="object-cover"
                priority
                quality={75}
                sizes="100vw"
              />
              {/* Multi-layer gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0b192f]/95 via-[#0f2342]/90 to-[#0b192f]/95" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b192f]/90 via-transparent to-[#0b192f]/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-fade-in">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
                <span>Profesionální stavební řešení od roku 2001</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                Profesionální stavební práce v Třebíči a okolí
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/80 leading-relaxed">{heroSubheading}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/kontakt">
                  <Button
                    size="lg"
                    className="group w-full sm:w-auto bg-gold text-primary-dark hover:bg-gold/90 font-bold text-lg px-8 py-6 h-auto shadow-2xl shadow-gold/20 hover:scale-105 transition-all"
                  >
                    <span>{ctaText}</span>
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-white/20 text-white hover:bg-white hover:text-navy bg-white/5 backdrop-blur-sm font-semibold text-lg px-8 py-6 h-auto hover:scale-105 transition-all"
                  >
                    Naše práce
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* USP Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">Proč zvolit ART DUM</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Naše hodnoty a přístup k práci</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="group relative bg-card p-8 rounded-2xl border-2 border-border hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-8 h-8 text-white dark:text-navy"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 text-center group-hover:text-accent transition-colors">
                    Férová cena
                  </h3>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    Transparentní kalkulace bez skrytých poplatků
                  </p>
                </div>
              </div>

              <div className="group relative bg-card p-8 rounded-2xl border-2 border-border hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-8 h-8 text-white dark:text-navy"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 text-center group-hover:text-accent transition-colors">
                    Rychlost
                  </h3>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    Dodržování termínů a efektivní realizace
                  </p>
                </div>
              </div>

              <div className="group relative bg-card p-8 rounded-2xl border-2 border-border hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-8 h-8 text-white dark:text-navy"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 text-center group-hover:text-accent transition-colors">
                    Kvalita
                  </h3>
                  <p className="text-muted-foreground text-center leading-relaxed">Precizní práce a dlouhá záruka</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">Naše služby</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Komplexní stavební služby pro vaše projekty
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {services && services.length > 0 ? (
                services.slice(0, 6).map((service: any) => (
                  <div
                    key={service._id}
                    className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow bg-card"
                  >
                    {service.image && (
                      <img
                        src={
                          urlFor(service.image)?.width(400).height(250).url() ||
                          "/placeholder.svg" ||
                          "/placeholder.svg"
                        }
                        alt={service.image.alt || service.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-xl font-bold mb-3 text-card-foreground">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.shortDescription}</p>
                    {service.price && <p className="text-accent font-semibold mb-3">{service.price}</p>}
                    <Link href="/sluzby" className="text-accent font-semibold hover:underline">
                      Zjistit více →
                    </Link>
                  </div>
                ))
              ) : (
                <div className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow bg-card">
                  <h3 className="text-xl font-bold mb-3 text-card-foreground">Rekonstrukce</h3>
                  <p className="text-muted-foreground mb-4">Kompletní rekonstrukce bytů, domů a komerčních prostor</p>
                  <Link href="/sluzby" className="text-accent font-semibold hover:underline">
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
        <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight">
              Máte projekt? Kontaktujte nás!
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white/80 max-w-2xl mx-auto leading-relaxed">
              Rádi vám připravíme cenovou nabídku na míru
            </p>
            <Link href="/kontakt">
              <Button
                size="lg"
                className="group bg-gold text-primary-dark hover:bg-gold/90 font-bold text-lg px-8 py-6 h-auto shadow-2xl shadow-gold/20 hover:scale-105 transition-all"
              >
                <span>{ctaText}</span>
                <svg
                  className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
