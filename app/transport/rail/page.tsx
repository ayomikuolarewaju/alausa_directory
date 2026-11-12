import type { Metadata } from "next";
import LineCard from "@/components/transport/LineCard";
import ServiceNotice from "@/components/transport/ServiceNotice";
import { serviceNotices } from "@/lib/transport/service-notices";
import TransportHero from "@/components/transport/Hero";

export const metadata: Metadata = {
  title: "Lagos Rail — Blue Line & Red Line",
  description: "Current LAMATA rail service summary: Blue Line operating hours, five active stations and planned extension, plus the Red Line weekday timetable and stops.",
  alternates: { canonical: "https://www.alausadirectory.com/transport/rail" },
  keywords: ["Lagos rail", "Lagos Blue Line", "Lagos Red Line", "LAMATA rail", "Lagos metro", "Lagos train schedule"],
  openGraph: {
    title: "Lagos Rail Directory | Blue Line & Red Line",
    description: "Current operating stations, service schedules and planned rail extensions from LAMATA.",
    url: "https://www.alausadirectory.com/transport/rail",
  },
};

const lines = [
  {
    name: "Blue Line",
    description: "Current passenger service runs between Marina and Mile 2 through five operating stations. Three more stations are planned to open by the end of February 2027.",
    color: "#0057A8",
    status: "Operational",
    stats: [
      { label: "Operating stations", value: "5" },
      { label: "Trips/day", value: "102" },
      { label: "Service days", value: "Mon–Sat" },
    ],
    href: "/transport/rail/blue-line",
  },
  {
    name: "Red Line",
    description: "LAMATA's published weekday passenger timetable covers Oyingbo–Agbado. The 37 km Agbado–Marina route is a longer-term corridor plan.",
    color: "#CC1F1F",
    status: "Operational",
    stats: [
      { label: "Timetabled stops", value: "8" },
      { label: "Daily trains", value: "9" },
      { label: "Schedule", value: "Mon–Fri" },
    ],
    href: "/transport/rail/red-line",
  },
];

export default function RailPage() {
  return (
    <main>
      <TransportHero
        title="Lagos Rail"
        subtitle="Current services: Blue Line Marina–Mile 2 (five stations, Monday–Saturday) and Red Line Oyingbo–Agbado (eight stops, Monday–Friday). Announced extensions are shown separately from operating service."
        badge="LAMATA Rail Services"
        color="#0D0D2B"
        backHref="/transport"
        backLabel="All Transport"
        stats={[
          { label: "Rail Lines", value: "2" },
          { label: "Current stops", value: "13" },
          { label: "Blue Line trips", value: "102/day, Mon–Sat" },
          { label: "Red Line trips", value: "9/day, Mon–Fri" },
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

        <section className="rounded-xl p-6 bg-white" style={{ border: "2px solid #0D0D0D" }}>
          <h2 className="font-display font-bold text-xl mb-2">Electronic fare payment</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            LAMATA describes Cowry as its smart-card electronic fare-payment system. Current Blue Line fare amounts, minimum balance and rail-specific payment requirements are not stated in the published timetable; check LAMATA&apos;s current guidance before travelling.
          </p>
          <a href="https://www.lamata-ng.com/electronic-fare-payment-system/" target="_blank" rel="noopener noreferrer"
            className="inline-block mt-3 text-sm font-semibold underline" style={{ color: "#0057A8" }}>
            LAMATA electronic fare payment information
          </a>
        </section>
      </div>
    </main>
  );
}
