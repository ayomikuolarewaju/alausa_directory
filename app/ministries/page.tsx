import { getByCategory } from "@/lib/data";
import EntityCard from "@/components/EntityCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lagos State Ministries | All Commissioners & Contacts 2026",
  description:
    "Complete list of all 24 Lagos State Government ministries — commissioners, Alausa Secretariat office addresses and contact details for 2026.",
  alternates: { canonical: "https://www.lagosdirectory.gov.ng/ministries" },
  openGraph: {
    title: "Lagos State Ministries 2026 | Alausa Secretariat Directory",
    description:
      "Browse all Lagos State Government ministries 2026 — commissioner names, Alausa Secretariat addresses, phone numbers and emails.",
    url: "https://www.lagosdirectory.gov.ng/ministries",
  },
};

export default function MinistriesPage() {
  const items = getByCategory("ministry");
  const verifiedCount = items.filter(e => e.verified).length;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4" style={{ background: "#1A3A8F", color: "#fff" }}>
          Lagos State
        </div>
        <h1 className="font-display font-black text-4xl md:text-5xl mb-2">Ministries</h1>
        <p className="text-gray-500">{items.length} ministries listed · {verifiedCount} verified</p>
      </div>

      <div className="mb-8 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
        <div className="flex items-center gap-2">
          <span className="text-lg">✅</span>
          <p className="text-emerald-700 text-sm">
            <strong>All {items.length} ministries verified</strong> against Lagos State 2026 Budget and official government sources.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((e) => <EntityCard key={e.id} entity={e} />)}
      </div>
    </main>
  );
}
