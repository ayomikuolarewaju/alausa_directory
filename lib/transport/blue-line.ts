export type Station = {
  id: string;
  name: string;
  zone: number;
  interchange?: string[];
  facilities: string[];
  coordinates: { lat: number; lng: number };
  isTerminal?: boolean;
};

export type ScheduleEntry = {
  day: "Weekday" | "Saturday" | "Sunday";
  firstTrain: string;
  lastTrain: string;
  frequency: string;
};

export type FareTier = {
  zones: string;
  fare: number;
};

export const blueLineData = {
  name: "Blue Line",
  fullName: "Lagos Blue Line Rail",
  color: "#0057A8",
  status: "Operational" as const,
  operator: "Lagos Metropolitan Area Transport Authority (LAMATA)",
  opened: "December 2022",
  length: "27 km",
  totalStations: 13,
  type: "Light Rail / Metro",
  description:
    "The Lagos Blue Line is Nigeria's first urban rail transit system, running from Marina on Lagos Island to Mile 2 on the Mainland. It runs along the waterfront of Lagos Harbour providing a fast, congestion-free alternative to road transport on one of Lagos's most congested corridors.",
  overview: [
    { label: "Line Length", value: "27 km" },
    { label: "Stations", value: "13" },
    { label: "Journey Time", value: "~35 minutes end to end" },
    { label: "Max Speed", value: "100 km/h" },
    { label: "Capacity", value: "800 passengers per train" },
    { label: "Status", value: "Operational" },
  ],
  stations: [
    {
      id: "marina",
      name: "Marina",
      zone: 1,
      interchange: ["Ferry Terminal", "Bus Connections"],
      facilities: ["Ticket Office", "Waiting Lounge", "Security", "CCTV", "Disability Access"],
      coordinates: { lat: 6.4509, lng: 3.3960 },
      isTerminal: true,
    },
    {
      id: "national-theatre",
      name: "National Theatre",
      zone: 1,
      facilities: ["Ticket Office", "Waiting Lounge", "Security"],
      coordinates: { lat: 6.4698, lng: 3.3764 },
    },
    {
      id: "ebute-metta",
      name: "Ebute Metta",
      zone: 2,
      interchange: ["NRC Railway"],
      facilities: ["Ticket Office", "Waiting Lounge", "Security", "CCTV"],
      coordinates: { lat: 6.4784, lng: 3.3700 },
    },
    {
      id: "oyingbo",
      name: "Oyingbo",
      zone: 2,
      facilities: ["Ticket Office", "Waiting Lounge", "Security"],
      coordinates: { lat: 6.4900, lng: 3.3750 },
    },
    {
      id: "iddo",
      name: "Iddo",
      zone: 2,
      interchange: ["NRC Terminus"],
      facilities: ["Ticket Office", "Waiting Lounge", "Security", "CCTV", "Parking"],
      coordinates: { lat: 6.4744, lng: 3.3828 },
    },
    {
      id: "ijora",
      name: "Ijora",
      zone: 2,
      facilities: ["Ticket Office", "Waiting Lounge", "Security"],
      coordinates: { lat: 6.4620, lng: 3.3650 },
    },
    {
      id: "iganmu",
      name: "Iganmu",
      zone: 2,
      facilities: ["Ticket Office", "Waiting Lounge", "Security"],
      coordinates: { lat: 6.4550, lng: 3.3490 },
    },
    {
      id: "orile",
      name: "Orile",
      zone: 3,
      facilities: ["Ticket Office", "Waiting Lounge", "Security", "CCTV"],
      coordinates: { lat: 6.4700, lng: 3.3400 },
    },
    {
      id: "oshodi",
      name: "Oshodi",
      zone: 3,
      interchange: ["BRT Hub", "Bus Connections"],
      facilities: ["Ticket Office", "Waiting Lounge", "Security", "CCTV", "Disability Access", "Retail"],
      coordinates: { lat: 6.5570, lng: 3.3480 },
    },
    {
      id: "airport",
      name: "Airport Road",
      zone: 3,
      facilities: ["Ticket Office", "Waiting Lounge", "Security", "CCTV"],
      coordinates: { lat: 6.5750, lng: 3.3210 },
    },
    {
      id: "ikeja",
      name: "Ikeja",
      zone: 3,
      interchange: ["Bus Connections", "Taxi"],
      facilities: ["Ticket Office", "Waiting Lounge", "Security", "CCTV", "Parking", "Disability Access"],
      coordinates: { lat: 6.5950, lng: 3.3381 },
    },
    {
      id: "agege",
      name: "Agege",
      zone: 4,
      facilities: ["Ticket Office", "Waiting Lounge", "Security"],
      coordinates: { lat: 6.6193, lng: 3.3192 },
    },
    {
      id: "mile-2",
      name: "Mile 2",
      zone: 4,
      interchange: ["BRT", "Bus Connections", "Danfo"],
      facilities: ["Ticket Office", "Waiting Lounge", "Security", "CCTV", "Parking", "Disability Access"],
      coordinates: { lat: 6.4728, lng: 3.2944 },
      isTerminal: true,
    },
  ] as Station[],

  schedule: [
    { day: "Weekday",  firstTrain: "05:30",  lastTrain: "22:00",  frequency: "Every 10–15 minutes" },
    { day: "Saturday", firstTrain: "06:00",  lastTrain: "21:00",  frequency: "Every 15–20 minutes" },
    { day: "Sunday",   firstTrain: "07:00",  lastTrain: "20:00",  frequency: "Every 20–30 minutes" },
  ] as ScheduleEntry[],

  fares: [
    { zones: "Zone 1–2 (1–3 stops)",  fare: 150 },
    { zones: "Zone 1–3 (4–7 stops)",  fare: 250 },
    { zones: "Zone 1–4 (8–13 stops)", fare: 350 },
    { zones: "Monthly Pass",           fare: 7500 },
    { zones: "Student Monthly",        fare: 4500 },
  ] as FareTier[],

  rules: [
    "No food or drinks on trains",
    "No smoking in stations or on trains",
    "Keep noise levels low — use headphones",
    "Pregnant women, elderly and disabled passengers have priority seating",
    "Children under 5 travel free with a paying adult",
    "Tokens and cards accepted at all stations",
  ],
};
