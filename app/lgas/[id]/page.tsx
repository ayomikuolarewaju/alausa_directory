import { getLGAById, lgas } from "@/lib/lgaData";
import { getLCDAsByParentLGA } from "@/lib/lcdaData";
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
  return lgas.map(l => ({ id: l.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const lga = getLGAById(id);
  if (!lga) return {};
  const title = `${lga.name} Local Government Area`;
  const description = `${lga.bio.slice(0, 155)}...`;
  const url = `${BASE_URL}/lgas/${id}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    keywords: [`${lga.name} LGA`, `${lga.name} Lagos`, `${lga.headquarters} Lagos`, `Lagos LGA ${lga.name}`, `${lga.name} local government area`, `${lga.name} LGA chairman 2026`, `Alausa directory ${lga.name}`, ...lga.knownFor],
    openGraph: { title: `${title} | Lagos State Directory`, description, url },
  };
}

export default async function LGADetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lga = getLGAById(id);
  if (!lga) notFound();

  const color = zoneColors[lga.zone];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: `${lga.name} Local Government Area`,
    description: lga.bio,
    url: `${BASE_URL}/lgas/${lga.id}`,
    telephone: lga.phone,
    email: lga.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: lga.address,
      addressLocality: lga.headquarters,
      addressRegion: "Lagos",
      postalCode: lga.postalCode,
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: lga.coordinates.lat,
      longitude: lga.coordinates.lng,
    },
    foundingDate: lga.established,
    employee: [
      { "@type": "Person", name: lga.chairman, jobTitle: "Executive Chairman" },
      ...lga.officers.map(o => ({ "@type": "Person", name: o.name, jobTitle: o.title })),
    ],
    parentOrganization: {
      "@type": "GovernmentOrganization",
      name: "Lagos State Government",
      url: "https://lagosstate.gov.ng",
    },
  };

  // Google Maps embed URL
  const mapEmbedUrl = `https://www.google.com/maps?q=${lga.coordinates.lat},${lga.coordinates.lng}&z=14&output=embed`;
  const mapDirectionsUrl = `https://www.google.com/maps/search/${encodeURIComponent(lga.name + " Local Government Lagos Nigeria")}`;

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
          <span className="font-medium" style={{ color }}>{lga.name}</span>
        </nav>

        {/* Hero header */}
        <div className="rounded-2xl overflow-hidden mb-8" style={{ border: "2px solid #0D0D0D", boxShadow: "6px 6px 0 #0D0D0D" }}>
          <div style={{ background: color, padding: "28px 32px" }}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-widest px-2 py-1 rounded mb-3"
                  style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
                  {lga.zone} Zone
                </span>
                <h1 className="font-display font-black text-white text-3xl md:text-4xl leading-tight">
                  {lga.name}
                </h1>
                <p className="text-white opacity-80 mt-1 text-sm">Local Government Area, Lagos State</p>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-shrink-0">
                {[
                  { label: "Wards", value: lga.wards },
                  { label: "Area", value: lga.area },
                  { label: "Population", value: lga.population },
                  { label: "Est.", value: lga.established },
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

          {/* Bio */}
          <div className="bg-white p-6 md:p-8">
            <p className="text-gray-700 leading-relaxed">{lga.bio}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* Map */}
          <div className="rounded-xl overflow-hidden" style={{ border: "2px solid #0D0D0D", boxShadow: "4px 4px 0 #0D0D0D" }}>
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
              height="300"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${lga.name} LGA`}
            />
            <div className="px-4 py-2 bg-white text-xs text-gray-500">
              Coordinates: {lga.coordinates.lat}°N, {lga.coordinates.lng}°E — HQ: {lga.headquarters}
            </div>
          </div>

          {/* Contact & Officers */}
          <div className="space-y-4">
            {/* Contact */}
            <div className="rounded-xl p-5 bg-white" style={{ border: "2px solid #0D0D0D" }}>
              <h2 className="font-display font-bold text-lg mb-4">Contact & Office</h2>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <span>📍</span>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-500 text-xs">{lga.address}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span>📞</span>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <a href={"tel:" + lga.phone} className="text-gray-500 text-xs hover:underline">{lga.phone}</a>
                  </div>
                </div>
                {lga.email && (
                  <div className="flex gap-3">
                    <span>✉️</span>
                    <div>
                      <p className="font-semibold">Email</p>
                      <a href={"mailto:" + lga.email} className="text-gray-500 text-xs hover:underline">{lga.email}</a>
                    </div>
                  </div>
                )}
                {lga.postalCode && (
                  <div className="flex gap-3">
                    <span>📮</span>
                    <div>
                      <p className="font-semibold">Postal Code</p>
                      <p className="text-gray-500 text-xs">{lga.postalCode}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Principal Officers */}
            <div className="rounded-xl p-5 bg-white" style={{ border: "2px solid #0D0D0D" }}>
              <h2 className="font-display font-bold text-lg mb-4">Principal Officers</h2>
              <div className="space-y-2">
                {[
                  { name: lga.chairman, title: "Executive Chairman" },
                  ...(lga.viceChairman ? [{ name: lga.viceChairman, title: "Vice Chairman" }] : []),
                  ...lga.officers,
                ].map((officer, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg"
                    style={{ background: "#FAFAF5", border: "1px solid #e5e7eb" }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                      style={{ background: color }}>
                      {officer.name.split(" ").map(n => n[0]).join("").replace(/[^A-Z]/g, "").slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-xs">{officer.name}</p>
                      <p className="text-xs text-gray-400">{officer.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="rounded-xl p-6 md:p-8 mb-6 bg-white" style={{ border: "2px solid #0D0D0D" }}>
          <h2 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
            <span style={{ color }}>📜</span> History
          </h2>
          <p className="text-gray-700 leading-relaxed">{lga.history}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Landmarks */}
          <div className="rounded-xl p-5 bg-white" style={{ border: "2px solid #0D0D0D" }}>
            <h2 className="font-display font-bold text-lg mb-4">🏛️ Notable Landmarks</h2>
            <ul className="space-y-2">
              {lga.landmarks.map((landmark, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                  {landmark}
                </li>
              ))}
            </ul>
          </div>

          {/* Known for */}
          <div className="rounded-xl p-5 bg-white" style={{ border: "2px solid #0D0D0D" }}>
            <h2 className="font-display font-bold text-lg mb-4">⭐ Known For</h2>
            <div className="flex flex-wrap gap-2">
              {lga.knownFor.map((item, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                  style={{ background: color }}>
                  {item}
                </span>
              ))}
            </div>

            {lga.localCouncilDevelopmentAreas.length > 0 && (
              <>
                <h2 className="font-display font-bold text-lg mt-5 mb-3">🏘️ LCDAs</h2>
                <div className="space-y-1">
                  {lga.localCouncilDevelopmentAreas.map((lcda, i) => {
                    const lcdaId = lcda.toLowerCase().replace(/\s*lcda\s*/gi, "").trim().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "") + "-lcda";
                    return (
                      <Link key={i} href={`/lgas/lcda/${lcdaId}`}
                        className="flex items-center justify-between gap-2 text-sm px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
                        style={{ background: "#FAFAF5", border: "1px solid #e5e7eb" }}>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                          {lcda}
                        </div>
                        <span className="text-xs font-semibold" style={{ color }}>View →</span>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* LCDAs with wards */}
        {(() => {
          const lgaLcdas = getLCDAsByParentLGA(lga.id);
          if (lgaLcdas.length === 0) return null;
          return (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1.5 h-8 rounded-full" style={{ background: color }} />
                <h2 className="font-display font-bold text-2xl">LCDAs &amp; Wards</h2>
                <span className="text-sm text-gray-400">
                  {lgaLcdas.length} LCDAs &nbsp;·&nbsp; {lgaLcdas.reduce((s, l) => s + l.wards.length, 0)} wards
                </span>
              </div>
              <div className="space-y-4">
                {lgaLcdas.map(lcda => (
                  <div key={lcda.id} className="rounded-xl overflow-hidden" style={{ border: "2px solid #0D0D0D" }}>
                    <Link href={`/lgas/lcda/${lcda.id}`}>
                      <div className="flex items-center justify-between px-5 py-3 hover:opacity-90 transition-opacity" style={{ background: color }}>
                        <div>
                          <p className="font-display font-bold text-white text-base">{lcda.name}</p>
                          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>
                            HQ: {lcda.headquarters} &nbsp;·&nbsp; {lcda.wards.length} wards &nbsp;·&nbsp; Est. {lcda.established}
                          </p>
                        </div>
                        <span className="text-xs font-bold px-3 py-1 rounded" style={{ background: "#F5C518", color: "#0D0D0D" }}>
                          View LCDA →
                        </span>
                      </div>
                    </Link>
                    <div className="px-5 py-2 flex items-center gap-3 text-sm border-b border-gray-100" style={{ background: "#FAFAF5" }}>
                      <span>👤</span>
                      <span className="font-semibold">{lcda.chairman}</span>
                      <span className="text-gray-400 text-xs">&nbsp;· LCDA Chairman</span>
                      <a href={"tel:" + lcda.phone} className="ml-auto text-xs font-medium hover:underline" style={{ color }}>{lcda.phone}</a>
                    </div>
                    <div className="bg-white p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Wards ({lcda.wards.length})</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {lcda.wards.map((ward, i) => (
                          <Link key={ward.id} href={`/lgas/ward/${ward.id}`}>
                            <div className="flex items-start gap-2.5 p-2.5 rounded-lg hover:opacity-80 transition-opacity cursor-pointer" style={{ background: "#FAFAF5", border: "1px solid #e5e7eb" }}>
                              <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5" style={{ background: color }}>
                                {i + 1}
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-xs leading-snug">{ward.name}</p>
                                {ward.description && <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{ward.description}</p>}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Back + navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6"
          style={{ borderTop: "2px solid #e5e7eb" }}>
          <Link href="/lgas"
            className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg"
            style={{ background: "#fff", border: "2px solid #0D0D0D", color: "#0D0D0D" }}>
            ← Back to All LGAs
          </Link>
          <p className="text-xs text-gray-400">
            Data may be subject to updates. Verify directly with the LGA secretariat.
          </p>
        </div>

      </main>
    </>
  );
}
