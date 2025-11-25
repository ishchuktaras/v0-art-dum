"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function deleteInquiry(id: string) {
  const supabase = await createClient()
  
  // Kontrola oprávnění (volitelné, RLS to jistí, ale pro jistotu)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { error } = await supabase.from("inquiries").delete().eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admin/inquiries")
  redirect("/admin/inquiries")
}

export async function archiveInquiry(id: string) {
  const supabase = await createClient()
  
  // Archivace = nastavení statusu na "rejected" (nebo jiný status dle dohody)
  const { error } = await supabase.from("inquiries").update({ status: "rejected" }).eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath(`/admin/inquiries/${id}`)
  revalidatePath("/admin/inquiries")
}