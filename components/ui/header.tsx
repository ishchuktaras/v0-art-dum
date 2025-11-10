import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary-dark backdrop-blur supports-[backdrop-filter]:bg-primary-dark/95">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.jpg"
            alt="ART DUM logo"
            width={180}
            height={60}
            className="h-auto w-auto max-h-[60px]"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-semibold text-primary-foreground hover:text-gold transition-colors">
            Domů
          </Link>
          <Link
            href="/o-nas"
            className="text-sm font-semibold text-primary-foreground hover:text-gold transition-colors"
          >
            O nás
          </Link>
          <Link
            href="/sluzby"
            className="text-sm font-semibold text-primary-foreground hover:text-gold transition-colors"
          >
            Služby
          </Link>
          <Link
            href="/portfolio"
            className="text-sm font-semibold text-primary-foreground hover:text-gold transition-colors"
          >
            Portfolio
          </Link>
          <Link
            href="/hodnoceni"
            className="text-sm font-semibold text-primary-foreground hover:text-gold transition-colors"
          >
            Hodnocení
          </Link>
          <Link
            href="/blog"
            className="text-sm font-semibold text-primary-foreground hover:text-gold transition-colors"
          >
            Blog
          </Link>
          <Link href="/kontakt">
            <Button className="bg-gold text-primary-dark hover:bg-gold/90 font-semibold">Nezávazná poptávka</Button>
          </Link>
        </nav>

        <button className="md:hidden text-primary-foreground">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}
