import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check auth
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check admin role
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
    if (!profile || !["admin", "owner"].includes(profile.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const formData = await request.formData()
    const id = formData.get("id") as string
    const notes = formData.get("notes") as string
    const status = formData.get("status") as string | null
    const priority = formData.get("priority") as string | null

    const updateData: Record<string, string> = {}
    if (notes !== null) updateData.notes = notes
    if (status) updateData.status = status
    if (priority) updateData.priority = priority

    const { error } = await supabase.from("inquiries").update(updateData).eq("id", id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Redirect back to inquiry detail
    return NextResponse.redirect(new URL(`/admin/inquiries/${id}`, request.url))
  } catch (error) {
    console.error("[v0] Error updating inquiry:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
