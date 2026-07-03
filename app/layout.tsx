import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

const BASE_URL = "https://www.lagosdirectory.gov.ng";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Lagos Directory | Alausa Secretariat — Ministries, Agencies & Parastatals",
    template: "%s | Lagos Directory — Alausa Secretariat",
  },
  description:
    "Lagos Directory — the definitive Alausa Secretariat and Lagos State Government directory. Find all ministries, agencies, parastatals and LGAs with principal officers, addresses and phone numbers.",
  keywords: [
    "Lagos State Government directory",
    "Lagos government contacts",
    "Lagos ministry directory",
    "Lagos MDA directory",
    "Lagos State agencies list",
    "Lagos State officials contact",
    "Lagos parastatals directory",
    "Lagos LGA directory",
    "Lagos government phone numbers",
    "Lagos State commissioner contacts",
    "Alausa Secretariat directory",
    "Alausa Ikeja government offices",
    "Alausa government contacts",
    "Alausa Secretariat phone number",
    "Alausa Lagos State government",
    "Lagos Secretariat Alausa contacts",
    "Obafemi Awolowo Way government offices",
    "how to pay land use charge Lagos",
    "how to register business Lagos",
    "Lagos emergency number LASEMA",
    "Lagos tax clearance certificate",
    "Lagos State ministries 2026",
    "Lagos commissioners 2026",
    "Lagos LGA chairmen 2026",
    "Nigeria government directory",
  ],
  authors: [{ name: "Lagos Directory" }],
  creator: "Lagos Directory",
  publisher: "Lagos Directory",
  category: "Government",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: BASE_URL,
    siteName: "Lagos Directory | Alausa Secretariat",
    title: "Lagos Directory | Alausa Secretariat — Ministries, Agencies & Parastatals",
    description:
      "Find all Lagos State Government ministries, agencies and parastatals — Alausa Secretariat offices, principal officers, addresses and contacts in one place.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lagos State Government Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lagos Directory | Alausa Secretariat",
    description:
      "Lagos Directory — Alausa Secretariat offices, Lagos State ministries, agencies and parastatals with officer contacts.",
    images: ["/og-image.png"],
    creator: "@LagosStateGov",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Space+Grotesk:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
