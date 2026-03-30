"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface AnimalSidebarItemProps {
  name: string;
  cameraText?: string;
  icon: string;
  isActive: boolean;
  collapsed: boolean;
  onClick: () => void;
}

export default function AnimalSidebarItem({
  name,
  cameraText,
  icon,
  isActive,
  collapsed,
  onClick,
}: AnimalSidebarItemProps) {
  return (
    <li className="border-b border-white/20">
      <button
        type="button"
        onClick={onClick}
        aria-current={isActive ? "true" : undefined}
        className={cn(
          "flex w-full items-center gap-5 px-4 py-5 transition-all duration-300 cursor-pointer",
          collapsed ? "justify-center" : "justify-start",
          isActive && "bg-white/5",
        )}
      >
        {/* Icon */}
        <span
          className={cn(
            "flex shrink-0 items-center justify-center transition-all duration-300",
            collapsed
              ? cn(
                  // lg-xl: no circle, auto size
                  "h-auto w-auto",
                  // 2xl: orange circle
                  "2xl:h-[104px] 2xl:w-[104px] 2xl:rounded-full",
                  isActive
                    ? "2xl:bg-white 2xl:ring-[3px] 2xl:ring-white 2xl:ring-offset-[6px] 2xl:ring-offset-navy dark:2xl:ring-offset-[#13101c]"
                    : "2xl:bg-orange",
                )
              : cn("h-[50px] w-[50px]"),
          )}
        >
          <Image
            src={icon}
            alt={name}
            width={60}
            height={60}
            className={cn(
              "transition-all duration-300",
              collapsed
                ? cn(
                    // lg-xl: orange filter, responsive height
                    "h-[30px] w-auto xl:h-[40px] 2xl:h-[60px]",
                    isActive
                      ? "brightness-0 invert 2xl:filter-none 2xl:brightness-100 2xl:invert-0"
                      : "filter-orange 2xl:filter-none",
                  )
                : cn(
                    // Expanded: orange filter for visibility
                    "h-[38px] w-auto",
                    isActive ? "brightness-0 invert" : "filter-orange",
                  ),
            )}
          />
        </span>

        {/* Text label — camera text in expanded state */}
        {!collapsed && (
          <span className="text-lg font-normal leading-[1.3] text-white">
            {cameraText || name}
          </span>
        )}
      </button>
    </li>
  );
}
