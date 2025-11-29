import { login } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message?: string; error?: string }
}) {
  return (
    // Tmavě modré pozadí dle designu (#0B192F)
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B192F] px-4">
      
      {/* Logo / Název */}
      <Link href="/" className="mb-8 flex flex-col items-center group">
        <h1 className="text-3xl font-black text-white tracking-tight group-hover:text-[#D4AF37] transition-colors">
          ART DUM
        </h1>
        <span className="text-[#D4AF37] text-sm tracking-widest uppercase font-semibold">
          Administrace
        </span>
      </Link>

      <Card className="w-full max-w-md bg-white/5 border-[#D4AF37]/20 backdrop-blur-sm shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-white">
            Vítejte zpět
          </CardTitle>
          <CardDescription className="text-gray-400">
            Přihlaste se do správy webu
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form action={login} className="space-y-4">
            
            {/* Chybová hláška */}
            {searchParams?.error && (
              <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md text-center">
                Nesprávný email nebo heslo.
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@artdum.cz"
                required
                className="bg-black/20 border-gray-600 text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-200">Heslo</Label>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="bg-black/20 border-gray-600 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#D4AF37] text-[#0B192F] hover:bg-[#D4AF37]/90 font-bold text-base py-6 shadow-lg shadow-[#D4AF37]/10 transition-all hover:scale-[1.02]"
            >
              Přihlásit se
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Zpět na web
            </Link>
          </div>
        </CardContent>
      </Card>
      
      <p className="mt-8 text-center text-xs text-gray-500">
        Přístup povolen pouze autorizovaným osobám.
      </p>
    </div>
  )
}