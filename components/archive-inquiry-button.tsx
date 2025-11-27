"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Archive } from "lucide-react"
import { useRouter } from "next/navigation" // Import routeru
import { archiveInquiry } from "@/app/admin/inquiries/[id]/actions" 

interface ArchiveInquiryButtonProps {
  id: string
}

export function ArchiveInquiryButton({ id }: ArchiveInquiryButtonProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter() // Inicializace routeru

  const handleArchive = () => {
    startTransition(async () => {
      try {
        await archiveInquiry(id)
        // ÚSPĚCH: Nyní ručně přesměrujeme na seznam
        router.push("/admin/inquiries")
      } catch (error: any) {
        alert("Chyba při archivaci: " + error.message)
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
      {isPending ? "Archivuji..." : "Archivovat poptávku"}
    </Button>
  )
}