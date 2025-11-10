import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary-dark text-primary-foreground py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                Profesionální stavební práce s <span className="text-gold">23 lety zkušeností</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-muted-foreground leading-relaxed">
                Rekonstrukce, stavby na klíč a opravy v regionu Třebíč a okolí. Kvalita, rychlost a férová cena.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/kontakt">
                  <Button size="lg" className="bg-gold text-primary-dark hover:bg-gold/90 font-bold">
                    Nezávazná poptávka
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold/10 bg-transparent">
                    Naše práce
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* USP Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Férová cena</h3>
                <p className="text-muted-foreground">Transparentní kalkulace bez skrytých poplatků</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Rychlost</h3>
                <p className="text-muted-foreground">Dodržování termínů a efektivní realizace</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Kvalita</h3>
                <p className="text-muted-foreground">Precizní práce a dlouhá záruka</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Naše služby</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Komplexní stavební služby pro vaše projekty
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder pro služby - budou načteny ze Sanity */}
              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-3">Rekonstrukce</h3>
                <p className="text-muted-foreground mb-4">Kompletní rekonstrukce bytů, domů a komerčních prostor</p>
                <Link href="/sluzby" className="text-gold font-semibold hover:underline">
                  Zjistit více →
                </Link>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href="/sluzby">
                <Button variant="outline" size="lg">
                  Zobrazit všechny služby
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-dark text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Máte projekt? Kontaktujte nás!</h2>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
              Rádi vám připravíme cenovou nabídku na míru
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
