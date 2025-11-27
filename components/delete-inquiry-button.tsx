"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { deleteInquiry } from "@/app/admin/inquiries/[id]/actions" 

interface DeleteInquiryButtonProps {
  id: string
}

export function DeleteInquiryButton({ id }: DeleteInquiryButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    const confirmed = window.confirm("Opravdu chcete trvale smazat tuto poptávku? Tato akce je nevratná.")
    
    if (confirmed) {
      startTransition(async () => {
        await deleteInquiry(id)
      })
    }
  }

  return (
    <Button 
      variant="outline" 
      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
      onClick={handleDelete}
      disabled={isPending}
    >
      <Trash2 className="h-4 w-4 mr-2" />
      {isPending ? "Mazání..." : "Smazat poptávku"}
    </Button>
  )
}