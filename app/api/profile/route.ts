import { auth } from "@/lib/auth"
import { createServiceClient } from "@/lib/supabase/server"
import { compressProfile } from "@/lib/compress-profile"
import { NextResponse } from "next/server"

function err(message: string, code: string, status: number) {
  return NextResponse.json({ error: message, code, status }, { status })
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) return err("Unauthorized", "UNAUTHORIZED", 401)

  const supabase = createServiceClient()
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", session.user.email)
    .maybeSingle()

  if (error || !profile) return err("Profile not found", "NOT_FOUND", 404)

  const [{ data: academic }, { data: goals }] = await Promise.all([
    supabase.from("academic").select("*").eq("profile_id", profile.id).maybeSingle(),
    supabase.from("goals").select("*").eq("profile_id", profile.id).maybeSingle(),
  ])

  const compressed = compressProfile({
    academic: academic ?? undefined,
    goals: goals ?? undefined,
  })

  return NextResponse.json({ profile: { ...profile, academic, goals }, compressed })
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) return err("Unauthorized", "UNAUTHORIZED", 401)

  let body: { academic?: Record<string, unknown>; goals?: Record<string, unknown> }
  try {
    body = await req.json()
  } catch (_) {
    return err("Invalid JSON", "INVALID_BODY", 400)
  }

  const supabase = createServiceClient()
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", session.user.email)
    .maybeSingle()

  if (error || !profile) return err("Profile not found", "NOT_FOUND", 404)

  const now = new Date().toISOString()
  await Promise.all([
    body.academic
      ? supabase
          .from("academic")
          .upsert({ ...body.academic, profile_id: profile.id, updated_at: now }, { onConflict: "profile_id" })
      : null,
    body.goals
      ? supabase
          .from("goals")
          .upsert({ ...body.goals, profile_id: profile.id, updated_at: now }, { onConflict: "profile_id" })
      : null,
  ])

  const [{ data: academic }, { data: goals }] = await Promise.all([
    supabase.from("academic").select("*").eq("profile_id", profile.id).maybeSingle(),
    supabase.from("goals").select("*").eq("profile_id", profile.id).maybeSingle(),
  ])

  const compressed = compressProfile({
    academic: academic ?? undefined,
    goals: goals ?? undefined,
  })

  return NextResponse.json({ compressed })
}
