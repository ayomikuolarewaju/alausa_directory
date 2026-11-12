import { getEntitiesByCategory } from "@/lib/data-access";
import { connection } from "next/server";
import EntityCard from "@/components/EntityCard";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lagos State Ministries | Officeholders & Contacts",
  description:
    "Browse independent directory listings for Lagos State ministries, with officeholders, addresses and available contact details.",
  alternates: { canonical: "https://www.alausadirectory.com/ministries" },
  openGraph: {
    title: "Lagos State Ministries | Alausa Directory",
    description:
      "Browse independent directory listings for Lagos State ministries, with officeholders, addresses and available contact details.",
    url: "https://www.alausadirectory.com/ministries",
  },
};

export default async function MinistriesPage() {
  await connection();
  const items = await getEntitiesByCategory("ministry");
  const flaggedCheckedCount = items.filter(e => e.verified).length;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4" style={{ background: "#1A3A8F", color: "#fff" }}>
          Lagos State
        </div>
        <h1 className="font-display font-black text-4xl md:text-5xl mb-2">Ministries</h1>
        <p className="text-gray-500">{items.length} ministry records · {flaggedCheckedCount} flagged checked in the legacy dataset</p>
        <p className="text-xs text-gray-500 mt-1">Flags are not per-field verification. Read the <Link href="/methodology" className="underline">methodology</Link>.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((e) => <EntityCard key={e.id} entity={e} />)}
      </div>
    </main>
  );
}
