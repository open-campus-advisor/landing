import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

const TITLE = "Open Campus Advisor — AI Academic Advisor for College Students";
const DESCRIPTION =
  "The AI academic advisor that knows your campus. Live course catalogs, faculty research, degree requirements, and career outcomes across 100+ top US colleges — through natural conversation with Claude or ChatGPT.";
const SITE_URL = "https://opencampusadvisor.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Open Campus Advisor",
  },
  description: DESCRIPTION,
  keywords: [
    "AI academic advisor",
    "campus advisor AI",
    "college advisor AI",
    "AI college counselor",
    "academic advisor chatbot",
    "college course catalog AI",
    "AI college planning",
    "ChatGPT college advisor",
    "course search AI",
    "degree requirements AI",
    "college faculty research",
    "academic path planning",
    "career outcomes college",
    "NIH grants faculty",
    "college major requirements",
  ],
  authors: [{ name: "Open Campus Advisor", url: SITE_URL }],
  creator: "Open Campus Advisor",
  publisher: "Open Campus Advisor",
  category: "Education",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/logo-mark.png",
    apple: "/logo-mark.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Open Campus Advisor",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Open Campus Advisor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    // Add Google Search Console verification token here when available
    // google: "your-token",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Open Campus Advisor",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-rectangle.png` },
      contactPoint: { "@type": "ContactPoint", email: "hello@opencampusadvisor.org", contactType: "customer support" },
      sameAs: ["https://github.com/open-campus-advisor"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Open Campus Advisor",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `https://api.opencampusadvisor.org/api/v1/search?query={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#app`,
      name: "Open Campus Advisor",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web, iOS (via ChatGPT), Android (via ChatGPT), macOS (via Claude)",
      description: DESCRIPTION,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Live course catalog search across 100+ universities",
        "Faculty research profiles with NIH grant data",
        "Degree requirement navigation",
        "Career outcome data with BLS salary ranges",
        "Personalized academic path planning",
        "RIASEC interest profile matching",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Which colleges does Open Campus Advisor cover?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Open Campus Advisor covers 100+ US colleges and universities including MIT, Stanford, Yale, Brown, Columbia, Cornell, Penn, Dartmouth, Notre Dame, University of Illinois, and more.",
          },
        },
        {
          "@type": "Question",
          name: "How do I use Open Campus Advisor?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Open Campus Advisor works through Claude (Anthropic) and ChatGPT (OpenAI). Ask questions about courses, faculty, degree requirements, or career paths in natural language.",
          },
        },
        {
          "@type": "Question",
          name: "Is Open Campus Advisor free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Open Campus Advisor is free for students to use through Claude and ChatGPT.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
