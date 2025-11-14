import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { ContactFormClient } from "./contact-form-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kontakt | ART DUM",
  description: "Kontaktujte nás pro nezávaznou cenovou nabídku. Telefon, email, adresa. ART DUM stavební firma Třebíč.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ContactFormClient />
      <Footer />
    </div>
  )
}
