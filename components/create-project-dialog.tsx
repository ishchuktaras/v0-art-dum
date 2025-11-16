"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText } from 'lucide-react'
import { toast } from "sonner"

interface CreateProjectDialogProps {
  inquiryId: string
  clientName: string
  inquiryMessage: string
}

export function CreateProjectDialog({ inquiryId, clientName, inquiryMessage }: CreateProjectDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      inquiry_id: inquiryId,
      title: formData.get("title"),
      description: formData.get("description"),
      budget_estimate: formData.get("budget_estimate") ? parseFloat(formData.get("budget_estimate") as string) : null,
      start_date: formData.get("start_date") || null,
    }

    try {
      const response = await fetch("/admin/projects/create", { // Opravena cesta na správný API endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to create project")
      }

      const result = await response.json()

      toast.success("Projekt vytvořen", {
        description: "Projekt byl úspěšně vytvořen a poptávka byla označena jako probíhající.",
      })

      setOpen(false)
      router.push(`/admin/projects/${result.project.id}`)
      router.refresh()
    } catch (error) {
      toast.error("Chyba", {
        description: "Nepodařilo se vytvořit projekt. Zkuste to prosím znovu.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <FileText className="h-4 w-4 mr-2" />
          Vytvořit projekt
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Vytvořit nový projekt</DialogTitle>
            <DialogDescription>
              Vytvořte projekt z této poptávky. Formulář je předvyplněn daty z poptávky.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Název projektu</Label>
              <Input
                id="title"
                name="title"
                defaultValue={`Projekt pro ${clientName}`}
                placeholder="Zadejte název projektu"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Popis projektu</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={inquiryMessage}
                placeholder="Zadejte popis projektu"
                rows={4}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="budget_estimate">Odhadovaný rozpočet (Kč)</Label>
              <Input
                id="budget_estimate"
                name="budget_estimate"
                type="number"
                step="0.01"
                placeholder="např. 50000"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="start_date">Plánované zahájení</Label>
              <Input id="start_date" name="start_date" type="date" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Zrušit
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Vytváření..." : "Vytvořit projekt"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
