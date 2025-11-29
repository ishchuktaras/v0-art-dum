"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Trash2, AlertTriangle } from "lucide-react"
import { deleteInquiry } from "@/app/admin/actions"
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

export function DeleteInquiryButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false)
  const [warningData, setWarningData] = useState<{ message: string } | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  // 1. Otevření okna
  const handleInitialClick = () => {
    setWarningData(null)
    setOpen(true)
  }

  // 2. Potvrzení (Logika chytrého mazání)
  const handleConfirm = async () => {
    // Pokud už máme varování (warningData), znamená to, že uživatel kliká podruhé = Force Delete
    const isForceDelete = !!warningData 

    startTransition(async () => {
      const result = await deleteInquiry(id, isForceDelete)

      if (result.success) {
        toast.success(result.message)
        setOpen(false)
        router.push("/admin/inquiries") // Přesměrování na seznam
        router.refresh()
      } else if (result.requiresConfirmation) {
        // Backend hlásí závislost -> Zobrazíme varování v okně
        setWarningData({ message: result.message! })
      } else {
        toast.error("Chyba: " + result.error)
        setOpen(false)
      }
    })
  }

  return (
    <>
      <Button 
        variant="outline" 
        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
        onClick={handleInitialClick}
        disabled={isPending}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Smazat poptávku
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        {/* Stylování okna do tmavě modré (Navy) dle designu */}
        <AlertDialogContent className="bg-[#0B192F] text-white border-[#D4AF37]/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-white">
              {warningData ? (
                <>
                  <AlertTriangle className="h-6 w-6 text-orange-500" />
                  Nalezeny související položky
                </>
              ) : (
                "Smazat poptávku?"
              )}
            </AlertDialogTitle>
            
            <AlertDialogDescription className="text-gray-300 text-base mt-2">
              {warningData ? (
                <>
                  <p className="mb-2">{warningData.message}</p>
                  <p className="text-sm bg-orange-500/10 p-3 rounded border border-orange-500/20 text-orange-200">
                    Pokud budete pokračovat, systém automaticky <strong>zruší propojení</strong> s těmito projekty (projekty nebudou smazány) a poté poptávku odstraní.
                  </p>
                </>
              ) : (
                "Opravdu chcete tuto poptávku trvale odstranit? Tato akce je nevratná."
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="bg-transparent text-white border-gray-600 hover:bg-white/10 hover:text-white">
              Zrušit
            </AlertDialogCancel>
            
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault() // Zabráníme automatickému zavření, ovládáme to ručně
                handleConfirm()
              }}
              className="bg-red-600 text-white hover:bg-red-700 border-0"
              disabled={isPending}
            >
              {isPending 
                ? "Pracuji..." 
                : warningData 
                  ? "Rozumím, odpojit a smazat" 
                  : "Ano, smazat"
              }
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}