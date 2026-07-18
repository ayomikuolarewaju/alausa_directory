import Link from "next/link";
import { Entity } from "@/lib/data";

const categoryColor: Record<Entity["category"], { bg: string; text: string; border: string }> = {
  ministry: { bg: "#1A3A8F", text: "#fff", border: "#1A3A8F" },
  agency: { bg: "#D42B2B", text: "#fff", border: "#D42B2B" },
  parastatal: { bg: "#1B7A3E", text: "#fff", border: "#1B7A3E" },
};

export default function EntityCard({ entity }: { entity: Entity }) {
  const color = categoryColor[entity.category];
  const href = `/${entity.category === "ministry" ? "ministries" : entity.category === "agency" ? "agencies" : "parastatals"}/${entity.id}`;

  // Get the first officer with a name, or null if all are empty
  const primaryOfficer = entity.officers.find(o => o.name?.trim()) ?? null;
  const hasEmptyOfficers = entity.officers.some(o => !o.name?.trim());

  return (
    <Link href={href}>
      <div
        className="card-hover bg-white rounded-lg overflow-hidden cursor-pointer h-full flex flex-col"
        style={{ border: "2px solid #0D0D0D", boxShadow: "4px 4px 0px #0D0D0D" }}
      >
        {/* Color bar */}
        <div style={{ background: color.bg, height: 6 }} />

        <div className="p-5 flex flex-col gap-3 flex-1">
          {/* Top row: Badge + Verification */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-xs font-semibold uppercase tracking-widest px-2 py-1 rounded"
              style={{ background: color.bg, color: color.text }}
            >
              {entity.category}
            </span>

            {entity.verified && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                Verified
              </span>
            )}

            {entity.needsVerification && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                Needs Check
              </span>
            )}
          </div>

          {/* Name */}
          <h3 className="font-display font-bold text-lg leading-snug" style={{ color: "#0D0D0D" }}>
            {entity.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 flex-1 line-clamp-2">{entity.description}</p>

          {/* Location + Block */}
          <div className="flex items-center gap-2 text-sm">
            <span style={{ color: "#D42B2B" }}>📍</span>
            <span className="text-gray-500">{entity.location}</span>
            {entity.block && (
              <span className="text-xs text-gray-400">· {entity.block}</span>
            )}
          </div>

          {/* Primary Officer */}
          {primaryOfficer ? (
            <div
              className="text-xs px-3 py-2 rounded"
              style={{ background: "#FAFAF5", border: "1px solid #e5e7eb" }}
            >
              <span className="font-semibold">{primaryOfficer.name}</span>
              <span className="text-gray-500"> — {primaryOfficer.title}</span>
              {primaryOfficer.verified && (
                <span className="ml-1 text-emerald-600">✓</span>
              )}
            </div>
          ) : hasEmptyOfficers ? (
            <div
              className="text-xs px-3 py-2 rounded"
              style={{ background: "#FEFCE8", border: "1px solid #fde047" }}
            >
              <span className="text-amber-700">⚠️ Officer info pending verification</span>
            </div>
          ) : null}

          {/* Last Updated */}
          {entity.lastUpdated && (
            <p className="text-xs text-gray-400">Updated: {entity.lastUpdated}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
