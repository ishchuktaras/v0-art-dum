import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { sanityFetch } from "@/sanity/lib/fetch"
import { PORTFOLIO_QUERY, FEATURED_PORTFOLIO_QUERY } from "@/sanity/lib/queries"
import type { Metadata } from "next"

interface PortfolioProject {
  _id: string
  title: string
  slug: {
    current: string
  }
  shortDescription: string
  category: string
  location?: string
  year?: number
  mainImage?: {
    asset?: {
      _id: string
      url: string
    }
    alt?: string
  }
}

export const metadata: Metadata = {
  title: "Portfolio | Realizované projekty | ART DUM Třebíč",
  description:
    "Fotografie našich dokončených projektů v Třebíči a okolí. Rekonstrukce bytů a domů, zateplení fasád, stavby na klíč. 23 let zkušeností.",
  keywords: [
    "portfolio stavby Třebíč",
    "fotografie rekonstrukcí",
    "reference ART DUM",
    "realizované projekty",
    "před a po rekonstrukci",
  ],
  openGraph: {
    title: "Portfolio realizovaných projektů | ART DUM",
    description: "Prohlédněte si naše dokončené stavební projekty v Třebíči a okolí.",
    url: "https://artdum.cz/portfolio",
  },
  alternates: {
    canonical: "https://artdum.cz/portfolio",
  },
}

async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const projects = await sanityFetch<PortfolioProject[]>({
      query: PORTFOLIO_QUERY,
      tags: ["portfolio"],
    })
    return projects || []
  } catch (error) {
    console.error("Error fetching portfolio:", error)
    return []
  }
}

async function getFeaturedPortfolio() {
  try {
    const featured = await sanityFetch<any[]>({
      query: FEATURED_PORTFOLIO_QUERY,
      tags: ["portfolio"],
    })
    return featured || []
  } catch (error) {
    console.error("Error fetching featured portfolio:", error)
    return []
  }
}

const categoryLabels: Record<string, string> = {
  "rekonstrukce-bytu": "Rekonstrukce bytu",
  "rekonstrukce-domu": "Rekonstrukce domu",
  koupelna: "Koupelna",
  kuchyn: "Kuchyň",
  novostavba: "Novostavba",
  zatepleni: "Zateplení",
  strecha: "Střecha",
  ostatni: "Ostatní",
}

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects()
  const featuredPortfolio = await getFeaturedPortfolio()
  const heroBackgroundImage = featuredPortfolio?.[5]?.mainImage?.asset?.url

  const uniqueCategories = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))
  const categories = ["Všechny projekty", ...uniqueCategories.map((cat) => categoryLabels[cat] || cat)]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Portfolio stavebních prací ART DUM",
    description: "Realizované stavební projekty v Třebíči a okolí",
    provider: {
      "@type": "GeneralContractor",
      name: "ART DUM",
      url: "https://artdum.cz",
    },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-16 md:py-24 overflow-hidden">
          {heroBackgroundImage && (
            <div className="absolute inset-0">
              <img
                src={heroBackgroundImage || "/placeholder.svg"}
                alt="Portfolio ART DUM"
                className="w-full h-full object-cover scale-110"
              />
              {/* Multi-layer gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0b192f]/95 via-[#0f2342]/90 to-[#0b192f]/95" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b192f]/90 via-transparent to-[#0b192f]/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>23 let zkušeností</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">Naše realizace</h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
                Jsme hrdí na každý dokončený projekt. Každá stavba je pro nás výzvou a reference našeho řemeslného umu.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 border-b bg-muted">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "Všechny projekty" ? "default" : "outline"}
                  className={
                    category === "Všechny projekty"
                      ? "bg-gold text-primary-dark hover:bg-gold/90 shadow-md shadow-gold/20"
                      : "hover:border-gold/50"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground mb-4">Projekty budou brzy přidány do portfolia.</p>
                <Link href="/kontakt">
                  <Button className="bg-gold text-primary-dark hover:bg-gold/90 shadow-lg shadow-gold/20">
                    Kontaktujte nás
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => {
                  const imageUrl = project.mainImage?.asset?.url || "/placeholder.svg?height=600&width=800"

                  return (
                    <Link key={project._id} href={`/portfolio/${project.slug?.current}`}>
                      <Card className="overflow-hidden hover:shadow-2xl hover:shadow-gold/10 transition-all duration-300 group cursor-pointer border-2 border-gray-100 hover:border-gold/30">
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={imageUrl || "/placeholder.svg"}
                            alt={project.mainImage?.alt || project.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute top-4 right-4">
                            <span className="bg-gold text-primary-dark text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                              {categoryLabels[project.category] || project.category}
                            </span>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.shortDescription}</p>
                          <div className="flex items-center justify-between text-sm">
                            {project.location && (
                              <span className="flex items-center text-muted-foreground">
                                <svg
                                  className="w-4 h-4 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                                {project.location}
                              </span>
                            )}
                            {project.year && <span className="font-semibold text-gold">{project.year}</span>}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-16 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">Chcete podobný projekt?</h2>
            <p className="text-xl mb-10 text-white/80 max-w-2xl mx-auto leading-relaxed">
              Kontaktujte nás a společně naplánujeme váš stavební projekt
            </p>
            <Link href="/kontakt">
              <Button
                size="lg"
                className="group bg-gold text-primary-dark hover:bg-gold/90 font-bold text-lg px-8 py-6 h-auto shadow-2xl shadow-gold/20 hover:scale-105 transition-all"
              >
                <span>Nezávazná poptávka</span>
                <svg
                  className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
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
