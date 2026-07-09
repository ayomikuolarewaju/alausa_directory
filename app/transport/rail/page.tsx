import type { Metadata } from "next";
import LineCard from "@/components/transport/LineCard";
import ServiceNotice from "@/components/transport/ServiceNotice";
import { serviceNotices } from "@/lib/transport/service-notices";
import TransportHero from "@/components/transport/Hero";

export const metadata: Metadata = {
  title: "Lagos Rail — Blue Line & Red Line",
  description: "Lagos rail transport guide — Blue Line and Red Line schedules, stations, fares and service updates from LAMATA.",
  alternates: { canonical: "https://www.lagosdirectory.gov.ng/transport/rail" },
  keywords: ["Lagos rail", "Lagos Blue Line", "Lagos Red Line", "LAMATA rail", "Lagos metro", "Lagos train schedule"],
  openGraph: {
    title: "Lagos Rail Directory | Blue Line & Red Line",
    description: "Schedules, stations and fares for the Lagos Blue Line and Red Line rail services.",
    url: "https://www.lagosdirectory.gov.ng/transport/rail",
  },
};

const lines = [
  {
    name: "Blue Line",
    description: "Nigeria's first urban rail. Marina to Mile 2 along the Lagos Harbour waterfront — air-conditioned, fast and fully operational.",
    color: "#0057A8",
    status: "Operational",
    stats: [
      { label: "Stations", value: "13" },
      { label: "Length", value: "27 km" },
      { label: "Journey", value: "35 min" },
    ],
    href: "/transport/rail/blue-line",
  },
  {
    name: "Red Line",
    description: "Commuter rail from Agbado to Marina via Agege, Mushin and Yaba. Under construction — set to transform daily commutes for millions.",
    color: "#CC1F1F",
    status: "Under Construction",
    stats: [
      { label: "Stations", value: "11" },
      { label: "Length", value: "37 km" },
      { label: "Opens", value: "2025–26" },
    ],
    href: "/transport/rail/red-line",
  },
];

export default function RailPage() {
  return (
    <main>
      <TransportHero
        title="Lagos Rail"
        subtitle="Nigeria's urban rail network — Blue Line (operational) and Red Line (coming soon) connecting Lagos Island, Mainland and suburbs."
        badge="LAMATA Rail Services"
        color="#0D0D2B"
        backHref="/transport"
        backLabel="All Transport"
        stats={[
          { label: "Lines",        value: "2" },
          { label: "Total Stations", value: "24" },
          { label: "Total Length",  value: "64 km" },
          { label: "Max Speed",     value: "100 km/h" },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        <ServiceNotice notices={serviceNotices} filterLines={["Blue Line", "Red Line"]} />
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 rounded-full" style={{ background: "#0057A8" }} />
            <h2 className="font-display font-bold text-2xl">Choose a Line</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {lines.map(l => <LineCard key={l.name} {...l} />)}
          </div>
        </section>

        <section className="rounded-xl p-6" style={{ background: "#fff", border: "2px solid #0D0D0D" }}>
          <h2 className="font-display font-bold text-xl mb-3">🎟️ Cowry Card — Smart Ticketing</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            The Cowry Card is LAMATA&apos;s contactless smart card for seamless travel across rail and BRT services. Top up online or at any station ticket office. No need for cash — just tap and go.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["Tap & ride — no queuing", "Works on Blue Line & BRT", "Top up online or at stations", "Minimum balance: ₦100"].map(f => (
              <div key={f} className="text-xs px-3 py-2 rounded-lg text-center font-medium"
                style={{ background: "#0057A815", color: "#0057A8", border: "1px solid #0057A830" }}>
                {f}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
