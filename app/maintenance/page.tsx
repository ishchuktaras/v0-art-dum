import Link from "next/link"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"

export default function Maintenance() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center bg-linear-to-b from-primary-dark to-primary-dark/90">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            {/* 503 Number */}
            <div className="mb-8">
              <h1 className="text-9xl md:text-[12rem] font-black text-gold leading-none mb-4">503</h1>
              <div className="w-32 h-1 bg-gold mx-auto" />
            </div>

            {/* Message */}
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Probíhá údržba</h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Webové stránky jsou momentálně v režimu údržby. Omlouváme se za komplikace. Brzy se vrátíme s vylepšenou
              verzí!
            </p>

            {/* Tools Icon */}
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>

            {/* Status Message */}
            <div className="bg-gold/10 border border-gold/20 rounded-lg p-6 mb-8">
              <p className="text-gold font-semibold">Očekávaná doba dokončení: Brzy se vrátíme</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => window.location.reload()}
                className="bg-gold text-primary-dark hover:bg-gold/90 font-bold"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Zkusit znovu
              </Button>
              <Link href="/kontakt">
                <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold/10 bg-transparent">
                  Kontaktujte nás
                </Button>
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-12 pt-8 border-t border-gold/20">
              <p className="text-muted-foreground mb-4 text-base md:text-lg">
                V případě naléhavé potřeby nás kontaktujte:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-gold">
                <a href="tel:+420774335592" className="flex items-center gap-2 hover:text-gold/80 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +420 774 335 592
                </a>
                <span className="text-gold/50 hidden sm:block">•</span>
                <a
                  href="mailto:firma@artdum.cz"
                  className="flex items-center gap-2 hover:text-gold/80 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  firma@artdum.cz
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
