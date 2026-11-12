import type { Metadata } from "next";
import LineCard from "@/components/transport/LineCard";
import ServiceNotice from "@/components/transport/ServiceNotice";
import { getServiceNotices, getTransportDataset } from "@/lib/data-access";
import { connection } from "next/server";
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

export default async function RailPage() {
  await connection();
  const [blueLine, redLine, serviceNotices] = await Promise.all([
    getTransportDataset("blue-line"),
    getTransportDataset("red-line"),
    getServiceNotices(),
  ]);
  const blueTrips = blueLine.schedules.reduce((total, schedule) => total + schedule.tripsPerDay, 0);
  const redTrips = redLine.schedules.reduce((total, schedule) => total + schedule.trains.length, 0);
  const totalStations = blueLine.stations.length + redLine.stations.length;
  const lines = [
    {
      name: blueLine.name,
      description: blueLine.description,
      color: blueLine.color,
      status: blueLine.status,
      stats: [
        { label: "Operating stations", value: String(blueLine.stations.length) },
        { label: "Trips/day", value: String(blueTrips) },
        { label: "Service days", value: blueLine.serviceDays },
      ],
      href: "/transport/rail/blue-line",
    },
    {
      name: redLine.name,
      description: redLine.description,
      color: redLine.color,
      status: "Operational",
      stats: [
        { label: "Timetabled stops", value: String(redLine.stations.length) },
        { label: "Daily trains", value: String(redTrips) },
        { label: "Schedule", value: "Weekdays" },
      ],
      href: "/transport/rail/red-line",
    },
  ];
  return (
    <main>
      <TransportHero
        title="Lagos Rail"
        subtitle={`Current services: Blue Line ${blueLine.currentRoute} (${blueLine.stations.length} stations, ${blueLine.serviceDays}) and Red Line ${redLine.overview[0]?.value ?? "published passenger service"} (${redLine.stations.length} stops). Announced extensions are shown separately from operating service.`}
        badge="LAMATA Rail Services"
        color="#0D0D2B"
        backHref="/transport"
        backLabel="All Transport"
        stats={[
          { label: "Rail Lines", value: "2" },
          { label: "Current stops", value: String(totalStations) },
          { label: "Blue Line trips", value: `${blueTrips}/day, ${blueLine.serviceDays}` },
          { label: "Red Line trips", value: `${redTrips}/day, weekdays` },
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
