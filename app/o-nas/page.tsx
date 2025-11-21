import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  Award,
  Users,
  Target,
  Sparkles,
  TrendingUp,
  Shield,
  DollarSign,
  Zap,
  Star,
  Clock,
  BadgeCheck,
  Hammer,
  Wrench,
} from "lucide-react"
import { sanityFetch } from "@/sanity/lib/fetch"
import { ABOUT_QUERY, CERTIFICATES_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { Button } from "@/components/ui/button"
import { PortableText } from "next-sanity"

export const metadata: Metadata = {
  title: "O nás | 23 let zkušeností ve stavebnictví | Oleh Kulish, OSVČ - ART DUM | Třebíč",
  description:
    "Stavební firma Oleh Kulish, OSVČ - ART DUM s 23 lety zkušeností v Třebíči a okolí. Specialisté na rekonstrukce bytů, domů a zateplení fasád. Kvalifikovaní odborníci s nostrifikací vzdělání a certifikáty.",
  keywords: [
    "o firmě ART DUM",
    "tým stavební firmy",
    "zkušenosti stavby",
    "certifikáty stavební",
    "kvalifikace",
    "Třebíč stavební firma",
    "Oleh Kulish",
  ],
  openGraph: {
    title: "O nás | Oleh Kulish, OSVČ - ART DUM | Třebíč",
    description: "23 let zkušeností ve stavebnictví. Poznejte náš tým a naše hodnoty.",
    url: "https://artdum.cz/o-nas",
  },
  alternates: {
    canonical: "https://artdum.cz/o-nas",
  },
}

export default async function AboutPage() {
  const [aboutData, certificates] = await Promise.all([
    sanityFetch<any>({ query: ABOUT_QUERY }),
    sanityFetch<any[]>({ query: CERTIFICATES_QUERY }),
  ])

  // Fallback data pokud v Sanity nejsou data
  const defaultAbout = {
    heroHeading: "O firmě ART DUM",
    heroSubheading: "Profesionální stavební služby s 23 lety zkušeností",
    experience: "23 let zkušeností",
    story: null,
    teamMembers: [],
    usp: [
      {
        title: "Férová cena",
        description: "Transparentní kalkulace bez skrytých poplatků",
        icon: "DollarSign",
      },
      {
        title: "Rychlost",
        description: "Dodržování termínů a efektivní realizace",
        icon: "Zap",
      },
      {
        title: "Kvalita",
        description: "Precizní práce a dlouhá záruka",
        icon: "Star",
      },
    ],
  }

  const about = aboutData || defaultAbout

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "GeneralContractor",
      name: "Oleh Kulish, OSVČ - ART DUM",
      foundingDate: "2001",
      description: "Profesionální stavební firma s 23 lety zkušeností v regionu Třebíč",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Karlovo nám 44/33",
        addressLocality: "Třebíč",
        postalCode: "674 01",
        addressCountry: "CZ",
      },
      telephone: "+420774335592",
      email: "firma@artdum.cz",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>Profesionální stavební řešení s 23 lety zkušeností</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent leading-tight">
              O firmě Oleh Kulish, OSVČ - ART DUM
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Jsme specialisté na rekonstrukce bytů, domů a zateplení fasád v Třebíči a okolí (kraj Vysočina). Firma
              vedená Oleh Kulishem, OSVČ s mateřskou firmou 23 let na trhu přináší zkušenosti, kvalitu a spolehlivost.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      {about.story && (
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gold/10 rounded-lg">
                  <Users className="w-8 h-8 text-gold" />
                </div>
                <h2 className="text-4xl font-black text-foreground">Náš příběh</h2>
              </div>
              <div className="prose prose-lg max-w-none text-foreground leading-relaxed">
                <PortableText value={about.story} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* USP Section */}
      {about.usp && about.usp.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 bg-gold/10 rounded-lg">
                  <Target className="w-8 h-8 text-gold" />
                </div>
                <h2 className="text-4xl font-black text-foreground">Proč zvolit Oleh Kulish, OSVČ - ART DUM</h2>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
                Naše hodnoty a přístup k práci
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {about.usp.map((item: any, index: number) => {
                const iconMap: Record<string, any> = {
                  DollarSign: DollarSign,
                  Zap: Zap,
                  Star: Star,
                  Shield: Shield,
                  TrendingUp: TrendingUp,
                  Sparkles: Sparkles,
                  Clock: Clock,
                  BadgeCheck: BadgeCheck,
                  Hammer: Hammer,
                  Wrench: Wrench,
                }

                const iconName = item.icon || ["DollarSign", "Zap", "Star"][index % 3]
                const IconComponent = iconMap[iconName] || Shield

                return (
                  <div
                    key={index}
                    className="group relative bg-card p-8 rounded-2xl border-2 border-border hover:border-gold/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-gold via-gold/90 to-gold/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-gold/30 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-gold/40 transition-all duration-300">
                        <IconComponent className="w-10 h-10 text-navy dark:text-white" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-gold transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {about.teamMembers && about.teamMembers.length > 0 && (
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 bg-gold/10 rounded-lg">
                  <Users className="w-8 h-8 text-gold" />
                </div>
                <h2 className="text-4xl font-black text-foreground">Náš tým</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {about.teamMembers.map((member: any, index: number) => (
                <div
                  key={index}
                  className="group bg-card rounded-2xl overflow-hidden border-2 border-border hover:border-gold/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                >
                  {member.photo && (
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={urlFor(member.photo)?.width(400).height(400).url() || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">{member.name}</h3>
                    <p className="text-gold font-semibold mb-3">{member.position}</p>
                    <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Qualifications Section */}
      {about.qualifications && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gold/10 rounded-lg">
                  <Award className="w-8 h-8 text-gold" />
                </div>
                <h2 className="text-4xl font-black text-foreground">Kvalifikace a nostrifikace</h2>
              </div>
              <div className="prose prose-lg max-w-none text-foreground bg-card p-10 rounded-2xl border-2 border-border shadow-xl leading-relaxed">
                <p className="text-lg leading-relaxed">
                  <strong className="text-foreground">Oleh Kulish</strong>, majitel a jednatel firmy Oleh Kulish, OSVČ -
                  ART DUM, disponuje nostrifikovaným vzděláním z oboru{" "}
                  <strong className="text-foreground">kvalifikovaný pracovník stavebních prací</strong> (č. AK:
                  21981987, vydané Střední odborné technické učiliště č. 12, město Mižhirja, Ukrajina, 2003).
                </p>
                <p className="text-lg leading-relaxed mt-4">
                  Vzdělání bylo{" "}
                  <strong className="text-foreground">nostrifikováno Krajským úřadem kraje Vysočina</strong> dne 15. 10.
                  2024 s platností v České republice. Nostrifikace potvrzuje rovnocennost zahraničního vzdělání s českým
                  systémem a umožňuje výkon kvalifikované stavební činnosti v souladu s českými předpisy.
                </p>
                <p className="text-lg leading-relaxed mt-4">
                  Kombinace <strong className="text-foreground">23 let praktických zkušeností</strong> s oficiálně
                  uznanou kvalifikací je zárukou profesionality a odbornosti našich služeb.
                </p>
                <PortableText value={about.qualifications} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Certificates Section */}
      {certificates && certificates.length > 0 && (
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 bg-gold/10 rounded-lg">
                  <Award className="w-8 h-8 text-gold" />
                </div>
                <h2 className="text-4xl font-black text-foreground">Naše certifikáty a dokumenty</h2>
              </div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8 font-medium">
                Osvědčení o kvalifikaci a odbornosti
              </p>

              <div className="max-w-3xl mx-auto bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/30 dark:to-amber-950/20 border-2 border-amber-300 dark:border-amber-600/50 rounded-2xl p-8 mb-8 shadow-lg">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-black text-xl text-gray-900 dark:text-gray-100 mb-3 leading-tight">
                      Upozornění k citlivým údajům
                    </h3>
                    <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
                      Z důvodu ochrany osobních a citlivých údajů v souladu s legislativou zde zobrazujeme pouze
                      ukázkové verze dokumentů s popisem.
                    </p>
                    <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                      <strong className="text-gray-900 dark:text-gray-100 font-bold">
                        Originální dokumenty včetně nostrifikací a certifikátů rádi předložíme při osobním jednání
                      </strong>{" "}
                      s našimi zákazníky a obchodními partnery. Pro více informací nás neváhejte kontaktovat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {certificates.map((cert: any) => (
                <div
                  key={cert._id}
                  className="group bg-card rounded-2xl overflow-hidden border-2 border-border hover:border-gold/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative"
                >
                  <div className="absolute top-4 right-4 z-10 bg-amber-500/90 dark:bg-amber-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    UKÁZKA
                  </div>
                  {cert.image && (
                    <div className="relative h-80 w-full bg-card p-6 border-b-2 border-border">
                      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <div className="text-gray-300 dark:text-gray-700 text-6xl font-black opacity-20 rotate-[-25deg] select-none">
                          UKÁZKOVÝ
                          <br />
                          OBRÁZEK
                        </div>
                      </div>
                      <Image
                        src={urlFor(cert.image)?.width(600).height(600).url() || "/placeholder.svg"}
                        alt={cert.image.alt || cert.title}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 opacity-30 blur-sm"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                      {cert.title}
                    </h3>
                    {cert.issuer && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                        <p className="text-sm text-gold font-semibold">{cert.issuer}</p>
                      </div>
                    )}
                    {cert.issueDate && (
                      <p className="text-sm text-muted-foreground mb-3">
                        {new Date(cert.issueDate).toLocaleDateString("cs-CZ", {
                          year: "numeric",
                          month: "long",
                        })}
                      </p>
                    )}
                    {cert.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{cert.description}</p>
                    )}
                    <p className="text-xs text-amber-700 dark:text-amber-300 font-semibold bg-amber-50 dark:bg-amber-950/50 px-3 py-2 rounded-lg border border-amber-200 dark:border-amber-700">
                      ✓ Originál k nahlédnutí při osobním jednání
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Kontaktujte nás pro nezávaznou konzultaci a cenovou nabídku
            </h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">Máte projekt? Pojďme ho zrealizovat společně</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="group bg-gold hover:bg-gold/90 text-navy font-bold text-lg px-8 py-6 h-auto shadow-2xl shadow-gold/20 hover:scale-105 transition-all"
              >
                <Link href="/kontakt" className="flex items-center gap-2">
                  <span>Nezávazná poptávka</span>
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-white/20 text-white hover:bg-white hover:text-navy bg-white/5 backdrop-blur-sm font-semibold text-lg px-8 py-6 h-auto hover:scale-105 transition-all"
              >
                <Link href="/portfolio">Naše realizace</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
