"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./language-switcher";

export default function Header() {
  const t = useTranslations("common.nav");

  return (
    <header className="bg-navy text-white w-full">
      <div className="mx-auto flex max-w-[1480px] items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            alt="Online Zoo"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold uppercase tracking-wide">
            Online Zoo
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <Link
            href="/"
            className="text-sm font-medium uppercase transition-colors hover:text-turquoise"
          >
            {t("home")}
          </Link>
          <Link
            href="/animals"
            className="text-sm font-medium uppercase transition-colors hover:text-turquoise"
          >
            {t("animals")}
          </Link>
          <Link
            href="/map"
            className="text-sm font-medium uppercase transition-colors hover:text-turquoise"
          >
            {t("map")}
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium uppercase transition-colors hover:text-turquoise"
          >
            {t("contact")}
          </Link>
          <Link
            href="/sign-in"
            className="text-sm font-medium uppercase transition-colors hover:text-turquoise"
          >
            {t("signIn")}
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium uppercase transition-colors hover:text-turquoise"
          >
            {t("register")}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
