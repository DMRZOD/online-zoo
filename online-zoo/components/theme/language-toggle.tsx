"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";

export function LanguageToggle() {
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
        aria-label="Switch language"
        aria-expanded={open}
        className="cursor-pointer flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-turquoise bg-card text-turquoise shadow-md transition-all hover:bg-turquoise hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise"
      >
        <Globe size={22} />
      </button>

      {open && (
        <div className="absolute bottom-5 right-15 min-w-[120px] overflow-hidden rounded-lg border border-turquoise bg-card shadow-lg">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={`block w-full cursor-pointer px-3 py-2 text-left text-sm transition-colors hover:bg-turquoise/10 ${
                loc === locale
                  ? "font-semibold text-turquoise"
                  : "text-card-foreground"
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
