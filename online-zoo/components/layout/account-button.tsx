"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link, useRouter } from "@/i18n/navigation";
import { useAuth } from "@/hooks/use-auth";

interface AccountButtonProps {
  variant?: "default" | "sidebar";
}

export default function AccountButton({ variant = "default" }: AccountButtonProps) {
  const t = useTranslations("auth");
  const router = useRouter();
  const { user, isLoggedIn, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open]);

  function handleSignOut() {
    signOut();
    setOpen(false);
    router.push("/");
  }

  const userIcon = (
    <Image
      src="/icons/user.svg"
      alt=""
      width={22}
      height={22}
      className="shrink-0 brightness-0 invert"
    />
  );

  return (
    <div ref={ref} className="relative">
      {variant === "sidebar" ? (
        /* Sidebar full pill button — always visible with text */
        <button
          onClick={() => setOpen(!open)}
          className="flex cursor-pointer items-center gap-2.5 rounded-full border border-white bg-turquoise px-5 py-2.5 text-base font-semibold text-white transition-colors duration-300 hover:bg-turquoise-hover"
          aria-expanded={open}
          aria-haspopup="true"
        >
          <span>{isLoggedIn ? user!.name : t("account")}</span>
          {userIcon}
        </button>
      ) : (
        <>
          {/* Desktop pill button */}
          <button
            onClick={() => setOpen(!open)}
            className="hidden cursor-pointer items-center gap-2.5 rounded-full border border-white bg-turquoise px-5 py-2.5 text-base font-semibold text-white transition-colors duration-300 hover:bg-turquoise-hover lg:flex"
            aria-expanded={open}
            aria-haspopup="true"
          >
            <span className="hidden xl:block">
              {isLoggedIn ? user!.name : t("account")}
            </span>
            {userIcon}
          </button>

          {/* Mobile circle button */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-turquoise transition-colors duration-300 hover:bg-turquoise-hover lg:hidden"
            aria-expanded={open}
            aria-haspopup="true"
            aria-label={t("account")}
          >
            {userIcon}
          </button>
        </>
      )}

      {/* Dropdown */}
      {open && (
        <div className={`absolute top-full z-50 mt-2 min-w-[200px] rounded-[5px] bg-white dark:bg-popover py-2 shadow-[0_4px_30px_0_rgba(0,0,0,0.15)] dark:shadow-[0_4px_30px_0_rgba(0,0,0,0.4)] ${variant === "sidebar" ? "left-1/2 -translate-x-1/2" : "right-0"}`}>
          {isLoggedIn ? (
            <button
              onClick={handleSignOut}
              className="block w-full cursor-pointer px-5 py-3 text-left text-lg font-semibold text-foreground transition-colors duration-300 hover:text-turquoise"
            >
              {t("signOut")}
            </button>
          ) : (
            <>
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className="block w-full px-5 py-3 text-left text-lg font-semibold text-foreground transition-colors duration-300 hover:text-turquoise"
              >
                {t("signIn")}
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="block w-full px-5 py-3 text-left text-lg font-semibold text-foreground transition-colors duration-300 hover:text-turquoise"
              >
                {t("registration")}
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
