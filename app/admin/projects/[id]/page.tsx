import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  User, 
  FileText, 
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  Settings // Import ikony
} from "lucide-react"
// Import nových komponent
import { DeleteProjectButton } from "@/components/delete-project-button"
import { ArchiveProjectButton } from "@/components/archive-project-button"
import { EditProjectDialog } from "@/components/edit-project-dialog"

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()
  if (!profile || !["admin", "owner"].includes(profile.role)) redirect("/403")

  const { data: project } = await supabase
    .from("projects")
    .select(`*, assigned_to_profile:profiles!projects_assigned_to_fkey(full_name, email)`)
    .eq("id", id)
    .single()

  if (!project) redirect("/404")

  const statusColors = {
    planning: "bg-yellow-100 text-yellow-700",
    in_progress: "bg-blue-100 text-blue-700",
    on_hold: "bg-orange-100 text-orange-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  }

  const statusLabels = {
    planning: "Plánování",
    in_progress: "Probíhá",
    on_hold: "Pozastaveno",
    completed: "Dokončeno",
    cancelled: "Zrušeno",
  }

  return (
    <div className="min-h-screen bg-muted">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/projects">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zpět na projekty
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-black">Detail projektu</h1>
              <p className="text-sm text-muted-foreground">{project.title}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          
          {/* LEVÝ SLOUPEC - Data */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Informace o projektu
                  </CardTitle>
                  <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                    {statusLabels[project.status as keyof typeof statusLabels]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">Název</Label>
                  <p className="text-lg font-bold">{project.title}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Popis</Label>
                  <p className="whitespace-pre-wrap mt-1">{project.description || "Bez popisu"}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Klient
                </CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground mb-1 block">Jméno</Label>
                  <p className="font-medium">{project.client_name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground mb-1 block">Email</Label>
                  {project.client_email ? (
                    <a href={`mailto:${project.client_email}`} className="text-gold hover:underline flex items-center gap-2">
                      <Mail className="h-4 w-4" /> {project.client_email}
                    </a>
                  ) : "-"}
                </div>
                <div>
                  <Label className="text-muted-foreground mb-1 block">Telefon</Label>
                  {project.client_phone ? (
                    <a href={`tel:${project.client_phone}`} className="text-gold hover:underline flex items-center gap-2">
                      <Phone className="h-4 w-4" /> {project.client_phone}
                    </a>
                  ) : "-"}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interní poznámky</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {project.notes || "Žádné poznámky."}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* PRAVÝ SLOUPEC - Sidebar */}
          <div className="space-y-6">
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Termíny
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Zahájení
                  </span>
                  <span className="font-medium">
                    {project.start_date ? new Date(project.start_date).toLocaleDateString("cs-CZ") : "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Dokončení
                  </span>
                  <span className="font-medium">
                    {project.end_date ? new Date(project.end_date).toLocaleDateString("cs-CZ") : "-"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Finance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">Rozpočet (Odhad)</Label>
                  <p className="text-xl font-bold text-navy dark:text-white">
                    {project.budget_estimate 
                      ? Number(project.budget_estimate).toLocaleString("cs-CZ") + " Kč"
                      : "Nezadáno"}
                  </p>
                </div>
                {project.actual_cost && (
                  <div>
                    <Label className="text-muted-foreground">Skutečné náklady</Label>
                    <p className="text-xl font-bold text-gold">
                      {Number(project.actual_cost).toLocaleString("cs-CZ")} Kč
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* NOVÁ SEKCE: Správa záznamu */}
            <Card className="border-t-4 border-t-muted">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Správa záznamu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                
                {/* 1. Editace */}
                <EditProjectDialog project={project} />
                
                {/* 2. Archivace */}
                <ArchiveProjectButton id={project.id} />

                {/* 3. Smazání */}
                <DeleteProjectButton id={project.id} />
                
              </CardContent>
            </Card>

          </div>
        </div>
      </main>
    </div>
  )
}