import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Alausa Directory",
  description:
    "How Alausa Directory handles cookies, analytics, advertising and contact-form data.",
  alternates: { canonical: "https://www.alausadirectory.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl font-black">Privacy Policy</h1>
      <p className="mt-3 text-sm text-gray-500"><strong>Last updated:</strong> 17 November 2026</p>
      <p className="mt-5 leading-relaxed text-gray-700">
        Alausa Directory (“we”, “us”) is an independent civic information website and is not affiliated with
        the Lagos State Government. This policy explains what information is collected when you use this
        website and the choices available to you.
      </p>

      <section className="mt-8 space-y-3">
        <h2 className="font-display text-xl font-bold">1. Information we collect</h2>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
          <li><strong>Contact form:</strong> your name, email address, subject and message, used to respond to your enquiry.</li>
          <li><strong>Usage data:</strong> analytics may provide information such as pages visited, approximate location, device type, browser and referral source.</li>
          <li><strong>Technical data:</strong> our hosting, analytics and advertising partners may process IP address and browser details to provide and protect their services.</li>
        </ul>
        <p className="leading-relaxed text-gray-700">You do not need an account to browse the directory.</p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="font-display text-xl font-bold">2. Cookies and similar technologies</h2>
        <p className="leading-relaxed text-gray-700">
          Cookies, web beacons and similar technologies may be used to keep the site working, measure traffic
          and, if advertising is enabled, serve ads. You can control cookies through your browser settings;
          some site features may not work as intended if they are disabled.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="font-display text-xl font-bold">3. Advertising (Google AdSense)</h2>
        <p className="leading-relaxed text-gray-700">
          If Google AdSense advertising is enabled, Google and other vendors may use cookies, including the
          DoubleClick cookie, to serve ads based on your visits to this and other websites.
        </p>
        <ul className="list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
          <li>
            You can manage personalized advertising through{" "}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="underline">Google Ads Settings</a>.
            You can opt out of some third-party vendors&apos; personalized advertising cookies at{" "}
            <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="underline">aboutads.info</a>.
          </li>
          <li>
            Read{" "}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="underline">
              how Google uses information from sites or apps that use its services
            </a>.
          </li>
          <li>
            Where consent is legally required, personalized advertising should not be enabled until an
            appropriate consent mechanism is in place and consent has been provided.
          </li>
        </ul>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="font-display text-xl font-bold">4. Analytics</h2>
        <p className="leading-relaxed text-gray-700">
          Google Analytics helps us understand how the directory is used. You can block analytics cookies in
          your browser or use the{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="underline">
            Google Analytics opt-out add-on
          </a>.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="font-display text-xl font-bold">5. Third-party services and links</h2>
        <p className="leading-relaxed text-gray-700">
          Some pages embed Google Maps or link to government and transport websites. Those providers have
          their own privacy policies, which we do not control.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="font-display text-xl font-bold">6. Contact-form data</h2>
        <p className="leading-relaxed text-gray-700">
          We use messages to respond to you and do not sell your information or use it for advertising.
          Correspondence is kept only as long as needed to handle your request.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="font-display text-xl font-bold">7. Children</h2>
        <p className="leading-relaxed text-gray-700">
          This site is not directed at children under 13, and we do not knowingly collect personal
          information from them.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="font-display text-xl font-bold">8. Your rights</h2>
        <p className="leading-relaxed text-gray-700">
          Under the Nigeria Data Protection Act 2023, you may request access to, correction of or deletion
          of personal information we hold about you. Contact us using the details below.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="font-display text-xl font-bold">9. Changes to this policy</h2>
        <p className="leading-relaxed text-gray-700">
          We may update this policy from time to time. The “Last updated” date above shows the latest
          revision.
        </p>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="font-display text-xl font-bold">10. Contact</h2>
        <p className="leading-relaxed text-gray-700">
          Email <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a> or use the{" "}
          <Link href="/contact" className="underline">contact form</Link>.
        </p>
      </section>
    </main>
  );
}
