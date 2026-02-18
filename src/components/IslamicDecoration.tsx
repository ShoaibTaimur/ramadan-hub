const IslamicDecoration = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    {/* Top ornamental gradient border */}
    <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-primary/50 to-transparent" />

    {/* Floating crescent */}
    <div className="absolute top-10 right-8 sm:right-16 text-primary/15 dark:text-primary/20 text-6xl sm:text-7xl animate-float select-none">
      ☪
    </div>

    {/* Scattered stars */}
    <div className="absolute top-20 left-10 text-secondary/20 dark:text-secondary/15 text-xl animate-twinkle select-none" style={{ animationDelay: "0.5s" }}>✦</div>
    <div className="absolute top-32 left-24 text-primary/15 dark:text-primary/10 text-base animate-twinkle select-none" style={{ animationDelay: "1.2s" }}>✧</div>
    <div className="absolute top-16 right-32 text-secondary/15 dark:text-secondary/10 text-sm animate-twinkle select-none" style={{ animationDelay: "2s" }}>✦</div>
    <div className="absolute top-[50%] left-6 text-primary/10 text-sm animate-twinkle select-none" style={{ animationDelay: "1.5s" }}>✧</div>
    <div className="absolute top-[70%] right-10 text-secondary/10 text-lg animate-twinkle select-none" style={{ animationDelay: "0.8s" }}>✦</div>

    {/* Corner Islamic geometric ornaments */}
    <svg className="absolute top-0 left-0 w-28 h-28 text-primary/8 dark:text-primary/6" viewBox="0 0 100 100">
      <path d="M0 0 L50 0 L50 8 L8 8 L8 50 L0 50 Z" fill="currentColor" />
      <path d="M0 0 L28 0 L28 4 L4 4 L4 28 L0 28 Z" fill="currentColor" opacity="0.6" />
    </svg>
    <svg className="absolute top-0 right-0 w-28 h-28 text-primary/8 dark:text-primary/6 scale-x-[-1]" viewBox="0 0 100 100">
      <path d="M0 0 L50 0 L50 8 L8 8 L8 50 L0 50 Z" fill="currentColor" />
      <path d="M0 0 L28 0 L28 4 L4 4 L4 28 L0 28 Z" fill="currentColor" opacity="0.6" />
    </svg>
    <svg className="absolute bottom-0 left-0 w-28 h-28 text-primary/8 dark:text-primary/6 scale-y-[-1]" viewBox="0 0 100 100">
      <path d="M0 0 L50 0 L50 8 L8 8 L8 50 L0 50 Z" fill="currentColor" />
    </svg>
    <svg className="absolute bottom-0 right-0 w-28 h-28 text-primary/8 dark:text-primary/6 scale-[-1]" viewBox="0 0 100 100">
      <path d="M0 0 L50 0 L50 8 L8 8 L8 50 L0 50 Z" fill="currentColor" />
    </svg>

    {/* Gradient orbs */}
    <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 dark:bg-primary/[0.07] blur-[150px]" />
    <div className="absolute bottom-20 right-0 w-80 h-80 rounded-full bg-secondary/4 dark:bg-secondary/5 blur-[120px]" />
    <div className="absolute top-1/2 left-0 w-60 h-60 rounded-full bg-primary/3 dark:bg-primary/4 blur-[100px]" />

    {/* Mosque silhouette bottom */}
    <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-16 text-primary/4 dark:text-primary/6" viewBox="0 0 400 50" preserveAspectRatio="xMidYMax meet">
      <path d="M0 50 L0 35 L30 35 L35 20 L37 35 L60 35 L60 30 Q80 5 100 30 L100 35 L120 35 L125 25 L127 35 L160 35 L160 28 Q180 0 200 28 L200 35 L240 35 L240 28 Q260 0 280 28 L280 35 L300 35 L305 25 L307 35 L340 35 L340 30 Q360 5 380 30 L380 35 L400 35 L400 50 Z" fill="currentColor" />
    </svg>
  </div>
);

export default IslamicDecoration;
