"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    }
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
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white border-t-2 border-gold shadow-lg animate-in slide-in-from-bottom-5">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-primary-dark mb-2">Soubory cookies</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tyto webové stránky používají soubory cookies pro zajištění správné funkčnosti webu a pro analýzu
              návštěvnosti. Používáním těchto stránek souhlasíte s používáním cookies.{" "}
              <Link href="/gdpr" className="text-gold hover:underline font-semibold">
                Více informací
              </Link>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full md:w-auto">
            <Button
              onClick={declineCookies}
              variant="outline"
              className="w-full sm:w-auto border-primary-dark text-primary-dark hover:bg-primary-dark/5"
            >
              Odmítnout
            </Button>
            <Button onClick={acceptCookies} className="w-full sm:w-auto bg-gold text-primary-dark hover:bg-gold/90 font-bold">
              Přijmout vše
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
