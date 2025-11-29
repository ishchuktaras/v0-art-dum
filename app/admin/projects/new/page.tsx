// app/admin/projects/new/page.tsx

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { createProject } from "./actions"

export default async function NewProjectPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile || !["admin", "owner"].includes(profile.role)) {
    redirect("/403")
  }

  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("id, name, email, service_type, created_at")
    .in("status", ["new", "in_progress"])
    .order("created_at", { ascending: false })

  const { data: teamMembers } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .in("role", ["admin", "owner"])

  return (
    <div className="min-h-screen bg-muted">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/projects">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zpět
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-black">Nový projekt</h1>
              <p className="text-sm text-muted-foreground">Vytvořit nový rekonstrukční projekt</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Informace o projektu</CardTitle>
            <CardDescription>Vyplňte základní informace o novém projektu</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={async (formData) => { await createProject(formData) }} className="space-y-6">
              {/* Link to inquiry */}
              {inquiries && inquiries.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="inquiry_id">Propojit s poptávkou (volitelné)</Label>
                  <select
                    id="inquiry_id"
                    name="inquiry_id"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">-- Nepropojovat --</option>
                    {inquiries.map((inquiry) => (
                      <option key={inquiry.id} value={inquiry.id}>
                        {inquiry.name} - {inquiry.email} ({inquiry.service_type})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground">
                    Propojení s poptávkou automaticky vyplní některé údaje
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="title">Název projektu *</Label>
                <Input id="title" name="title" placeholder="Rekonstrukce koupelny - Novákovi" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Popis projektu</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Detailní popis projektu, rozsah prací, specifické požadavky..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client_name">Jméno klienta *</Label>
                  <Input id="client_name" name="client_name" placeholder="Jan Novák" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client_phone">Telefon klienta</Label>
                  <Input id="client_phone" name="client_phone" type="tel" placeholder="+420 xxx xxx xxx" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="client_email">Email klienta</Label>
                <Input id="client_email" name="client_email" type="email" placeholder="klient@email.cz" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Datum zahájení</Label>
                  <Input id="start_date" name="start_date" type="date" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end_date">Plánované dokončení</Label>
                  <Input id="end_date" name="end_date" type="date" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget_estimate">Odhadovaný rozpočet (Kč)</Label>
                  <Input id="budget_estimate" name="budget_estimate" type="number" step="1000" placeholder="150000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Stav projektu *</Label>
                  <select
                    id="status"
                    name="status"
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="planning">Plánování</option>
                    <option value="in_progress">Probíhá</option>
                    <option value="on_hold">Pozastaveno</option>
                    <option value="completed">Dokončeno</option>
                    <option value="cancelled">Zrušeno</option>
                  </select>
                </div>
              </div>

              {teamMembers && teamMembers.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="assigned_to">Přiřadit komu</Label>
                  <select
                    id="assigned_to"
                    name="assigned_to"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">-- Nepřiřazeno --</option>
                    {teamMembers.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.full_name || member.email}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes">Poznámky</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Interní poznámky, upozornění, speciální požadavky..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-gold text-primary hover:bg-gold/90">
                  Vytvořit projekt
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin/projects">Zrušit</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
