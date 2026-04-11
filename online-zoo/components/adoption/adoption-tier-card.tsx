"use client";

import { cn } from "@/lib/utils";

interface AdoptionTierCardProps {
  tierId: string;
  name: string;
  price: number;
  items: string[];
  isSelected: boolean;
  onSelect: () => void;
  badge?: string;
}

const TIER_CONFIG: Record<
  string,
  {
    gradient: string;
    glow: string;
    hoverGlow: string;
    ring: string;
    checkBg: string;
    icon: string;
  }
> = {
  cub: {
    gradient:
      "bg-gradient-to-br from-[#f58021] to-[#f9a825] dark:from-[#b85c0f] dark:to-[#c47a1a]",
    glow: "shadow-[0_0_30px_-5px_rgba(245,128,33,0.4)]",
    hoverGlow: "shadow-[0_0_20px_-5px_rgba(245,128,33,0.25)]",
    ring: "ring-[#f58021]/60",
    checkBg: "bg-[#f58021]",
    icon: "\uD83D\uDC3E",
  },
  bronze: {
    gradient:
      "bg-gradient-to-br from-[#cd7f32] to-[#a0622a] dark:from-[#8b5a1e] dark:to-[#6b4513]",
    glow: "shadow-[0_0_30px_-5px_rgba(205,127,50,0.4)]",
    hoverGlow: "shadow-[0_0_20px_-5px_rgba(205,127,50,0.25)]",
    ring: "ring-[#cd7f32]/60",
    checkBg: "bg-[#cd7f32]",
    icon: "\u2B50",
  },
  silver: {
    gradient:
      "bg-gradient-to-br from-[#c0c0c0] to-[#808080] dark:from-[#707070] dark:to-[#505050]",
    glow: "shadow-[0_0_30px_-5px_rgba(160,160,160,0.4)]",
    hoverGlow: "shadow-[0_0_20px_-5px_rgba(160,160,160,0.25)]",
    ring: "ring-[#a0a0a0]/60",
    checkBg: "bg-[#a0a0a0]",
    icon: "\uD83D\uDC8E",
  },
  gold: {
    gradient:
      "bg-gradient-to-br from-[#d4a017] via-[#f0d060] to-[#b8860b] dark:from-[#a07810] dark:via-[#c4a030] dark:to-[#8a6508]",
    glow: "shadow-[0_0_40px_-5px_rgba(212,160,23,0.5)]",
    hoverGlow: "shadow-[0_0_25px_-5px_rgba(212,160,23,0.35)]",
    ring: "ring-[#d4a017]/70",
    checkBg: "bg-[#d4a017]",
    icon: "\uD83C\uDFC6",
  },
};

export default function AdoptionTierCard({
  tierId,
  name,
  price,
  items,
  isSelected,
  onSelect,
  badge,
}: AdoptionTierCardProps) {
  const config = TIER_CONFIG[tierId] ?? TIER_CONFIG.cub;

  return (
    <button
      onClick={onSelect}
      className={cn(
        "group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl text-left transition-all duration-300",
        "border border-black/[0.06] dark:border-white/[0.08]",
        !isSelected &&
          "hover:-translate-y-1 hover:border-black/[0.1] dark:hover:border-white/[0.15]",
        !isSelected && config.hoverGlow,
        isSelected && "z-10 scale-[1.02] ring-2",
        isSelected && config.ring,
        isSelected && config.glow,
      )}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute -right-px -top-px z-10">
          <div className="rounded-bl-lg rounded-tr-2xl bg-[#d4a017] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg dark:bg-[#b8860b]">
            {badge}
          </div>
        </div>
      )}

      {/* Gradient Header */}
      <div
        className={cn(
          "relative overflow-hidden px-5 pb-5 pt-6 sm:px-6 sm:pb-6 sm:pt-7 transition-all duration-300",
          config.gradient,
          isSelected && "brightness-110 saturate-110",
        )}
      >
        {/* Decorative watermark */}
        <span className="pointer-events-none absolute -right-2 -top-2 text-[64px] opacity-[0.12] transition-all duration-500 group-hover:scale-110 group-hover:opacity-[0.18] sm:text-[80px]">
          {config.icon}
        </span>

        {/* Tier name */}
        <p className="relative text-sm font-semibold uppercase tracking-widest text-white/80">
          {name}
        </p>

        {/* Price */}
        <div className="relative mt-2 flex items-baseline gap-1">
          <span className="text-lg font-medium text-white/70">$</span>
          <span className="text-4xl font-extrabold text-white transition-transform duration-300 origin-left group-hover:scale-105 sm:text-5xl">
            {price}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col bg-white p-4 dark:bg-dark-surface sm:px-5 sm:py-10">
        <ul className="flex flex-col gap-5">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-sm text-foreground/70 sm:text-[15px]"
            >
              <div
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                  isSelected
                    ? config.checkBg
                    : "bg-foreground/10 dark:bg-white/10",
                )}
              >
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke={isSelected ? "white" : "currentColor"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn(!isSelected && "text-foreground/40")}
                  />
                </svg>
              </div>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
}
