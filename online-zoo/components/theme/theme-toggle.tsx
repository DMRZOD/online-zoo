"use client";

import { useSyncExternalStore, useCallback } from "react";
import { Sun, Moon } from "lucide-react";
import { THEME_KEY } from "@/lib/constants";

function getSnapshot(): boolean {
  return localStorage.getItem(THEME_KEY) === "dark";
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next = !dark;
    if (next) {
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem(THEME_KEY, "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      document.documentElement.classList.remove("dark");
      localStorage.setItem(THEME_KEY, "light");
    }
    window.dispatchEvent(new Event("storage"));
  }, [dark]);

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="cursor-pointer fixed bottom-4 right-4 z-[2500] flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-turquoise bg-card text-turquoise shadow-md transition-all hover:bg-turquoise hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise"
    >
      {dark ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
}
