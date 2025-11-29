// app/admin/projects/[id]/loading.tsx

import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ProjectDetailLoading() {
  return (
    <div className="min-h-screen bg-muted">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="h-10 w-20 animate-pulse rounded-md bg-muted" />
            <div className="space-y-2">
              <div className="h-8 w-64 animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-32 animate-pulse rounded-md bg-muted" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="h-6 w-48 animate-pulse rounded-md bg-muted" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
                <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
                <div className="h-4 w-5/6 animate-pulse rounded-md bg-muted" />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="h-6 w-32 animate-pulse rounded-md bg-muted" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
                <div className="h-4 w-2/3 animate-pulse rounded-md bg-muted" />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
