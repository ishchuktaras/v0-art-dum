"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

export async function submitInquiry(formData: FormData) {
  try {
    // 1. Ověření reCAPTCHA (Zůstává stejné)
    const token = formData.get("g-recaptcha-response") as string
    const secretKey = process.env.RECAPTCHA_SECRET_KEY

    if (!token) {
      return { success: false, error: "Chybí ověření reCAPTCHA. Prosím potvrďte, že nejste robot." }
    }

    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    })
    const verifyJson = await verifyRes.json()

    if (!verifyJson.success) {
      return { success: false, error: "Ověření reCAPTCHA selhalo. Zkuste to prosím znovu." }
    }

    // 2. VYTVOŘENÍ ADMIN KLIENTA (Service Role) - Toto je ta změna
    // Tento klient obchází RLS pravidla (BYPASS RLS)
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!, 
      {
        auth: {
          persistSession: false, // Neukládáme session, je to jen jednorázový zápis
        }
      }
    )

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

    // Vložení pomocí admin klienta
    const { data, error } = await supabaseAdmin.from("inquiries").insert(inquiry).select()

    if (error) {
      console.error("Supabase Error:", error) // Pro lepší debugování
      return { success: false, error: "Chyba databáze: " + error.message }
    }

    revalidatePath("/admin/inquiries")
    return { success: true, data }
  } catch (error) {
    console.error("Server Error:", error)
    return { success: false, error: "Neočekávaná chyba při odesílání formuláře" }
  }
}