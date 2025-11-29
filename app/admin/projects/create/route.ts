// app/admin/projects/create/route.ts

import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (!profile || !["admin", "owner"].includes(profile.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const { inquiry_id, title, description, budget_estimate, start_date } = body

    // Get inquiry data to populate project fields
    const { data: inquiry } = await supabase.from("inquiries").select("*").eq("id", inquiry_id).single()

    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 })
    }

    // Create project
    const { data: project, error } = await supabase
      .from("projects")
      .insert({
        inquiry_id,
        title: title || `Projekt pro ${inquiry.name}`,
        description: description || inquiry.message,
        client_name: inquiry.name,
        client_email: inquiry.email,
        client_phone: inquiry.phone,
        budget_estimate: budget_estimate || null,
        start_date: start_date || null,
        status: "planning",
        assigned_to: user.id,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating project:", error)
      return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
    }

    // Update inquiry status to in_progress
    await supabase.from("inquiries").update({ status: "in_progress" }).eq("id", inquiry_id)

    return NextResponse.json({ success: true, project })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
