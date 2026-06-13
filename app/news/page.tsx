import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "Latest news, announcements and updates from Lagos State Government ministries, agencies and parastatals.",
  alternates: { canonical: "https://www.alausadirectory.com/news" },
  openGraph: {
    title: "Lagos State Government News & Updates",
    description:
      "Stay informed with the latest announcements, press releases and updates from Lagos State Government.",
    url: "https://www.alausadirectory.com/news",
  },
};

const newsJsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  name: "Lagos State Government Directory — News",
  url: "https://www.alausadirectory.com/news",
  publisher: {
    "@type": "GovernmentOrganization",
    name: "Lagos State Government",
    url: "https://lagosstate.gov.ng",
  },
};

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  category: string;
  categoryColor: string;
  date: string;
  source: string;
  sourceUrl: string;
  featured?: boolean;
};

const news: NewsItem[] = [
  {
    id: "1",
    title: "Governor Sanwo-Olu Launches Blue Economy Initiative for Lagos Waterfront Communities",
    summary:
      "Lagos State Government announces a new Blue Economy initiative to develop waterfront communities, create jobs and boost coastal tourism across the state.",
    category: "Economy",
    categoryColor: "#1A3A8F",
    date: "May 20, 2026",
    source: "Lagos State Government",
    sourceUrl: "https://lagosstate.gov.ng",
    featured: true,
  },
  {
    id: "2",
    title: "LAMATA Expands BRT Network with 50 New Buses on Lekki-Ajah Corridor",
    summary:
      "Lagos Metropolitan Area Transport Authority has commissioned 50 new air-conditioned BRT buses to serve the Lekki-Ajah corridor, reducing travel time by 40%.",
    category: "Transportation",
    categoryColor: "#D42B2B",
    date: "May 18, 2026",
    source: "LAMATA",
    sourceUrl: "https://lamata-ng.com",
    featured: true,
  },
  {
    id: "3",
    title: "Lagos State 2026 Budget: ₦2.2 Trillion Approved by House of Assembly",
    summary:
      "The Lagos State House of Assembly has approved a ₦2.2 trillion budget for the 2026 fiscal year, with 60% allocated to capital expenditure.",
    category: "Finance",
    categoryColor: "#1B7A3E",
    date: "May 15, 2026",
    source: "Ministry of Finance",
    sourceUrl: "https://finance.lagosstate.gov.ng",
    featured: true,
  },
  {
    id: "4",
    title: "LASEPA Issues Environmental Compliance Notices to 120 Industrial Facilities",
    summary:
      "Lagos State Environmental Protection Agency has issued compliance notices to over 120 industrial facilities across Apapa and Ikorodu for air quality violations.",
    category: "Environment",
    categoryColor: "#1B7A3E",
    date: "May 12, 2026",
    source: "LASEPA",
    sourceUrl: "https://lasepa.gov.ng",
  },
  {
    id: "5",
    title: "Ministry of Education Rolls Out Free Tablets for Public Secondary Schools",
    summary:
      "Over 200,000 students in Lagos State public secondary schools will receive free educational tablets as part of the EdTech Lagos 2026 initiative.",
    category: "Education",
    categoryColor: "#1A3A8F",
    date: "May 10, 2026",
    source: "Ministry of Education",
    sourceUrl: "https://education.lagosstate.gov.ng",
  },
  {
    id: "6",
    title: "LAWMA Introduces Smart Waste Bins in 5 LGAs Across Lagos",
    summary:
      "Lagos Waste Management Authority has deployed 500 solar-powered smart waste bins in Ikeja, Lagos Island, Lekki, Surulere and Ikorodu as part of a waste management upgrade.",
    category: "Environment",
    categoryColor: "#1B7A3E",
    date: "May 8, 2026",
    source: "LAWMA",
    sourceUrl: "https://lawma.gov.ng",
  },
  {
    id: "7",
    title: "Lagos State Launches Free Skills Acquisition Programme for 10,000 Youths",
    summary:
      "The Ministry of Wealth Creation and Employment has opened applications for a free six-month skills training programme covering tech, fashion, welding and catering.",
    category: "Youth",
    categoryColor: "#D42B2B",
    date: "May 5, 2026",
    source: "Ministry of Wealth Creation",
    sourceUrl: "https://lagosstate.gov.ng",
  },
  {
    id: "8",
    title: "LASUTH Commissions New 200-Bed Cancer Treatment Centre",
    summary:
      "Lagos State University Teaching Hospital has officially opened its new Cancer Centre, equipped with radiotherapy machines and oncology wards for low-income patients.",
    category: "Health",
    categoryColor: "#D42B2B",
    date: "May 2, 2026",
    source: "LASUTH",
    sourceUrl: "https://lagosstate.gov.ng",
  },
  {
    id: "9",
    title: "LIRS Tax Amnesty Programme: Deadline Extended to June 30, 2026",
    summary:
      "Lagos Internal Revenue Service has extended the tax amnesty programme deadline, waiving all penalties and interest for taxpayers who regularise their status before June 30.",
    category: "Finance",
    categoryColor: "#1B7A3E",
    date: "April 28, 2026",
    source: "LIRS",
    sourceUrl: "https://lirs.gov.ng",
  },
  {
    id: "10",
    title: "Lagos State Approves New Urban Planning Law for High-Rise Buildings",
    summary:
      "The Ministry of Physical Planning and Urban Development has gazetted new regulations governing high-rise construction above 10 floors across all LGAs.",
    category: "Planning",
    categoryColor: "#1A3A8F",
    date: "April 25, 2026",
    source: "Ministry of Physical Planning",
    sourceUrl: "https://lagosstate.gov.ng",
  },
];

