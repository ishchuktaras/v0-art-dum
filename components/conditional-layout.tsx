"use client"

import { usePathname } from 'next/navigation'
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Don't show Header/Footer for admin and auth pages
  const isAdminOrAuth = pathname?.startsWith("/admin") || pathname?.startsWith("/auth")
  
  if (isAdminOrAuth) {
    return <>{children}</>
  }
  
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
