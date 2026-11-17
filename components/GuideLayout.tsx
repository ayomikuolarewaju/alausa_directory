import Link from "next/link";
import type { ReactNode } from "react";

const BASE_URL = "https://www.alausadirectory.com";

type Props = {
  title: string;
  intro: string;
  path: string;
  datePublished: string;
  dateModified: string;
  updated: string;
  children: ReactNode;
  sources?: { label: string; href: string }[];
};

export default function GuideLayout({
  title,
  intro,
  path,
  datePublished,
  dateModified,
  updated,
  children,
  sources = [],
}: Props) {
  const url = `${BASE_URL}${path}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: intro,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: "Almaroof Olarewaju",
      url: `${BASE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Alausa Directory",
      url: BASE_URL,
      logo: `${BASE_URL}/og-image.png`,
    },
    mainEntityOfPage: url,
    image: `${BASE_URL}/og-image.png`,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${BASE_URL}/guides` },
      { "@type": "ListItem", position: 3, name: title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <nav className="mb-6 text-sm">
          <Link href="/guides" className="font-semibold underline" style={{ color: "#1A3A8F" }}>
            ← All guides
          </Link>
        </nav>
        <article>
          <h1 className="font-display text-3xl font-black leading-tight md:text-4xl">{title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">{intro}</p>
          <p className="mt-4 text-sm text-gray-500">
            By <Link href="/about" className="underline">Almaroof Olarewaju</Link>
            {" · "}Last reviewed {updated}
          </p>

          <div className="mt-8 space-y-6">{children}</div>

          <aside className="mt-10 rounded-xl border-2 p-4 text-sm leading-relaxed"
            style={{ borderColor: "#1A3A8F", background: "#EFF6FF" }}>
            <strong>Check before you travel.</strong> Fares, timetables and rules can change. Alausa Directory is
            independent and not affiliated with LAMATA or the Lagos State Government; confirm details with the
            official operator.
          </aside>

          {sources.length > 0 && (
            <section className="mt-8">
              <h2 className="font-display text-xl font-bold">Sources</h2>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-sm">
                {sources.map((source) => (
                  <li key={source.href}>
                    <a href={source.href} target="_blank" rel="noopener noreferrer"
                      className="underline" style={{ color: "#1A3A8F" }}>
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </main>
    </>
  );
}
