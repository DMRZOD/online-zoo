"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("common.footer");

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto flex max-w-[1480px] flex-col items-center gap-6 px-5 py-10 md:flex-row md:justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icons/logo-white.svg"
            alt="Online Zoo"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold uppercase tracking-wide">
            Online Zoo
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-sm">{t("designed")}</span>
          <a
            href="https://rs.school"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-turquoise"
          >
            <Image
              src="/icons/rs-school-logo.svg"
              alt={t("rsSchool")}
              width={80}
              height={30}
            />
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            <Image src="/icons/youtube.svg" alt="YouTube" width={24} height={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            <Image
              src="/icons/instagram.svg"
              alt="Instagram"
              width={24}
              height={24}
            />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            <Image
              src="/icons/facebook.svg"
              alt="Facebook"
              width={24}
              height={24}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
