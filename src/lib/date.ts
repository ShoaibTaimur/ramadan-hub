import { numberToBengali } from "@/lib/bengali";

const BENGALI_MONTHS_BD = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

const INPUT_MONTHS_EN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatDate(dateStr: string): string {
  const parts = dateStr.trim().split(/\s+/);
  if (parts.length !== 3) return dateStr;
  const [dayStr, monthAbbr, yearStr] = parts;
  const monthIndex = INPUT_MONTHS_EN.findIndex(
    (m) => m.toLowerCase() === monthAbbr.toLowerCase(),
  );
  if (monthIndex === -1) return dateStr;
  const day = parseInt(dayStr, 10);
  const year = parseInt(yearStr, 10);
  if (Number.isNaN(day) || Number.isNaN(year)) return dateStr;
  const monthBn = BENGALI_MONTHS_BD[monthIndex];
  return `${numberToBengali(day)} ${monthBn} ${numberToBengali(year)}`;
}
