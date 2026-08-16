import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Lagos Directory",
  description: "The page you are looking for could not be found. Return to the Lagos State Government Directory.",
};

const quickLinks = [
  { href: "/ministries",  label: "Ministries",        icon: "🏛️" },
  { href: "/agencies",    label: "Agencies",           icon: "🏢" },
  { href: "/parastatals", label: "Parastatals",        icon: "🏗️" },
  { href: "/lgas",        label: "LGA Directory",      icon: "📍" },
  { href: "/transport",   label: "Transport",          icon: "🚊" },
  { href: "/emergency",   label: "Emergency Contacts", icon: "🚨" },
  { href: "/services",    label: "Services Guide",     icon: "📋" },
  { href: "/news",        label: "News",               icon: "📰" },
];

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ background: "#FAFAF5" }}>

      {/* Hero number */}
      <div className="relative mb-6">
        <p className="font-display font-black text-center leading-none select-none"
          style={{ fontSize: "clamp(100px, 20vw, 180px)", color: "#1A3A8F", opacity: 0.08 }}>
          404
        </p>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ background: "#1A3A8F", border: "4px solid #F5C518" }}>
            <span className="text-4xl">🔍</span>
          </div>
        </div>
      </div>

      {/* Message */}
      <h1 className="font-display font-black text-3xl md:text-4xl mb-3 text-center"
        style={{ color: "#1A3A8F" }}>
        Page Not Found
      </h1>
      <p className="text-gray-500 text-base max-w-md text-center mb-10 leading-relaxed">
        The page you are looking for does not exist or may have been moved.
        Try searching or use one of the links below to find what you need.
      </p>

      {/* Search bar */}
      <form action="/" method="get" className="flex gap-2 w-full max-w-md mb-10">
        <input
          type="text"
          name="q"
          placeholder="Search ministries, agencies, officers..."
          className="flex-1 px-4 py-3 rounded-xl text-sm font-medium outline-none"
          style={{ border: "2px solid #0D0D0D", background: "#fff" }}
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-xl font-bold text-sm flex-shrink-0"
          style={{ background: "#F5C518", color: "#0D0D0D", border: "2px solid #0D0D0D" }}>
          Search
        </button>
      </form>

      {/* Quick links */}
      <div className="w-full max-w-xl mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 text-center mb-4">
          Quick Links
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickLinks.map(link => (
            <Link key={link.href} href={link.href}>
              <div className="card-hover flex flex-col items-center gap-2 p-4 rounded-xl bg-white text-center"
                style={{ border: "2px solid #0D0D0D" }}>
                <span className="text-2xl">{link.icon}</span>
                <span className="text-xs font-semibold">{link.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Emergency strip */}
      <div className="w-full max-w-xl rounded-2xl p-5 flex flex-col md:flex-row items-center gap-4"
        style={{ background: "#D42B2B", border: "2px solid #0D0D0D" }}>
        <div className="flex-1 text-center md:text-left">
          <p className="font-bold text-white text-sm mb-0.5">🚨 In an Emergency?</p>
          <p className="text-red-200 text-xs">Don&apos;t search — call directly</p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <a href="tel:112"
            className="px-5 py-2.5 rounded-xl font-bold text-sm"
            style={{ background: "#F5C518", color: "#0D0D0D", border: "2px solid #0D0D0D" }}>
            Call 112
          </a>
          <a href="tel:767"
            className="px-5 py-2.5 rounded-xl font-semibold text-sm"
            style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "2px solid rgba(255,255,255,0.3)" }}>
            Call 767
          </a>
        </div>
      </div>

      {/* Back home */}
      <Link href="/"
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl"
        style={{ background: "#1A3A8F", color: "#fff", border: "2px solid #0D0D0D" }}>
        ← Back to Home
      </Link>

    </main>
  );
}
