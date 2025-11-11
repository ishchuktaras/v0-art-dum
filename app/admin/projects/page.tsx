import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Plus, FolderKanban, Calendar, DollarSign } from "lucide-react"

export default async function ProjectsPage() {
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

  const { data: projects } = await supabase
    .from("projects")
    .select(`
      *,
      assigned_to_profile:profiles!projects_assigned_to_fkey(full_name, email)
    `)
    .order("created_at", { ascending: false })

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
                <h1 className="text-2xl font-black">Projekty</h1>
                <p className="text-sm text-muted-foreground">Správa rekonstrukčních projektů</p>
              </div>
            </div>
            <Button asChild className="bg-gold text-primary hover:bg-gold/90">
              <Link href="/admin/projects/new">
                <Plus className="h-4 w-4 mr-2" />
                Nový projekt
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Plánování</p>
                  <p className="text-2xl font-bold">{projects?.filter((p) => p.status === "planning").length || 0}</p>
                </div>
                <FolderKanban className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Probíhá</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {projects?.filter((p) => p.status === "in_progress").length || 0}
                  </p>
                </div>
                <FolderKanban className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Dokončeno</p>
                  <p className="text-2xl font-bold text-green-600">
                    {projects?.filter((p) => p.status === "completed").length || 0}
                  </p>
                </div>
                <FolderKanban className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Celkem</p>
                  <p className="text-2xl font-bold">{projects?.length || 0}</p>
                </div>
                <FolderKanban className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-4">
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                          {statusLabels[project.status as keyof typeof statusLabels]}
                        </Badge>
                      </div>

                      {project.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Klient</p>
                          <p className="font-semibold">{project.client_name}</p>
                          {project.client_phone && (
                            <p className="text-sm text-muted-foreground">{project.client_phone}</p>
                          )}
                        </div>

                        {(project.start_date || project.end_date) && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">
                              <Calendar className="h-3 w-3 inline mr-1" />
                              Termíny
                            </p>
                            {project.start_date && (
                              <p className="text-sm">Od: {new Date(project.start_date).toLocaleDateString("cs-CZ")}</p>
                            )}
                            {project.end_date && (
                              <p className="text-sm">Do: {new Date(project.end_date).toLocaleDateString("cs-CZ")}</p>
                            )}
                          </div>
                        )}

                        {(project.budget_estimate || project.actual_cost) && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">
                              <DollarSign className="h-3 w-3 inline mr-1" />
                              Rozpočet
                            </p>
                            {project.budget_estimate && (
                              <p className="text-sm">
                                Odhad: {Number(project.budget_estimate).toLocaleString("cs-CZ")} Kč
                              </p>
                            )}
                            {project.actual_cost && (
                              <p className="text-sm">
                                Skutečnost: {Number(project.actual_cost).toLocaleString("cs-CZ")} Kč
                              </p>
                            )}
                          </div>
                        )}

                        {project.assigned_to_profile && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Přiřazeno</p>
                            <p className="text-sm font-medium">
                              {project.assigned_to_profile.full_name || project.assigned_to_profile.email}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <Button asChild size="sm" className="ml-4">
                      <Link href={`/admin/projects/${project.id}`}>Detail</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <FolderKanban className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">Zatím žádné projekty</p>
                <Button asChild>
                  <Link href="/admin/projects/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Vytvořit první projekt
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
