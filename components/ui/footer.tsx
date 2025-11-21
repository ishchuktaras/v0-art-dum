"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook } from "lucide-react"

export function Footer() {
  // Hardcodované kontaktní údaje - později mohou být načteny z CMS přes API route
  const phone = "+420 774 335 592"
  const email = "firma@artdum.cz"
  const address = "Karlovo nám 44/33, 674 01 Třebíč"
  const ico = "IČO: 22401261"

  return (
    <footer className="border-t border-border bg-navy dark:bg-background text-white dark:text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo a popis */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image src="/logo.jpg" alt="ART DUM Logo" width={160} height={80} className="h-14 w-auto" priority />
            </Link>
            <p className="text-sm text-white/70 dark:text-muted-foreground">
              Profesionální stavební služby s 23 lety zkušeností v regionu Třebíč a okolí.
            </p>
          </div>

          {/* Rychlé odkazy */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Rychlé odkazy</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-white/80 dark:text-muted-foreground hover:text-accent transition-colors">
                  Domů
                </Link>
              </li>
              <li>
                <Link
                  href="/o-nas"
                  className="text-white/80 dark:text-muted-foreground hover:text-accent transition-colors"
                >
                  O nás
                </Link>
              </li>
              <li>
                <Link
                  href="/sluzby"
                  className="text-white/80 dark:text-muted-foreground hover:text-accent transition-colors"
                >
                  Služby
                </Link>
              </li>
              <li>
                <Link
                  href="/cenik"
                  className="text-white/80 dark:text-muted-foreground hover:text-accent transition-colors"
                >
                  Ceník
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-white/80 dark:text-muted-foreground hover:text-accent transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/hodnoceni"
                  className="text-white/80 dark:text-muted-foreground hover:text-accent transition-colors"
                >
                  Hodnocení
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-white/80 dark:text-muted-foreground hover:text-accent transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-white/80 dark:text-muted-foreground hover:text-accent transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Kontakt</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`tel:${phone}`}
                  className="text-white/80 dark:text-muted-foreground hover:text-accent transition-colors"
                >
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="text-white/80 dark:text-muted-foreground hover:text-accent transition-colors"
                >
                  {email}
                </a>
              </li>
              <li className="text-white/70 dark:text-muted-foreground">{address}</li>
              <li className="text-white/70 dark:text-muted-foreground">{ico}</li>
            </ul>
          </div>

          {/* Sociální sítě */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Sledujte nás</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/artdum"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 dark:text-muted-foreground hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>

            <div className="mt-6">
              <a
                href="https://www.firmy.cz/detail/13918492-oleh-kulish-osvc-art-dum-trebic.html#pridat-hodnoceni"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-block transition-transform hover:scale-105"
              >
                <img
                  width="249"
                  height="60"
                  src="https://www.firmy.cz/img/widgets/firmy-ohodnotte-nas-tmave.svg"
                  alt='Oleh Kulish, OSVČ - "ART DUM" na Firmy.cz'
                  className="h-auto max-w-[200px]"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Spodní řádek */}
        <div className="mt-8 border-t border-white/10 dark:border-border pt-8 text-center text-sm text-white/60 dark:text-muted-foreground">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p>© 2025 Oleh Kulish, OSVČ - ART DUM. Všechna práva vyhrazena.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/ochrana-osobnich-udaju" className="hover:text-accent transition-colors">
                Ochrana osobních údajů
              </Link>
              <Link href="/obchodni-podminky" className="hover:text-accent transition-colors">
                Obchodní podmínky
              </Link>
              <Link href="/pravni-ustanoveni" className="hover:text-accent transition-colors">
                Právní ustanovení
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 dark:border-border">
            <p className="text-xs text-white/50 dark:text-muted-foreground">
              Web vytvořil{" "}
              <a
                href="https://webnamiru.site"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent/70 hover:text-accent transition-colors font-medium"
              >
                Taras Ishchuk, OSVČ - webnamiru.site
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
