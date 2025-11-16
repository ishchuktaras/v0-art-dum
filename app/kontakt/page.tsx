import { ContactFormClient } from "./contact-form-client"
import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/fetch"
import { CONTACT_INFO_QUERY } from "@/sanity/lib/queries"

interface ContactInfo {
  _id: string
  phone?: string
  email?: string
  address?: string
  ico?: string
}

export const metadata: Metadata = {
  title: "Kontakt | Nezávazná poptávka | ART DUM Třebíč | ☎ +420 774 335 592",
  description:
    "Kontaktujte stavební firmu ART DUM pro nezávaznou cenovou nabídku. Telefon: +420 774 335 592, Email: firma@artdum.cz, Adresa: Karlovo nám 44/33, Třebíč. Odpovíme do 24 hodin.",
  keywords: [
    "kontakt ART DUM",
    "poptávka stavba",
    "cenová nabídka",
    "telefon stavební firma",
    "Třebíč kontakt",
  ],
  openGraph: {
    title: "Kontakt | ART DUM Třebíč",
    description: "Kontaktujte nás pro nezávaznou cenovou nabídku. Odpovíme do 24 hodin.",
    url: "https://artdum.cz/kontakt",
  },
  alternates: {
    canonical: "https://artdum.cz/kontakt",
  },
}

export default async function ContactPage() {
  let contactInfo: ContactInfo | null = null
  try {
    contactInfo = await sanityFetch<ContactInfo>({
      query: CONTACT_INFO_QUERY,
      tags: ["contactInfo"],
    })
  } catch (error) {
    console.error("[v0] Error fetching contact info:", error)
  }

  const phone = contactInfo?.phone || "+420774335592"
  const email = contactInfo?.email || "firma@artdum.cz"
  const address = contactInfo?.address || "Karlovo nám 44/33, Třebíč"
  const ico = contactInfo?.ico || "22401261"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "GeneralContractor",
      name: "ART DUM",
      telephone: phone.replace(/\s/g, ''),
      email: email,
      address: {
        "@type": "PostalAddress",
        streetAddress: address.split(',')[0] || "Karlovo nám 44/33",
        addressLocality: "Třebíč",
        postalCode: "674 01",
        addressCountry: "CZ",
      },
      openingHours: "Mo-Fr 07:00-17:00, Sa 08:00-12:00",
    },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      
      <ContactFormClient />
    </div>
  )
}
