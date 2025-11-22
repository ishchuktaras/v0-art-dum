"use client"

import { MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const isAdminPage = pathname?.startsWith("/admin") || pathname?.startsWith("/auth")

    if (isAdminPage) {
      return
    }

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [pathname])

  const handleWhatsAppClick = () => {
    const phoneNumber = "420774335592" // Telefonní číslo bez '+' a mezer
    const message = encodeURIComponent(
      "Dobrý den,\n\nchtěl bych se informovat o vašich stavebních službách a obdržet nezávaznou cenovou nabídku.\n\nDěkuji.",
    )
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-2xl hover:shadow-[#25D366]/50 transition-all duration-300 hover:scale-110 group ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Kontaktovat přes WhatsApp"
      title="Kontaktovat přes WhatsApp"
    >
      <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
    </button>
  )
}
