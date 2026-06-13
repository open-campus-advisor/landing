import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSchoolMeta, ALL_SLUGS } from "../../../lib/schools";

const API = "https://api.opencampusadvisor.org/api/v1";
const REVALIDATE = 3600;


interface Department { name: string; code: string }
interface CourseSection { instructor?: string; schedule?: string; seatsAvailable?: number | null }
interface Course { courseId: string; courseNumber: string; title: string; department: string; sections?: CourseSection[] }
interface FacultyMember { facultyId: string; name: string; titles?: string[]; researchSummary?: string; email?: string }

async function fetchDepartments(slug: string): Promise<Department[]> {
  try {
    const res = await fetch(`${API}/${slug}/departments`, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}

async function fetchCourses(slug: string, query: string, department?: string): Promise<Course[]> {
  try {
    const params = new URLSearchParams({ query });
    if (department) params.set("department", department);
    const res = await fetch(`${API}/${slug}/courses?${params}`, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data.courses ?? [];
  } catch { return []; }
}

async function fetchFaculty(slug: string, query: string, department: string): Promise<FacultyMember[]> {
  try {
    const res = await fetch(`${API}/${slug}/faculty/search?query=${encodeURIComponent(query)}&department=${encodeURIComponent(department)}`, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch { return []; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = getSchoolMeta(slug);
  const title = `${meta.name} — Live Courses, Faculty & Degree Requirements`;
  const description = `Search live ${meta.shortName} course catalogs, find faculty with active NIH grants, and navigate degree requirements — updated every 60 minutes from the registrar.`;
  return {
    title,
    description,
    alternates: { canonical: `https://opencampusadvisor.org/schools/${slug}` },
    openGraph: { title, description, url: `https://opencampusadvisor.org/schools/${slug}` },
  };
}

export default async function SchoolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getSchoolMeta(slug);

  if (!ALL_SLUGS.includes(slug)) notFound();

  // Fetch departments first, then use them for targeted course + faculty queries
  const departments = await fetchDepartments(slug);
  const firstDept = departments[0]?.code ?? "";

  const [csCourses, envCourses] = await Promise.all([
    fetchCourses(slug, "research", firstDept || undefined),
    fetchCourses(slug, "data science"),
  ]);
  const faculty = firstDept ? await fetchFaculty(slug, "research", firstDept) : [];

  const sampleCourses = [...csCourses, ...envCourses]
    .filter((c, i, arr) => arr.findIndex(x => x.courseId === c.courseId) === i)
    .slice(0, 6);

  const sampleFaculty = faculty.slice(0, 4);
  const deptGroups = departments.slice(0, 24);

  // Schema.org structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: meta.name,
    address: { "@type": "PostalAddress", addressLocality: meta.location.split(",")[0], addressRegion: meta.location.split(",")[1]?.trim() },
    description: meta.highlight,
    url: `https://opencampusadvisor.org/schools/${slug}`,
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <Link href="/" className="hover:text-gray-700 transition-colors">Open Campus Advisor</Link>
        <span>›</span>
        <Link href="/schools" className="hover:text-gray-700 transition-colors">Schools</Link>
        <span>›</span>
        <span className="text-gray-600">{meta.shortName}</span>
      </div>

      {/* Hero */}
      <section className="space-y-5">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-widest text-gray-400">{meta.type} · {meta.location}</p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight">{meta.name}</h1>
          <p className="text-lg text-gray-500">{meta.enrollment}</p>
        </div>
        <div className="bg-slate-50 rounded-xl px-5 py-4">
          <p className="text-sm text-gray-600 leading-relaxed">{meta.highlight}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: String(departments.length || "—"), label: "Departments" },
            { value: "60 min", label: "Refresh cycle" },
            { value: sampleFaculty.length > 0 ? `${sampleFaculty.length}+` : "Live", label: "Faculty indexed" },
          ].map(s => (
            <div key={s.label} className="border border-gray-100 rounded-xl p-4 text-center">
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Departments */}
      {deptGroups.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Departments</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {deptGroups.map(dept => (
              <div key={dept.code} className="border border-gray-100 rounded-lg px-3 py-2.5 space-y-0.5">
                <p className="text-xs font-mono text-gray-400">{dept.code}</p>
                <p className="text-xs text-gray-700 leading-snug">{dept.name}</p>
              </div>
            ))}
          </div>
          {departments.length > 24 && (
            <p className="text-xs text-gray-400">+{departments.length - 24} more departments available via the API.</p>
          )}
        </section>
      )}

      {/* Sample courses */}
      {sampleCourses.length > 0 && (
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Sample live courses</h2>
            <p className="text-sm text-gray-400 mt-1">From the current term — updated every 60 minutes.</p>
          </div>
          <div className="space-y-2">
            {sampleCourses.map(course => {
              const section = course.sections?.[0];
              const seats = section?.seatsAvailable;
              return (
                <div key={course.courseId} className="border border-gray-100 rounded-xl p-4 space-y-1.5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-xs font-mono text-gray-400 mr-2">{course.courseNumber}</span>
                      <span className="text-sm font-medium text-gray-900">{course.title}</span>
                    </div>
                    {seats != null && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${seats > 0 ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {seats > 0 ? `${seats} seats` : "Full"}
                      </span>
                    )}
                  </div>
                  {section?.instructor && (
                    <p className="text-xs text-gray-400">{section.instructor}{section.schedule ? ` · ${section.schedule}` : ""}</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Faculty */}
      {sampleFaculty.length > 0 && (
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Faculty research</h2>
            <p className="text-sm text-gray-400 mt-1">Research profiles with active NIH grant data where available.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sampleFaculty.map(f => (
              <div key={f.facultyId} className="border border-gray-100 rounded-xl p-4 space-y-1.5">
                <p className="font-medium text-gray-900 text-sm">{f.name}</p>
                {f.titles?.[0] && <p className="text-xs text-gray-400">{f.titles[0]}</p>}
                {f.researchSummary && (
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{f.researchSummary}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border border-gray-100 rounded-2xl p-8 space-y-4">
        <h2 className="text-xl font-semibold">Ask anything about {meta.shortName} through Claude</h2>
        <p className="text-gray-500 leading-relaxed text-sm max-w-xl">
          Search courses, find faculty with active research grants, navigate degree requirements, and map your path from a career goal to the courses that get you there — all in natural conversation.
        </p>
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              `What CS courses can I take as a freshman at ${meta.shortName}?`,
              `Which ${meta.shortName} faculty research machine learning?`,
              `What does the Computer Science major require at ${meta.shortName}?`,
              `Compare ${meta.shortName} to MIT for climate policy research`,
            ].map(q => (
              <div key={q} className="flex items-start gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <span className="text-gray-300 mt-0.5 shrink-0">›</span>
                <span className="text-xs text-gray-600 italic">&ldquo;{q}&rdquo;</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 flex-wrap pt-2">
            <Link href="/mcp" className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
              Connect to Claude →
            </Link>
            <a
              href="https://chatgpt.com/g/g-6a2583a8a7cc819198378184eaf9b15f-wesleyan-academic-advisor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 text-sm hover:text-gray-900 transition-colors"
            >
              Try with ChatGPT →
            </a>
            <Link href="/schools" className="text-gray-500 text-sm hover:text-gray-900 transition-colors">
              ← Schools
            </Link>
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
