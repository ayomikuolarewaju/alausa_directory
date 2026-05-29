import { getByCategory } from "@/lib/data";
import EntityCard from "@/components/EntityCard";

export default function ParastatalsPage() {
  const items = getByCategory("parastatal");
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4" style={{ background: "#1B7A3E", color: "#fff" }}>
          Lagos State
        </div>
        <h1 className="font-display font-black text-4xl md:text-5xl mb-2">Parastatals</h1>
        <p className="text-gray-500">{items.length} parastatals listed</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((e) => <EntityCard key={e.id} entity={e} />)}
      </div>
    </main>
  );
}
