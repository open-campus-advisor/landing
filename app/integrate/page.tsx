import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integration — REST API & MCP Agentic Tools | Open Campus Advisor",
  description:
    "Two integration surfaces: a REST API for platforms that already serve students, and a hosted remote MCP server for agentic AI workflows in Claude.ai, Claude Desktop, and Claude Code. 19 tools, session-scoped student context, live data across 101 US colleges.",
  alternates: { canonical: "https://opencampusadvisor.org/integrate" },
};

const SCHOOLS = [
  "Columbia", "Cornell", "MIT", "Stanford", "Yale", "Brown", "Penn", "Dartmouth",
  "Notre Dame", "Illinois", "Harvey Mudd", "Wesleyan", "Williams", "Middlebury",
  "Bates", "Vassar", "Swarthmore", "Macalester", "Grinnell", "Davidson",
  "Pomona", "CMC", "Scripps", "Pitzer", "Morehouse", "Furman", "Hope",
  "Berry", "Belmont", "JMU", "Radford", "Longwood",
  "+ 69 more",
];

const DATA_LAYERS = [
  { label: "Live course catalogs", detail: "Sections, instructors, enrollment status, and prerequisites — sourced directly from institutional registration systems, refreshed every 60 minutes" },
  { label: "Faculty research profiles", detail: "Research areas, recent publications, and active NIH grant data by investigator, drawn from the public NIH Reporter API" },
  { label: "Degree requirements", detail: "344 curated major programs across 28 disciplines — Computer Science, Economics, Biology, Political Science, Engineering, and more — maintained against official institutional catalogs" },
  { label: "Career outcome data", detail: "47 career pathways across 11 tracks with Bureau of Labor Statistics salary ranges, 10-year outlook projections, skill requirements, and RIASEC interest mapping" },
  { label: "Cross-institutional comparison", detail: "Rank institutions by academic strength in any subject area — courses, faculty concentration, and research activity" },
  { label: "Personalized student enrichment", detail: "Filter completed coursework, rank results by stated goals, surface constraint risks, and generate individualized next-semester recommendations" },
];

const PATTERNS = [
  {
    number: "01",
    title: "Individual student path query",
    description:
      "A counselor opens a student record. Your platform calls /api/v1/path with the student's academic context. The response — institutions ranked by fit, matched coursework, relevant faculty — surfaces directly within your existing UI alongside the student's record.",
    code: `POST /api/v1/path
x-institution-id: your-platform
{
  "goal": "climate policy analyst",
  "schools": "yale,columbia,mit",
  "student_context": {
    "year": "junior",
    "completed_courses": ["ENV200"],
    "constraints": ["NYC-based jobs only"]
  }
}`,
  },
  {
    number: "02",
    title: "Cohort enrichment",
    description:
      "A scheduled job processes your full active student cohort in a single pass. Up to 20 queries execute in parallel with a 15-second per-item timeout. Results are returned to your data layer — counselors see enriched profiles the following morning without any manual intervention.",
    code: `POST /api/v1/batch/path
x-institution-id: your-platform
{
  "requests": [
    { "goal": "ML engineer", "schools": "mit,stanford" },
    { "goal": "climate researcher", "schools": "yale,brown" },
    ...up to 20
  ]
}`,
  },
  {
    number: "03",
    title: "AI advisor grounding",
    description:
      "Your platform has an existing AI layer. Compress the student's academic context into a compact string and inject it into your system prompt alongside live institutional data. Your AI advisor responds with verified, source-attributed information rather than general knowledge.",
    code: `// Step 1: compress context for prompt injection
POST /api/v1/profile/compress
{ "student_context": { ... }, "school": "yale" }
// → "Junior at Yale, Env Studies, goal: climate policy..."

// Step 2: retrieve live institutional data
POST /api/v1/path
{ "goal": "...", "student_context": { ... } }
// → ranked institutions, verified courses, active faculty`,
  },
];

