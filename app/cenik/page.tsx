import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"
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
    url: "https://artdum.cz/cenik",
  },
  alternates: {
    canonical: "https://artdum.cz/cenik",
  },
}

// Type pro cenové údaje z Sanity
type PricingItem = {
  service: string
  price: string
  note?: string
  unit?: string
}

type PricingCategory = {
  _id: string
  category: string
  slug: { current: string }
  description: string
  items: PricingItem[]
  order: number
}

const pricingCategories = [
  {
    category: "Rekonstrukce bytů",
    description: "Orientační ceny za kompletní rekonstrukci bytů",
    items: [
      { service: "Rekonstrukce 1+kk (30-40 m²)", price: "od 300 000 Kč", note: "včetně materiálu" },
      { service: "Rekonstrukce 2+kk (50-60 m²)", price: "od 450 000 Kč", note: "včetně materiálu" },
      { service: "Rekonstrukce 3+1 (70-80 m²)", price: "od 600 000 Kč", note: "včetně materiálu" },
      { service: "Částečná rekonstrukce", price: "dle rozsahu", note: "ocenění na míru" },
    ],
  },
  {
    category: "Zednické práce",
    description: "Ceny základních zednických prací",
    items: [
      { service: "Vnitřní omítka stěn", price: "od 250 Kč/m²", note: "včetně materiálu" },
      { service: "Vnější omítka fasády", price: "od 350 Kč/m²", note: "včetně materiálu" },
      { service: "Zdění z cihel POROTHERM", price: "od 800 Kč/m²", note: "včetně materiálu" },
      { service: "Betonáž základové desky", price: "od 1 200 Kč/m²", note: "včetně výztuže" },
      { service: "Bourání příček", price: "od 150 Kč/m²", note: "včetně odvoz" },
    ],
  },
  {
    category: "Zateplení fasád",
    description: "Kompletní zateplovací systémy ETICS",
    items: [
      { service: "Zateplení polystyrenem 15 cm", price: "od 1 200 Kč/m²", note: "komplet s omítkou" },
      { service: "Zateplení minerální vatou 16 cm", price: "od 1 400 Kč/m²", note: "komplet s omítkou" },
      { service: "Zateplení soklu XPS", price: "od 800 Kč/m²", note: "včetně izolace" },
      { service: "Lešení", price: "od 80 Kč/m²/měsíc", note: "pronájem" },
    ],
  },
  {
    category: "Obklady a dlažby",
    description: "Pokládka obkladů a dlažeb",
    items: [
      { service: "Obklady koupelny", price: "od 450 Kč/m²", note: "práce + lepidlo" },
      { service: "Dlažba do koupelny", price: "od 400 Kč/m²", note: "práce + lepidlo" },
      { service: "Velkoplošná dlažba (60x60 cm+)", price: "od 550 Kč/m²", note: "práce + lepidlo" },
      { service: "Terasa venkovní dlažba", price: "od 600 Kč/m²", note: "včetně podkladu" },
    ],
  },
  {
    category: "Střechy",
    description: "Střešní konstrukce a krytiny",
    items: [
      { service: "Výstavba krovu", price: "od 4 000 Kč/m²", note: "včetně materiálu" },
      { service: "Pálená taška - krytina", price: "od 1 200 Kč/m²", note: "včetně pokládky" },
      { service: "Pozinkovaný plech - krytina", price: "od 800 Kč/m²", note: "včetně pokládky" },
      { service: "Klempířské práce", price: "od 500 Kč/m", note: "žlaby, oplechování" },
    ],
  },
  {
    category: "Ostatní služby",
    description: "Další stavební práce",
    items: [
      { service: "SDK příčka", price: "od 600 Kč/m²", note: "včetně izolace" },
      { service: "SDK podhled", price: "od 550 Kč/m²", note: "včetně konstrukce" },
      { service: "Malování stěn", price: "od 120 Kč/m²", note: "2x krytí" },
      { service: "Podlahové lišty", price: "od 80 Kč/m", note: "montáž" },
    ],
  },
]

export default async function PricingPage() {
  let categories: PricingCategory[] | typeof pricingCategories = pricingCategories

  try {
    const sanityData = await client.fetch<PricingCategory[]>(PRICING_QUERY)
    if (sanityData && sanityData.length > 0) {
      categories = sanityData
    }
  } catch (error) {
    console.error("Error fetching pricing data from Sanity:", error)
  }

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

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Férová cena bez skrytých poplatků</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">Orientační ceník</h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
              Transparentní kalkulace našich služeb. Konečná cena vždy závisí na rozsahu prací a použitých materiálech.
            </p>
          </div>
        </div>
      </section>

      {/* Info Box */}
      <section className="py-8 bg-gold/10 border-y border-gold/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-foreground">
              <strong className="text-gold">Důležité:</strong> Uvedené ceny jsou orientační a slouží pro základní
              představu. Přesnou cenovou nabídku vždy zpracujeme po osobní konzultaci a prohlídce místa realizace.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="overflow-hidden border-2 border-border hover:border-accent/30 transition-colors"
              >
                <CardHeader className="bg-muted/50">
                  <CardTitle className="text-2xl md:text-3xl text-navy dark:text-white">{category.category}</CardTitle>
                  <CardDescription className="text-base">{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {category.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-border last:border-0 last:pb-0"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{item.service}</p>
                          {item.note && <p className="text-sm text-muted-foreground">{item.note}</p>}
                        </div>
                        <div className="text-lg font-bold text-accent whitespace-nowrap">{item.price}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Co je zahrnuto v našich cenách?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-border">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-accent-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <CardTitle className="text-xl">Zahrnuto v ceně</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      Odborná práce kvalifikovaných řemeslníků
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      Standardní materiál (tam kde je uvedeno)
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      Doprava a dovoz materiálu
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      Čištění staveniště
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">•</span>
                      Záruka na provedené práce
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-border">
                <CardHeader>
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <CardTitle className="text-xl">Nad rámec ceníku</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-muted-foreground mr-2">•</span>
                      Projektová dokumentace
                    </li>
                    <li className="flex items-start">
                      <span className="text-muted-foreground mr-2">•</span>
                      Stavební povolení a kolaudace
                    </li>
                    <li className="flex items-start">
                      <span className="text-muted-foreground mr-2">•</span>
                      Premium materiály (na přání)
                    </li>
                    <li className="flex items-start">
                      <span className="text-muted-foreground mr-2">•</span>
                      Likvidace stavebního odpadu
                    </li>
                    <li className="flex items-start">
                      <span className="text-muted-foreground mr-2">•</span>
                      Mimořádné práce mimo pracovní dobu
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">Chcete přesnou cenovou nabídku?</h2>
          <p className="text-xl mb-10 text-white/80 max-w-2xl mx-auto leading-relaxed">
            Kontaktujte nás a během 24 hodin vám připravíme nezávaznou kalkulaci na míru
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt">
              <Button
                size="lg"
                className="group bg-gold text-navy hover:bg-gold/90 font-bold text-lg px-8 py-6 h-auto shadow-2xl shadow-gold/20 hover:scale-105 transition-all"
              >
                <span>Nezávazná poptávka</span>
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
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </Button>
            </Link>
            <a href="tel:+420774335592">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white hover:text-navy bg-white/5 backdrop-blur-sm font-semibold text-lg px-8 py-6 h-auto hover:scale-105 transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +420 774 335 592
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
