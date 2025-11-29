"use client"

import { useState, useTransition } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil } from 'lucide-react'
import { toast } from "sonner"
// Importujeme akci ze sjednoceného souboru
import { updateProject } from "@/app/admin/actions"

// Rozšířený typ pro projekt (včetně klienta)
interface ProjectData {
  id: string
  title: string
  status: string
  client_name: string
  client_email?: string | null
  client_phone?: string | null
  description?: string | null
  start_date?: string | null
  end_date?: string | null
  budget_estimate?: number | null
  actual_cost?: number | null
  notes?: string | null
}

export function EditProjectDialog({ project }: { project: ProjectData }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    startTransition(async () => {
      const result = await updateProject(formData)
      if (result.success) {
        toast.success(result.message)
        setOpen(false)
        router.refresh()
      } else {
        toast.error("Chyba: " + result.error)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Pencil className="h-4 w-4 mr-2" />
          Editovat projekt
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upravit projekt</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <input type="hidden" name="id" value={project.id} />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Název projektu</Label>
              <Input name="title" defaultValue={project.title} required />
            </div>
            <div className="space-y-2">
              <Label>Stav</Label>
              <Select name="status" defaultValue={project.status}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Plánování</SelectItem>
                  <SelectItem value="in_progress">Probíhá</SelectItem>
                  <SelectItem value="on_hold">Pozastaveno</SelectItem>
                  <SelectItem value="completed">Dokončeno</SelectItem>
                  <SelectItem value="cancelled">Zrušeno</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t pt-4">
            <div className="space-y-2">
              <Label>Klient - Jméno</Label>
              <Input name="client_name" defaultValue={project.client_name} required />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input name="client_email" defaultValue={project.client_email || ""} />
            </div>
            <div className="space-y-2">
              <Label>Telefon</Label>
              <Input name="client_phone" defaultValue={project.client_phone || ""} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t pt-4">
            <div className="space-y-2">
              <Label>Odhad rozpočtu (Kč)</Label>
              <Input type="number" name="budget_estimate" defaultValue={project.budget_estimate || ""} />
            </div>
            <div className="space-y-2">
              <Label>Skutečné náklady (Kč)</Label>
              <Input type="number" name="actual_cost" defaultValue={project.actual_cost || ""} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Datum zahájení</Label>
              <Input type="date" name="start_date" defaultValue={project.start_date ? new Date(project.start_date).toISOString().split('T')[0] : ""} />
            </div>
            <div className="space-y-2">
              <Label>Datum dokončení</Label>
              <Input type="date" name="end_date" defaultValue={project.end_date ? new Date(project.end_date).toISOString().split('T')[0] : ""} />
            </div>
          </div>

          <div className="space-y-2 border-t pt-4">
            <Label>Popis</Label>
            <Textarea name="description" rows={3} defaultValue={project.description || ""} />
          </div>
          
          <div className="space-y-2">
            <Label>Interní poznámky</Label>
            <Textarea name="notes" rows={2} defaultValue={project.notes || ""} placeholder="Pouze pro adminy..." />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Zrušit</Button>
            
            {/* Opravený styl tlačítka (Gold + Navy text) */}
            <Button 
              type="submit" 
              disabled={isPending} 
              className="bg-[#D4AF37] text-[#0B192F] hover:bg-[#D4AF37]/90 font-bold"
            >
              {isPending ? "Ukládání..." : "Uložit změny"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}