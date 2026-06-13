import { getByCategory } from "@/lib/data";
import EntityCard from "@/components/EntityCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agencies",
  description:
    "Complete list of all Lagos State Government agencies, their directors, addresses and contact details.",
  alternates: { canonical: "https://www.alausadirectory.com/agencies" },
  openGraph: {
    title: "Lagos State Agencies | Official Directory",
    description:
      "Browse all Lagos State Government agencies with director names, office addresses and contact information.",
    url: "https://www.alausadirectory.com/agencies",
  },
};

export default function AgenciesPage() {
  const items = getByCategory("agency");
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4" style={{ background: "#D42B2B", color: "#fff" }}>
          Lagos State
        </div>
        <h1 className="font-display font-black text-4xl md:text-5xl mb-2">Agencies</h1>
        <p className="text-gray-500">{items.length} agencies listed</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((e) => <EntityCard key={e.id} entity={e} />)}
      </div>
    </main>
  );
}
