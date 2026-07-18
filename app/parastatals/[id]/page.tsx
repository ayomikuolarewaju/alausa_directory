import { getById, entities } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const BASE_URL = "https://www.lagosdirectory.gov.ng";
const COLOR = "#1B7A3E";

export async function generateStaticParams() {
  return entities.filter(e => e.category === "parastatal").map(e => ({ id: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const entity = getById(id);
  if (!entity) return {};
  const title = entity.name;
  const head = entity.officers[0]?.name ?? "";
  const description = `${entity.name} — Lagos State Government. ${entity.officers[0]?.title ?? ""}: ${head}. Address: ${entity.address}. Contact: ${entity.phone}.`;
  const url = `${BASE_URL}/parastatals/${id}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    keywords: [
      entity.name,
      `${entity.name} Lagos`,
      `${entity.name} contact`,
      `${entity.name} phone number address`,
      `Lagos parastatal ${entity.name}`,
      `Alausa Secretariat parastatal`,
      `Lagos State parastatal directory`,
      `${head} ${entity.name}`,
    ],
    openGraph: {
      title: `${title} | Lagos State Government Directory`,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${title} | Lagos State`,
      description,
    },
  };
}

export default async function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entity = getById(id);
  if (!entity || entity.category !== "parastatal") notFound();

  const hasEmptyOfficers = entity.officers.some(o => !o.name);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: entity.name,
    description: entity.description,
    url: entity.website ?? `${BASE_URL}/parastatals/${entity.id}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: entity.address,
      addressLocality: entity.location,
      addressRegion: "Lagos",
      addressCountry: "NG",
    },
    telephone: entity.phone,
    email: entity.email,
    employee: entity.officers.filter(o => o.name).map(o => ({
      "@type": "Person",
      name: o.name,
      jobTitle: o.title,
    })),
    parentOrganization: {
      "@type": "GovernmentOrganization",
      name: "Lagos State Government",
      url: "https://lagosstate.gov.ng",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8 text-gray-500">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/parastatals" className="hover:underline">Parastatals</Link>
          <span>/</span>
          <span className="font-medium" style={{ color: COLOR }}>{entity.name}</span>
        </nav>

        {/* Verification Banner */}
        {entity.needsVerification && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border-2 border-amber-200">
            <div className="flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <div>
                <p className="font-semibold text-amber-800 text-sm">Information Pending Verification</p>
                <p className="text-amber-700 text-xs mt-1">
                  The leadership details for this parastatal have not been confirmed by phone. 
                  Call the office directly to verify current officers.
                </p>
              </div>
            </div>
          </div>
        )}

        {entity.verified && (
          <div className="mb-6 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-center gap-2">
              <span className="text-lg">✅</span>
              <p className="text-emerald-700 text-sm font-medium">Information verified against official Lagos State sources</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="rounded-2xl overflow-hidden mb-8" style={{ border: "2px solid #0D0D0D", boxShadow: "6px 6px 0 #0D0D0D" }}>
          <div style={{ background: COLOR, padding: "32px" }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-2 py-1 rounded mb-4" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>Parastatal</span>
            <h1 className="font-display font-black text-white text-3xl md:text-4xl leading-tight">{entity.name}</h1>
          </div>
          <div className="bg-white p-6">
            <p className="text-gray-600">{entity.description}</p>
            {entity.lastUpdated && (
              <p className="text-xs text-gray-400 mt-3">Last updated: {entity.lastUpdated}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact */}
          <div className="rounded-xl p-6" style={{ background: "#fff", border: "2px solid #0D0D0D" }}>
            <h2 className="font-display font-bold text-xl mb-4">Contact & Location</h2>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3"><span className="text-lg">📍</span><div><p className="font-semibold">Address</p><p className="text-gray-500">{entity.address}</p></div></div>
              {entity.phone ? (
                <div className="flex gap-3"><span className="text-lg">📞</span><div><p className="font-semibold">Phone</p><a href={"tel:" + entity.phone} className="text-gray-500 hover:underline">{entity.phone}</a></div></div>
              ) : (
                <div className="flex gap-3"><span className="text-lg">📞</span><div><p className="font-semibold">Phone</p><p className="text-gray-400 italic">Not available</p></div></div>
              )}
              {entity.email ? (
                <div className="flex gap-3"><span className="text-lg">✉️</span><div><p className="font-semibold">Email</p><a href={"mailto:" + entity.email} className="text-gray-500 hover:underline">{entity.email}</a></div></div>
              ) : (
                <div className="flex gap-3"><span className="text-lg">✉️</span><div><p className="font-semibold">Email</p><p className="text-gray-400 italic">Not available</p></div></div>
              )}
              {entity.website && <div className="flex gap-3"><span className="text-lg">🌐</span><div><p className="font-semibold">Website</p><a href={entity.website} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: COLOR }}>{entity.website}</a></div></div>}
            </div>
          </div>

          {/* Officers */}
          <div className="rounded-xl p-6" style={{ background: "#fff", border: "2px solid #0D0D0D" }}>
            <h2 className="font-display font-bold text-xl mb-4">Principal Officers</h2>
            {hasEmptyOfficers && (
              <div className="mb-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
                <p className="text-xs text-amber-700">
                  ⚠️ Some officer positions are pending verification. Call the parastatal to confirm current leadership.
                </p>
              </div>
            )}
            <div className="space-y-3">
              {entity.officers.filter(o => o.name).map((o, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: "#FAFAF5", border: "1px solid #e5e7eb" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: COLOR }}>
                    {o.name.split(" ").filter(n => n).map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{o.name}</p>
                    <p className="text-xs text-gray-500">{o.title}</p>
                    {o.verified && <span className="inline-block mt-1 text-xs text-emerald-600">✓ Verified</span>}
                  </div>
                </div>
              ))}
              {entity.officers.filter(o => o.name).length === 0 && (
                <p className="text-sm text-gray-400 italic p-3">Officer information pending verification. Please call the parastatal office.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
