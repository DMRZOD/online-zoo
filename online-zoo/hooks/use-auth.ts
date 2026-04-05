"use client";

import { useSyncExternalStore, useCallback } from "react";
import { TOKEN_KEY, USER_KEY } from "@/lib/constants";
import type { AuthUser } from "@/types/api";

let cachedRaw: string | null = null;
let cachedUser: AuthUser | null = null;

function getSnapshot(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (raw === cachedRaw) return cachedUser;
    cachedRaw = raw;
    cachedUser = raw ? (JSON.parse(raw) as AuthUser) : null;
    return cachedUser;
  } catch {
    return null;
  }
}

function getServerSnapshot(): AuthUser | null {
  return null;
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

export function useAuth() {
  const user = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const signIn = useCallback((u: AuthUser, token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
    window.dispatchEvent(new Event("storage"));
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event("storage"));
  }, []);

  return { user, isLoggedIn: Boolean(user), signIn, signOut };
}
