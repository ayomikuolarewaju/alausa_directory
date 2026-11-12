import type { Metadata } from "next";
import Link from "next/link";
import LineCard from "@/components/transport/LineCard";
import ServiceNotice from "@/components/transport/ServiceNotice";
import { serviceNotices } from "@/lib/transport/service-notices";

export const metadata: Metadata = {
  title: "Lagos Transport | LAMATA Rail, BRT & Ferry Directory",
  description:
    "Complete Lagos transport guide — Blue Line rail, Red Line rail, BRT corridors and ferry routes. Schedules, fares, stations and service notices from LAMATA.",
  alternates: { canonical: "https://www.alausadirectory.com/transport" },
  keywords: [
    "Lagos transport", "LAMATA Lagos", "Lagos Blue Line", "Lagos Red Line",
    "Lagos BRT", "Lagos ferry", "Lagos rail schedule", "Lagos BRT fares",
    "Lagos metro", "Alausa directory transport",
  ],
  openGraph: {
    title: "Lagos Transport Directory | LAMATA Rail, BRT & Ferry",
    description: "Schedules, fares, stations and routes for all LAMATA transport services in Lagos State.",
    url: "https://www.alausadirectory.com/transport",
  },
};

const modes = [
  {
    title: "Rail",
    icon: "🚊",
    description: "Blue Line & Red Line metro rail services across Lagos",
    href: "/transport/rail",
    color: "#0057A8",
    stats: "Blue: 5 stops, 102 trips/day (Mon–Sat) · Red: 8 stops, 9 trips/day (Mon–Fri)",
  },
  {
    title: "BRT",
    icon: "🚌",
    description: "Bus Rapid Transit corridors — West Africa's largest BRT network",
    href: "/transport/brt",
    color: "#E05C00",
    stats: "5 routes · 200k+ daily passengers",
  },
  {
    title: "Ferry",
    icon: "⛴️",
    description: "Waterway ferry services across Lagos Lagoon and harbour",
    href: "/transport/ferry",
    color: "#1B7A3E",
    stats: "8 routes · 12 terminals · 200km waterways",
  },
];

const lines = [
  {
    name: "Blue Line",
    description: "Current passenger service runs from Marina to Mile 2 through five operating stations. LAMATA has announced three additional stations for opening by the end of February 2027.",
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

export default function TransportPage() {
  return (
    <main>
      {/* Hero */}
      <section style={{ background: "#1A3A8F", borderBottom: "4px solid #F5C518" }}>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4"
            style={{ background: "#F5C518", color: "#0D0D0D" }}>
            LAMATA — Lagos Metropolitan Area Transport Authority
          </div>
          <h1 className="font-display font-black text-white text-4xl md:text-6xl mb-3">
            Lagos Transport<br />
            <span style={{ color: "#F5C518" }}>Directory</span>
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mb-8">
            Schedules, fares, stations and routes for all LAMATA rail, BRT and ferry services across Lagos State.
          </p>
          {/* Mode quick links */}
          <div className="flex flex-wrap gap-3">
            {modes.map(m => (
              <Link key={m.href} href={m.href}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-80"
                style={{ background: m.color, color: "#fff", border: "2px solid rgba(255,255,255,0.2)" }}>
                <span className="text-lg">{m.icon}</span> {m.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-14">

        {/* Service notices */}
        <ServiceNotice notices={serviceNotices} title="Current Service Information" />

        {/* Transport modes */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 rounded-full" style={{ background: "#F5C518" }} />
            <h2 className="font-display font-bold text-2xl md:text-3xl">Transport Modes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {modes.map(m => (
              <Link key={m.href} href={m.href}>
                <div className="card-hover rounded-2xl overflow-hidden h-full"
                  style={{ border: "2px solid #0D0D0D", boxShadow: "4px 4px 0 #0D0D0D" }}>
                  <div style={{ background: m.color, padding: "20px 24px" }}>
                    <span className="text-4xl">{m.icon}</span>
                  </div>
                  <div className="bg-white p-5">
                    <h3 className="font-display font-bold text-xl mb-1">{m.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{m.description}</p>
                    <p className="text-xs font-semibold" style={{ color: m.color }}>{m.stats}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Rail lines */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 rounded-full" style={{ background: "#0057A8" }} />
            <h2 className="font-display font-bold text-2xl md:text-3xl">Rail Lines</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {lines.map(l => (
              <LineCard key={l.name} {...l} />
            ))}
          </div>
        </section>

        {/* LAMATA info */}
        <section className="rounded-2xl p-8"
          style={{ background: "#1A3A8F", border: "2px solid #0D0D0D", boxShadow: "4px 4px 0 #0D0D0D" }}>
          <h2 className="font-display font-bold text-white text-2xl mb-2">About LAMATA</h2>
          <p className="text-blue-200 text-sm leading-relaxed mb-6 max-w-2xl">
            The Lagos Metropolitan Area Transport Authority (LAMATA) plans, coordinates and manages transportation in the Lagos metropolitan area. LAMATA oversees rail, BRT and ferry services, working to reduce congestion and provide safe, affordable public transport for over 20 million Lagosians.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="https://www.lamata-ng.com" target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg font-bold text-sm"
              style={{ background: "#F5C518", color: "#0D0D0D", border: "2px solid #0D0D0D" }}>
              Visit LAMATA website →
            </a>
            <a href="tel:+2349099526282"
              className="px-5 py-2.5 rounded-lg font-semibold text-sm"
              style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "2px solid rgba(255,255,255,0.3)" }}>
              📞 09099LAMATA (09099526282)
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}
