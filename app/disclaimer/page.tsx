import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Legal disclaimer for the Lagos State Government Directory. Read about accuracy, liability, external links and the independence of this platform from the Lagos State Government.",
  alternates: { canonical: "https://www.lagosdirectory.gov.ng/disclaimer" },
};

const sections = [
  {
    title: "Independence from Lagos State Government",
    content:
      "The Lagos State Government Directory (lagosdirectory.gov.ng) is an independent civic information platform. It is not owned, operated, funded or officially endorsed by the Lagos State Government, any of its ministries, agencies, parastatals or local government areas. The use of publicly available government information on this site does not imply any official affiliation or government approval.",
  },
  {
    title: "Accuracy of Information",
    content:
      "We make every effort to ensure the accuracy of the information published on this website, including names of principal officers, office addresses, phone numbers and organisational descriptions. However, government information changes frequently — officers are reassigned, contact details change, and new agencies are created or dissolved. We cannot guarantee that all information is current at the time of your visit. You are advised to verify critical information directly with the relevant government body before acting on it.",
  },
  {
    title: "No Official Legal or Professional Advice",
    content:
      "Nothing on this website constitutes legal, financial, medical, regulatory or professional advice. The Public Services Guide, Emergency Contacts, News and other content on this site is provided for general informational purposes only. For legal matters, always consult a qualified lawyer. For medical emergencies, always call the relevant emergency services directly. For official government transactions, always engage directly with the relevant ministry, agency or parastatal.",
  },
  {
    title: "External Links",
    content:
      "This website contains links to external government websites (e.g. lagosstate.gov.ng, lirs.gov.ng, lamata-ng.com). We are not responsible for the content, accuracy, security or availability of any external websites. Linking to an external site does not constitute an endorsement of that site's content or policies.",
  },
  {
    title: "Emergency Information",
    content:
      "The emergency contact numbers listed on this website are sourced from publicly available government records and are provided for convenience only. Phone numbers for emergency services can change without notice. In a life-threatening emergency, always dial Nigeria's national emergency line 112. Do not rely solely on this website in an emergency situation.",
  },
  {
    title: "Advertising and Sponsored Content",
    content:
      "This website may display third-party advertisements and sponsored listings. Sponsored content will be clearly labelled. We do not endorse any advertiser or their products and services. Advertisers have no editorial influence over the informational content of this directory.",
  },
  {
    title: "Intellectual Property",
    content:
      "The design, code, original written content, LGA profiles, service guides and historical narratives on this website are the intellectual property of the Lagos State Government Directory and its creators. Government data (names, addresses, phone numbers) is public information. Reproduction of our original editorial content without permission is prohibited.",
  },
  {
    title: "Limitation of Liability",
    content:
      "To the fullest extent permitted by law, the Lagos State Government Directory, its founders, contributors and partners shall not be liable for any direct, indirect, incidental or consequential loss or damage arising from your use of this website, reliance on information published here, or inability to access the website. Use of this website is entirely at your own risk.",
  },
  {
    title: "Changes to This Disclaimer",
    content:
      "We reserve the right to update this disclaimer at any time without prior notice. Continued use of this website after changes constitutes your acceptance of the updated disclaimer. The date of last revision is shown below.",
  },
];

export default function DisclaimerPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="mb-10">
        <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4"
          style={{ background: "#D42B2B", color: "#fff" }}>
          Legal
        </div>
        <h1 className="font-display font-black text-4xl md:text-5xl mb-3">Disclaimer</h1>
        <p className="text-gray-500 text-sm">Last updated: June 2026</p>
      </div>

      {/* Intro box */}
      <div className="rounded-xl p-5 mb-8"
        style={{ background: "#FEF9C3", border: "2px solid #EAB308" }}>
        <p className="text-sm text-gray-700 leading-relaxed">
          <strong>Important:</strong> This directory is an independent platform and is not officially affiliated with the Lagos State Government. Please read this disclaimer carefully before using information from this site.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((section, i) => (
          <div key={i} className="rounded-xl bg-white p-6" style={{ border: "2px solid #0D0D0D" }}>
            <h2 className="font-display font-bold text-lg mb-3"
              style={{ color: "#1A3A8F" }}>
              {i + 1}. {section.title}
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="mt-8 rounded-xl p-5 bg-white" style={{ border: "2px solid #0D0D0D" }}>
        <h2 className="font-bold text-base mb-2">Questions about this disclaimer?</h2>
        <p className="text-sm text-gray-600 mb-3">
          If you have any questions about this disclaimer or believe any information on this site is inaccurate, please contact us.
        </p>
        <Link href="/contact" className="inline-block px-5 py-2 rounded-lg font-semibold text-sm"
          style={{ background: "#1A3A8F", color: "#fff", border: "2px solid #0D0D0D" }}>
          Contact Us
        </Link>
      </div>

      {/* Links */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/about" className="text-sm font-medium hover:underline" style={{ color: "#1A3A8F" }}>About Us</Link>
        <span className="text-gray-300">|</span>
        <Link href="/privacy" className="text-sm font-medium hover:underline" style={{ color: "#1A3A8F" }}>Privacy Policy</Link>
        <span className="text-gray-300">|</span>
        <Link href="/contact" className="text-sm font-medium hover:underline" style={{ color: "#1A3A8F" }}>Contact</Link>
      </div>

    </main>
  );
}
