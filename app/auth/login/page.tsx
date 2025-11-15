"use client"

import type React from "react"
import { useEffect } from "react"
import { useSearchParams } from 'next/navigation'
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { Building2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const errorFromUrl = searchParams.get('error')
    if (errorFromUrl) {
      setError(errorFromUrl)
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const supabase = createClient()
      console.log("[v0] Attempting login for:", email)
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        console.error("[v0] Login error:", error)
        throw error
      }
      
      console.log("[v0] Login successful, redirecting to /admin")
      router.push("/admin")
      router.refresh()
    } catch (error: unknown) {
      console.error("[v0] Login failed:", error)
      setError(error instanceof Error ? error.message : "Nastala chyba při přihlášení")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const supabase = createClient()
      console.log("[v0] Attempting sign up for:", email)
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      
      if (error) {
        console.error("[v0] Sign up error:", error)
        throw error
      }
      
      console.log("[v0] Sign up successful:", data)
      setSuccess("✓ Registrace úspěšná! Zkontrolujte email pro potvrzení účtu.")
      setIsSignUp(false)
      setEmail("")
      setPassword("")
    } catch (error: unknown) {
      console.error("[v0] Sign up failed:", error)
      setError(error instanceof Error ? error.message : "Nastala chyba při registraci")
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
              <CardTitle className="text-2xl font-black">
                {isSignUp ? "Registrace" : "Přihlášení"}
              </CardTitle>
              <CardDescription>
                {isSignUp
                  ? "Vytvořte si účet pro přístup do administrace"
                  : "Zadejte email a heslo pro přístup do administrace"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
                <div className="flex flex-col gap-6">
                  {error && (
                    <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600 border border-green-200">
                      {success}
                    </div>
                  )}
                  
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
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {isSignUp && (
                      <p className="text-xs text-muted-foreground">Heslo musí mít minimálně 6 znaků</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full font-bold"
                    disabled={isLoading}
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--primary)",
                    }}
                  >
                    {isLoading ? (isSignUp ? "Registruji..." : "Přihlašuji...") : isSignUp ? "Registrovat se" : "Přihlásit se"}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(!isSignUp)
                      setError(null)
                      setSuccess(null)
                    }}
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    {isSignUp ? "Již máte účet? Přihlaste se" : "Nemáte účet? Zaregistrujte se"}
                  </button>
                </div>
                <div className="mt-2 text-center text-sm">
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
