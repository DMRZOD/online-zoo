"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("common.language");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(newLocale: Locale) {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded px-2 py-1 text-sm font-semibold uppercase transition-colors hover:text-turquoise"
      >
        {locale.toUpperCase()}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M3 5l3 3 3-3" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[120px] rounded border border-border bg-popover text-popover-foreground py-1 shadow-lg">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={`block w-full px-3 py-1.5 text-left text-sm transition-colors hover:bg-muted ${
                loc === locale
                  ? "font-semibold text-turquoise"
                  : ""
              }`}
            >
              {t(loc)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
