import { createClient as supabaseCreateClient } from "@supabase/supabase-js"

export function createServiceClient() {
  return supabaseCreateClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
