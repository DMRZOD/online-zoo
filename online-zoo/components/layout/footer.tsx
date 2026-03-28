"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

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

const LOGOS = [
  {
    src: "/icons/logo-white.svg",
    alt: "Online Zoo",
    href: "/",
    internal: true,
  },
  {
    src: "/icons/yem-logo.svg",
    alt: "Yem Digital",
    href: "https://yemdigital.com",
    internal: false,
  },
  {
    src: "/icons/rs-school-logo.svg",
    alt: "RS School",
    href: "https://rs.school",
    internal: false,
  },
];

export default function Footer() {
  const tNav = useTranslations("common.nav");
  const tFooter = useTranslations("common.footer");

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-[1480px] px-5 pb-10 pt-12 lg:px-10 lg:pt-17.5 lg:pb-10">
        {/* Top section */}
        <div className="flex flex-col items-center gap-8 xl:flex-row xl:justify-between xl:gap-5">
          {/* Logos */}
          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-10 2xl:gap-16">
            {LOGOS.map(({ src, alt, href, internal }) => {
              const img = (
                <Image
                  src={src}
                  alt={alt}
                  width={120}
                  height={50}
                  className="h-12.5 w-auto"
                />
              );

              if (internal) {
                return (
                  <Link
                    key={alt}
                    href={href}
                    className="transition-opacity duration-300 hover:opacity-80"
                  >
                    {img}
                  </Link>
                );
              }

              return (
                <a
                  key={alt}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity duration-300 hover:opacity-80"
                >
                  {img}
                </a>
              );
            })}
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-5 sm:gap-7 xl:gap-8 2xl:gap-12">
            {NAV_LINKS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="text-base font-semibold uppercase transition-colors duration-300 hover:text-turquoise sm:text-lg"
              >
                {tNav(key)}
              </Link>
            ))}
          </nav>

          {/* Donate button */}
          <button className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-[5px] border border-white px-6 py-4 text-base font-semibold uppercase transition-all duration-300 hover:bg-turquoise sm:w-auto sm:px-10 sm:py-6 sm:text-lg xl:py-5">
            <span>{tFooter("donate")}</span>
            <Image src="/icons/arrow-right.svg" alt="" width={25} height={22} />
          </button>
        </div>

        {/* Divider */}
        <div className="my-8 hidden border-t border-white md:block lg:my-10" />

        {/* Bottom section */}
        <div className="mt-8 flex flex-col-reverse items-center gap-8 md:mt-0 md:flex-row md:justify-between">
          {/* Copyright */}
          <div className="flex flex-col items-center gap-4 text-lg font-normal md:flex-row md:gap-10">
            <span>{tFooter("copyrightDinak")}</span>
            <span>{tFooter("copyrightYem")}</span>
            <span>{tFooter("copyrightRs")}</span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-8 lg:gap-10">
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
        </div>
      </div>
    </footer>
  );
}
