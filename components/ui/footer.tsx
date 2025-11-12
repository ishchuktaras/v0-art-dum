import Link from "next/link"
import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-dark text-primary-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Logo a popis */}
          <div className="col-span-1 sm:col-span-2">
            <Image
              src="/logo.jpg"
              alt="ART DUM logo"
              width={180}
              height={60}
              className="h-auto w-auto max-h-[60px] mb-4"
            />
            <p className="text-sm text-muted-foreground mb-4">
              Profesionální stavební služby s 23 lety zkušeností v regionu Třebíč a okolí.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gold hover:text-gold/80 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Rychlé odkazy */}
          <div>
            <h3 className="font-bold text-gold mb-4">Rychlé odkazy</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/o-nas" className="text-sm hover:text-gold transition-colors">
                  O nás
                </Link>
              </li>
              <li>
                <Link href="/sluzby" className="text-sm hover:text-gold transition-colors">
                  Služby
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-sm hover:text-gold transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/hodnoceni" className="text-sm hover:text-gold transition-colors">
                  Hodnocení
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-gold transition-colors">
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
                <a href="tel:+420774335592" className="hover:text-gold transition-colors">
                  +420 774 335 592
                </a>
              </li>
              <li>
                <a href="mailto:firma@artdum.cz" className="hover:text-gold transition-colors">
                  firma@artdum.cz
                </a>
              </li>
              <li className="text-muted-foreground">
                Karlovo nám 44/33
                <br />
                674 01 Třebíč
              </li>
              <li className="text-muted-foreground">IČO: 22401261</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-6 md:mt-8 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} ART DUM. Všechna práva vyhrazena.
          </p>
          <div className="flex space-x-4">
            <Link href="/gdpr" className="text-xs md:text-sm text-muted-foreground hover:text-gold transition-colors">
              Ochrana osobních údajů
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
