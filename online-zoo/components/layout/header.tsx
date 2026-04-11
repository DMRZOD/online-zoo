"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { motion, AnimatePresence } from "motion/react";
import AccountButton from "@/components/layout/account-button";
import MegaMenu from "@/components/layout/mega-menu";
import type { MegaMenuItem } from "@/components/layout/mega-menu";

const FIGMA_URL =
  "https://www.figma.com/file/lnK11foY8Aoa6oOlDXovVN/Online-ZOO-Project";

const ANIMALS_MENU_ITEMS: MegaMenuItem[] = [
  { key: "meetAnimals", href: "/meet-the-animals" },
  { key: "webcams", href: "/webcams" },
  { key: "adoption", href: "/adoption" },
];

type NavItem =
  | { key: string; href: string; children?: undefined }
  | { key: string; href?: undefined; children: MegaMenuItem[] };

const NAV_LINKS: NavItem[] = [
  { key: "about", href: "/" },
  { key: "map", href: "/map" },
  { key: "animals", children: ANIMALS_MENU_ITEMS },
  { key: "contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  { name: "YouTube", icon: "/icons/youtube.svg", href: "https://youtube.com" },
  {
    name: "Instagram",
    icon: "/icons/instagram.svg",
    href: "https://instagram.com",
  },
  {
    name: "Facebook",
    icon: "/icons/facebook.svg",
    href: "https://facebook.com",
  },
];

export default function Header() {
  const t = useTranslations("common.nav");
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileAnimalsOpen, setMobileAnimalsOpen] = useState(false);
  const megaMenuRef = useRef<HTMLLIElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setMobileAnimalsOpen(false);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menus on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeMenu();
        setMegaMenuOpen(false);
      }
    }
    if (menuOpen || megaMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [menuOpen, megaMenuOpen, closeMenu]);

  // Close mega menu on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(e.target as Node)
      ) {
        setMegaMenuOpen(false);
      }
    }
    if (megaMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [megaMenuOpen]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  function isChildActive(children: MegaMenuItem[]) {
    return children.some((child) => child.href !== "#" && isActive(child.href));
  }

  function handleMegaMenuEnter() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMegaMenuOpen(true);
  }

  function handleMegaMenuLeave() {
    closeTimerRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 150);
  }

  return (
    <header className="bg-orange dark:bg-navy dark:border-b dark:border-border w-full">
      <div className="mx-auto flex max-w-[1480px] items-center justify-between px-5 py-7.5 lg:px-10">
        {/* Logo */}
        <Link href="/" className="relative shrink-0" onClick={closeMenu}>
          <Image
            src="/icons/logo.svg"
            alt="Online Zoo"
            width={96}
            height={50}
            className="h-8.5 w-auto sm:h-10 lg:h-12.5 dark:invert"
            priority
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-5 lg:flex xl:gap-8.75 2xl:gap-12.5">
          <ul className="flex items-center gap-5 xl:gap-7.5 2xl:gap-12">
            {NAV_LINKS.map((item) => {
              if (item.children) {
                // Mega menu trigger
                const active = isChildActive(item.children);
                return (
                  <li
                    key={item.key}
                    ref={megaMenuRef}
                    className="relative"
                    onMouseEnter={handleMegaMenuEnter}
                    onMouseLeave={handleMegaMenuLeave}
                  >
                    <button
                      onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                      className={`cursor-pointer text-lg font-semibold uppercase transition-colors duration-300 ${
                        active || megaMenuOpen
                          ? "text-turquoise"
                          : "text-black dark:text-foreground hover:text-turquoise dark:hover:text-turquoise"
                      }`}
                      aria-expanded={megaMenuOpen}
                      aria-haspopup="true"
                    >
                      {t(item.key)}
                    </button>
                    <MegaMenu
                      items={item.children}
                      isOpen={megaMenuOpen}
                      onNavigate={() => setMegaMenuOpen(false)}
                    />
                  </li>
                );
              }

              // Regular nav link
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={`text-lg font-semibold uppercase transition-colors duration-300 ${
                      isActive(item.href)
                        ? "text-turquoise"
                        : "text-black dark:text-foreground hover:text-turquoise dark:hover:text-turquoise"
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href={FIGMA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold uppercase text-black dark:text-foreground transition-colors duration-300 hover:text-turquoise dark:hover:text-turquoise lg:hidden xl:block"
              >
                {t("design")}
              </a>
            </li>
          </ul>

          {/* Social icons */}
          <div className="flex items-center gap-5 xl:gap-7.5">
            {SOCIAL_LINKS.map(({ name, icon, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-110"
              >
                <Image
                  src={icon}
                  alt={name}
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
              </a>
            ))}
          </div>

          {/* Account button */}
          <AccountButton />
        </nav>

        {/* Burger button (mobile) */}
        <button
          className="relative z-50 flex h-7.5 w-7.5 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.75 w-full rounded-sm transition-all duration-300 ${
              menuOpen
                ? "translate-y-2.25 rotate-45 bg-white"
                : "bg-black dark:bg-foreground"
            }`}
          />
          <span
            className={`block h-0.75 w-full rounded-sm transition-all duration-300 ${
              menuOpen ? "scale-0 bg-white" : "bg-black dark:bg-foreground"
            }`}
          />
          <span
            className={`block h-0.75 w-full rounded-sm transition-all duration-300 ${
              menuOpen
                ? "-translate-y-2.25 -rotate-45 bg-white"
                : "bg-black dark:bg-foreground"
            }`}
          />
        </button>

        {/* Mobile overlay */}
        <div
          className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
            menuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          onClick={closeMenu}
        />

        {/* Mobile sidebar nav */}
        <nav
          className={`fixed right-0 top-0 z-40 flex h-full w-77.75 max-w-[80vw] flex-col overflow-y-auto bg-navy px-8 pt-30 transition-transform duration-300 lg:hidden ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col items-center gap-6">
            {NAV_LINKS.map((item) => {
              if (item.children) {
                return (
                  <li
                    key={item.key}
                    className="flex w-full flex-col items-center"
                  >
                    <button
                      onClick={() => setMobileAnimalsOpen(!mobileAnimalsOpen)}
                      className={`flex cursor-pointer items-center gap-2 text-lg font-semibold uppercase transition-colors duration-300 ${
                        isChildActive(item.children) || mobileAnimalsOpen
                          ? "text-turquoise"
                          : "text-white hover:text-turquoise"
                      }`}
                      aria-expanded={mobileAnimalsOpen}
                    >
                      {t(item.key)}
                      <Image
                        src="/icons/arrow-bottom.svg"
                        alt=""
                        width={12}
                        height={8}
                        className={`h-2 w-3 transition-transform duration-300 ${
                          mobileAnimalsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileAnimalsOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-3 flex w-full flex-col items-center gap-3 overflow-hidden"
                        >
                          {item.children.map((child) => (
                            <li key={child.key}>
                              <Link
                                href={child.href}
                                onClick={closeMenu}
                                className={`text-base transition-colors duration-300 ${
                                  isActive(child.href)
                                    ? "text-turquoise"
                                    : "text-white hover:text-turquoise"
                                }`}
                              >
                                {t(`animalsMenu.${child.key}`)}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`text-lg font-semibold uppercase transition-colors duration-300 ${
                      isActive(item.href)
                        ? "text-turquoise"
                        : "text-white hover:text-turquoise"
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href={FIGMA_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="text-lg font-semibold uppercase text-white transition-colors duration-300 hover:text-turquoise"
              >
                {t("design")}
              </a>
            </li>
          </ul>

          {/* Account button — mobile sidebar pill */}
          <div className="mt-8 flex justify-center">
            <AccountButton variant="sidebar" />
          </div>
        </nav>
      </div>
    </header>
  );
}
