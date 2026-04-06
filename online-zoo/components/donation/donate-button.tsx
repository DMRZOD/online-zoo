"use client";

import type { ReactNode } from "react";
import { useDonationPopup } from "./donation-context";

interface DonateButtonProps {
  children: ReactNode;
  className?: string;
  petId?: number;
  petName?: string;
}

export default function DonateButton({
  children,
  className,
  petId,
  petName,
}: DonateButtonProps) {
  const { openDonation } = useDonationPopup();

  return (
    <button
      type="button"
      onClick={() => openDonation({ petId, petName })}
      className={className}
    >
      {children}
    </button>
  );
}
