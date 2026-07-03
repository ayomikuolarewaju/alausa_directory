import type { Metadata } from "next";
import { fetchLagosNews } from "@/lib/fetchNews";

export const revalidate = 3600; // Rebuild page silently every hour

export const metadata: Metadata = {
  title: "Lagos State Government News | Daily Updates from Alausa Secretariat",
  description:
    "Daily Lagos State Government news — Alausa Secretariat announcements, ministry updates and MDA press releases aggregated from top Nigerian news sources.",
  alternates: { canonical: "https://www.lagosdirectory.gov.ng/news" },
  openGraph: {
    title: "Lagos State Government News | Daily Updates",
    description: "Real-time Lagos government news aggregated from top Nigerian news sources. Fresh content updated hourly.",
    url: "https://www.lagosdirectory.gov.ng/news",
  },
};

const categoryColors: Record<string, string> = {
  Transportation: "#1A3A8F",
  Health:         "#D42B2B",
  Education:      "#1A3A8F",
  Environment:    "#1B7A3E",
  Finance:        "#1B7A3E",
  Security:       "#D42B2B",
  Housing:        "#1A3A8F",
  Business:       "#D42B2B",
  Government:     "#1A3A8F",
};

export default async function NewsPage() {
  const { items, sources, fetchedAt, successCount } = await fetchLagosNews();

  const featured = items.filter(n => n.featured);
  const rest     = items.filter(n => !n.featured);
  const categories = ["All", ...Array.from(new Set(items.map(i => i.category)))];

  const lastUpdated = new Date(fetchedAt).toLocaleTimeString("en-NG", {
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="mb-8">
        <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4"
          style={{ background: "#F5C518", color: "#0D0D0D" }}>
          Live News Feed
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display font-black text-4xl md:text-5xl mb-2">News & Announcements</h1>
            <p className="text-gray-500 max-w-xl text-sm">
              Lagos State Government news aggregated from {successCount} active sources including{" "}
              {sources.slice(0, 3).join(", ")}{sources.length > 3 ? " and more" : ""}.
            </p>
          </div>
          <div className="text-xs text-gray-400 flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full"
              style={{ background: items.length > 0 ? "#22c55e" : "#f59e0b",
                       boxShadow: items.length > 0 ? "0 0 6px #22c55e" : "none" }} />
            {items.length > 0 ? `${items.length} stories · Updated ${lastUpdated}` : "Fetching feeds..."}
          </div>
        </div>
      </div>

      {/* No results */}
      {items.length === 0 && (
        <div className="py-20 text-center rounded-2xl mb-8" style={{ border: "2px dashed #e5e7eb" }}>
          <p className="text-4xl mb-3">📡</p>
          <p className="font-semibold text-lg mb-1">Connecting to news feeds...</p>
          <p className="text-gray-500 text-sm">RSS sources are loading. Refresh in a moment or check back shortly.</p>
        </div>
      )}

      {/* Category pills */}
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat, i) => (
            <span key={cat}
              className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: i === 0 ? "#0D0D0D" : (categoryColors[cat] ?? "#1A3A8F"),
                color: "#fff",
                border: "2px solid #0D0D0D",
              }}>
              {cat}
            </span>
          ))}
        </div>
      )}

      {/* Featured cards */}
      {featured.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {featured.map((item, i) => (
            <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer"
              className="card-hover rounded-xl overflow-hidden flex flex-col"
              style={{ border: "2px solid #0D0D0D", boxShadow: "4px 4px 0 #0D0D0D" }}>
              <div style={{ background: item.categoryColor, padding: "16px 18px 10px" }}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-widest px-2 py-1 rounded"
                    style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
                    {item.category}
                  </span>
                  {i === 0 && (
                    <span className="text-xs font-bold px-2 py-1 rounded"
                      style={{ background: "#F5C518", color: "#0D0D0D" }}>
                      Latest
                    </span>
                  )}
                </div>
              </div>
              <div className="p-5 bg-white flex flex-col flex-1">
                <h2 className="font-display font-bold text-base leading-snug mb-2 line-clamp-3">{item.title}</h2>
                {item.summary && (
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{item.summary}</p>
                )}
                <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-3 border-t border-gray-100">
                  <span className="font-semibold" style={{ color: item.sourceColor }}>{item.source}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Rest of stories */}
      {rest.length > 0 && (
        <>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1" style={{ background: "#e5e7eb" }} />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {rest.length} More Stories
            </span>
            <div className="h-px flex-1" style={{ background: "#e5e7eb" }} />
          </div>

          <div className="space-y-3">
            {rest.map(item => (
              <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer"
                className="card-hover flex bg-white rounded-xl overflow-hidden"
                style={{ border: "2px solid #0D0D0D" }}>
                <div className="w-1.5 flex-shrink-0" style={{ background: item.categoryColor }} />
                <div className="flex-1 p-4 flex flex-col md:flex-row md:items-center gap-3 min-w-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                        style={{ background: item.categoryColor, color: "#fff" }}>
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-400">{item.date}</span>
                    </div>
                    <h3 className="font-semibold text-sm leading-snug line-clamp-2">{item.title}</h3>
                  </div>
                  <span className="text-xs font-semibold flex-shrink-0 hidden md:block"
                    style={{ color: item.sourceColor }}>
                    {item.source}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </>
      )}

      {/* Sources note */}
      {sources.length > 0 && (
        <div className="mt-10 p-5 rounded-xl text-sm text-gray-500"
          style={{ background: "#fff", border: "2px dashed #e5e7eb" }}>
          <strong>Sources:</strong> {sources.join(" · ")}. News is automatically fetched every hour and filtered for Lagos State Government relevance. All articles link to their original source. We do not host third-party content.
        </div>
      )}

      {/* CTA */}
      <div className="mt-8 rounded-2xl p-6 text-center"
        style={{ background: "#1A3A8F", border: "2px solid #0D0D0D" }}>
        <p className="font-display font-bold text-white text-lg mb-1">Want official press releases?</p>
        <p className="text-blue-200 text-sm mb-4">Visit Lagos State Government&apos;s official website for verified announcements.</p>
        <a href="https://lagosstate.gov.ng" target="_blank" rel="noopener noreferrer"
          className="inline-block px-6 py-2.5 rounded-lg font-bold text-sm"
          style={{ background: "#F5C518", color: "#0D0D0D", border: "2px solid #0D0D0D" }}>
          Visit lagosstate.gov.ng →
        </a>
      </div>

    </main>
  );
}
