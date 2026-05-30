import type { Metadata } from "next";
import Link from "next/link";
import { lgas } from "@/lib/lgaData";

export const metadata: Metadata = {
  title: "LGA Directory — All 20 Local Government Areas",
  description: "Complete directory of all 20 Local Government Areas in Lagos State — chairmen, addresses, phone numbers and ward information.",
  alternates: { canonical: "https://www.lagosdirectory.gov.ng/lgas" },
  keywords: ["Lagos LGA", "Lagos local government", "Lagos 20 LGAs", "Ikeja LGA", "Eti-Osa LGA", "Lagos Island LGA", "Surulere LGA"],
  openGraph: {
    title: "Lagos State LGA Directory | All 20 Local Government Areas",
    description: "Find all 20 Lagos State Local Government Areas with chairman names, office addresses and contact details.",
    url: "https://www.lagosdirectory.gov.ng/lgas",
  },
};

const zoneColors = {
  Island:   { bg: "#1A3A8F", text: "#fff" },
  Mainland: { bg: "#D42B2B", text: "#fff" },
  Suburban: { bg: "#1B7A3E", text: "#fff" },
};

const zones = ["Island", "Mainland", "Suburban"] as const;

export default function LGAsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4" style={{ background: "#F5C518", color: "#0D0D0D" }}>
          Local Government Areas
        </div>
        <h1 className="font-display font-black text-4xl md:text-5xl mb-2">Lagos LGA Directory</h1>
        <p className="text-gray-500 max-w-xl">All 20 Local Government Areas of Lagos State — chairmen, addresses, history and detailed profiles.</p>
      </div>

      {/* Zone legend */}
      <div className="flex flex-wrap gap-3 mb-10">
        {zones.map(zone => (
          <div key={zone} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium" style={{ background: "#fff", border: "2px solid #0D0D0D" }}>
            <div className="w-3 h-3 rounded-full" style={{ background: zoneColors[zone].bg }} />
            {zone} Zone — {lgas.filter(l => l.zone === zone).length} LGAs
          </div>
        ))}
      </div>

      {zones.map(zone => (
        <div key={zone} className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 rounded-full" style={{ background: zoneColors[zone].bg }} />
            <h2 className="font-display font-bold text-2xl">{zone} Zone</h2>
            <span className="text-sm text-gray-400">{lgas.filter(l => l.zone === zone).length} local governments</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {lgas.filter(l => l.zone === zone).map(lga => (
              <Link key={lga.id} href={`/lgas/${lga.id}`}>
                <div className="card-hover bg-white rounded-xl overflow-hidden h-full" style={{ border: "2px solid #0D0D0D", boxShadow: "4px 4px 0 #0D0D0D" }}>
                  <div style={{ background: zoneColors[lga.zone].bg, padding: "14px 16px" }}>
                    <h3 className="font-display font-bold text-white text-lg">{lga.name}</h3>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>HQ: {lga.headquarters}</p>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <span>👤</span>
                      <div>
                        <p className="font-semibold">{lga.chairman}</p>
                        <p className="text-xs text-gray-400">Executive Chairman</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <span>📍</span>
                      <p className="text-gray-500 text-xs">{lga.address}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span>📞</span>
                      <span className="text-gray-500 text-xs">{lga.phone}</span>
                    </div>
                    <div className="flex gap-3 pt-1 border-t border-gray-100">
                      <div className="text-center flex-1">
                        <p className="font-bold text-sm" style={{ color: zoneColors[lga.zone].bg }}>{lga.wards}</p>
                        <p className="text-xs text-gray-400">Wards</p>
                      </div>
                      <div className="w-px bg-gray-100" />
                      <div className="text-center flex-1">
                        <p className="font-bold text-sm" style={{ color: zoneColors[lga.zone].bg }}>{lga.area}</p>
                        <p className="text-xs text-gray-400">Area</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <p className="text-xs text-gray-400">Pop. {lga.population}</p>
                      <span className="text-xs font-semibold px-2 py-1 rounded" style={{ background: zoneColors[lga.zone].bg, color: "#fff" }}>
                        View Profile →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
