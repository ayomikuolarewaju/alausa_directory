import type { Metadata } from "next";
import Link from "next/link";
import { lgas } from "@/lib/lgaData";

export const metadata: Metadata = {
  title: "Lagos State LGA Directory | All 20 Local Government Areas & 37 LCDAs",
  description:
    "Complete directory of all 20 Local Government Areas and 37 Local Council Development Areas in Lagos State — chairmen, addresses, phone numbers and ward information.",
  alternates: { canonical: "https://www.alausadirectory.com/lgas" },
  keywords: [
    "Lagos LGA", "Lagos local government", "Lagos 20 LGAs", "Lagos LCDAs",
    "Lagos Local Council Development Areas", "Ikeja LGA", "Eti-Osa LGA",
    "Lagos Island LGA", "Surulere LGA", "Alimosho LGA", "Lagos LGA chairmen 2026",
    "Alausa directory LGA",
  ],
  openGraph: {
    title: "Lagos State LGA & LCDA Directory | All 20 LGAs and 37 LCDAs",
    description:
      "Find all 20 Lagos State Local Government Areas and their 37 Local Council Development Areas — chairmen, addresses and contact details.",
    url: "https://www.alausadirectory.com/lgas",
  },
};

const zoneColors = {
  Island:   { bg: "#1A3A8F", text: "#fff" },
  Mainland: { bg: "#D42B2B", text: "#fff" },
  Suburban: { bg: "#1B7A3E", text: "#fff" },
};

const zones = ["Island", "Mainland", "Suburban"] as const;

const totalLCDAs = lgas.reduce((sum, lga) => sum + lga.localCouncilDevelopmentAreas.length, 0);

