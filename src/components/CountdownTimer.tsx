import { useState, useEffect } from "react";
import { parseDate, type DayEntry } from "@/data/siteData";
import { Timer } from "lucide-react";

interface CountdownTimerProps {
  todayEntry: DayEntry | undefined;
  schedule: DayEntry[];
}

function getNextEvent(todayEntry: DayEntry | undefined, schedule: DayEntry[]): { label: string; targetTime: Date } | null {
  const now = new Date();

  if (todayEntry) {
    const entryDate = parseDate(todayEntry.date);
    // Sahri end today
    const [sh, sm] = todayEntry.sahriEnd.split(":").map(Number);
    const sahriTime = new Date(entryDate);
    sahriTime.setHours(sh, sm, 0, 0);
    if (now < sahriTime) return { label: "সাহরি শেষ", targetTime: sahriTime };

    // Iftar today (PM - add 12 hours if time < 12)
    const [ih, im] = todayEntry.iftar.split(":").map(Number);
    const iftarTime = new Date(entryDate);
    iftarTime.setHours(ih < 12 ? ih + 12 : ih, im, 0, 0);
    if (now < iftarTime) return { label: "ইফতার", targetTime: iftarTime };
  }

  // Find next day's sahri
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const nextDay = schedule.find((d) => {
    const ed = parseDate(d.date);
    ed.setHours(0, 0, 0, 0);
    return ed.getTime() === tomorrow.getTime();
  });

  if (nextDay) {
    const [sh, sm] = nextDay.sahriEnd.split(":").map(Number);
    const sahriTime = parseDate(nextDay.date);
    sahriTime.setHours(sh, sm, 0, 0);
    return { label: "আগামীকাল সাহরি", targetTime: sahriTime };
  }

  return null;
}

const CountdownTimer = ({ todayEntry, schedule }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, label: "" });

  useEffect(() => {
    const tick = () => {
      const event = getNextEvent(todayEntry, schedule);
      if (!event) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, label: "" });
        return;
      }
      const diff = event.targetTime.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, label: event.label });
        return;
      }
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ hours, minutes, seconds, label: event.label });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [todayEntry, schedule]);

  if (!timeLeft.label) return null;

  return (
    <div className="glass border border-border rounded-2xl p-5 text-center glow-green">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Timer className="w-4 h-4 text-primary" />
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
          {timeLeft.label} পর্যন্ত বাকি
        </p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <TimeBlock value={timeLeft.hours} unit="ঘণ্টা" />
        <span className="text-primary text-2xl font-bold animate-pulse">:</span>
        <TimeBlock value={timeLeft.minutes} unit="মিনিট" />
        <span className="text-primary text-2xl font-bold animate-pulse">:</span>
        <TimeBlock value={timeLeft.seconds} unit="সেকেন্ড" />
      </div>
    </div>
  );
};

function TimeBlock({ value, unit }: { value: number; unit: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl sm:text-4xl font-extrabold text-foreground tabular-nums w-16 text-center">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[10px] text-muted-foreground mt-1">{unit}</span>
    </div>
  );
}

export default CountdownTimer;
