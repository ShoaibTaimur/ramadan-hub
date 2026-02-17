// ============================================================
// RAMADAN CALENDAR DATA 2026 - EDIT THIS FILE TO UPDATE THE WEBSITE
// ============================================================
// All times are in 24-hour format (HH:MM)
// Base times are for Dhaka division.

export type Division =
  | "Dhaka"
  | "Chattogram"
  | "Rajshahi"
  | "Khulna"
  | "Barishal"
  | "Sylhet"
  | "Rangpur"
  | "Mymensingh";

export interface DayEntry {
  ramadanNumber: number;
  date: string; // "DD Mon YYYY" format
  day: string;
  sahriEnd: string;
  fajr: string;
  iftar: string;
}

// ─── DHAKA BASE TIMES (from authentic source) ───────────────
export const ramadanDays: DayEntry[] = [
  { ramadanNumber: 1,  date: "19 Feb 2026", day: "Thursday",  sahriEnd: "5:12", fajr: "5:15", iftar: "5:58" },
  { ramadanNumber: 2,  date: "20 Feb 2026", day: "Friday",    sahriEnd: "5:11", fajr: "5:14", iftar: "5:58" },
  { ramadanNumber: 3,  date: "21 Feb 2026", day: "Saturday",  sahriEnd: "5:11", fajr: "5:14", iftar: "5:59" },
  { ramadanNumber: 4,  date: "22 Feb 2026", day: "Sunday",    sahriEnd: "5:10", fajr: "5:13", iftar: "5:59" },
  { ramadanNumber: 5,  date: "23 Feb 2026", day: "Monday",    sahriEnd: "5:09", fajr: "5:12", iftar: "6:00" },
  { ramadanNumber: 6,  date: "24 Feb 2026", day: "Tuesday",   sahriEnd: "5:08", fajr: "5:11", iftar: "6:00" },
  { ramadanNumber: 7,  date: "25 Feb 2026", day: "Wednesday", sahriEnd: "5:08", fajr: "5:11", iftar: "6:01" },
  { ramadanNumber: 8,  date: "26 Feb 2026", day: "Thursday",  sahriEnd: "5:07", fajr: "5:10", iftar: "6:01" },
  { ramadanNumber: 9,  date: "27 Feb 2026", day: "Friday",    sahriEnd: "5:06", fajr: "5:09", iftar: "6:02" },
  { ramadanNumber: 10, date: "28 Feb 2026", day: "Saturday",  sahriEnd: "5:05", fajr: "5:08", iftar: "6:02" },
  { ramadanNumber: 11, date: "01 Mar 2026", day: "Sunday",    sahriEnd: "5:05", fajr: "5:08", iftar: "6:03" },
  { ramadanNumber: 12, date: "02 Mar 2026", day: "Monday",    sahriEnd: "5:04", fajr: "5:07", iftar: "6:03" },
  { ramadanNumber: 13, date: "03 Mar 2026", day: "Tuesday",   sahriEnd: "5:03", fajr: "5:06", iftar: "6:04" },
  { ramadanNumber: 14, date: "04 Mar 2026", day: "Wednesday", sahriEnd: "5:02", fajr: "5:05", iftar: "6:04" },
  { ramadanNumber: 15, date: "05 Mar 2026", day: "Thursday",  sahriEnd: "5:01", fajr: "5:04", iftar: "6:05" },
  { ramadanNumber: 16, date: "06 Mar 2026", day: "Friday",    sahriEnd: "5:00", fajr: "5:03", iftar: "6:05" },
  { ramadanNumber: 17, date: "07 Mar 2026", day: "Saturday",  sahriEnd: "4:59", fajr: "5:02", iftar: "6:06" },
  { ramadanNumber: 18, date: "08 Mar 2026", day: "Sunday",    sahriEnd: "4:58", fajr: "5:01", iftar: "6:06" },
  { ramadanNumber: 19, date: "09 Mar 2026", day: "Monday",    sahriEnd: "4:57", fajr: "5:00", iftar: "6:07" },
  { ramadanNumber: 20, date: "10 Mar 2026", day: "Tuesday",   sahriEnd: "4:57", fajr: "4:59", iftar: "6:07" },
  { ramadanNumber: 21, date: "11 Mar 2026", day: "Wednesday", sahriEnd: "4:56", fajr: "4:58", iftar: "6:07" },
  { ramadanNumber: 22, date: "12 Mar 2026", day: "Thursday",  sahriEnd: "4:55", fajr: "4:57", iftar: "6:08" },
  { ramadanNumber: 23, date: "13 Mar 2026", day: "Friday",    sahriEnd: "4:54", fajr: "4:57", iftar: "6:08" },
  { ramadanNumber: 24, date: "14 Mar 2026", day: "Saturday",  sahriEnd: "4:53", fajr: "4:56", iftar: "6:09" },
  { ramadanNumber: 25, date: "15 Mar 2026", day: "Sunday",    sahriEnd: "4:52", fajr: "4:55", iftar: "6:09" },
  { ramadanNumber: 26, date: "16 Mar 2026", day: "Monday",    sahriEnd: "4:51", fajr: "4:54", iftar: "6:10" },
  { ramadanNumber: 27, date: "17 Mar 2026", day: "Tuesday",   sahriEnd: "4:50", fajr: "4:53", iftar: "6:10" },
  { ramadanNumber: 28, date: "18 Mar 2026", day: "Wednesday", sahriEnd: "4:49", fajr: "4:52", iftar: "6:10" },
  { ramadanNumber: 29, date: "19 Mar 2026", day: "Thursday",  sahriEnd: "4:48", fajr: "4:50", iftar: "6:11" },
  { ramadanNumber: 30, date: "20 Mar 2026", day: "Friday",    sahriEnd: "4:47", fajr: "4:49", iftar: "6:11" },
];

