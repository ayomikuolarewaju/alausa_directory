"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import logo from "@/public/logo.png"
import Image from "next/image";


const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/ministries", label: "Ministries" },
  { href: "/agencies", label: "Agencies" },
  { href: "/parastatals", label: "Parastatals" },
  { href: "/lgas", label: "LGAs" },
  { href: "/news", label: "News" },
  { href: "/services", label: "Services" },
  { href: "/emergency", label: "🚨 Emergency" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/about", label: "About" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/privacy", label: "Privacy" },
];


export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ background: "#1A3A8F", borderBottom: "4px solid #F5C518" }} className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image src={logo} alt="Logo" className="w-24 h-16 rounded-full" />
          <span className="font-display text-white text-lg font-bold tracking-tight">
            Alausa <span style={{ color: "#F5C518" }}>Directory</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex gap-0.5">
          {mainLinks.map((l) => (
            <Link key={l.href} href={l.href}
              className="px-3 py-2 rounded font-medium text-xs whitespace-nowrap transition-all"
              style={{
                color: pathname === l.href ? "#0D0D0D" : l.href === "/emergency" ? "#F5C518" : "#fff",
                background: pathname === l.href ? "#F5C518" : "transparent",
                fontWeight: l.href === "/emergency" ? "700" : undefined,
              }}>
              {l.label}
            </Link>
          ))}
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-white text-2xl leading-none">
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "#1A3A8F", borderTop: "2px solid #F5C518" }} className="lg:hidden px-4 pb-4">
          {mainLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block py-2 font-medium text-sm"
              style={{ color: pathname === l.href ? "#F5C518" : l.href === "/emergency" ? "#F5C518" : "#fff" }}>
              {l.label}
            </Link>
          ))}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", marginTop: "8px", paddingTop: "8px" }}>
            {legalLinks.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block py-1.5 text-xs"
                style={{ color: "rgba(255,255,255,0.6)" }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
