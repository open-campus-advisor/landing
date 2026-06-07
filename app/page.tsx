import Link from "next/link";

const TOOLS = [
  { name: "list_departments", description: "All departments and programs with subject codes" },
  { name: "search_courses", description: "Keyword + department search — sections, instructors, schedules" },
  { name: "get_course_details", description: "Prerequisites, gen-ed requirements, live enrollment per section" },
  { name: "list_first_year_seminars", description: "All FYS seminars grouped by department" },
  { name: "list_courses_for_freshmen", description: "Courses appropriate for first-year students" },
  { name: "list_gen_ed_courses", description: "Courses fulfilling distribution requirements" },
  { name: "search_by_instructor", description: "All courses by an instructor — accepts names, not just IDs" },
  { name: "search_faculty_research", description: "Find faculty by research keyword within a department" },
  { name: "get_faculty_profile", description: "Full profile: bio, research, publications, and active NIH grants" },
];

const EXAMPLES = [
  "What CS courses can I take as a freshman this fall?",
  "What are the prerequisites for COMP312?",
  "Which professors do machine learning research?",
  "Show me all first-year seminars related to climate.",
  "Tell me about Professor Manfredi's research and grants.",
  "I want to study computational biology — where do I start?",
];

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-24">

      {/* Header */}
      <header className="flex items-center justify-between">
        <span className="font-semibold text-lg">Open Campus Advisor</span>
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <Link href="https://github.com/open-campus-advisor/open-campus-advisor" target="_blank" className="hover:text-gray-900 transition-colors">GitHub</Link>
          <Link href="https://www.npmjs.com/package/open-campus-advisor" target="_blank" className="hover:text-gray-900 transition-colors">npm</Link>
          <Link href="https://api.opencampusadvisor.org/health" target="_blank" className="hover:text-gray-900 transition-colors">API</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="space-y-6">
        <div className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
          Reference implementation: Wesleyan University
        </div>
        <h1 className="text-5xl font-bold leading-tight tracking-tight">
          AI advising for<br />any university.
        </h1>
        <p className="text-xl text-gray-500 max-w-xl leading-relaxed">
          Open source. Works with Claude and ChatGPT. Live course catalog, faculty research,
          active grants — through natural conversation.
        </p>
        <div className="flex items-center gap-4 pt-2">
          <Link
            href="https://github.com/open-campus-advisor/open-campus-advisor"
            target="_blank"
            className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Get started on GitHub
          </Link>
          <Link
            href="https://www.npmjs.com/package/open-campus-advisor"
            target="_blank"
            className="text-gray-500 text-sm hover:text-gray-900 transition-colors"
          >
            npm install →
          </Link>
        </div>
      </section>

      {/* Example prompts */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">What students ask</h2>
        <div className="grid gap-3">
          {EXAMPLES.map((example) => (
            <div key={example} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-300 mt-0.5">›</span>
              <span className="text-gray-700 italic">&ldquo;{example}&rdquo;</span>
            </div>
          ))}
        </div>
      </section>

      {/* Install */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Install</h2>

        <div className="space-y-4">
          <h3 className="font-medium">Claude Desktop</h3>
          <p className="text-sm text-gray-500">
            Edit{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">
              ~/Library/Application Support/Claude/claude_desktop_config.json
            </code>
          </p>
          <pre className="bg-gray-900 text-gray-100 p-5 rounded-xl text-sm overflow-x-auto leading-relaxed">{`{
  "mcpServers": {
    "open-campus-advisor": {
      "command": "npx",
      "args": ["open-campus-advisor"]
    }
  }
}`}</pre>
          <p className="text-sm text-gray-500">Quit and relaunch Claude Desktop. Done.</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Claude Code</h3>
          <pre className="bg-gray-900 text-gray-100 p-5 rounded-xl text-sm overflow-x-auto">{`claude mcp add open-campus-advisor -- npx open-campus-advisor`}</pre>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">ChatGPT</h3>
          <p className="text-sm text-gray-500">
            Use the{" "}
            <Link
              href="https://chatgpt.com/g/g-6a2583a8a7cc819198378184eaf9b15f-wesleyan-academic-advisor"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              Wesleyan Academic Advisor GPT
            </Link>
            {" "}— works on ChatGPT mobile and desktop.
          </p>
        </div>
      </section>

      {/* Tools */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">9 tools, one interface</h2>
        <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
          {TOOLS.map((tool) => (
            <div key={tool.name} className="flex items-start gap-4 px-5 py-4 bg-white hover:bg-gray-50 transition-colors">
              <code className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-mono whitespace-nowrap mt-0.5">
                {tool.name}
              </code>
              <span className="text-sm text-gray-500">{tool.description}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Add your school */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Add your school</h2>
        <p className="text-gray-500">
          Any university with a public course catalog can be added. Implement one interface, get all 9 tools for free.
        </p>
        <pre className="bg-gray-900 text-gray-100 p-5 rounded-xl text-sm overflow-x-auto leading-relaxed">{`// src/providers/yourschool.ts
export class YourSchoolProvider implements CatalogProvider {
  readonly schoolName = "Your University";
  readonly defaultTerm = "...";
  // implement 9 methods
}

// api.ts — one line to go live
app.use('/api/v1/yourschool', createRestRouter(new YourSchoolProvider()));`}</pre>
        <Link
          href="https://github.com/open-campus-advisor/open-campus-advisor"
          target="_blank"
          className="inline-block text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          Read the contributing guide →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 pt-8 flex items-center justify-between text-sm text-gray-400">
        <span>Open Campus Advisor — MIT License</span>
        <div className="flex gap-6">
          <Link href="https://github.com/open-campus-advisor/open-campus-advisor" target="_blank" className="hover:text-gray-600 transition-colors">GitHub</Link>
          <Link href="https://www.npmjs.com/package/open-campus-advisor" target="_blank" className="hover:text-gray-600 transition-colors">npm</Link>
          <Link href="https://api.opencampusadvisor.org/health" target="_blank" className="hover:text-gray-600 transition-colors">API status</Link>
        </div>
      </footer>

    </main>
  );
}
