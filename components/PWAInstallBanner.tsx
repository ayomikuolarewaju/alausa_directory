"use client";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Don't show if already installed as PWA
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    // Check if dismissed recently
    const dismissed = localStorage.getItem("pwa-banner-dismissed");
    if (dismissed && Date.now() - parseInt(dismissed) < 1000 * 60 * 60 * 24 * 7) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setInstalled(true);
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    localStorage.setItem("pwa-banner-dismissed", Date.now().toString());
    setShowBanner(false);
  };

  if (!showBanner || installed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-6 md:w-96"
      style={{ filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.18))" }}>
      <div className="rounded-2xl overflow-hidden" style={{ border: "2px solid #0D0D0D" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3"
          style={{ background: "#1A3A8F" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "#F5C518" }}>
              <span className="text-lg">🏛️</span>
            </div>
            <div>
              <p className="font-display font-bold text-white text-sm leading-tight">Lagos Directory</p>
              <p className="text-blue-300 text-xs">Install as app — works offline</p>
            </div>
          </div>
          <button onClick={handleDismiss}
            className="text-blue-300 hover:text-white text-lg leading-none ml-2 flex-shrink-0"
            aria-label="Dismiss">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="bg-white px-4 py-3">
          <p className="text-sm text-gray-600 mb-3">
            Add Lagos Directory to your home screen for instant access — even without internet.
          </p>

          {/* Features */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { icon: "⚡", label: "Instant load" },
              { icon: "📴", label: "Works offline" },
              { icon: "🔔", label: "No app store" },
            ].map(f => (
              <div key={f.label} className="text-center py-2 rounded-lg text-xs font-medium"
                style={{ background: "#FAFAF5", border: "1px solid #e5e7eb" }}>
                <span className="block text-base mb-0.5">{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleInstall}
              className="flex-1 py-2.5 rounded-xl font-bold text-sm"
              style={{ background: "#1A3A8F", color: "#fff", border: "2px solid #0D0D0D" }}>
              📲 Install App
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2.5 rounded-xl font-semibold text-sm"
              style={{ background: "#fff", color: "#0D0D0D", border: "2px solid #e5e7eb" }}>
              Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
