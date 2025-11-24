import type { Metadata } from "next"
import Link from "next/link"
import { Star, ExternalLink, Send, Eye, Shield, CheckCircle2, Award, TrendingUp } from "lucide-react"
import { sanityFetch } from "@/sanity/lib/fetch"
import { REVIEWS_QUERY } from "@/sanity/lib/queries"
import { Button } from "@/components/ui/button"
import { ReviewsCarousel } from "@/components/reviews-carousel"

export const metadata: Metadata = {
  title: "Hodnocení a recenze | Reference spokojených zákazníků | ART DUM",
  description:
    "Přečtěte si hodnocení a recenze spokojených klientů stavební firmy ART DUM z Třebíče. Reference z Firmy.cz, Google. 5★ průměrné hodnocení. 100% spokojených zákazníků.",
  keywords: [
    "hodnocení ART DUM",
    "recenze stavební firma",
    "reference Třebíče",
    "Firmy.cz hodnocení",
    "spokojení zákazníci",
  ],
  openGraph: {
    title: "Hodnocení a recenze | ART DUM",
    description: "5★ průměrné hodnocení od našich spokojených klientů z Třebíče a okolí.",
    url: "https://artdum.cz/hodnoceni",
    images: [
      {
        url: "https://artdum.cz/og-image-main.jpg",
        width: 1200,
        height: 630,
        alt: "ART DUM - Hodnocení a recenze",
      },
    ],
    siteName: "ART DUM",
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hodnocení a recenze | ART DUM",
    description: "5★ průměrné hodnocení od našich spokojených klientů z Třebíče a okolí.",
    images: ["https://artdum.cz/og-image-main.jpg"],
  },
  alternates: {
    canonical: "https://artdum.cz/hodnoceni",
  },
}

interface Review {
  _id: string
  customerName: string
  rating: number
  reviewText: string
  location?: string
  date: string
  source?: string
}

