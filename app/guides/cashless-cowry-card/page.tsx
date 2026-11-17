import type { Metadata } from "next";
import GuideLayout from "@/components/GuideLayout";

export const metadata: Metadata = {
  title: "Lagos Cashless Bus Rule: Cowry Card Guide",
  description:
    "What the August 2026 cashless rule on Lagos regulated buses means, where to get a Cowry card and how to report cash payment requests.",
  alternates: {
    canonical: "https://www.alausadirectory.com/guides/cashless-cowry-card",
  },
};

export default function Page() {
  return (
    <GuideLayout
      title="Lagos Cashless Bus Rule: How to Get and Use a Cowry Card"
      intro="LAMATA announced that, from 1 August 2026, enforcement against cash fare collection on regulated bus services would extend to commuters who knowingly offer cash. Here is what the published notice says and what to check before travelling."
      path="/guides/cashless-cowry-card"
      datePublished="2026-11-17"
      dateModified="2026-11-17"
      updated="17 November 2026"
      sources={[
        {
          label: "LAMATA: cash fare payments on regulated bus services (27 July 2026)",
          href: "https://www.lamata-ng.com/2026/07/27/lamata-warns-commuters-cash-fare-payments-on-regulated-bus-services-become-punishable-from-august-1/",
        },
      ]}
    >
      <section>
        <h2 className="font-display text-xl font-bold">What changed</h2>
        <p className="mt-2 leading-relaxed text-gray-700">
          LAMATA said its cashless policy would be enforced on commuters as well as drivers and ground staff
          from 1 August 2026. Its notice says passengers who knowingly pay cash on a regulated bus service can
          face arrest and prosecution. It does not state fine amounts or sentence lengths, and it does not
          clarify whether the rule applies to Blue Line or Red Line trains. Check with LAMATA if you are unsure
          about a particular service.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold">Which services are affected?</h2>
        <p className="mt-2 leading-relaxed text-gray-700">
          The announcement refers to regulated bus services under LAMATA&apos;s supervision. It does not provide a
          complete list of every affected route or operator. Do not assume a service is exempt based only on
          the vehicle&apos;s appearance; ask the operator or LAMATA when uncertain.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold">Getting a Cowry card</h2>
        <p className="mt-2 leading-relaxed text-gray-700">
          LAMATA&apos;s notice says Cowry cards can be purchased at designated bus stops and Blue Line and Red Line
          train stations for ₦500, after which commuters can load the required fare. The ₦500 is the stated
          card price, not a journey fare. Confirm availability and top-up options with the operator before
          making a special trip.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold">Practical checks before travelling</h2>
        <ul className="mt-2 list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
          <li>Make sure your card has enough balance before boarding.</li>
          <li>Ask the operator about approved electronic payment channels if you need to top up.</li>
          <li>If a staff member requests cash on a regulated service, use LAMATA&apos;s official contact channels to confirm and report it.</li>
          <li>Do not rely on this guide for routes or enforcement details not covered by the published notice.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold">Why the policy matters</h2>
        <p className="mt-2 leading-relaxed text-gray-700">
          LAMATA says cash collection undermines fare-system integrity and operator revenue. The authority
          encourages passengers to use approved electronic payment channels and report cash collection on
          regulated public transport.
        </p>
      </section>
    </GuideLayout>
  );
}
