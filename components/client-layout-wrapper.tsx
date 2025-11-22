"use client"

import dynamic from "next/dynamic"

const CookieConsent = dynamic(
  () => import("@/components/cookie-consent").then((mod) => ({ default: mod.CookieConsent })),
  { ssr: false },
)
const WhatsAppButton = dynamic(
  () => import("@/components/whatsapp-button").then((mod) => ({ default: mod.WhatsAppButton })),
  { ssr: false },
)

export function ClientLayoutWrapper() {
  return (
    <>
      <CookieConsent />
      <WhatsAppButton />
    </>
  )
}
