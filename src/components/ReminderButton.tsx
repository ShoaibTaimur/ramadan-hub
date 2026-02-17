import { useState, useEffect, useCallback } from "react";
import { Bell, BellOff, BellRing } from "lucide-react";
import { parseDate, type DayEntry } from "@/data/siteData";

interface ReminderButtonProps {
  todayEntry: DayEntry | undefined;
  schedule: DayEntry[];
}

const ReminderButton = ({ todayEntry, schedule }: ReminderButtonProps) => {
  const [enabled, setEnabled] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
    const stored = localStorage.getItem("ramadan-reminders");
    if (stored === "true") setEnabled(true);
  }, []);

  const scheduleNotifications = useCallback(() => {
    if (!todayEntry && schedule.length === 0) return;

    const entries = todayEntry ? [todayEntry] : schedule.slice(0, 1);
    entries.forEach((entry) => {
      const entryDate = parseDate(entry.date);

      // Sahri reminder (10 min before)
      const [sh, sm] = entry.sahriEnd.split(":").map(Number);
      const sahriTime = new Date(entryDate);
      sahriTime.setHours(sh, sm - 10, 0, 0);
      const sahriDelay = sahriTime.getTime() - Date.now();
      if (sahriDelay > 0) {
        setTimeout(() => {
          new Notification("🌙 সাহরির সময় হয়ে আসছে!", {
            body: `সাহরি শেষ ${entry.sahriEnd} AM — আর ১০ মিনিট বাকি`,
            icon: "/pwa-icon-192.png",
          });
        }, sahriDelay);
      }

      // Iftar reminder (10 min before)
      const [ih, im] = entry.iftar.split(":").map(Number);
      const iftarTime = new Date(entryDate);
      iftarTime.setHours(ih < 12 ? ih + 12 : ih, im - 10, 0, 0);
      const iftarDelay = iftarTime.getTime() - Date.now();
      if (iftarDelay > 0) {
        setTimeout(() => {
          new Notification("🕌 ইফতারের সময় হয়ে আসছে!", {
            body: `ইফতার ${entry.iftar} PM — আর ১০ মিনিট বাকি`,
            icon: "/pwa-icon-192.png",
          });
        }, iftarDelay);
      }
    });
  }, [todayEntry, schedule]);

  const toggleReminders = async () => {
    if (!("Notification" in window)) {
      alert("এই ব্রাউজারে নোটিফিকেশন সাপোর্ট নেই");
      return;
    }

    if (!enabled) {
      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm === "granted") {
        setEnabled(true);
        localStorage.setItem("ramadan-reminders", "true");
        scheduleNotifications();
        new Notification("✅ রিমাইন্ডার সক্রিয়!", {
          body: "সাহরি ও ইফতারের ১০ মিনিট আগে নোটিফিকেশন পাবেন",
          icon: "/pwa-icon-192.png",
        });
      }
    } else {
      setEnabled(false);
      localStorage.setItem("ramadan-reminders", "false");
    }
  };

  useEffect(() => {
    if (enabled && permission === "granted") {
      scheduleNotifications();
    }
  }, [enabled, permission, scheduleNotifications]);

  return (
    <button
      onClick={toggleReminders}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
        enabled
          ? "bg-primary/15 border-primary/30 text-primary glow-green"
          : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
      }`}
    >
      {enabled ? (
        <BellRing className="w-4 h-4" />
      ) : permission === "denied" ? (
        <BellOff className="w-4 h-4" />
      ) : (
        <Bell className="w-4 h-4" />
      )}
      {enabled ? "রিমাইন্ডার চালু" : permission === "denied" ? "ব্লকড" : "রিমাইন্ডার"}
    </button>
  );
};

export default ReminderButton;
