import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/GuideLayout";

export const metadata: Metadata = {
  title: "Lagos BRT and Bus Reform Fares in 2026",
  description:
    "A guide to the reported 13% March 2026 fare increase on Lagos BRT and Bus Reform Initiative services, with example fares and budgeting tips.",
  alternates: {
    canonical: "https://www.alausadirectory.com/guides/brt-fares-2026",
  },
};

export default function Page() {
  return (
    <GuideLayout
      title="Lagos BRT and Bus Reform Fares in 2026: What Changed in March"
      intro="Reports said Lagos State approved a 13% fare increase for BRT and standard routes under the Bus Reform Initiative, effective 2 March 2026. The examples below are press-reported figures, not a complete or current official fare table."
      path="/guides/brt-fares-2026"
      datePublished="2026-11-17"
      dateModified="2026-11-17"
      updated="17 November 2026"
      sources={[
        {
          label: "Nairametrics: Lagos raises BRT and BRI bus fares by 13%",
          href: "https://nairametrics.com/2026/02/23/lagos-raises-brt-and-bri-bus-fares-by-13-starting-march-2/",
        },
        {
          label: "Telegraph Nigeria: revised BRT fares after 13% hike",
          href: "https://telegraph.ng/?p=32038",
        },
      ]}
    >
      <section>
        <h2 className="font-display text-xl font-bold">The reported change</h2>
        <p className="mt-2 leading-relaxed text-gray-700">
          Nairametrics reported that a 13% fare adjustment for BRT and standard Bus Reform Initiative routes
          took effect on 2 March 2026. The report attributed the announcement to LAMATA and said rising
          operating costs were among the reasons for the review. Check with LAMATA for the current fare on
          your specific route.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold">Example fares reported after the increase</h2>
        <p className="mt-2 leading-relaxed text-gray-700">
          Press reports listed the following standard-route examples. These figures are not a full price list
          and may not reflect current fares:
        </p>
        <ul className="mt-2 list-disc space-y-2 pl-6 leading-relaxed text-gray-700">
          <li>Igando to Obalende: ₦1,140</li>
          <li>Marina to Lekki: ₦570</li>
          <li>Ikeja to Berger: ₦470</li>
          <li>Berger to Ajah: ₦1,710</li>
          <li>Ikorodu to Mile 12: ₦450</li>
        </ul>
        <p className="mt-2 leading-relaxed text-gray-700">
          Dedicated BRT corridor fares may differ from standard routes. Confirm the exact fare before you
          travel.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold">Budgeting a regular commute</h2>
        <p className="mt-2 leading-relaxed text-gray-700">
          For one route each way on five working days, multiply the single fare by ten for a weekly estimate.
          For example, at a reported ₦470 single fare, that would be ₦4,700 before any other journeys or
          card costs. Recalculate with the current fare for your route.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold">Paying for regulated bus services</h2>
        <p className="mt-2 leading-relaxed text-gray-700">
          LAMATA&apos;s published notice says commuters should use approved electronic payment channels on
          regulated bus services. See our{" "}
          <Link href="/guides/cashless-cowry-card" className="font-semibold underline" style={{ color: "#1A3A8F" }}>
            Cowry card and cashless bus guide
          </Link>{" "}
          for details, and verify any current payment rules with LAMATA.
        </p>
      </section>
    </GuideLayout>
  );
}