// ─── DIVISION TIME OFFSETS (minutes relative to Dhaka) ──────
export const divisionOffsets: Record<Division, { sahri: number; fajr: number; iftar: number }> = {
  Dhaka:       { sahri: 0,  fajr: 0,  iftar: 0 },
  Chattogram:  { sahri: -5, fajr: -5, iftar: -5 },
  Rajshahi:    { sahri: 6,  fajr: 6,  iftar: 6 },
  Khulna:      { sahri: 4,  fajr: 4,  iftar: 4 },
  Barishal:    { sahri: 0,  fajr: 0,  iftar: -1 },
  Sylhet:      { sahri: -7, fajr: -7, iftar: -7 },
  Rangpur:     { sahri: 5,  fajr: 5,  iftar: 5 },
  Mymensingh:  { sahri: -1, fajr: -1, iftar: -1 },
};

// ─── HELPER ─────────────────────────────────────────────────
export function applyOffset(time: string, offsetMinutes: number): string {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + offsetMinutes;
  const newH = Math.floor(((total % 1440) + 1440) % 1440 / 60);
  const newM = ((total % 60) + 60) % 60;
  return `${newH}:${newM.toString().padStart(2, "0")}`;
}

export function getScheduleForDivision(division: Division) {
  const offset = divisionOffsets[division];
  return ramadanDays.map((day) => ({
    ...day,
    sahriEnd: applyOffset(day.sahriEnd, offset.sahri),
    fajr: applyOffset(day.fajr, offset.fajr),
    iftar: applyOffset(day.iftar, offset.iftar),
  }));
}

// Parse "DD Mon YYYY" to Date object
export function parseDate(dateStr: string): Date {
  return new Date(dateStr);
}

// ─── SITE CONFIG ────────────────────────────────────────────
export const siteConfig = {
  title: "রমজান হাব ২০২৬",
  titleEn: "Ramadan Hub 2026",
  subtitle: "সাহরি ও ইফতারের সময়সূচি",
  year: "1447 Hijri",
  divisions: ["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh"] as Division[],
};
