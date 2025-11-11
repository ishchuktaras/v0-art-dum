"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function submitInquiry(formData: FormData) {
  const supabase = await createClient()

  const inquiry = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    service_type: formData.get("service") as string,
    message: formData.get("message") as string,
    status: "new",
    priority: "normal",
    source: "website",
  }

  const { error } = await supabase.from("inquiries").insert(inquiry)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin/inquiries")
  return { success: true }
}
