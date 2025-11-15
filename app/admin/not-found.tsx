import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ArrowLeft } from 'lucide-react'

export default function AdminNotFound() {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center space-y-4">
          <div className="text-9xl font-black text-gold">404</div>
          <CardTitle className="text-3xl">Stránka nebyla nalezena</CardTitle>
          <CardDescription className="text-base">
            Omlouváme se, ale požadovaná admin stránka neexistuje nebo byla přesunuta.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-gold text-primary hover:bg-gold/90">
            <Link href="/admin">
              <Home className="h-4 w-4 mr-2" />
              Zpět na dashboard
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="javascript:history.back()">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zpět na předchozí stránku
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
