"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

// Inicializace Admin klienta (Bypass RLS - obchází bezpečnostní pravidla pro admin operace)
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
 * Aktualizuje údaje poptávky na základě formulářových dat.
 */
export async function updateInquiry(formData: FormData) {
  const id = formData.get("id") as string
  
  // Sestavení objektu pro update (pouze pole, která existují ve formuláři)
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

    // Obnovení dat na stránkách
    revalidatePath(`/admin/inquiries/${id}`)
    revalidatePath("/admin/inquiries")
    
    return { success: true, message: "Poptávka byla úspěšně aktualizována." }
  } catch (error: any) {
    console.error("Update error:", error)
    return { success: false, error: error.message }
  }
}

/**
 * 2. ARCHIVACE POPTÁVKY
 * Změní status poptávky na 'rejected' (nebo 'archived' dle vaší DB konvence).
 */
export async function archiveInquiry(id: string) {
  try {
    const { error } = await supabaseAdmin
      .from("inquiries")
      .update({ status: "rejected" }) 
      .eq("id", id)

    if (error) throw new Error(error.message)

    revalidatePath(`/admin/inquiries/${id}`)
    revalidatePath("/admin/inquiries")
    
    return { success: true, message: "Poptávka byla archivována." }
  } catch (error: any) {
    console.error("Archive error:", error)
    return { success: false, error: error.message }
  }
}

/**
 * 3. CHYTRÉ MAZÁNÍ POPTÁVKY
 * - force=false: Zkontroluje závislosti. Pokud existují projekty, vrátí varování.
 * - force=true: Odpojí projekty a smaže poptávku.
 */
export async function deleteInquiry(id: string, force: boolean = false) {
  try {
    // A) Kontrola závislostí (pokud nemažeme "silou")
    if (!force) {
      const { data: linkedProjects, error: fetchError } = await supabaseAdmin
        .from("projects")
        .select("id, title")
        .eq("inquiry_id", id)
      
      if (fetchError) throw new Error(fetchError.message)

      // Pokud existují propojené projekty, vrátíme speciální odpověď pro UI
      if (linkedProjects && linkedProjects.length > 0) {
        return { 
          success: false, 
          requiresConfirmation: true, 
          message: `Tato poptávka je propojena s ${linkedProjects.length} projektem/ty (např. "${linkedProjects[0].title}").`,
          actionType: "unlink_and_delete"
        }
      }
    }

    // B) Odpojení projektů (nastaví inquiry_id na NULL, aby nevznikla chyba integrity)
    const { error: unlinkError } = await supabaseAdmin
      .from("projects")
      .update({ inquiry_id: null })
      .eq("inquiry_id", id)

    if (unlinkError) throw new Error("Nepodařilo se odpojit související projekty.")

    // C) Smazání samotné poptávky
    const { error: deleteError } = await supabaseAdmin
      .from("inquiries")
      .delete()
      .eq("id", id)

    if (deleteError) throw new Error(deleteError.message)

    revalidatePath("/admin/inquiries")
    return { success: true, message: "Poptávka byla úspěšně smazána." }

  } catch (error: any) {
    console.error("Server delete error:", error)
    return { success: false, error: error.message }
  }
}