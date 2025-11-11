import Link from "next/link"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"

export default function Forbidden() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-primary-dark to-primary-dark/90">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            {/* 403 Number */}
            <div className="mb-8">
              <h1 className="text-9xl md:text-[12rem] font-black text-gold leading-none mb-4">403</h1>
              <div className="w-32 h-1 bg-gold mx-auto" />
            </div>

            {/* Message */}
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Přístup odepřen</h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Omlouváme se, ale nemáte oprávnění k přístupu na tuto stránku. Pro přístup k této oblasti kontaktujte
              administrátora.
            </p>

            {/* Lock Icon */}
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
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
              <p className="text-muted-foreground mb-6 text-base md:text-lg">Nebo navštivte některou z našich sekcí:</p>
              <div className="flex flex-wrap justify-center gap-6 text-base md:text-lg">
                <Link href="/sluzby" className="text-gold hover:text-gold/80 transition-colors font-bold">
                  Naše služby
                </Link>
                <span className="text-gold/50">•</span>
                <Link href="/portfolio" className="text-gold hover:text-gold/80 transition-colors font-bold">
                  Portfolio
                </Link>
                <span className="text-gold/50">•</span>
                <Link href="/o-nas" className="text-gold hover:text-gold/80 transition-colors font-bold">
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
