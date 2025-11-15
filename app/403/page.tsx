import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldAlert } from 'lucide-react'

export default function Forbidden() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <div className="text-center max-w-md">
        <ShieldAlert className="h-24 w-24 text-gold mx-auto mb-6" />
        <h1 className="text-6xl font-black text-gold mb-4">403</h1>
        <h2 className="text-2xl font-bold text-white mb-4">Přístup odepřen</h2>
        <p className="text-white/80 mb-8">
          Nemáte oprávnění pro přístup do administrace. Kontaktujte správce systému pro získání přístupu.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild variant="outline" className="bg-gold text-primary hover:bg-gold/90">
            <Link href="/">Zpět na hlavní stránku</Link>
          </Button>
          <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
            <Link href="/kontakt">Kontaktujte nás</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
