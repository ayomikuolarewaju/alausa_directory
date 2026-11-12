import { getById, entities, getEntityDescription, isRecordStale } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const BASE_URL = "https://www.alausadirectory.com";
const COLOR = "#D42B2B";

export async function generateStaticParams() {
  return entities.filter(e => e.category === "agency").map(e => ({ id: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const entity = getById(id);
  if (!entity) return {};
  const title = entity.name;
  const head = entity.officers.find(o => o.name.trim())?.name ?? "";
  const description = getEntityDescription(entity);
  const url = `${BASE_URL}/agencies/${id}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    keywords: [
      entity.name,
      `${entity.name} Lagos`,
      `${entity.name} contact`,
      `${entity.name} phone number address`,
      `Lagos agency ${entity.name}`,
      `Alausa Secretariat agency`,
      `Lagos State agency directory`,
      `${head} ${entity.name}`,
    ],
    openGraph: {
      title: `${title} | Alausa Directory`,
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
  if (!entity || entity.category !== "agency") notFound();

  const hasEmptyOfficers = entity.officers.some(o => !o.name);
  const stale = isRecordStale(entity.lastReviewedAt);
  const phones = [entity.phone, ...(entity.additionalPhones ?? [])].filter(Boolean);
  const emails = [entity.email, ...(entity.additionalEmails ?? [])].filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: entity.name,
    description: entity.description,
    url: entity.website ?? `${BASE_URL}/agencies/${entity.id}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: entity.address,
      addressLocality: entity.location,
      addressRegion: "Lagos",
      addressCountry: "NG",
    },
    telephone: phones.length ? phones : undefined,
    email: emails.length ? emails : undefined,
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
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Agencies", item: `${BASE_URL}/agencies` },
      { "@type": "ListItem", position: 3, name: entity.name, item: `${BASE_URL}/agencies/${entity.id}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8 text-gray-500">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/agencies" className="hover:underline">Agencies</Link>
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
                  {entity.sources?.length
                    ? "Some fields still need review. The sources below identify the specific claims checked so far."
                    : "This record is flagged for review in the existing dataset. Please verify current details with the agency."}
                </p>
              </div>
            </div>
          </div>
        )}

        {entity.verified && (
          <div className="mb-6 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-center gap-2">
              <span className="text-lg">✅</span>
              <p className="text-emerald-700 text-sm font-medium">
                {entity.sources?.length
                  ? "This record was checked against the sources listed below. The source notes describe which details they support; they are not a full field-by-field verification history."
                  : "This record is flagged as checked in the existing dataset; individual claims do not yet have linked sources or review dates."}
              </p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="rounded-2xl overflow-hidden mb-8" style={{ border: "2px solid #0D0D0D", boxShadow: "6px 6px 0 #0D0D0D" }}>
          <div style={{ background: COLOR, padding: "32px" }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-2 py-1 rounded mb-4" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>Agency</span>
            <h1 className="font-display font-black text-white text-3xl md:text-4xl leading-tight">{entity.name}</h1>
          </div>
          <div className="bg-white p-6">
            <p className="text-gray-600">{entity.description}</p>
            <div className="mt-3">
              <p className="text-xs text-gray-500">Data updated: {entity.lastUpdated || "not recorded"}</p>
              <p className="text-xs text-gray-500">Last reviewed: {entity.lastReviewedAt || "not recorded"}</p>
              {stale && <p className="text-xs font-medium text-amber-700 mt-1">Review overdue — no full review date is recorded or it is more than 90 days old.</p>}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact */}
          <div className="rounded-xl p-6" style={{ background: "#fff", border: "2px solid #0D0D0D" }}>
            <h2 className="font-display font-bold text-xl mb-4">Contact & Location</h2>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3"><span className="text-lg">📍</span><div><p className="font-semibold">Address</p><p className="text-gray-500">{entity.address}</p></div></div>
              {phones.length > 0 ? (
                <div className="flex gap-3"><span className="text-lg">📞</span><div><p className="font-semibold">Phone</p><div className="space-y-1">{phones.map(phone => <a key={phone} href={"tel:" + phone} className="block text-gray-500 hover:underline">{phone}</a>)}</div></div></div>
              ) : (
                <div className="flex gap-3"><span className="text-lg">📞</span><div><p className="font-semibold">Phone</p><p className="text-gray-400 italic">Not available</p></div></div>
              )}
              {emails.length > 0 ? (
                <div className="flex gap-3"><span className="text-lg">✉️</span><div><p className="font-semibold">Email</p><div className="space-y-1">{emails.map(email => <a key={email} href={"mailto:" + email} className="block text-gray-500 hover:underline">{email}</a>)}</div></div></div>
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
                  ⚠️ Some officer positions are pending verification. Call the agency to confirm current leadership.
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
                    {o.verified && (
                      <span className="inline-block mt-1 text-xs text-emerald-600">
                        ✓ {entity.sources?.length ? "Source checked" : "Legacy checked flag"}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {entity.officers.filter(o => o.name).length === 0 && (
                <p className="text-sm text-gray-400 italic p-3">Officer information pending verification. Please call the agency office.</p>
              )}
            </div>
          </div>
        </div>

        {entity.sources && entity.sources.length > 0 && (
          <section className="mt-6 rounded-xl p-6 bg-white" style={{ border: "2px solid #0D0D0D" }}>
            <h2 className="font-display font-bold text-xl mb-4">Sources checked</h2>
            <ul className="space-y-4">
              {entity.sources.map(source => (
                <li key={source.url} className="text-sm">
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline" style={{ color: COLOR }}>
                    {source.label}
                  </a>
                  <p className="text-gray-600 mt-1">Supports: {source.supports}</p>
                  <p className="text-xs text-gray-400 mt-1">Checked {source.checkedAt}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}
