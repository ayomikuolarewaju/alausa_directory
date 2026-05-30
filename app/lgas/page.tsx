import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LGA Directory — All 20 Local Government Areas",
  description:
    "Complete directory of all 20 Local Government Areas in Lagos State — chairmen, addresses, phone numbers and ward information.",
  alternates: { canonical: "https://www.lagosdirectory.gov.ng/lgas" },
  keywords: [
    "Lagos LGA", "Lagos local government", "Lagos 20 LGAs", "Ikeja LGA", "Eti-Osa LGA",
    "Lagos Island LGA", "Surulere LGA", "Kosofe LGA", "Alimosho LGA",
  ],
  openGraph: {
    title: "Lagos State LGA Directory | All 20 Local Government Areas",
    description:
      "Find all 20 Lagos State Local Government Areas with chairman names, office addresses and contact details.",
    url: "https://www.lagosdirectory.gov.ng/lgas",
  },
};

type LGA = {
  id: string;
  name: string;
  chairman: string;
  address: string;
  phone: string;
  zone: "Island" | "Mainland" | "Suburban";
  wards: number;
  population: string;
  headquarters: string;
};

const lgas: LGA[] = [
  { id: "agege", name: "Agege", chairman: "Hon. Ganiyu Egunjobi", address: "Agege Local Government Secretariat, Agege, Lagos", phone: "+234-1-4930100", zone: "Mainland", wards: 11, population: "459,939", headquarters: "Agege" },
  { id: "ajeromi-ifelodun", name: "Ajeromi-Ifelodun", chairman: "Hon. Fatai Ayoola", address: "LG Secretariat, Ajegunle, Lagos", phone: "+234-1-4930200", zone: "Mainland", wards: 10, population: "688,400", headquarters: "Ajegunle" },
  { id: "alimosho", name: "Alimosho", chairman: "Hon. Jelili Sulaimon", address: "LG Secretariat, Alimosho, Lagos", phone: "+234-1-4930300", zone: "Suburban", wards: 12, population: "1,288,714", headquarters: "Alimosho" },
  { id: "amuwo-odofin", name: "Amuwo-Odofin", chairman: "Hon. Engr. Sola Abiodun", address: "LG Secretariat, Mile 2, Lagos", phone: "+234-1-4930400", zone: "Mainland", wards: 10, population: "317,720", headquarters: "Mile 2" },
  { id: "apapa", name: "Apapa", chairman: "Hon. Idowu Ganiyu", address: "LG Secretariat, Apapa, Lagos", phone: "+234-1-4930500", zone: "Mainland", wards: 8, population: "217,362", headquarters: "Apapa" },
  { id: "badagry", name: "Badagry", chairman: "Hon. Folorunsho Ambrose", address: "LG Secretariat, Badagry, Lagos", phone: "+234-1-4930600", zone: "Suburban", wards: 11, population: "241,093", headquarters: "Badagry" },
  { id: "epe", name: "Epe", chairman: "Hon. Suraj Olaposi Edu", address: "LG Secretariat, Epe, Lagos", phone: "+234-1-4930700", zone: "Suburban", wards: 10, population: "200,273", headquarters: "Epe" },
  { id: "eti-osa", name: "Eti-Osa", chairman: "Hon. Segun Oni", address: "LG Secretariat, Lekki, Lagos", phone: "+234-1-4930800", zone: "Island", wards: 10, population: "324,418", headquarters: "Lekki" },
  { id: "ibeju-lekki", name: "Ibeju-Lekki", chairman: "Hon. Muyiwa Ibile", address: "LG Secretariat, Akodo, Lagos", phone: "+234-1-4930900", zone: "Suburban", wards: 10, population: "117,103", headquarters: "Akodo" },
  { id: "ifako-ijaiye", name: "Ifako-Ijaiye", chairman: "Hon. Usman Hamzat", address: "LG Secretariat, Ogba, Lagos", phone: "+234-1-4931000", zone: "Mainland", wards: 11, population: "423,988", headquarters: "Ogba" },
  { id: "ikeja", name: "Ikeja", chairman: "Hon. Mojeed Balogun", address: "LG Secretariat, Ikeja, Lagos", phone: "+234-1-4931100", zone: "Mainland", wards: 11, population: "313,196", headquarters: "Ikeja" },
  { id: "ikorodu", name: "Ikorodu", chairman: "Hon. Wasiu Adesanya", address: "LG Secretariat, Ikorodu, Lagos", phone: "+234-1-4931200", zone: "Suburban", wards: 12, population: "535,619", headquarters: "Ikorodu" },
  { id: "kosofe", name: "Kosofe", chairman: "Hon. Moyosore Ogunlewe", address: "LG Secretariat, Kosofe, Lagos", phone: "+234-1-4931300", zone: "Mainland", wards: 11, population: "665,393", headquarters: "Kosofe" },
  { id: "lagos-island", name: "Lagos Island", chairman: "Hon. Idris Aregbe", address: "LG Secretariat, Lagos Island, Lagos", phone: "+234-1-4931400", zone: "Island", wards: 11, population: "209,437", headquarters: "Lagos Island" },
  { id: "lagos-mainland", name: "Lagos Mainland", chairman: "Hon. Adewale Adegoke", address: "LG Secretariat, Ebute Metta, Lagos", phone: "+234-1-4931500", zone: "Mainland", wards: 11, population: "317,720", headquarters: "Ebute Metta" },
  { id: "mushin", name: "Mushin", chairman: "Hon. Bamidele Onaolapo", address: "LG Secretariat, Mushin, Lagos", phone: "+234-1-4931600", zone: "Mainland", wards: 11, population: "633,009", headquarters: "Mushin" },
  { id: "ojo", name: "Ojo", chairman: "Hon. Abdulkadir Maji", address: "LG Secretariat, Ojo, Lagos", phone: "+234-1-4931700", zone: "Mainland", wards: 11, population: "598,071", headquarters: "Ojo" },
  { id: "oshodi-isolo", name: "Oshodi-Isolo", chairman: "Hon. Bolaji Muse-Ariyibi", address: "LG Secretariat, Isolo, Lagos", phone: "+234-1-4931800", zone: "Mainland", wards: 12, population: "676,366", headquarters: "Isolo" },
  { id: "shomolu", name: "Shomolu", chairman: "Hon. Kehinde Oloyede", address: "LG Secretariat, Shomolu, Lagos", phone: "+234-1-4931900", zone: "Mainland", wards: 11, population: "402,673", headquarters: "Shomolu" },
  { id: "surulere", name: "Surulere", chairman: "Hon. Tajudeen Ajide", address: "LG Secretariat, Surulere, Lagos", phone: "+234-1-4932000", zone: "Mainland", wards: 11, population: "503,975", headquarters: "Surulere" },
];

