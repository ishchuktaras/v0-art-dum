import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { sanityFetch } from "@/sanity/lib/fetch"
import { PORTFOLIO_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"

export const metadata = {
  title: "Portfolio | ART DUM",
  description:
    "Podívejte se na naše realizované projekty. Fotografie před a po rekonstrukci. 23 let zkušeností ve stavebnictví.",
}

async function getPortfolioProjects() {
  try {
    const projects = await sanityFetch({
      query: PORTFOLIO_QUERY,
      tags: ["portfolio"],
    })
    return projects || []
  } catch (error) {
    console.error("Error fetching portfolio:", error)
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

  const uniqueCategories = Array.from(new Set(projects.map((p: any) => p.category).filter(Boolean)))
  const categories = ["Všechny projekty", ...uniqueCategories.map((cat: string) => categoryLabels[cat] || cat)]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary-dark text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-black mb-6">Portfolio našich prací</h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Podívejte se na ukázky našich realizovaných projektů. Fotografie před a po rekonstrukci mluví za vše.
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
                  className={category === "Všechny projekty" ? "bg-gold text-primary-dark hover:bg-gold/90" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground mb-4">Projekty budou brzy přidány do portfolia.</p>
                <Link href="/kontakt">
                  <Button className="bg-gold text-primary-dark hover:bg-gold/90">Kontaktujte nás</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project: any) => {
                  const imageUrl = project.imagesAfter?.[0]
                    ? urlFor(project.imagesAfter[0]).width(800).height(600).url()
                    : "/placeholder.svg?height=600&width=800"

                  return (
                    <Card key={project._id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="bg-gold text-primary-dark text-xs font-bold px-3 py-1 rounded-full">
                            {categoryLabels[project.category] || project.category}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">{project.shortDescription}</p>
                        <div className="flex items-center justify-between text-sm">
                          {project.location && (
                            <span className="flex items-center text-muted-foreground">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              {project.location}
                            </span>
                          )}
                          {project.year && <span className="text-muted-foreground">{project.year}</span>}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-black text-gold mb-2">150+</div>
                <p className="text-sm md:text-base font-semibold">realizovaných projektů</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-gold mb-2">23</div>
                <p className="text-sm md:text-base font-semibold">let na trhu</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-gold mb-2">100%</div>
                <p className="text-sm md:text-base font-semibold">spokojených klientů</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-gold mb-2">5★</div>
                <p className="text-sm md:text-base font-semibold">průměrné hodnocení</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-dark text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Chcete podobný projekt?</h2>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
              Kontaktujte nás a společně naplánujeme váš stavební projekt
            </p>
            <Link href="/kontakt">
              <Button size="lg" className="bg-gold text-primary-dark hover:bg-gold/90 font-bold">
                Nezávazná poptávka
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
