import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  // Sign out from Supabase
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("[v0] Signout error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const origin = new URL(request.url).origin
  
  // Redirect to login page
  return NextResponse.redirect(new URL("/auth/login", origin))
}
