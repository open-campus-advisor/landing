# Open Campus Advisor — Website

`opencampusadvisor.org` — Next.js 16 + Tailwind CSS, deployed on Vercel.

## What it is

Landing page + student profile layer. Students authenticate once, their academic profile persists in Supabase, and gets injected as compressed context into each ChatGPT session via OAuth.

## Routes

| Route | Type | Description |
|---|---|---|
| `/` | Static | Landing page |
| `/auth` | Dynamic | Sign in — Google OAuth + magic link |
| `/profile` | Dynamic | Student profile form (protected) |
| `/api/profile` | API | GET/POST profile + compressed context string |
| `/api/profile/session` | API | POST transcript → delta → update profile |
| `/api/oauth/authorize` | API | ChatGPT OAuth 2.0 authorize |
| `/api/oauth/token` | API | ChatGPT OAuth 2.0 token exchange |
| `/api/oauth/me` | API | GPT action — returns profile + compressed context |
| `/api/auth/[...nextauth]` | API | NextAuth handler (Google, Nodemailer) |

## File structure

```
app/
  auth/
    page.tsx          ← sign-in page (server component)
    SignInForm.tsx     ← Google button + magic link form (client)
  profile/
    page.tsx          ← protected profile page (server component)
    ProfileForm.tsx   ← form with tag inputs (client)
    TagInput.tsx      ← reusable tag/pill input (client)
  api/
    auth/[...nextauth]/route.ts
    profile/route.ts
    profile/session/route.ts
    oauth/authorize/route.ts
    oauth/token/route.ts
    oauth/me/route.ts
lib/
  auth.ts             ← NextAuth config — Google + Nodemailer + SupabaseAdapter
  compress-profile.ts ← ProfileData → <300 token string for AI injection
  supabase/
    client.ts         ← browser client (anon key)
    server.ts         ← server client (service role key, never exposed)
proxy.ts              ← route guard — redirects /profile to /auth if no session
```

## Supabase schema

```sql
create table profiles (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  auth_provider text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table academic (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  school text, major text, year text, gpa numeric,
  completed_courses jsonb default '[]',
  transfer_credits jsonb default '[]',
  updated_at timestamptz default now()
);

create table goals (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  career_targets jsonb default '[]',
  interests jsonb default '[]',
  constraints jsonb default '[]',
  updated_at timestamptz default now()
);

create table sessions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  summary text, delta jsonb,
  created_at timestamptz default now()
);

-- Required for upserts
alter table academic add constraint academic_profile_id_unique unique (profile_id);
alter table goals add constraint goals_profile_id_unique unique (profile_id);

-- RLS
alter table profiles enable row level security;
alter table academic enable row level security;
alter table goals enable row level security;
alter table sessions enable row level security;
```

Also run the NextAuth adapter tables from [authjs.dev/getting-started/adapters/supabase](https://authjs.dev/getting-started/adapters/supabase) — needed for account linking and magic links.

## Environment variables

```
# NextAuth
NEXTAUTH_SECRET
NEXTAUTH_URL                        # https://opencampusadvisor.org in prod

# Google OAuth (console.cloud.google.com)
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

# Supabase — server-side
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

# Supabase — client-side (NEXT_PUBLIC_ prefix required)
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

# Railway API (for session delta)
RAILWAY_API_URL                     # https://api.opencampusadvisor.org

# ChatGPT OAuth
NEXTAUTH_CHATGPT_CLIENT_ID
NEXTAUTH_CHATGPT_CLIENT_SECRET

# Magic link (optional — omit to disable email sign-in)
EMAIL_SERVER
EMAIL_FROM
```

## Google OAuth setup

Add to authorized redirect URIs in Google Cloud Console:
```
https://opencampusadvisor.org/api/auth/callback/google
http://localhost:3000/api/auth/callback/google   # local dev
```

## ChatGPT GPT action setup

- **Auth URL:** `https://opencampusadvisor.org/api/oauth/authorize`
- **Token URL:** `https://opencampusadvisor.org/api/oauth/token`
- **Action endpoint:** `GET https://opencampusadvisor.org/api/oauth/me` (Bearer token)

The token response includes `compressed_profile` — inject directly into the GPT system prompt.

## Development

```bash
npm install
npm run dev   # http://localhost:3000
```

## Deploy

Auto-deploys to Vercel on push to `main`. Repo: `github.com/open-campus-advisor/website` (public).

## Related

- **Core repo:** `github.com/open-campus-advisor/open-campus-advisor` (private)
- **REST API:** `api.opencampusadvisor.org` (Railway, auto-deploy)
- **npm:** `open-campus-advisor`
