import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { ContactFormClient } from "./contact-form-client"
import type { Metadata } from "next"

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

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "GeneralContractor",
      name: "ART DUM",
      telephone: "+420774335592",
      email: "firma@artdum.cz",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Karlovo nám 44/33",
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
      
      <Header />
      <ContactFormClient />
      <Footer />
    </div>
  )
}
