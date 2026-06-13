import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emergency Contacts — Lagos State",
  description:
    "All Lagos State emergency contacts — Police, Fire Service, LASEMA, LASAMBUS, hospitals and crisis hotlines. Save these numbers today.",
  alternates: { canonical: "https://www.alausadirectory.com/emergency" },
  keywords: [
    "Lagos emergency number", "LASEMA hotline", "Lagos fire service", "Lagos police",
    "Lagos ambulance", "Lagos emergency contacts", "112 Lagos", "767 Lagos",
  ],
  openGraph: {
    title: "Lagos State Emergency Contacts | All Hotlines",
    description:
      "Police, fire, ambulance, LASEMA and all Lagos State emergency contacts in one place. Save these numbers today.",
    url: "https://www.alausadirectory.com/emergency",
  },
};

type Contact = {
  name: string;
  numbers: string[];
  description: string;
  available: string;
  website?: string;
};

type Category = {
  title: string;
  color: string;
  icon: string;
  contacts: Contact[];
};

const categories: Category[] = [
  {
    title: "Primary Emergency Lines",
    color: "#D42B2B",
    icon: "🚨",
    contacts: [
      {
        name: "Lagos State Emergency Line",
        numbers: ["112"],
        description: "Single emergency number for all emergencies in Lagos State — police, fire and medical.",
        available: "24/7",
      },
      {
        name: "Lagos State Emergency Line (Alternative)",
        numbers: ["767"],
        description: "Alternative state emergency line operational across Lagos.",
        available: "24/7",
      },
    ],
  },
  {
    title: "Disaster & Emergency Management",
    color: "#D42B2B",
    icon: "⚠️",
    contacts: [
      {
        name: "Lagos State Emergency Management Agency (LASEMA)",
        numbers: ["08060907333", "08060907000"],
        description: "Coordinates response to floods, building collapses, explosions and large-scale emergencies.",
        available: "24/7",
        website: "https://lasema.lagosstate.gov.ng",
      },
    ],
  },
  {
    title: "Police & Security",
    color: "#1A3A8F",
    icon: "🚔",
    contacts: [
      {
        name: "Nigeria Police Force — Lagos Command",
        numbers: ["07055000055", "08062338588"],
        description: "Lagos State Police Command headquarters for crime reporting and emergency response.",
        available: "24/7",
      },
      {
        name: "Lagos State Security Trust Fund",
        numbers: ["08099112116"],
        description: "Reports suspicious activities and security threats in Lagos State.",
        available: "24/7",
      },
      {
        name: "Lagos Neighbourhood Safety Corps",
        numbers: ["08001000010"],
        description: "Community-level safety and security patrol across all LGAs.",
        available: "24/7",
      },
    ],
  },
  {
    title: "Fire Service",
    color: "#D42B2B",
    icon: "🔥",
    contacts: [
      {
        name: "Lagos State Fire and Rescue Service",
        numbers: ["01-7944996", "08033235891"],
        description: "Fire suppression and rescue operations across Lagos State.",
        available: "24/7",
      },
      {
        name: "Ikeja Fire Station",
        numbers: ["01-4930060"],
        description: "Primary fire station serving Ikeja and environs.",
        available: "24/7",
      },
      {
        name: "Lagos Island Fire Station",
        numbers: ["01-2660134"],
        description: "Fire station serving Lagos Island, Apapa and Victoria Island.",
        available: "24/7",
      },
    ],
  },
  {
    title: "Medical & Ambulance",
    color: "#1B7A3E",
    icon: "🚑",
    contacts: [
      {
        name: "Lagos State Ambulance Service (LASAMBUS)",
        numbers: ["08022370483", "08022370484"],
        description: "Free state-funded ambulance service for medical emergencies across Lagos.",
        available: "24/7",
      },
      {
        name: "Lagos University Teaching Hospital (LUTH)",
        numbers: ["01-7746001", "01-7746002"],
        description: "Federal teaching hospital located in Idi-Araba, Surulere.",
        available: "24/7",
      },
      {
        name: "Lagos State University Teaching Hospital (LASUTH)",
        numbers: ["01-2793800"],
        description: "State-owned teaching hospital at Ikeja GRA.",
        available: "24/7",
      },
      {
        name: "Lagos Island General Hospital",
        numbers: ["01-2665005"],
        description: "Major public hospital on Lagos Island.",
        available: "24/7",
      },
    ],
  },
  {
    title: "Environmental & Infrastructure",
    color: "#1B7A3E",
    icon: "🏗️",
    contacts: [
      {
        name: "LASEPA Pollution Complaints",
        numbers: ["0704-635-1295"],
        description: "Report air, water or noise pollution incidents in Lagos State.",
        available: "Mon–Fri 8am–5pm",
        website: "https://lasepa.gov.ng",
      },
      {
        name: "LASBCA Distressed Buildings",
        numbers: ["01-4931348"],
        description: "Report distressed, collapsed or dangerous buildings.",
        available: "24/7",
        website: "https://lasbca.lagosstate.gov.ng",
      },
      {
        name: "LAWMA Waste Complaints",
        numbers: ["01-4930022"],
        description: "Report blocked drains, illegal dumpsites and waste management failures.",
        available: "Mon–Sat 7am–6pm",
        website: "https://lawma.gov.ng",
      },
    ],
  },
  {
    title: "Water & Utilities",
    color: "#1A3A8F",
    icon: "💧",
    contacts: [
      {
        name: "Lagos Water Corporation",
        numbers: ["01-2663290", "07080601234"],
        description: "Report water supply issues, pipeline bursts and billing complaints.",
        available: "Mon–Fri 8am–5pm",
      },
      {
        name: "Lagos State Electricity Board",
        numbers: ["8099912184"],
        description: "Report electrical faults and power supply issues in Lagos State.",
        available: "24/7",
      },
    ],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Lagos State Emergency Contacts",
  description: "All emergency contacts for Lagos State Government services",
  url: "https://www.lagosdirectory.gov.ng/emergency",
  mainEntity: categories.flatMap(cat =>
    cat.contacts.map(c => ({
      "@type": "EmergencyService",
      name: c.name,
      telephone: c.numbers[0],
      description: c.description,
      availableLanguage: "English",
      hoursAvailable: c.available,
    }))
  ),
};

export default function EmergencyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Alert banner */}
      <div style={{ background: "#D42B2B" }} className="py-3 px-4 text-center">
        <p className="text-white font-bold text-sm">
          🚨 In an emergency, call <a href="tel:112" className="underline">112</a> or <a href="tel:767" className="underline">767</a> — Lagos State Emergency Lines (24/7)
        </p>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4" style={{ background: "#D42B2B", color: "#fff" }}>
            Emergency
          </div>
          <h1 className="font-display font-black text-4xl md:text-5xl mb-2">Emergency Contacts</h1>
          <p className="text-gray-500 max-w-xl">
            All Lagos State emergency and crisis hotlines in one place. Save these numbers — you may need them or someone around you might.
          </p>
        </div>

        {/* Save prompt */}
        <div className="rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center gap-6"
          style={{ background: "#F5C518", border: "2px solid #0D0D0D", boxShadow: "6px 6px 0 #0D0D0D" }}>
          <div className="text-4xl">📲</div>
          <div>
            <p className="font-display font-bold text-xl">Save These Numbers Now</p>
            <p className="text-sm mt-1">
              Don&apos;t wait for an emergency to find these contacts. Screenshot this page or save the numbers to your phone today.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a href="tel:112" className="px-5 py-2.5 rounded-lg font-bold text-sm" style={{ background: "#D42B2B", color: "#fff", border: "2px solid #0D0D0D" }}>
              Call 112
            </a>
            <a href="tel:767" className="px-5 py-2.5 rounded-lg font-bold text-sm" style={{ background: "#1A3A8F", color: "#fff", border: "2px solid #0D0D0D" }}>
              Call 767
            </a>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-10">
          {categories.map(cat => (
            <section key={cat.title}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{cat.icon}</span>
                <h2 className="font-display font-bold text-xl">{cat.title}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {cat.contacts.map(contact => (
                  <div key={contact.name} className="card-hover bg-white rounded-xl p-5"
                    style={{ border: "2px solid #0D0D0D" }}>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-semibold text-sm leading-snug">{contact.name}</h3>
                      <span className="text-xs px-2 py-0.5 rounded flex-shrink-0 font-medium"
                        style={{ background: contact.available === "24/7" ? "#DCFCE7" : "#FEF9C3", color: "#0D0D0D" }}>
                        {contact.available}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{contact.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {contact.numbers.map(num => (
                        <a key={num} href={`tel:${num}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-sm"
                          style={{ background: cat.color, color: "#fff" }}>
                          📞 {num}
                        </a>
                      ))}
                      {contact.website && (
                        <a href={contact.website} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-xs"
                          style={{ background: "#fff", color: "#0D0D0D", border: "2px solid #0D0D0D" }}>
                          🌐 Website
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 p-5 rounded-xl text-sm text-gray-500"
          style={{ background: "#fff", border: "2px dashed #ccc" }}>
          <strong>Note:</strong> Phone numbers are subject to change. For the most current emergency contacts, visit{" "}
          <a href="https://lagosstate.gov.ng" target="_blank" rel="noopener noreferrer" className="underline text-blue-700">
            lagosstate.gov.ng
          </a>. In life-threatening situations always dial <strong>112</strong> first.
        </div>

      </main>
    </>
  );
}
