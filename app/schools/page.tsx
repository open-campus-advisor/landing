import type { Metadata } from "next";
import Link from "next/link";
import { SCHOOLS, SCHOOL_TYPE_ORDER } from "../../lib/schools";

export const metadata: Metadata = {
  title: "100+ Colleges & Universities — Live Course Data",
  description:
    "Browse live course catalogs, faculty research, and degree requirements for 100+ US colleges and universities — MIT, Stanford, Yale, Wesleyan, and more. Updated every 60 minutes.",
  alternates: { canonical: "https://opencampusadvisor.org/schools" },
};

const byType: Record<string, { slug: string; meta: (typeof SCHOOLS)[string] }[]> = {};

for (const [slug, meta] of Object.entries(SCHOOLS)) {
  const t = meta.type;
  if (!byType[t]) byType[t] = [];
  byType[t].push({ slug, meta });
}

for (const arr of Object.values(byType)) {
  arr.sort((a, b) => a.meta.name.localeCompare(b.meta.name));
}

const orderedTypes = [
  ...SCHOOL_TYPE_ORDER.filter(t => byType[t]),
  ...Object.keys(byType).filter(t => !SCHOOL_TYPE_ORDER.includes(t)),
];

export default function SchoolsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">

      {/* Nav */}
      <div>
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
          ← Open Campus Advisor
        </Link>
      </div>

      {/* Hero */}
      <section className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-widest text-gray-400">School Directory</p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight">
          100+ colleges.<br />
          <span className="text-gray-400 font-light">Live data on every one.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
          Course catalogs refreshed every 60 minutes from institutional registration systems. Faculty research profiles with active NIH grant data. Ask about any of them through Claude or ChatGPT.
        </p>
      </section>

      {/* School groups */}
      {orderedTypes.map(type => (
        <section key={type} className="space-y-4">
          <div className="flex items-baseline gap-3">
            <h2 className="text-lg font-semibold text-gray-900">{type}</h2>
            <span className="text-xs text-gray-400">{byType[type].length} schools</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {byType[type].map(({ slug, meta }) => (
              <Link
                key={slug}
                href={`/schools/${slug}`}
                className="group border border-gray-100 rounded-xl p-4 hover:border-gray-300 hover:bg-gray-50 transition-all space-y-1"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-gray-900 text-sm group-hover:text-gray-700 leading-snug">
                    {meta.name}
                  </p>
                  <span className="text-gray-300 group-hover:text-gray-500 transition-colors shrink-0 mt-0.5">›</span>
                </div>
                <p className="text-xs text-gray-400">{meta.location} · {meta.enrollment}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="border border-gray-100 rounded-2xl p-8 space-y-4">
        <h2 className="text-xl font-semibold">Ask about any school through Claude</h2>
        <p className="text-gray-500 leading-relaxed text-sm max-w-xl">
          Connect the Open Campus Advisor MCP server once — then ask about courses, faculty, degree requirements, and career paths at any of these schools in natural conversation.
        </p>
        <div className="flex items-center gap-4 flex-wrap pt-1">
          <Link
            href="/mcp"
            className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Connect to Claude →
          </Link>
          <Link href="/integrate" className="text-gray-500 text-sm hover:text-gray-900 transition-colors">
            REST API →
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
