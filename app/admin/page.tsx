import { redirect } from 'next/navigation'
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageSquare, FolderKanban, TrendingUp, CheckCircle2 } from 'lucide-react'

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-navy dark:text-white">ART DUM Admin</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Vítejte, {profile.full_name || profile.email}</p>
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
          <Card className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Nové poptávky</CardTitle>
              <MessageSquare className="h-4 w-4 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gold">{newInquiries}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">z celkových {totalInquiries}</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Aktivní projekty</CardTitle>
              <FolderKanban className="h-4 w-4 text-navy dark:text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-navy dark:text-white">{activeProjects}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">z celkových {totalProjects}</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Dokončeno</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedProjects}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">projektů tento měsíc</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Úspěšnost</CardTitle>
              <TrendingUp className="h-4 w-4 text-navy dark:text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-navy dark:text-white">
                {totalInquiries > 0 ? Math.round((completedInquiries / totalInquiries) * 100) : 0}%
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">uzavřených poptávek</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/admin/inquiries">
            <Card className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 hover:border-gold/50 hover:shadow-lg transition-all cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-navy dark:text-white">
                  <MessageSquare className="h-5 w-5 text-gold" />
                  Poptávky
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Správa příchozích poptávek od klientů</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gold text-white hover:bg-gold/90">Zobrazit poptávky</Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/projects">
            <Card className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 hover:border-gold/50 hover:shadow-lg transition-all cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-navy dark:text-white">
                  <FolderKanban className="h-5 w-5 text-navy dark:text-white" />
                  Projekty
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Správa stavebních projektů a realizací</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-white dark:bg-gray-700 border-2 border-navy dark:border-white text-navy dark:text-white hover:bg-navy hover:text-white dark:hover:bg-white dark:hover:text-navy transition-all" variant="outline">
                  Zobrazit projekty
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/analytics">
            <Card className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 hover:border-gold/50 hover:shadow-lg transition-all cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-navy dark:text-white">
                  <TrendingUp className="h-5 w-5 text-navy dark:text-white" />
                  Analytika
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">Statistiky a business analytika</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-white dark:bg-gray-700 border-2 border-navy dark:border-white text-navy dark:text-white hover:bg-navy hover:text-white dark:hover:bg-white dark:hover:text-navy transition-all" variant="outline">
                  Zobrazit statistiky
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Inquiries */}
        <Card className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-navy dark:text-white">Poslední poptávky</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Nejnovější poptávky od klientů</CardDescription>
          </CardHeader>
          <CardContent>
            {recentInquiries && recentInquiries.length > 0 ? (
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="flex items-start justify-between p-4 border-2 border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 hover:border-gold/50 transition-all">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-semibold text-navy dark:text-white">{inquiry.name}</p>
                        {inquiry.status === "new" && (
                          <span className="px-2 py-1 text-xs rounded-full bg-gold text-white font-semibold">Nová</span>
                        )}
                        {inquiry.status === "in_progress" && (
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-semibold">
                            Zpracovává se
                          </span>
                        )}
                        {inquiry.status === "completed" && (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 font-semibold">Dokončeno</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {inquiry.email} • {inquiry.phone}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{inquiry.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {new Date(inquiry.created_at).toLocaleDateString("cs-CZ", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" asChild className="border-2 border-navy dark:border-white text-navy dark:text-white hover:bg-navy hover:text-white dark:hover:bg-white dark:hover:text-navy">
                      <Link href={`/admin/inquiries/${inquiry.id}`}>Detail</Link>
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">Zatím žádné poptávky</p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
