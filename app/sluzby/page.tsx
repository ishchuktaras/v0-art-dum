"use client"

import type React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useState, useEffect } from "react"
import {
  Hammer,
  Square,
  Layers,
  Wrench,
  Mountain,
  Home,
  Triangle,
  Trees,
  Flame,
  Box,
  MoreHorizontal,
  Zap,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react"

const fallbackServices = [
  {
    title: "Zednické a stavební práce",
    shortDescription:
      "Kompletní zednické služby od oklepání staré omítky až po finální úpravy. Pracujeme s ekologickými materiály KEIM a dekorativními stěrkami renomovaných evropských značek.",
    features: [
      "Oklepání a odstranění staré omítky",
      "Ruční omítky (sádrová, jádrová, Rotband)",
      "Ekologické omítky KEIM",
      "Dekorativní stěrky",
      "Stěrkování a příprava povrchů",
      "Malování interiérů a exteriérů",
      "Montáž elektroinstalace",
      "Montáž sanitárních rozvodů včetně kanalizace",
    ],
    price: "Dle domluvy",
    icon: "hammer",
  },
  {
    title: "Podlahy",
    shortDescription:
      "Kompletní pokládka všech typů podlah včetně montáže podlahového topení a přípravy podkladu. Od samonivelačních podlah až po keramiku a dřevo.",
    features: [
      "Montáž podlahového topení",
      "Betonový potěr pro podlahové topení",
      "Samonivelační podlahy",
      "Laminátová podlaha",
      "Vinylová podlaha",
      "Keramická dlažba",
      "Dřevěná podlaha",
      "Linoleová podlaha",
    ],
    price: "Od 500 Kč/m²",
    icon: "square",
  },
  {
    title: "Stropy",
    shortDescription:
      "Montáž sádrokartonových konstrukcí a různé druhy omítek na stropy. Precizní provedení s důrazem na kvalitu povrchu.",
    features: ["Sádrokartonové konstrukce", "Různé druhy omítek na stropy", "Podhledy", "Zvuková izolace stropů"],
    price: "Od 600 Kč/m²",
    icon: "layers",
  },
  {
    title: "Montážní práce",
    shortDescription:
      "Komplexní montážní služby - dveře, okna, parapety a elektroinstalace. Zajistíme precizní instalaci s garancí kvality.",
    features: [
      "Montáž dveří",
      "Montáž oken",
      "Montáž parapetů/podvěkoníků (PVC, dřevo, kámen, MDF, hliník)",
      "Kompletní elektroinstalace",
    ],
    price: "Dle domluvy",
    icon: "wrench",
  },
  {
    title: "Zemní práce",
    shortDescription:
      "Výkopy pro drenáž, pokládka zámkové dlažby, montáž obrubníků a plotů. Práce ručně i mechanizací.",
    features: [
      "Výkopy pro drenáž (ručně i mechanizací)",
      "Montáž obrubníků",
      "Pokládka zámkové dlažby",
      "Montáž plotů jakékoli složitosti",
    ],
    price: "Od 800 Kč/m²",
    icon: "mountain",
  },
  {
    title: "Fasády a zateplení",
    shortDescription:
      "Zateplení fasád polystyrenem nebo minerální vatou včetně povrchových úprav a dekorativních omítek.",
    features: [
      "Zateplení fasády polystyrenem",
      "Zateplení fasády minerální vatou",
      "Povrchové úpravy",
      "Dekorativní omítky",
    ],
    price: "Od 1 200 Kč/m²",
    icon: "home",
  },
  {
    title: "Střechy",
    shortDescription:
      "Montáž střech z pálené tašky i plechových střech jakékoli složitosti. Kompletní realizace včetně krovu.",
    features: [
      "Montáž střech z pálené tašky",
      "Montáž plechových střech jakékoli složitosti",
      "Výstavba krovu",
      "Střešní izolace",
    ],
    price: "Dle domluvy",
    icon: "triangle",
  },
  {
    title: "Zahradní úpravy",
    shortDescription: "Zakládání trávníků a výsadba okrasných stromů pro kompletní zahradní úpravy.",
    features: ["Zakládání trávníků", "Výsadba okrasných stromů", "Terénní úpravy"],
    price: "Od 300 Kč/m²",
    icon: "trees",
  },
  {
    title: "Komíny",
    shortDescription: "Montáž sendvičových i keramických komínových systémů s garancí bezpečnosti a funkčnosti.",
    features: ["Montáž sendvičových komínových systémů", "Montáž keramických komínových systémů"],
    price: "Dle domluvy",
    icon: "flame",
  },
  {
    title: "Základy",
    shortDescription: "Obložení základů dekorativním nebo štípaným kamenem pro elegantní a odolný vzhled.",
    features: ["Obložení základů dekorativním kamenem", "Obložení základů štípaným kamenem"],
    price: "Od 1 500 Kč/m²",
    icon: "box",
  },
  {
    title: "Další služby",
    shortDescription: "Montáž okapů, demolice objektů a profesionální demontáž eternitu s ekologickou likvidací.",
    features: [
      "Montáž okapů a žlabů",
      "Demontáž příček",
      "Kompletní demolice objektů",
      "Profesionální demontáž eternitu (azbestu)",
      "Ekologická likvidace eternitu",
    ],
    price: "Dle domluvy",
    icon: "more-horizontal",
  },
  {
    title: "Svářečské práce",
    shortDescription:
      "Profesionální svářečské práce MIG/MAG a MMA. Výroba a montáž ocelových konstrukcí, bran, plotů a výztuží.",
    features: [
      "MIG/MAG svařování (ocelové konstrukce, brány, ploty, výztuže)",
      "MMA svařování (silné materiály, konstrukční díly, opravy)",
      "Výroba kovových konstrukcí",
      "Montáž kovových konstrukcí",
    ],
    price: "Dle domluvy",
    icon: "zap",
  },
]

const iconMap: Record<string, LucideIcon> = {
  hammer: Hammer,
  square: Square,
  layers: Layers,
  wrench: Wrench,
  mountain: Mountain,
  home: Home,
  triangle: Triangle,
  trees: Trees,
  flame: Flame,
  box: Box,
  "more-horizontal": MoreHorizontal,
  zap: Zap,
}

interface ServicesPageClientProps {
  services: any[]
  heroBackgroundImage?: string
  jsonLd: any
}

export default function ServicesPageClient({ services, heroBackgroundImage, jsonLd }: ServicesPageClientProps) {
  const displayServices = services && services.length > 0 ? services : fallbackServices

  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        handleNext()
      }
    }, 5000)

    return () => clearInterval(timer)
  }, [currentIndex, isAnimating])

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % displayServices.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + displayServices.length) % displayServices.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      handleNext()
    }
    if (isRightSwipe) {
      handlePrev()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  const currentService = displayServices[currentIndex]
  const IconComponent = currentService.icon && iconMap[currentService.icon] ? iconMap[currentService.icon] : Wrench

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-20 md:py-32 overflow-hidden animate-fade-in">
        {heroBackgroundImage && (
          <div className="absolute inset-0">
            <Image
              src={heroBackgroundImage || "/placeholder.svg"}
              alt="Stavební služby ART DUM"
              fill
              className="object-cover scale-110 transition-transform duration-700"
              priority
              quality={75}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b192f]/95 via-[#0f2342]/90 to-[#0b192f]/95" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b192f]/90 via-transparent to-[#0b192f]/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-slide-up">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <span>Ekologické materiály KEIM</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight animate-slide-up">
              Kompletní stavební a řemeslné práce – vše na klíč
            </h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed animate-slide-up [animation-delay:100ms]">
              Pracujeme s ekologickými materiály KEIM a s dekorativními stěrkami renomovaných evropských značek.
              Realizujeme zakázky ve starém i moderním designu dle přání zákazníka.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background text-foreground relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in">Naše služby</h2>

          <div className="relative max-w-4xl mx-auto">
            <button
              onClick={handlePrev}
              disabled={isAnimating}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-accent/90 hover:bg-accent text-accent-foreground rounded-full p-3 md:p-4 shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group"
              aria-label="Předchozí služba"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleNext}
              disabled={isAnimating}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-accent/90 hover:bg-accent text-accent-foreground rounded-full p-3 md:p-4 shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group"
              aria-label="Další služba"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
            </button>

            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="touch-pan-y"
            >
              <Card
                key={currentService._id || currentIndex}
                className="group relative overflow-hidden border-2 border-accent/20 bg-card text-card-foreground shadow-2xl min-h-[600px] md:min-h-[700px] animate-fade-in"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 opacity-100" />

                <CardHeader className="relative space-y-6 p-6 md:p-8">
                  {currentService.image && (
                    <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-muted shadow-lg">
                      <img
                        src={currentService.image.asset?.url || "/placeholder.svg"}
                        alt={currentService.image.alt || currentService.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center shadow-lg shadow-accent/30 shrink-0">
                      <IconComponent className="w-10 h-10 text-accent-foreground" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-3xl md:text-4xl mb-3 text-accent">{currentService.title}</CardTitle>
                      {currentService.price && (
                        <p className="text-2xl font-bold text-foreground">{currentService.price}</p>
                      )}
                    </div>
                  </div>

                  <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                    {currentService.shortDescription}
                  </CardDescription>
                </CardHeader>

                {currentService.features && currentService.features.length > 0 && (
                  <CardContent className="relative p-6 md:p-8 pt-0">
                    <h3 className="text-xl font-bold mb-4 text-foreground">Co je zahrnuto:</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {currentService.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start group/item">
                          <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mr-3 shrink-0 mt-0.5 group-hover/item:bg-accent/20 transition-colors">
                            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-base text-muted-foreground group-hover/item:text-foreground transition-colors">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                )}
              </Card>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {displayServices.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true)
                      setCurrentIndex(idx)
                      setTimeout(() => setIsAnimating(false), 500)
                    }
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentIndex
                      ? "w-12 h-3 bg-accent"
                      : "w-3 h-3 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Přejít na službu ${idx + 1}`}
                />
              ))}
            </div>

            <div className="text-center mt-4 text-sm text-muted-foreground">
              {currentIndex + 1} / {displayServices.length}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Proč si vybrat nás?</h2>
            <p className="text-lg text-muted-foreground">Našim klientům nabízíme mnohem víc než jen kvalitní práci</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-xl bg-card shadow-sm border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl font-black text-accent mb-2">23+</div>
              <p className="font-semibold mb-1 text-foreground">let zkušeností</p>
              <p className="text-sm text-muted-foreground">Ve stavebnictví</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-card shadow-sm border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl font-black text-accent mb-2">100%</div>
              <p className="font-semibold mb-1 text-foreground">spokojených klientů</p>
              <p className="text-sm text-muted-foreground">Vraťte se k nám</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-card shadow-sm border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl font-black text-accent mb-2">5★</div>
              <p className="font-semibold mb-1 text-foreground">hodnocení</p>
              <p className="text-sm text-muted-foreground">Na Firmy.cz</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-card shadow-sm border border-border hover:shadow-lg hover:border-accent/30 transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl font-black text-accent mb-2">24/7</div>
              <p className="font-semibold mb-1 text-foreground">dostupnost</p>
              <p className="text-sm text-muted-foreground">Pro havarijní případy</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-20 overflow-hidden animate-fade-in">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">Zajímá vás některá z našich služeb?</h2>
          <p className="text-xl mb-10 text-white/80 max-w-2xl mx-auto leading-relaxed">
            Rádi vám připravíme cenovou nabídku na míru a zodpovíme všechny vaše dotazy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt">
              <Button
                size="lg"
                className="group relative bg-gold text-primary-dark hover:bg-gold/90 font-bold text-lg px-8 py-6 h-auto shadow-2xl shadow-gold/20 hover:scale-105 hover:shadow-gold/40 transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <span className="relative">Nezávazná poptávka</span>
                <svg
                  className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform relative"
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
            <Link href="/portfolio">
              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-white/20 text-white hover:bg-white hover:text-navy bg-white/5 backdrop-blur-sm font-semibold text-lg px-8 py-6 h-auto hover:scale-105 hover:border-white transition-all duration-300"
              >
                <span>Ukázky naší práce</span>
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
