import { redirect } from 'next/navigation'
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ArrowLeft, Search, Filter } from 'lucide-react'

export default async function InquiriesPage() {
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

  const { data: allInquiries } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false })

  const statusColors = {
    new: "bg-gold text-primary",
    in_progress: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  }

  const statusLabels = {
    new: "Nová",
    in_progress: "Zpracovává se",
    completed: "Dokončeno",
    rejected: "Odmítnuto",
  }

  return (
    <div className="min-h-screen bg-muted">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Zpět
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-black">Poptávky</h1>
                <p className="text-sm text-muted-foreground">Správa příchozích poptávek</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrovat
              </Button>
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Hledat
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {allInquiries && allInquiries.length > 0 ? (
          <div className="space-y-4">
            {allInquiries.map((inquiry) => (
              <Card key={inquiry.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{inquiry.name}</h3>
                        <Badge className={statusColors[inquiry.status as keyof typeof statusColors]}>
                          {statusLabels[inquiry.status as keyof typeof statusLabels]}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{inquiry.email}</p>
                        </div>
                        {inquiry.phone && (
                          <div>
                            <p className="text-sm text-muted-foreground">Telefon</p>
                            <p className="font-medium">{inquiry.phone}</p>
                          </div>
                        )}
                        {inquiry.service_type && (
                          <div>
                            <p className="text-sm text-muted-foreground">Typ služby</p>
                            <p className="font-medium capitalize">{inquiry.service_type}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm text-muted-foreground">Datum vytvoření</p>
                          <p className="font-medium">
                            {new Date(inquiry.created_at).toLocaleDateString("cs-CZ", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-muted-foreground mb-1">Zpráva</p>
                        <p className="text-sm line-clamp-2">{inquiry.message}</p>
                      </div>
                    </div>

                    <Button asChild size="sm" className="ml-4">
                      <Link href={`/admin/inquiries/${inquiry.id}`}>Detail</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground mb-4">Zatím žádné poptávky</p>
              <Button asChild variant="outline">
                <Link href="/admin">Zpět na dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
