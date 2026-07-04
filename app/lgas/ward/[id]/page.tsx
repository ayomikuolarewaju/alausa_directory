import { getWardById, lcdas } from "@/lib/lcdaData";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const BASE_URL = "https://www.alausadirectory.com"; // Also registered: alausadirectory.com.ng — both point to same site

const zoneColors = {
  Island:   "#1A3A8F",
  Mainland: "#D42B2B",
  Suburban: "#1B7A3E",
};

// Generate all ward IDs for static params
export async function generateStaticParams() {
  return lcdas.flatMap(lcda =>
    lcda.wards.map(ward => ({ id: ward.id }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const result = getWardById(id);
  if (!result) return {};
  const { ward, lcda } = result;
  const title = `${ward.name} — ${lcda.name}, ${lcda.parentLgaName}`;
  const description = `${ward.name} is a ward in ${lcda.name}, ${lcda.parentLgaName} LGA, Lagos State. ${ward.description ?? ""}`;
  const url = `${BASE_URL}/lgas/ward/${id}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    keywords: [
      ward.name,
      `${ward.name} Lagos`,
      `${lcda.name} ward`,
      `${lcda.parentLgaName} LGA ward`,
      `Lagos ward directory`,
      `Alausa directory ward`,
    ],
    openGraph: { title: `${title} | Lagos Directory`, description, url },
  };
}

export default async function WardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = getWardById(id);
  if (!result) notFound();

  const { ward, lcda } = result;
  const color = zoneColors[lcda.zone];

  // Find ward index and siblings
  const wardIndex   = lcda.wards.findIndex(w => w.id === id);
  const prevWard    = wardIndex > 0 ? lcda.wards[wardIndex - 1] : null;
  const nextWard    = wardIndex < lcda.wards.length - 1 ? lcda.wards[wardIndex + 1] : null;

  const mapEmbedUrl     = `https://www.google.com/maps?q=${lcda.coordinates.lat},${lcda.coordinates.lng}&z=15&output=embed`;
  const mapDirectionsUrl = `https://www.google.com/maps/search/${encodeURIComponent(ward.name + " " + lcda.parentLgaName + " Lagos")}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: ward.name,
    description: ward.description,
    url: `${BASE_URL}/lgas/ward/${ward.id}`,
    containedInPlace: {
      "@type": "GovernmentOrganization",
      name: lcda.name,
      url: `${BASE_URL}/lgas/lcda/${lcda.id}`,
      containedInPlace: {
        "@type": "GovernmentOrganization",
        name: `${lcda.parentLgaName} Local Government Area`,
        url: `${BASE_URL}/lgas/${lcda.parentLgaId}`,
      },
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: lcda.coordinates.lat,
      longitude: lcda.coordinates.lng,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: lcda.headquarters,
      addressRegion: "Lagos",
      addressCountry: "NG",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="max-w-4xl mx-auto px-4 py-12">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8 text-gray-500 flex-wrap">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/lgas" className="hover:underline">LGAs</Link>
          <span>/</span>
          <Link href={`/lgas/${lcda.parentLgaId}`} className="hover:underline">{lcda.parentLgaName}</Link>
          <span>/</span>
          <Link href={`/lgas/lcda/${lcda.id}`} className="hover:underline">{lcda.name}</Link>
          <span>/</span>
          <span className="font-medium" style={{ color }}>{ward.name}</span>
        </nav>

        {/* Hero */}
        <div className="rounded-2xl overflow-hidden mb-8"
          style={{ border: "2px solid #0D0D0D", boxShadow: "6px 6px 0 #0D0D0D" }}>
          <div style={{ background: color, padding: "28px 32px" }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-2 py-1 rounded mb-3"
              style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
              Ward {wardIndex + 1} of {lcda.wards.length} · {lcda.zone} Zone
            </span>
            <h1 className="font-display font-black text-white text-3xl md:text-4xl leading-tight">{ward.name}</h1>
            <p className="text-white opacity-80 mt-2 text-sm">
              {lcda.name} · {lcda.parentLgaName} LGA · Lagos State
            </p>
          </div>
          <div className="bg-white p-6 md:p-8">
            <p className="text-gray-700 leading-relaxed text-lg">
              {ward.description ?? `${ward.name} is one of ${lcda.wards.length} wards in ${lcda.name}, located in ${lcda.parentLgaName} LGA, Lagos State.`}
            </p>
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
              title={`Map of ${ward.name}`}
            />
          </div>

          {/* Ward info */}
          <div className="space-y-4">
            {/* Location chain */}
            <div className="rounded-xl p-5 bg-white" style={{ border: "2px solid #0D0D0D" }}>
              <h2 className="font-display font-bold text-lg mb-4">📋 Ward Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "#FAFAF5", border: "1px solid #e5e7eb" }}>
                  <span className="text-lg">🏘️</span>
                  <div>
                    <p className="text-xs text-gray-400">Ward</p>
                    <p className="font-semibold">{ward.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "#FAFAF5", border: "1px solid #e5e7eb" }}>
                  <span className="text-lg">🏛️</span>
                  <div>
                    <p className="text-xs text-gray-400">LCDA</p>
                    <Link href={`/lgas/lcda/${lcda.id}`} className="font-semibold hover:underline" style={{ color }}>
                      {lcda.name}
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "#FAFAF5", border: "1px solid #e5e7eb" }}>
                  <span className="text-lg">🏢</span>
                  <div>
                    <p className="text-xs text-gray-400">Local Government Area</p>
                    <Link href={`/lgas/${lcda.parentLgaId}`} className="font-semibold hover:underline" style={{ color }}>
                      {lcda.parentLgaName} LGA
                    </Link>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "#FAFAF5", border: "1px solid #e5e7eb" }}>
                  <span className="text-lg">📍</span>
                  <div>
                    <p className="text-xs text-gray-400">Zone</p>
                    <p className="font-semibold">{lcda.zone} Zone, Lagos State</p>
                  </div>
                </div>
              </div>
            </div>

            {/* LCDA contact */}
            <div className="rounded-xl p-5 bg-white" style={{ border: "2px solid #0D0D0D" }}>
              <h2 className="font-display font-bold text-lg mb-3">LCDA Office Contact</h2>
              <p className="text-xs text-gray-400 mb-2">For ward-level enquiries, contact the {lcda.name} secretariat:</p>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span>👤</span>
                  <div>
                    <p className="font-semibold">{lcda.chairman}</p>
                    <p className="text-xs text-gray-400">LCDA Chairman</p>
                  </div>
                </div>
                <a href={"tel:" + lcda.phone} className="flex gap-2 items-center hover:underline" style={{ color }}>
                  <span>📞</span>
                  <span className="text-sm">{lcda.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Other wards in this LCDA */}
        <div className="rounded-xl overflow-hidden mb-8"
          style={{ border: "2px solid #0D0D0D" }}>
          <div className="px-5 py-4" style={{ background: color }}>
            <h2 className="font-display font-bold text-white text-base">
              Other Wards in {lcda.name}
            </h2>
          </div>
          <div className="divide-y divide-gray-100 bg-white">
            {lcda.wards.filter(w => w.id !== ward.id).map((w, i) => (
              <Link key={w.id} href={`/lgas/ward/${w.id}`}>
                <div className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: color }}>
                    {lcda.wards.findIndex(x => x.id === w.id) + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{w.name}</p>
                    {w.description && <p className="text-xs text-gray-400 line-clamp-1">{w.description}</p>}
                  </div>
                  <span className="text-xs" style={{ color }}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Prev / Next ward navigation */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {prevWard ? (
            <Link href={`/lgas/ward/${prevWard.id}`}
              className="p-4 rounded-xl text-left"
              style={{ background: "#fff", border: "2px solid #0D0D0D" }}>
              <p className="text-xs text-gray-400 mb-1">← Previous Ward</p>
              <p className="font-semibold text-sm line-clamp-1">{prevWard.name}</p>
            </Link>
          ) : <div />}
          {nextWard ? (
            <Link href={`/lgas/ward/${nextWard.id}`}
              className="p-4 rounded-xl text-right"
              style={{ background: "#fff", border: "2px solid #0D0D0D" }}>
              <p className="text-xs text-gray-400 mb-1">Next Ward →</p>
              <p className="font-semibold text-sm line-clamp-1">{nextWard.name}</p>
            </Link>
          ) : <div />}
        </div>

        {/* Bottom nav */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6"
          style={{ borderTop: "2px solid #e5e7eb" }}>
          <Link href={`/lgas/lcda/${lcda.id}`}
            className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg"
            style={{ background: "#fff", border: "2px solid #0D0D0D", color: "#0D0D0D" }}>
            ← Back to {lcda.name}
          </Link>
          <Link href={`/lgas/${lcda.parentLgaId}`}
            className="text-sm font-semibold px-4 py-2 rounded-lg"
            style={{ background: color, color: "#fff", border: "2px solid #0D0D0D" }}>
            {lcda.parentLgaName} LGA Profile →
          </Link>
        </div>

      </main>
    </>
  );
}
