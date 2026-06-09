import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { createServiceClient } from "@/lib/supabase/server"
import { compressProfile } from "@/lib/compress-profile"
import { ProfileForm } from "./ProfileForm"

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user?.email) redirect("/auth")

  const supabase = createServiceClient()
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", session.user.email)
    .maybeSingle()

  let academic = null
  let goals = null
  let compressed = ""

  if (profile) {
    const [{ data: a }, { data: g }] = await Promise.all([
      supabase.from("academic").select("*").eq("profile_id", profile.id).maybeSingle(),
      supabase.from("goals").select("*").eq("profile_id", profile.id).maybeSingle(),
    ])
    academic = a
    goals = g
    compressed = compressProfile({ academic: a ?? undefined, goals: g ?? undefined })
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8 space-y-1">
        <h1 className="text-2xl font-semibold">Your academic profile</h1>
        <p className="text-sm text-gray-500">{session.user.email}</p>
      </div>
      <ProfileForm
        initialAcademic={academic}
        initialGoals={goals}
        initialCompressed={compressed}
      />
    </main>
  )
}
