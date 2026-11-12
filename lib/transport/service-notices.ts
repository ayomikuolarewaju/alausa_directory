export type NoticeType = "info" | "warning" | "disruption" | "success";

export type ServiceNotice = {
  id: string;
  type: NoticeType;
  title: string;
  body: string;
  affectedLines: string[];
  date: string;
  active: boolean;
  sourceUrl?: string;
  sourceLabel?: string;
};

export const serviceNotices: ServiceNotice[] = [
  {
    id: "sn-001",
    type: "info",
    title: "Blue Line — Current service and planned extension",
    body: "LAMATA lists five operating stations on the Marina–Mile 2 service. FESTAC, Alakija and Trade Fair are planned to open by the end of February 2027; they are not currently in service.",
    affectedLines: ["Blue Line"],
    date: "23 October 2026",
    active: true,
    sourceUrl: "https://www.lamata-ng.com/2026/10/23/lagos-blue-line-expansion-three-new-stations-to-open-by-february-2027/",
    sourceLabel: "LAMATA expansion announcement",
  },
  {
    id: "sn-002",
    type: "info",
    title: "Red Line — Published Timetable",
    body: "LAMATA's published timetable lists nine Monday–Friday trips between Oyingbo and Agbado. A 24-trip expansion was planned for Q4 2026, but the timetable still lists nine and the expansion is not confirmed here.",
    affectedLines: ["Red Line"],
    date: "Checked 12 November 2026",
    active: true,
    sourceUrl: "https://www.lamata-ng.com/our-schedule/redline-train-schedule/",
    sourceLabel: "LAMATA Red Line timetable",
  },
  {
    id: "sn-003",
    type: "warning",
    title: "BRT Route 1 — Peak Hour Delays",
    body: "Passengers on the Lagos Island–Ikorodu corridor may experience delays of 10–20 minutes during morning peak hours (7:00–9:00 AM) due to traffic on the approach to CMS. LAMATA is working with traffic management authorities to resolve this.",
    affectedLines: ["BRT Route 1"],
    date: "July 2026",
    active: false,
  },
  {
    id: "sn-004",
    type: "info",
    title: "Ferry — Weather Advisory",
    body: "Passengers are advised to check weather conditions before travelling on long-distance ferry routes (Marina–Badagry). Services may be suspended during adverse weather. Call 01-2700900 for real-time updates.",
    affectedLines: ["Ferry"],
    date: "July 2026",
    active: false,
  },
  {
    id: "sn-005",
    type: "info",
    title: "Cowry Card — purchase and fare payment",
    body: "LAMATA describes Cowry as its smart-card fare-payment system. A July 2026 notice said cards are sold at designated bus stops and Blue and Red Line stations for ₦500. That is the card price, not a journey fare; check LAMATA for current reload options.",
    affectedLines: ["Blue Line", "Red Line", "BRT"],
    date: "27 July 2026",
    active: true,
    sourceUrl: "https://www.lamata-ng.com/2026/07/27/lamata-warns-commuters-cash-fare-payments-on-regulated-bus-services-become-punishable-from-august-1/",
    sourceLabel: "LAMATA Cowry card notice",
  },
];

export const noticeStyles: Record<NoticeType, { bg: string; border: string; icon: string; label: string }> = {
  info:       { bg: "#EFF6FF", border: "#1A3A8F", icon: "ℹ️", label: "Info" },
  warning:    { bg: "#FFFBEB", border: "#EAB308", icon: "⚠️", label: "Advisory" },
  disruption: { bg: "#FEF2F2", border: "#D42B2B", icon: "🚨", label: "Disruption" },
  success:    { bg: "#F0FDF4", border: "#1B7A3E", icon: "✅", label: "All Clear" },
};