export default function Integrate() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-24">

      {/* Nav back */}
      <div>
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
          ← Open Campus Advisor
        </Link>
      </div>

      {/* Hero */}
      <section className="space-y-6">
        <p className="text-xs font-medium uppercase tracking-widest text-gray-400">Platform & Agentic Integration</p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight">
          Academic intelligence infrastructure.<br />
          <span className="text-gray-400 font-light">REST API and MCP server.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
          Two integration surfaces. A <strong className="text-gray-700">REST API</strong> for platforms that already serve students — providing live course catalogs, faculty research, degree requirements, and career outcomes across 101 institutions. A hosted <strong className="text-gray-700">remote MCP server</strong> for agentic AI workflows in Claude.ai, Claude Desktop, and Claude Code — 19 tools, session-scoped student context, OAuth profile auto-load, no installation required.
        </p>
        <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
          Your product surface. Your student relationship. Our data infrastructure.
        </p>
        <div className="flex items-center gap-4 pt-2">
          <Link
            href="mailto:hello@opencampusadvisor.org"
            className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Request a technical evaluation →
          </Link>
          <a
            href="https://api.opencampusadvisor.org/openapi.json"
            target="_blank"
            className="text-gray-500 text-sm hover:text-gray-900 transition-colors"
          >
            View API specification →
          </a>
        </div>
      </section>

      {/* The pitch */}
      <section className="space-y-6 border-l-2 border-gray-100 pl-6">
        <p className="text-gray-900 font-medium text-lg leading-relaxed">
          Building and maintaining live academic data infrastructure across hundreds of institutions — sourcing from registration systems, parsing catalog formats, managing Cloudflare bypass, keeping degree requirements current — is an 18-month engineering investment before you ship a single feature. We have already built it. Integration is a contract and three API endpoints.
        </p>
      </section>

      {/* What's in the graph */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold">Data coverage</h2>
          <p className="text-gray-500 mt-2">Six structured data layers sourced from institutional catalogs, federal grant databases, and Bureau of Labor Statistics data.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DATA_LAYERS.map((layer) => (
            <div key={layer.label} className="border border-gray-100 rounded-xl p-5 space-y-2">
              <p className="font-medium text-gray-900 text-sm">{layer.label}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{layer.detail}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">101 live institutions</p>
          <div className="flex flex-wrap gap-2">
            {SCHOOLS.map((s) => (
              <span key={s} className={`text-xs px-2.5 py-1 rounded-full ${s.startsWith("+") ? "text-gray-400" : "bg-gray-100 text-gray-600 font-medium"}`}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Integration patterns */}
      <section className="space-y-12">
        <div>
          <h2 className="text-2xl font-semibold">Integration patterns</h2>
          <p className="text-gray-500 mt-2">Three deployment models. Each maps to a distinct use case. Most institutional integrations use all three in combination.</p>
        </div>
        {PATTERNS.map((p) => (
          <div key={p.number} className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-light text-gray-200">{p.number}</span>
              <h3 className="font-semibold text-gray-900">{p.title}</h3>
            </div>
            <p className="text-gray-500 leading-relaxed max-w-2xl">{p.description}</p>
            <pre className="bg-gray-900 text-gray-100 p-5 rounded-xl text-xs overflow-x-auto leading-relaxed">
              <code>{p.code}</code>
            </pre>
          </div>
        ))}
      </section>

      {/* MCP / Agentic integration */}
      <section className="space-y-8 border-t border-gray-100 pt-16">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-2">Agentic integration</p>
          <h2 className="text-2xl font-semibold">Remote MCP server — Claude.ai, Desktop &amp; Code</h2>
          <p className="text-gray-500 mt-2 max-w-2xl">
            For AI-native workflows, Open Campus Advisor runs as a hosted remote Model Context Protocol (MCP) server. No installation required. Claude agents get 19 purpose-built tools, session-scoped student context, and full observability — connect with a single URL.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "19 structured tools", detail: "Course search, faculty research, degree requirements, career outcomes, cross-school comparison, and gap reporting — all discrete MCP tools with typed schemas across all 101 schools." },
            { label: "No installation required", detail: "Connect via a single URL. No npm install, no local process, no SCHOOL env var. Works in Claude.ai web, Claude Desktop, and Claude Code out of the box." },
            { label: "Session-scoped student context", detail: "set_student_context merges the student's profile progressively across turns. Course results are filtered and ranked automatically. RIASEC codes auto-derive career targets." },
            { label: "OAuth profile auto-load", detail: "When a student signs in with Google through Claude.ai, their stored StudentContext loads automatically at session start — no manual set_student_context call needed." },
            { label: "Personalized path planning", detail: "When student context is set, explore_academic_path switches to POST with full context in body, returning personalized next-semester recommendations and constraint warnings." },
            { label: "Full PostHog observability", detail: "Every tool call tracked with school, tool name, response_time_ms, and whether student context is active. Remote sessions fully instrumented alongside REST usage." },
          ].map((f) => (
            <div key={f.label} className="border border-gray-100 rounded-xl p-5 space-y-2">
              <p className="font-medium text-gray-900 text-sm">{f.label}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{f.detail}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-700">Connect in Claude.ai, Claude Desktop, or Claude Code:</p>
          <pre className="bg-gray-900 text-gray-100 p-5 rounded-xl text-xs overflow-x-auto leading-relaxed">
            <code>{`# Claude.ai — Settings → Integrations → Add MCP Server
URL: https://api.opencampusadvisor.org/mcp
# Sign in with Google when prompted — student profile loads automatically

# Claude Code — add to .claude/settings.json
{
  "mcpServers": {
    "open-campus-advisor": {
      "url": "https://api.opencampusadvisor.org/mcp"
    }
  }
}

# Claude Desktop — add to claude_desktop_config.json
{
  "mcpServers": {
    "open-campus-advisor": {
      "url": "https://api.opencampusadvisor.org/mcp"
    }
  }
}`}</code>
          </pre>
          <p className="text-sm font-medium text-gray-700 pt-2">Agentic workflow example:</p>
          <pre className="bg-gray-900 text-gray-100 p-5 rounded-xl text-xs overflow-x-auto leading-relaxed">
            <code>{`// Agent learns about the student across turns:
set_student_context({ year: "junior", major: "Environmental Studies",
  completed_courses: ["ENV200", "PLSC301"], career_targets: ["climate policy analyst"] })

// All per-school tools take a school slug:
search_courses({ school: "yale", query: "climate", department: "EVST" })
// → completed courses removed, results ranked by career target

// With student context set, path uses POST with full context:
explore_academic_path({ goal: "climate policy analyst", schools: "yale,columbia" })
// → personalized_next_semester + constraint warnings per school

// Agent confirms what it knows:
get_student_context()
// → { year: "junior", major: "Environmental Studies", ... }`}</code>
          </pre>
        </div>
      </section>

      {/* Institution analytics */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Usage analytics and reporting</h2>
        <p className="text-gray-500 max-w-2xl leading-relaxed">
          Every request carrying your <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">x-institution-id</code> header is attributed to your account in our analytics layer. Your data is scoped to your institution — you see your students&apos; usage patterns, not the aggregate.
        </p>
        <ul className="space-y-2 text-sm text-gray-600">
          {[
            "Goal distribution — what academic and career paths your students are exploring",
            "Institutional demand — which colleges and universities your cohort is actively researching",
            "Coverage signals — queries your students ask that fall outside current data coverage, reported as structured gap events",
            "Endpoint utilization — which API surfaces your integration depends on most",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="text-gray-300 mt-0.5">›</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-400">
          Coverage gap signals from your institution feed directly into our data expansion roadmap. Schools your students query most — and that we don&apos;t yet cover — move to the top of the build queue.
        </p>
      </section>

      {/* What you don't handle */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Scope of service</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400">Provided by Open Campus Advisor</p>
            <ul className="space-y-2 text-sm text-gray-700">
              {[
                "Live course catalog data across 101 institutions",
                "Faculty research profiles and NIH grant records",
                "Curated degree requirements and career outcome data",
                "Data sourcing, parsing, maintenance, and uptime",
                "Ongoing institutional coverage expansion toward 400 schools",
                "Data freshness and quality assurance",
              ].map((i) => (
                <li key={i} className="flex items-start gap-2"><span className="text-gray-300">›</span>{i}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400">Retained by your platform</p>
            <ul className="space-y-2 text-sm text-gray-700">
              {[
                "Student identity, authentication, and account management",
                "Session state and data persistence",
                "Product interface and user experience",
                "AI system prompt, persona, and response presentation",
                "Per-student rate limiting and access controls",
                "Compliance obligations to your end users",
              ].map((i) => (
                <li key={i} className="flex items-start gap-2"><span className="text-gray-300">›</span>{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* API reference — enterprise signals */}
      <section className="space-y-12 border-t border-gray-100 pt-16">
        <div>
          <h2 className="text-2xl font-semibold">API reference</h2>
          <p className="text-gray-500 mt-2 max-w-2xl">Stability guarantees, rate limits, authentication, and error handling for production integrations.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Versioning */}
          <div className="border border-gray-100 rounded-xl p-6 space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400">Versioning</p>
            <p className="font-medium text-gray-900 text-sm">Stable — 90-day deprecation notice</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              The <code className="bg-gray-100 px-1 rounded">/api/v1/</code> prefix is frozen. New endpoints are additive and never break existing integrations. Breaking changes — if ever required — receive a 90-day notice and a new version prefix before the old one is retired.
            </p>
          </div>

          {/* Rate limits */}
          <div className="border border-gray-100 rounded-xl p-6 space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400">Rate limits</p>
            <p className="font-medium text-gray-900 text-sm">300 requests / minute per API key</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Cross-school endpoints (<code className="bg-gray-100 px-1 rounded">/search</code>, <code className="bg-gray-100 px-1 rounded">/faculty/search</code>, <code className="bg-gray-100 px-1 rounded">/path</code>) count as one request regardless of how many schools are queried. The batch endpoint processes up to 20 goal queries per request. Sustained higher limits available for enterprise contracts.
            </p>
          </div>

          {/* SLA */}
          <div className="border border-gray-100 rounded-xl p-6 space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400">Uptime & freshness</p>
            <p className="font-medium text-gray-900 text-sm">99.5% monthly uptime · 60-minute cache</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              The API is hosted on Railway with a persistent process — TTL cache survives between requests, so every call after the first in each 60-minute window is fast. Data reflects institutional registration systems as of the last cache refresh. Historical uptime available on request.
            </p>
          </div>

          {/* Auth */}
          <div className="border border-gray-100 rounded-xl p-6 space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400">Authentication</p>
            <p className="font-medium text-gray-900 text-sm">API key (B2B) or Bearer JWT (student)</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Send <code className="bg-gray-100 px-1 rounded">x-api-key: oca_live_...</code> on all requests. Course data is publicly readable — the key is required for usage attribution, per-institution analytics, and access to Mode 2 personalization endpoints. Keys are issued per integration and rotatable on request.
            </p>
          </div>

        </div>

        {/* Error codes */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-700">Error responses</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-2 pr-6 font-medium text-gray-500 w-16">Status</th>
                  <th className="py-2 pr-6 font-medium text-gray-500 w-32">Meaning</th>
                  <th className="py-2 font-medium text-gray-500">What to do</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {[
                  ["400", "Bad request", "Missing or invalid parameter — check query string and request body against the spec"],
                  ["401", "Unauthorized", "Bearer JWT required — student must authenticate via /api/v1/auth/login"],
                  ["403", "Forbidden", "API key present but not recognized — verify x-api-key matches the issued value"],
                  ["404", "Not found", "School slug, course ID, or resource does not exist — verify against /api/v1/schools"],
                  ["429", "Rate limited", "Exceeded 300 req/min — implement exponential backoff; contact us for higher limits"],
                  ["500", "Server error", "Transient scraping or provider failure — retry after 10 seconds"],
                ].map(([code, meaning, action]) => (
                  <tr key={code} className="border-b border-gray-50">
                    <td className="py-2.5 pr-6 font-mono font-medium text-gray-900">{code}</td>
                    <td className="py-2.5 pr-6 text-gray-700">{meaning}</td>
                    <td className="py-2.5 text-gray-500">{action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </section>

      {/* CTA */}
      <section className="border border-gray-100 rounded-2xl p-8 space-y-4">
        <h2 className="text-xl font-semibold">Begin a technical evaluation</h2>
        <p className="text-gray-500 leading-relaxed">
          We work with a select number of platform partners through a structured evaluation process. If your platform serves students and you are assessing the build vs. partner decision on academic data infrastructure, we are available for a technical conversation.
        </p>
        <div className="flex items-center gap-4 pt-2">
          <Link
            href="mailto:hello@opencampusadvisor.org"
            className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            hello@opencampusadvisor.org →
          </Link>
          <a
            href="https://api.opencampusadvisor.org/health"
            target="_blank"
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            API status
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 pt-8 flex items-center justify-between text-sm text-gray-400">
        <Link href="/" className="hover:text-gray-600 transition-colors">← Open Campus Advisor</Link>
        <div className="flex gap-6">
          <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</Link>
        </div>
      </footer>

    </main>
  );
}
