"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

// Inicializace Admin klienta (Bypass RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,
    },
  }
)

/**
 * 1. EDITACE POPTÁVKY
 */
export async function updateInquiry(formData: FormData) {
  const id = formData.get("id") as string
  
  // Sestavení objektu pro update (pouze pole, která existují)
  const updateData: any = {}
  if (formData.has("name")) updateData.name = formData.get("name")
  if (formData.has("email")) updateData.email = formData.get("email")
  if (formData.has("phone")) updateData.phone = formData.get("phone")
  if (formData.has("service_type")) updateData.service_type = formData.get("service_type")
  if (formData.has("status")) updateData.status = formData.get("status")
  if (formData.has("priority")) updateData.priority = formData.get("priority")
  if (formData.has("message")) updateData.message = formData.get("message")
  if (formData.has("notes")) updateData.notes = formData.get("notes")

  try {
    const { error } = await supabaseAdmin
      .from("inquiries")
      .update(updateData)
      .eq("id", id)

    if (error) throw new Error(error.message)

    revalidatePath(`/admin/inquiries/${id}`)
    revalidatePath("/admin/inquiries")
    return { success: true, message: "Poptávka byla úspěšně aktualizována." }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

/**
 * 2. ARCHIVACE POPTÁVKY
 */
export async function archiveInquiry(id: string) {
  try {
    const { error } = await supabaseAdmin
      .from("inquiries")
      .update({ status: "rejected" }) // Nebo "archived", dle vašeho nastavení DB
      .eq("id", id)

    if (error) throw new Error(error.message)

    revalidatePath(`/admin/inquiries/${id}`)
    revalidatePath("/admin/inquiries")
    return { success: true, message: "Poptávka byla archivována." }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

/**
 * 3. CHYTRÉ MAZÁNÍ POPTÁVKY
 * - force=false: Zkontroluje závislosti. Pokud existují, vrátí varování.
 * - force=true: Odpojí projekty a smaže poptávku.
 */
export async function deleteInquiry(id: string, force: boolean = false) {
  try {
    // A) Kontrola závislostí (pokud nemažeme silou)
    if (!force) {
      const { data: linkedProjects } = await supabaseAdmin
        .from("projects")
        .select("id, title")
        .eq("inquiry_id", id)
      
      if (linkedProjects && linkedProjects.length > 0) {
        return { 
          success: false, 
          requiresConfirmation: true, 
          message: `Tato poptávka je propojena s ${linkedProjects.length} projektem/ty (např. "${linkedProjects[0].title}").`,
          actionType: "unlink_and_delete"
        }
      }
    }

    // B) Odpojení projektů (nastaví inquiry_id na NULL)
    const { error: unlinkError } = await supabaseAdmin
      .from("projects")
      .update({ inquiry_id: null })
      .eq("inquiry_id", id)

    if (unlinkError) throw new Error("Nepodařilo se odpojit související projekty.")

    // C) Smazání poptávky
    const { error: deleteError } = await supabaseAdmin
      .from("inquiries")
      .delete()
      .eq("id", id)

    if (deleteError) throw new Error(deleteError.message)

    revalidatePath("/admin/inquiries")
    return { success: true, message: "Poptávka byla úspěšně smazána." }

  } catch (error: any) {
    return { success: false, error: error.message }
  }
}