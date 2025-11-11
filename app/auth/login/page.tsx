"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Building2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/admin`,
        },
      })
      if (error) throw error
      router.push("/admin")
      router.refresh()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Nastala chyba při přihlášení")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center p-6"
      style={{ backgroundColor: "var(--primary)" }}
    >
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8" style={{ color: "var(--accent)" }} />
              <span className="text-2xl font-black text-white">ART DUM</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-black">Přihlášení</CardTitle>
              <CardDescription>Zadejte email a heslo pro přístup do administrace</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@artdum.cz"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Heslo</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button
                    type="submit"
                    className="w-full font-bold"
                    disabled={isLoading}
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--primary)",
                    }}
                  >
                    {isLoading ? "Přihlašuji..." : "Přihlásit se"}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  <Link href="/" className="underline underline-offset-4">
                    Zpět na hlavní stránku
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
