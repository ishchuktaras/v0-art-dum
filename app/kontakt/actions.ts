"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function submitInquiry(formData: FormData) {
  console.log("[v0] submitInquiry called with data:", {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    service: formData.get("service"),
  })

  try {
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

    console.log("[v0] Attempting to insert inquiry:", inquiry)

    const { data, error } = await supabase.from("inquiries").insert(inquiry).select()

    if (error) {
      console.error("[v0] Supabase insert error:", error)
      return { success: false, error: error.message }
    }

    console.log("[v0] Inquiry successfully inserted:", data)

    revalidatePath("/admin/inquiries")
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Unexpected error in submitInquiry:", error)
    return { success: false, error: "Neočekávaná chyba při odesílání formuláře" }
  }
}
