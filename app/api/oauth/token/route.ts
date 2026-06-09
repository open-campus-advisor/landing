import { jwtVerify, SignJWT } from "jose"
import { createServiceClient } from "@/lib/supabase/server"
import { compressProfile } from "@/lib/compress-profile"
import { NextResponse } from "next/server"

const secret = () => new TextEncoder().encode(process.env.NEXTAUTH_SECRET!)

function err(error: string, status: number) {
  return NextResponse.json({ error }, { status })
}

export async function POST(req: Request) {
  let body: Record<string, string>
  try {
    const ct = req.headers.get("content-type") ?? ""
    body = ct.includes("application/json")
      ? await req.json()
      : Object.fromEntries(new URLSearchParams(await req.text()))
  } catch (_) {
    return err("invalid_request", 400)
  }

  const { grant_type, code, client_id, client_secret } = body

  if (grant_type !== "authorization_code") return err("unsupported_grant_type", 400)
  if (client_id !== process.env.NEXTAUTH_CHATGPT_CLIENT_ID) return err("invalid_client", 401)
  if (client_secret !== process.env.NEXTAUTH_CHATGPT_CLIENT_SECRET) return err("invalid_client", 401)
  if (!code) return err("invalid_request", 400)

  let email: string
  try {
    const { payload } = await jwtVerify(code, secret())
    if (payload.type !== "auth_code" || !payload.email) throw new Error()
    email = payload.email as string
  } catch (_) {
    return err("invalid_grant", 400)
  }

  const supabase = createServiceClient()
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle()

  if (!profile) return err("invalid_grant", 400)

  const [{ data: academic }, { data: goals }] = await Promise.all([
    supabase.from("academic").select("*").eq("profile_id", profile.id).maybeSingle(),
    supabase.from("goals").select("*").eq("profile_id", profile.id).maybeSingle(),
  ])

  const compressed = compressProfile({ academic: academic ?? undefined, goals: goals ?? undefined })

  const access_token = await new SignJWT({ email, type: "access_token" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1y")
    .sign(secret())

  return NextResponse.json({
    access_token,
    token_type: "Bearer",
    compressed_profile: compressed,
  })
}
