type FareTier = {
  zones: string;
  fare: number;
};

type Props = {
  fares: FareTier[];
  color: string;
  title?: string;
  note?: string;
};

export default function FareCard({ fares, color, title = "Fares", note }: Props) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "2px solid #0D0D0D" }}>
      <div className="px-5 py-4" style={{ background: color }}>
        <h3 className="font-display font-bold text-white text-lg">🎟️ {title}</h3>
      </div>
      <div className="bg-white divide-y divide-gray-100">
        {fares.map((tier, i) => (
          <div key={i} className="flex items-center justify-between px-5 py-3">
            <span className="text-sm text-gray-600">{tier.zones}</span>
            <span className="font-display font-bold text-lg" style={{ color }}>
              ₦{tier.fare.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      {note && (
        <div className="px-5 py-3 text-xs text-gray-500"
          style={{ background: "#FAFAF5", borderTop: "1px solid #e5e7eb" }}>
          {note}
        </div>
      )}
    </div>
  );
}
