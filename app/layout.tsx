import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const BASE_URL = "https://www.alausadirectory.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Lagos State Government Directory | Ministries, Agencies & Parastatals",
    template: "%s | Lagos State Government Directory",
  },
  description:
    "The official directory of Lagos State Government ministries, agencies and parastatals. Find principal officers, addresses, phone numbers and contact details for all Lagos State MDAs.",
  keywords: [
    "Lagos State Government",
    "Lagos ministries",
    "Lagos agencies",
    "Lagos parastatals",
    "Lagos MDA directory",
    "Lagos government contacts",
    "Lagos commissioners",
    "Nigeria government directory",
    "Alausa Secretariat",
    "Lagos State officials",
  ],
  authors: [{ name: "Lagos State Government" }],
  creator: "Lagos State Government",
  publisher: "Lagos State Government",
  category: "Government",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: BASE_URL,
    siteName: "Lagos State Government Directory",
    title: "Lagos State Government Directory | Ministries, Agencies & Parastatals",
    description:
      "Find all Lagos State Government ministries, agencies and parastatals — principal officers, addresses and contact details in one place.",
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
    title: "Lagos State Government Directory",
    description:
      "Find all Lagos State Government ministries, agencies and parastatals — officers, addresses and contacts.",
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
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
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
        <Footer />
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
