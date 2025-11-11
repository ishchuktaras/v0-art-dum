import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/fetch"
import { SERVICES_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"

export const metadata = {
  title: "Naše služby | ART DUM",
  description:
    "Komplexní stavební služby - rekonstrukce, stavby na klíč, zednické práce a další. 23 let zkušeností v regionu Třebíč.",
}

const fallbackServices = [
  {
    title: "Rekonstrukce bytů a domů",
    shortDescription:
      "Kompletní rekonstrukce bytových i rodinných domů od A do Z. Zaměřujeme se na kvalitu, dodržování termínů a minimalizaci nepříjemností pro klienta.",
    features: [
      "Bourací práce",
      "Nové rozvody elektřiny a vody",
      "SDK příčky a podhledy",
      "Obkladačské práce",
      "Malířské práce",
      "Pokládka podlah",
    ],
    icon: "home",
  },
  {
    title: "Stavby na klíč",
    shortDescription:
      "Realizace kompletních stavebních projektů od základů po finální úpravy. Zajistíme vše potřebné včetně koordinace subdodavatelů.",
    features: [
      "Výstavba rodinných domů",
      "Přístavby a nástavby",
      "Pergoly a přístřešky",
      "Garáže",
      "Zahradní domky",
      "Projekt a koordinace",
    ],
    icon: "building",
  },
  {
    title: "Zednické práce",
    shortDescription:
      "Profesionální zednické práce všeho druhu. Přesnost, čistota práce a dodržování technologických postupů.",
    features: [
      "Zdění cihelných konstrukcí",
      "Příčky a zateplení",
      "Omítky vnitřní i venkovní",
      "Betonáže",
      "Obklady a dlažby",
      "Opravy fasád",
    ],
    icon: "brick",
  },
  {
    title: "Zateplení budov",
    shortDescription:
      "Komplexní zateplení fasád kontaktním zateplovacím systémem pro úsporu energií a komfort bydlení.",
    features: [
      "ETICS systémy",
      "Minerální vata i polystyren",
      "Sokly a základy",
      "Sanace vlhkosti",
      "Fasádní omítky",
      "Kompletní dokumentace",
    ],
    icon: "shield",
  },
  {
    title: "Opravy a údržba",
    shortDescription: "Rychlé a kvalitní řešení stavebních problémů. Jsme tu pro vás i při menších opravách.",
    features: [
      "Opravy prasklin",
      "Výměna oken a dveří",
      "Lokální opravy střech",
      "Sanace zdiva",
      "Úpravy teras a balkonů",
      "Havarijní servis",
    ],
    icon: "wrench",
  },
  {
    title: "Komerční prostory",
    shortDescription:
      "Rekonstrukce a výstavba komerčních prostor - obchody, kanceláře, restaurace. Rychlá realizace dle vašich požadavků.",
    features: [
      "Obchodní prostory",
      "Kanceláře",
      "Restaurace a kavárny",
      "Výstavní prostory",
      "Čisté pokoje",
      "Minimalizace prostojů",
    ],
    icon: "store",
  },
]

export default async function ServicesPage() {
  // Fetch services from Sanity
  const sanityServices = await sanityFetch<any[]>({
    query: SERVICES_QUERY,
    tags: ["service"],
  })

  // Use Sanity services if available, otherwise use fallback
  const services = sanityServices && sanityServices.length > 0 ? sanityServices : fallbackServices

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary-dark text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-black mb-6">Naše služby</h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Poskytujeme komplexní stavební služby s důrazem na kvalitu, přesnost a spokojenost zákazníka. S 23 lety
                zkušeností víme, jak na to.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service: any, index: number) => (
                <Card key={service._id || index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    {service.image && (
                      <img
                        src={urlFor(service.image).width(400).height(250).url() || "/placeholder.svg"}
                        alt={service.image.alt || service.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <div className="w-16 h-16 bg-gold rounded-lg flex items-center justify-center mb-4 text-primary-dark">
                      {/* Render icons based on service.icon */}
                      {service.icon && (
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={`M${service.icon}`} />
                        </svg>
                      )}
                    </div>
                    <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.shortDescription}</CardDescription>
                    {service.price && <p className="text-gold font-semibold mt-3">{service.price}</p>}
                  </CardHeader>
                  {service.features && service.features.length > 0 && (
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <svg
                              className="w-5 h-5 text-gold mr-2 flex-shrink-0 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm">{feature}</span>
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
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Proč si vybrat nás?</h2>
              <p className="text-lg text-muted-foreground">Našim klientům nabízíme mnohem víc než jen kvalitní práci</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-black text-gold mb-2">23+</div>
                <p className="font-semibold mb-1">let zkušeností</p>
                <p className="text-sm text-muted-foreground">Ve stavebnictví</p>
              </div>

              <div className="text-center">
                <div className="text-4xl font-black text-gold mb-2">100%</div>
                <p className="font-semibold mb-1">spokojených klientů</p>
                <p className="text-sm text-muted-foreground">Vraťte se k nám</p>
              </div>

              <div className="text-center">
                <div className="text-4xl font-black text-gold mb-2">5★</div>
                <p className="font-semibold mb-1">hodnocení</p>
                <p className="text-sm text-muted-foreground">Na Firmy.cz</p>
              </div>

              <div className="text-center">
                <div className="text-4xl font-black text-gold mb-2">24/7</div>
                <p className="font-semibold mb-1">dostupnost</p>
                <p className="text-sm text-muted-foreground">Pro havarijní případy</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-dark text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Zajímá vás některá z našich služeb?</h2>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
              Rádi vám připravíme cenovou nabídku na míru a zodpovíme všechny vaše dotazy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt">
                <Button size="lg" className="bg-gold text-primary-dark hover:bg-gold/90 font-bold">
                  Nezávazná poptávka
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold/10 bg-transparent">
                  Ukázky naší práce
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
