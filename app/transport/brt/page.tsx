import type { Metadata } from "next";
import TransportHero from "@/components/transport/Hero";
import FareCard from "@/components/transport/FareCard";
import ServiceNotice from "@/components/transport/ServiceNotice";
import { brtData } from "@/lib/transport/brt";
import { serviceNotices } from "@/lib/transport/service-notices";

export const metadata: Metadata = {
  title: "Lagos BRT | Routes, Fares & Terminals",
  description:
    "Complete Lagos BRT guide — 5 corridors, routes, fares, terminals and schedules. West Africa's largest Bus Rapid Transit network operated by LAMATA.",
  alternates: { canonical: "https://www.lagosdirectory.gov.ng/transport/brt" },
  keywords: [
    "Lagos BRT", "BRT Lagos routes", "Lagos BRT fares", "Lagos BRT schedule",
    "LAMATA BRT", "Lagos Island Ikorodu BRT", "Oshodi Abule Egba BRT",
    "Lekki Ajah BRT", "Lagos bus rapid transit",
  ],
  openGraph: {
    title: "Lagos BRT Routes, Fares & Terminals | LAMATA",
    description: "Routes, fares and schedules for all 5 Lagos BRT corridors — West Africa's largest BRT network.",
    url: "https://www.lagosdirectory.gov.ng/transport/brt",
  },
};

const routeColors: Record<string, string> = {
  "brt-1": "#E05C00",
  "brt-2": "#0057A8",
  "brt-3": "#1B7A3E",
  "brt-4": "#8B5CF6",
  "brt-5": "#D42B2B",
};

export default function BRTPage() {
  const d = brtData;
  return (
    <main>
      <TransportHero
        title="Lagos BRT"
        subtitle={d.description}
        badge="LAMATA Bus Rapid Transit"
        color="#E05C00"
        backHref="/transport"
        backLabel="All Transport"
        stats={d.overview.map(o => ({ label: o.label, value: o.value }))}
      />

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">

        <ServiceNotice notices={serviceNotices} filterLines={["BRT", "BRT Route 1"]} />

        {/* Routes */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 rounded-full" style={{ background: "#E05C00" }} />
            <h2 className="font-display font-bold text-2xl md:text-3xl">BRT Routes</h2>
            <span className="text-gray-400 text-sm">{d.routes.length} corridors</span>
          </div>

          <div className="space-y-5">
            {d.routes.map(route => {
              const color = routeColors[route.id] ?? "#E05C00";
              const isOperational = route.status === "Operational";
              return (
                <div key={route.id} className="rounded-2xl overflow-hidden"
                  style={{ border: "2px solid #0D0D0D", boxShadow: "4px 4px 0 #0D0D0D" }}>

                  {/* Route header */}
                  <div style={{ background: color, padding: "16px 24px" }}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display font-black text-white text-xl">{route.name}</h3>
                        <p className="text-white opacity-80 text-sm mt-0.5">
                          {route.from} → {route.to}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <span className="text-xs font-bold px-2 py-1 rounded"
                          style={{ background: isOperational ? "#F5C518" : "rgba(255,255,255,0.2)", color: isOperational ? "#0D0D0D" : "#fff" }}>
                          {route.status}
                        </span>
                        <span className="text-xs font-bold px-2 py-1 rounded"
                          style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
                          ₦{route.fare.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-5">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                      {[
                        { label: "Distance",    value: route.distance },
                        { label: "Stops",       value: `${route.stops} stops` },
                        { label: "Journey",     value: route.journeyTime },
                        { label: "Frequency",   value: route.frequency },
                      ].map(s => (
                        <div key={s.label} className="text-center py-3 rounded-lg"
                          style={{ background: "#FAFAF5", border: "1px solid #e5e7eb" }}>
                          <p className="font-bold text-sm" style={{ color }}>{s.value}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Schedule strip */}
                    <div className="flex flex-wrap items-center gap-4 mb-5 p-3 rounded-lg"
                      style={{ background: `${color}10`, border: `1px solid ${color}30` }}>
                      <div className="text-sm">
                        <span className="text-gray-400 text-xs block">First Bus</span>
                        <span className="font-bold font-mono" style={{ color }}>{route.firstBus}</span>
                      </div>
                      <div className="h-6 w-px bg-gray-200" />
                      <div className="text-sm">
                        <span className="text-gray-400 text-xs block">Last Bus</span>
                        <span className="font-bold font-mono" style={{ color }}>{route.lastBus}</span>
                      </div>
                      <div className="h-6 w-px bg-gray-200" />
                      <div className="text-sm flex-1">
                        <span className="text-gray-400 text-xs block">Frequency</span>
                        <span className="font-semibold text-xs">{route.frequency}</span>
                      </div>
                    </div>

                    {/* Key stops */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Key Stops</p>
                      <div className="flex items-center gap-1 flex-wrap">
                        {route.keyStops.map((stop, i) => (
                          <div key={stop} className="flex items-center gap-1">
                            <span className="text-xs px-2 py-1 rounded font-medium"
                              style={{
                                background: i === 0 || i === route.keyStops.length - 1 ? color : "#FAFAF5",
                                color: i === 0 || i === route.keyStops.length - 1 ? "#fff" : "#0D0D0D",
                                border: "1px solid #e5e7eb",
                              }}>
                              {stop}
                            </span>
                            {i < route.keyStops.length - 1 && (
                              <span className="text-gray-300 text-xs">›</span>
                            )}
                          </div>
                        ))}
                      </div>
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
            <div className="w-1.5 h-8 rounded-full" style={{ background: "#E05C00" }} />
            <h2 className="font-display font-bold text-2xl">Major BRT Terminals</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {d.terminals.map(t => (
              <div key={t.name} className="rounded-xl p-4 bg-white"
                style={{ border: "2px solid #0D0D0D" }}>
                <p className="font-bold text-sm mb-1">{t.name}</p>
                <p className="text-xs text-gray-400 mb-2">📍 {t.location}</p>
                <a href={"tel:" + t.phone} className="text-xs font-semibold hover:underline"
                  style={{ color: "#E05C00" }}>
                  📞 {t.phone}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Rules */}
        <section className="rounded-2xl overflow-hidden"
          style={{ border: "2px solid #0D0D0D" }}>
          <div className="px-6 py-4" style={{ background: "#E05C00" }}>
            <h2 className="font-display font-bold text-white text-xl">📋 BRT Travel Rules</h2>
          </div>
          <div className="grid md:grid-cols-2 bg-white">
            {d.rules.map((rule, i) => (
              <div key={i} className="flex items-start gap-3 px-6 py-3 text-sm text-gray-600"
                style={{ borderBottom: "1px solid #f3f4f6" }}>
                <span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>
                {rule}
              </div>
            ))}
          </div>
        </section>

        {/* LAMATA contact */}
        <div className="rounded-2xl p-6"
          style={{ background: "#E05C00", border: "2px solid #0D0D0D" }}>
          <h2 className="font-display font-bold text-white text-xl mb-2">Contact LAMATA BRT</h2>
          <p className="text-white opacity-80 text-sm mb-4">For BRT complaints, lost property or service enquiries:</p>
          <div className="flex flex-wrap gap-3">
            <a href="tel:01-2702778"
              className="px-5 py-2.5 rounded-lg font-bold text-sm"
              style={{ background: "#F5C518", color: "#0D0D0D", border: "2px solid #0D0D0D" }}>
              📞 01-2702778
            </a>
            <a href="https://lamata-ng.com" target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg font-semibold text-sm"
              style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "2px solid rgba(255,255,255,0.3)" }}>
              lamata-ng.com →
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
