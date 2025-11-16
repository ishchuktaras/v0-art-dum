import Link from "next/link"
import Image from "next/image"
import { sanityFetch } from "@/sanity/lib/fetch"
import { CONTACT_INFO_QUERY } from "@/sanity/lib/queries"

interface ContactInfo {
  _id: string
  phone?: string
  email?: string
  address?: string
  ico?: string
  openingHours?: Array<{ day: string; hours: string }>
  socialLinks?: {
    facebook?: string
    instagram?: string
    linkedin?: string
  }
}

export async function Footer() {
  const currentYear = new Date().getFullYear()
  
  let contactInfo: ContactInfo | null = null
  try {
    contactInfo = await sanityFetch<ContactInfo>({
      query: CONTACT_INFO_QUERY,
      tags: ["contactInfo"],
    })
  } catch (error) {
    console.error("[v0] Error fetching contact info:", error)
  }

  // Fallback data
  const phone = contactInfo?.phone || "+420 774 335 592"
  const email = contactInfo?.email || "firma@artdum.cz"
  const address = contactInfo?.address || "Karlovo nám 44/33\n674 01 Třebíč"
  const ico = contactInfo?.ico || "22401261"

  return (
    <footer className="bg-primary-dark text-primary-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Logo a popis */}
          <div className="col-span-1 sm:col-span-2">
            <Image
              src="/logo.jpg"
              alt="ART DUM - Stavební firma"
              width={200}
              height={150}
              className="h-auto w-auto max-h-[70px] md:max-h-[80px] mb-4"
            />
            <p className="text-sm text-white/80 mb-4">
              Profesionální stavební služby s 23 lety zkušeností v regionu Třebíč a okolí.
            </p>
            <div className="flex space-x-4">
              {contactInfo?.socialLinks?.facebook && (
                <a
                  href={contactInfo.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold/80 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Rychlé odkazy */}
          <div>
            <h3 className="font-bold text-gold mb-4">Rychlé odkazy</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/o-nas" className="text-sm text-white/80 hover:text-gold transition-colors">
                  O nás
                </Link>
              </li>
              <li>
                <Link href="/sluzby" className="text-sm text-white/80 hover:text-gold transition-colors">
                  Služby
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-sm text-white/80 hover:text-gold transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/hodnoceni" className="text-sm text-white/80 hover:text-gold transition-colors">
                  Hodnocení
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-white/80 hover:text-gold transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="font-bold text-gold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-white/80 hover:text-gold transition-colors">
                  {phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="text-white/80 hover:text-gold transition-colors">
                  {email}
                </a>
              </li>
              <li className="text-white/70 whitespace-pre-line">
                {address}
              </li>
              <li className="text-white/70">IČO: {ico}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-6 md:mt-8 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs md:text-sm text-white/70 text-center md:text-left">
            © {currentYear} ART DUM. Všechna práva vyhrazena.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-3 md:gap-4">
            <Link href="/gdpr" className="text-xs md:text-sm text-white/70 hover:text-gold transition-colors">
              Ochrana osobních údajů
            </Link>
            <span className="text-white/70">•</span>
            <Link href="/obchodni-podminky" className="text-xs md:text-sm text-white/70 hover:text-gold transition-colors">
              Obchodní podmínky
            </Link>
            <span className="text-white/70">•</span>
            <Link href="/pravni-ustanoveni" className="text-xs md:text-sm text-white/70 hover:text-gold transition-colors">
              Právní ustanovení
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
