import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Neautorizováno" }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (!profile || !["admin", "owner"].includes(profile.role)) {
      return NextResponse.json({ error: "Nedostatečná oprávnění" }, { status: 403 })
    }

    const body = await request.json()

    const { error } = await supabase
      .from("projects")
      .update({
        title: body.title,
        description: body.description || null,
        status: body.status,
        start_date: body.start_date || null,
        end_date: body.end_date || null,
        budget_estimate: body.budget_estimate || null,
        actual_cost: body.actual_cost || null,
        notes: body.notes || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json(
      { error: "Interní chyba serveru" },
      { status: 500 }
    )
  }
}
