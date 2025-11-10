import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export const metadata = {
  title: "Naše služby | ART DUM",
  description:
    "Komplexní stavební služby - rekonstrukce, stavby na klíč, zednické práce a další. 23 let zkušeností v regionu Třebíč.",
}

const services = [
  {
    title: "Rekonstrukce bytů a domů",
    description:
      "Kompletní rekonstrukce bytových i rodinných domů od A do Z. Zaměřujeme se na kvalitu, dodržování termínů a minimalizaci nepříjemností pro klienta.",
    features: [
      "Bourací práce",
      "Nové rozvody elektřiny a vody",
      "SDK příčky a podhledy",
      "Obkladačské práce",
      "Malířské práce",
      "Pokládka podlah",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    title: "Stavby na klíč",
    description:
      "Realizace kompletních stavebních projektů od základů po finální úpravy. Zajistíme vše potřebné včetně koordinace subdodavatelů.",
    features: [
      "Výstavba rodinných domů",
      "Přístavby a nástavby",
      "Pergoly a přístřešky",
      "Garáže",
      "Zahradní domky",
      "Projekt a koordinace",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    title: "Zednické práce",
    description:
      "Profesionální zednické práce všeho druhu. Přesnost, čistota práce a dodržování technologických postupů.",
    features: [
      "Zdění cihelných konstrukcí",
      "Příčky a zateplení",
      "Omítky vnitřní i venkovní",
      "Betonáže",
      "Obklady a dlažby",
      "Opravy fasád",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Zateplení budov",
    description: "Komplexní zateplení fasád kontaktním zateplovacím systémem pro úsporu energií a komfort bydlení.",
    features: [
      "ETICS systémy",
      "Minerální vata i polystyren",
      "Sokly a základy",
      "Sanace vlhkosti",
      "Fasádní omítky",
      "Kompletní dokumentace",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    title: "Opravy a údržba",
    description: "Rychlé a kvalitní řešení stavebních problémů. Jsme tu pro vás i při menších opravách.",
    features: [
      "Opravy prasklin",
      "Výměna oken a dveří",
      "Lokální opravy střech",
      "Sanace zdiva",
      "Úpravy teras a balkonů",
      "Havarijní servis",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Komerční prostory",
    description:
      "Rekonstrukce a výstavba komerčních prostor - obchody, kanceláře, restaurace. Rychlá realizace dle vašich požadavků.",
    features: [
      "Obchodní prostory",
      "Kanceláře",
      "Restaurace a kavárny",
      "Výstavní prostory",
      "Čisté pokoje",
      "Minimalizace prostojů",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
]

export default function ServicesPage() {
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
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gold rounded-lg flex items-center justify-center mb-4 text-primary-dark">
                      {service.icon}
                    </div>
                    <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
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
