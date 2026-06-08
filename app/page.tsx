import Link from "next/link";
import Image from "next/image";

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
];

const CAPABILITIES = [
  {
    title: "Course catalog",
    description: "Search any school's live course catalog by topic, department, or instructor. Get prerequisites, enrollment data, gen-ed requirements, and first-year seminars — current as of today.",
    examples: ["What can I take as a freshman in the CS department?", "Which courses fulfill the quantitative reasoning requirement?"],
  },
  {
    title: "Faculty & research",
    description: "Find professors by research topic, see their active NIH grants, publications, and lab opportunities. Compare research strength across all five schools simultaneously.",
    examples: ["Who at Stanford studies large language models?", "Which BIOL faculty have active NIH grants?"],
  },
  {
    title: "Academic paths",
    description: "Navigate from a career goal backwards to majors, courses, and professors. Or start from a school and see where each major leads — salary ranges, job outlook, and typical employers included.",
    examples: ["What major and courses lead to climate policy work?", "Compare CS programs at MIT and Stanford by curriculum and faculty."],
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
    description: "Open Campus Advisor traverses the academic graph in real time — live course data, faculty research, degree requirements, and career outcomes across all five schools.",
  },
  {
    step: "03",
    title: "Navigate your path",
    description: "Get a grounded answer, not a guess. Every fact traces back to live catalog data, faculty profiles, or NIH grant records. Ask follow-up questions to go deeper.",
  },
];

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-24">

      {/* Header */}
      <header className="flex items-center justify-end">
        <Link
          href="mailto:tolga@breaklinedigital.com"
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          Contact
        </Link>
      </header>

      {/* Hero */}
      <section className="space-y-6">
        <div className="flex items-center gap-5">
          <Image src="/logo-mark.png" alt="Open Campus Advisor" width={120} height={120} className="rounded-2xl"/>
          <h1 className="text-5xl font-bold leading-tight tracking-tight">
            Open Campus Advisor
          </h1>
        </div>
        <p className="text-2xl text-gray-400 font-light leading-snug">
          Academic navigation for students.
        </p>
        <p className="text-xl text-gray-500 max-w-xl leading-relaxed">
          From career goal to course sequence — across five universities — through natural conversation with Claude or ChatGPT.
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {["Wesleyan", "Columbia", "MIT", "Stanford", "Yale"].map(school => (
            <span key={school} className="text-xs font-medium bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">{school}</span>
          ))}
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
            href="mailto:tolga@breaklinedigital.com"
            className="text-gray-500 text-sm hover:text-gray-900 transition-colors"
          >
            Bring it to your school →
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

      {/* For universities */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">For universities</h2>
        <p className="text-gray-500 max-w-xl">
          Any university with a public course catalog can be connected. Students get live course search, faculty research, degree requirements, and career path navigation — all through Claude or ChatGPT, with no new app to install.
        </p>
        <p className="text-gray-500 max-w-xl">
          Every query is logged anonymously to PostHog. Universities get a dashboard showing what their students are actually exploring — trending topics, popular departments, common career paths — updated in real time.
        </p>
        <Link
          href="mailto:tolga@breaklinedigital.com"
          className="inline-block bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          Get in touch →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 pt-8 flex items-center justify-between text-sm text-gray-400">
        <span>© 2026 Open Campus Advisor</span>
        <div className="flex gap-6">
          <Link href="mailto:tolga@breaklinedigital.com" className="hover:text-gray-600 transition-colors">Contact</Link>
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</Link>
        </div>
      </footer>

    </main>
  );
}
