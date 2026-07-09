import Link from "next/link";

type Props = {
  title: string;
  subtitle: string;
  badge?: string;
  color: string;
  stats?: { label: string; value: string }[];
  backHref?: string;
  backLabel?: string;
};

export default function TransportHero({ title, subtitle, badge, color, stats, backHref, backLabel }: Props) {
  return (
    <section style={{ background: color, borderBottom: "4px solid #F5C518" }}>
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {backHref && (
          <Link href={backHref}
            className="inline-flex items-center gap-2 text-xs font-semibold mb-6 px-3 py-1.5 rounded-lg"
            style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}>
            ← {backLabel ?? "Back"}
          </Link>
        )}
        {badge && (
          <div className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4"
            style={{ background: "#F5C518", color: "#0D0D0D" }}>
            {badge}
          </div>
        )}
        <h1 className="font-display font-black text-white text-4xl md:text-5xl mb-3">{title}</h1>
        <p className="text-white opacity-80 text-lg max-w-2xl">{subtitle}</p>

        {stats && stats.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-8">
            {stats.map(s => (
              <div key={s.label} className="px-4 py-2 rounded-lg text-center"
                style={{ background: "rgba(255,255,255,0.15)" }}>
                <p className="text-white font-bold text-lg leading-none">{s.value}</p>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
