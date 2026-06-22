import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for the Lagos State Government Directory. Learn what data we collect, how we use it and your rights regarding your personal information.",
  alternates: { canonical: "https://www.lagosdirectory.gov.ng/privacy" },
};

const sections = [
  {
    icon: "📋",
    title: "Information We Collect",
    content: [
      {
        subtitle: "Contact Form Submissions",
        text: "When you submit the contact form, we collect your name, email address, subject and message. This information is used solely to respond to your enquiry.",
      },
      {
        subtitle: "Analytics Data",
        text: "We use analytics tools (such as Google Analytics) to collect anonymised information about how visitors use this website — including pages visited, time spent and general geographic location (country/city level). We do not collect personally identifiable information through analytics.",
      },
      {
        subtitle: "Cookies",
        text: "This website may use cookies to improve your browsing experience and support analytics. You can disable cookies in your browser settings at any time, though some features may not function correctly without them.",
      },
      {
        subtitle: "Log Data",
        text: "Like most websites, our servers may automatically log standard technical data including your IP address, browser type, referring page and access timestamps. This data is used for security and performance monitoring only.",
      },
    ],
  },
  {
    icon: "🔒",
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "Contact Form Data",
        text: "Information submitted via our contact form is used only to respond to your message. We do not sell, share or transfer your contact details to any third party.",
      },
      {
        subtitle: "Analytics",
        text: "Anonymised usage data helps us understand which pages are most useful, improve site content and demonstrate audience reach to potential partners and advertisers. No personally identifiable data is used for advertising targeting.",
      },
      {
        subtitle: "We Never",
        text: "We never sell your personal data. We never send unsolicited marketing emails. We never share your information with the Lagos State Government or any government body.",
      },
    ],
  },
  {
    icon: "🌐",
    title: "Third-Party Services",
    content: [
      {
        subtitle: "Google Analytics",
        text: "We may use Google Analytics to track website traffic. Google Analytics collects anonymised data subject to Google's Privacy Policy (policies.google.com/privacy). You can opt out using the Google Analytics Opt-out Browser Add-on.",
      },
      {
        subtitle: "Google Maps",
        text: "LGA detail pages embed Google Maps iframes. When you interact with a map, Google's own privacy policy applies. We do not pass any personal data to Google Maps.",
      },
      {
        subtitle: "Google AdSense",
        text: "We may display Google AdSense advertisements. Google may use cookies to serve ads based on your prior visits to this or other websites. You can opt out of personalised ads at Google's Ad Settings (adssettings.google.com).",
      },
      {
        subtitle: "Email (Nodemailer / Gmail)",
        text: "Contact form submissions are processed via Nodemailer and delivered through a Gmail SMTP account. Your message content is transmitted to our email inbox and is not stored in any third-party database.",
      },
    ],
  },
  {
    icon: "👶",
    title: "Children's Privacy",
    content: [
      {
        subtitle: "",
        text: "This website is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has submitted personal information to us, please contact us and we will delete it promptly.",
      },
    ],
  },
  {
    icon: "🛡️",
    title: "Data Security",
    content: [
      {
        subtitle: "",
        text: "We take reasonable technical and organisational measures to protect any personal information we hold. Contact form data is transmitted over HTTPS and delivered directly to our inbox. We do not store contact form submissions in any database. However, no internet transmission is 100% secure and we cannot guarantee absolute security.",
      },
    ],
  },
  {
    icon: "⚖️",
    title: "Your Rights",
    content: [
      {
        subtitle: "",
        text: "You have the right to request access to any personal data we hold about you, request correction or deletion of your data, and withdraw consent for processing at any time. To exercise any of these rights, contact us via the contact form. We will respond within 30 days.",
      },
    ],
  },
  {
    icon: "🔗",
    title: "External Links",
    content: [
      {
        subtitle: "",
        text: "This website links to external government websites and third-party resources. We are not responsible for the privacy practices of those websites. We encourage you to read the privacy policies of any external site you visit through our links.",
      },
    ],
  },
  {
    icon: "🔄",
    title: "Changes to This Policy",
    content: [
      {
        subtitle: "",
        text: "We may update this Privacy Policy from time to time. The date of the most recent revision is shown below. We encourage you to review this page periodically. Continued use of this website after changes are posted constitutes your acceptance of the updated policy.",
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="mb-10">
        <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4"
          style={{ background: "#1B7A3E", color: "#fff" }}>
          Legal
        </div>
        <h1 className="font-display font-black text-4xl md:text-5xl mb-3">Privacy Policy</h1>
        <p className="text-gray-500 text-sm">Last updated: June 2026 &mdash; Effective immediately</p>
      </div>

      {/* Intro */}
      <div className="rounded-xl p-5 mb-8"
        style={{ background: "#F0FDF4", border: "2px solid #1B7A3E" }}>
        <p className="text-sm text-gray-700 leading-relaxed">
          Your privacy matters to us. This policy explains what information the Lagos State Government Directory collects, how we use it and what choices you have. We keep this simple and honest — no legal jargon.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map((section, i) => (
          <div key={i} className="rounded-xl bg-white overflow-hidden"
            style={{ border: "2px solid #0D0D0D" }}>
            <div className="px-6 py-4 flex items-center gap-3"
              style={{ background: "#1B7A3E" }}>
              <span className="text-xl">{section.icon}</span>
              <h2 className="font-display font-bold text-white text-lg">{i + 1}. {section.title}</h2>
            </div>
            <div className="p-6 space-y-4">
              {section.content.map((item, j) => (
                <div key={j}>
                  {item.subtitle && (
                    <p className="font-semibold text-sm mb-1" style={{ color: "#1A3A8F" }}>{item.subtitle}</p>
                  )}
                  <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact for privacy */}
      <div className="mt-8 rounded-xl p-5 bg-white" style={{ border: "2px solid #0D0D0D" }}>
        <h2 className="font-bold text-base mb-2">Privacy Enquiries</h2>
        <p className="text-sm text-gray-600 mb-3">
          For any questions about this Privacy Policy, data requests or concerns about how your information is handled, please contact us.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="inline-block px-5 py-2 rounded-lg font-semibold text-sm"
            style={{ background: "#1B7A3E", color: "#fff", border: "2px solid #0D0D0D" }}>
            Contact Us
          </Link>
          <a href="mailto:almaroofolarewaju@gmail.com"
            className="inline-block px-5 py-2 rounded-lg font-semibold text-sm"
            style={{ background: "#fff", color: "#0D0D0D", border: "2px solid #0D0D0D" }}>
            almaroofolarewaju@gmail.com
          </a>
        </div>
      </div>

      {/* Bottom links */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/about" className="text-sm font-medium hover:underline" style={{ color: "#1A3A8F" }}>About Us</Link>
        <span className="text-gray-300">|</span>
        <Link href="/disclaimer" className="text-sm font-medium hover:underline" style={{ color: "#1A3A8F" }}>Disclaimer</Link>
        <span className="text-gray-300">|</span>
        <Link href="/contact" className="text-sm font-medium hover:underline" style={{ color: "#1A3A8F" }}>Contact</Link>
      </div>

    </main>
  );
}
