type Station = {
  id: string;
  name: string;
  zone: number;
  interchange?: string[];
  facilities: string[];
  isTerminal?: boolean;
};

type Props = {
  stations: Station[];
  color: string;
  title?: string;
};

export default function StationList({ stations, color, title = "Stations" }: Props) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "2px solid #0D0D0D" }}>
      <div className="px-5 py-4 flex items-center justify-between" style={{ background: color }}>
        <h3 className="font-display font-bold text-white text-lg">🚉 {title}</h3>
        <span className="text-xs font-bold px-2 py-1 rounded"
          style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
          {stations.length} stops
        </span>
      </div>

      <div className="bg-white">
        {stations.map((station, i) => (
          <div key={station.id}
            className="flex items-start gap-4 px-5 py-3"
            style={{ borderBottom: i < stations.length - 1 ? "1px solid #f3f4f6" : "none" }}>

            {/* Line indicator */}
            <div className="flex flex-col items-center flex-shrink-0 mt-1">
              <div className="w-4 h-4 rounded-full border-2 border-white flex-shrink-0"
                style={{
                  background: station.isTerminal ? color : "#fff",
                  border: `2px solid ${color}`,
                  boxShadow: station.isTerminal ? `0 0 0 3px ${color}40` : "none",
                }} />
              {i < stations.length - 1 && (
                <div className="w-0.5 h-6 mt-0.5" style={{ background: `${color}60` }} />
              )}
            </div>

            {/* Station info */}
            <div className="flex-1 min-w-0 pb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm">{station.name}</span>
                {station.isTerminal && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ background: color, color: "#fff" }}>
                    Terminal
                  </span>
                )}
                <span className="text-xs text-gray-400">Zone {station.zone}</span>
              </div>

              {station.interchange && station.interchange.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {station.interchange.map(ic => (
                    <span key={ic} className="text-xs px-2 py-0.5 rounded"
                      style={{ background: "#F5C518", color: "#0D0D0D", fontWeight: 600 }}>
                      🔄 {ic}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-1 mt-1">
                {station.facilities.slice(0, 4).map(f => (
                  <span key={f} className="text-xs px-1.5 py-0.5 rounded text-gray-500"
                    style={{ background: "#FAFAF5", border: "1px solid #e5e7eb" }}>
                    {f}
                  </span>
                ))}
                {station.facilities.length > 4 && (
                  <span className="text-xs text-gray-400">+{station.facilities.length - 4} more</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
