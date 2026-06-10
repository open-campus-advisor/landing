import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Integration — Open Campus Advisor",
  description:
    "Academic data infrastructure for platforms that already own the student relationship. Live course catalogs, faculty research, and career outcomes — three endpoints.",
};

const SCHOOLS = [
  "Columbia", "Cornell", "Dartmouth", "Brown", "Penn",
  "MIT", "Stanford", "Yale", "Wesleyan", "Williams",
  "Middlebury", "Bates", "Vassar", "Bryn Mawr", "Colorado College",
  "Gonzaga", "Baylor", "Ole Miss", "CSUN", "Lafayette",
  "+ 14 more",
];

const DATA_LAYERS = [
  { label: "Live course catalogs", detail: "Sections, instructors, enrollment, prereqs — updated nightly from 34 institutions" },
  { label: "Faculty research profiles", detail: "Research interests, publications, active NIH grants by researcher" },
  { label: "Degree requirements", detail: "Curated major and minor requirements for CS and Environmental Studies across 5 schools" },
  { label: "Career outcomes", detail: "11 career paths with BLS salary data, outlook, skills, and which majors lead there" },
  { label: "Cross-school comparison", detail: "Rank any set of schools by strength in a given topic or research area" },
  { label: "Student context enrichment", detail: "Filter completed courses, rank by career goals, flag timeline risks" },
];

const PATTERNS = [
  {
    number: "01",
    title: "Single-student enrichment",
    description:
      "Counselor opens a student profile. Your platform calls /api/v1/path with their context. Results — ranked schools, matched courses, key faculty — appear alongside the student record in your UI.",
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
    title: "Cohort batch processing",
    description:
      "Nightly job enriches all active students in one pass. Twenty at a time, parallel execution, 15-second timeout per item. Results stored in your database — your counselors see them in the morning.",
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
    title: "AI advisor augmentation",
    description:
      "Your product has its own AI layer. Inject compressed student context and live path data into your system prompt. Your advisor gives grounded, specific recommendations instead of hallucinations.",
    code: `// Step 1: compress context for injection
POST /api/v1/profile/compress
{ "student_context": { ... }, "school": "yale" }
// → "Junior at Yale, Env Studies, goal: climate policy..."

// Step 2: get live data
POST /api/v1/path
{ "goal": "...", "student_context": { ... } }
// → ranked schools, real courses, actual faculty`,
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
        <p className="text-xs font-medium uppercase tracking-widest text-gray-400">For platforms</p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight">
          Academic data infrastructure.<br />
          <span className="text-gray-400 font-light">Not another chatbot.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
          If your platform already owns the student relationship, you don&apos;t need to build the data layer. Ours is live across 34 colleges and universities — courses, faculty, research grants, degree requirements, career outcomes.
        </p>
        <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
          Three endpoints. Your product, our data.
        </p>
        <div className="flex items-center gap-4 pt-2">
          <Link
            href="mailto:hello@opencampusadvisor.org"
            className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Request integration access →
          </Link>
          <a
            href="https://api.opencampusadvisor.org/openapi.json"
            target="_blank"
            className="text-gray-500 text-sm hover:text-gray-900 transition-colors"
          >
            View OpenAPI spec →
          </a>
        </div>
      </section>

      {/* The pitch */}
      <section className="space-y-6 border-l-2 border-gray-100 pl-6">
        <p className="text-gray-900 font-medium text-lg leading-relaxed">
          &ldquo;We&apos;ve already built the live data infrastructure you&apos;d spend 18 months building. Plug our graph into your product and your AI advisor has real answers instead of hallucinations.&rdquo;
        </p>
        <p className="text-sm text-gray-400">The pitch to College Board, Scoir, Naviance, and any platform with a student relationship.</p>
      </section>

      {/* What's in the graph */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold">What&apos;s in the graph</h2>
          <p className="text-gray-500 mt-2">Six data layers. All live. None of it hallucinated.</p>
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
          <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">34 live institutions</p>
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
          <h2 className="text-2xl font-semibold">Three integration patterns</h2>
          <p className="text-gray-500 mt-2">Pick the one that fits your architecture. Most platforms use all three.</p>
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
        <h2 className="text-2xl font-semibold">You see your usage. Not everyone else&apos;s.</h2>
        <p className="text-gray-500 max-w-2xl leading-relaxed">
          Every request tagged with <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">x-institution-id</code> is tracked separately in PostHog. You get a scoped view of:
        </p>
        <ul className="space-y-2 text-sm text-gray-600">
          {[
            "Top goals — what your students are actually trying to figure out",
            "Top schools queried — which institutions matter to your cohort",
            "Gap signals — what your students ask about that we can't answer yet (feeds our roadmap)",
            "Tool usage — which API surfaces your integration uses most",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="text-gray-300 mt-0.5">›</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-400">
          Gap signals from your platform go directly to the top of our school build queue. If your students keep asking about Harvard and we don&apos;t have it — we build it next.
        </p>
      </section>

      {/* What you don't handle */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">What we handle. What you handle.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400">We own</p>
            <ul className="space-y-2 text-sm text-gray-700">
              {[
                "Live course catalogs across 34 institutions",
                "Faculty research profiles and NIH grants",
                "Degree requirements and career outcomes",
                "Cloudflare bypass, API maintenance, uptime",
                "Expanding the school graph toward 400",
                "Data quality and freshness",
              ].map((i) => (
                <li key={i} className="flex items-start gap-2"><span className="text-gray-300">›</span>{i}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400">You own</p>
            <ul className="space-y-2 text-sm text-gray-700">
              {[
                "Student identity and accounts",
                "Session management and persistence",
                "UI and product experience",
                "Your AI system prompt and persona",
                "Auth for your users",
                "Rate limiting per student",
              ].map((i) => (
                <li key={i} className="flex items-start gap-2"><span className="text-gray-300">›</span>{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border border-gray-100 rounded-2xl p-8 space-y-4">
        <h2 className="text-xl font-semibold">Get integration access</h2>
        <p className="text-gray-500 leading-relaxed">
          We&apos;re working with a small number of platform partners to build the integration and validate the fit. If your platform has a student relationship that could use better academic data, let&apos;s talk.
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
        <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</Link>
      </footer>

    </main>
  );
}
