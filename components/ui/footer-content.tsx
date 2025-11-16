'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook } from 'lucide-react'

interface FooterContentProps {
  contactInfo?: {
    phone?: string
    email?: string
    address?: string
    ico?: string
    socialLinks?: {
      facebook?: string
      instagram?: string
      linkedin?: string
    }
  }
}

export function FooterContent({ contactInfo }: FooterContentProps) {
  const phone = contactInfo?.phone || '+420 774 335 592'
  const email = contactInfo?.email || 'firma@artdum.cz'
  const address = contactInfo?.address || 'Karlovo nám 44/33, 674 01 Třebíč'
  const ico = contactInfo?.ico || 'IČO: 22401261'

  return (
    <footer className="border-t bg-[#0b192f] text-white/80">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo a popis */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="ART DUM Logo"
                width={120}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-white/70">
              Profesionální stavební služby s 23 lety zkušeností v regionu Třebíč a okolí.
            </p>
          </div>

          {/* Rychlé odkazy */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Rychlé odkazy</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/o-nas" className="hover:text-primary-gold transition-colors">
                  O nás
                </Link>
              </li>
              <li>
                <Link href="/sluzby" className="hover:text-primary-gold transition-colors">
                  Služby
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-primary-gold transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/hodnoceni" className="hover:text-primary-gold transition-colors">
                  Hodnocení
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary-gold transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Kontakt</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`tel:${phone}`} className="hover:text-primary-gold transition-colors">
                  {phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="hover:text-primary-gold transition-colors">
                  {email}
                </a>
              </li>
              <li className="text-white/70">{address}</li>
              <li className="text-white/70">{ico}</li>
            </ul>
          </div>

          {/* Sociální sítě */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Sledujte nás</h3>
            <div className="flex gap-4">
              {contactInfo?.socialLinks?.facebook && (
                <a
                  href={contactInfo.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-gold transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Spodní řádek */}
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-white/60">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p>© 2025 ART DUM. Všechna práva vyhrazena.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/ochrana-osobnich-udaju" className="hover:text-white transition-colors">
                Ochrana osobních údajů
              </Link>
              <Link href="/obchodni-podminky" className="hover:text-white transition-colors">
                Obchodní podmínky
              </Link>
              <Link href="/pravni-ustanoveni" className="hover:text-white transition-colors">
                Právní ustanovení
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
