import type { Metadata } from "next"
import Link from "next/link"
import { Star, Building2, ExternalLink, Send, Eye } from 'lucide-react'
import { sanityFetch } from "@/sanity/lib/fetch"
import { REVIEWS_QUERY } from "@/sanity/lib/queries"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Hodnocení a recenze | Reference spokojených zákazníků | ART DUM",
  description:
    "Přečtěte si hodnocení a recenze spokojených klientů stavební firmy ART DUM z Třebíče. Reference z Firmy.cz, Google. 5★ průměrné hodnocení. 100% spokojených zákazníků.",
  keywords: [
    "hodnocení ART DUM",
    "recenze stavební firma",
    "reference Třebíč",
    "Firmy.cz hodnocení",
    "spokojení zákazníci",
  ],
  openGraph: {
    title: "Hodnocení a recenze | ART DUM",
    description: "5★ průměrné hodnocení od našich spokojených klientů z Třebíče a okolí.",
    url: "https://artdum.cz/hodnoceni",
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
    reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ART DUM",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: "5",
      worstRating: "1",
    },
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
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6">
              Co říkají naši <span className="text-primary">zákazníci</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Přečtěte si, jak hodnotí naše služby klienti z celého kraje Vysočina
            </p>
            {reviews.length > 0 && (
              <div className="flex items-center justify-center gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < Math.round(averageRating) ? "fill-primary text-primary" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-lg font-semibold">{averageRating.toFixed(1)} / 5.0</p>
                <p className="text-muted-foreground">({reviews.length} hodnocení)</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Firmy.cz Widget Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <ExternalLink className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Naše hodnocení na Firmy.cz</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Jsme hrdí na naše hodnocení na platformě Firmy.cz. Níže můžete vidět nezávislá hodnocení od našich
                zákazníků.
              </p>

              {/* Firmy.cz Widget Placeholder */}
              <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-12 text-center">
                <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-semibold mb-2">Widget Firmy.cz se zobrazí zde</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Vložte iframe kód widgetu z vašeho profilu na Firmy.cz
                </p>
                <a
                  href="https://www.firmy.cz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  Zobrazit náš profil na Firmy.cz
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Reviews from Sanity */}
      {reviews.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Další reference</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-card border border-border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    {review.source && (
                      <span className="text-xs text-muted-foreground">
                        {review.source === "firmy-cz"
                          ? "Firmy.cz"
                          : review.source === "google"
                            ? "Google"
                            : "Přímá reference"}
                      </span>
                    )}
                  </div>
                  <p className="text-foreground mb-4 line-clamp-4">"{review.reviewText}"</p>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-semibold">{review.customerName}</p>
                      {review.location && <p className="text-muted-foreground">{review.location}</p>}
                    </div>
                    <p className="text-muted-foreground">{new Date(review.date).toLocaleDateString("cs-CZ")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Staňte se naším dalším spokojeným zákazníkem</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Přidejte se k desítkám spokojených klientů, kteří nám důvěřují se svými stavebními projekty
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt">
                <Button size="lg" className="w-full sm:w-auto">
                  <Send className="mr-2 h-5 w-5" />
                  Nezávazná poptávka
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  <Eye className="mr-2 h-5 w-5" />
                  Prohlédnout portfolio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
