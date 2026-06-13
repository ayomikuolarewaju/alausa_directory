import { getById, entities } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const BASE_URL = "https://www.alausadirectory.com";
const COLOR = "#1B7A3E";

export async function generateStaticParams() {
  return entities.filter(e => e.category === "parastatal").map(e => ({ id: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const entity = getById(id);
  if (!entity) return {};
  const title = entity.name;
  const description = `${entity.name} — Lagos State Government. Commissioner: ${entity.officers[0]?.name ?? ""}. Address: ${entity.address}. Contact: ${entity.phone}.`;
  const url = `${BASE_URL}/parastatals/${id}`;
  return {
    title,
    description,
    alternates: { canonical: url },
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
    employee: entity.officers.map(o => ({
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
          <Link href="/ministries" className="hover:underline">Ministries</Link>
          <span>/</span>
          <span className="font-medium" style={{ color: COLOR }}>{entity.name}</span>
        </nav>

        {/* Header */}
        <div className="rounded-2xl overflow-hidden mb-8" style={{ border: "2px solid #0D0D0D", boxShadow: "6px 6px 0 #0D0D0D" }}>
          <div style={{ background: COLOR, padding: "32px" }}>
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-2 py-1 rounded mb-4" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>Parastatal</span>
            <h1 className="font-display font-black text-white text-3xl md:text-4xl leading-tight">{entity.name}</h1>
          </div>
          <div className="bg-white p-6"><p className="text-gray-600">{entity.description}</p></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact */}
          <div className="rounded-xl p-6" style={{ background: "#fff", border: "2px solid #0D0D0D" }}>
            <h2 className="font-display font-bold text-xl mb-4">Contact & Location</h2>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3"><span className="text-lg">📍</span><div><p className="font-semibold">Address</p><p className="text-gray-500">{entity.address}</p></div></div>
              <div className="flex gap-3"><span className="text-lg">📞</span><div><p className="font-semibold">Phone</p><a href={"tel:" + entity.phone} className="text-gray-500 hover:underline">{entity.phone}</a></div></div>
              <div className="flex gap-3"><span className="text-lg">✉️</span><div><p className="font-semibold">Email</p><a href={"mailto:" + entity.email} className="text-gray-500 hover:underline">{entity.email}</a></div></div>
              {entity.website && <div className="flex gap-3"><span className="text-lg">🌐</span><div><p className="font-semibold">Website</p><a href={entity.website} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: COLOR }}>{entity.website}</a></div></div>}
            </div>
          </div>

          {/* Officers */}
          <div className="rounded-xl p-6" style={{ background: "#fff", border: "2px solid #0D0D0D" }}>
            <h2 className="font-display font-bold text-xl mb-4">Principal Officers</h2>
            <div className="space-y-3">
              {entity.officers.map((o, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: "#FAFAF5", border: "1px solid #e5e7eb" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ background: COLOR }}>
                    {o.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div><p className="font-semibold text-sm">{o.name}</p><p className="text-xs text-gray-500">{o.title}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
