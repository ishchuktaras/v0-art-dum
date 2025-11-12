"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Home, Building2, Wrench, Briefcase, Star, BookOpen, Phone } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  const navLinks = [
    { href: "/", label: "Domů", icon: Home },
    { href: "/o-nas", label: "O nás", icon: Building2 },
    { href: "/sluzby", label: "Služby", icon: Wrench },
    { href: "/portfolio", label: "Portfolio", icon: Briefcase },
    { href: "/hodnoceni", label: "Hodnocení", icon: Star },
    { href: "/blog", label: "Blog", icon: BookOpen },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary-dark backdrop-blur supports-backdrop-filter:bg-primary-dark/95">
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 z-50">
          <Image
            src="/logo.jpg"
            alt="ART DUM - Stavební firma"
            width={160}
            height={120}
            className="h-auto w-auto max-h-[50px] md:max-h-[70px]"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors ${
                pathname === link.href ? "text-gold" : "text-primary-foreground hover:text-gold"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/kontakt">
            <Button size="lg" className="bg-gold text-primary-dark hover:bg-gold/90 font-bold px-6">
              Nezávazná poptávka
            </Button>
          </Link>
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden relative text-primary-foreground z-50 p-2 w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-gold transition-all duration-300 ${
              mobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-gold transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`w-6 h-0.5 bg-gold transition-all duration-300 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        <div
          className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-out ${
            mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="absolute inset-0 bg-primary-dark" onClick={() => setMobileMenuOpen(false)} />

          {/* Dekorativní prvky - přidána nižší z-index pro vrstvení */}
          <div className="absolute top-20 right-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl z-10" />
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl z-10" />

          {/* Navigační menu - zvýšen z-index pro viditelnost nad pozadím */}
          <nav
            className={`relative z-20 flex flex-col h-full pt-28 pb-10 px-8 transition-transform duration-500 ease-out ${
              mobileMenuOpen ? "translate-y-0" : "-translate-y-10"
            }`}
          >
            {/* Navigační odkazy s ikonami */}
            <div className="flex-1 flex flex-col justify-center space-y-2 max-w-md mx-auto w-full">
              {navLinks.map((link, index) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`group flex items-center gap-4 py-4 px-6 rounded-xl transition-all duration-300 transform ${
                      isActive
                        ? "bg-gold/20 text-gold translate-x-2"
                        : "text-primary-foreground hover:bg-gold/10 hover:text-gold hover:translate-x-2"
                    }`}
                    style={{
                      transitionDelay: mobileMenuOpen ? `${index * 50}ms` : "0ms",
                    }}
                  >
                    <Icon
                      className={`w-6 h-6 transition-transform duration-300 ${
                        isActive ? "scale-110" : "group-hover:scale-110"
                      }`}
                    />
                    <span className="text-xl font-bold">{link.label}</span>
                    {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-gold animate-pulse" />}
                  </Link>
                )
              })}
            </div>

            {/* CTA tlačítko */}
            <div
              className={`max-w-md mx-auto w-full transition-all duration-500 ${
                mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: mobileMenuOpen ? "300ms" : "0ms" }}
            >
              <Link href="/kontakt" className="block">
                <Button
                  size="lg"
                  className="w-full bg-gold text-primary-dark hover:bg-gold/90 font-bold py-6 text-lg shadow-lg shadow-gold/20 flex items-center justify-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  Nezávazná poptávka
                </Button>
              </Link>

              {/* Kontaktní informace */}
              <div className="mt-6 text-center space-y-2">
                <p className="text-primary-foreground/60 text-sm">Máte dotaz?</p>
                <a
                  href="tel:+420774335592"
                  className="block text-gold font-semibold hover:text-gold/80 transition-colors"
                >
                  +420 774 335 592
                </a>
                <a
                  href="mailto:firma@artdum.cz"
                  className="block text-primary-foreground/80 text-sm hover:text-gold transition-colors"
                >
                  firma@artdum.cz
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
