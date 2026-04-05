"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import AccountButton from "@/components/layout/account-button";

const FIGMA_URL =
  "https://www.figma.com/file/lnK11foY8Aoa6oOlDXovVN/Online-ZOO-Project";

const NAV_LINKS = [
  { key: "about", href: "/" },
  { key: "map", href: "/map" },
  { key: "zoos", href: "/animals" },
  { key: "contact", href: "/contact" },
] as const;

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

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    if (menuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [menuOpen, closeMenu]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="bg-orange w-full">
      <div className="mx-auto flex max-w-[1480px] items-center justify-between px-5 py-7.5 lg:px-10">
        {/* Logo */}
        <Link href="/" className="relative shrink-0" onClick={closeMenu}>
          <Image
            src="/icons/logo.svg"
            alt="Online Zoo"
            width={96}
            height={50}
            className="h-8.5 w-auto sm:h-10 lg:h-12.5"
            priority
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-5 lg:flex xl:gap-8.75 2xl:gap-12.5">
          <ul className="flex items-center gap-5 xl:gap-7.5 2xl:gap-12">
            {NAV_LINKS.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  className={`text-lg font-semibold uppercase transition-colors duration-300 ${
                    isActive(href)
                      ? "text-turquoise"
                      : "text-black hover:text-turquoise"
                  }`}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={FIGMA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold uppercase text-black transition-colors duration-300 hover:text-turquoise"
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
              menuOpen ? "translate-y-2.25 rotate-45 bg-white" : "bg-black"
            }`}
          />
          <span
            className={`block h-0.75 w-full rounded-sm transition-all duration-300 ${
              menuOpen ? "scale-0 bg-white" : "bg-black"
            }`}
          />
          <span
            className={`block h-0.75 w-full rounded-sm transition-all duration-300 ${
              menuOpen ? "-translate-y-2.25 -rotate-45 bg-white" : "bg-black"
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
          className={`fixed right-0 top-0 z-40 flex h-full w-77.75 max-w-[80vw] flex-col bg-navy px-8 pt-30 transition-transform duration-300 lg:hidden ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-col items-center gap-6">
            {NAV_LINKS.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  onClick={closeMenu}
                  className={`text-lg font-semibold uppercase transition-colors duration-300 ${
                    isActive(href)
                      ? "text-turquoise"
                      : "text-white hover:text-turquoise"
                  }`}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
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
