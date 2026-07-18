import { getByCategory } from "@/lib/data";
import EntityCard from "@/components/EntityCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lagos State Parastatals | LASU LASUTH LAWMA Contacts",
  description:
    "Complete list of all Lagos State Government parastatals including LASU, LASUTH, LAWMA and Radio Lagos — managing directors, addresses and contact details.",
  alternates: { canonical: "https://www.lagosdirectory.gov.ng/parastatals" },
  openGraph: {
    title: "Lagos State Parastatals | Official Directory",
    description:
      "Browse all Lagos State Government parastatals with managing director names, office addresses and contact information.",
    url: "https://www.lagosdirectory.gov.ng/parastatals",
  },
};

export default function ParastatalsPage() {
  const items = getByCategory("parastatal");
  const needsCheck = items.filter(e => e.needsVerification).length;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4" style={{ background: "#1B7A3E", color: "#fff" }}>
          Lagos State
        </div>
        <h1 className="font-display font-black text-4xl md:text-5xl mb-2">Parastatals</h1>
        <p className="text-gray-500">{items.length} parastatals listed</p>
      </div>

      {needsCheck > 0 && (
        <div className="mb-8 p-4 rounded-xl bg-amber-50 border-2 border-amber-200">
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-semibold text-amber-800 text-sm">{needsCheck} parastatals need verification</p>
              <p className="text-amber-700 text-xs mt-1">
                Leadership details for these parastatals have not been confirmed by phone. 
                Click into any parastatal to see verification status.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((e) => <EntityCard key={e.id} entity={e} />)}
      </div>
    </main>
  );
}
