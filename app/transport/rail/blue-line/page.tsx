import type { Metadata } from "next";
import TransportHero from "@/components/transport/Hero";
import StationList from "@/components/transport/StationList";
import ServiceNotice from "@/components/transport/ServiceNotice";
import { blueLineData } from "@/lib/transport/blue-line";
import { serviceNotices } from "@/lib/transport/service-notices";

export const metadata: Metadata = {
  title: "Lagos Blue Line | Current Stations and Schedule",
  description:
    "LAMATA's published Blue Line service: five operating stations, 102 daily trips Monday–Saturday, full available station-by-station schedules and announced station extensions.",
  alternates: { canonical: "https://www.alausadirectory.com/transport/rail/blue-line" },
  keywords: [
    "Lagos Blue Line", "Blue Line rail Lagos", "Lagos Blue Line stations",
    "Lagos Blue Line schedule", "Marina to Mile 2 train", "LAMATA Blue Line",
  ],
  openGraph: {
    title: "Lagos Blue Line | Current Service",
    description: "Current LAMATA Blue Line operating stations, service hours and announced extension.",
    url: "https://www.alausadirectory.com/transport/rail/blue-line",
  },
};

export default function BlueLinePage() {
  const d = blueLineData;
  return (
    <main>
      <TransportHero
        title={d.fullName}
        subtitle={d.description}
        badge="Operational · Marina–Mile 2"
        color={d.color}
        backHref="/transport/rail"
        backLabel="All Rail"
        stats={d.overview.map(o => ({ label: o.label, value: o.value }))}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <ServiceNotice notices={serviceNotices} filterLines={["Blue Line"]} />

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 space-y-6">
            <StationList stations={d.stations} color={d.color} title="Currently operating stations" />

            <section className="rounded-xl p-6 bg-white" style={{ border: "2px solid #0D0D0D" }}>
              <h2 className="font-display font-bold text-xl mb-2">Announced extension — not yet operating</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                LAMATA announced that these three stations are planned to open by the end of February 2027. They are not included in the current timetable or operating-station count.
              </p>
              <ul className="flex flex-wrap gap-2">
                {d.plannedStations.map(station => (
                  <li key={station} className="px-3 py-2 rounded-lg text-sm font-semibold"
                    style={{ background: "#EFF6FF", color: "#0057A8", border: "1px solid #BFDBFE" }}>
                    {station}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-xl overflow-hidden" style={{ border: "2px solid #0D0D0D" }}>
              <div className="px-5 py-4" style={{ background: d.color }}>
                <h2 className="font-display font-bold text-white text-lg">Published Operating Schedule</h2>
                <p className="text-sm text-white/80 mt-1">{d.serviceDays} · {d.checkedAt}</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th scope="col" className="px-4 py-3 text-left">Direction</th>
                      <th scope="col" className="px-4 py-3 text-left">Trips</th>
                      <th scope="col" className="px-4 py-3 text-left">Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.schedules.map(schedule => (
                      <tr key={schedule.direction} className="border-t border-gray-100">
                        <th scope="row" className="px-4 py-3 text-left font-semibold">{schedule.direction}</th>
                        <td className="px-4 py-3">{schedule.tripsPerDay}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{schedule.firstDeparture}–{schedule.lastDeparture}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-4 bg-white border-t border-gray-100 text-sm text-gray-600 space-y-2">
                <p>Peak headway: {d.peakHeadway}.</p>
                <p>The timetable is labeled Monday–Saturday; no Sunday schedule is published there. Full available station times are shown below.</p>
              </div>
            </section>

            <section className="rounded-xl p-5 bg-white" style={{ border: "2px solid #0D0D0D" }}>
              <h2 className="font-display font-bold text-lg mb-2">Fare and payment information</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                The current timetable does not publish Blue Line journey fares, so this guide does not show unverified fare amounts. LAMATA announced a 25% off-peak discount in August 2024, but a current tariff or confirmation that the discount remains in effect was not found.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mt-3">
                LAMATA&apos;s July 2026 notice says a Cowry card can be purchased at Blue and Red Line stations for ₦500. That is the card purchase price, not a train fare.
              </p>
            </section>

            <section className="rounded-xl p-5" style={{ background: d.color, border: "2px solid #0D0D0D" }}>
              <h2 className="font-display font-bold text-white text-lg mb-3">Contact LAMATA</h2>
              <a href="tel:+2349099526282" className="block text-white font-semibold hover:underline">09099LAMATA (09099526282)</a>
              <a href="tel:+2349115526282" className="block text-white font-semibold hover:underline mt-1">09011LAMATA (09115526282)</a>
              <a href="https://www.lamata-ng.com/contact/" target="_blank" rel="noopener noreferrer"
                className="inline-block text-xs text-blue-200 hover:underline mt-3">LAMATA official contact page</a>
            </section>
          </aside>
        </div>

        <section className="mt-8 rounded-xl bg-white p-6" style={{ border: "2px solid #0D0D0D" }}>
          <h2 className="font-display font-bold text-xl mb-2">Detailed station timetable</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Times and train numbers are reproduced from LAMATA&apos;s timetable. A dash means no time is listed for that stop. LAMATA advertises 51 trips per direction; its embedded timetable data contained 51 Marina-to-Mile 2 rows and 50 Mile 2-to-Marina rows on {d.checkedAt}. All supplied rows are shown; the missing return entry is not estimated.
          </p>
          {d.detailedSchedules.map(schedule => (
            <section key={schedule.direction} className="mt-6">
              <h3 className="font-display font-bold text-lg mb-3">
                {schedule.direction} ({schedule.rows.length} published rows)
              </h3>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full min-w-[1100px] text-xs">
                  <caption className="sr-only">{schedule.direction} station timetable</caption>
                  <thead>
                    <tr className="bg-gray-50">
                      {schedule.columns.map(column => (
                        <th key={column} scope="col" className="px-3 py-2 text-left whitespace-nowrap">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.rows.map(row => (
                      <tr key={row[0]} className="border-t border-gray-100">
                        <th scope="row" className="px-3 py-2 text-left font-semibold whitespace-nowrap">
                          {row[0]}
                        </th>
                        {row.slice(1).map((time, index) => (
                          <td key={`${row[0]}-${index}`} className="px-3 py-2 whitespace-nowrap">
                            {time === "-" ? "—" : time}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </section>

        <section className="mt-8 rounded-xl p-6 bg-white" style={{ border: "2px solid #0D0D0D" }}>
          <h2 className="font-display font-bold text-xl mb-2">Sources</h2>
          <p className="text-sm text-gray-500 mb-4">
            Official LAMATA sources checked {d.checkedAt}. Service and fare information may change; confirm before travelling.
          </p>
          <ul className="space-y-3">
            {d.sources.map(source => (
              <li key={source.url} className="text-sm">
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline" style={{ color: "#1A3A8F" }}>
                  {source.label}
                </a>
                <p className="text-gray-600 mt-0.5">{source.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
