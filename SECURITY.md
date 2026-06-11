# Security

## Reporting a Vulnerability

Email **hello@opencampusadvisor.org** with details. We aim to respond within 48 hours.

---

## Known Issues

### PostCSS XSS via Unescaped `</style>` (Moderate)

| | |
|---|---|
| **CVE** | GHSA-qx2v-qp2m-jg93 |
| **Package** | `postcss <8.5.10` (bundled inside Next.js 9.3.4-canary.0 – 16.3.0-canary.5) |
| **Current Next.js** | 16.2.9 (latest stable — still in vulnerable range) |
| **Fix available** | Next.js ≥16.3.0 (currently in canary) |
| **Discovered** | 2026-06-10 |

**What it is:** PostCSS's CSS stringify output can include unescaped `</style>` sequences, which could lead to XSS if injected into an HTML document.

**Practical impact here:** Build-time only. This site has no user-generated CSS — the attack surface does not exist in practice.

**Action:** Upgrade Next.js when 16.3.0 stable releases.

---

## Resolved

### nodemailer SMTP Command Injection — RESOLVED 2026-06-11

The `nodemailer` vulnerability (GHSA-c7w3-x93f-qmm8, GHSA-vvjj-xcjg-gr5g) was present via the `next-auth → @auth/core → nodemailer` dependency chain. **Resolved** by removing `next-auth`, `nodemailer`, and all auth packages from this repo — authentication moved to the Express API at `api.opencampusadvisor.org`.

---

## Dependency Audit

Run `npm audit` in this repo to see the current state.
Dependencies are now `next`, `react`, `react-dom` only.