const zoneColors: Record<LGA["zone"], { bg: string; text: string }> = {
  Island: { bg: "#1A3A8F", text: "#fff" },
  Mainland: { bg: "#D42B2B", text: "#fff" },
  Suburban: { bg: "#1B7A3E", text: "#fff" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Lagos State Local Government Areas",
  description: "All 20 Local Government Areas of Lagos State, Nigeria",
  numberOfItems: lgas.length,
  itemListElement: lgas.map((lga, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "GovernmentOrganization",
      name: `${lga.name} Local Government Area`,
      address: {
        "@type": "PostalAddress",
        streetAddress: lga.address,
        addressLocality: lga.headquarters,
        addressRegion: "Lagos",
        addressCountry: "NG",
      },
      telephone: lga.phone,
    },
  })),
};

export default function LGAsPage() {
  const zones = ["Island", "Mainland", "Suburban"] as const;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="max-w-7xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4" style={{ background: "#F5C518", color: "#0D0D0D" }}>
            Local Government Areas
          </div>
          <h1 className="font-display font-black text-4xl md:text-5xl mb-2">Lagos LGA Directory</h1>
          <p className="text-gray-500 max-w-xl">
            All 20 Local Government Areas of Lagos State with chairmen, office addresses and contact details.
          </p>
        </div>

        {/* Zone legend */}
        <div className="flex flex-wrap gap-3 mb-10">
          {zones.map(zone => (
            <div key={zone} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium" style={{ background: "#fff", border: "2px solid #0D0D0D" }}>
              <div className="w-3 h-3 rounded-full" style={{ background: zoneColors[zone].bg }} />
              {zone} Zone — {lgas.filter(l => l.zone === zone).length} LGAs
            </div>
          ))}
        </div>

        {/* LGA grid by zone */}
        {zones.map(zone => (
          <div key={zone} className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-8 rounded-full" style={{ background: zoneColors[zone].bg }} />
              <h2 className="font-display font-bold text-2xl">{zone} Zone</h2>
              <span className="text-sm text-gray-400 font-medium">{lgas.filter(l => l.zone === zone).length} local governments</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {lgas.filter(l => l.zone === zone).map(lga => (
                <div key={lga.id} className="card-hover bg-white rounded-xl overflow-hidden"
                  style={{ border: "2px solid #0D0D0D", boxShadow: "4px 4px 0 #0D0D0D" }}>
                  <div style={{ background: zoneColors[lga.zone].bg, padding: "14px 16px" }}>
                    <h3 className="font-display font-bold text-white text-lg">{lga.name}</h3>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>HQ: {lga.headquarters}</p>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <span>👤</span>
                      <div>
                        <p className="font-semibold">{lga.chairman}</p>
                        <p className="text-xs text-gray-400">Executive Chairman</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <span>📍</span>
                      <p className="text-gray-500 text-xs">{lga.address}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span>📞</span>
                      <a href={"tel:" + lga.phone} className="text-gray-500 text-xs hover:underline">{lga.phone}</a>
                    </div>
                    <div className="flex gap-3 pt-1 border-t" style={{ borderColor: "#f3f4f6" }}>
                      <div className="text-center flex-1">
                        <p className="font-bold text-sm" style={{ color: zoneColors[lga.zone].bg }}>{lga.wards}</p>
                        <p className="text-xs text-gray-400">Wards</p>
                      </div>
                      <div className="w-px" style={{ background: "#f3f4f6" }} />
                      <div className="text-center flex-1">
                        <p className="font-bold text-sm" style={{ color: zoneColors[lga.zone].bg }}>{lga.population}</p>
                        <p className="text-xs text-gray-400">Population</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      </main>
    </>
  );
}
