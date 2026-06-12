import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Open Campus Advisor — AI Academic Advisor | Course Search, Faculty Research & Career Planning",
  description: "The AI academic advisor that knows your campus. Search live courses, find research faculty with active NIH grants, navigate degree requirements, and map your path from goals to career outcomes — across MIT, Stanford, Yale, and 34 more top US colleges.",
  alternates: { canonical: "https://opencampusadvisor.org" },
};

const EXAMPLES = [
  // Path & career — the most differentiated, lead with it
  {
    q: "I want to work in climate policy — which of these schools is strongest for that path?",
    category: "Path & career",
  },
  {
    q: "What would my academic path look like if I want to become an ML engineer?",
    category: "Path & career",
  },
  {
    q: "What does a climate policy analyst actually earn, and which majors lead there?",
    category: "Path & career",
  },
  {
    q: "I'm choosing between Stanford and MIT for CS — what are the curriculum and research differences?",
    category: "Path & career",
  },
  // Academics
  {
    q: "What CS courses can I take as a freshman this fall?",
    category: "Academics",
  },
  {
    q: "What are the prerequisites for CPSC 365 at Yale?",
    category: "Academics",
  },
  {
    q: "Show me all first-year seminars related to climate or the environment.",
    category: "Academics",
  },
  // Research
  {
    q: "Which CS professors at MIT do machine learning research?",
    category: "Research",
  },
  {
    q: "I'm interested in neuroscience — which professors at Columbia should I approach?",
    category: "Research",
  },
  {
    q: "Which BIOL faculty have active NIH grants right now?",
    category: "Research",
  },
  {
    q: "What research is happening in Notre Dame's theology and global affairs departments?",
    category: "Research",
  },
];

