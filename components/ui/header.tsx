"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

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
    { href: "/", label: "Domů" },
    { href: "/o-nas", label: "O nás" },
    { href: "/sluzby", label: "Služby" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/hodnoceni", label: "Hodnocení" },
    { href: "/blog", label: "Blog" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary-dark backdrop-blur supports-backdrop-filter:bg-primary-dark/95">
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 z-50">
          <Image
            src="/logo.jpg"
            alt="ART DUM logo"
            width={140}
            height={47}
            className="h-auto w-auto max-h-[40px] md:max-h-[60px]"
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-primary-foreground z-50 p-2"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-primary-dark z-40 lg:hidden transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col items-center justify-center h-full space-y-8 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-2xl font-bold transition-colors ${
                  pathname === link.href ? "text-gold" : "text-primary-foreground hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/kontakt" className="w-full max-w-xs">
              <Button size="lg" className="w-full bg-gold text-primary-dark hover:bg-gold/90 font-bold">
                Nezávazná poptávka
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
