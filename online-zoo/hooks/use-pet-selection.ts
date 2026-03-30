"use client";

import { useState, useCallback } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";

export function usePetSelection(initialId: number) {
  const [selectedPetId, setSelectedPetId] = useState(initialId);
  const router = useRouter();
  const pathname = usePathname();

  const selectPet = useCallback(
    (id: number) => {
      setSelectedPetId(id);
      router.replace(`${pathname}?pet=${id}`, { scroll: false });
    },
    [router, pathname]
  );

  return { selectedPetId, selectPet };
}
