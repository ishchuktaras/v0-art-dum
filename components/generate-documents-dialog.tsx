"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Download, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  generateInvoiceDocument,
  generateConstructionDocument,
  generateLegalDocument,
  type ProjectDocumentData,
} from "@/lib/document-generator"

interface GenerateDocumentsDialogProps {
  projectData: ProjectDocumentData
}

export function GenerateDocumentsDialog({ projectData }: GenerateDocumentsDialogProps) {
  const [loading, setLoading] = useState<string | null>(null)

  const downloadDocument = async (type: string) => {
    setLoading(type)
    try {
      let blob: Blob
      let filename: string

      switch (type) {
        case "invoice":
          blob = await generateInvoiceDocument(projectData)
          filename = `faktura_${projectData.projectId.slice(0, 8)}.txt`
          break
        case "construction":
          blob = await generateConstructionDocument(projectData)
          filename = `stavebni_dokumentace_${projectData.projectId.slice(0, 8)}.txt`
          break
        case "legal":
          blob = await generateLegalDocument(projectData)
          filename = `smlouva_${projectData.projectId.slice(0, 8)}.txt`
          break
        default:
          return
      }

      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating document:", error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start bg-transparent">
          <FileText className="h-4 w-4 mr-2" />
          Generovat dokumentaci
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Generování projektové dokumentace</DialogTitle>
          <DialogDescription>
            Vyberte typ dokumentu, který chcete vygenerovat pro projekt{" "}
            <span className="font-semibold">{projectData.projectTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Card className="border-2 border-gold/20 hover:border-gold/40 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 text-navy dark:text-white">Fakturační dokumentace</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Generuje fakturu s údaji o projektu, cenách a platebních podmínkách
                  </p>
                  <Button
                    onClick={() => downloadDocument("invoice")}
                    disabled={loading !== null}
                    className="bg-gold hover:bg-gold/90"
                  >
                    {loading === "invoice" ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4 mr-2" />
                    )}
                    Stáhnout fakturu
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-navy/20 dark:border-white/20 hover:border-navy/40 dark:hover:border-white/40 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 text-navy dark:text-white">Stavební dokumentace</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Obsahuje technické specifikace, rozsah prací a použité materiály
                  </p>
                  <Button
                    onClick={() => downloadDocument("construction")}
                    disabled={loading !== null}
                    variant="outline"
                    className="border-2 border-navy dark:border-white"
                  >
                    {loading === "construction" ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4 mr-2" />
                    )}
                    Stáhnout dokumentaci
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-navy/20 dark:border-white/20 hover:border-navy/40 dark:hover:border-white/40 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 text-navy dark:text-white">Právní dokumentace</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Smlouva o dílo s obchodními podmínkami a záručními podmínkami
                  </p>
                  <Button
                    onClick={() => downloadDocument("legal")}
                    disabled={loading !== null}
                    variant="outline"
                    className="border-2 border-navy dark:border-white"
                  >
                    {loading === "legal" ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4 mr-2" />
                    )}
                    Stáhnout smlouvu
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
