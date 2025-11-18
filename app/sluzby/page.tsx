import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/fetch"
import { SERVICES_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Stavební služby Třebíč | Rekonstrukce, Stavby na klíč, Zateplení | ART DUM",
  description:
    "Kompletní stavební služby v Třebíči a okolí: rekonstrukce bytů a domů, stavby na klíč, zednické práce, zateplení, opravy, komerční prostory. 23 let zkušeností. ☎ +420 774 335 592",
  keywords: [
    "stavební služby Třebíč",
    "rekonstrukce bytů Třebíč",
    "stavby na klíč",
    "zednické práce",
    "zateplení budov",
    "opravy domů",
    "komerční prostory",
  ],
  openGraph: {
    title: "Stavební služby Třebíč | ART DUM",
    description: "Kompletní stavební služby: rekonstrukce, stavby na klíč, zateplení, opravy. 23 let zkušeností.",
    url: "https://artdum.cz/sluzby",
  },
  alternates: {
    canonical: "https://artdum.cz/sluzby",
  },
}

const fallbackServices = [
  {
    title: "Rekonstrukce bytů a domů",
    shortDescription:
      "Kompletní rekonstrukce od A do Z včetně bourání, nových rozvodů, SDK konstrukcí, obkladů a malování. Důraz na kvalitu a dodržení termínů.",
    features: [
      "Bourací a demoliční práce",
      "Elektroinstalace a rozvody vody",
      "Sádrokartonové konstrukce",
      "Obklady a dlažby",
      "Malířské a natěračské práce",
      "Pokládka podlahových krytin",
    ],
    icon: "home",
  },
  {
    title: "Stavby a přístavby na klíč",
    shortDescription:
      "Výstavba rodinných domů, garáží, pergol a přístaveb. Zajistíme kompletní realizaci včetně projektové dokumentace a komunikace s úřady.",
    features: [
      "Rodinné domy na klíč",
      "Přístavby a nástavby",
      "Garáže a carporty",
      "Pergoly a zahradní domky",
      "Projektová dokumentace",
      "Koordinace subdodavatelů",
    ],
    icon: "building",
  },
  {
    title: "Zateplení fasád",
    shortDescription:
      "Kontaktní zateplovací systémy (ETICS) pro snížení nákladů na vytápění. Minerální vlna i polystyren. Kompletní realizace včetně lešení.",
    features: [
      "ETICS systémy",
      "Minerální vata a polystyren",
      "Zateplení soklů",
      "Fasádní omítky a nátěry",
      "Sanace vlhkého zdiva",
      "Dotační podpora",
    ],
    icon: "shield",
  },
  {
    title: "Zednické práce",
    shortDescription:
      "Profesionální zednické služby - zdění, omítky, betonáže, obklady. Precizní provedení s důrazem na čistotu staveniště.",
    features: [
      "Zdění z cihel a tvárnic",
      "Vnitřní a vnější omítky",
      "Betonové konstrukce",
      "Obklady a dlažby",
      "Opravy fasád",
      "Zateplení příček",
    ],
    icon: "brick",
  },
  {
    title: "Střechy a klempířské práce",
    shortDescription:
      "Kompletní střešní systémy, opravy střech, klempířské prvky. Od krovu přes izolace až po krytinu a žlaby.",
    features: [
      "Výstavba krovů",
      "Pokládka střešní krytiny",
      "Střešní okna a světlíky",
      "Klempířské prvky",
      "Opravy a rekonstrukce střech",
      "Okapové systémy",
    ],
    icon: "roof",
  },
  {
    title: "Komerční prostory",
    shortDescription:
      "Rekonstrukce obchodů, restaurací, kanceláří a výstavních prostor. Rychlá realizace s minimalizací prostojů provozu.",
    features: [
      "Obchody a showroomy",
      "Restaurace a kavárny",
      "Kanceláře",
      "Výstavní prostory",
      "Hygienické zázemí",
      "Práce mimo provozní dobu",
    ],
    icon: "store",
  },
]

export default async function ServicesPage() {
  const sanityServices = await sanityFetch<any[]>({
    query: SERVICES_QUERY,
    tags: ["service"],
  })

  const services = sanityServices && sanityServices.length > 0 ? sanityServices : fallbackServices

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.shortDescription,
        provider: {
          "@type": "GeneralContractor",
          name: "ART DUM",
          telephone: "+420774335592",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Třebíč",
            addressCountry: "CZ",
          },
        },
      },
    })),
  }

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Kompletní stavební řešení</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">Naše služby</h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
              Poskytujeme komplexní stavební služby s důrazem na kvalitu, přesnost a spokojenost zákazníka. S 23 lety
              zkušeností víme, jak na to.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background text-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: any, index: number) => (
              <Card key={service._id || index} className="group relative overflow-hidden border-2 border-border bg-card text-card-foreground hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="relative">
                  {service.image && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4 bg-muted">
                      <img
                        src={urlFor(service.image)?.width(400).height(250).url() || "/placeholder.svg"}
                        alt={service.image.alt || service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={`M${service.icon}`} />
                    </svg>
                  </div>
                  <CardTitle className="text-2xl mb-2 group-hover:text-accent transition-colors">{service.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">{service.shortDescription}</CardDescription>
                  {service.price && <p className="text-accent font-semibold mt-3">{service.price}</p>}
                </CardHeader>
                {service.features && service.features.length > 0 && (
                  <CardContent className="relative">
                    <ul className="space-y-2">
                      {service.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-accent mr-2 shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Proč si vybrat nás?</h2>
            <p className="text-lg text-muted-foreground">Našim klientům nabízíme mnohem víc než jen kvalitní práci</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-xl bg-card shadow-sm border border-border">
              <div className="text-4xl font-black text-accent mb-2">23+</div>
              <p className="font-semibold mb-1 text-foreground">let zkušeností</p>
              <p className="text-sm text-muted-foreground">Ve stavebnictví</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-card shadow-sm border border-border">
              <div className="text-4xl font-black text-accent mb-2">100%</div>
              <p className="font-semibold mb-1 text-foreground">spokojených klientů</p>
              <p className="text-sm text-muted-foreground">Vraťte se k nám</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-card shadow-sm border border-border">
              <div className="text-4xl font-black text-accent mb-2">5★</div>
              <p className="font-semibold mb-1 text-foreground">hodnocení</p>
              <p className="text-sm text-muted-foreground">Na Firmy.cz</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-card shadow-sm border border-border">
              <div className="text-4xl font-black text-accent mb-2">24/7</div>
              <p className="font-semibold mb-1 text-foreground">dostupnost</p>
              <p className="text-sm text-muted-foreground">Pro havarijní případy</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">Zajímá vás některá z našich služeb?</h2>
          <p className="text-xl mb-10 text-white/80 max-w-2xl mx-auto leading-relaxed">
            Rádi vám připravíme cenovou nabídku na míru a zodpovíme všechny vaše dotazy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt">
              <Button size="lg" className="group bg-gold text-primary-dark hover:bg-gold/90 font-bold text-lg px-8 py-6 h-auto shadow-2xl shadow-gold/20 hover:scale-105 transition-all">
                <span>Nezávazná poptávka</span>
                <svg className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="border-2 border-white/20 text-white hover:bg-white hover:text-navy bg-white/5 backdrop-blur-sm font-semibold text-lg px-8 py-6 h-auto hover:scale-105 transition-all">
                Ukázky naší práce
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
