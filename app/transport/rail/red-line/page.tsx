import type { Metadata } from "next";
import TransportHero from "@/components/transport/Hero";
import StationList from "@/components/transport/StationList";
import ScheduleTable from "@/components/transport/ScheduleTable";
import FareCard from "@/components/transport/FareCard";
import ServiceNotice from "@/components/transport/ServiceNotice";
import { redLineData } from "@/lib/transport/red-line";
import { serviceNotices } from "@/lib/transport/service-notices";

export const metadata: Metadata = {
  title: "Lagos Red Line Rail | Stations, Schedule & Fares",
  description:
    "Lagos Red Line commuter rail — 11 stations from Agbado to Marina via Agege, Mushin and Yaba. Under construction, expected 2025–2026.",
  alternates: { canonical: "https://www.lagosdirectory.gov.ng/transport/rail/red-line" },
  keywords: [
    "Lagos Red Line", "Red Line rail Lagos", "Lagos Red Line stations",
    "Agbado to Marina train", "Lagos commuter rail", "LAMATA Red Line",
  ],
  openGraph: {
    title: "Lagos Red Line | Stations, Fares & Schedule",
    description: "Complete guide to the Lagos Red Line commuter rail — 11 stations, projected timetable and fares.",
    url: "https://www.lagosdirectory.gov.ng/transport/rail/red-line",
  },
};

export default function RedLinePage() {
  const d = redLineData;
  return (
    <main>
      <TransportHero
        title={d.fullName}
        subtitle={d.description}
        badge="Under Construction · Commuter Rail"
        color={d.color}
        backHref="/transport/rail"
        backLabel="All Rail"
        stats={d.overview.map(o => ({ label: o.label, value: o.value }))}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Construction notice */}
        <div className="mb-8 rounded-xl p-5"
          style={{ background: "#FFFBEB", border: "2px solid #EAB308" }}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🚧</span>
            <div>
              <p className="font-bold text-base mb-1">Under Construction — Expected 2025–2026</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                The Lagos Red Line is currently under construction. The schedule and fares shown are projected figures based on LAMATA&apos;s published plans. Trial runs are expected to begin in late 2025, with full commercial operations in 2026. Follow{" "}
                <a href="https://lamata-ng.com" target="_blank" rel="noopener noreferrer"
                  className="underline font-medium">lamata-ng.com</a>{" "}
                for official updates.
              </p>
            </div>
          </div>
        </div>

        <ServiceNotice notices={serviceNotices} filterLines={["Red Line"]} />

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {/* Stations */}
          <div className="lg:col-span-2 space-y-6">
            <StationList stations={d.stations} color={d.color} title={`Planned Stations (${d.totalStations})`} />

            {/* Route map description */}
            <div className="rounded-xl p-6 bg-white" style={{ border: "2px solid #0D0D0D" }}>
              <h3 className="font-display font-bold text-lg mb-3">🗺️ Route Overview</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                The Red Line follows the existing Nigerian Railway Corporation (NRC) corridor from Agbado in the northwest, passing through some of Lagos&apos;s most densely populated communities — Agege, Mushin and Oshodi — before crossing to Lagos Island via Yaba, Ebute Metta and Iddo.
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {d.stations.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-1">
                    <span className="text-xs font-semibold px-2 py-1 rounded"
                      style={{ background: s.isTerminal ? d.color : "#FAFAF5", color: s.isTerminal ? "#fff" : "#0D0D0D", border: "1px solid #e5e7eb" }}>
                      {s.name}
                    </span>
                    {i < d.stations.length - 1 && <span className="text-gray-300 text-xs">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ScheduleTable
              schedule={d.schedule}
              color={d.color}
              title="Projected Schedule"
            />
            <FareCard
              fares={d.fares}
              color={d.color}
              note="Projected fares subject to change. Cowry Card payment expected. Children under 5 travel free."
            />

            {/* Rules */}
            <div className="rounded-xl overflow-hidden" style={{ border: "2px solid #0D0D0D" }}>
              <div className="px-5 py-4" style={{ background: d.color }}>
                <h3 className="font-display font-bold text-white text-lg">📋 Travel Rules</h3>
              </div>
              <ul className="bg-white divide-y divide-gray-100">
                {d.rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3 px-5 py-3 text-sm text-gray-600">
                    <span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            {/* Interchange info */}
            <div className="rounded-xl p-5 bg-white" style={{ border: "2px solid #0D0D0D" }}>
              <h3 className="font-display font-bold text-lg mb-3">🔄 Interchange Stations</h3>
              <div className="space-y-2">
                {d.stations.filter(s => s.interchange && s.interchange.length > 0).map(s => (
                  <div key={s.id} className="flex items-start gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: d.color }} />
                    <div>
                      <span className="font-semibold">{s.name}</span>
                      <span className="text-gray-400 text-xs"> — {s.interchange?.join(", ")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="rounded-xl p-5" style={{ background: d.color, border: "2px solid #0D0D0D" }}>
              <h3 className="font-bold text-white mb-3">📞 Contact LAMATA</h3>
              <a href="tel:01-2702778" className="block text-white font-bold text-lg mb-1">01-2702778</a>
              <a href="https://lamata-ng.com" target="_blank" rel="noopener noreferrer"
                className="text-xs text-red-200 hover:underline">lamata-ng.com</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
