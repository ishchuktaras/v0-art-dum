"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Archive } from "lucide-react"
import { useRouter } from "next/navigation"
import { archiveProject } from "@/app/admin/actions" 
import { toast } from "sonner"

export function ArchiveProjectButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleArchive = () => {
    startTransition(async () => {
      const result = await archiveProject(id)
      
      if (result.success) {
        toast.success(result.message)
        router.refresh()
      } else {
        toast.error("Chyba: " + result.error)
      }
    })
  }

  return (
    <Button 
      variant="outline" 
      className="w-full justify-start text-orange-600 hover:text-orange-700 hover:bg-orange-50"
      onClick={handleArchive}
      disabled={isPending}
    >
      <Archive className="h-4 w-4 mr-2" />
      {isPending ? "Archivuji..." : "Archivovat / Zrušit projekt"}
    </Button>
  )
}