const CAPABILITIES = [
  {
    title: "Course catalog",
    description: "Search any college or university's live course catalog by topic, department, or instructor. Get prerequisites, enrollment data, gen-ed requirements, and first-year seminars — current as of today.",
    examples: ["What can I take as a freshman in the CS department?", "Which courses fulfill the quantitative reasoning requirement?"],
  },
  {
    title: "Faculty & research",
    description: "Find professors by research topic, see their active NIH grants, publications, and lab opportunities. Compare research strength across top US colleges and universities simultaneously.",
    examples: ["Who at Stanford studies large language models?", "Which BIOL faculty have active NIH grants?"],
  },
  {
    title: "Degree requirements",
    description: "Real major requirements — not approximations. CS, Economics, History, Biology, Political Science, Philosophy, and dozens more, curated from official catalogs and kept current. Covers open curriculum schools, distribution requirements, and core programs.",
    examples: ["What courses do I need for the CS major at Brown?", "How do MIT and Stanford differ in their CS requirements?"],
  },
  {
    title: "Academic paths & career outcomes",
    description: "Navigate from a career goal backwards to majors, courses, and professors — or forward from a major to see where it leads. Salary ranges, job outlook, and typical employers grounded in BLS data.",
    examples: ["What major and courses lead to climate policy work?", "What does a machine learning engineer actually earn?"],
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Ask naturally",
    description: "Tell Claude or ChatGPT what you're trying to figure out. No search filters, no dropdown menus — just a question.",
  },
  {
    step: "02",
    title: "The graph connects",
    description: "Open Campus Advisor traverses the academic graph in real time — live course data, faculty research, degree requirements, and career outcomes across top US colleges and universities.",
  },
  {
    step: "03",
    title: "Navigate your path",
    description: "Get a grounded answer, not a guess. Every fact traces back to live catalog data, faculty profiles, or NIH grant records. Ask follow-up questions to go deeper.",
  },
];

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-6 pt-12 pb-6 space-y-24">

      {/* Hero */}
      <section className="space-y-5">
        <div className="flex justify-center mb-6">
          <Image src="/logo-rectangle.png" alt="Open Campus Advisor" width={480} height={240} className="rounded-2xl"/>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Academic navigation for students
          </p>
          <p className="text-2xl font-semibold text-gray-900 leading-snug">
            Know exactly where you&apos;re going.
          </p>
          <p className="text-lg text-gray-500 leading-relaxed">
            Real courses, real faculty, real career outcomes — through natural conversation with Claude or ChatGPT.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {["Wesleyan", "Columbia", "MIT", "Stanford", "Yale", "Brown", "Cornell", "Penn", "Dartmouth", "Notre Dame", "Illinois", "Harvey Mudd", "Vassar", "GWU", "Bates", "Williams", "Middlebury", "Bryn Mawr", "Colorado College", "Gonzaga", "Baylor", "Ole Miss", "CSUN", "CSU Chico", "CSU Dominguez Hills", "Rose-Hulman", "Seton Hall", "Salve Regina", "Niagara", "Eastern", "Immaculata", "Point Loma", "Swarthmore", "Oberlin", "Macalester", "Georgetown Law", "Lafayette"].map(school => (
            <span key={school} className="text-xs font-medium bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">{school}</span>
          ))}
          <span className="text-xs text-gray-400 px-1">+ more coming</span>
        </div>
        <div className="flex items-center gap-4 pt-2">
          <Link
            href="https://chatgpt.com/g/g-6a2583a8a7cc819198378184eaf9b15f-wesleyan-academic-advisor"
            target="_blank"
            className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Try with ChatGPT →
          </Link>
          <Link
            href="/integrate"
            className="text-gray-500 text-sm hover:text-gray-900 transition-colors"
          >
            For platforms →
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {HOW_IT_WORKS.map((step) => (
            <div key={step.step} className="space-y-3">
              <p className="text-3xl font-light text-gray-200">{step.step}</p>
              <h3 className="font-semibold text-gray-900">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What students ask */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">What students ask</h2>
        <div className="space-y-6">
          {(["Path & career", "Academics", "Research"] as const).map(category => (
            <div key={category} className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-widest text-gray-400">{category}</p>
              <div className="grid gap-2">
                {EXAMPLES.filter(e => e.category === category).map((example) => (
                  <div key={example.q} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-300 mt-0.5">›</span>
                    <span className="text-gray-700 italic">&ldquo;{example.q}&rdquo;</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">What it knows</h2>
        <div className="grid grid-cols-1 gap-6">
          {CAPABILITIES.map((cap) => (
            <div key={cap.title} className="border border-gray-100 rounded-xl p-6 space-y-3">
              <h3 className="font-semibold text-gray-900">{cap.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
              <div className="space-y-1 pt-1">
                {cap.examples.map(ex => (
                  <p key={ex} className="text-xs text-gray-400 italic">&ldquo;{ex}&rdquo;</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* For institutions */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">For colleges & universities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Direct use */}
          <div className="border border-gray-100 rounded-xl p-6 space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400">Connect your campus</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Any college or university with a public course catalog can be connected. Students get live course search, faculty research, degree requirements, and career navigation — through Claude or ChatGPT, no new app required.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Every query is logged anonymously. Your institution sees what students are actually exploring — trending topics, popular departments, common career paths.
            </p>
            <Link
              href="mailto:hello@opencampusadvisor.org"
              className="inline-block text-sm text-gray-900 underline hover:no-underline"
            >
              Bring it to your campus →
            </Link>
          </div>

          {/* API / Platform integration */}
          <div className="border border-gray-100 rounded-xl p-6 space-y-3">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400">For platforms</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              If your platform already owns the student relationship — Scoir, Naviance, College Board, a counseling tool — you don&apos;t need to build the data layer. Ours is live across dozens of top US colleges and universities.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Three endpoints. Your product, our data.
            </p>
            <div className="pt-1 space-y-2">
              <pre className="bg-gray-50 text-gray-600 text-xs px-3 py-2 rounded-lg leading-relaxed">POST /api/v1/batch/path{"\n"}x-institution-id: your-platform</pre>
              <Link
                href="/integrate"
                className="inline-block text-sm text-gray-900 underline hover:no-underline"
              >
                See integration docs →
              </Link>
            </div>
          </div>

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
