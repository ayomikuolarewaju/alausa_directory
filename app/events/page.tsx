import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events Calendar — Lagos State Government",
  description:
    "Official Lagos State Government events calendar — public holidays, budget presentations, government programmes and key civic dates for 2026.",
  alternates: { canonical: "https://www.lagosdirectory.gov.ng/events" },
  keywords: [
    "Lagos State events 2026", "Lagos public holidays", "Lagos government calendar",
    "Lagos State budget 2026", "Lagos civic events",
  ],
  openGraph: {
    title: "Lagos State Government Events Calendar 2026",
    description:
      "Public holidays, budget presentations, government summits and key civic events for Lagos State in 2026.",
    url: "https://www.lagosdirectory.gov.ng/events",
  },
};

type Event = {
  id: string;
  title: string;
  date: string;
  dateObj: Date;
  endDate?: string;
  type: "Public Holiday" | "Government" | "Budget" | "Health" | "Education" | "Summit";
  description: string;
  organizer: string;
  location: string;
  color: string;
};

const events: Event[] = [
  { id: "1", title: "Workers' Day", date: "May 1, 2026", dateObj: new Date("2026-05-01"), type: "Public Holiday", description: "International Workers' Day — public holiday across Nigeria.", organizer: "Federal Government", location: "Statewide", color: "#1B7A3E" },
  { id: "2", title: "Lagos State Q2 Cabinet Meeting", date: "May 14, 2026", dateObj: new Date("2026-05-14"), type: "Government", description: "Quarterly executive council meeting to review MDA performance and approve new policies.", organizer: "Office of the Governor", location: "Alausa Secretariat, Ikeja", color: "#1A3A8F" },
  { id: "3", title: "Lagos Trade & Investment Summit 2026", date: "May 22–23, 2026", dateObj: new Date("2026-05-22"), endDate: "May 23, 2026", type: "Summit", description: "Annual summit bringing together investors, entrepreneurs and government officials to drive Lagos economy.", organizer: "Ministry of Commerce", location: "Eko Hotel & Suites, Victoria Island", color: "#D42B2B" },
  { id: "4", title: "Democracy Day", date: "June 12, 2026", dateObj: new Date("2026-06-12"), type: "Public Holiday", description: "Nigeria's Democracy Day — national public holiday commemorating the June 12, 1993 election.", organizer: "Federal Government", location: "Statewide", color: "#1B7A3E" },
  { id: "5", title: "Lagos State Mid-Year Budget Review", date: "June 20, 2026", dateObj: new Date("2026-06-20"), type: "Budget", description: "Ministry of Finance presents mid-year budget performance report to the Lagos State House of Assembly.", organizer: "Ministry of Finance", location: "Lagos State House of Assembly, Ikeja", color: "#F5C518" },
  { id: "6", title: "Public School WAEC Examinations Begin", date: "June 3, 2026", dateObj: new Date("2026-06-03"), type: "Education", description: "West African Senior School Certificate Examinations commence for Lagos State candidates.", organizer: "Lagos State Examinations Board", location: "Statewide", color: "#1A3A8F" },
  { id: "7", title: "Lagos State Urban Renewal Conference", date: "July 8, 2026", dateObj: new Date("2026-07-08"), type: "Summit", description: "Annual conference on housing, urban planning and slum upgrading in Lagos State.", organizer: "Ministry of Housing / LASURA", location: "Lagos Oriental Hotel, Victoria Island", color: "#D42B2B" },
  { id: "8", title: "Eid el-Kabir (Ileya)", date: "July 17, 2026", dateObj: new Date("2026-07-17"), type: "Public Holiday", description: "Eid el-Kabir public holiday — subject to moon sighting confirmation.", organizer: "Federal Government", location: "Statewide", color: "#1B7A3E" },
  { id: "9", title: "Lagos Health Summit 2026", date: "July 28–29, 2026", dateObj: new Date("2026-07-28"), endDate: "July 29, 2026", type: "Health", description: "Annual public health summit addressing healthcare delivery, primary care and medical infrastructure in Lagos.", organizer: "Ministry of Health", location: "Civic Centre, Victoria Island", color: "#1B7A3E" },
  { id: "10", title: "Lagos State Environmental Day", date: "August 5, 2026", dateObj: new Date("2026-08-05"), type: "Health", description: "Annual state-wide environmental cleanup, awareness campaign and LASEPA awards ceremony.", organizer: "LASEPA / Ministry of Environment", location: "Statewide", color: "#1B7A3E" },
  { id: "11", title: "Independence Day", date: "October 1, 2026", dateObj: new Date("2026-10-01"), type: "Public Holiday", description: "Nigeria's 66th Independence Day — national public holiday with state parades and celebrations.", organizer: "Federal Government", location: "Statewide", color: "#1B7A3E" },
  { id: "12", title: "Lagos State 2027 Budget Presentation", date: "October 15, 2026", dateObj: new Date("2026-10-15"), type: "Budget", description: "Governor presents the 2027 Appropriation Bill to the Lagos State House of Assembly.", organizer: "Ministry of Finance / Office of the Governor", location: "Lagos State House of Assembly, Ikeja", color: "#F5C518" },
  { id: "13", title: "Lagos International Film Festival", date: "October 27–30, 2026", dateObj: new Date("2026-10-27"), endDate: "October 30, 2026", type: "Summit", description: "Annual Nollywood and international film festival hosted by the Lagos State Council for Arts and Culture.", organizer: "Lagos State Council for Arts & Culture", location: "Terra Kulture, Victoria Island", color: "#D42B2B" },
  { id: "14", title: "Lagos State Q4 Ministerial Briefing", date: "November 10, 2026", dateObj: new Date("2026-11-10"), type: "Government", description: "Commissioners brief the public on ministry performance, projects and achievements for the year.", organizer: "Ministry of Information & Strategy", location: "Eko Hotel & Suites, Victoria Island", color: "#1A3A8F" },
  { id: "15", title: "Christmas Day", date: "December 25, 2026", dateObj: new Date("2026-12-25"), type: "Public Holiday", description: "Christmas Day — national public holiday.", organizer: "Federal Government", location: "Statewide", color: "#1B7A3E" },
  { id: "16", title: "New Year's Eve / End of Year Fireworks", date: "December 31, 2026", dateObj: new Date("2026-12-31"), type: "Government", description: "Annual Lagos State Government end-of-year fireworks and celebration event at the waterfront.", organizer: "Ministry of Home Affairs", location: "Bar Beach, Victoria Island", color: "#1A3A8F" },
];

