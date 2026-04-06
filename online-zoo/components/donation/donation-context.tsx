"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

interface DonationPopupOptions {
  petId?: number;
  petName?: string;
}

interface DonationPopupContextValue {
  isOpen: boolean;
  initialPetId: number | null;
  initialPetName: string;
  openDonation: (opts?: DonationPopupOptions) => void;
  closeDonation: () => void;
}

const DonationPopupContext = createContext<DonationPopupContextValue | null>(
  null
);

export function DonationPopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialPetId, setInitialPetId] = useState<number | null>(null);
  const [initialPetName, setInitialPetName] = useState("");

  const openDonation = useCallback((opts?: DonationPopupOptions) => {
    setInitialPetId(opts?.petId ?? null);
    setInitialPetName(opts?.petName ?? "");
    setIsOpen(true);
  }, []);

  const closeDonation = useCallback(() => {
    setIsOpen(false);
    setInitialPetId(null);
    setInitialPetName("");
  }, []);

  return (
    <DonationPopupContext.Provider
      value={{ isOpen, initialPetId, initialPetName, openDonation, closeDonation }}
    >
      {children}
    </DonationPopupContext.Provider>
  );
}

export function useDonationPopup() {
  const ctx = useContext(DonationPopupContext);
  if (!ctx) {
    throw new Error("useDonationPopup must be used within DonationPopupProvider");
  }
  return ctx;
}
