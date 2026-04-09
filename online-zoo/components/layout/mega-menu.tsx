"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "motion/react";

export interface MegaMenuItem {
  key: string;
  href: string;
}

interface MegaMenuProps {
  items: MegaMenuItem[];
  isOpen: boolean;
  onNavigate: () => void;
}

export default function MegaMenu({ items, isOpen, onNavigate }: MegaMenuProps) {
  const t = useTranslations("common.nav.animalsMenu");
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="absolute left-1/2 top-full z-50 mt-5 flex w-[500px] -translate-x-1/2 overflow-hidden rounded-[10px] bg-white shadow-[0_8px_40px_0_rgba(0,0,0,0.12)] dark:bg-dark-surface dark:shadow-[0_8px_40px_0_rgba(0,0,0,0.5)]"
          role="menu"
        >
          {/* Left side — links */}
          <div className="flex flex-1 flex-col py-5">
            {items.map((item) => {
              const isActive =
                item.href !== "#" &&
                (item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href));

              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={onNavigate}
                  className={`px-7 py-3 text-[16px] font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-turquoise"
                      : "text-foreground hover:text-turquoise"
                  }`}
                  role="menuitem"
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </div>

          {/* Right side — featured image */}
          <div className="relative w-[240px] shrink-0">
            <Image
              src="/images/cards/giant-panda.jpg"
              alt="Giant Panda"
              fill
              className="object-cover"
              sizes="240px"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-10">
              <p className="text-sm font-semibold text-white">
                {t("featuredTitle")}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
