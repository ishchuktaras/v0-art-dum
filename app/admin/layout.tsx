import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Toaster } from "@/components/ui/sonner" // Pro notifikace

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // 1. Ověření přihlášení na úrovni celého adminu
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // 2. Ověření role (Admin/Owner)
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (!profile || !["admin", "owner"].includes(profile.role)) {
    redirect("/403") // Stránka "Přístup odepřen"
  }

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Zde můžete v budoucnu přidat Admin Sidebar nebo Navigaci */}
      <main>
        {children}
      </main>
      <Toaster />
    </div>
  )
}