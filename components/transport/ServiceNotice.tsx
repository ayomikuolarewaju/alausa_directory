import { noticeStyles } from "@/lib/transport/service-notices";
import type { ServiceNotice as Notice } from "@/lib/transport/service-notices";

type Props = {
  notices: Notice[];
  filterLines?: string[];
  title?: string;
};

export default function ServiceNotice({ notices, filterLines, title = "Service Notices" }: Props) {
  const filtered = filterLines
    ? notices.filter(n => n.active && n.affectedLines.some(l => filterLines.includes(l)))
    : notices.filter(n => n.active);

  if (filtered.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="font-display font-bold text-xl">{title}</h3>
      {filtered.map(notice => {
        const style = noticeStyles[notice.type];
        return (
          <div key={notice.id} className="rounded-xl p-4"
            style={{ background: style.bg, border: `2px solid ${style.border}` }}>
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">{style.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-bold text-sm">{notice.title}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded"
                    style={{ background: style.border, color: "#fff" }}>
                    {style.label}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{notice.body}</p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {notice.affectedLines.map(line => (
                    <span key={line} className="text-xs text-gray-500 px-2 py-0.5 rounded"
                      style={{ background: "rgba(0,0,0,0.06)" }}>
                      {line}
                    </span>
                  ))}
                  <span className="text-xs text-gray-400 ml-auto">{notice.date}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
