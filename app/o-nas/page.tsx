import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Award, Users, Target, CheckCircle2 } from 'lucide-react'
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
    heroHeading: "O naší firmě",
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
      <section className="bg-navy text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-6">{about.heroHeading}</h1>
            <p className="text-xl text-gray-300 leading-relaxed">{about.heroSubheading}</p>
            {about.experience && (
              <div className="mt-8 inline-block bg-gold text-navy px-8 py-4 rounded-lg font-bold text-lg">
                {about.experience}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Story Section */}
      {about.story && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Users className="w-8 h-8 text-gold" />
                <h2 className="text-3xl font-bold text-navy">Náš příběh</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700">
                <PortableText value={about.story} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* USP Section */}
      {about.usp && about.usp.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Target className="w-8 h-8 text-gold" />
                <h2 className="text-3xl font-bold text-navy">Proč zvolit ART DUM</h2>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">Naše hodnoty a přístup k práci</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {about.usp.map((item: any, index: number) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {about.teamMembers && about.teamMembers.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Users className="w-8 h-8 text-gold" />
                <h2 className="text-3xl font-bold text-navy">Náš tým</h2>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {about.teamMembers.map((member: any, index: number) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  {member.photo && (
                    <div className="relative h-64 w-full">
                      <Image
                        src={urlFor(member.photo)?.width(400).height(400).url() || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-navy mb-2">{member.name}</h3>
                    <p className="text-gold font-semibold mb-3">{member.position}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Qualifications Section */}
      {about.qualifications && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-8 h-8 text-gold" />
                <h2 className="text-3xl font-bold text-navy">Kvalifikace a certifikace</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 bg-white p-8 rounded-lg shadow-lg">
                <PortableText value={about.qualifications} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Certificates Section */}
      {certificates && certificates.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Award className="w-8 h-8 text-gold" />
                <h2 className="text-3xl font-bold text-navy">Naše certifikáty</h2>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">Osvědčení o kvalifikaci a odbornosti</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {certificates.map((cert: any) => (
                <div
                  key={cert._id}
                  className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  {cert.image && (
                    <div className="relative h-64 w-full bg-white p-4">
                      <Image
                        src={urlFor(cert.image)?.width(400).height(400).url() || "/placeholder.svg"}
                        alt={cert.image.alt || cert.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-navy mb-2">{cert.title}</h3>
                    {cert.issuer && <p className="text-sm text-gold font-semibold mb-2">{cert.issuer}</p>}
                    {cert.issueDate && (
                      <p className="text-sm text-gray-500 mb-3">
                        {new Date(cert.issueDate).toLocaleDateString("cs-CZ", {
                          year: "numeric",
                          month: "long",
                        })}
                      </p>
                    )}
                    {cert.description && <p className="text-gray-600 text-sm">{cert.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-navy text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Máte projekt? Pojďme ho zrealizovat společně</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Kontaktujte nás pro nezávaznou konzultaci a cenovou nabídku
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-gold hover:bg-gold/90">
              <Link href="/kontakt">Nezávazná poptávka</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white hover:text-navy bg-transparent"
            >
              <Link href="/portfolio">Naše realizace</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
