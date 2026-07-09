export type FerryRoute = {
  id: string;
  name: string;
  from: string;
  to: string;
  duration: string;
  fare: number;
  frequency: string;
  firstDeparture: string;
  lastDeparture: string;
  status: "Operational" | "Seasonal" | "Coming Soon";
  keyStops?: string[];
};

export type FerryTerminal = {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  facilities: string[];
  coordinates: { lat: number; lng: number };
  routes: string[];
};

export const ferryData = {
  operator: "Lagos State Ferry Services Corporation / LAMATA",
  description:
    "Lagos has one of the most extensive waterway networks in Africa, with over 200 km of navigable waters. The Lagos Ferry Services provide a fast, scenic and congestion-free alternative to road transport across the Lagos Lagoon, connecting the Island to the Mainland and outlying communities in minutes rather than hours.",
  overview: [
    { label: "Waterway Length",   value: "200+ km navigable" },
    { label: "Active Routes",     value: "8 routes" },
    { label: "Terminals",         value: "12 jetties" },
    { label: "Daily Passengers",  value: "15,000+" },
    { label: "Journey Savings",   value: "Up to 75% faster vs road" },
    { label: "Operator",          value: "Lagos Ferry Services Corp." },
  ],

  terminals: [
    {
      id: "five-cowries",
      name: "Five Cowries Terminal",
      location: "Ikoyi, Lagos Island",
      address: "Five Cowries Creek, Ikoyi, Lagos",
      phone: "01-2700900",
      facilities: ["Ticketing", "Waiting Lounge", "Security", "CCTV", "Disabled Access", "Parking"],
      coordinates: { lat: 6.4448, lng: 3.4297 },
      routes: ["ikoyi-mainland", "ikoyi-vi"],
    },
    {
      id: "oke-erin",
      name: "Oke-Erin Jetty",
      location: "Lagos Island",
      address: "Oke-Erin, Lagos Island",
      phone: "01-2700901",
      facilities: ["Ticketing", "Waiting Lounge", "Security"],
      coordinates: { lat: 6.4531, lng: 3.3958 },
      routes: ["island-apapa", "island-festac"],
    },
    {
      id: "marina",
      name: "Marina Ferry Terminal",
      location: "Marina, Lagos Island",
      address: "Marina Waterfront, Lagos Island",
      phone: "01-2700902",
      facilities: ["Ticketing", "Waiting Lounge", "Security", "CCTV", "Retail", "Disabled Access"],
      coordinates: { lat: 6.4509, lng: 3.3960 },
      routes: ["marina-apapa", "marina-ebute", "marina-ikorodu"],
    },
    {
      id: "ebute-metta-jetty",
      name: "Ebute Metta Jetty",
      location: "Ebute Metta, Mainland",
      address: "Ebute Metta Waterfront, Lagos",
      phone: "01-2700903",
      facilities: ["Ticketing", "Waiting Lounge"],
      coordinates: { lat: 6.4784, lng: 3.3700 },
      routes: ["marina-ebute"],
    },
    {
      id: "apapa-jetty",
      name: "Apapa Ferry Terminal",
      location: "Apapa",
      address: "Apapa Waterfront, Lagos",
      phone: "01-2700904",
      facilities: ["Ticketing", "Waiting Lounge", "Security", "Parking"],
      coordinates: { lat: 6.4481, lng: 3.3591 },
      routes: ["marina-apapa", "island-apapa"],
    },
    {
      id: "ikorodu-jetty",
      name: "Ikorodu Ferry Terminal",
      location: "Ikorodu",
      address: "Ikorodu Waterfront, Lagos",
      phone: "01-2700905",
      facilities: ["Ticketing", "Waiting Lounge", "Security", "Parking", "Disabled Access"],
      coordinates: { lat: 6.6194, lng: 3.5061 },
      routes: ["marina-ikorodu", "ikorodu-ebute"],
    },
    {
      id: "badagry-jetty",
      name: "Badagry Jetty",
      location: "Badagry",
      address: "Badagry Waterfront, Lagos",
      phone: "01-2700906",
      facilities: ["Ticketing", "Waiting Lounge"],
      coordinates: { lat: 6.4154, lng: 2.8895 },
      routes: ["marina-badagry"],
    },
  ] as FerryTerminal[],

  routes: [
    {
      id: "marina-ikorodu",
      name: "Marina — Ikorodu Express",
      from: "Marina Terminal",
      to: "Ikorodu Ferry Terminal",
      duration: "25–30 minutes",
      fare: 600,
      frequency: "Every 30–45 minutes",
      firstDeparture: "06:00",
      lastDeparture: "20:00",
      status: "Operational",
      keyStops: ["Marina", "Ikorodu"],
    },
    {
      id: "marina-apapa",
      name: "Marina — Apapa",
      from: "Marina Terminal",
      to: "Apapa Ferry Terminal",
      duration: "10–15 minutes",
      fare: 250,
      frequency: "Every 20 minutes",
      firstDeparture: "06:00",
      lastDeparture: "21:00",
      status: "Operational",
      keyStops: ["Marina", "Apapa"],
    },
    {
      id: "marina-ebute",
      name: "Marina — Ebute Metta",
      from: "Marina Terminal",
      to: "Ebute Metta Jetty",
      duration: "15–20 minutes",
      fare: 300,
      frequency: "Every 30 minutes",
      firstDeparture: "06:30",
      lastDeparture: "19:30",
      status: "Operational",
      keyStops: ["Marina", "Ebute Metta"],
    },
    {
      id: "ikoyi-mainland",
      name: "Ikoyi — Mainland",
      from: "Five Cowries Terminal",
      to: "Ebute Metta Jetty",
      duration: "12 minutes",
      fare: 200,
      frequency: "Every 20–30 minutes",
      firstDeparture: "06:00",
      lastDeparture: "21:00",
      status: "Operational",
      keyStops: ["Five Cowries (Ikoyi)", "Ebute Metta"],
    },
    {
      id: "island-apapa",
      name: "Lagos Island — Apapa",
      from: "Oke-Erin Jetty",
      to: "Apapa Ferry Terminal",
      duration: "10 minutes",
      fare: 200,
      frequency: "Every 15–20 minutes",
      firstDeparture: "05:30",
      lastDeparture: "22:00",
      status: "Operational",
      keyStops: ["Oke-Erin", "Apapa"],
    },
    {
      id: "ikorodu-ebute",
      name: "Ikorodu — Ebute Metta",
      from: "Ikorodu Ferry Terminal",
      to: "Ebute Metta Jetty",
      duration: "30–40 minutes",
      fare: 500,
      frequency: "Every 45–60 minutes",
      firstDeparture: "06:00",
      lastDeparture: "19:00",
      status: "Operational",
      keyStops: ["Ikorodu", "Ebute Metta"],
    },
    {
      id: "marina-badagry",
      name: "Marina — Badagry",
      from: "Marina Terminal",
      to: "Badagry Jetty",
      duration: "90–120 minutes",
      fare: 1500,
      frequency: "Twice daily",
      firstDeparture: "07:00",
      lastDeparture: "15:00",
      status: "Seasonal",
      keyStops: ["Marina", "Ojo", "Badagry"],
    },
    {
      id: "island-festac",
      name: "Lagos Island — Festac",
      from: "Oke-Erin Jetty",
      to: "Festac Jetty",
      duration: "20 minutes",
      fare: 350,
      frequency: "Every 30–40 minutes",
      firstDeparture: "06:00",
      lastDeparture: "20:00",
      status: "Coming Soon",
      keyStops: ["Oke-Erin", "Festac Town"],
    },
  ] as FerryRoute[],

  rules: [
    "Life jackets are available and must be worn on request",
    "Do not overload vessels — maximum capacity is strictly enforced",
    "No smoking on ferries",
    "Children under 12 must be accompanied by an adult",
    "Report suspicious items or behaviour to ferry crew immediately",
    "Departure times may vary due to weather and tidal conditions",
    "Last ferries run on time — plan your journey accordingly",
  ],

  safetyTips: [
    "Always check weather conditions before travelling by ferry",
    "Keep your belongings secure during the journey",
    "Follow the instructions of crew members at all times",
    "Emergency exits are located at the rear of all vessels",
    "In case of emergency, the LASWA distress line is 0800-LASWA-NG",
  ],
};
