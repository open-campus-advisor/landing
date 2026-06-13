import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Server — Open Campus Advisor",
  description: "Connect Open Campus Advisor to Claude as a remote MCP server. 19 tools, live data across 100+ colleges, session-scoped student context. No installation required.",
  alternates: { canonical: "https://opencampusadvisor.org/mcp" },
};

const TOOLS = [
  {
    category: "School & Catalog",
    description: "Per-school tools — all take a school slug as the first parameter.",
    tools: [
      { name: "list_schools", params: "", description: "All available school slugs." },
      { name: "list_departments", params: "school", description: "All department codes at a school. Call this before searching courses." },
      { name: "search_courses", params: "school, query, department?, term?", description: "Find courses by keyword and/or department. Returns sections, instructors, live enrollment." },
      { name: "get_course_details", params: "school, courseId, term?", description: "Full course record: description, prerequisites, gen-ed area, seat availability per section." },
      { name: "list_first_year_seminars", params: "school, term?", description: "All First-Year Seminars — small, discussion-based intro courses." },
      { name: "list_courses_for_freshmen", params: "school, department, term?", description: "Intro-level courses in a department that first-year students can take." },
      { name: "list_gen_ed_courses", params: "school, department, term?", description: "Courses fulfilling distribution or general education requirements." },
      { name: "search_by_instructor", params: "school, instructor, term?", description: "All courses taught by a specific professor this term." },
      { name: "search_faculty_research", params: "school, query, department, term?", description: "Faculty by research topic — summaries, contact info, websites." },
      { name: "get_faculty_profile", params: "school, facultyId", description: "Full profile: biography, research, recent publications, active NIH grants." },
    ],
  },
  {
    category: "Cross-School",
    description: "Search or compare across all 100+ schools simultaneously.",
    tools: [
      { name: "search_all_schools", params: "query, schools?", description: "Course offerings across all schools ranked by topic coverage." },
      { name: "search_faculty_all_schools", params: "query, schools?", description: "Researchers across all schools by topic — auto-discovers departments." },
    ],
  },
  {
    category: "Navigation",
    description: "The academic graph layer — maps goals to courses, majors, and careers.",
    tools: [
      { name: "explore_academic_path", params: "goal, schools?", description: "Full academic path for a career goal — schools ranked, matched majors, key courses, key faculty." },
      { name: "get_major_requirements", params: "school, major", description: "Exact degree requirements: required courses, elective groups, prerequisites, catalog URL." },
      { name: "get_career_outcomes", params: "careerSlug", description: "Salary, job outlook, required skills, typical employers, time to entry." },
      { name: "get_career_paths", params: "careerSlug", description: "Which majors and schools lead to a career — and adjacent careers nearby." },
    ],
  },
  {
    category: "Student Context",
    description: "Session-scoped student profile — stored in memory for the duration of the connection.",
    tools: [
      { name: "set_student_context", params: "context", description: "Merge student profile into the session. Arrays append and deduplicate. Scalar fields replace. RIASEC codes auto-derive career targets." },
      { name: "get_student_context", params: "", description: "Read back the current stored profile." },
    ],
  },
  {
    category: "System",
    description: "",
    tools: [
      { name: "report_answer_gap", params: "gap_type, query, detail, school?", description: "Log when the system can't answer — feeds the data expansion roadmap." },
    ],
  },
];

const CONNECT = [
  {
    label: "Claude.ai",
    detail: "Settings → Integrations → Add MCP Server",
    code: "https://api.opencampusadvisor.org/mcp",
    note: "Sign in with Google when prompted — your student profile loads automatically each session.",
  },
  {
    label: "Claude Code",
    detail: "Add to .claude/settings.json",
    code: `{
  "mcpServers": {
    "open-campus-advisor": {
      "url": "https://api.opencampusadvisor.org/mcp"
    }
  }
}`,
    note: "",
  },
  {
    label: "Claude Desktop",
    detail: "Add to claude_desktop_config.json",
    code: `{
  "mcpServers": {
    "open-campus-advisor": {
      "url": "https://api.opencampusadvisor.org/mcp"
    }
  }
}`,
    note: "",
  },
];

