"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function deleteProject(id: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { error } = await supabase.from("projects").delete().eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/admin/projects")
  redirect("/admin/projects")
}

export async function archiveProject(id: string) {
  const supabase = await createClient()
  
  // Archivace projektu = nastavení statusu na "cancelled" (nebo "completed" dle logiky)
  // Zde použijeme "cancelled" jako "skryto/zrušeno"
  const { error } = await supabase.from("projects").update({ status: "cancelled" }).eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath(`/admin/projects/${id}`)
  revalidatePath("/admin/projects")
}