import { type Division, siteConfig } from "@/data/siteData";

interface DivisionSelectorProps {
  selected: Division;
  onSelect: (d: Division) => void;
}

const DivisionSelector = ({ selected, onSelect }: DivisionSelectorProps) => (
  <div className="flex flex-wrap justify-center gap-2">
    {siteConfig.divisions.map((d) => (
      <button
        key={d}
        onClick={() => onSelect(d)}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
          selected === d
            ? "bg-primary text-primary-foreground glow-green"
            : "bg-muted text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
        }`}
      >
        {d}
      </button>
    ))}
  </div>
);

export default DivisionSelector;
