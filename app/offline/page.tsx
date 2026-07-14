"use client";
export default function OfflinePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: "#FAFAF5" }}>

      {/* Icon */}
      <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
        style={{ background: "#1A3A8F", border: "4px solid #F5C518" }}>
        <span className="text-4xl">📡</span>
      </div>

      {/* Heading */}
      <h1 className="font-display font-black text-3xl mb-2" style={{ color: "#1A3A8F" }}>
        You&apos;re Offline
      </h1>
      <p className="text-gray-500 text-base max-w-sm mb-8 leading-relaxed">
        It looks like you&apos;ve lost your internet connection. Some pages you&apos;ve visited before are still available below.
      </p>

      {/* Cached quick links */}
      <div className="w-full max-w-sm space-y-3 mb-8">
        {[
          { href: "/emergency",  label: "🚨 Emergency Contacts",   desc: "All Lagos emergency hotlines" },
          { href: "/ministries", label: "🏛️ Ministries",           desc: "Lagos State Government ministries" },
          { href: "/lgas",       label: "📍 LGA Directory",         desc: "All 20 local government areas" },
          { href: "/transport",  label: "🚊 Transport",             desc: "LAMATA rail, BRT and ferry" },
          { href: "/services",   label: "📋 Services Guide",        desc: "Government service how-to guides" },
        ].map(item => (
          <a key={item.href} href={item.href}
            className="flex items-start gap-3 p-4 rounded-xl text-left transition-opacity hover:opacity-80"
            style={{ background: "#fff", border: "2px solid #0D0D0D" }}>
            <div className="flex-1">
              <p className="font-semibold text-sm">{item.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
            </div>
            <span className="text-gray-300 mt-0.5">→</span>
          </a>
        ))}
      </div>

      {/* Retry button */}
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 rounded-xl font-bold text-sm mb-4"
        style={{ background: "#1A3A8F", color: "#fff", border: "2px solid #0D0D0D" }}>
        🔄 Try Again
      </button>

      <p className="text-xs text-gray-400 max-w-xs">
        Pages you&apos;ve visited recently are cached and available offline. Connect to the internet to access live news and search.
      </p>

      {/* Emergency highlight */}
      <div className="mt-8 w-full max-w-sm rounded-xl p-4"
        style={{ background: "#D42B2B", border: "2px solid #0D0D0D" }}>
        <p className="text-white font-bold text-sm mb-1">🚨 Emergency?</p>
        <p className="text-red-200 text-xs mb-2">These numbers work without internet:</p>
        <div className="flex gap-3">
          <a href="tel:112" className="flex-1 py-2 rounded-lg text-center font-bold text-sm"
            style={{ background: "#F5C518", color: "#0D0D0D" }}>
            Call 112
          </a>
          <a href="tel:767" className="flex-1 py-2 rounded-lg text-center font-bold text-sm"
            style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}>
            Call 767
          </a>
        </div>
      </div>

    </main>
  );
}
