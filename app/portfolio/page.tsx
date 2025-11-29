import { Button } from "@/components/ui/button"
import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/fetch"
import { PORTFOLIO_QUERY } from "@/sanity/lib/queries"
import type { Metadata } from "next"
// Importujeme novou komponentu
import PortfolioFeed from "@/components/portfolio-feed"

export const metadata: Metadata = {
  title: "Portfolio | Realizované projekty | ART DUM Třebíč",
  description:
    "Fotografie našich dokončených projektů v Třebíči a okolí. Rekonstrukce bytů a domů, zateplení fasád, stavby na klíč.",
  keywords: [
    "portfolio stavby Třebíč",
    "fotografie rekonstrukcí",
    "reference ART DUM",
    "realizované projekty",
  ],
  openGraph: {
    title: "Portfolio realizovaných projektů | ART DUM",
    description: "Prohlédněte si naše dokončené stavební projekty v Třebíči a okolí.",
    url: "https://artdum.cz/portfolio",
  },
}

// Typ dat (musí sedět s tím v komponentě)
interface PortfolioProject {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  category: string
  location?: string
  year?: number
  mainImage?: {
    asset?: {
      url: string
    }
    alt?: string
  }
}

export default async function PortfolioPage() {
  // Načtení dat na serveru (pro SEO)
  const projects = await sanityFetch<PortfolioProject[]>({
    query: PORTFOLIO_QUERY,
    tags: ["portfolio"],
  }) || []

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        
        {/* Hero Section (Statická) */}
        <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 text-[#D4AF37] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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

        {/* Zde voláme interaktivní komponentu */}
        <PortfolioFeed projects={projects} />

        {/* CTA Section */}
        <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-16 overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">Chcete podobný projekt?</h2>
            <p className="text-xl mb-10 text-white/80 max-w-2xl mx-auto leading-relaxed">
              Kontaktujte nás a společně naplánujeme váš stavební projekt
            </p>
            <Link href="/kontakt">
              <Button
                size="lg"
                className="group bg-[#D4AF37] text-[#0B192F] hover:bg-[#D4AF37]/90 font-bold text-lg px-8 py-6 h-auto shadow-2xl shadow-[#D4AF37]/20 hover:scale-105 transition-all"
              >
                <span>Nezávazná poptávka</span>
                <svg
                  className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}