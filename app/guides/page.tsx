import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lagos Guides",
  description: "Practical, independently written guides to Lagos public services and transport.",
  alternates: { canonical: "https://www.alausadirectory.com/guides" },
};

const guides = [
  {
    href: "/guides/cashless-cowry-card",
    title: "Lagos Cashless Bus Rule: How to Get and Use a Cowry Card",
    blurb: "What LAMATA's cashless policy means for regulated bus commuters.",
  },
  {
    href: "/guides/brt-fares-2026",
    title: "Lagos BRT and Bus Reform Fares in 2026",
    blurb: "The reported March fare change, example fares and budgeting tips.",
  },
];

export default function GuidesIndex() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-black">Lagos Guides</h1>
      <p className="mt-2 text-gray-600">Independent explainers that go beyond the directory listings.</p>
      <ul className="mt-8 space-y-6">
        {guides.map((guide) => (
          <li key={guide.href} className="rounded-xl bg-white p-5"
            style={{ border: "2px solid #0D0D0D" }}>
            <Link href={guide.href} className="text-xl font-bold underline" style={{ color: "#1A3A8F" }}>
              {guide.title}
            </Link>
            <p className="mt-2 text-gray-600">{guide.blurb}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
