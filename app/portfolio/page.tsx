import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Portfolio | ART DUM",
  description:
    "Podívejte se na naše realizované projekty. Fotografie před a po rekonstrukci. 23 let zkušeností ve stavebnictví.",
}

// Placeholder data - bude později načítáno ze Sanity
const projects = [
  {
    id: 1,
    title: "Kompletní rekonstrukce bytového jádra",
    category: "Rekonstrukce",
    location: "Třebíč",
    year: "2024",
    description: "Kompletní rekonstrukce bytového jádra včetně nových rozvodů, obkladů a sanity.",
    imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Výstavba rodinného domu",
    category: "Stavba na klíč",
    location: "Jaroměřice nad Rokytnou",
    year: "2023",
    description: "Novostavba rodinného domu ze zdícího systému Porotherm.",
    imageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Zateplení fasády",
    category: "Zateplení",
    location: "Třebíč",
    year: "2024",
    description: "Kontaktní zateplovací systém ETICS s finální silikátovou omítkou.",
    imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Rekonstrukce koupelny",
    category: "Rekonstrukce",
    location: "Náměšť nad Oslavou",
    year: "2023",
    description: "Modernizace koupelny s novými obklady, podlahovým topením a sprchovým koutem.",
    imageUrl: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop",
  },
  {
    id: 5,
    title: "Přístavba garáže",
    category: "Přístavby",
    location: "Třebíč",
    year: "2024",
    description: "Přístavba dvojgaráže s automatickými vraty a propojením s domem.",
    imageUrl: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&h=600&fit=crop",
  },
  {
    id: 6,
    title: "Rekonstrukce komerčního prostoru",
    category: "Komerční prostory",
    location: "Třebíč centrum",
    year: "2023",
    description: "Přestavba obchodního prostoru na moderní kavárnu.",
    imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop",
  },
]

const categories = ["Všechny projekty", "Rekonstrukce", "Stavba na klíč", "Zateplení", "Přístavby", "Komerční prostory"]

export default function PortfolioPage() {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.imageUrl || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-gold text-primary-dark text-xs font-bold px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex items-center justify-between text-sm">
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
                      <span className="text-muted-foreground">{project.year}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
