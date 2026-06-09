import { auth } from "@/lib/auth"
import { SignJWT } from "jose"
import { NextRequest, NextResponse } from "next/server"

const secret = () => new TextEncoder().encode(process.env.NEXTAUTH_SECRET!)

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const client_id = searchParams.get("client_id")
  const redirect_uri = searchParams.get("redirect_uri")
  const state = searchParams.get("state")
  const response_type = searchParams.get("response_type")

  if (client_id !== process.env.NEXTAUTH_CHATGPT_CLIENT_ID) {
    return NextResponse.json(
      { error: "invalid_client", code: "INVALID_CLIENT", status: 401 },
      { status: 401 }
    )
  }
  if (!redirect_uri || !state || response_type !== "code") {
    return NextResponse.json(
      { error: "invalid_request", code: "INVALID_REQUEST", status: 400 },
      { status: 400 }
    )
  }

  const session = await auth()
  if (!session?.user?.email) {
    const next = encodeURIComponent(req.nextUrl.toString())
    return NextResponse.redirect(new URL(`/auth?next=${next}`, req.nextUrl.origin))
  }

  const code = await new SignJWT({ email: session.user.email, type: "auth_code" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("10m")
    .sign(secret())

  const redirectUrl = new URL(redirect_uri)
  redirectUrl.searchParams.set("code", code)
  redirectUrl.searchParams.set("state", state)
  return NextResponse.redirect(redirectUrl)
}
