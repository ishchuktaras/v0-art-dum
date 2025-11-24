"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function submitInquiry(formData: FormData) {

  try {
    // 1. Ověření reCAPTCHA (Přidáno)
    const token = formData.get("g-recaptcha-response") as string
    const secretKey = process.env.RECAPTCHA_SECRET_KEY

    if (!token) {
      return { success: false, error: "Chybí ověření reCAPTCHA. Prosím potvrďte, že nejste robot." }
    }

    // Ověření u Google API
    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    })
    const verifyJson = await verifyRes.json()

    if (!verifyJson.success) {
      console.error("ReCAPTCHA verification failed:", verifyJson)
      return { success: false, error: "Ověření reCAPTCHA selhalo. Zkuste to prosím znovu." }
    }

    // 2. Pokud je captcha OK, pokračujeme s uložením do DB
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