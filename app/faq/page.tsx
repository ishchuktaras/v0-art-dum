import type { Metadata } from "next"
import Link from "next/link"
import { ChevronDown, MessageCircle, Phone, Mail } from "lucide-react"
import { sanityFetch } from "@/sanity/lib/fetch"
import { FEATURED_PORTFOLIO_QUERY } from "@/sanity/lib/queries"
import { urlForHeroImage } from "@/sanity/lib/image"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Často kladené otázky (FAQ) | ART DUM",
  description: "Odpovědi na nejčastější otázky ohledně stavebních služeb, rekonstrukcí a spolupráce s firmou ART DUM.",
}

const faqs = [
  {
    category: "Obecné",
    questions: [
      {
        q: "Jak dlouho působíte na trhu?",
        a: "Působíme na trhu již více než 23 let. Během této doby jsme úspěšně dokončili přes 150 projektů v regionu Třebíč a okolí.",
      },
      {
        q: "V jakých oblastech působíte?",
        a: "Naše služby poskytujeme především v Třebíči a okolí, ale realizujeme projekty v celém regionu Vysočina.",
      },
      {
        q: "Jste pojištěni?",
        a: "Ano, máme profesní pojištění a všechna potřebná osvědčení a certifikáty. Jsme zapsáni v Certifikay jako společnost s ověřenou odborností.",
      },
    ],
  },
  {
    category: "Služby a realizace",
    questions: [
      {
        q: "Jaké služby nabízíte?",
        a: "Specializujeme se na kompletní rekonstrukce bytů a domů, zateplení fasád, výměnu oken a dveří, pokládku podlah a další stavební práce. Detailní přehled služeb najdete v sekci Služby.",
      },
      {
        q: "Jak dlouho trvá realizace projektu?",
        a: "Doba realizace závisí na rozsahu projektu. Menší rekonstrukce trvají obvykle 2-4 týdny, komplexní rekonstrukce bytů 1-3 měsíce. Přesný harmonogram vytvoříme po prohlídce a konzultaci.",
      },
      {
        q: "Zajišťujete i projektovou dokumentaci?",
        a: "Ano, spolupracujeme s ověřenými architekty a projektanty. Můžeme zajistit kompletní projektovou dokumentaci včetně všech potřebných povolení.",
      },
      {
        q: "Provádíte pouze kompletní rekonstrukce nebo i dílčí práce?",
        a: "Provádíme jak kompletní rekonstrukce, tak i dílčí práce jako výměna podlah, malování, sádrokartonové práce nebo instalatérské práce.",
      },
    ],
  },
  {
    category: "Ceny a platba",
    questions: [
      {
        q: "Jak se tvorí cena projektu?",
        a: "Cena závisí na rozsahu prací, použitých materiálech a složitosti projektu. Po nezávazné konzultaci a prohlídce vytvoříme detailní cenovou nabídku.",
      },
      {
        q: "Je konzultace a prohlídka zdarma?",
        a: "Ano, první konzultace a prohlídka objektu jsou zcela zdarma a nezávazné.",
      },
      {
        q: "Jaké platební podmínky nabízíte?",
        a: "Standardně pracujeme s platbami na základě milníků projektu. Konkrétní platební podmínky vždy projednáme individuálně a uvedeme ve smlouvě.",
      },
      {
        q: "Nabízíte možnost financování?",
        a: "V současné době nenabízíme přímé financování, ale rádi vám poradíme s možnostmi dotací nebo výhodných úvěrů na rekonstrukce.",
      },
    ],
  },
  {
    category: "Spolupráce",
    questions: [
      {
        q: "Jak probíhá první konzultace?",
        a: "Kontaktujte nás telefonicky nebo e-mailem. Domluvíme si termín osobní schůzky, kde si probereme vaše požadavky a provedeme prohlídku objektu. Následně vám připravíme cenovou nabídku.",
      },
      {
        q: "Budu mít přehled o průběhu prací?",
        a: "Ano, pravidelně vás budeme informovat o postupu prací. V případě potřeby můžeme nastavit pravidelné kontrolní schůzky.",
      },
      {
        q: "Co když se v průběhu objeví něco neplánovaného?",
        a: "O jakýchkoliv nečekaných situacích vás okamžitě informujeme a společně najdeme optimální řešení. Žádné práce navíc neprovádíme bez vašeho souhlasu.",
      },
      {
        q: "Poskytujete záruku na provedené práce?",
        a: "Ano, na všechny provedené práce poskytujeme záruku v souladu s platnou legislativou. Konkrétní záruční podmínky jsou vždy součástí smlouvy o dílo.",
      },
    ],
  },
]

export default async function FAQPage() {
  const featuredPortfolio = await sanityFetch<any[]>({
    query: FEATURED_PORTFOLIO_QUERY,
    tags: ["portfolio"],
  })

  const heroBackgroundImage = featuredPortfolio?.[6]?.mainImage ? urlForHeroImage(featuredPortfolio[6].mainImage) : null

  return (
    <div className="min-h-screen bg-background">
      {/* Hero sekce */}
      <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2545] to-[#0b192f] py-20">
        {heroBackgroundImage && (
          <div className="absolute inset-0">
            <Image
              src={heroBackgroundImage || "/placeholder.svg"}
              alt="FAQ ART DUM"
              fill
              className="object-cover scale-110"
              priority
              quality={85}
            />
            {/* Multi-layer gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b192f]/95 via-[#0f2545]/90 to-[#0b192f]/95" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b192f]/90 via-transparent to-[#0b192f]/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-block rounded-full bg-primary-gold/10 px-4 py-2 text-sm font-semibold text-primary-gold">
              Máte otázky? Máme odpovědi
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Často kladené otázky
            </h1>
            <p className="text-pretty text-lg text-white/70 md:text-xl">
              Odpovědi na nejčastější otázky ohledně našich služeb, realizací a spolupráce. Nenašli jste odpověď?
              Kontaktujte nás!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ sekce */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-12">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <details
                      key={index}
                      className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                    >
                      <summary className="flex cursor-pointer items-start justify-between gap-4 font-semibold text-foreground list-none">
                        <span className="text-left">{faq.q}</span>
                        <ChevronDown className="h-5 w-5 flex-shrink-0 text-primary-gold transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="mt-4 text-muted-foreground leading-relaxed">{faq.a}</div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA sekce */}
      <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2545] to-[#0b192f] py-20">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <MessageCircle className="mx-auto mb-6 h-16 w-16 text-primary-gold" />
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Nenašli jste odpověď na svou otázku?</h2>
            <p className="mb-8 text-lg text-white/70">
              Neváhejte nás kontaktovat. Rádi vám poradíme a odpovíme na všechny vaše dotazy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-gold px-6 py-3 font-semibold text-navy transition-all hover:bg-primary-gold/90 hover:scale-105 hover:shadow-lg"
              >
                <Mail className="h-5 w-5" />
                Kontaktní formulář
              </Link>
              <a
                href="tel:+420774335592"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white bg-white/20 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-105 hover:shadow-lg"
              >
                <Phone className="h-5 w-5" />
                +420 774 335 592
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
