import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function InquiryDetailLoading() {
  return (
    <div className="min-h-screen bg-muted">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
            <div>
              <div className="h-8 w-48 mb-2 animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-64 animate-pulse rounded-md bg-muted" />
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
                <div className="h-20 w-full animate-pulse rounded-md bg-muted" />
                <div className="h-20 w-full animate-pulse rounded-md bg-muted" />
                <div className="h-20 w-full animate-pulse rounded-md bg-muted" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-6 w-32 animate-pulse rounded-md bg-muted" />
              </CardHeader>
              <CardContent>
                <div className="h-32 w-full animate-pulse rounded-md bg-muted" />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="h-6 w-40 animate-pulse rounded-md bg-muted" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-12 w-full animate-pulse rounded-md bg-muted" />
                <div className="h-12 w-full animate-pulse rounded-md bg-muted" />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
