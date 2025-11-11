import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Users, Calendar, Target, AlertCircle } from "lucide-react"

export default async function AnalyticsPage() {
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

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

  // Current month inquiries
  const { data: currentMonthInquiries } = await supabase
    .from("inquiries")
    .select("*")
    .gte("created_at", startOfMonth.toISOString())

  // Last month inquiries
  const { data: lastMonthInquiries } = await supabase
    .from("inquiries")
    .select("*")
    .gte("created_at", startOfLastMonth.toISOString())
    .lte("created_at", endOfLastMonth.toISOString())

  // All inquiries for conversion rate
  const { data: allInquiries } = await supabase.from("inquiries").select("*")

  // Projects data
  const { data: allProjects } = await supabase.from("projects").select("*")

  const { data: currentMonthProjects } = await supabase
    .from("projects")
    .select("*")
    .gte("created_at", startOfMonth.toISOString())

  const totalInquiries = allInquiries?.length || 0
  const completedInquiries = allInquiries?.filter((i) => i.status === "completed").length || 0
  const conversionRate = totalInquiries > 0 ? ((completedInquiries / totalInquiries) * 100).toFixed(1) : 0

  const currentMonthInquiriesCount = currentMonthInquiries?.length || 0
  const lastMonthInquiriesCount = lastMonthInquiries?.length || 0
  const inquiriesGrowth =
    lastMonthInquiriesCount > 0
      ? (((currentMonthInquiriesCount - lastMonthInquiriesCount) / lastMonthInquiriesCount) * 100).toFixed(1)
      : 0

  const activeProjects = allProjects?.filter((p) => p.status === "in_progress").length || 0
  const completedProjects = allProjects?.filter((p) => p.status === "completed").length || 0

  // Revenue calculations
  const totalRevenue = allProjects?.filter((p) => p.actual_cost).reduce((sum, p) => sum + Number(p.actual_cost), 0) || 0

  const currentMonthRevenue =
    currentMonthProjects
      ?.filter((p) => p.actual_cost && p.status === "completed")
      .reduce((sum, p) => sum + Number(p.actual_cost), 0) || 0

  const avgProjectValue = completedProjects > 0 ? (totalRevenue / completedProjects).toFixed(0) : 0

  // Service type breakdown
  const serviceBreakdown =
    allInquiries?.reduce(
      (acc, inquiry) => {
        const type = inquiry.service_type || "nespecifikováno"
        acc[type] = (acc[type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ) || {}

  const topServices = Object.entries(serviceBreakdown)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  // Response time analysis
  const avgResponseTime = "< 24h" // Simplified for now

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
                <h1 className="text-2xl font-black">Business Analytics</h1>
                <p className="text-sm text-muted-foreground">Přehledy a statistiky výkonnosti</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">Období</p>
              <p className="text-xs text-muted-foreground">
                {new Date().toLocaleDateString("cs-CZ", { month: "long", year: "numeric" })}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Poptávky tento měsíc</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentMonthInquiriesCount}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {Number(inquiriesGrowth) >= 0 ? (
                  <>
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-green-600">+{inquiriesGrowth}%</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-3 w-3 text-red-500" />
                    <span className="text-red-600">{inquiriesGrowth}%</span>
                  </>
                )}{" "}
                oproti minulému měsíci
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Míra konverze</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversionRate}%</div>
              <p className="text-xs text-muted-foreground">
                {completedInquiries} z {totalInquiries} uzavřených
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Celkový obrat</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRevenue.toLocaleString("cs-CZ")} Kč</div>
              <p className="text-xs text-muted-foreground">
                Tento měsíc: {currentMonthRevenue.toLocaleString("cs-CZ")} Kč
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Průměrná hodnota</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Number(avgProjectValue).toLocaleString("cs-CZ")} Kč</div>
              <p className="text-xs text-muted-foreground">na projekt</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Project Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Stav projektů</CardTitle>
              <CardDescription>Přehled všech projektů podle stavu</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Probíhá</span>
                  </div>
                  <span className="font-bold">{activeProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Dokončeno</span>
                  </div>
                  <span className="font-bold">{completedProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Plánování</span>
                  </div>
                  <span className="font-bold">{allProjects?.filter((p) => p.status === "planning").length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-sm">Pozastaveno</span>
                  </div>
                  <span className="font-bold">{allProjects?.filter((p) => p.status === "on_hold").length || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Services */}
          <Card>
            <CardHeader>
              <CardTitle>Nejžádanější služby</CardTitle>
              <CardDescription>Top 5 služeb podle počtu poptávek</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topServices.map(([service, count], index) => (
                  <div key={service} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">{index + 1}.</span>
                      <span className="text-sm capitalize">{service}</span>
                    </div>
                    <span className="font-bold">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Indicators */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gold" />
                Rychlost odpovědi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{avgResponseTime}</div>
              <p className="text-sm text-muted-foreground">Průměrná doba odpovědi na poptávku</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gold" />
                Aktivní klienti
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{activeProjects}</div>
              <p className="text-sm text-muted-foreground">Počet probíhajících projektů</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-gold" />
                Nevyřízené
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                {allInquiries?.filter((i) => i.status === "new").length || 0}
              </div>
              <p className="text-sm text-muted-foreground">Nové poptávky čekající na odpověď</p>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Doporučení a insights</CardTitle>
            <CardDescription>Automatická analýza výkonnosti</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Number(inquiriesGrowth) > 10 && (
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-900">Rostoucí zájem</p>
                  <p className="text-sm text-green-700">
                    Počet poptávek vzrostl o {inquiriesGrowth}% oproti minulému měsíci. Zvažte navýšení kapacity.
                  </p>
                </div>
              </div>
            )}

            {Number(conversionRate) < 30 && totalInquiries > 10 && (
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-orange-900">Nízká konverze</p>
                  <p className="text-sm text-orange-700">
                    Míra konverze je {conversionRate}%. Zkuste zlepšit rychlost odpovědi nebo kvalitu nabídek.
                  </p>
                </div>
              </div>
            )}

            {allInquiries?.filter((i) => i.status === "new").length > 5 && (
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-900">Nevyřízené poptávky</p>
                  <p className="text-sm text-red-700">
                    Máte {allInquiries?.filter((i) => i.status === "new").length} nevyřízených poptávek. Prioritizujte
                    jejich zpracování pro lepší konverzi.
                  </p>
                </div>
              </div>
            )}

            {Number(conversionRate) >= 50 && (
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <Target className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900">Výborná konverze</p>
                  <p className="text-sm text-blue-700">
                    Vaše míra konverze {conversionRate}% je vynikající. Pokračujte v nastaveném směru!
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
