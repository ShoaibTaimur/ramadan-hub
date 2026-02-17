import { useState, useMemo, useEffect } from "react";
import { siteConfig, getScheduleForDivision, parseDate, type Division } from "@/data/siteData";
import DivisionSelector from "@/components/DivisionSelector";
import TodayCard from "@/components/TodayCard";
import ScheduleList from "@/components/ScheduleList";
import IslamicDecoration from "@/components/IslamicDecoration";
import CountdownTimer from "@/components/CountdownTimer";
import ReminderButton from "@/components/ReminderButton";
import InstallPrompt from "@/components/InstallPrompt";
import ThemeToggle from "@/components/ThemeToggle";
import { CalendarDays, Calendar, List } from "lucide-react";

type View = "today" | "week" | "full";

const Index = () => {
  const [division, setDivision] = useState<Division>("Dhaka");
  const [view, setView] = useState<View>("today");
  const [animKey, setAnimKey] = useState(0);

  const schedule = useMemo(() => getScheduleForDivision(division), [division]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayEntry = useMemo(() => {
    return schedule.find((d) => {
      const entryDate = parseDate(d.date);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime();
    });
  }, [schedule]);

  const weekEntries = useMemo(() => {
    if (!todayEntry) return schedule.slice(0, 7);
    const idx = schedule.findIndex((d) => d.ramadanNumber === todayEntry.ramadanNumber);
    return schedule.slice(idx, Math.min(idx + 7, schedule.length));
  }, [schedule, todayEntry]);

  const handleViewChange = (v: View) => {
    setView(v);
    setAnimKey((k) => k + 1);
  };

  // Initialize dark mode on mount
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Auto-prompt for notification permission on first visit
  useEffect(() => {
    if (!("Notification" in window)) return;
    if (Notification.permission === "default") {
      const timer = setTimeout(() => {
        Notification.requestPermission().then((perm) => {
          if (perm === "granted") {
            localStorage.setItem("ramadan-reminders", "true");
            new Notification("✅ রমজান হাব — নোটিফিকেশন চালু!", {
              body: "সাহরি ও ইফতারের আগে রিমাইন্ডার পাবেন",
              icon: "/pwa-icon-192.png",
            });
          }
        });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const tabs: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: "today", label: "আজকে", icon: <CalendarDays className="w-4 h-4" /> },
    { id: "week", label: "সপ্তাহ", icon: <Calendar className="w-4 h-4" /> },
    { id: "full", label: "সম্পূর্ণ", icon: <List className="w-4 h-4" /> },
  ];

  return (
    <div className="relative min-h-screen bg-background bg-pattern">
      <IslamicDecoration />
      <InstallPrompt />

      {/* Top bar */}
      <div className="relative flex justify-end items-center px-4 pt-4 gap-2">
        <ReminderButton todayEntry={todayEntry} schedule={schedule} />
        <ThemeToggle />
      </div>

      {/* Header */}
      <header className="relative pt-6 pb-6 text-center px-4">
        <p className="font-arabic text-bismillah text-2xl sm:text-3xl mb-3 font-bold">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gradient mb-2">
          {siteConfig.title}
        </h1>
        <p className="text-muted-foreground text-sm">
          {siteConfig.subtitle} • {siteConfig.year}
        </p>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-3 mt-5">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/40" />
          <span className="text-secondary/60 text-base">☪</span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/40" />
        </div>
      </header>

      <div className="relative max-w-2xl mx-auto px-4 pb-16">
        {/* Division Selector */}
        <div className="mb-6">
          <DivisionSelector selected={division} onSelect={setDivision} />
        </div>

        {/* Countdown Timer */}
        <div className="mb-6">
          <CountdownTimer todayEntry={todayEntry} schedule={schedule} />
        </div>

        {/* View Tabs */}
        <div className="flex justify-center gap-1 mb-8 bg-muted/60 backdrop-blur-sm rounded-xl p-1 border border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleViewChange(tab.id)}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                view === tab.id
                  ? "bg-primary text-primary-foreground shadow-lg glow-green"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content with animation */}
        <div key={animKey} className="tab-content-enter">
          {view === "today" && (
            todayEntry ? (
              <TodayCard {...todayEntry} division={division} />
            ) : (
              <div className="text-center py-16 glass rounded-2xl border border-border">
                <p className="text-5xl mb-4">🌙</p>
                <p className="text-foreground font-semibold text-lg mb-2">আজ রমজানের দিন নয়</p>
                <p className="text-muted-foreground text-sm">সম্পূর্ণ ক্যালেন্ডার দেখতে "সম্পূর্ণ" ট্যাবে যান</p>
                <p className="text-muted-foreground text-xs mt-4">রমজান শুরু: ১৯ ফেব্রুয়ারি ২০২৬</p>
              </div>
            )
          )}

          {view === "week" && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-widest">
                {todayEntry ? "আজ থেকে আগামী ৭ দিন" : "প্রথম সপ্তাহ"}
              </h3>
              <ScheduleList days={weekEntries} todayRamadan={todayEntry?.ramadanNumber} />
            </div>
          )}

          {view === "full" && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-widest">
                সম্পূর্ণ রমজান ক্যালেন্ডার — {division}
              </h3>
              <ScheduleList days={schedule} todayRamadan={todayEntry?.ramadanNumber} compact />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-14 text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/30" />
            <span className="text-secondary/40 text-xs">✦</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/30" />
          </div>
          <p className="text-muted-foreground text-xs">*সকল তারিখ চাঁদ দেখার উপর নির্ভরশীল</p>
          <p className="text-muted-foreground text-xs">রমজান হাব ২০২৬ 🌙</p>
          <p className="text-muted-foreground text-xs mt-2">
            Built by{" "}
            <a
              href="https://github.com/ShoaibTaimur"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Shoaib Taimur
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
