import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

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
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
