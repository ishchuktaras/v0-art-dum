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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Edit } from 'lucide-react'
import { toast } from "sonner"

interface EditProjectDialogProps {
  project: {
    id: string
    title: string
    description?: string | null
    status: string
    start_date?: string | null
    end_date?: string | null
    budget_estimate?: number | null
    actual_cost?: number | null
    notes?: string | null
  }
}

export function EditProjectDialog({ project }: EditProjectDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as string,
      start_date: formData.get("start_date") as string,
      end_date: formData.get("end_date") as string,
      budget_estimate: formData.get("budget_estimate")
        ? Number(formData.get("budget_estimate"))
        : null,
      actual_cost: formData.get("actual_cost")
        ? Number(formData.get("actual_cost"))
        : null,
      notes: formData.get("notes") as string,
    }

    try {
      const response = await fetch(`/admin/projects/${project.id}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Chyba při aktualizaci projektu")

      toast.success("Projekt byl úspěšně aktualizován")
      setOpen(false)
      router.refresh()
    } catch (error) {
      toast.error("Nepodařilo se aktualizovat projekt")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-gold text-navy hover:bg-gold/90">
          <Edit className="h-4 w-4 mr-2" />
          Upravit projekt
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upravit projekt</DialogTitle>
          <DialogDescription>
            Aktualizujte informace o projektu
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Název projektu *</Label>
              <Input
                id="title"
                name="title"
                defaultValue={project.title}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Popis</Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={project.description || ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select name="status" defaultValue={project.status} required>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Plánování</SelectItem>
                  <SelectItem value="in_progress">Probíhá</SelectItem>
                  <SelectItem value="completed">Dokončeno</SelectItem>
                  <SelectItem value="on_hold">Pozastaveno</SelectItem>
                  <SelectItem value="cancelled">Zrušeno</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_date">Datum zahájení</Label>
                <Input
                  id="start_date"
                  name="start_date"
                  type="date"
                  defaultValue={
                    project.start_date
                      ? new Date(project.start_date).toISOString().split("T")[0]
                      : ""
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end_date">Datum ukončení</Label>
                <Input
                  id="end_date"
                  name="end_date"
                  type="date"
                  defaultValue={
                    project.end_date
                      ? new Date(project.end_date).toISOString().split("T")[0]
                      : ""
                  }
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget_estimate">Rozpočet (odhad) Kč</Label>
                <Input
                  id="budget_estimate"
                  name="budget_estimate"
                  type="number"
                  min="0"
                  step="1"
                  defaultValue={project.budget_estimate || ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="actual_cost">Skutečná cena Kč</Label>
                <Input
                  id="actual_cost"
                  name="actual_cost"
                  type="number"
                  min="0"
                  step="1"
                  defaultValue={project.actual_cost || ""}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Interní poznámky</Label>
              <Textarea
                id="notes"
                name="notes"
                rows={4}
                defaultValue={project.notes || ""}
                placeholder="Poznámky viditelné pouze pro administrátory..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Zrušit
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Ukládání..." : "Uložit změny"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
