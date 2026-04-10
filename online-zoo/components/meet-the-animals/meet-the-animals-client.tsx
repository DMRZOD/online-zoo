"use client";

import { useState, useMemo } from "react";
import { AnimatePresence } from "motion/react";
import { FadeIn } from "@/components/ui/motion-wrapper";
import AnimalGridCard from "@/components/meet-the-animals/animal-grid-card";
import { cn } from "@/lib/utils";
import type { Pet } from "@/types/api";
import type { PetAssetMap } from "@/types/pet";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const PAGE_SIZE = 8;

interface MeetTheAnimalsTranslations {
  title: string;
  description: string;
  searchLabel: string;
  searchPlaceholder: string;
  all: string;
  showMore: string;
  noResults: string;
}

interface MeetTheAnimalsClientProps {
  pets: Pet[];
  assets: PetAssetMap;
  translations: MeetTheAnimalsTranslations;
}

export default function MeetTheAnimalsClient({
  pets,
  assets,
  translations: t,
}: MeetTheAnimalsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
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

  const availableLetters = useMemo(() => {
    const letters = new Set(
      mergedAnimals.map((a) => a.commonName.charAt(0).toUpperCase()),
    );
    return letters;
  }, [mergedAnimals]);

  const filteredAnimals = useMemo(() => {
    let result = mergedAnimals;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((a) => a.commonName.toLowerCase().includes(q));
    }

    if (activeLetter) {
      result = result.filter(
        (a) => a.commonName.charAt(0).toUpperCase() === activeLetter,
      );
    }

    return result;
  }, [mergedAnimals, searchQuery, activeLetter]);

  const visibleAnimals = filteredAnimals.slice(0, visibleCount);
  const hasMore = filteredAnimals.length > visibleCount;

  return (
    <section className="py-[50px]">
      <div className="mx-auto max-w-[1480px] px-5 lg:px-10">
        {/* Title */}
        <FadeIn className="mb-8 flex flex-col gap-5 sm:mb-12 sm:gap-7">
          <h1 className="font-montserrat text-[28px] font-bold uppercase tracking-wide text-primary sm:text-[42px] lg:text-[54px]">
            {t.title}
          </h1>
          <p className="max-w-[700px] text-base leading-relaxed text-foreground/80 sm:text-lg">
            {t.description}
          </p>
        </FadeIn>

        {/* Search Bar */}
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:gap-6">
          <label
            htmlFor="animal-search"
            className="shrink-0 text-base font-medium text-foreground sm:text-lg"
          >
            {t.searchLabel}
          </label>
          <div className="relative flex-1">
            <input
              id="animal-search"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              placeholder={t.searchPlaceholder}
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

        {/* Alphabet Filter */}
        <div className="mb-8 flex flex-wrap gap-1.5 sm:mb-10 sm:gap-2">
          {ALPHABET.map((letter) => {
            const hasAnimals = availableLetters.has(letter);
            const isActive = activeLetter === letter;
            return (
              <button
                key={letter}
                onClick={() => {
                  if (!hasAnimals) return;
                  setActiveLetter(isActive ? null : letter);
                  setVisibleCount(PAGE_SIZE);
                }}
                disabled={!hasAnimals}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-[5px] border text-sm font-medium transition-all duration-200 sm:h-10 sm:w-10 sm:text-base cursor-pointer",
                  isActive
                    ? "border-turquoise bg-turquoise text-white"
                    : hasAnimals
                      ? "border-border text-foreground hover:border-turquoise hover:text-turquoise dark:border-border"
                      : "cursor-default border-border/50 text-foreground/30",
                )}
              >
                {letter}
              </button>
            );
          })}
          <button
            onClick={() => {
              setActiveLetter(null);
              setVisibleCount(PAGE_SIZE);
            }}
            className={cn(
              "flex h-9 items-center justify-center rounded-[5px] border px-3 text-sm font-medium transition-all duration-200 sm:h-10 sm:px-4 sm:text-base cursor-pointer",
              activeLetter === null
                ? "border-turquoise bg-turquoise text-white"
                : "border-border text-foreground hover:border-turquoise hover:text-turquoise dark:border-border",
            )}
          >
            {t.all}
          </button>
        </div>

        {/* Animal Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visibleAnimals.map((animal, i) => (
              <AnimalGridCard
                key={animal.id}
                id={animal.id}
                commonName={animal.commonName}
                cardImage={animal.cardImage}
                index={i}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredAnimals.length === 0 && (
          <p className="py-16 text-center text-lg text-foreground/60">
            {t.noResults}
          </p>
        )}

        {/* Show More */}
        {hasMore && (
          <div className="mt-10 flex justify-center sm:mt-14">
            <button
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              className="rounded-[5px] border border-navy px-10 py-4 text-base font-semibold text-navy transition-all duration-300 hover:bg-navy hover:text-white dark:border-primary dark:text-foreground dark:hover:bg-primary dark:hover:text-primary-foreground sm:text-lg cursor-pointer"
            >
              {t.showMore}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
