import { jwtVerify } from "jose"
import { createServiceClient } from "@/lib/supabase/server"
import { compressProfile } from "@/lib/compress-profile"
import { NextRequest, NextResponse } from "next/server"

const secret = () => new TextEncoder().encode(process.env.NEXTAUTH_SECRET!)

function err(message: string, code: string, status: number) {
  return NextResponse.json({ error: message, code, status }, { status })
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  if (!authHeader?.startsWith("Bearer ")) return err("Unauthorized", "UNAUTHORIZED", 401)

  const token = authHeader.slice(7)
  let email: string
  try {
    const { payload } = await jwtVerify(token, secret())
    if (payload.type !== "access_token" || !payload.email) throw new Error()
    email = payload.email as string
  } catch (_) {
    return err("Invalid token", "INVALID_TOKEN", 401)
  }

  const supabase = createServiceClient()
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .maybeSingle()

  if (!profile) return err("Profile not found", "NOT_FOUND", 404)

  const [{ data: academic }, { data: goals }] = await Promise.all([
    supabase.from("academic").select("*").eq("profile_id", profile.id).maybeSingle(),
    supabase.from("goals").select("*").eq("profile_id", profile.id).maybeSingle(),
  ])

  const compressed = compressProfile({ academic: academic ?? undefined, goals: goals ?? undefined })

  return NextResponse.json({ profile: { ...profile, academic, goals }, compressed })
}
