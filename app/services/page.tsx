import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Public Services Guide",
  description:
    "Step-by-step guides on how to access Lagos State Government services — pay land use charge, register a business, renew a driver's licence, apply for C of O and more.",
  alternates: { canonical: "https://www.alausadirectory.com/services" },
  keywords: [
    "how to pay land use charge Lagos", "register business Lagos", "Lagos C of O application",
    "driver licence Lagos", "Lagos tax clearance", "LIRS payment", "Lagos passport",
    "Lagos building permit", "how to apply Lagos government services",
  ],
  openGraph: {
    title: "Lagos State Public Services Guide",
    description:
      "How to pay land use charge, register a business, get a C of O and more — step-by-step Lagos State Government service guides.",
    url: "https://www.alausadirectory.com/services",
  },
};

type Step = { step: string; detail: string };
type Service = {
  id: string;
  title: string;
  category: string;
  description: string;
  agency: string;
  agencyUrl: string;
  duration: string;
  cost: string;
  color: string;
  steps: Step[];
  requirements: string[];
};

const services: Service[] = [
  {
    id: "land-use-charge",
    title: "How to Pay Your Land Use Charge",
    category: "Property",
    description: "Land Use Charge is an annual levy on all real property in Lagos State. Learn how to calculate and pay yours.",
    agency: "Lagos State Ministry of Finance / LAGOS-PAYE",
    agencyUrl: "https://finance.lagosstate.gov.ng",
    duration: "1–3 business days",
    cost: "Based on property value",
    color: "#1A3A8F",
    steps: [
      { step: "Visit the portal", detail: "Go to lagospays.lagosstate.gov.ng or visit any LUC office." },
      { step: "Enter your property details", detail: "Input your Property Identification Number (PIN) or search by address." },
      { step: "Review your assessment", detail: "Confirm the assessed value and charge computed for your property." },
      { step: "Make payment", detail: "Pay online via card/bank transfer or at any Remita-enabled bank." },
      { step: "Collect your receipt", detail: "Download or collect your official payment receipt as proof." },
    ],
    requirements: ["Property Identification Number (PIN)", "Valid ID", "Previous payment receipt (if renewing)"],
  },
  {
    id: "business-registration",
    title: "How to Register a Business in Lagos",
    category: "Business",
    description: "Register your business name or company with the Corporate Affairs Commission (CAC) and obtain a Lagos State business permit.",
    agency: "Ministry of Commerce, Industry & Cooperatives",
    agencyUrl: "https://mcic.lagosstate.gov.ng",
    duration: "3–7 business days",
    cost: "₦10,000 – ₦50,000 (varies by type)",
    color: "#1B7A3E",
    steps: [
      { step: "Name search & reservation", detail: "Visit CAC portal (cac.gov.ng) to search and reserve your business name." },
      { step: "Complete registration form", detail: "Fill in the CAC pre-registration form with director/proprietor details." },
      { step: "Submit documents", detail: "Upload ID, address proof, memorandum of association (for companies)." },
      { step: "Pay registration fees", detail: "Pay via Remita online or at a designated bank." },
      { step: "Obtain Lagos State Business Permit", detail: "Apply for a Lagos State permit at the Ministry of Commerce or any LGA office." },
    ],
    requirements: ["Valid government ID", "Passport photograph", "Utility bill (proof of address)", "Memorandum of Association (for companies)"],
  },
  {
    id: "cof-o",
    title: "How to Apply for a Certificate of Occupancy (C of O)",
    category: "Property",
    description: "A Certificate of Occupancy is the primary title document for land in Lagos. Here is how to apply.",
    agency: "Ministry of Physical Planning & Urban Development / LAGIS",
    agencyUrl: "https://lagis.gov.ng",
    duration: "3–6 months",
    cost: "Varies by land size and zone",
    color: "#1A3A8F",
    steps: [
      { step: "Obtain application form", detail: "Collect form from the Lands Bureau at Alausa Secretariat, Ikeja." },
      { step: "Submit survey plan", detail: "Attach a survey plan prepared by a registered surveyor." },
      { step: "Pay processing fee", detail: "Pay the applicable fees at the designated bank and attach teller." },
      { step: "Inspection", detail: "Government officials will visit and inspect the property." },
      { step: "Gazette and collection", detail: "After approval, your C of O is gazetted and ready for collection." },
    ],
    requirements: ["Survey plan", "Deed of assignment or purchase receipt", "Tax clearance certificate", "Passport photographs", "Valid ID"],
  },
  {
    id: "tax-clearance",
    title: "How to Obtain a Tax Clearance Certificate",
    category: "Finance",
    description: "A Tax Clearance Certificate (TCC) confirms you have no outstanding tax liabilities with Lagos State.",
    agency: "Lagos Internal Revenue Service (LIRS)",
    agencyUrl: "https://lirs.gov.ng",
    duration: "3–5 business days",
    cost: "Free",
    color: "#D42B2B",
    steps: [
      { step: "Log in to LIRS portal", detail: "Visit lirs.gov.ng and log into your taxpayer dashboard." },
      { step: "Confirm tax filings are up to date", detail: "Ensure all personal income tax returns for the past 3 years are filed." },
      { step: "Apply for TCC online", detail: "Submit the TCC application form on the portal." },
      { step: "Await verification", detail: "LIRS will verify your tax records (3–5 days)." },
      { step: "Download certificate", detail: "Once approved, download your TCC from the portal." },
    ],
    requirements: ["Active LIRS taxpayer ID", "Evidence of tax payment for the past 3 years", "Valid ID"],
  },
  {
    id: "building-permit",
    title: "How to Get a Building Permit in Lagos",
    category: "Construction",
    description: "All new construction and major renovations in Lagos require a Development Permit from LASBCA.",
    agency: "Lagos State Building Control Agency (LASBCA)",
    agencyUrl: "https://lasbca.lagosstate.gov.ng",
    duration: "4–8 weeks",
    cost: "Based on project size",
    color: "#1B7A3E",
    steps: [
      { step: "Prepare architectural drawings", detail: "Engage a registered architect to prepare drawings to Lagos building code standards." },
      { step: "Submit to LASBCA", detail: "Submit application with drawings and site plan at any LASBCA office or online." },
      { step: "Pay assessment fees", detail: "Pay the computed fees based on the floor area of the proposed building." },
      { step: "Site inspection", detail: "LASBCA officials inspect the site and review the drawings." },
      { step: "Receive your permit", detail: "Upon approval, collect your Development Permit and display it on site." },
    ],
    requirements: ["Architectural drawings", "Structural drawings", "Survey plan", "C of O or proof of ownership", "Tax clearance certificate"],
  },
  {
    id: "environmental-permit",
    title: "How to Obtain an Environmental Impact Assessment",
    category: "Environment",
    description: "Projects above a certain scale in Lagos State require an Environmental Impact Assessment (EIA) from LASEPA.",
    agency: "Lagos State Environmental Protection Agency (LASEPA)",
    agencyUrl: "https://lasepa.gov.ng",
    duration: "6–12 weeks",
    cost: "₦200,000 – ₦2,000,000 (varies)",
    color: "#1B7A3E",
    steps: [
      { step: "Submit project description", detail: "Submit a brief project description to LASEPA for screening." },
      { step: "Scoping meeting", detail: "Attend a scoping meeting with LASEPA to define study boundaries." },
      { step: "Prepare EIA report", detail: "Engage an accredited consultant to prepare the full EIA report." },
      { step: "Public hearing", detail: "A public hearing is held where community members can give input." },
      { step: "Receive EIA certificate", detail: "After approval, LASEPA issues an EIA certificate for the project." },
    ],
    requirements: ["Project description document", "Site plan", "Accredited EIA consultant", "Community engagement report"],
  },
];

