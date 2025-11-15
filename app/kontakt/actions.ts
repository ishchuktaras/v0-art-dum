"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function submitInquiry(formData: FormData) {

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


    const { data, error } = await supabase.from("inquiries").insert(inquiry).select()

    if (error) {
      return { success: false, error: error.message }
    }


    revalidatePath("/admin/inquiries")
    return { success: true, data }
  } catch (error) {
    return { success: false, error: "Neočekávaná chyba při odesílání formuláře" }
  }
}
