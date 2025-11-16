import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST() {
  const supabase = await createClient()

  // Sign out from Supabase
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("[v0] Signout error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Redirect to login page
  return NextResponse.redirect(new URL("/auth/login", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"))
}
