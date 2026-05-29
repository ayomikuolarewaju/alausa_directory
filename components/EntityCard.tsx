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

  return (
    <Link href={href}>
      <div
        className="card-hover bg-white rounded-lg overflow-hidden cursor-pointer h-full flex flex-col"
        style={{ border: "2px solid #0D0D0D", boxShadow: "4px 4px 0px #0D0D0D" }}
      >
        {/* Color bar */}
        <div style={{ background: color.bg, height: 6 }} />

        <div className="p-5 flex flex-col gap-3 flex-1">
          {/* Badge */}
          <span
            className="text-xs font-semibold uppercase tracking-widest px-2 py-1 rounded self-start"
            style={{ background: color.bg, color: color.text }}
          >
            {entity.category}
          </span>

          <h3 className="font-display font-bold text-lg leading-snug" style={{ color: "#0D0D0D" }}>
            {entity.name}
          </h3>

          <p className="text-sm text-gray-600 flex-1 line-clamp-2">{entity.description}</p>

          <div className="flex items-center gap-2 text-sm mt-auto">
            <span style={{ color: "#D42B2B" }}>📍</span>
            <span className="text-gray-500">{entity.location}</span>
          </div>

          {entity.officers[0] && (
            <div
              className="text-xs px-3 py-2 rounded"
              style={{ background: "#FAFAF5", border: "1px solid #e5e7eb" }}
            >
              <span className="font-semibold">{entity.officers[0].name}</span>
              <span className="text-gray-500"> — {entity.officers[0].title}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
