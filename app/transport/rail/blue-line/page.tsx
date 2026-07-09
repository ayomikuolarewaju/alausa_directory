import type { Metadata } from "next";
import TransportHero from "@/components/transport/Hero";
import StationList from "@/components/transport/StationList";
import ScheduleTable from "@/components/transport/ScheduleTable";
import FareCard from "@/components/transport/FareCard";
import ServiceNotice from "@/components/transport/ServiceNotice";
import { blueLineData } from "@/lib/transport/blue-line";
import { serviceNotices } from "@/lib/transport/service-notices";

export const metadata: Metadata = {
  title: "Lagos Blue Line Rail | Stations, Schedule & Fares",
  description: "Lagos Blue Line rail guide — 13 stations from Marina to Mile 2, schedules, fares and service updates. Nigeria's first urban rail system.",
  alternates: { canonical: "https://www.lagosdirectory.gov.ng/transport/rail/blue-line" },
  keywords: ["Lagos Blue Line", "Blue Line rail Lagos", "Lagos Blue Line stations", "Lagos Blue Line fares", "Lagos Blue Line schedule", "Marina to Mile 2 train"],
  openGraph: {
    title: "Lagos Blue Line | Stations, Fares & Schedule",
    description: "Complete guide to the Lagos Blue Line rail — 13 stations, timetable, fares and live service notices.",
    url: "https://www.lagosdirectory.gov.ng/transport/rail/blue-line",
  },
};

export default function BlueLinePage() {
  const d = blueLineData;
  return (
    <main>
      <TransportHero
        title={d.fullName}
        subtitle={d.description}
        badge="Operational · Light Rail"
        color={d.color}
        backHref="/transport/rail"
        backLabel="All Rail"
        stats={d.overview.map(o => ({ label: o.label, value: o.value }))}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <ServiceNotice notices={serviceNotices} filterLines={["Blue Line"]} />

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {/* Stations — full width on mobile, 2 cols on desktop */}
          <div className="lg:col-span-2 space-y-6">
            <StationList stations={d.stations} color={d.color} title={`Stations (${d.totalStations})`} />
          </div>

          {/* Schedule + Fares sidebar */}
          <div className="space-y-6">
            <ScheduleTable schedule={d.schedule} color={d.color} />
            <FareCard
              fares={d.fares}
              color={d.color}
              note="Fares paid via Cowry Card or token. Children under 5 travel free."
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

            {/* Contact */}
            <div className="rounded-xl p-5" style={{ background: "#0057A8", border: "2px solid #0D0D0D" }}>
              <h3 className="font-bold text-white mb-3">📞 Contact LAMATA</h3>
              <a href="tel:01-2702778" className="block text-white font-bold text-lg mb-1">01-2702778</a>
              <a href="https://lamata-ng.com" target="_blank" rel="noopener noreferrer"
                className="text-xs text-blue-200 hover:underline">lamata-ng.com</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
