import type { Metadata } from "next";
import TransportHero from "@/components/transport/Hero";
import ServiceNotice from "@/components/transport/ServiceNotice";
import { ferryData } from "@/lib/transport/ferry";
import { serviceNotices } from "@/lib/transport/service-notices";

export const metadata: Metadata = {
  title: "Lagos Ferry Services | Routes, Fares & Terminals",
  description:
    "Lagos ferry services guide — routes, fares, terminals and schedules across Lagos Lagoon. Marina to Ikorodu, Apapa, Badagry and more.",
  alternates: { canonical: "https://www.lagosdirectory.gov.ng/transport/ferry" },
  keywords: [
    "Lagos ferry", "Lagos ferry schedule", "Lagos ferry routes", "Lagos ferry fares",
    "Marina to Ikorodu ferry", "Lagos waterway transport", "LASWA ferry",
    "Lagos ferry terminal", "Lagos ferry timetable",
  ],
  openGraph: {
    title: "Lagos Ferry Services | Routes, Fares & Terminals",
    description: "Complete guide to Lagos ferry services — 8 routes, 12 terminals and schedules across Lagos Lagoon.",
    url: "https://www.lagosdirectory.gov.ng/transport/ferry",
  },
};

const statusColors = {
  "Operational":   { bg: "#F0FDF4", text: "#1B7A3E", border: "#1B7A3E" },
  "Seasonal":      { bg: "#FFFBEB", text: "#92400E", border: "#EAB308" },
  "Coming Soon":   { bg: "#EFF6FF", text: "#1A3A8F", border: "#1A3A8F" },
};

export default function FerryPage() {
  const d = ferryData;
  return (
    <main>
      <TransportHero
        title="Lagos Ferry Services"
        subtitle={d.description}
        badge="LASWA / Lagos Ferry Services Corporation"
        color="#1B7A3E"
        backHref="/transport"
        backLabel="All Transport"
        stats={d.overview.map(o => ({ label: o.label, value: o.value }))}
      />

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">

        <ServiceNotice notices={serviceNotices} filterLines={["Ferry"]} />

        {/* Routes */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 rounded-full" style={{ background: "#1B7A3E" }} />
            <h2 className="font-display font-bold text-2xl md:text-3xl">Ferry Routes</h2>
            <span className="text-gray-400 text-sm">{d.routes.length} routes</span>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {d.routes.map(route => {
              const sc = statusColors[route.status];
              return (
                <div key={route.id} className="rounded-xl overflow-hidden"
                  style={{ border: "2px solid #0D0D0D", boxShadow: "3px 3px 0 #0D0D0D" }}>

                  <div style={{ background: "#1B7A3E", padding: "14px 18px" }}>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display font-bold text-white text-base leading-tight">{route.name}</h3>
                      <span className="text-xs font-bold px-2 py-1 rounded flex-shrink-0"
                        style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>
                        {route.status}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white p-4">
                    {/* From → To */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex-1 text-center px-3 py-2 rounded-lg"
                        style={{ background: "#FAFAF5", border: "1px solid #e5e7eb" }}>
                        <p className="text-xs text-gray-400">From</p>
                        <p className="font-semibold text-sm">{route.from}</p>
                      </div>
                      <span className="text-xl">⛴️</span>
                      <div className="flex-1 text-center px-3 py-2 rounded-lg"
                        style={{ background: "#FAFAF5", border: "1px solid #e5e7eb" }}>
                        <p className="text-xs text-gray-400">To</p>
                        <p className="font-semibold text-sm">{route.to}</p>
                      </div>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {[
                        { label: "Duration",   value: route.duration },
                        { label: "Fare",       value: `₦${route.fare.toLocaleString()}` },
                        { label: "First",      value: route.firstDeparture },
                        { label: "Last",       value: route.lastDeparture },
                      ].map(s => (
                        <div key={s.label} className="text-center py-2 rounded-lg"
                          style={{ background: "#FAFAF5", border: "1px solid #e5e7eb" }}>
                          <p className="font-bold text-xs" style={{ color: "#1B7A3E" }}>{s.value}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>🔄 {route.frequency}</span>
                      {route.keyStops && route.keyStops.length > 2 && (
                        <span>via {route.keyStops.slice(1, -1).join(", ")}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Terminals */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 rounded-full" style={{ background: "#1B7A3E" }} />
            <h2 className="font-display font-bold text-2xl">Ferry Terminals & Jetties</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {d.terminals.map(terminal => (
              <div key={terminal.id} className="card-hover rounded-xl overflow-hidden bg-white"
                style={{ border: "2px solid #0D0D0D" }}>
                <div style={{ background: "#1B7A3E", padding: "12px 16px" }}>
                  <h3 className="font-bold text-white text-sm">{terminal.name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>
                    📍 {terminal.location}
                  </p>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-xs text-gray-500">{terminal.address}</p>
                  <a href={"tel:" + terminal.phone}
                    className="block text-xs font-semibold hover:underline"
                    style={{ color: "#1B7A3E" }}>
                    📞 {terminal.phone}
                  </a>
                  <div className="flex flex-wrap gap-1">
                    {terminal.facilities.map(f => (
                      <span key={f} className="text-xs px-2 py-0.5 rounded"
                        style={{ background: "#F0FDF4", color: "#1B7A3E", border: "1px solid #bbf7d0" }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Safety & Rules */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden" style={{ border: "2px solid #0D0D0D" }}>
            <div className="px-5 py-4" style={{ background: "#1B7A3E" }}>
              <h3 className="font-display font-bold text-white text-lg">📋 Ferry Rules</h3>
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

          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden" style={{ border: "2px solid #0D0D0D" }}>
              <div className="px-5 py-4" style={{ background: "#0057A8" }}>
                <h3 className="font-display font-bold text-white text-lg">🛟 Safety Tips</h3>
              </div>
              <ul className="bg-white divide-y divide-gray-100">
                {d.safetyTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 px-5 py-3 text-sm text-gray-600">
                    <span className="text-blue-500 flex-shrink-0 mt-0.5">ℹ️</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Emergency */}
            <div className="rounded-xl p-5" style={{ background: "#D42B2B", border: "2px solid #0D0D0D" }}>
              <h3 className="font-bold text-white mb-1">🚨 Water Emergency</h3>
              <p className="text-red-200 text-xs mb-3">LASWA Distress Line — available 24/7</p>
              <a href="tel:08097000064" className="block text-white font-bold text-xl">0809-700-0064</a>
            </div>

            {/* LASWA contact */}
            <div className="rounded-xl p-5 bg-white" style={{ border: "2px solid #0D0D0D" }}>
              <h3 className="font-bold mb-2">Lagos State Waterways Authority (LASWA)</h3>
              <p className="text-xs text-gray-500 mb-3">Regulates boat and ferry operations across Lagos waterways</p>
              <a href="tel:01-2700900" className="block text-sm font-semibold mb-1"
                style={{ color: "#1B7A3E" }}>📞 01-2700900</a>
              <a href="mailto:info@laswa.lagosstate.gov.ng"
                className="text-xs text-gray-400 hover:underline">
                info@laswa.lagosstate.gov.ng
              </a>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
