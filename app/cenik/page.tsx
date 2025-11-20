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
    category: "Zednické a stavební práce",
    description: "Kompletní zednické služby včetně práce s ekologickými materiály KEIM a dekorativními stěrkami",
    items: [
      { service: "Oklepání a odstranění staré omítky", price: "od 150 Kč/m²", note: "ruční práce" },
      { service: "Sádrová omítka", price: "od 200 Kč/m²", note: "včetně materiálu" },
      { service: "Jádrová omítka", price: "od 250 Kč/m²", note: "včetně materiálu" },
      { service: "Rotband omítka", price: "od 220 Kč/m²", note: "včetně materiálu" },
      { service: "Ekologické omítky KEIM", price: "od 400 Kč/m²", note: "prémiové ekologické materiály" },
      { service: "Dekorativní stěrky", price: "od 350 Kč/m²", note: "renomované evropské značky" },
      { service: "Stěrkování a příprava povrchů", price: "od 180 Kč/m²" },
      { service: "Malování interiérů", price: "od 120 Kč/m²", note: "2x krytí" },
      { service: "Malování exteriérů", price: "od 150 Kč/m²" },
      { service: "Montáž elektroinstalace", price: "dle rozsahu", note: "kompletní elektroinstalace" },
      { service: "Sanitární rozvody včetně kanalizace", price: "dle domluvy" },
    ],
  },
  {
    category: "Podlahy",
    description: "Kompletní pokládka všech typů podlah včetně podlahového topení",
    items: [
      { service: "Montáž podlahového topení", price: "od 800 Kč/m²", note: "včetně materiálu" },
      { service: "Betonový potěr pro podlahové topení", price: "od 350 Kč/m²" },
      { service: "Samonivelační podlahy", price: "od 200 Kč/m²" },
      { service: "Laminátová podlaha", price: "od 300 Kč/m²", note: "práce + podložka" },
      { service: "Vinylová podlaha", price: "od 350 Kč/m²", note: "práce + podložka" },
      { service: "Keramická dlažba", price: "od 450 Kč/m²", note: "práce + lepidlo" },
      { service: "Dřevěná podlaha", price: "od 600 Kč/m²", note: "masivní dřevo" },
      { service: "Linoleová podlaha", price: "od 280 Kč/m²" },
    ],
  },
  {
    category: "Stropy",
    description: "Montáž SDK konstrukcí a omítky stropů",
    items: [
      { service: "Sádrokartonové konstrukce", price: "od 550 Kč/m²", note: "včetně konstrukce" },
      { service: "Omítka stropu - sádrová", price: "od 200 Kč/m²" },
      { service: "Omítka stropu - jádrová", price: "od 250 Kč/m²" },
      { service: "Dekorativní omítka stropu", price: "od 350 Kč/m²" },
    ],
  },
  {
    category: "Montážní práce",
    description: "Komplexní montáž dveří, oken, parapetů a elektroinstalací",
    items: [
      { service: "Montáž dveří", price: "od 1 500 Kč/kus", note: "včetně zárubně" },
      { service: "Montáž oken", price: "od 1 200 Kč/kus", note: "plastová okna" },
      { service: "Parapety PVC", price: "od 400 Kč/m" },
      { service: "Parapety dřevěné", price: "od 800 Kč/m" },
      { service: "Parapety kamenné", price: "od 1 500 Kč/m" },
      { service: "Parapety MDF", price: "od 600 Kč/m" },
      { service: "Parapety hliníkové", price: "od 700 Kč/m" },
      { service: "Kompletní elektroinstalace", price: "dle rozsahu", note: "kalkulace na míru" },
    ],
  },
  {
    category: "Zemní práce",
    description: "Výkopy, pokládka dlažby, montáž obrubníků a plotů",
    items: [
      { service: "Výkopy pro drenáž - ručně", price: "od 800 Kč/m³" },
      { service: "Výkopy pro drenáž - mechanizací", price: "od 500 Kč/m³" },
      { service: "Montáž obrubníků", price: "od 300 Kč/m", note: "včetně betonu" },
      { service: "Pokládka zámkové dlažby", price: "od 450 Kč/m²", note: "včetně podkladu" },
      { service: "Montáž plotů", price: "dle složitosti", note: "jakákoli složitost" },
    ],
  },
  {
    category: "Fasády a zateplení",
    description: "Zateplení fasád a dekorativní omítky",
    items: [
      { service: "Zateplení fasády polystyrenem", price: "od 1 200 Kč/m²", note: "komplet s omítkou" },
      { service: "Zateplení fasády minerální vatou", price: "od 1 400 Kč/m²", note: "komplet s omítkou" },
      { service: "Dekorativní omítky", price: "od 350 Kč/m²", note: "prémiové značky" },
      { service: "Povrchové úpravy fasád", price: "od 200 Kč/m²" },
    ],
  },
  {
    category: "Střechy",
    description: "Montáž střech z pálené tašky a plechových střech",
    items: [
      { service: "Montáž střech z pálené tašky", price: "od 1 200 Kč/m²", note: "včetně pokládky" },
      { service: "Montáž plechových střech", price: "dle složitosti", note: "jakákoli složitost" },
      { service: "Výstavba krovu", price: "od 4 000 Kč/m²", note: "včetně materiálu" },
    ],
  },
  {
    category: "Zahradní úpravy",
    description: "Zakládání trávníků a výsadba stromů",
    items: [
      { service: "Zakládání trávníků", price: "od 150 Kč/m²", note: "včetně osiva" },
      { service: "Výsadba okrasných stromů", price: "dle velikosti", note: "včetně výkopu" },
    ],
  },
  {
    category: "Komíny",
    description: "Montáž sendvičových i keramických komínových systémů",
    items: [
      { service: "Sendvičové komínové systémy", price: "dle domluvy", note: "včetně materiálu" },
      { service: "Keramické komínové systémy", price: "dle domluvy", note: "včetně materiálu" },
    ],
  },
  {
    category: "Základy",
    description: "Obložení základů dekorativním nebo štípaným kamenem",
    items: [
      { service: "Obložení základů dekorativním kamenem", price: "od 1 500 Kč/m²", note: "včetně lepidla" },
      { service: "Obložení základů štípaným kamenem", price: "od 1 800 Kč/m²", note: "včetně lepidla" },
    ],
  },
  {
    category: "Další služby",
    description: "Montáž okapů, demolice a demontáž eternitu",
    items: [
      { service: "Montáž okapů a žlabů", price: "od 300 Kč/m", note: "včetně materiálu" },
      { service: "Demontáž příček", price: "od 150 Kč/m²", note: "včetně odvozu" },
      { service: "Kompletní demolice objektů", price: "dle rozsahu", note: "kalkulace na míru" },
      { service: "Profesionální demontáž eternitu", price: "dle rozsahu", note: "azbest - včetně likvidace" },
      { service: "Ekologická likvidace eternitu", price: "dle množství", note: "certifikovaná likvidace" },
    ],
  },
  {
    category: "Svářečské práce",
    description: "MIG/MAG a MMA svařování, výroba kovových konstrukcí",
    items: [
      { service: "MIG/MAG svařování - ocelové konstrukce", price: "od 800 Kč/hod", note: "brány, ploty, výztuže" },
      { service: "MMA svařování - silné materiály", price: "od 900 Kč/hod", note: "konstrukční díly, opravy" },
      { service: "Výroba kovových konstrukcí", price: "dle domluvy", note: "výroba na zakázku" },
      { service: "Montáž kovových konstrukcí", price: "dle domluvy", note: "montáž na místě" },
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
