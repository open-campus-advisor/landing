import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "B2B API Integration — Academic Data Infrastructure | Open Campus Advisor",
  description:
    "Academic data infrastructure API for EdTech platforms. Live course catalogs, degree requirements, faculty research, career outcomes, and student context enrichment across 37 US colleges. Built for Scoir, Naviance, College Board, and similar platforms.",
  alternates: { canonical: "https://opencampusadvisor.org/integrate" },
};

const SCHOOLS = [
  "Columbia", "Cornell", "Dartmouth", "Brown", "Penn",
  "MIT", "Stanford", "Yale", "Notre Dame", "Illinois",
  "Wesleyan", "Williams", "Middlebury", "Bates", "Vassar",
  "Bryn Mawr", "Colorado College", "Gonzaga", "Baylor", "Ole Miss",
  "Harvey Mudd", "Lafayette", "CSUN", "Swarthmore", "Macalester",
  "+ 12 more",
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
        <p className="text-xs font-medium uppercase tracking-widest text-gray-400">Platform Integration</p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight">
          Academic intelligence infrastructure.<br />
          <span className="text-gray-400 font-light">Built for integration.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
          Platforms that already serve students don&apos;t need to build an academic data layer — they need to connect to one. Open Campus Advisor provides live course catalogs, faculty research profiles, degree requirements, and career outcome data across 37 institutions, available through a single authenticated API.
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
            href="https://api.opencampusadvisor.org/openapi-chatgpt.json"
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
          <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">37 live institutions</p>
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
                "Live course catalog data across 37 institutions",
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
