"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { usePathname } from 'next/navigation'
import { Home, Building2, Wrench, Briefcase, Star, BookOpen, Phone, Menu, X } from 'lucide-react'
import { ThemeToggle } from "@/components/theme-toggle"

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
    <>
      <header className="sticky top-0 z-100 w-full border-b border-border/40 backdrop-blur-md bg-navy/95 dark:bg-background/95">
        <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 relative z-110">
            <Image
              src="/logo.jpg"
              alt="ART DUM - Stavební firma"
              width={160}
              height={120}
              className="h-auto w-auto max-h-[45px] md:max-h-[65px] object-contain"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm xl:text-base font-bold px-3 xl:px-4 py-2 rounded-lg transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-accent/20 text-accent shadow-sm" 
                    : "text-white dark:text-foreground hover:bg-white/10 dark:hover:bg-accent/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
            <Link href="/kontakt" className="ml-2">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-4 xl:px-6 shadow-lg shadow-accent/20 transition-all duration-200 hover:shadow-accent/30 hover:scale-105"
              >
                Nezávazná poptávka
              </Button>
            </Link>
          </nav>

          <div className="lg:hidden flex items-center gap-2 relative z-110">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/10 dark:hover:bg-accent/10 transition-colors duration-200"
              aria-label={mobileMenuOpen ? "Zavřít menu" : "Otevřít menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7 text-accent" strokeWidth={2.5} />
              ) : (
                <Menu className="w-7 h-7 text-accent" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-90 lg:hidden">
          <div 
            className="absolute inset-0 bg-navy dark:bg-background"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 pointer-events-none" />

          <nav className="relative z-10 flex flex-col h-full pt-24 pb-8 px-6 overflow-y-auto">
            <div className="flex-1 flex flex-col justify-center space-y-2 max-w-sm mx-auto w-full">
              {navLinks.map((link, index) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`group flex items-center gap-4 py-4 px-5 rounded-xl transition-all duration-300 transform animate-in slide-in-from-left ${
                      isActive
                        ? "bg-accent/20 text-accent scale-105 shadow-lg shadow-accent/10"
                        : "text-white dark:text-foreground hover:bg-white/10 dark:hover:bg-accent/10 hover:text-accent hover:scale-105"
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: "both"
                    }}
                  >
                    <div
                      className={`p-2.5 rounded-lg transition-all duration-300 ${
                        isActive ? "bg-accent/30" : "bg-white/10 dark:bg-accent/10 group-hover:bg-white/20 dark:group-hover:bg-accent/20"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isActive ? "scale-110 text-accent" : "group-hover:scale-110"
                        }`}
                        strokeWidth={2.5}
                      />
                    </div>
                    <span className="text-lg font-bold flex-1">{link.label}</span>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-lg shadow-accent/50" />
                    )}
                  </Link>
                )
              })}
            </div>

            <div className="max-w-sm mx-auto w-full space-y-4 animate-in slide-in-from-bottom duration-500" style={{ animationDelay: "350ms", animationFillMode: "both" }}>
              <Link href="/kontakt" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  size="lg"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold py-6 text-base shadow-xl shadow-accent/30 flex items-center justify-center gap-3 transition-all duration-200 hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  Nezávazná poptávka
                </Button>
              </Link>

              <div className="bg-white/5 dark:bg-card/50 backdrop-blur-sm rounded-xl p-5 border border-white/10 dark:border-border">
                <p className="text-white/60 dark:text-muted-foreground text-xs font-medium mb-3 uppercase tracking-wider">
                  Máte dotaz? Kontaktujte nás
                </p>
                <a
                  href="tel:+420774335592"
                  className="flex items-center gap-2 text-accent font-bold text-lg hover:text-accent/80 transition-colors mb-2"
                >
                  <Phone className="w-4 h-4" />
                  +420 774 335 592
                </a>
                <a
                  href="mailto:firma@artdum.cz"
                  className="text-white/80 dark:text-muted-foreground text-sm hover:text-accent transition-colors block"
                >
                  firma@artdum.cz
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
