import type React from "react"
import type { Metadata, Viewport } from "next"

import "./globals.css"
import { CookieConsent } from "@/components/cookie-consent"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"

import { Inter, Inter as V0_Font_Inter, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _inter = V0_Font_Inter({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "ART DUM - Stavební firma | Třebíč a okolí",
  description:
    "23 let zkušeností ve stavebnictví. Rekonstrukce, stavby na klíč, opravy. Kvalitní stavební práce v regionu Třebíč a kraj Vysočina.",
  keywords: ["stavební firma", "Třebíč", "rekonstrukce", "stavba na klíč", "Vysočina"],
  authors: [{ name: "ART DUM" }],
  openGraph: {
    title: "ART DUM - Stavební firma",
    description: "23 let zkušeností ve stavebnictví",
    locale: "cs_CZ",
    type: "website",
  },
  generator: 'v0.app'
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
    <html lang="cs" className={inter.variable}>
      <body className="font-sans antialiased">
        {/* <Header /> */}
        <main className="flex-1">
          {children}
        </main>
        {/* <Footer /> */}
        <CookieConsent />
      </body>
    </html>
  )
}
