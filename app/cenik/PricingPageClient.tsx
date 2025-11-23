"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Info } from "lucide-react"
import Image from "next/image"

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

const slideVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? window.innerWidth : -window.innerWidth,
      opacity: 0,
    }
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      x: direction > 0 ? -window.innerWidth : window.innerWidth,
      opacity: 0,
    }
  },
}

export default function PricingPageClient({
  categories,
  heroBackgroundImage,
}: {
  categories: PricingCategory[]
  heroBackgroundImage?: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [showTopIndicator, setShowTopIndicator] = useState(false)
  const [showBottomIndicator, setShowBottomIndicator] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleNext = () => {
    if (currentIndex === categories.length - 1) return
    setDirection(1)
    setCurrentIndex((prev) => prev + 1)
  }

  const handlePrev = () => {
    if (currentIndex === 0) return
    setDirection(-1)
    setCurrentIndex((prev) => prev - 1)
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

    if (isLeftSwipe) handleNext()
    if (isRightSwipe) handlePrev()

    setTouchStart(0)
    setTouchEnd(0)
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const isAtTop = target.scrollTop === 0
    const isAtBottom = target.scrollHeight - target.scrollTop === target.clientHeight

    setShowTopIndicator(!isAtTop)
    setShowBottomIndicator(!isAtBottom)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      const isAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight
      setShowTopIndicator(false)
      setShowBottomIndicator(!isAtBottom && container.scrollHeight > container.clientHeight)
    }
  }, [currentIndex])

  const currentCategory = categories[currentIndex]

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-20 md:py-32 overflow-hidden animate-fade-in">
        {/* Background image with overlay */}
        {heroBackgroundImage && (
          <div className="absolute inset-0">
            <Image
              src={heroBackgroundImage || "/placeholder.svg"}
              alt="Ceník stavebních prací ART DUM"
              fill
              className="object-cover scale-110 transition-transform duration-700"
              priority
              quality={75}
            />
            {/* Multi-layer gradient overlay for text readability */}
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Férová cena bez skrytých poplatků</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight animate-slide-up">
              Orientační ceník
            </h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed animate-slide-up [animation-delay:100ms]">
              Transparentní kalkulace našich služeb. Konečná cena vždy závisí na rozsahu prací a použitých materiálech.
            </p>
          </div>
        </div>
      </section>

      {/* Info Box */}
      <section className="py-10 bg-navy/5 dark:bg-navy/40 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/30 dark:to-amber-950/20 border-2 border-amber-300 dark:border-amber-600/50 rounded-2xl p-8 shadow-lg">
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 rounded-xl flex items-center justify-center shadow-lg">
                <Info className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-black text-xl text-gray-900 dark:text-gray-100 mb-3 leading-tight">
                  Důležité informace o ceníku
                </h3>
                <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                  Uvedené ceny jsou <strong className="text-gray-900 dark:text-gray-100 font-bold">orientační</strong> a
                  slouží pro základní představu. Přesnou cenovou nabídku vždy zpracujeme po osobní konzultaci a
                  prohlídce místa realizace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background text-foreground relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in">Naše ceník</h2>

          <div className="relative max-w-5xl mx-auto">
            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-accent/90 hover:bg-accent text-accent-foreground rounded-full p-3 md:p-4 shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group"
              aria-label="Předchozí kategorie"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-accent/90 hover:bg-accent text-accent-foreground rounded-full p-3 md:p-4 shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group"
              aria-label="Další kategorie"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Pricing Card Carousel */}
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="touch-pan-y"
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="w-full"
                >
                  <div className="container mx-auto px-4 max-w-5xl">
                    <Card className="overflow-hidden backdrop-blur-sm bg-background/95 border-accent/20 shadow-2xl">
                      <CardHeader className="relative space-y-6 p-6 md:p-8">
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center shadow-lg shadow-accent/30 shrink-0">
                            <svg
                              className="w-10 h-10 text-accent-foreground"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-3xl md:text-4xl mb-3 text-accent">
                              {currentCategory.category}
                            </CardTitle>
                          </div>
                        </div>

                        <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                          {currentCategory.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="p-6 md:p-10">
                        <div className="relative">
                          {showTopIndicator && (
                            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none z-10" />
                          )}

                          {showTopIndicator && (
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                              <div className="flex flex-col items-center gap-1 animate-bounce">
                                <svg
                                  className="w-6 h-6 text-accent"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 15l7-7 7 7"
                                  />
                                </svg>
                                <span className="text-xs font-medium text-accent">Scroll nahoru</span>
                              </div>
                            </div>
                          )}

                          <div
                            ref={scrollContainerRef}
                            onScroll={handleScroll}
                            className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar"
                          >
                            {currentCategory.items.map((item: PricingItem, idx: number) => (
                              <div
                                key={idx}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl bg-background/50 hover:bg-accent/10 border border-border/50 hover:border-accent/30 transition-all group/item"
                              >
                                <div className="flex-1 min-w-0">
                                  <p className="font-bold text-base md:text-lg text-foreground mb-1">{item.service}</p>
                                  {item.note && (
                                    <div className="flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 bg-accent/80 rounded-full" />
                                      <p className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">
                                        {item.note}
                                      </p>
                                    </div>
                                  )}
                                </div>
                                <div className="flex-shrink-0">
                                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/15 to-accent/10 px-4 py-2 rounded-full border-2 border-accent/30 shadow-sm">
                                    <span className="text-base md:text-lg font-black text-accent whitespace-nowrap">
                                      {item.price}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {showBottomIndicator && (
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                              <div className="flex flex-col items-center gap-1 animate-bounce">
                                <span className="text-xs font-medium text-accent">Scroll dolů</span>
                                <svg
                                  className="w-6 h-6 text-accent"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </div>
                            </div>
                          )}

                          {showBottomIndicator && (
                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {categories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (idx !== currentIndex) {
                      setDirection(idx > currentIndex ? 1 : -1)
                      setCurrentIndex(idx)
                    }
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentIndex
                      ? "w-12 h-3 bg-accent"
                      : "w-3 h-3 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Přejít na kategorii ${idx + 1}`}
                />
              ))}
            </div>

            <div className="text-center mt-4 text-sm text-muted-foreground">
              {currentIndex + 1} / {categories.length}
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16l4 4L19 7m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Transparentní kalkulace</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
                Co je zahrnuto v našich cenách?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Přesně víte, za co platíte. Žádné skryté poplatky ani překvapení.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-transparent hover:shadow-xl hover:shadow-gold/10 transition-all">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold/80 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-gold/30">
                    <svg className="w-8 h-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <CardTitle className="text-2xl font-black text-navy dark:text-white">Zahrnuto v ceně</CardTitle>
                  <CardDescription className="text-base">
                    Tyto položky jsou standardně součástí kalkulace
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 group">
                      <div className="flex-shrink-0 w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-gold text-sm font-bold">✓</span>
                      </div>
                      <span className="text-foreground group-hover:text-gold transition-colors">
                        Odborná práce kvalifikovaných řemeslníků
                      </span>
                    </li>
                    <li className="flex items-start gap-3 group">
                      <div className="flex-shrink-0 w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-gold text-sm font-bold">✓</span>
                      </div>
                      <span className="text-foreground group-hover:text-gold transition-colors">
                        Standardní materiál (tam kde je uvedeno)
                      </span>
                    </li>
                    <li className="flex items-start gap-3 group">
                      <div className="flex-shrink-0 w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-gold text-sm font-bold">✓</span>
                      </div>
                      <span className="text-foreground group-hover:text-gold transition-colors">
                        Doprava a dovoz materiálu
                      </span>
                    </li>
                    <li className="flex items-start gap-3 group">
                      <div className="flex-shrink-0 w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-gold text-sm font-bold">✓</span>
                      </div>
                      <span className="text-foreground group-hover:text-gold transition-colors">
                        Čištění staveniště
                      </span>
                    </li>
                    <li className="flex items-start gap-3 group">
                      <div className="flex-shrink-0 w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-gold text-sm font-bold">✓</span>
                      </div>
                      <span className="text-foreground group-hover:text-gold transition-colors">
                        Záruka na provedené práce
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-border hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-6 border-2 border-border">
                    <svg
                      className="w-8 h-8 text-muted-foreground"
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
                  <CardTitle className="text-2xl font-black text-navy dark:text-white">Nad rámec ceníku</CardTitle>
                  <CardDescription className="text-base">Tyto služby se účtují samostatně dle domluvy</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 group">
                      <div className="flex-shrink-0 w-6 h-6 bg-muted rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-muted-foreground text-xs">+</span>
                      </div>
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        Projektová dokumentace
                      </span>
                    </li>
                    <li className="flex items-start gap-3 group">
                      <div className="flex-shrink-0 w-6 h-6 bg-muted rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-muted-foreground text-xs">+</span>
                      </div>
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        Stavební povolení a kolaudace
                      </span>
                    </li>
                    <li className="flex items-start gap-3 group">
                      <div className="flex-shrink-0 w-6 h-6 bg-muted rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-muted-foreground text-xs">+</span>
                      </div>
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        Premium materiály (na přání)
                      </span>
                    </li>
                    <li className="flex items-start gap-3 group">
                      <div className="flex-shrink-0 w-6 h-6 bg-muted rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-muted-foreground text-xs">+</span>
                      </div>
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        Likvidace stavebního odpadu
                      </span>
                    </li>
                    <li className="flex items-start gap-3 group">
                      <div className="flex-shrink-0 w-6 h-6 bg-muted rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-muted-foreground text-xs">+</span>
                      </div>
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        Mimořádné práce mimo pracovní dobu
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-20 overflow-hidden animate-fade-in">
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