const typeColors: Record<Event["type"], string> = {
  "Public Holiday": "#1B7A3E",
  Government: "#1A3A8F",
  Budget: "#8B5CF6",
  Health: "#059669",
  Education: "#0EA5E9",
  Summit: "#D42B2B",
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Lagos State Government Events Calendar 2026",
  itemListElement: events.map((e, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Event",
      name: e.title,
      startDate: e.dateObj.toISOString().split("T")[0],
      description: e.description,
      organizer: { "@type": "Organization", name: e.organizer },
      location: { "@type": "Place", name: e.location, address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" } },
    },
  })),
};

export default function EventsPage() {
  const eventsByMonth = months.reduce((acc, month) => {
    const monthEvents = events.filter(e => {
      const m = e.dateObj.toLocaleString("default", { month: "long" });
      return m === month;
    });
    if (monthEvents.length > 0) acc[month] = monthEvents;
    return acc;
  }, {} as Record<string, Event[]>);

  const types = [...new Set(events.map(e => e.type))];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="max-w-6xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4" style={{ background: "#F5C518", color: "#0D0D0D" }}>
            2026 Calendar
          </div>
          <h1 className="font-display font-black text-4xl md:text-5xl mb-2">Events Calendar</h1>
          <p className="text-gray-500 max-w-xl">
            Public holidays, government summits, budget presentations and key civic events for Lagos State in 2026.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-10">
          {types.map(type => (
            <div key={type} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: "#fff", border: "2px solid #0D0D0D" }}>
              <div className="w-3 h-3 rounded-full" style={{ background: typeColors[type] }} />
              {type}
            </div>
          ))}
        </div>

        {/* Events by month */}
        <div className="space-y-12">
          {Object.entries(eventsByMonth).map(([month, monthEvents]) => (
            <section key={month}>
              <div className="flex items-center gap-3 mb-5">
                <div className="font-display font-black text-2xl">{month}</div>
                <div className="h-px flex-1" style={{ background: "#e5e7eb" }} />
                <span className="text-xs text-gray-400 font-medium">{monthEvents.length} event{monthEvents.length > 1 ? "s" : ""}</span>
              </div>

              <div className="space-y-3">
                {monthEvents.map(event => (
                  <div key={event.id} className="card-hover flex gap-0 bg-white rounded-xl overflow-hidden"
                    style={{ border: "2px solid #0D0D0D" }}>
                    {/* Date column */}
                    <div className="w-20 flex-shrink-0 flex flex-col items-center justify-center py-4 text-white"
                      style={{ background: typeColors[event.type] }}>
                      <span className="font-black text-2xl leading-none">
                        {event.dateObj.getDate()}
                      </span>
                      <span className="text-xs opacity-80">
                        {event.dateObj.toLocaleString("default", { month: "short" })}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 flex flex-col md:flex-row md:items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                            style={{ background: typeColors[event.type], color: "#fff" }}>
                            {event.type}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-base">{event.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                      </div>
                      <div className="flex-shrink-0 text-right hidden md:block">
                        <p className="text-xs font-semibold text-gray-600">{event.organizer}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1 justify-end mt-1">
                          <span>📍</span> {event.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Note */}
        <div className="mt-12 p-5 rounded-xl text-sm text-gray-500"
          style={{ background: "#fff", border: "2px dashed #ccc" }}>
          <strong>Note:</strong> Dates for Islamic holidays are subject to moon sighting confirmation. Government event dates may change. Check{" "}
          <a href="https://lagosstate.gov.ng" target="_blank" rel="noopener noreferrer" className="underline text-blue-700">
            lagosstate.gov.ng
          </a>{" "}
          for the latest updates.
        </div>

      </main>
    </>
  );
}
