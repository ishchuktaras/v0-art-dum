"use client"

import Link from "next/link"
import { useEffect } from "react"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-primary-dark to-primary-dark/90">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            {/* 500 Number */}
            <div className="mb-8">
              <h1 className="text-9xl md:text-[12rem] font-black text-gold leading-none mb-4">500</h1>
              <div className="w-32 h-1 bg-gold mx-auto" />
            </div>

            {/* Message */}
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Něco se pokazilo</h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Omlouváme se, ale při zpracování vaší požadavky došlo k neočekávané chybě. Naši technici na problému
              pracují.
            </p>

            {/* Error Icon */}
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={reset} className="bg-gold text-primary-dark hover:bg-gold/90 font-bold">
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
              <Link href="/">
                <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold/10 bg-transparent">
                  Zpět na hlavní stránku
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
                <Link href="/kontakt" className="text-gold hover:text-gold/80 transition-colors font-bold">
                  Kontakt
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
