import { auth } from "@/lib/auth"
import { createServiceClient } from "@/lib/supabase/server"
import { compressProfile } from "@/lib/compress-profile"
import { NextResponse } from "next/server"

function err(message: string, code: string, status: number) {
  return NextResponse.json({ error: message, code, status }, { status })
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) return err("Unauthorized", "UNAUTHORIZED", 401)

  let transcript: string
  try {
    const body = await req.json()
    if (!body.transcript) throw new Error()
    transcript = body.transcript
  } catch (_) {
    return err("Missing transcript", "INVALID_BODY", 400)
  }

  const supabase = createServiceClient()
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", session.user.email)
    .maybeSingle()

  if (error || !profile) return err("Profile not found", "NOT_FOUND", 404)

  const [{ data: academic }, { data: goals }] = await Promise.all([
    supabase.from("academic").select("*").eq("profile_id", profile.id).maybeSingle(),
    supabase.from("goals").select("*").eq("profile_id", profile.id).maybeSingle(),
  ])

  const context = compressProfile({ academic: academic ?? undefined, goals: goals ?? undefined })

  const deltaRes = await fetch(`${process.env.RAILWAY_API_URL}/api/v1/session/delta`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript, context }),
  })

  if (!deltaRes.ok) return err("Delta computation failed", "DELTA_ERROR", 502)

  const { delta, updated_context } = await deltaRes.json()

  const now = new Date().toISOString()
  await supabase.from("sessions").insert({
    profile_id: profile.id,
    summary: transcript.slice(0, 200),
    delta,
  })

  if (updated_context?.academic) {
    await supabase
      .from("academic")
      .upsert({ ...updated_context.academic, profile_id: profile.id, updated_at: now }, { onConflict: "profile_id" })
  }
  if (updated_context?.goals) {
    await supabase
      .from("goals")
      .upsert({ ...updated_context.goals, profile_id: profile.id, updated_at: now }, { onConflict: "profile_id" })
  }

  const [{ data: newAcademic }, { data: newGoals }] = await Promise.all([
    supabase.from("academic").select("*").eq("profile_id", profile.id).maybeSingle(),
    supabase.from("goals").select("*").eq("profile_id", profile.id).maybeSingle(),
  ])

  const compressed = compressProfile({ academic: newAcademic ?? undefined, goals: newGoals ?? undefined })

  return NextResponse.json({ compressed })
}
