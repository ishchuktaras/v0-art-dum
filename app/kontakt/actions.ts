"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export async function submitInquiry(formData: FormData) {
  try {
    // 1. Ověření reCAPTCHA (Bezpečnost)
    const token = formData.get("g-recaptcha-response") as string;
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!token) {
      return { success: false, error: "Chybí ověření reCAPTCHA. Prosím potvrďte, že nejste robot." };
    }

    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    });
    const verifyJson = await verifyRes.json();

    if (!verifyJson.success) {
      return { success: false, error: "Ověření reCAPTCHA selhalo. Zkuste to prosím znovu." };
    }

    // 2. Inicializace Admin klienta (Service Role)
    // Tento klíč (SUPABASE_SERVICE_ROLE_KEY) musí být v .env.local
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!, 
      {
        auth: {
          persistSession: false,
        }
      }
    );

    // 3. Příprava dat
    // Frontend posílá: name, email, phone, message (kompletní text), service (seznam kategorií)
    const poptavka = {
      jmeno: formData.get("name") as string,
      email: formData.get("email") as string,
      telefon: formData.get("phone") as string,
      zprava: formData.get("message") as string,    // Obsahuje formátovaný text se všemi detaily
      typ_sluzby: formData.get("service") as string, // Uložíme i samostatně pro snadné filtrování
      
      // Systémové pole
      status: "nova",
      priority: "normal",   // Výchozí priorita
      source: "website",    // Zdroj je webový formulář
    };

    // 4. Vložení do tabulky 'poptavky'
    // Používáme select() aby se vrátila vložená data pro kontrolu
    const { data, error } = await supabaseAdmin
      .from("poptavky") 
      .insert(poptavka)
      .select();

    if (error) {
      console.error("Supabase Error:", error);
      return { success: false, error: "Chyba databáze: " + error.message };
    }

    // (Volitelné) Pokud budete mít admin stránku pro přehled poptávek:
    // revalidatePath("/admin/poptavky");

    return { success: true, data };

  } catch (error) {
    console.error("Server Error:", error);
    return { success: false, error: "Neočekávaná chyba při odesílání formuláře" };
  }
}