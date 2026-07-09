export type NoticeType = "info" | "warning" | "disruption" | "success";

export type ServiceNotice = {
  id: string;
  type: NoticeType;
  title: string;
  body: string;
  affectedLines: string[];
  date: string;
  active: boolean;
};

export const serviceNotices: ServiceNotice[] = [
  {
    id: "sn-001",
    type: "success",
    title: "Blue Line — Full Service Operational",
    body: "The Lagos Blue Line is running at full service across all 13 stations. Trains are running on schedule with no reported disruptions.",
    affectedLines: ["Blue Line"],
    date: "July 2026",
    active: true,
  },
  {
    id: "sn-002",
    type: "info",
    title: "Red Line — Construction Update",
    body: "The Red Line is currently under construction. Trial runs are expected to begin in late 2025, with full commercial operations projected for 2026. Follow LAMATA official channels for updates.",
    affectedLines: ["Red Line"],
    date: "July 2026",
    active: true,
  },
  {
    id: "sn-003",
    type: "warning",
    title: "BRT Route 1 — Peak Hour Delays",
    body: "Passengers on the Lagos Island–Ikorodu corridor may experience delays of 10–20 minutes during morning peak hours (7:00–9:00 AM) due to traffic on the approach to CMS. LAMATA is working with traffic management authorities to resolve this.",
    affectedLines: ["BRT Route 1"],
    date: "July 2026",
    active: true,
  },
  {
    id: "sn-004",
    type: "info",
    title: "Ferry — Weather Advisory",
    body: "Passengers are advised to check weather conditions before travelling on long-distance ferry routes (Marina–Badagry). Services may be suspended during adverse weather. Call 01-2700900 for real-time updates.",
    affectedLines: ["Ferry"],
    date: "July 2026",
    active: true,
  },
  {
    id: "sn-005",
    type: "info",
    title: "New Fare Payment — Cowry Card",
    body: "LAMATA has introduced the Cowry Card contactless payment system across all Blue Line stations and selected BRT terminals. Top up your card at any station ticket office or online at cowrycard.ng.",
    affectedLines: ["Blue Line", "BRT"],
    date: "June 2026",
    active: true,
  },
];

export const noticeStyles: Record<NoticeType, { bg: string; border: string; icon: string; label: string }> = {
  info:       { bg: "#EFF6FF", border: "#1A3A8F", icon: "ℹ️", label: "Info" },
  warning:    { bg: "#FFFBEB", border: "#EAB308", icon: "⚠️", label: "Advisory" },
  disruption: { bg: "#FEF2F2", border: "#D42B2B", icon: "🚨", label: "Disruption" },
  success:    { bg: "#F0FDF4", border: "#1B7A3E", icon: "✅", label: "All Clear" },
};
