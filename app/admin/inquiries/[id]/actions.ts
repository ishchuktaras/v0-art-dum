"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// Funkce pro trvalé smazání
export async function deleteInquiry(id: string) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
      },
    }
  )

  // KROK 1: Odpojit poptávku od existujících projektů
  // Pokud existuje projekt spojený s touto poptávkou, zrušíme vazbu (inquiry_id = null)
  const { error: unlinkError } = await supabaseAdmin
    .from("projects")
    .update({ inquiry_id: null })
    .eq("inquiry_id", id)

  if (unlinkError) {
    console.error("Unlink Error:", unlinkError)
    throw new Error("Nepodařilo se odpojit projekt od poptávky.")
  }

  // KROK 2: Smazat samotnou poptávku
  const { error } = await supabaseAdmin
    .from("inquiries")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Delete Error:", error)
    throw new Error("Nepodařilo se smazat poptávku: " + error.message)
  }

  revalidatePath("/admin/inquiries")
  redirect("/admin/inquiries")
}

// Funkce pro archivaci
export async function archiveInquiry(id: string) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
      },
    }
  )

  const { error } = await supabaseAdmin
    .from("inquiries")
    .update({ status: "rejected" }) 
    .eq("id", id)

  if (error) {
    throw new Error("Nepodařilo se archivovat poptávku: " + error.message)
  }

    revalidatePath("/admin/inquiries")
}