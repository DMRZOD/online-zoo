"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Pet, Camera } from "@/types/api";
import type { PetAssetMap } from "@/types/pet";
import AnimalSidebarItem from "./animal-sidebar-item";

interface AnimalSidebarProps {
  pets: Pet[];
  assets: PetAssetMap;
  cameras: Camera[];
  selectedPetId: number;
  collapsed: boolean;
  onToggle: () => void;
  onSelectPet: (id: number) => void;
  liveLabel: string;
  errorLabel: string;
  refreshLabel: string;
}

export default function AnimalSidebar({
  pets,
  assets,
  cameras,
  selectedPetId,
  collapsed,
  onToggle,
  onSelectPet,
  liveLabel,
  errorLabel,
  refreshLabel,
}: AnimalSidebarProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [prevCollapsed, setPrevCollapsed] = useState(collapsed);
  const [scroll, setScroll] = useState({
    translateY: 0,
    enableTransition: true,
  });

  // Reset scroll when collapsed toggles (derived state during render — no effect needed)
  if (prevCollapsed !== collapsed) {
    setPrevCollapsed(collapsed);
    setScroll({ translateY: 0, enableTransition: false });
  }

  // Duplicate pets for infinite circular scroll
  const duplicatedPets = [...pets, ...pets];

  const scrollDown = useCallback(() => {
    if (!wrapRef.current || pets.length === 0) return;
    const firstItem = wrapRef.current.querySelector("li");
    if (!firstItem) return;

    const itemHeight = firstItem.offsetHeight;
    const copyHeight = itemHeight * pets.length;

    setScroll((prev) => {
      const next = prev.translateY + itemHeight;
      if (next >= copyHeight) {
        return { translateY: 0, enableTransition: false };
      }
      return { ...prev, translateY: next };
    });
  }, [pets.length]);

  // Re-enable transition after instant reset
  useEffect(() => {
    if (!scroll.enableTransition) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() =>
          setScroll((prev) => ({ ...prev, enableTransition: true })),
        );
      });
    }
  }, [scroll.enableTransition]);

  return (
    <aside
      className={cn(
        "sticky top-0 z-30 hidden self-start bg-navy dark:bg-dark-surface text-white transition-[width] duration-300 ease-in-out lg:flex lg:flex-col",
        collapsed
          ? "lg:w-[140px] xl:w-[170px] 2xl:w-[220px]"
          : "lg:w-[220px] xl:w-[260px] 2xl:w-[300px]",
      )}
      style={{ height: "calc(100vh - 110px)" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-center xl:justify-between border-b border-white/20">
        {/* Live badge */}
        <span className="hidden  self-start xl:flex h-[38px] items-center gap-2.5 rounded-br-[5px] bg-orange px-4 text-lg font-semibold uppercase">
          {liveLabel}
          <Image src="/icons/live-cam.svg" alt="" width={20} height={16} />
        </span>

        {/* Toggle button */}
        <button
          type="button"
          onClick={onToggle}
          className="flex h-[74px] w-[74px] items-center justify-center transition-transform duration-300 cursor-pointer"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Image
            src="/icons/double-arrow.svg"
            alt=""
            width={20}
            height={20}
            className={cn(
              "transition-transform duration-300",
              collapsed ? "rotate-0" : "rotate-180",
            )}
          />
        </button>
      </div>

      {/* Pet list */}
      {pets.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
          <p className="text-sm leading-relaxed text-white/70">{errorLabel}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-[5px] bg-orange px-5 py-2.5 text-sm font-semibold uppercase text-white transition-all duration-300 hover:bg-orange-hover"
          >
            {refreshLabel}
          </button>
        </div>
      ) : (
        <div ref={wrapRef} className="flex-1 overflow-hidden">
          <ul
            role="list"
            style={{
              transform: `translateY(-${scroll.translateY}px)`,
              transition: scroll.enableTransition
                ? "transform 0.35s ease-out"
                : "none",
            }}
          >
            {duplicatedPets.map((pet, idx) => {
              const asset = assets[String(pet.id)];
              if (!asset) return null;
              const camera = cameras.find((c) => c.petId === pet.id);
              return (
                <AnimalSidebarItem
                  key={`${pet.id}-${idx < pets.length ? "a" : "b"}`}
                  name={pet.commonName}
                  cameraText={camera?.text}
                  icon={asset.sidebarIcon}
                  isActive={pet.id === selectedPetId}
                  collapsed={collapsed}
                  onClick={() => onSelectPet(pet.id)}
                />
              );
            })}
          </ul>
        </div>
      )}

      {/* Scroll down button */}
      <div className="flex items-center justify-center border-t border-white/20 py-1.5">
        <button
          type="button"
          onClick={scrollDown}
          className="flex h-[50px] w-[50px] items-center justify-center transition-opacity duration-300 hover:opacity-70 cursor-pointer"
          aria-label="Scroll down"
        >
          <Image src="/icons/arrow-bottom.svg" alt="" width={22} height={25} />
        </button>
      </div>
    </aside>
  );
}
