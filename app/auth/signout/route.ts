// app/auth/signout/route.ts

import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  // Sign out from Supabase
  const { error } = await supabase.auth.signOut()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const origin = new URL(request.url).origin
  
  // Redirect to login page using 303 to force GET method
  return NextResponse.redirect(new URL("/auth/login", origin), 303)
}
