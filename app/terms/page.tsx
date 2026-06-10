import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Open Campus Advisor",
};

export default function Terms() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16 space-y-10">

      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="text-gray-400 text-sm">Effective date: June 10, 2026</p>
      </div>

      <div className="space-y-8 text-gray-600 leading-relaxed">

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Information service, not professional advice</h2>
          <p>
            Open Campus Advisor provides academic information and data-based guidance. It is <strong>not a substitute for advice from a licensed educational counselor, academic advisor, or career professional.</strong>
          </p>
          <p>
            Course availability, degree requirements, faculty research, and career outcome data are sourced from public institutional catalogs, the NIH Reporter API, and the Bureau of Labor Statistics. This information may not reflect the most current requirements at any institution.
          </p>
          <p>
            <strong>Always verify course requirements, prerequisites, and degree progress with your institution's official registrar and academic advisor before making enrollment or graduation decisions.</strong>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Data accuracy</h2>
          <p>
            We make reasonable efforts to keep academic data current, but institutional catalogs change. Course numbers, prerequisites, and degree requirements are updated by institutions annually — typically in August before the fall term.
          </p>
          <p>
            Career outcome data (salary ranges, employment rates) is sourced from the Bureau of Labor Statistics Occupational Outlook Handbook and reflects aggregate national data. Individual outcomes vary by institution, location, experience, and many other factors.
          </p>
          <p>
            Faculty research profiles and grant information are sourced from the public NIH Reporter API and institutional websites. Grant status and faculty availability may have changed since data was last updated.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">No guarantee of outcomes</h2>
          <p>
            Recommendations from Open Campus Advisor — including course suggestions, school comparisons, major recommendations, and career projections — are based on aggregate data and do not guarantee individual outcomes. Academic success, admission decisions, career placement, and salary outcomes depend on many individual factors outside our knowledge.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Eligibility</h2>
          <p>
            You must be at least 13 years old to use Open Campus Advisor. If you are under 18, you represent that your parent or guardian has reviewed and agreed to these terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Third-party AI platforms</h2>
          <p>
            Open Campus Advisor is accessed through third-party AI platforms including Claude (Anthropic) and ChatGPT (OpenAI). Your use of those platforms is governed by their respective terms of service — not this document. We are not responsible for the behavior of third-party AI platforms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Institutional use (B2B)</h2>
          <p>
            Organizations integrating Open Campus Advisor via API are responsible for how they present our data to end users. Institutional buyers must maintain their own terms of service with students and are responsible for compliance with applicable laws including FERPA and COPPA within their own products.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, Open Campus Advisor and its operators are not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this service — including academic decisions made in reliance on information provided, career outcomes, or enrollment consequences.
          </p>
          <p>
            Our total liability for any claim arising from your use of the service is limited to the amount you paid for the service in the 12 months preceding the claim, or $50, whichever is greater.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Changes to these terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the updated terms. We will note the effective date at the top of this page.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Contact</h2>
          <p>
            Questions about these terms?{" "}
            <a href="mailto:hello@opencampusadvisor.org" className="text-blue-600 hover:underline">
              hello@opencampusadvisor.org
            </a>
          </p>
        </section>

      </div>

      <footer className="border-t border-gray-100 pt-8 text-sm text-gray-400">
        <Link href="/" className="hover:text-gray-600 transition-colors">← Back to Open Campus Advisor</Link>
      </footer>

    </main>
  );
}
