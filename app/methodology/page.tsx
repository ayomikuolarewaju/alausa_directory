import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Methodology and Verification",
  description:
    "How Alausa Directory gathers public information, what its verification labels mean, and how to report a correction.",
  alternates: { canonical: "https://www.alausadirectory.com/methodology" },
};

const sections = [
  {
    title: "Sources",
    body: "We prioritize primary sources such as Lagos State gazettes, official ministry and agency websites, official notices, budgets and press releases. Each listed source includes an access date and a note describing the claims it supports. A source supports only those stated claims; it does not verify every field on the record. Some official directory pages do not display a revision date.",
  },
  {
    title: "Status labels",
    body: "“Sources listed” means links and claim scopes are shown on the record page; it does not certify fields the sources do not support. “Review requested” means one or more details still need follow-up. “Legacy checked flag” identifies an older record-wide flag without linked evidence. Officer-level “Source checked” labels are backed by a listed source; legacy officer flags are not proof that information is current.",
  },
  {
    title: "Freshness",
    body: "“Data updated” records when directory content was last changed. “Last reviewed” records when an editor last reviewed the displayed fields and the evidence available for them. It does not certify every claim: missing, conflicting, or unsupported details remain flagged as “Review requested.” We flag records with no review date, or a review date more than 90 days old, as overdue. Individual source access dates apply only to the claims named in that source note.",
  },
  {
    title: "News links",
    body: "News headlines, dates, source names and links are fetched from RSS feeds and rendered on the server. We link to the original publisher and do not republish article text. Headlines are not a durable archive yet.",
  },
  {
    title: "Corrections",
    body: "Please send corrections through the contact form and include the affected record, the claim in question and a primary source where possible. Submissions are not currently published in a public correction log, and individual record revisions are not yet retained as snapshots.",
  },
];

export default function MethodologyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-display font-black text-4xl md:text-5xl mb-4">Methodology</h1>
      <p className="text-gray-600 leading-relaxed mb-8">
        Alausa Directory is an independent civic information project, not a government website. These notes explain how to interpret the current directory and its limitations.
      </p>
      <div className="space-y-5">
        {sections.map((section) => (
          <section key={section.title} className="rounded-xl bg-white p-6" style={{ border: "2px solid #0D0D0D" }}>
            <h2 className="font-display font-bold text-xl mb-2">{section.title}</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{section.body}</p>
          </section>
        ))}
      </div>
      <p className="mt-8 text-sm text-gray-600">
        We prefer official primary sources and do not currently provide claim-level citations for every listing.{" "}
        <Link href="/contact" className="underline" style={{ color: "#1A3A8F" }}>Report a correction</Link>
        {" "}or see the <Link href="/changelog" className="underline" style={{ color: "#1A3A8F" }}>changelog</Link>.
      </p>
    </main>
  );
}
