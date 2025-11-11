import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageSquare, FolderKanban, TrendingUp, CheckCircle2 } from "lucide-react"

export default async function AdminDashboard() {
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

  const { data: inquiriesStats } = await supabase.from("inquiries").select("status", { count: "exact" })

  const { data: projectsStats } = await supabase.from("projects").select("status", { count: "exact" })

  const newInquiries = inquiriesStats?.filter((i) => i.status === "new").length || 0
  const inProgressInquiries = inquiriesStats?.filter((i) => i.status === "in_progress").length || 0
  const completedInquiries = inquiriesStats?.filter((i) => i.status === "completed").length || 0
  const totalInquiries = inquiriesStats?.length || 0

  const activeProjects = projectsStats?.filter((p) => p.status === "in_progress").length || 0
  const completedProjects = projectsStats?.filter((p) => p.status === "completed").length || 0
  const totalProjects = projectsStats?.length || 0

  const { data: recentInquiries } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Vítejte, {profile.full_name || profile.email}</p>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href="/">Na web</Link>
              </Button>
              <form action="/auth/signout" method="post">
                <Button variant="outline">Odhlásit se</Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nové poptávky</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gold">{newInquiries}</div>
              <p className="text-xs text-muted-foreground">z celkových {totalInquiries}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktivní projekty</CardTitle>
              <FolderKanban className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{activeProjects}</div>
              <p className="text-xs text-muted-foreground">z celkových {totalProjects}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dokončeno</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedProjects}</div>
              <p className="text-xs text-muted-foreground">projektů tento měsíc</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Úspěšnost</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalInquiries > 0 ? Math.round((completedInquiries / totalInquiries) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">uzavřených poptávek</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
            <Link href="/admin/inquiries">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-gold" />
                  Poptávky
                </CardTitle>
                <CardDescription>Správa příchozích poptávek</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gold text-primary hover:bg-gold/90">Zobrazit poptávky</Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
            <Link href="/admin/projects">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderKanban className="h-5 w-5 text-primary" />
                  Projekty
                </CardTitle>
                <CardDescription>Správa rekonstrukčních projektů</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-transparent" variant="outline">
                  Zobrazit projekty
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" asChild>
            <Link href="/admin/analytics">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Analytika
                </CardTitle>
                <CardDescription>Business analytics a reporting</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-transparent" variant="outline">
                  Zobrazit statistiky
                </Button>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Recent Inquiries */}
        <Card>
          <CardHeader>
            <CardTitle>Poslední poptávky</CardTitle>
            <CardDescription>Nejnovější poptávky od klientů</CardDescription>
          </CardHeader>
          <CardContent>
            {recentInquiries && recentInquiries.length > 0 ? (
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-semibold">{inquiry.name}</p>
                        {inquiry.status === "new" && (
                          <span className="px-2 py-1 text-xs rounded-full bg-gold text-primary">Nová</span>
                        )}
                        {inquiry.status === "in_progress" && (
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                            Zpracovává se
                          </span>
                        )}
                        {inquiry.status === "completed" && (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Dokončeno</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {inquiry.email} • {inquiry.phone}
                      </p>
                      <p className="text-sm line-clamp-2">{inquiry.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(inquiry.created_at).toLocaleDateString("cs-CZ", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/admin/inquiries/${inquiry.id}`}>Detail</Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">Zatím žádné poptávky</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
