import Link from "next/link";

type Props = {
  name: string;
  description: string;
  color: string;
  status: string;
  stats: { label: string; value: string }[];
  href: string;
};

export default function LineCard({ name, description, color, status, stats, href }: Props) {
  const isOperational = status === "Operational";
  return (
    <Link href={href}>
      <div className="card-hover rounded-2xl overflow-hidden h-full"
        style={{ border: "2px solid #0D0D0D", boxShadow: "4px 4px 0 #0D0D0D" }}>
        <div style={{ background: color, padding: "24px" }}>
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-display font-black text-white text-2xl">{name}</h2>
            <span className="text-xs font-bold px-2 py-1 rounded flex-shrink-0"
              style={{ background: isOperational ? "#F5C518" : "rgba(255,255,255,0.2)", color: isOperational ? "#0D0D0D" : "#fff" }}>
              {status}
            </span>
          </div>
        </div>
        <div className="bg-white p-5 flex flex-col gap-4 flex-1">
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
          <div className="grid grid-cols-3 gap-2 mt-auto">
            {stats.map(s => (
              <div key={s.label} className="text-center py-2 rounded-lg"
                style={{ background: "#FAFAF5", border: "1px solid #e5e7eb" }}>
                <p className="font-bold text-sm" style={{ color }}>{s.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end">
            <span className="text-xs font-bold px-3 py-1.5 rounded-lg"
              style={{ background: color, color: "#fff" }}>
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
