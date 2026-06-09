@AGENTS.md

# Open Campus Advisor Website — Claude Code Context

Next.js 16 app at `opencampusadvisor.org`. Two concerns: (1) landing page, (2) student profile layer with auth + Supabase persistence + ChatGPT OAuth.

## Repo identity

| Thing | Value |
|---|---|
| GitHub | `github.com/open-campus-advisor/website` (public) |
| Deploy | Vercel → `opencampusadvisor.org` (auto-deploy on push to main) |
| Local path | `/Users/tolgserkal/projects/open-campus-advisor-landing` |
| Core API | `api.opencampusadvisor.org` (Railway) |

## Stack

- Next.js 16 (App Router, Turbopack) + Tailwind CSS 4
- NextAuth v5 (`next-auth@beta`) — Google OAuth + Nodemailer magic link
- `@auth/supabase-adapter` — NextAuth user/account persistence
- `@supabase/supabase-js` — profiles, academic, goals, sessions tables
- `jose` (via next-auth) — JWT auth codes + access tokens for ChatGPT OAuth

## Key files

```
lib/auth.ts               ← NextAuth config — providers, adapter, JWT callbacks
lib/compress-profile.ts   ← ProfileData → <300 token string injected into AI prompt
lib/supabase/client.ts    ← browser client (NEXT_PUBLIC_ anon key)
lib/supabase/server.ts    ← service role client — server-side only, bypasses RLS
proxy.ts                  ← route guard for /profile (Next.js 16 uses proxy.ts, not middleware.ts)
app/auth/                 ← sign-in page + SignInForm client component
app/profile/              ← profile page + ProfileForm + TagInput client components
app/api/profile/          ← GET/POST /api/profile, POST /api/profile/session
app/api/oauth/            ← /authorize /token /me — ChatGPT OAuth 2.0 spec
app/api/auth/[...nextauth]/ ← NextAuth handler
```

## Route guard

Next.js 16 deprecated `middleware.ts` — use `proxy.ts` at the root instead. Same export shape, same `config.matcher`. Do not create `middleware.ts`.

## Supabase clients

- **Browser client** (`lib/supabase/client.ts`): uses `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Only for client components (currently unused — all data fetching is server-side).
- **Service client** (`lib/supabase/server.ts`): uses `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`. Server-side only. Bypasses RLS. Never expose to client.

## ChatGPT OAuth flow

1. ChatGPT redirects to `/api/oauth/authorize?client_id=...&redirect_uri=...&state=...&response_type=code`
2. If not signed in → redirect to `/auth?next=<encoded authorize URL>`
3. Sign in → redirect back → generate 10-min JWT auth code → redirect to ChatGPT
4. ChatGPT backend calls `POST /api/oauth/token` with code + client credentials
5. Returns `{ access_token, token_type, compressed_profile }`
6. ChatGPT calls `GET /api/oauth/me` with Bearer token → full profile + compressed context

Auth codes and access tokens are stateless JWTs signed with `NEXTAUTH_SECRET`. No extra DB table needed.

## compress-profile output format

```
Junior at Yale, Environmental Studies, goal: climate policy, completed: ENV200 PLSC301, constraints: NYC only
```

Rules: year + school + major first; top 2 career targets; course codes only, max 10; omit empty fields.

## What not to change

- **`proxy.ts` filename** — Next.js 16 convention; `middleware.ts` is deprecated
- **`/api/oauth/*` URL structure** — ChatGPT GPT action hardcodes these
- **`NEXT_PUBLIC_` prefix** on client-side Supabase env vars
- **Service role key server-side only** — never import `lib/supabase/server.ts` from a client component

## Environment variables

See README.md for the full list. Both `SUPABASE_URL` (server) and `NEXT_PUBLIC_SUPABASE_URL` (client) must be set — they're the same URL but with different env var names due to Next.js browser exposure rules.
