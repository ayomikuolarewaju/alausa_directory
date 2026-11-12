import type { FareTier } from "./blue-line";

type RedLineStation = {
  id: string;
  name: string;
  isTerminal?: boolean;
};

type TrainTimes = {
  trainNo: string;
  times: string[];
};

type DirectionalTimetable = {
  direction: string;
  from: string;
  to: string;
  stations: string[];
  serviceHours: string;
  trains: TrainTimes[];
};

export const redLineData = {
  name: "Red Line",
  fullName: "Lagos Red Line Rail",
  color: "#CC1F1F",
  status: "Passenger Service" as const,
  operator: "Lagos Metropolitan Area Transport Authority (LAMATA)",
  length: "37 km planned corridor",
  totalStations: 8,
  type: "Commuter Rail",
  description:
    "LAMATA's published weekday timetable covers passenger service between Oyingbo and Agbado. The 37 km Agbado–Marina route is the longer-term corridor plan; the published timetable does not list service to Marina.",
  overview: [
    { label: "Current Service", value: "Oyingbo ↔ Agbado" },
    { label: "Timetabled Stops", value: "8" },
    { label: "Published Trains", value: "9 weekday trips/day" },
    { label: "Journey Time", value: "~50 minutes end to end" },
    { label: "Planned Corridor", value: "37 km, Agbado–Marina" },
    { label: "Published Service Days", value: "Monday–Friday" },
  ],
  stations: [
    { id: "oyingbo-red", name: "Oyingbo", isTerminal: true },
    { id: "yaba", name: "Yaba" },
    { id: "mushin", name: "Mushin" },
    { id: "oshodi-red", name: "Oshodi" },
    { id: "ikeja-red", name: "Ikeja" },
    { id: "agege-red", name: "Agege" },
    { id: "iju", name: "Iju" },
    { id: "agbado", name: "Agbado", isTerminal: true },
  ] as RedLineStation[],
  schedules: [
    {
      direction: "Northbound: Oyingbo to Agbado",
      from: "Oyingbo",
      to: "Agbado",
      stations: ["Oyingbo", "Yaba", "Mushin", "Oshodi", "Ikeja", "Agege", "Iju", "Agbado"],
      serviceHours: "06:00 AM–07:30 PM, Monday–Friday",
      trains: [
        { trainNo: "LAM001", times: ["06:00 AM", "06:09 AM", "06:14 AM", "06:21 AM", "06:29 AM", "06:36 AM", "06:45 AM", "06:50 AM"] },
        { trainNo: "LAM002", times: ["08:10 AM", "08:19 AM", "08:24 AM", "08:31 AM", "08:39 AM", "08:46 AM", "08:55 AM", "09:00 AM"] },
        { trainNo: "LAM003", times: ["05:20 PM", "05:29 PM", "05:34 PM", "05:41 PM", "05:49 PM", "05:56 PM", "06:05 PM", "06:10 PM"] },
        { trainNo: "LAM004", times: ["06:40 PM", "06:49 PM", "06:54 PM", "07:01 PM", "07:09 PM", "07:16 PM", "07:25 PM", "07:30 PM"] },
      ],
    },
    {
      direction: "Southbound: Agbado to Oyingbo",
      from: "Agbado",
      to: "Oyingbo",
      stations: ["Agbado", "Iju", "Agege", "Ikeja", "Oshodi", "Mushin", "Yaba", "Oyingbo"],
      serviceHours: "06:15 AM–08:40 PM, Monday–Friday",
      trains: [
        { trainNo: "LAM101", times: ["06:15 AM", "06:22 AM", "06:31 AM", "06:38 AM", "06:47 AM", "06:53 AM", "06:59 AM", "07:05 AM"] },
        { trainNo: "LAM102", times: ["07:10 AM", "07:17 AM", "07:26 AM", "07:33 AM", "07:42 AM", "07:48 AM", "07:54 AM", "08:00 AM"] },
        { trainNo: "LAM103", times: ["09:10 AM", "09:17 AM", "09:26 AM", "09:33 AM", "09:42 AM", "09:48 AM", "09:54 AM", "10:00 AM"] },
        { trainNo: "LAM104", times: ["06:50 PM", "06:57 PM", "07:06 PM", "07:13 PM", "07:22 PM", "07:28 PM", "07:33 PM", "07:40 PM"] },
        { trainNo: "LAM105", times: ["07:50 PM", "07:57 PM", "08:06 PM", "08:13 PM", "08:22 PM", "08:28 PM", "08:33 PM", "08:40 PM"] },
      ],
    },
  ] as DirectionalTimetable[],
  fares: [
    { zones: "Agbado–Oyingbo, one-way", fare: 1000 },
  ] as FareTier[],
  sources: [
    {
      label: "LAMATA Red Line timetable",
      url: "https://www.lamata-ng.com/our-schedule/redline-train-schedule/",
      detail: "Published Monday–Friday timetable, stop times, service hours and journey time.",
    },
    {
      label: "LAMATA rail network and Red Line overview",
      url: "https://www.lamata-ng.com/train-services/",
      detail: "Long-term 37 km Agbado–Marina corridor plan and phased-service context.",
    },
    {
      label: "LAMATA fare announcement — 18 February 2025",
      url: "https://www.lamata-ng.com/2025/02/18/sanwo-olu-announces-30-reduction-in-red-line-fare-commissions/",
      detail: "Published ₦1,000 Agbado–Oyingbo fare; no current zonal breakdown was found.",
    },
    {
      label: "LAMATA operating-license and expansion update — 30 June 2026",
      url: "https://www.lamata-ng.com/2026/06/30/nrc-grants-lamata-permanent-rail-operating-license-paving-the-way-for-major-expansion-of-lagos-red-line/",
      detail: "Reports nine current daily trips and a plan for 24 by Q4 2026; the timetable still lists nine.",
    },
  ],
  checkedAt: "12 November 2026",
};
