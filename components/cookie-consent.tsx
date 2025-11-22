"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const consent = localStorage.getItem("cookie-consent")
      if (!consent) {
        setShowBanner(true)
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-[#0b192f] dark:bg-[#0b192f] border-t-2 border-gold shadow-2xl animate-in slide-in-from-bottom-5">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2">Soubory cookies</h3>
            <p className="text-sm text-white/90 leading-relaxed">
              Tyto webové stránky používají soubory cookies pro zajištění správné funkčnosti webu a pro analýzu
              návštěvnosti. Používáním těchto stránek souhlasíte s používáním cookies.{" "}
              <Link
                href="/gdpr"
                className="text-gold hover:text-gold/80 underline underline-offset-2 font-semibold transition-colors"
              >
                Více informací
              </Link>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full md:w-auto">
            <Button
              onClick={declineCookies}
              variant="outline"
              className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white hover:text-[#0b192f] bg-white/5 backdrop-blur-sm transition-colors"
            >
              Odmítnout
            </Button>
            <Button
              onClick={acceptCookies}
              className="w-full sm:w-auto bg-gold text-[#0b192f] hover:bg-gold/90 font-bold transition-all shadow-lg hover:shadow-xl"
            >
              Přijmout vše
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
