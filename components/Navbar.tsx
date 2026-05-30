"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/ministries", label: "Ministries" },
  { href: "/agencies", label: "Agencies" },
  { href: "/parastatals", label: "Parastatals" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ background: "#1A3A8F", borderBottom: "4px solid #F5C518" }} className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full" style={{ background: "#F5C518", border: "2px solid #fff" }} />
          <span className="font-display text-white text-lg font-bold tracking-tight">
            Alausa <span style={{ color: "#F5C518" }}>Directory</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 rounded font-medium text-sm transition-all"
              style={{
                color: pathname === l.href ? "#0D0D0D" : "#fff",
                background: pathname === l.href ? "#F5C518" : "transparent",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-2xl leading-none"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "#1A3A8F", borderTop: "2px solid #F5C518" }} className="md:hidden px-4 pb-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 font-medium text-sm"
              style={{ color: pathname === l.href ? "#F5C518" : "#fff" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
