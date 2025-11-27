import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, Home, Mail, Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Děkujeme za poptávku | ART DUM",
  description: "Vaše poptávka byla úspěšně odeslána. Ozveme se vám do 24 hodin.",
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero sekce s gradient pozadím */}
        {/* Používáme hex kód #0b192f pro Tmavě modrou */}
        <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

          {/* Animované pozadí */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Používáme hex kód #D4AF37 pro Zlatou */}
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Success ikona s animací */}
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-8 animate-in zoom-in duration-500 shadow-2xl shadow-green-500/50">
                <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.5} />
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
                Děkujeme za vaši poptávku!
              </h1>

              <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                Vaše zpráva byla úspěšně odeslána.
              </p>

              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] px-6 py-3 rounded-full text-base font-semibold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                <Mail className="w-5 h-5" />
                <span>Ozveme se vám do 24 hodin</span>
              </div>
            </div>
          </div>
        </section>

        {/* Co bude dál sekce */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-center mb-12 text-foreground">Co se bude dít dál?</h2>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="border-2 border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-amber-500 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-black text-[#0B192F]">1</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-foreground">Zpracování poptávky</h3>
                    <p className="text-muted-foreground text-sm">
                      Prostudujeme vaše požadavky a připravíme cenovou nabídku přesně na míru.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-amber-500 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-black text-[#0B192F]">2</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-foreground">Kontaktujeme vás</h3>
                    <p className="text-muted-foreground text-sm">
                      Do 24 hodin se ozveme telefonicky nebo emailem s cenovou nabídkou.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-amber-500 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-black text-[#0B192F]">3</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-foreground">Osobní setkání</h3>
                    <p className="text-muted-foreground text-sm">
                      Domluvíme si prohlídku místa realizace a prodiskutujeme detaily projektu.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Kontaktní informace */}
              <Card className="border-2 border-[#D4AF37]/30 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-center mb-6 text-[#0B192F] dark:text-[#D4AF37]">
                    Potřebujete nás kontaktovat okamžitě?
                  </h3>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <a
                      href="tel:+420774335592"
                      className="flex items-center gap-3 text-[#0B192F] dark:text-white hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                        <Phone className="w-6 h-6 text-[#D4AF37]" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Telefon</div>
                        <div className="font-bold text-lg">+420 774 335 592</div>
                      </div>
                    </a>

                    <div className="hidden md:block w-px h-12 bg-[#D4AF37]/30" />

                    <a
                      href="mailto:firma@artdum.cz"
                      className="flex items-center gap-3 text-[#0B192F] dark:text-white hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                        <Mail className="w-6 h-6 text-[#D4AF37]" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Email</div>
                        <div className="font-bold text-lg">firma@artdum.cz</div>
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Navigační tlačítka */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                <Button asChild size="lg" className="bg-[#0B192F] hover:bg-[#0B192F]/90 text-white">
                  <Link href="/">
                    <Home className="w-5 h-5 mr-2" />
                    Zpět na hlavní stránku
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 bg-transparent"
                >
                  <Link href="/portfolio">
                    Prohlédnout portfolio
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}