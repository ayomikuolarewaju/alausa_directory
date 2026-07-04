import { getLCDAById, lcdas } from "@/lib/lcdaData";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const BASE_URL = "https://www.alausadirectory.com"; // Also registered: alausadirectory.com.ng — both point to same site

const zoneColors = {
  Island:   "#1A3A8F",
  Mainland: "#D42B2B",
  Suburban: "#1B7A3E",
};

export async function generateStaticParams() {
  return lcdas.map(l => ({ id: l.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const lcda = getLCDAById(id);
  if (!lcda) return {};
  const title = `${lcda.name} — ${lcda.parentLgaName} LGA`;
  const description = `${lcda.bio.slice(0, 160)}...`;
  const url = `${BASE_URL}/lgas/lcda/${id}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    keywords: [
      `${lcda.name}`,
      `${lcda.name} Lagos`,
      `${lcda.name} chairman`,
      `${lcda.parentLgaName} LCDA`,
      `${lcda.headquarters} Lagos`,
      `Lagos LCDA directory`,
      `Alausa directory LCDA`,
      ...lcda.knownFor,
    ],
    openGraph: { title: `${title} | Lagos Directory`, description, url },
  };
}

export default async function LCDADetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lcda = getLCDAById(id);
  if (!lcda) notFound();

  const color = zoneColors[lcda.zone];
  const mapEmbedUrl = `https://www.google.com/maps?q=${lcda.coordinates.lat},${lcda.coordinates.lng}&z=14&output=embed`;
  const mapDirectionsUrl = `https://www.google.com/maps/search/${encodeURIComponent(lcda.name + " Lagos Nigeria")}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: lcda.name,
    description: lcda.bio,
    url: `${BASE_URL}/lgas/lcda/${lcda.id}`,
    telephone: lcda.phone,
    email: lcda.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: lcda.address,
      addressLocality: lcda.headquarters,
      addressRegion: "Lagos",
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: lcda.coordinates.lat,
      longitude: lcda.coordinates.lng,
    },
    foundingDate: lcda.established,
    parentOrganization: {
      "@type": "GovernmentOrganization",
      name: `${lcda.parentLgaName} Local Government Area`,
      url: `${BASE_URL}/lgas/${lcda.parentLgaId}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="max-w-5xl mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8 text-gray-500 flex-wrap">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/lgas" className="hover:underline">LGAs</Link>
          <span>/</span>
          <Link href={`/lgas/${lcda.parentLgaId}`} className="hover:underline">{lcda.parentLgaName}</Link>
          <span>/</span>
          <span className="font-medium" style={{ color }}>{lcda.name}</span>
        </nav>

        {/* Hero */}
        <div className="rounded-2xl overflow-hidden mb-8"
          style={{ border: "2px solid #0D0D0D", boxShadow: "6px 6px 0 #0D0D0D" }}>
          <div style={{ background: color, padding: "28px 32px" }}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-widest px-2 py-1 rounded mb-3"
                  style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
                  {lcda.zone} Zone · LCDA
                </span>
                <h1 className="font-display font-black text-white text-3xl md:text-4xl leading-tight">{lcda.name}</h1>
                <p className="text-white opacity-80 mt-1 text-sm">
                  Local Council Development Area — {lcda.parentLgaName} LGA
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-shrink-0">
                {[
                  { label: "Wards",     value: lcda.wards.length },
                  { label: "Est.",      value: lcda.established },
                  ...(lcda.population ? [{ label: "Population", value: lcda.population }] : []),
                  ...(lcda.area        ? [{ label: "Area",       value: lcda.area }]       : []),
                ].map(stat => (
                  <div key={stat.label} className="text-center px-3 py-2 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.15)" }}>
                    <p className="text-white font-bold text-sm">{stat.value}</p>
                    <p className="text-xs opacity-70 text-white">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white p-6 md:p-8">
            <p className="text-gray-700 leading-relaxed">{lcda.bio}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* Map */}
          <div className="rounded-xl overflow-hidden"
            style={{ border: "2px solid #0D0D0D", boxShadow: "4px 4px 0 #0D0D0D" }}>
            <div className="px-4 py-3 flex items-center justify-between" style={{ background: color }}>
              <h2 className="font-bold text-white text-sm uppercase tracking-wider">📍 Location Map</h2>
              <a href={mapDirectionsUrl} target="_blank" rel="noopener noreferrer"
                className="text-xs font-semibold px-3 py-1 rounded"
                style={{ background: "#F5C518", color: "#0D0D0D" }}>
                Open in Maps →
              </a>
            </div>
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="260"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${lcda.name}`}
            />
            <div className="px-4 py-2 bg-white text-xs text-gray-500">
              HQ: {lcda.headquarters} · {lcda.coordinates.lat}°N, {lcda.coordinates.lng}°E
            </div>
          </div>

          {/* Contact & officers */}
          <div className="space-y-4">
            <div className="rounded-xl p-5 bg-white" style={{ border: "2px solid #0D0D0D" }}>
              <h2 className="font-display font-bold text-lg mb-4">Contact & Office</h2>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <span>📍</span>
                  <div><p className="font-semibold">Address</p><p className="text-gray-500 text-xs">{lcda.address}</p></div>
                </div>
                <div className="flex gap-3">
                  <span>📞</span>
                  <div><p className="font-semibold">Phone</p>
                    <a href={"tel:" + lcda.phone} className="text-gray-500 text-xs hover:underline">{lcda.phone}</a>
                  </div>
                </div>
                {lcda.email && (
                  <div className="flex gap-3">
                    <span>✉️</span>
                    <div><p className="font-semibold">Email</p>
                      <a href={"mailto:" + lcda.email} className="text-gray-500 text-xs hover:underline">{lcda.email}</a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Officers */}
            <div className="rounded-xl p-5 bg-white" style={{ border: "2px solid #0D0D0D" }}>
              <h2 className="font-display font-bold text-lg mb-4">Principal Officers</h2>
              <div className="space-y-2">
                {[
                  { name: lcda.chairman,            title: "LCDA Chairman" },
                  ...(lcda.viceChairman ? [{ name: lcda.viceChairman, title: "Vice Chairman" }] : []),
                ].map((officer, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg"
                    style={{ background: "#FAFAF5", border: "1px solid #e5e7eb" }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                      style={{ background: color }}>
                      {officer.name.split(" ").map((n: string) => n[0]).join("").replace(/[^A-Z]/g, "").slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-xs">{officer.name}</p>
                      <p className="text-xs text-gray-400">{officer.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Known for */}
            <div className="rounded-xl p-5 bg-white" style={{ border: "2px solid #0D0D0D" }}>
              <h2 className="font-display font-bold text-lg mb-3">⭐ Known For</h2>
              <div className="flex flex-wrap gap-2">
                {lcda.knownFor.map((item, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                    style={{ background: color }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Wards */}
        <div className="rounded-xl overflow-hidden mb-8"
          style={{ border: "2px solid #0D0D0D", boxShadow: "4px 4px 0 #0D0D0D" }}>
          <div className="px-6 py-4 flex items-center justify-between" style={{ background: color }}>
            <h2 className="font-display font-bold text-white text-lg">
              🏘️ Wards in {lcda.name} ({lcda.wards.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {lcda.wards.map((ward, i) => (
              <Link key={ward.id} href={`/lgas/ward/${ward.id}`}>
                <div className="flex items-start gap-4 px-6 py-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: color }}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{ward.name}</p>
                    {ward.description && (
                      <p className="text-xs text-gray-500 mt-0.5">{ward.description}</p>
                    )}
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded flex-shrink-0"
                    style={{ background: `${color}18`, color }}>
                    View →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6"
          style={{ borderTop: "2px solid #e5e7eb" }}>
          <Link href={`/lgas/${lcda.parentLgaId}`}
            className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg"
            style={{ background: "#fff", border: "2px solid #0D0D0D", color: "#0D0D0D" }}>
            ← Back to {lcda.parentLgaName} LGA
          </Link>
          <Link href="/lgas"
            className="text-sm font-semibold px-4 py-2 rounded-lg"
            style={{ background: color, color: "#fff", border: "2px solid #0D0D0D" }}>
            All LGAs →
          </Link>
        </div>

      </main>
    </>
  );
}
