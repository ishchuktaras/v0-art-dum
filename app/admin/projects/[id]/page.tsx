import { redirect } from 'next/navigation'
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, Calendar, DollarSign, User, FileText, Edit } from 'lucide-react'
import { EditProjectDialog } from "@/components/edit-project-dialog"

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (!profile || !["admin", "owner"].includes(profile.role)) {
    redirect("/403")
  }

  const { data: project } = await supabase
    .from("projects")
    .select(`
      *,
      inquiry:inquiries(id, name, email, phone, service_type, message),
      assigned_to_profile:profiles!projects_assigned_to_fkey(full_name, email)
    `)
    .eq("id", id)
    .single()

  if (!project) {
    redirect("/admin/projects")
  }

  const statusColors = {
    planning: "bg-yellow-100 text-yellow-700",
    in_progress: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    on_hold: "bg-orange-100 text-orange-700",
    cancelled: "bg-red-100 text-red-700",
  }

  const statusLabels = {
    planning: "Plánování",
    in_progress: "Probíhá",
    completed: "Dokončeno",
    on_hold: "Pozastaveno",
    cancelled: "Zrušeno",
  }

  return (
    <div className="min-h-screen bg-muted">
      <header className="border-b bg-background sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/projects">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Zpět
                </Link>
              </Button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-black">{project.title}</h1>
                  <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                    {statusLabels[project.status as keyof typeof statusLabels]}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Detail projektu
                </p>
              </div>
            </div>
            <EditProjectDialog project={project} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Informace o projektu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.description && (
                  <div>
                    <h3 className="font-semibold mb-2">Popis</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">
                      {project.description}
                    </p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  {project.start_date && (
                    <div>
                      <h3 className="font-semibold mb-1 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Datum zahájení
                      </h3>
                      <p className="text-muted-foreground">
                        {new Date(project.start_date).toLocaleDateString("cs-CZ")}
                      </p>
                    </div>
                  )}

                  {project.end_date && (
                    <div>
                      <h3 className="font-semibold mb-1 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Datum ukončení
                      </h3>
                      <p className="text-muted-foreground">
                        {new Date(project.end_date).toLocaleDateString("cs-CZ")}
                      </p>
                    </div>
                  )}

                  {project.budget_estimate && (
                    <div>
                      <h3 className="font-semibold mb-1 flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Rozpočet (odhad)
                      </h3>
                      <p className="text-muted-foreground">
                        {Number(project.budget_estimate).toLocaleString("cs-CZ")} Kč
                      </p>
                    </div>
                  )}

                  {project.actual_cost && (
                    <div>
                      <h3 className="font-semibold mb-1 flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Skutečná cena
                      </h3>
                      <p className="text-muted-foreground">
                        {Number(project.actual_cost).toLocaleString("cs-CZ")} Kč
                      </p>
                    </div>
                  )}
                </div>

                {project.notes && (
                  <div>
                    <h3 className="font-semibold mb-2">Interní poznámky</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap bg-muted p-3 rounded-md">
                      {project.notes}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Related Inquiry */}
            {project.inquiry && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Související poptávka
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h3 className="font-semibold mb-1">Klient</h3>
                    <p className="text-muted-foreground">{project.inquiry.name}</p>
                  </div>

                  {project.inquiry.service_type && (
                    <div>
                      <h3 className="font-semibold mb-1">Typ služby</h3>
                      <p className="text-muted-foreground">{project.inquiry.service_type}</p>
                    </div>
                  )}

                  {project.inquiry.message && (
                    <div>
                      <h3 className="font-semibold mb-1">Zpráva</h3>
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {project.inquiry.message}
                      </p>
                    </div>
                  )}

                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/inquiries/${project.inquiry.id}`}>
                      Zobrazit poptávku
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Kontakt na klienta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Jméno</h3>
                  <p className="text-muted-foreground">{project.client_name}</p>
                </div>

                {project.client_email && (
                  <div>
                    <h3 className="font-semibold mb-1 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </h3>
                    <a
                      href={`mailto:${project.client_email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {project.client_email}
                    </a>
                  </div>
                )}

                {project.client_phone && (
                  <div>
                    <h3 className="font-semibold mb-1 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Telefon
                    </h3>
                    <a
                      href={`tel:${project.client_phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {project.client_phone}
                    </a>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <a href={`mailto:${project.client_email}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <a href={`tel:${project.client_phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Zavolat
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Assigned To */}
            {project.assigned_to_profile && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Přiřazeno
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">
                    {project.assigned_to_profile.full_name || project.assigned_to_profile.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {project.assigned_to_profile.email}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Metadata */}
            <Card>
              <CardHeader>
                <CardTitle>Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Vytvořeno:</span>
                  <br />
                  <span className="font-medium">
                    {new Date(project.created_at).toLocaleString("cs-CZ")}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Aktualizováno:</span>
                  <br />
                  <span className="font-medium">
                    {new Date(project.updated_at).toLocaleString("cs-CZ")}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
