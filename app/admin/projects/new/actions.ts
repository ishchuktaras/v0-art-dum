"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'

export async function createProject(formData: FormData) {
  const supabase = await createClient()

  const project = {
    inquiry_id: formData.get("inquiry_id") || null,
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || null,
    client_name: formData.get("client_name") as string,
    client_email: (formData.get("client_email") as string) || null,
    client_phone: (formData.get("client_phone") as string) || null,
    status: formData.get("status") as string,
    start_date: formData.get("start_date") || null,
    end_date: formData.get("end_date") || null,
    budget_estimate: formData.get("budget_estimate") ? Number(formData.get("budget_estimate")) : null,
    assigned_to: formData.get("assigned_to") || null,
    notes: (formData.get("notes") as string) || null,
  }

  const { error } = await supabase.from("projects").insert(project)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/projects")
  redirect("/admin/projects")
}
