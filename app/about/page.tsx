import type { Metadata } from "next";
import Link from "next/link";
import { getByCategory } from "@/lib/data";
import { lgas } from "@/lib/lgaData";

export const metadata: Metadata = {
  title: "About Alausa Directory | Independent Civic Platform",
  description:
    "About Alausa Directory, an independent civic information platform. Learn how our directory is compiled, how verification labels work and how to report corrections.",
  alternates: { canonical: "https://www.alausadirectory.com/about" },
  openGraph: {
    title: "About Alausa Directory",
    description:
      "An independent public directory of Lagos State institutions and local government areas.",
    url: "https://www.alausadirectory.com/about",
  },
};

const team = [
  {
    initials: "AO",
    name: "Almaroof Olarewaju",
    role: "Founder & Developer",
    bio: "Former mediator at the Lagos State Citizens Mediation Bureau turned full-stack developer. Built this platform to make Lagos government information accessible to every citizen.",
  },
];

const dataSources = [
  { icon: "🏛️", name: "Lagos State Government official publications and agency websites", url: "https://lagosstate.gov.ng" },
  { icon: "📋", name: "Gazettes, official notices and budget documents" },
  { icon: "🗞️", name: "Press releases published by the relevant ministry or agency" },
];

export default function AboutPage() {
  const stats = [
    { value: getByCategory("ministry").length, label: "Ministries" },
    { value: getByCategory("agency").length, label: "Agencies" },
    { value: getByCategory("parastatal").length, label: "Parastatals" },
    { value: lgas.length, label: "LGA Profiles" },
    { value: "Free", label: "Always" },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="mb-10">
        <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4"
          style={{ background: "#F5C518", color: "#0D0D0D" }}>
          Who We Are
        </div>
        <h1 className="font-display font-black text-4xl md:text-5xl mb-4">About This Directory</h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
          Alausa Directory is an independent public information platform that makes information about Lagos State institutions and civic resources easier to find.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-12">
        {stats.map(s => (
        <div key={s.label} className="text-center py-4 px-2 rounded-xl"
            style={{ background: "#1A3A8F", border: "2px solid #0D0D0D" }}>
            <p className="font-display font-black text-white text-2xl">{s.value}</p>
            <p className="text-white text-xs opacity-80 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="rounded-2xl overflow-hidden mb-8"
        style={{ border: "2px solid #0D0D0D", boxShadow: "6px 6px 0 #0D0D0D" }}>
        <div style={{ background: "#1A3A8F", padding: "20px 28px" }}>
          <h2 className="font-display font-bold text-white text-xl">Our Mission</h2>
        </div>
        <div className="bg-white p-6 md:p-8 space-y-4 text-gray-700 leading-relaxed">
          <p>
            Lagos State has a large network of ministries, agencies, parastatals and local governments. Finding an office address, public contact detail or the name of an officeholder can be difficult when information is spread across many sources.
          </p>
          <p>
            We built this directory to change that. Our mission is simple: <strong>every Lagos resident should be able to find their government in seconds.</strong> Whether you need to report environmental pollution to LASEPA, contact your LGA chairman, find out how to pay your land use charge, or know which hospital to call in an emergency — this platform gives you that information instantly, for free.
          </p>
          <p>
            We are not affiliated with the Lagos State Government. We are an independent civic technology platform committed to transparency, accuracy and public service.
          </p>
        </div>
      </div>

      {/* What we cover */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-xl p-6 bg-white" style={{ border: "2px solid #0D0D0D" }}>
          <h2 className="font-display font-bold text-xl mb-4">What We Cover</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            {[
              `${getByCategory("ministry").length} ministry records`,
              `${getByCategory("agency").length} agency records`,
              `${getByCategory("parastatal").length} parastatal records`,
              `${lgas.length} Local Government Areas with history, maps and officers`,
              "Step-by-step guides for key government services",
              "Emergency and crisis hotlines for all sectors",
              "Government events and public holiday calendar",
              "Headlines and links to reporting about Lagos State from multiple sources",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl p-6 bg-white" style={{ border: "2px solid #0D0D0D" }}>
          <h2 className="font-display font-bold text-xl mb-4">Our Data Sources</h2>
          <ul className="space-y-3">
            {dataSources.map((src, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="text-lg">{src.icon}</span>
                <div>
                  {src.url ? (
                    <a href={src.url} target="_blank" rel="noopener noreferrer"
                      className="hover:underline" style={{ color: "#1A3A8F" }}>
                      {src.name}
                    </a>
                  ) : src.name}
                </div>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-4">
            These are source types we prioritize. Directory records do not yet include a source and retrieval date for every individual claim, and should not be read as fully verified. Read our{" "}
            <Link href="/methodology" className="underline" style={{ color: "#1A3A8F" }}>methodology</Link> or{" "}
            <Link href="/changelog" className="underline" style={{ color: "#1A3A8F" }}>changelog</Link>. To report an error,{" "}
            <Link href="/contact" className="underline" style={{ color: "#1A3A8F" }}>contact us</Link>.
          </p>
        </div>
      </div>

      {/* Team */}
      <div className="rounded-xl p-6 bg-white mb-8" style={{ border: "2px solid #0D0D0D" }}>
        <h2 className="font-display font-bold text-xl mb-5">The Team</h2>
        {team.map((member, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0"
              style={{ background: "#1A3A8F", border: "2px solid #0D0D0D" }}>
              {member.initials}
            </div>
            <div>
              <p className="font-display font-bold text-lg">{member.name}</p>
              <p className="text-sm font-medium mb-2" style={{ color: "#D42B2B" }}>{member.role}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Accuracy notice */}
      <div className="rounded-xl p-5 mb-8"
        style={{ background: "#FAFAF5", border: "2px dashed #0D0D0D" }}>
        <h3 className="font-bold text-sm mb-2">⚠️ Accuracy & Updates</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Government information changes frequently — officers are reassigned, phone numbers change and institutions are reorganised. The date shown on a listing is the date stored with that record, not a guarantee that each detail was checked then. Always verify critical information directly with the relevant institution. Found something wrong?{" "}
          <Link href="/contact" className="underline font-medium" style={{ color: "#1A3A8F" }}>
            Report it here
          </Link>.
        </p>
      </div>

      {/* CTA links */}
      <div className="flex flex-wrap gap-3">
        <Link href="/contact" className="px-5 py-2.5 rounded-lg font-semibold text-sm"
          style={{ background: "#1A3A8F", color: "#fff", border: "2px solid #0D0D0D" }}>
          Contact Us
        </Link>
        <Link href="/disclaimer" className="px-5 py-2.5 rounded-lg font-semibold text-sm"
          style={{ background: "#fff", color: "#0D0D0D", border: "2px solid #0D0D0D" }}>
          Disclaimer
        </Link>
        <Link href="/privacy" className="px-5 py-2.5 rounded-lg font-semibold text-sm"
          style={{ background: "#fff", color: "#0D0D0D", border: "2px solid #0D0D0D" }}>
          Privacy Policy
        </Link>
      </div>

    </main>
  );
}