const categoryColors: Record<string, string> = {
  Property: "#1A3A8F",
  Business: "#1B7A3E",
  Finance: "#D42B2B",
  Construction: "#1B7A3E",
  Environment: "#1B7A3E",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Lagos State Government Public Services Guide",
  description: "Step-by-step guides for accessing Lagos State Government services",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "HowTo",
      name: s.title,
      description: s.description,
      totalTime: s.duration,
      step: s.steps.map((st, j) => ({
        "@type": "HowToStep",
        position: j + 1,
        name: st.step,
        text: st.detail,
      })),
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="max-w-7xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4" style={{ background: "#F5C518", color: "#0D0D0D" }}>
            Citizen Services
          </div>
          <h1 className="font-display font-black text-4xl md:text-5xl mb-2">Public Services Guide</h1>
          <p className="text-gray-500 max-w-2xl">
            Step-by-step guides on how to access the most common Lagos State Government services — from paying your land use charge to registering a business.
          </p>
        </div>

        {/* Quick jump */}
        <div className="flex flex-wrap gap-2 mb-12">
          {services.map(s => (
            <a key={s.id} href={`#${s.id}`}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
              style={{ background: "#fff", border: "2px solid #0D0D0D", color: "#0D0D0D" }}>
              {s.title.replace("How to ", "").replace("How to Get a ", "").replace("How to Obtain a", "").trim()}
            </a>
          ))}
        </div>

        {/* Service cards */}
        <div className="space-y-10">
          {services.map(service => (
            <div key={service.id} id={service.id} className="rounded-2xl overflow-hidden scroll-mt-20"
              style={{ border: "2px solid #0D0D0D", boxShadow: "6px 6px 0 #0D0D0D" }}>

              {/* Header */}
              <div style={{ background: service.color, padding: "24px 32px" }}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="inline-block text-xs font-bold uppercase tracking-widest px-2 py-1 rounded mb-3"
                      style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
                      {service.category}
                    </span>
                    <h2 className="font-display font-black text-white text-2xl">{service.title}</h2>
                    <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.8)" }}>{service.description}</p>
                  </div>
                  <div className="flex gap-4 flex-shrink-0">
                    <div className="text-center px-4 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.15)" }}>
                      <p className="text-white font-bold text-sm">{service.duration}</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>Duration</p>
                    </div>
                    <div className="text-center px-4 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.15)" }}>
                      <p className="text-white font-bold text-sm">{service.cost}</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>Cost</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 grid md:grid-cols-3 gap-8">
                {/* Steps */}
                <div className="md:col-span-2">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">Steps</h3>
                  <ol className="space-y-4">
                    {service.steps.map((s, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                          style={{ background: service.color }}>
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{s.step}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{s.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Requirements + Agency */}
                <div className="space-y-5">
                  <div className="rounded-xl p-4" style={{ background: "#FAFAF5", border: "1px solid #e5e7eb" }}>
                    <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {service.requirements.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                          <span className="text-green-600 mt-0.5">✓</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl p-4" style={{ background: "#FAFAF5", border: "1px solid #e5e7eb" }}>
                    <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-2">Contact Agency</h3>
                    <p className="text-xs text-gray-600 mb-2">{service.agency}</p>
                    <a href={service.agencyUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-block text-xs font-semibold px-3 py-1.5 rounded"
                      style={{ background: service.color, color: "#fff" }}>
                      Visit Website →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>
    </>
  );
}
