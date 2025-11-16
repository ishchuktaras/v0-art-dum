import { sanityFetch } from "@/sanity/lib/fetch"
import { CONTACT_INFO_QUERY } from "@/sanity/lib/queries"
import { FooterContent } from "./footer-content"

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
  let contactInfo: ContactInfo | null = null
  
  try {
    contactInfo = await sanityFetch<ContactInfo>({
      query: CONTACT_INFO_QUERY,
      tags: ["contactInfo"],
    })
  } catch (error) {
    console.error("Error fetching contact info:", error)
  }

  return <FooterContent contactInfo={contactInfo || undefined} />
}
