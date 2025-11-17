import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Award, Users, Target, CheckCircle2, Sparkles, TrendingUp, Shield } from 'lucide-react'
import { sanityFetch } from "@/sanity/lib/fetch"
import { ABOUT_QUERY, CERTIFICATES_QUERY } from "@/sanity/lib/queries"
import { urlFor } from "@/sanity/lib/image"
import { Button } from "@/components/ui/button"
import { PortableText } from "next-sanity"

export const metadata: Metadata = {
  title: "O nás | 23 let zkušeností ve stavebnictví | ART DUM Třebíč",
  description:
    "Poznejte tým stavební firmy ART DUM. 23 let zkušeností v Třebíči a okolí. Kvalifikovaní odborníci s certifikáty, nostrifikací vzdělání. Férová cena, rychlost, kvalita.",
  keywords: [
    "o firmě ART DUM",
    "tým stavební firmy",
    "zkušenosti stavby",
    "certifikáty stavební",
    "kvalifikace",
    "Třebíč stavební firma",
  ],
  openGraph: {
    title: "O nás | ART DUM Třebíč",
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
    heroSubheading: "Jsme profesionální stavební firma s dlouholetými zkušenostmi v regionu Třebíč a okolí.",
    experience: "23 let zkušeností",
    story: null,
    teamMembers: [],
    usp: [
      {
        title: "Přijatelná cena",
        description: "Transparentní cenové kalkulace bez skrytých poplatků",
        icon: "DollarSign",
      },
      {
        title: "Rychlost",
        description: "Dodržování termínů a efektivní realizace projektů",
        icon: "Zap",
      },
      {
        title: "Kvalita",
        description: "Profesionální provedení s důrazem na detail",
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
      name: "ART DUM",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>Profesionální stavební řešení od roku 2001</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 bg-linear-to-r from-white to-white/80 bg-clip-text text-transparent leading-tight">
              O firmě ART DUM
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Jsme specialisté na rekonstrukce bytů, domů a zateplení fasád v Třebíči a okolí. Firma vedená Olenem Kostyshynem s mateřskou firmou 23 let na trhu.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      {about.story && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gold/10 rounded-lg">
                  <Users className="w-8 h-8 text-gold" />
                </div>
                <h2 className="text-4xl font-black text-navy">Náš příběh</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <PortableText value={about.story} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* USP Section */}
      {about.usp && about.usp.length > 0 && (
        <section className="py-20 bg-linear-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 bg-gold/10 rounded-lg">
                  <Target className="w-8 h-8 text-gold" />
                </div>
                <h2 className="text-4xl font-black text-navy">Proč zvolit ART DUM</h2>
              </div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Naše hodnoty a přístup k práci
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {about.usp.map((item: any, index: number) => {
                const icons = [Shield, TrendingUp, Sparkles]
                const IconComponent = icons[index % icons.length]
                
                return (
                  <div
                    key={index}
                    className="group relative bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-gold/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                    <div className="relative">
                      <div className="w-20 h-20 bg-linear-to-br from-gold via-gold/90 to-gold/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-gold/30 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-gold/40 transition-all duration-300">
                        <IconComponent className="w-10 h-10 text-white" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-2xl font-bold text-navy mb-4 group-hover:text-gold transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {index === 0 && "Naše práce se podléhá odbornému kvalitou certifikáty a diplomy. Používáme ověřené postupy a materiály, zbytečně obyčejům zasejí dlouhodobou životnost díla."}
                        {index === 1 && "Respektujeme váš čas. Díky efektivní koordinaci všech řemesel a 23 letům praxe dodržíme domluevné termíny, také zajišťujeme dokončování termíny, doda cíleme dokončení práce."}
                        {index === 2 && "Nabízíme férové a transparentní ceny. Připravíme jasný rozpočet bez skrytých poplatků. Propracuneme plány rozpočty dostupnými ekosm prácí bez ukrytých podaků."}
                      </p>
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
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 bg-gold/10 rounded-lg">
                  <Users className="w-8 h-8 text-gold" />
                </div>
                <h2 className="text-4xl font-black text-navy">Náš tým</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {about.teamMembers.map((member: any, index: number) => (
                <div
                  key={index}
                  className="group bg-gray-50 rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-gold/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                >
                  {member.photo && (
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={urlFor(member.photo)?.width(400).height(400).url() || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-navy mb-2">{member.name}</h3>
                    <p className="text-gold font-semibold mb-3">{member.position}</p>
                    <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Qualifications Section */}
      {about.qualifications && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gold/10 rounded-lg">
                  <Award className="w-8 h-8 text-gold" />
                </div>
                <h2 className="text-4xl font-black text-navy">Kvalifikace a certifikace</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 bg-white p-10 rounded-2xl border-2 border-gray-100 shadow-xl leading-relaxed">
                <PortableText value={about.qualifications} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Certificates Section */}
      {certificates && certificates.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 bg-gold/10 rounded-lg">
                  <Award className="w-8 h-8 text-gold" />
                </div>
                <h2 className="text-4xl font-black text-navy">Naše certifikáty</h2>
              </div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Osvědčení o kvalifikaci a odbornosti
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {certificates.map((cert: any) => (
                <div
                  key={cert._id}
                  className="group bg-linear-to-br from-gray-50 to-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-gold/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                >
                  {cert.image && (
                    <div className="relative h-72 w-full bg-white p-6 border-b-2 border-gray-100">
                      <Image
                        src={urlFor(cert.image)?.width(400).height(400).url() || "/placeholder.svg"}
                        alt={cert.image.alt || cert.title}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                      {cert.title}
                    </h3>
                    {cert.issuer && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                        <p className="text-sm text-gold font-semibold">{cert.issuer}</p>
                      </div>
                    )}
                    {cert.issueDate && (
                      <p className="text-sm text-gray-500 mb-3">
                        {new Date(cert.issueDate).toLocaleDateString("cs-CZ", {
                          year: "numeric",
                          month: "long",
                        })}
                      </p>
                    )}
                    {cert.description && (
                      <p className="text-gray-600 text-sm leading-relaxed">{cert.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative bg-linear-to-br from-[#0b192f] via-[#0f2342] to-[#0b192f] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Kontaktujte nás pro nezávaznou konzultaci a cenovou nabídku
            </h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              Máte projekt? Pojďme ho zrealizovat společně
            </p>
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
