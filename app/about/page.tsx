import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the Lagos State Government Directory — who runs it, our mission, data sources and how we keep information accurate and up to date.",
  alternates: { canonical: "https://www.lagosdirectory.gov.ng/about" },
  openGraph: {
    title: "About Lagos State Government Directory",
    description:
      "The most comprehensive public directory of Lagos State Government ministries, agencies, parastatals and local government areas.",
    url: "https://www.lagosdirectory.gov.ng/about",
  },
};

const stats = [
  { value: "23", label: "Ministries" },
  { value: "12", label: "Agencies" },
  { value: "13", label: "Parastatals" },
  { value: "20", label: "LGA Profiles" },
  { value: "84+", label: "Total Pages" },
  { value: "Free", label: "Always" },
];

const team = [
  {
    initials: "AO",
    name: "Almaroof Olarewaju",
    role: "Founder & Developer",
    bio: "Former mediator at the Lagos State Citizens Mediation Bureau turned full-stack developer. Built this platform to make Lagos government information accessible to every citizen.",
  },
];

const dataSources = [
  { icon: "🏛️", name: "Lagos State Government Official Website", url: "https://lagosstate.gov.ng" },
  { icon: "📋", name: "Lagos State Gazette & Official Publications" },
  { icon: "🗞️", name: "Verified press releases from Lagos MDAs" },
  { icon: "📞", name: "Direct contact verification with agency offices" },
  { icon: "🗺️", name: "Nigeria Galleria Government Records" },
  { icon: "📊", name: "National Population Commission (NPC) Census Data" },
];

export default function AboutPage() {
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
          The Lagos State Government Directory is an independent public information platform that makes government contact information, officer details and civic resources freely accessible to every Nigerian.
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
            Lagos State is home to over 20 million people and operates one of the most complex systems of government in Africa — 23 ministries, dozens of agencies and parastatals, 20 local government areas and hundreds of principal officers. Yet finding a phone number, office address or the name of a commissioner has historically required multiple visits, phone calls and frustration.
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
              "All 23 Lagos State Government Ministries with commissioners and contacts",
              "12 state agencies including LASEMA, LAMATA, LASEPA and LIRS",
              "13 parastatals including LASU, LASUTH, LAWMA and Radio Lagos",
              "All 20 Local Government Areas with history, maps and officers",
              "Step-by-step guides for key government services",
              "Emergency and crisis hotlines for all sectors",
              "2026 government events and public holiday calendar",
              "Latest news and announcements from Lagos State MDAs",
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
          <p className="text-xs text-gray-400 mt-4">
            Data is verified at the time of publication and reviewed regularly. If you find an error, please{" "}
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
          Government information changes frequently — officers are reassigned, phone numbers change and new agencies are created. We update this directory regularly but cannot guarantee real-time accuracy. Always verify critical information directly with the relevant ministry, agency or LGA office. Found something wrong?{" "}
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
