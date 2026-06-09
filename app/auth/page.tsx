import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { SignInForm } from "./SignInForm"

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const session = await auth()
  const { next } = await searchParams

  if (session?.user?.email) {
    redirect(next ?? "/profile")
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="text-sm text-gray-500">
            Your academic profile will be saved and used to personalize your advisor.
          </p>
        </div>
        <SignInForm callbackUrl={next ?? "/profile"} />
      </div>
    </main>
  )
}