const categories = ["All", "Economy", "Transportation", "Finance", "Environment", "Education", "Health", "Youth", "Planning"];

export default function NewsPage() {
  const featured = news.filter(n => n.featured);
  const rest = news.filter(n => !n.featured);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsJsonLd) }} />
      <main className="max-w-7xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4" style={{ background: "#F5C518", color: "#0D0D0D" }}>
            Latest Updates
          </div>
          <h1 className="font-display font-black text-4xl md:text-5xl mb-2">News & Announcements</h1>
          <p className="text-gray-500 max-w-xl">
            Official press releases, policy updates and announcements from Lagos State Government ministries, agencies and parastatals.
          </p>
        </div>

        {/* Category filter - visual only */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat, i) => (
            <span key={cat} className="px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors"
              style={{
                background: i === 0 ? "#0D0D0D" : "#ffffff",
                color: i === 0 ? "#fff" : "#0D0D0D",
                border: "2px solid #0D0D0D",
              }}>
              {cat}
            </span>
          ))}
        </div>

        {/* Featured stories */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {featured.map((item, i) => (
            <a key={item.id} href={item.sourceUrl} target="_blank" rel="noopener noreferrer"
              className="card-hover rounded-xl overflow-hidden block"
              style={{ border: "2px solid #0D0D0D", boxShadow: "4px 4px 0 #0D0D0D" }}>
              <div style={{ background: item.categoryColor, padding: "20px 20px 12px" }}>
                <span className="text-xs font-bold uppercase tracking-widest px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
                  {item.category}
                </span>
                {i === 0 && (
                  <span className="ml-2 text-xs font-bold uppercase tracking-widest px-2 py-1 rounded" style={{ background: "#F5C518", color: "#0D0D0D" }}>
                    Featured
                  </span>
                )}
              </div>
              <div className="p-5 bg-white">
                <h2 className="font-display font-bold text-base leading-snug mb-2">{item.title}</h2>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{item.summary}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{item.source}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1" style={{ background: "#e5e7eb" }} />
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">More Stories</span>
          <div className="h-px flex-1" style={{ background: "#e5e7eb" }} />
        </div>

        {/* Rest of news */}
        <div className="space-y-4">
          {rest.map((item) => (
            <a key={item.id} href={item.sourceUrl} target="_blank" rel="noopener noreferrer"
              className="card-hover flex gap-4 p-4 rounded-xl bg-white"
              style={{ border: "2px solid #0D0D0D" }}>
              <div className="w-1.5 rounded-full flex-shrink-0 self-stretch" style={{ background: item.categoryColor }} />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ background: item.categoryColor, color: "#fff" }}>
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400">{item.date}</span>
                </div>
                <h3 className="font-semibold text-sm leading-snug mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-1">{item.summary}</p>
              </div>
              <div className="text-xs text-gray-400 flex-shrink-0 self-center hidden md:block">{item.source}</div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl p-8 text-center" style={{ background: "#1A3A8F", border: "2px solid #0D0D0D" }}>
          <p className="font-display font-bold text-white text-xl mb-2">Want the latest news delivered?</p>
          <p className="text-blue-200 text-sm mb-6">Follow Lagos State Government official channels for real-time updates.</p>
          <a href="https://lagosstate.gov.ng" target="_blank" rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-lg font-bold text-sm" style={{ background: "#F5C518", color: "#0D0D0D", border: "2px solid #0D0D0D" }}>
            Visit Official Website →
          </a>
        </div>

      </main>
    </>
  );
}