export default function LGAsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="mb-10">
        <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4"
          style={{ background: "#F5C518", color: "#0D0D0D" }}>
          Local Government Areas
        </div>
        <h1 className="font-display font-black text-4xl md:text-5xl mb-2">Lagos LGA & LCDA Directory</h1>
        <p className="text-gray-500 max-w-2xl">
          All 20 Local Government Areas and {totalLCDAs} Local Council Development Areas of Lagos State — with chairmen, office addresses, ward counts and individual LGA profiles.
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: "LGAs", value: 20, color: "#1A3A8F" },
          { label: "LCDAs", value: totalLCDAs, color: "#D42B2B" },
          { label: "Total Wards", value: lgas.reduce((s, l) => s + l.wards, 0), color: "#1B7A3E" },
        ].map(s => (
          <div key={s.label} className="text-center py-5 rounded-xl"
            style={{ background: s.color, border: "2px solid #0D0D0D", boxShadow: "4px 4px 0 #0D0D0D" }}>
            <p className="font-display font-black text-white text-3xl">{s.value}</p>
            <p className="text-white text-xs font-semibold uppercase tracking-wider mt-1 opacity-80">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Zone legend */}
      <div className="flex flex-wrap gap-3 mb-10">
        {zones.map(zone => (
          <div key={zone} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium"
            style={{ background: "#fff", border: "2px solid #0D0D0D" }}>
            <div className="w-3 h-3 rounded-full" style={{ background: zoneColors[zone].bg }} />
            {zone} Zone — {lgas.filter(l => l.zone === zone).length} LGAs &nbsp;·&nbsp;
            {lgas.filter(l => l.zone === zone).reduce((s, l) => s + l.localCouncilDevelopmentAreas.length, 0)} LCDAs
          </div>
        ))}
      </div>

      {/* LGAs by zone */}
      {zones.map(zone => (
        <div key={zone} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 rounded-full" style={{ background: zoneColors[zone].bg }} />
            <h2 className="font-display font-bold text-2xl">{zone} Zone</h2>
            <span className="text-sm text-gray-400">
              {lgas.filter(l => l.zone === zone).length} LGAs &nbsp;·&nbsp;
              {lgas.filter(l => l.zone === zone).reduce((s, l) => s + l.localCouncilDevelopmentAreas.length, 0)} LCDAs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {lgas.filter(l => l.zone === zone).map(lga => (
              <Link key={lga.id} href={`/lgas/${lga.id}`}>
                <div className="card-hover bg-white rounded-xl overflow-hidden h-full flex flex-col"
                  style={{ border: "2px solid #0D0D0D", boxShadow: "4px 4px 0 #0D0D0D" }}>

                  {/* LGA header */}
                  <div style={{ background: zoneColors[lga.zone].bg, padding: "14px 16px" }}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display font-bold text-white text-lg leading-tight">{lga.name}</h3>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>HQ: {lga.headquarters}</p>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 rounded flex-shrink-0"
                        style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
                        {lga.wards} wards
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col gap-3 flex-1">
                    {/* Chairman */}
                    <div className="flex items-start gap-2 text-sm">
                      <span>👤</span>
                      <div>
                        <p className="font-semibold leading-tight">{lga.chairman}</p>
                        <p className="text-xs text-gray-400">Executive Chairman</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-2 text-sm">
                      <span>📞</span>
                      <a href={"tel:" + lga.phone}
                        className="text-gray-500 text-xs hover:underline"
>
                        {lga.phone}
                      </a>
                    </div>

                    {/* Population + Area */}
                    <div className="flex gap-3 pt-2 border-t border-gray-100">
                      <div className="text-center flex-1">
                        <p className="font-bold text-sm" style={{ color: zoneColors[lga.zone].bg }}>{lga.population}</p>
                        <p className="text-xs text-gray-400">Population</p>
                      </div>
                      <div className="w-px bg-gray-100" />
                      <div className="text-center flex-1">
                        <p className="font-bold text-sm" style={{ color: zoneColors[lga.zone].bg }}>{lga.area}</p>
                        <p className="text-xs text-gray-400">Area</p>
                      </div>
                    </div>

                    {/* LCDAs */}
                    {lga.localCouncilDevelopmentAreas.length > 0 && (
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                          LCDAs ({lga.localCouncilDevelopmentAreas.length})
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {lga.localCouncilDevelopmentAreas.map(lcda => (
                            <span key={lcda}
                              className="text-xs px-2 py-1 rounded-full font-medium"
                              style={{ background: `${zoneColors[lga.zone].bg}18`, color: zoneColors[lga.zone].bg, border: `1px solid ${zoneColors[lga.zone].bg}40` }}>
                              {lcda.replace(" LCDA", "")}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* View profile CTA */}
                    <div className="mt-auto pt-2">
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-lg inline-block"
                        style={{ background: zoneColors[lga.zone].bg, color: "#fff" }}>
                        View Full Profile →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* LCDA quick reference table */}
      <div className="mt-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-8 rounded-full" style={{ background: "#F5C518" }} />
          <h2 className="font-display font-bold text-2xl">All {totalLCDAs} LCDAs — Quick Reference</h2>
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ border: "2px solid #0D0D0D", boxShadow: "4px 4px 0 #0D0D0D" }}>
          <div className="grid grid-cols-3 text-xs font-bold uppercase tracking-widest px-4 py-3"
            style={{ background: "#0D0D0D", color: "#F5C518" }}>
            <span>LCDA</span>
            <span>Parent LGA</span>
            <span>Zone</span>
          </div>

          {lgas.flatMap(lga =>
            lga.localCouncilDevelopmentAreas.map((lcda, i) => ({ lcda, lga, i }))
          ).map(({ lcda, lga, i }, idx) => (
            <Link key={`${lga.id}-${i}`} href={`/lgas/${lga.id}`}>
              <div className="grid grid-cols-3 px-4 py-3 text-sm hover:opacity-80 transition-opacity"
                style={{
                  background: idx % 2 === 0 ? "#fff" : "#FAFAF5",
                  borderTop: "1px solid #e5e7eb",
                }}>
                <span className="font-medium text-xs">{lcda}</span>
                <span className="text-xs" style={{ color: zoneColors[lga.zone].bg }}>{lga.name}</span>
                <span className="text-xs text-gray-400">{lga.zone}</span>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-3">
          * Each LCDA links to its parent LGA profile. Click any row to view the full LGA details, history and map.
        </p>
      </div>

    </main>
  );
}
