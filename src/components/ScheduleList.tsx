import type { DayEntry } from "@/data/siteData";

interface ScheduleListProps {
  days: DayEntry[];
  todayRamadan?: number;
  compact?: boolean;
}

const dayBn: Record<string, string> = {
  Saturday: "শনি", Sunday: "রবি", Monday: "সোম",
  Tuesday: "মঙ্গল", Wednesday: "বুধ", Thursday: "বৃহঃ", Friday: "শুক্র",
};

const ScheduleList = ({ days, todayRamadan, compact }: ScheduleListProps) => {
  return (
    <div className="space-y-2">
      {days.map((row, i) => {
        const isToday = row.ramadanNumber === todayRamadan;
        return (
          <div
            key={row.ramadanNumber}
            className={`flex items-center gap-3 sm:gap-4 rounded-xl px-4 py-3 transition-all ${
              isToday
                ? "bg-primary/15 border border-primary/30 glow-green"
                : "bg-card border border-border hover:bg-surface-elevated"
            }`}
            style={{ animationDelay: `${i * 40}ms` }}
          >
            {/* Ramadan number */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
              isToday ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              {row.ramadanNumber}
            </div>

            {/* Date & Day */}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${isToday ? "text-primary" : "text-foreground"}`}>
                {row.date}
              </p>
              {!compact && (
                <p className="text-xs text-muted-foreground">{dayBn[row.day] || row.day}</p>
              )}
            </div>

            {/* Times */}
            <div className="flex gap-4 sm:gap-6 text-right shrink-0">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">সাহরি</p>
                <p className="text-sm font-semibold text-foreground">{row.sahriEnd}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">ফজর</p>
                <p className="text-sm font-semibold text-primary">{row.fajr}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">ইফতার</p>
                <p className="text-sm font-bold text-secondary">{row.iftar}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleList;
