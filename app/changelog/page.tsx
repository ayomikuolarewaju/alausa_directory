import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog",
  description: "A record of visible changes to Alausa Directory.",
  alternates: { canonical: "https://www.alausadirectory.com/changelog" },
};

export default function ChangelogPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-display font-black text-4xl md:text-5xl mb-4">Changelog</h1>
      <p className="text-gray-600 leading-relaxed mb-8">
        This page records site-level changes and selected source-backed corrections. It is not a complete record-level revision history.
      </p>
      <ol className="space-y-5">
        <li className="rounded-xl bg-white p-6" style={{ border: "2px solid #0D0D0D" }}>
          <time dateTime="2026-11-12" className="text-xs font-semibold uppercase tracking-wide text-gray-500">12 November 2026</time>
          <h2 className="font-display font-bold text-xl mt-2 mb-2">Entity directory corrections</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Updated ministry names and commissioner listings against the official Lagos State council and MDA directory pages, added the listed Waterfront Infrastructure and Wealth Creation ministries, and removed unconfirmed Works and Energy commissioner names. Corrected LASEPA leadership and contacts, LASIMRA leadership, LASU contact details, and LAWMA&apos;s official name and mandate. Data-update dates are now separate from full-record review dates. Other agency and parastatal records remain overdue where current primary-source evidence was unavailable or incomplete; their details were not guessed.
          </p>
        </li>
        <li className="rounded-xl bg-white p-6" style={{ border: "2px solid #0D0D0D" }}>
          <time dateTime="2026-11-12" className="text-xs font-semibold uppercase tracking-wide text-gray-500">12 November 2026</time>
          <h2 className="font-display font-bold text-xl mt-2 mb-2">LAMATA rail information updated</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Corrected Blue Line operating stations and schedule, added all station-time rows available from LAMATA, and flagged its mismatch between 51 advertised return trips and 50 embedded timetable rows. Separated the announced extension from current service, replaced unsupported fare figures with sourced caveats, and added LAMATA&apos;s Oyingbo–Agbado Red Line timetable. Updated LAMATA contact and leadership details against official sources and hid unverified, months-old BRT and ferry advisories from current notices. Other directory records remain subject to their existing freshness warnings until reviewed.
          </p>
        </li>
        <li className="rounded-xl bg-white p-6" style={{ border: "2px solid #0D0D0D" }}>
          <time dateTime="2026-11-12" className="text-xs font-semibold uppercase tracking-wide text-gray-500">12 November 2026</time>
          <h2 className="font-display font-bold text-xl mt-2 mb-2">Trust and transparency updates</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Corrected canonical and identity signals, removed unsupported verification claims, added record freshness warnings and public methodology notes, made counts data-driven, and changed news listings to show headlines and source links without article summaries.
          </p>
        </li>
      </ol>
    </main>
  );
}
