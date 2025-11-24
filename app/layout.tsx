import type React from "react"
import type { Metadata, Viewport } from "next"

import "./globals.css"
import { CookieConsent } from "@/components/cookie-consent"
import { ConditionalLayout } from "@/components/conditional-layout"
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",

import { Inter, Inter as V0_Font_Inter, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _inter = V0_Font_Inter({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

})

export const metadata: Metadata = {
  title: "Oleh Kulish, OSVČ - ART DUM | Stavební firma Třebíč a okolí",
  description:
    "23 let zkušeností ve stavebnictví. Rekonstrukce, stavby na klíč, opravy. Kvalitní stavební práce v regionu Třebíč a kraj Vysočina.",
  keywords: ["stavební firma", "Třebíč", "rekonstrukce", "stavba na klíč", "Vysočina", "Oleh Kulish", "ART DUM"],
  authors: [{ name: "Oleh Kulish, OSVČ - ART DUM" }],
  openGraph: {
    title: "Oleh Kulish, OSVČ - ART DUM | Stavební firma",
    description: "23 let zkušeností ve stavebnictví",
    locale: "cs_CZ",
    type: "website",
    url: "https://artdum.cz",
    siteName: "Oleh Kulish, OSVČ - ART DUM",
    images: [
      {
        url: "https://artdum.cz/og-image-main.jpg",
        width: 1200,
        height: 630,
        alt: "Oleh Kulish, OSVČ - ART DUM | Stavební firma Třebíč - 23 let zkušeností",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oleh Kulish, OSVČ - ART DUM | Stavební firma Třebíč",
    description: "23 let zkušeností ve stavebnictví. Rekonstrukce, stavby na klíč, opravy.",
    images: ["https://artdum.cz/og-image-main.jpg"],
  },
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#0B192F",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ConditionalLayout>{children}</ConditionalLayout>
          <CookieConsent />
          <Toaster />
          <Analytics />
          <SpeedInsights />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
