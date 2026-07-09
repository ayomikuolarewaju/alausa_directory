export type BRTRoute = {
  id: string;
  name: string;
  corridor: string;
  color: string;
  from: string;
  to: string;
  distance: string;
  stops: number;
  journeyTime: string;
  fare: number;
  status: "Operational" | "Coming Soon";
  frequency: string;
  keyStops: string[];
  firstBus: string;
  lastBus: string;
};

export const brtData = {
  operator: "Lagos Metropolitan Area Transport Authority (LAMATA)",
  description:
    "The Lagos BRT (Bus Rapid Transit) system is West Africa's largest BRT network, operating dedicated bus lanes across major corridors in Lagos. With over 220 buses and serving hundreds of thousands of passengers daily, the BRT is the backbone of Lagos public transport.",
  overview: [
    { label: "Daily Passengers", value: "200,000+" },
    { label: "Fleet Size",       value: "220+ buses" },
    { label: "Active Routes",    value: "5 corridors" },
    { label: "Launched",         value: "March 2008" },
    { label: "Operator",         value: "LAMATA / Primero" },
    { label: "Bus Type",         value: "CNG & Diesel Articulated" },
  ],
  routes: [
    {
      id: "brt-1",
      name: "Route 1 — Lagos Island–Ikorodu",
      corridor: "Lagos Island to Ikorodu",
      color: "#E05C00",
      from: "TBS (Tafawa Balewa Square)",
      to: "Ikorodu Terminal",
      distance: "35 km",
      stops: 22,
      journeyTime: "45–60 minutes",
      fare: 600,
      status: "Operational",
      frequency: "Every 5–10 minutes (peak)",
      firstBus: "05:00",
      lastBus: "22:00",
      keyStops: [
        "TBS", "CMS", "Obalende", "Costain", "Yaba", "Ojota",
        "Ketu", "Mile 12", "Owode-Onirin", "Ikorodu Terminal",
      ],
    },
    {
      id: "brt-2",
      name: "Route 2 — Oshodi–Abule Egba",
      corridor: "Oshodi to Abule Egba",
      color: "#0057A8",
      from: "Oshodi Terminal",
      to: "Abule Egba",
      distance: "18 km",
      stops: 14,
      journeyTime: "30–40 minutes",
      fare: 400,
      status: "Operational",
      frequency: "Every 10–15 minutes",
      firstBus: "05:30",
      lastBus: "21:30",
      keyStops: [
        "Oshodi", "Ikeja Along", "Agege", "Pen Cinema",
        "Iyana-Ipaja", "Abule Egba",
      ],
    },
    {
      id: "brt-3",
      name: "Route 3 — Mile 12–Lagos Island",
      corridor: "Mile 12 to CMS",
      color: "#1B7A3E",
      from: "Mile 12 Terminal",
      to: "CMS (Marina)",
      distance: "22 km",
      stops: 16,
      journeyTime: "35–50 minutes",
      fare: 500,
      status: "Operational",
      frequency: "Every 8–12 minutes",
      firstBus: "05:00",
      lastBus: "22:30",
      keyStops: [
        "Mile 12", "Ketu", "Ojota", "Maryland", "Onipanu",
        "Palmgrove", "Fadeyi", "Jibowu", "Yaba", "Oyingbo", "CMS",
      ],
    },
    {
      id: "brt-4",
      name: "Route 4 — Lekki–Ajah Express",
      corridor: "CMS to Ajah",
      color: "#8B5CF6",
      from: "CMS (Marina)",
      to: "Ajah Terminal",
      distance: "30 km",
      stops: 18,
      journeyTime: "40–55 minutes",
      fare: 700,
      status: "Operational",
      frequency: "Every 10–15 minutes",
      firstBus: "05:30",
      lastBus: "22:00",
      keyStops: [
        "CMS", "Obalende", "Falomo", "VI (Eko Hotel)", "Lekki Phase 1",
        "Chevron", "Jakande", "Sangotedo", "Ajah",
      ],
    },
    {
      id: "brt-5",
      name: "Route 5 — Badagry Express",
      corridor: "Mile 2 to Badagry",
      color: "#D42B2B",
      from: "Mile 2 Terminal",
      to: "Badagry Terminal",
      distance: "55 km",
      stops: 12,
      journeyTime: "60–80 minutes",
      fare: 900,
      status: "Coming Soon",
      frequency: "Every 20–30 minutes (projected)",
      firstBus: "06:00",
      lastBus: "20:00",
      keyStops: [
        "Mile 2", "Festac", "Satellite Town", "Ojo", "Alaba",
        "Trade Fair", "Agbara Junction", "Badagry",
      ],
    },
  ] as BRTRoute[],

  rules: [
    "Queue at designated BRT bus stops only",
    "Do not board or alight between stops",
    "Pay the correct fare before boarding — no change given",
    "No eating, drinking or smoking on buses",
    "Priority boarding for elderly, pregnant and disabled passengers",
    "Keep luggage below the seat — no standing in aisles",
    "Report misconduct or emergencies to the conductor",
  ],

  terminals: [
    { name: "TBS (Tafawa Balewa Square)", location: "Lagos Island", phone: "01-2700800" },
    { name: "Oshodi BRT Terminal",        location: "Oshodi, Mainland", phone: "01-2700801" },
    { name: "Mile 12 Terminal",           location: "Kosofe, Mainland", phone: "01-2700802" },
    { name: "Ikorodu Terminal",           location: "Ikorodu", phone: "01-2700803" },
    { name: "Ajah Terminal",              location: "Ajah, Eti-Osa", phone: "01-2700804" },
  ],
};
