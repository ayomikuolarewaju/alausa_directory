import { searchEntities, getByCategory } from "@/lib/data";
import EntityCard from "@/components/EntityCard";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import type { Metadata } from "next";

const BASE_URL = "https://www.lagosdirectory.gov.ng";

export const metadata: Metadata = {
  title: "Lagos Directory | Alausa Secretariat — Ministries, Agencies & Parastatals",
  description:
    "Lagos Directory — the definitive Alausa Secretariat and Lagos State Government directory. Find all ministries, agencies, parastatals and 20 LGAs with principal officers, addresses and phone numbers.",
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "Lagos Directory | Alausa Secretariat",
    description:
      "The definitive Lagos Directory — Alausa Secretariat offices, Lagos State ministries, agencies, parastatals and all 20 LGAs.",
    url: BASE_URL,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Lagos Directory | Alausa Secretariat",
  url: BASE_URL,
  description:
    "The definitive Alausa Secretariat and Lagos State Government directory covering all ministries, agencies, parastatals and LGAs.",
  publisher: {
    "@type": "GovernmentOrganization",
    name: "Lagos State Government",
    url: "https://lagosstate.gov.ng",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Ministries",
      item: `${BASE_URL}/ministries`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Agencies",
      item: `${BASE_URL}/agencies`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Parastatals",
      item: `${BASE_URL}/parastatals`,
    },
  ],
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params?.q || "";
  const results = query ? searchEntities(query) : [];

  const stats = [
    { label: "Ministries", count: getByCategory("ministry").length, color: "#1A3A8F", href: "/ministries" },
    { label: "Agencies", count: getByCategory("agency").length, color: "#D42B2B", href: "/agencies" },
    { label: "Parastatals", count: getByCategory("parastatal").length, color: "#1B7A3E", href: "/parastatals" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: "#1A3A8F" }}>
          <div className="hero-stripes absolute top-0 right-0 w-32 h-full opacity-20" />
          <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
            <div className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded mb-6" style={{ background: "#F5C518", color: "#0D0D0D" }}>
              Lagos State Government
            </div>
            <h1 className="font-display font-black text-white text-4xl md:text-6xl leading-tight mb-4">
              Official Government<br />
              <span style={{ color: "#F5C518" }}>Directory</span>
            </h1>
            <p className="text-blue-200 text-lg mb-10 max-w-xl">
              The definitive Alausa Secretariat guide — find all Lagos State ministries, agencies, parastatals and LGAs with principal officers, addresses and contact details.
            </p>
            <SearchBar />
          </div>
        </section>

        {/* Stats bar */}
        <section style={{ background: "#F5C518", borderBottom: "3px solid #0D0D0D" }}>
          <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <Link key={s.label} href={s.href}>
                <div className="card-hover text-center py-4 px-2 rounded-lg cursor-pointer" style={{ background: s.color, border: "2px solid #0D0D0D" }}>
                  <div className="font-display text-3xl font-black text-white">{s.count}</div>
                  <div className="text-white text-xs font-semibold uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Search results */}
        {query && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="font-display font-bold text-2xl mb-2">
              Results for <span style={{ color: "#D42B2B" }}>&ldquo;{query}&rdquo;</span>
            </h2>
            <p className="text-gray-500 mb-8">{results.length} result{results.length !== 1 ? "s" : ""} found</p>
            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((e) => <EntityCard key={e.id} entity={e} />)}
              </div>
            ) : (
              <div className="py-16 text-center rounded-xl" style={{ border: "2px dashed #ccc" }}>
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-semibold text-lg">No results found</p>
                <p className="text-gray-500 text-sm mt-1">Try a different keyword</p>
              </div>
            )}
          </section>
        )}

        {/* Featured sections */}
        {!query && (
          <>
            {[
              { category: "ministry" as const, label: "Ministries", color: "#1A3A8F", href: "/ministries" },
              { category: "agency" as const, label: "Agencies", color: "#D42B2B", href: "/agencies" },
              { category: "parastatal" as const, label: "Parastatals", color: "#1B7A3E", href: "/parastatals" },
            ].map(({ category, label, color, href }) => {
              const items = getByCategory(category).slice(0, 3);
              return (
                <section key={category} className="max-w-7xl mx-auto px-4 py-14">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-8 rounded-full" style={{ background: color }} />
                      <h2 className="font-display font-bold text-2xl md:text-3xl">{label}</h2>
                    </div>
                    <Link href={href} className="text-sm font-semibold px-4 py-2 rounded-lg" style={{ background: color, color: "#fff", border: "2px solid #0D0D0D" }}>
                      View All →
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((e) => <EntityCard key={e.id} entity={e} />)}
                  </div>
                </section>
              );
            })}
          </>
        )}

        {/* Footer */}
        <footer style={{ background: "#0D0D0D", borderTop: "4px solid #F5C518" }}>
          <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
              <div>
                <p className="font-display text-white text-xl font-bold mb-1">Lagos Directory | Alausa Secretariat</p>
                <p className="text-gray-400 text-sm max-w-xs">The definitive Alausa Secretariat and Lagos State Government directory — free, independent and updated regularly.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2 font-semibold">Directory</p>
                  {["/ministries", "/agencies", "/parastatals", "/lgas"].map(href => (
                    <Link key={href} href={href} className="block text-gray-400 hover:text-white capitalize py-0.5">{href.replace("/", "")}</Link>
                  ))}
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2 font-semibold">Resources</p>
                  {["/news", "/services", "/emergency", "/events"].map(href => (
                    <Link key={href} href={href} className="block text-gray-400 hover:text-white capitalize py-0.5">{href.replace("/", "")}</Link>
                  ))}
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-2 font-semibold">Legal</p>
                  {["/about", "/contact", "/disclaimer", "/privacy"].map(href => (
                    <Link key={href} href={href} className="block text-gray-400 hover:text-white capitalize py-0.5">{href.replace("/", "")}</Link>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ borderTop: "1px solid #222" }} className="pt-5 flex flex-col md:flex-row items-center justify-between gap-2">
              <p className="text-gray-600 text-xs">© {new Date().getFullYear()} Lagos State Government Directory. Independent platform — not affiliated with Lagos State Government.</p>
              <div className="flex gap-4 text-xs text-gray-600">
                <Link href="/disclaimer" className="hover:text-gray-400">Disclaimer</Link>
                <Link href="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
