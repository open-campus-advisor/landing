import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Nodemailer from "next-auth/providers/nodemailer"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import { createServiceClient } from "@/lib/supabase/server"

// The @auth/supabase-adapter requires NextAuth system tables in Supabase.
// Run the SQL from https://authjs.dev/getting-started/adapters/supabase
// before using email magic links or persistent account linking.

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    ...(process.env.EMAIL_SERVER
      ? [
          Nodemailer({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM ?? "noreply@opencampusadvisor.org",
          }),
        ]
      : []),
  ],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL ?? "https://placeholder.supabase.co",
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "placeholder",
  }),
  session: { strategy: "jwt" },
  pages: { signIn: "/auth" },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return true
      try {
        const supabase = createServiceClient()
        const { data } = await supabase
          .from("profiles")
          .select("id")
          .eq("email", user.email)
          .maybeSingle()
        if (!data) {
          await supabase.from("profiles").insert({
            email: user.email,
            auth_provider: "google",
          })
        }
      } catch (_) {}
      return true
    },
    async jwt({ token, user }) {
      if (user?.email) token.email = user.email
      return token
    },
    async session({ session, token }) {
      session.user.email = token.email as string
      return session
    },
  },
})
