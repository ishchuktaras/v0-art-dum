import type React from "react"
import type { Metadata, Viewport } from "next"

import "./globals.css"
import { ConditionalLayout } from "@/components/conditional-layout"
import { Toaster } from "@/components/ui/sonner"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"
import { ClientLayoutWrapper } from "@/components/client-layout-wrapper"

import { Inter, Source_Serif_4 } from "next/font/google"

import { Inter, Source_Serif_4, Inter as V0_Font_Inter, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _inter = V0_Font_Inter({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

const _inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
})

const _sourceSerif_4 = Source_Serif_4({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
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
    <html lang="cs" className={_inter.className} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ConditionalLayout>{children}</ConditionalLayout>
          <ClientLayoutWrapper />
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
