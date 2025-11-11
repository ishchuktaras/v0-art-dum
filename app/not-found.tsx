import Link from "next/link"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-primary-dark to-primary-dark/90">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            {/* 404 Number */}
            <div className="mb-8">
              <h1 className="text-9xl md:text-[12rem] font-black text-gold leading-none mb-4">404</h1>
              <div className="w-32 h-1 bg-gold mx-auto" />
            </div>

            {/* Message */}
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Stránka nebyla nalezena</h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Omlouváme se, ale stránka, kterou hledáte, neexistuje nebo byla přesunuta.
            </p>

            {/* Construction Icon */}
            <div className="mb-8">
              <svg
                className="w-24 h-24 mx-auto text-gold opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="bg-gold text-primary-dark hover:bg-gold/90 font-bold">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Zpět na hlavní stránku
                </Button>
              </Link>
              <Link href="/kontakt">
                <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold/10 bg-transparent">
                  Kontaktujte nás
                </Button>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="mt-12 pt-8 border-t border-gold/20">
              <p className="text-muted-foreground mb-4">Nebo navštivte některou z našich sekcí:</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link href="/sluzby" className="text-gold hover:text-gold/80 transition-colors font-semibold">
                  Naše služby
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link href="/portfolio" className="text-gold hover:text-gold/80 transition-colors font-semibold">
                  Portfolio
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link href="/o-nas" className="text-gold hover:text-gold/80 transition-colors font-semibold">
                  O nás
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