export default function MCPPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-24">

      {/* Nav */}
      <div>
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
          ← Open Campus Advisor
        </Link>
      </div>

      {/* Hero */}
      <section className="space-y-6">
        <p className="text-xs font-medium uppercase tracking-widest text-gray-400">Remote MCP Server</p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight">
          19 tools. One URL.<br />
          <span className="text-gray-400 font-light">No installation.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
          Open Campus Advisor runs as a hosted <strong className="text-gray-700">Model Context Protocol server</strong> — connect Claude to live course catalogs, faculty research, degree requirements, and career outcomes across 100+ US colleges and universities.
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-4">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-widest shrink-0">MCP URL</span>
          <code className="text-sm font-mono text-gray-900">https://api.opencampusadvisor.org/mcp</code>
        </div>
        <div className="pt-1">
          <a href="https://smithery.ai/servers/opencampusadvisor/oca" target="_blank" rel="noopener noreferrer">
            <img src="https://smithery.ai/badge/opencampusadvisor/oca" alt="Listed on Smithery" className="h-5" />
          </a>
        </div>
      </section>

      {/* Connect */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Connect</h2>
        <div className="space-y-6">
          {CONNECT.map((c) => (
            <div key={c.label} className="border border-gray-100 rounded-xl p-6 space-y-3">
              <div className="flex items-baseline gap-3">
                <p className="font-semibold text-gray-900">{c.label}</p>
                <p className="text-xs text-gray-400">{c.detail}</p>
              </div>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto leading-relaxed">
                <code>{c.code}</code>
              </pre>
              {c.note && <p className="text-xs text-gray-500">{c.note}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Auth */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Authentication</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-gray-100 rounded-xl p-6 space-y-3">
            <p className="font-medium text-gray-900 text-sm">OAuth — Claude.ai users</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              When connecting via Claude.ai, you&apos;ll be redirected to sign in with Google. Your stored student profile loads automatically at the start of every session — no need to call <code className="bg-gray-100 px-1 rounded">set_student_context</code> manually.
            </p>
          </div>
          <div className="border border-gray-100 rounded-xl p-6 space-y-3">
            <p className="font-medium text-gray-900 text-sm">API Key — Claude Code / Desktop</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Course data is publicly readable — no key required to use the tools. Add <code className="bg-gray-100 px-1 rounded">Authorization: Bearer &lt;key&gt;</code> to attribute usage to your institution in analytics. Contact <a href="mailto:hello@opencampusadvisor.org" className="underline">hello@opencampusadvisor.org</a> to request a key.
            </p>
          </div>
        </div>
      </section>

      {/* Student context */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">How student context works</h2>
        <p className="text-gray-500 max-w-2xl leading-relaxed">
          Call <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">set_student_context</code> once and it persists for the session — all subsequent course and faculty calls are automatically filtered and ranked against the stored profile.
        </p>
        <pre className="bg-gray-900 text-gray-100 p-5 rounded-xl text-xs overflow-x-auto leading-relaxed">
          <code>{`// Store what you know about the student
set_student_context({
  year: "junior",
  major: "Environmental Studies",
  completed_courses: ["ENV200", "PLSC301"],
  career_targets: ["climate policy analyst"],
  constraints: ["NYC-based internships only"]
})

// All subsequent calls are filtered + ranked automatically
search_courses({ school: "yale", query: "climate", department: "EVST" })
// → completed courses removed, results ranked by career target

// Path switches to personalized mode
explore_academic_path({ goal: "climate policy analyst", schools: "yale,columbia" })
// → personalized_next_semester + constraint warnings per school

// Confirm what the advisor knows
get_student_context()
// → { year: "junior", major: "Environmental Studies", ... }`}</code>
        </pre>
        <p className="text-xs text-gray-400">
          Array fields (<code className="bg-gray-100 px-1 rounded">completed_courses</code>, <code className="bg-gray-100 px-1 rounded">career_targets</code>, <code className="bg-gray-100 px-1 rounded">interests</code>) append and deduplicate on each call — scalar fields replace. RIASEC codes auto-derive career targets when no <code className="bg-gray-100 px-1 rounded">career_targets</code> are set.
        </p>
      </section>

      {/* Tool reference */}
      <section className="space-y-12">
        <h2 className="text-2xl font-semibold">Tool reference</h2>
        {TOOLS.map((group) => (
          <div key={group.category} className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900">{group.category}</p>
              {group.description && <p className="text-sm text-gray-500 mt-1">{group.description}</p>}
            </div>
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-2.5 font-medium text-gray-500 w-52">Tool</th>
                    <th className="px-4 py-2.5 font-medium text-gray-500 w-56 hidden sm:table-cell">Parameters</th>
                    <th className="px-4 py-2.5 font-medium text-gray-500">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {group.tools.map((tool) => (
                    <tr key={tool.name} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-gray-900 align-top">{tool.name}</td>
                      <td className="px-4 py-3 text-gray-400 align-top hidden sm:table-cell">{tool.params}</td>
                      <td className="px-4 py-3 text-gray-600 leading-relaxed align-top">{tool.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </section>

      {/* Schools */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">School slugs</h2>
        <p className="text-gray-500 text-sm">Pass any of these as the <code className="bg-gray-100 px-1.5 py-0.5 rounded">school</code> parameter. Call <code className="bg-gray-100 px-1.5 py-0.5 rounded">list_schools</code> from any Claude session to get the full current list.</p>
        <pre className="bg-gray-50 border border-gray-100 rounded-xl p-5 text-xs text-gray-600 leading-relaxed overflow-x-auto">
          <code>{`wesleyan · columbia · mit · stanford · yale · brown · penn · dartmouth · cornell
georgetownlaw · vassar · gwu · swarthmore · oberlin · macalester · bates · middlebury
williams · brynmawr · gonzaga · shu · salve · niagara · rosehulman · coloradocollege
baylor · eastern · immaculata · pointloma · olemiss · csun · csuchico · csudh
lafayette · notredame · harveymudd · illinois · davidson · allegheny · muhlenberg
wooster · hope · calvin · furman · goucher · american · fandm · providence · morehouse
mcdaniel · usfca · transy · xavieru · xaviernola · ohiowesleyan · westminsterpa
stmarysca · muskingum · smumn · cornellcollege · grinnell · wartburg · simpsonc
loras · sweetbriar · tusculum · ncwesleyan · belmontuniv · sienaheights · davenport
merrimack · endicott · berry · brenau · wesleyancollege · shorter · salisbury
coppinstate · morganstate · shenandoah · radford · longwood · jmu · nec · rivier
anselm · wou · pacificu · usd · sonomastate · csueastbay · csuci · chowan
heidelberg · cmc · scripps · pitzer · ggc · coastal · uncpembroke · pomona`}</code>
        </pre>
      </section>

      {/* CTA */}
      <section className="border border-gray-100 rounded-2xl p-8 space-y-4">
        <h2 className="text-xl font-semibold">Need a higher rate limit or B2B integration?</h2>
        <p className="text-gray-500 leading-relaxed">
          The MCP server is rate-limited at 300 requests/minute per API key. For institutional integrations, cohort analysis, or embedding the data layer into your platform, see the REST API.
        </p>
        <div className="flex items-center gap-4 pt-2 flex-wrap">
          <Link
            href="/integrate"
            className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            REST API & B2B integration →
          </Link>
          <Link href="mailto:hello@opencampusadvisor.org" className="text-gray-500 text-sm hover:text-gray-900 transition-colors">
            hello@opencampusadvisor.org
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 pt-8 flex items-center justify-between text-sm text-gray-400">
        <span>© 2026 Open Campus Advisor</span>
        <div className="flex gap-6">
          <Link href="mailto:hello@opencampusadvisor.org" className="hover:text-gray-600 transition-colors">Contact</Link>
          <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</Link>
        </div>
      </footer>

    </main>
  );
}
