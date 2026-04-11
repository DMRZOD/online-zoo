"use client";

import { useState, useMemo } from "react";
import { AnimatePresence } from "motion/react";
import { FadeIn } from "@/components/ui/motion-wrapper";
import AdoptionAnimalCard from "./adoption-animal-card";
import type { Pet } from "@/types/api";
import type { PetAssetMap } from "@/types/pet";
import type { AdoptionFormState, AdoptionTranslations } from "./adoption-client";

const PAGE_SIZE = 8;

interface AdoptionStep1Props {
  pets: Pet[];
  assets: PetAssetMap;
  form: AdoptionFormState;
  translations: AdoptionTranslations;
  onUpdate: (updates: Partial<AdoptionFormState>) => void;
  onNext: () => void;
}

export default function AdoptionStep1Animal({
  pets,
  assets,
  translations: t,
  onUpdate,
  onNext,
}: AdoptionStep1Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const mergedAnimals = useMemo(
    () =>
      pets.map((pet) => {
        const asset = assets[String(pet.id)];
        return {
          id: pet.id,
          commonName: asset?.commonName ?? pet.commonName,
          cardImage: asset?.cardImage ?? "",
        };
      }),
    [pets, assets],
  );

  const filteredAnimals = useMemo(() => {
    if (!searchQuery.trim()) return mergedAnimals;
    const q = searchQuery.toLowerCase().trim();
    return mergedAnimals.filter((a) => a.commonName.toLowerCase().includes(q));
  }, [mergedAnimals, searchQuery]);

  const visibleAnimals = filteredAnimals.slice(0, visibleCount);
  const hasMore = filteredAnimals.length > visibleCount;

  const handleSelect = (id: number, name: string, image: string) => {
    onUpdate({ petId: id, petName: name, petImage: image });
    onNext();
  };

  return (
    <div>
      <FadeIn className="mb-6 flex flex-col gap-3 sm:mb-8">
        <h2 className="text-[22px] font-bold text-turquoise dark:text-foreground sm:text-[28px] lg:text-[32px]">
          {t.step1.title}
        </h2>
        <p className="text-base text-foreground/70">{t.step1.subtitle}</p>
      </FadeIn>

      {/* Search */}
      <div className="mb-6 sm:mb-8">
        <div className="relative max-w-[400px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder={t.step1.searchPlaceholder}
            className="w-full rounded-[5px] border border-border bg-background px-4 py-3 pr-12 text-base text-foreground outline-none transition-colors duration-200 placeholder:text-foreground/40 focus:border-turquoise dark:border-border dark:bg-dark-surface"
          />
          <svg
            className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Animal Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visibleAnimals.map((animal, i) => (
            <AdoptionAnimalCard
              key={animal.id}
              id={animal.id}
              commonName={animal.commonName}
              cardImage={animal.cardImage}
              index={i}
              adoptLabel={t.step1.adopt}
              onSelect={handleSelect}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* No Results */}
      {filteredAnimals.length === 0 && (
        <p className="py-16 text-center text-lg text-foreground/60">
          No animals found matching your search.
        </p>
      )}

      {/* Show More */}
      {hasMore && (
        <div className="mt-10 flex justify-center sm:mt-14">
          <button
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            className="cursor-pointer rounded-[5px] border border-navy px-10 py-4 text-base font-semibold text-navy transition-all duration-300 hover:bg-navy hover:text-white dark:border-primary dark:text-foreground dark:hover:bg-primary dark:hover:text-primary-foreground sm:text-lg"
          >
            {t.step1.showMore}
          </button>
        </div>
      )}
    </div>
  );
}
