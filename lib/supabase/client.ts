import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("[v0] Supabase environment variables are missing")
    console.error("[v0] NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "✓" : "✗")
    console.error("[v0] NEXT_PUBLIC_SUPABASE_ANON_KEY:", supabaseKey ? "✓" : "✗")
    throw new Error(
      "Supabase credentials are missing. Please check your environment variables."
    )
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}
