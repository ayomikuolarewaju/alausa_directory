import type { Metadata } from "next";
import TransportHero from "@/components/transport/Hero";
import StationList from "@/components/transport/StationList";
import FareCard from "@/components/transport/FareCard";
import { getTransportDataset } from "@/lib/data-access";
import { connection } from "next/server";

export const metadata: Metadata = {
  title: "Lagos Red Line | Current Timetable, Stops & Fare",
  description:
    "LAMATA's published weekday Red Line timetable: nine daily trains between Oyingbo and Agbado, with all eight stop times, fare reference and official sources.",
  alternates: { canonical: "https://www.alausadirectory.com/transport/rail/red-line" },
  keywords: [
    "Lagos Red Line", "Red Line rail Lagos", "Lagos Red Line stations",
    "Agbado to Oyingbo train", "Lagos commuter rail", "LAMATA Red Line timetable",
  ],
  openGraph: {
    title: "Lagos Red Line | Published Weekday Timetable",
    description: "LAMATA's published weekday timetable for Red Line passenger service between Oyingbo and Agbado.",
    url: "https://www.alausadirectory.com/transport/rail/red-line",
  },
};

export default async function RedLinePage() {
  await connection();
  const d = await getTransportDataset("red-line");
  return (
    <main>
      <TransportHero
        title={d.fullName}
        subtitle={d.description}
        badge="Passenger Service · Oyingbo–Agbado"
        color={d.color}
        backHref="/transport/rail"
        backLabel="All Rail"
        stats={d.overview.map(o => ({ label: o.label, value: o.value }))}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <section className="mb-8 rounded-xl p-5 bg-blue-50" style={{ border: "2px solid #1A3A8F" }}>
          <h2 className="font-display font-bold text-lg mb-2">What the published timetable confirms</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            LAMATA lists nine weekday trips: four northbound and five southbound between Oyingbo and Agbado. No Saturday or Sunday timetable is published on that schedule page, so weekend service is not confirmed here. The timetable was checked {d.checkedAt}.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mt-2">
            LAMATA&apos;s 30 June 2026 update said an increase to 24 daily trips was planned for Q4 2026. Its published timetable still lists nine trips, and we could not confirm that the expansion has entered service.
          </p>
          <a href={d.sources[0].url} target="_blank" rel="noopener noreferrer"
            className="inline-block mt-3 text-sm font-semibold underline" style={{ color: "#1A3A8F" }}>
            Check LAMATA&apos;s published timetable
          </a>
        </section>

        <section className="rounded-xl overflow-hidden mb-8" style={{ border: "2px solid #0D0D0D" }}>
          <div className="px-5 py-4" style={{ background: d.color }}>
            <h2 className="font-display font-bold text-white text-xl">Published Train Timetable</h2>
            <p className="text-sm text-white/80 mt-1">Monday–Friday only · Times shown as published by LAMATA</p>
          </div>
          {d.schedules.map((schedule) => (
            <div key={schedule.direction} className="border-t border-gray-200 first:border-t-0">
              <div className="px-5 py-4 bg-gray-50">
                <h3 className="font-display font-bold text-lg">{schedule.direction}</h3>
                <p className="text-sm text-gray-600">{schedule.serviceHours} · {schedule.trains.length} trains</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-sm">
                  <caption className="sr-only">{schedule.direction} timetable</caption>
                  <thead>
                    <tr className="bg-white">
                      <th scope="col" className="px-4 py-3 text-left font-semibold">Train</th>
                      {schedule.stations.map((station, index) => (
                        <th key={`${station}-${index}`} scope="col" className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                          {station}{index === 0 ? " departure" : index === schedule.stations.length - 1 ? " arrival" : " arrival"}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.trains.map((train) => (
                      <tr key={train.trainNo} className="border-t border-gray-100">
                        <th scope="row" className="px-4 py-3 text-left font-semibold whitespace-nowrap">{train.trainNo}</th>
                        {train.times.map((time, index) => (
                          <td key={`${train.trainNo}-${index}`} className="px-4 py-3 whitespace-nowrap">{time}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </section>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <StationList stations={d.stations} color={d.color} title="Current timetabled stations" />
            <section className="rounded-xl p-6 bg-white" style={{ border: "2px solid #0D0D0D" }}>
              <h2 className="font-display font-bold text-lg mb-2">Current service and planned corridor</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                The eight stops above are the stations listed in LAMATA&apos;s current Oyingbo–Agbado timetable. LAMATA describes a longer-term 37 km Agbado–Marina corridor; that planning description is not the same as the stations currently shown in the passenger timetable.
              </p>
            </section>
          </div>
          <aside className="space-y-6">
            <FareCard
              fares={d.fares}
              color={d.color}
              title="Published Fare Reference"
              note="LAMATA announced this end-to-end fare on 18 February 2025. This is the latest published official fare reference found, not confirmation of today's fare; check with LAMATA before travel. No current zonal fare breakdown was found."
            />
            <section className="rounded-xl p-5" style={{ background: d.color, border: "2px solid #0D0D0D" }}>
              <h2 className="font-display font-bold text-white text-lg mb-3">Contact LAMATA</h2>
              <a href="tel:+2349099526282" className="block text-white font-semibold hover:underline">09099LAMATA (09099526282)</a>
              <a href="tel:+2349115526282" className="block text-white font-semibold hover:underline mt-1">09011LAMATA (09115526282)</a>
              <a href="mailto:customercare@lamata-ng.com" className="block text-white text-sm hover:underline mt-3">customercare@lamata-ng.com</a>
              <a href="https://www.lamata-ng.com/contact/" target="_blank" rel="noopener noreferrer"
                className="inline-block text-xs text-red-100 hover:underline mt-3">LAMATA official contact page</a>
            </section>
          </aside>
        </div>

        <section className="mt-8 rounded-xl p-6 bg-white" style={{ border: "2px solid #0D0D0D" }}>
          <h2 className="font-display font-bold text-xl mb-2">Sources</h2>
          <p className="text-sm text-gray-500 mb-4">Primary LAMATA sources checked {d.checkedAt}. Schedule and fare details can change; confirm with LAMATA before travelling.</p>
          <ul className="space-y-3">
            {d.sources.map((source) => (
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