export default async function HodnoceniPage() {
  const reviews = await sanityFetch<Review[]>({ query: REVIEWS_QUERY })

  const averageRating =
    reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 5

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ART DUM",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating.toFixed(1),
      reviewCount: reviews.length || 1,
      bestRating: "5",
      worstRating: "1",
    },
    ...(reviews.length > 0 && {
      review: reviews.slice(0, 10).map((review) => ({
        "@type": "Review",
        author: {
          "@type": "Person",
          name: review.customerName,
        },
        datePublished: review.date,
        reviewBody: review.reviewText,
        reviewRating: {
          "@type": "Rating",
          ratingValue: review.rating,
          bestRating: "5",
          worstRating: "1",
        },
      })),
    }),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
              <Star className="w-4 h-4 fill-gold" />
              <span>100% spokojených zákazníků</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Co říkají naši <span className="text-gold">zákazníci</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              Přečtěte si, jak hodnotí naše služby klienti z celého kraje Vysočina
            </p>

            <div className="flex items-center justify-center gap-6 text-xl flex-wrap">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-8 h-8 transition-all duration-300 hover:scale-110 ${
                      i < Math.round(averageRating) ? "fill-gold text-gold animate-pulse" : "text-white/30"
                    }`}
                  />
                ))}
              </div>
              <p className="text-3xl font-black text-gold">{averageRating.toFixed(1)}</p>
              <p className="text-white/70">({reviews.length > 0 ? reviews.length : "Nová"} hodnocení)</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Verifikace Firmy.cz */}
              <div className="bg-gradient-to-br from-gold/10 to-gold/5 border-2 border-gold/20 rounded-2xl p-6 hover:scale-105 transition-transform duration-300 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gold/20 p-3 rounded-xl">
                    <Shield className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-xl font-bold">Ověřená firma</h3>
                </div>
                <p className="text-muted-foreground mb-4">Jsme oficiálně ověřeni na platformě Firmy.cz</p>
                <div className="flex items-center gap-2 text-sm text-gold font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Firmy.cz Verified</span>
                </div>
              </div>

              {/* Průměrné hodnocení */}
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-2xl p-6 hover:scale-105 transition-transform duration-300 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/20 p-3 rounded-xl">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Výborné hodnocení</h3>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-4xl font-black text-primary">{averageRating.toFixed(1)}</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(averageRating) ? "fill-primary text-primary" : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  z {reviews.length > 0 ? reviews.length : "prvních"} recenzí
                </p>
              </div>

              {/* Spokojenost zákazníků */}
              <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-2 border-green-500/20 rounded-2xl p-6 hover:scale-105 transition-transform duration-300 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500/20 p-3 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold">100% spokojenost</h3>
                </div>
                <p className="text-muted-foreground mb-2">Všichni naši klienti jsou spokojeni s našimi službami</p>
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>100% Doporučení</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Co říkají naši <span className="text-primary">zákazníci</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Přečtěte si skutečné recenze od klientů, kteří si vybrali ART DUM pro své stavební projekty
                </p>
              </div>
              <ReviewsCarousel reviews={reviews} />
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <ExternalLink className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Naše hodnocení na Firmy.cz</h2>
                  <p className="text-sm text-muted-foreground">Nezávislá platforma s ověřenými recenzemi</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Hodnotící tlačítko Firmy.cz */}
                <div className="flex justify-center py-4">
                  <a
                    href="https://www.firmy.cz/detail/13918492-oleh-kulish-osvc-art-dum-trebic.html#pridat-hodnoceni"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-block transition-transform hover:scale-110 duration-300"
                  >
                    <img
                      width="249"
                      height="60"
                      src="https://www.firmy.cz/img/widgets/firmy-ohodnotte-nas-tmave.svg"
                      alt='Oleh Kulish, OSVČ - "ART DUM" na Firmy.cz'
                      className="h-auto dark:hidden"
                    />
                    <img
                      width="249"
                      height="60"
                      src="https://www.firmy.cz/img/widgets/firmy-ohodnotte-nas-svetle.svg"
                      alt='Oleh Kulish, OSVČ - "ART DUM" na Firmy.cz'
                      className="h-auto hidden dark:block"
                    />
                  </a>
                </div>

                {/* Iframe s hodnoceními Firmy.cz */}
                <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border-2 border-border shadow-lg">
                  <div className="relative w-full" style={{ paddingBottom: "65.625%" }}>
                    <iframe
                      src="https://www.firmy.cz/detail/13918492-oleh-kulish-osvc-art-dum-trebic.html?widget&limit=3"
                      style={{ border: "none" }}
                      frameBorder="0"
                      className="absolute top-0 left-0 w-full h-full"
                      title="Hodnocení z Firmy.cz"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Odkaz na kompletní profil */}
                <div className="text-center">
                  <a
                    href="https://www.firmy.cz/detail/13918492-oleh-kulish-osvc-art-dum-trebic.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline font-medium transition-all hover:gap-3"
                  >
                    Zobrazit náš kompletní profil na Firmy.cz
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
              Staňte se naším dalším spokojeným zákazníkem
            </h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              Přidejte se k desítkám spokojených klientů, kteří nám důvěřují se svými stavebními projekty
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt">
                <Button
                  size="lg"
                  className="group w-full sm:w-auto bg-gold text-primary-dark hover:bg-gold/90 font-bold text-lg px-8 py-6 h-auto shadow-2xl shadow-gold/20 hover:scale-105 transition-all"
                >
                  <Send className="mr-2 h-5 w-5" />
                  <span>Nezávazná poptávka</span>
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white/20 text-white hover:bg-white hover:text-navy bg-white/5 backdrop-blur-sm font-semibold text-lg px-8 py-6 h-auto hover:scale-105 transition-all"
                >
                  <Eye className="mr-2 h-5 w-5" />
                  <span>Prohlédnout portfolio</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
