"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { deleteProject } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"

export function DeleteProjectButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteProject(id)
      
      if (result.success) {
        toast.success(result.message)
        setOpen(false)
        router.push("/admin/projects")
        router.refresh()
      } else {
        toast.error("Chyba: " + result.error)
      }
    })
  }

  return (
    <>
      <Button 
        variant="outline" 
        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
        onClick={() => setOpen(true)}
        disabled={isPending}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Smazat projekt
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-[#0B192F] text-white border-[#D4AF37]/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Smazat projekt?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              Opravdu chcete tento projekt trvale odstranit? Tato akce je nevratná a smaže všechna data spojená s projektem.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent text-white border-gray-600 hover:bg-white/10 hover:text-white">
              Zrušit
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                handleDelete()
              }}
              className="bg-red-600 text-white hover:bg-red-700 border-0"
              disabled={isPending}
            >
              {isPending ? "Mazání..." : "Ano, smazat"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}