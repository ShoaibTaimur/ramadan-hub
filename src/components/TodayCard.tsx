import { numberToBengali } from "@/lib/bengali";
import { formatDate } from "@/lib/date";
import { Moon, Sun, Clock } from "lucide-react";

interface TodayCardProps {
  ramadanNumber: number;
  date: string;
  day: string;
  sahriEnd: string;
  fajr: string;
  iftar: string;
  division: string;
}

const dayBn: Record<string, string> = {
  Saturday: "শনিবার", Sunday: "রবিবার", Monday: "সোমবার",
  Tuesday: "মঙ্গলবার", Wednesday: "বুধবার", Thursday: "বৃহস্পতিবার", Friday: "শুক্রবার",
};

const TodayCard = ({ ramadanNumber, date, day, sahriEnd, fajr, iftar, division }: TodayCardProps) => {
  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-muted-foreground text-sm mb-1">{division} বিভাগ</p>
        <h2 className="text-5xl sm:text-6xl font-extrabold text-gradient mb-2">
          রমজান {numberToBengali(ramadanNumber)}
        </h2>
        <p className="text-foreground/70 text-base">
          {formatDate(date)} — {dayBn[day] || day}
        </p>
      </div>

      {/* Time Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {/* Sahri */}
        <div className="glass border border-border rounded-2xl p-6 text-center glow-green">
          <Moon className="w-6 h-6 mx-auto mb-2 text-primary" />
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">সাহরি শেষ</p>
          <p className="text-4xl font-bold text-foreground">{numberToBengali(sahriEnd)}</p>
          <p className="text-xs text-muted-foreground mt-1">AM</p>
        </div>

        {/* Fajr */}
        <div className="glass border border-border rounded-2xl p-6 text-center">
          <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">ফজর</p>
          <p className="text-4xl font-bold text-primary">{numberToBengali(fajr)}</p>
          <p className="text-xs text-muted-foreground mt-1">AM</p>
        </div>

        {/* Iftar */}
        <div className="glass border border-border rounded-2xl p-6 text-center glow-gold">
          <Sun className="w-6 h-6 mx-auto mb-2 text-secondary" />
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">ইফতার</p>
          <p className="text-4xl font-bold text-secondary">{numberToBengali(iftar)}</p>
          <p className="text-xs text-muted-foreground mt-1">PM</p>
        </div>
      </div>
    </div>
  );
};

export default TodayCard;
